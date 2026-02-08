import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { ratelimit } from "@/lib/ratelimit";

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
        const { success } = await ratelimit.limit(ip);

        if (!success) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 });
        }

        const body = await req.json();

        const {
            name,
            email,
            phone,
            dob,
            message,
            address,
            source
        } = body;

        if (!name || !email || !phone || !dob || !message || !address || !source) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const query = `
        INSERT INTO contact_requests
        (name, email, phone, dob, message, address, source)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING id
        `;

        const values = [
            name,
            email,
            phone,
            dob,
            message,
            address,
            source
        ];

        const result = await pool.query(query, values);

        return NextResponse.json({
            success: true,
            id: result.rows[0].id
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal NEON DB error" },
            { status: 500 }
        );
    }
}