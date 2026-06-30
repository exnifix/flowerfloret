import { createServerFn } from "@tanstack/react-start";

type OrderPayload = {
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  instagram?: string | null;
  occasion?: string | null;
  message?: string | null;
  bouquet?: string | null;
  payment_method?: string | null;
  image_url?: string | null;
  image_urls?: string[] | null;
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
        <p style="margin:0 0 8px 0; color:#7a4a3a;">A new bloom request just arrived.</p>
        ${data.bouquet ? `<p style="margin:0 0 16px 0; font-size:18px; color:#3D0A05;"><strong>Bouquet requested:</strong> <span style="font-style:italic;">${esc(data.bouquet)}</span></p>` : `<p style="margin:0 0 16px 0; color:#7a4a3a;"><em>No specific bouquet selected — general inquiry.</em></p>`}
        <table style="width:100%; border-collapse:collapse; background:#fff; border-radius:8px; overflow:hidden;">
          <tr><td style="padding:10px 14px; font-weight:bold; width:120px;">Bouquet</td><td style="padding:10px 14px;">${esc(data.bouquet)}</td></tr>
          <tr><td style="padding:10px 14px; font-weight:bold; background:#faf3e8;">Name</td><td style="padding:10px 14px; background:#faf3e8;">${esc(data.name)}</td></tr>
          <tr><td style="padding:10px 14px; font-weight:bold;">Email</td><td style="padding:10px 14px;">${esc(data.email)}</td></tr>
          <tr><td style="padding:10px 14px; font-weight:bold; background:#faf3e8;">Phone</td><td style="padding:10px 14px; background:#faf3e8;">${esc(data.phone)}</td></tr>
          <tr><td style="padding:10px 14px; font-weight:bold; vertical-align:top;">Delivery Address</td><td style="padding:10px 14px; white-space:pre-wrap;">${esc(data.address)}</td></tr>
          <tr><td style="padding:10px 14px; font-weight:bold; background:#faf3e8;">Instagram</td><td style="padding:10px 14px; background:#faf3e8;">${data.instagram ? `@${esc(data.instagram)}` : "—"}</td></tr>
          <tr><td style="padding:10px 14px; font-weight:bold;">Payment</td><td style="padding:10px 14px;"><strong style="color:#3D0A05;">${esc(data.payment_method)}</strong></td></tr>
          <tr><td style="padding:10px 14px; font-weight:bold; background:#faf3e8;">Occasion</td><td style="padding:10px 14px; background:#faf3e8;">${esc(data.occasion)}</td></tr>
          <tr><td style="padding:10px 14px; font-weight:bold; vertical-align:top;">Message</td><td style="padding:10px 14px; white-space:pre-wrap;">${esc(data.message)}</td></tr>
        </table>
        ${(() => {
          const imgs = [
            ...(data.image_urls ?? []),
            ...(data.image_url && !(data.image_urls ?? []).includes(data.image_url) ? [data.image_url] : []),
          ];
          if (imgs.length === 0) return "";
          const tiles = imgs
            .map(
              (u) =>
                `<img src="${u}" alt="Customer reference" style="max-width:100%; width:280px; border-radius:8px; border:1px solid #eac3bf; margin:6px 6px 0 0;" />`,
            )
            .join("");
          return `<div style="margin-top:16px;"><p style="margin:0 0 8px 0; font-weight:bold;">📷 Reference photo${imgs.length > 1 ? "s" : ""} from customer (${imgs.length}):</p><div>${tiles}</div></div>`;
        })()}
        <p style="margin-top:16px; font-size:12px; color:#7a4a3a;">Sent automatically by floret.</p>
      </div>
    `;

    const subject = data.bouquet
      ? `🌸 New Floret order — ${data.name} — ${data.bouquet}`
      : `🌸 New Floret order — ${data.name}`;
    const raw = encodeRfc2822(NOTIFY_TO, subject, html);

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
