import { createServerFn } from "@tanstack/react-start";

type OrderPayload = {
  name: string;
  email: string;
  phone?: string | null;
  occasion?: string | null;
  message?: string | null;
};

const NOTIFY_TO = "pusnojawadraiyan@gmail.com";

function encodeRfc2822(to: string, subject: string, html: string): string {
  const msg = [
    `To: ${to}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "",
    html,
  ].join("\r\n");
  // base64url
  return btoa(unescape(encodeURIComponent(msg)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function esc(v: string | null | undefined): string {
  if (!v) return "—";
  return v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export const notifyNewOrder = createServerFn({ method: "POST" })
  .inputValidator((data: OrderPayload) => data)
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const GMAIL_KEY = process.env.GOOGLE_MAIL_API_KEY;
    if (!LOVABLE_API_KEY || !GMAIL_KEY) {
      console.error("Missing email credentials");
      return { ok: false };
    }

    const html = `
      <div style="font-family: Georgia, serif; color:#3D0A05; background:#F5E9D7; padding:24px; border-radius:12px;">
        <h2 style="margin:0 0 8px 0; font-weight:normal;">🌸 New Floret Order</h2>
        <p style="margin:0 0 16px 0; color:#7a4a3a;">A new bloom request just arrived.</p>
        <table style="width:100%; border-collapse:collapse; background:#fff; border-radius:8px; overflow:hidden;">
          <tr><td style="padding:10px 14px; font-weight:bold; width:120px;">Name</td><td style="padding:10px 14px;">${esc(data.name)}</td></tr>
          <tr><td style="padding:10px 14px; font-weight:bold; background:#faf3e8;">Email</td><td style="padding:10px 14px; background:#faf3e8;">${esc(data.email)}</td></tr>
          <tr><td style="padding:10px 14px; font-weight:bold;">Phone</td><td style="padding:10px 14px;">${esc(data.phone)}</td></tr>
          <tr><td style="padding:10px 14px; font-weight:bold; background:#faf3e8;">Occasion</td><td style="padding:10px 14px; background:#faf3e8;">${esc(data.occasion)}</td></tr>
          <tr><td style="padding:10px 14px; font-weight:bold; vertical-align:top;">Message</td><td style="padding:10px 14px; white-space:pre-wrap;">${esc(data.message)}</td></tr>
        </table>
        <p style="margin-top:16px; font-size:12px; color:#7a4a3a;">Sent automatically by floret.</p>
      </div>
    `;

    const raw = encodeRfc2822(NOTIFY_TO, `🌸 New Floret order — ${data.name}`, html);

    const res = await fetch("https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GMAIL_KEY,
      },
      body: JSON.stringify({ raw }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Gmail send failed", res.status, text);
      return { ok: false };
    }
    return { ok: true };
  });
