import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export async function sendOrderConfirmation({
  to,
  customerName,
  orderId,
  items,
  total,
}: {
  to: string;
  customerName: string;
  orderId: number;
  items: OrderItem[];
  total: number;
}): Promise<void> {
  const from = process.env.RESEND_FROM_EMAIL ?? "Bakeology <onboarding@resend.dev>";

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #f0e8d8;color:#1a1a2e;font-family:Georgia,serif;">${item.name}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #f0e8d8;text-align:center;color:#555;font-family:Georgia,serif;">×${item.quantity}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #f0e8d8;text-align:right;color:#b8860b;font-weight:bold;font-family:Georgia,serif;">₹${item.subtotal}</td>
      </tr>`
    )
    .join("");

  const baseUrl = "https://bakeology-tau.vercel.app";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#fdf8f0;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf8f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#1a1a2e;padding:32px 40px;text-align:center;">
              <img src="${baseUrl}/bakeology-logo.png" alt="Bakeology Logo" width="72" style="display:inline-block;margin-bottom:12px;" />
              <br/>
              <img src="${baseUrl}/bakeology-text.png" alt="Bakeology" height="28" style="display:inline-block;" />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 8px;color:#1a1a2e;font-size:22px;">Order Confirmed! 🎉</h2>
              <p style="margin:0 0 24px;color:#555;font-size:15px;font-family:Arial,sans-serif;">
                Hi <strong>${customerName}</strong>, your order has been placed successfully.
                We will give you a call shortly to confirm the details.
              </p>

              <!-- Order ID badge -->
              <div style="background:#1a1a2e;border-radius:10px;padding:14px 20px;display:inline-block;margin-bottom:28px;">
                <span style="color:#c9a84c;font-family:Arial,sans-serif;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Order ID</span>
                <p style="margin:4px 0 0;color:#fff;font-size:22px;font-weight:bold;font-family:Georgia,serif;">#${orderId}</p>
              </div>

              <!-- Items table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #f0e8d8;margin-bottom:16px;">
                <thead>
                  <tr style="background-color:#fdf1e0;">
                    <th style="padding:12px 16px;text-align:left;color:#1a1a2e;font-family:Arial,sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;">Item</th>
                    <th style="padding:12px 16px;text-align:center;color:#1a1a2e;font-family:Arial,sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;">Qty</th>
                    <th style="padding:12px 16px;text-align:right;color:#1a1a2e;font-family:Arial,sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows}
                </tbody>
                <tfoot>
                  <tr style="background-color:#1a1a2e;">
                    <td colspan="2" style="padding:14px 16px;color:#fff;font-family:Arial,sans-serif;font-weight:bold;">Total</td>
                    <td style="padding:14px 16px;text-align:right;color:#c9a84c;font-size:18px;font-weight:bold;font-family:Georgia,serif;">₹${total}</td>
                  </tr>
                </tfoot>
              </table>
              <p style="color:#888;font-size:12px;font-family:Arial,sans-serif;margin:0 0 28px;">*All prices are inclusive of GST</p>

              <!-- Call notice -->
              <div style="background:#fdf1e0;border-left:4px solid #c9a84c;border-radius:8px;padding:16px 20px;margin-bottom:28px;">
                <p style="margin:0;color:#1a1a2e;font-family:Arial,sans-serif;font-size:14px;">
                  📞 <strong>What's next?</strong> Our team will call you soon to confirm your order and delivery details. Please keep your phone handy!
                </p>
              </div>

              <p style="color:#555;font-family:Arial,sans-serif;font-size:14px;margin:0;">
                Thank you for choosing Bakeology. We can't wait to delight you! 🍰
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9f4ec;padding:24px 40px;text-align:center;border-top:1px solid #f0e8d8;">
              <p style="margin:0;color:#aaa;font-family:Arial,sans-serif;font-size:12px;">
                © ${new Date().getFullYear()} Bakeology. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from,
      to,
      subject: `Order Confirmed! #${orderId} — Bakeology 🎂`,
      html,
    });
  } catch (err) {
    console.error("[Resend] Failed to send order confirmation email:", err);
  }
}
