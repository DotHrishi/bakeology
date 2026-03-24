import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { Resend } from "resend";
import { notifySlack } from "@/lib/slack";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
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

    //store in neondb
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

    //notify by slack
    notifySlack(`📧 *New Newsletter Subscriber*\n${email} just subscribed to the mailing list.`);

    //generate welcome email with groq
    const html = await generateWelcomeMail(email);

    //send using resend
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Bakeology <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to the Bakeology family! 🎂",
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


async function generateWelcomeMail(email: string) {
  const baseUrl = "https://bakeology-tau.vercel.app";

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
              "You write short, warm, and friendly welcome messages for a premium artisan bakery named Bakeology. Write 3–4 short paragraphs. Each paragraph should be on its own line. Do NOT include a subject line, greeting with the email address, or sign-off — just the body paragraphs. No markdown.",
          },
          {
            role: "user",
            content: `A new subscriber just joined the Bakeology newsletter.`,
          },
        ],
        temperature: 0.6,
      }),
    }
  );

  const data = await res.json();

  const text: string =
    data?.choices?.[0]?.message?.content ??
    "Thank you for subscribing! We can't wait to share our latest creations with you. Expect sweet updates, exclusive offers, and a sprinkle of joy right in your inbox.";

  // Convert newlines to <p> blocks
  const paragraphs = text
    .split(/\n+/)
    .map((p: string) => p.trim())
    .filter((p: string) => p.length > 0)
    .map((p: string) => `<p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.7;font-family:Arial,sans-serif;">${p}</p>`)
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#fdf8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf8f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#1a1a2e;padding:36px 40px;text-align:center;">
              <img src="${baseUrl}/bakeology-logo.png" alt="Bakeology Logo" width="72" style="display:inline-block;margin-bottom:12px;" />
              <br/>
              <img src="${baseUrl}/bakeology-text.png" alt="Bakeology" height="28" style="display:inline-block;" />
            </td>
          </tr>

          <!-- Hero banner -->
          <tr>
            <td style="padding:0;">
              <img src="${baseUrl}/hero2.png" alt="Bakeology Treats" width="600" style="display:block;width:100%;max-width:600px;height:200px;object-fit:cover;" />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 8px;color:#1a1a2e;font-family:Georgia,serif;font-size:24px;">Welcome to the family! 🎉</h2>
              <p style="margin:0 0 24px;color:#c9a84c;font-family:Arial,sans-serif;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;">You're officially a Bakeology insider</p>

              ${paragraphs}

              <!-- CTA -->
              <div style="text-align:center;margin:32px 0 8px;">
                <a href="${baseUrl}/order-now"
                   style="display:inline-block;background-color:#1a1a2e;color:#c9a84c;font-family:Arial,sans-serif;font-weight:bold;font-size:15px;text-decoration:none;padding:14px 36px;border-radius:50px;letter-spacing:0.5px;">
                  Browse Our Menu &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #f0e8d8;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9f4ec;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:#1a1a2e;font-family:Georgia,serif;font-size:13px;font-weight:bold;letter-spacing:1px;">BAKEOLOGY</p>
              <p style="margin:0;color:#aaa;font-family:Arial,sans-serif;font-size:12px;">
                Artisan Bakery &bull; Made with love 🍰<br/>
                &copy; ${new Date().getFullYear()} Bakeology. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

