import { supabase } from "@/integrations/supabase/client";
import { notifyNewOrder } from "@/lib/notify-order.functions";

export type PaymentMethod = "bKash" | "Nagad" | "Cash on Delivery";

export type OrderPayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
  instagram: string | null;
  occasion: string | null;
  message: string | null;
  bouquet: string | null;
  payment_method: string;
};

export type OrderFormResult =
  | { ok: true; payload: OrderPayload }
  | { ok: false; error: string };

const PHONE_RE = /^\+880\d{9,10}$/;

/** Normalise a user-typed BD phone to canonical +880XXXXXXXXXX form. */
export function normalizeBdPhone(raw: string): string {
  const stripped = raw.trim().replace(/\s|-/g, "");
  if (!stripped) return "";
  if (stripped.startsWith("+880")) return stripped;
  return `+880${stripped.replace(/^0+/, "")}`;
}

/** Build + validate an order payload from a FormData snapshot. */
export function buildOrderPayload(fd: FormData): OrderFormResult {
  const phone = normalizeBdPhone(String(fd.get("phone") || ""));
  if (!PHONE_RE.test(phone)) {
    return {
      ok: false,
      error:
        "Please enter a valid Bangladeshi phone number starting with +880 (e.g. +8801710538698).",
    };
  }

  const address = String(fd.get("address") || "").trim();
  if (!address) return { ok: false, error: "Please provide a delivery address." };

  const payment_method = String(fd.get("payment_method") || "").trim();
  if (!payment_method) return { ok: false, error: "Please choose a payment method." };

  const instagram = String(fd.get("instagram") || "").trim().replace(/^@/, "") || null;

  return {
    ok: true,
    payload: {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone,
      address,
      instagram,
      occasion: String(fd.get("occasion") || "").trim() || null,
      message: String(fd.get("message") || "").trim() || null,
      bouquet: String(fd.get("bouquet") || "").trim() || null,
      payment_method,
    },
  };
}

/** Persist the order and fire off the owner notification (best-effort). */
export async function submitOrder(payload: OrderPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const { error } = await supabase.from("orders").insert(payload);
  if (error) {
    return {
      ok: false,
      error: "Something went wrong. Please try again, or reach us on Instagram @floret.",
    };
  }
  notifyNewOrder({ data: payload }).catch((err) => console.error("notify failed", err));
  return { ok: true };
}
