import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { ratelimit } from "@/lib/ratelimit";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const { email } = await req.json();

    if (typeof email !== "string") {
  return NextResponse.json({ error: "Invalid email" }, { status: 400 });
}

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // -------------------------
    // 1. Store in Neon
    // -------------------------
    try {
      await pool.query(
        `INSERT INTO mail_list (email) VALUES ($1)`,
        [email]
      );
    } catch (err: any) {

      if (err.code === "23505") {

        return NextResponse.json(
          { error: "Already subscribed" },
          { status: 409 }
        );
      }
      throw err;
    }

    // -------------------------
    // 2. Generate email with Groq
    // -------------------------
    const html = await generateWelcomeMail(email);

    // -------------------------
    // 3. Send using Resend
    // -------------------------
    await resend.emails.send({
      from: "Bakery <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to our bakery 🍰",
      html,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error!" },
      { status: 500 }
    );
  }
}

/* -------------------------------
   Groq helper
--------------------------------*/
async function generateWelcomeMail(email: string) {
  console.log(
  "GROQ KEY LENGTH:",
  process.env.GROQ_API_KEY?.length
);


  const res = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You write short, friendly welcome emails for a bakery named bakeology as a newsletter. Keep it under 70 words. Minimum lines should be 10",
          },
          {
            role: "user",
            content: `A user with email ${email} just subscribed.`,
          },
        ],
        temperature: 0.4,
      }),
    }
  );

  const data = await res.json();

  console.log("GROQ STATUS:", res.status);
  console.log("GROQ DATA:", JSON.stringify(data, null, 2));

  const text =
    data?.choices?.[0]?.message?.content ??
    "Thanks for subscribing to our bakery newsletter!";

  return `
    <div style="font-family:Arial, sans-serif; line-height:1.5">
      ${text.replace(/\n/g, "<br/>")}
    </div>
  `;
}

