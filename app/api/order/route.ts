import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { notifySlack } from "@/lib/slack";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, address, source, items, total } = body;

    if (!name || !phone || !address || !source || !items) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const query = `
      INSERT INTO orders (name, phone, address, source, items, total)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const values = [name, phone, address, source, JSON.stringify(items), total];
    const result = await pool.query(query, values);

    const itemsSummary = items.map((i: { name: string; quantity: number; subtotal: number }) =>
      `• ${i.name} ×${i.quantity} = ₹${i.subtotal}`
    ).join("\n");

    notifySlack(
      `🛒 *New Order #${result.rows[0].id}*\n*Name:* ${name}\n*Phone:* ${phone}\n*Address:* ${address}\n*Source:* ${source}\n*Items:*\n${itemsSummary}\n*Total:* ₹${total}`
    );

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
