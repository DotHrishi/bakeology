import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { notifySlack } from "@/lib/slack";

function generate7DigitId(): number {
  return Math.floor(1000000 + Math.random() * 9000000);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, address, source, items, total } = body;

    if (!name || !phone || !address || !source || !items) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json({ error: "Phone number must be exactly 10 digits" }, { status: 400 });
    }

    // Generate a unique 7-digit order ID, retry on collision
    let orderId: number;
    let inserted = false;
    for (let attempt = 0; attempt < 5; attempt++) {
      orderId = generate7DigitId();
      try {
        const query = `
          INSERT INTO orders (id, name, phone, address, source, items, total)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id
        `;
        const values = [orderId, name, phone, address, source, JSON.stringify(items), total];
        await pool.query(query, values);
        inserted = true;
        break;
      } catch (err: unknown) {
        const pgErr = err as { code?: string };
        if (pgErr.code === "23505") continue; // unique violation, retry
        throw err;
      }
    }

    if (!inserted) {
      return NextResponse.json({ error: "Failed to generate unique order ID" }, { status: 500 });
    }

    const itemsSummary = items.map((i: { name: string; quantity: number; subtotal: number }) =>
      `• ${i.name} ×${i.quantity} = ₹${i.subtotal}`
    ).join("\n");

    notifySlack(
      `🛒 *New Order #${orderId!}*\n*Name:* ${name}\n*Phone:* ${phone}\n*Address:* ${address}\n*Source:* ${source}\n*Items:*\n${itemsSummary}\n*Total:* ₹${total}`
    );

    return NextResponse.json({ success: true, id: orderId! });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
