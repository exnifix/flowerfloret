import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/admin-orders.functions";
import type { listAdminOrders } from "@/lib/admin-orders.functions";

type Order = Awaited<ReturnType<typeof listAdminOrders>>[number];

const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_STYLE: Record<OrderStatus, string> = {
  new: "bg-blush-soft text-ink",
  confirmed: "bg-amber-100 text-amber-900",
  preparing: "bg-blue-100 text-blue-900",
  out_for_delivery: "bg-indigo-100 text-indigo-900",
  delivered: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-red-100 text-red-900",
};

// --- PII masking helpers (display-only) -----------------------------------
function maskEmail(email: string | null | undefined): string {
  if (!email) return "—";
  const [name, domain] = email.split("@");
  if (!domain) return "•••";
  const head = name.slice(0, 2);
  return `${head}${"•".repeat(Math.max(1, name.length - 2))}@${domain}`;
}
function maskPhone(phone: string | null | undefined): string {
  if (!phone) return "—";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return "•".repeat(phone.length);
  const tail = digits.slice(-3);
  return `${phone.slice(0, Math.min(4, phone.length - 3))}•••••${tail}`;
}
function maskAddress(address: string | null | undefined): string {
  if (!address) return "—";
  const firstLine = address.split(/\r?\n/)[0] ?? "";
  if (firstLine.length <= 12) return firstLine.replace(/.(?=.{2})/g, "•");
  return `${firstLine.slice(0, 8)}••• ${firstLine.slice(-3)}`;
}
function maskInstagram(handle: string | null | undefined): string {
  if (!handle) return "—";
  const h = handle.replace(/^@/, "");
  if (h.length <= 2) return `@${h}`;
  return `@${h.slice(0, 2)}${"•".repeat(Math.max(1, h.length - 2))}`;
}

export function OrderDetailsDrawer({
  order,
  open,
  onOpenChange,
  onStatusChange,
  isUpdating,
}: {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (id: string, status: OrderStatus) => void;
  isUpdating: boolean;
}) {
  const [revealed, setRevealed] = useState(false);

  // Reset reveal whenever the drawer closes or switches order
  const handleOpenChange = (next: boolean) => {
    if (!next) setRevealed(false);
    onOpenChange(next);
  };

  if (!order) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-lg bg-cream" />
      </Sheet>
    );
  }

  const status = (order.status ?? "new") as OrderStatus;
  const show = (real: string | null | undefined, masked: string) =>
    revealed ? (real ?? "—") : masked;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto bg-cream"
      >
        <SheetHeader className="text-left">
          <div className="flex items-start justify-between gap-3">
            <div>
              <SheetTitle className="font-serif text-2xl text-ink">
                {order.bouquet ?? "Custom order"}
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                Received {new Date(order.created_at).toLocaleString()}
              </SheetDescription>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLE[status]}`}
            >
              {STATUS_LABEL[status]}
            </span>
          </div>
        </SheetHeader>

        {/* Status updater */}
        <section className="mt-5 rounded-xl border border-border bg-white p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Update status (admin only)
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {ORDER_STATUSES.map((s) => {
              const isActive = s === status;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={isUpdating || isActive}
                  onClick={() => onStatusChange(order.id, s)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors disabled:opacity-60 ${
                    isActive
                      ? "border-ink bg-ink text-cream"
                      : "border-border bg-white text-ink hover:bg-blush-soft"
                  }`}
                >
                  {STATUS_LABEL[s]}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            {order.status_updated_at
              ? `Last updated ${new Date(order.status_updated_at).toLocaleString()}`
              : "No status change recorded yet."}
          </p>
        </section>


        {/* Customer (masked by default) */}
        <section className="mt-5 rounded-xl border border-border bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground">
              Customer details
            </h3>
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              className="rounded-full border border-border px-3 py-1 text-[11px] hover:bg-blush-soft"
              aria-pressed={revealed}
            >
              {revealed ? "Hide details" : "Reveal details"}
            </button>
          </div>
          <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-sm">
            <Field label="Name" value={order.name} />
            <Field
              label="Email"
              value={show(order.email, maskEmail(order.email))}
              copyValue={revealed ? order.email : null}
            />
            <Field
              label="Phone"
              value={show(order.phone, maskPhone(order.phone))}
              copyValue={revealed ? order.phone : null}
            />
            <Field
              label="Address"
              value={show(order.address, maskAddress(order.address))}
              copyValue={revealed ? order.address : null}
              multiline
            />
            <Field
              label="Instagram"
              value={show(order.instagram, maskInstagram(order.instagram))}
            />
            <Field label="Occasion" value={order.occasion} />
            <Field label="Payment" value={order.payment_method} />
          </dl>
          {!revealed && (
            <p className="mt-3 text-[11px] text-muted-foreground">
              Sensitive fields are masked. Reveal only when needed to fulfill the order.
            </p>
          )}
        </section>

        {/* Submitted message — safe rendering */}
        {order.message && (
          <section className="mt-5 rounded-xl border border-border bg-white p-4">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground">
              Customer message
            </h3>
            <SafeMessage text={order.message} />
          </section>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Field({
  label,
  value,
  copyValue,
  multiline,
}: {
  label: string;
  value: string | null | undefined;
  copyValue?: string | null;
  multiline?: boolean;
}) {
  return (
    <>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground self-center">
        {label}
      </dt>
      <dd className="text-ink break-words">
        {value ? (
          <span className={multiline ? "whitespace-pre-wrap" : undefined}>{value}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
        {copyValue ? (
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(copyValue)}
            className="ml-2 text-[11px] text-muted-foreground underline hover:text-ink"
          >
            copy
          </button>
        ) : null}
      </dd>
    </>
  );
}

/**
 * Renders a user-submitted message as plain text only.
 * - No dangerouslySetInnerHTML
 * - Preserves line breaks via whitespace-pre-wrap
 * - Auto-links http/https URLs with rel="noopener noreferrer nofollow"
 *   while still escaping all other content as text.
 */
function SafeMessage({ text }: { text: string }) {
  const urlRegex = /\bhttps?:\/\/[^\s<>"']+/gi;
  const parts: Array<{ kind: "text" | "url"; value: string }> = [];
  let lastIndex = 0;
  for (const match of text.matchAll(urlRegex)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      parts.push({ kind: "text", value: text.slice(lastIndex, start) });
    }
    parts.push({ kind: "url", value: match[0] });
    lastIndex = start + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ kind: "text", value: text.slice(lastIndex) });
  }

  return (
    <div className="mt-2 max-h-72 overflow-y-auto whitespace-pre-wrap break-words rounded-lg bg-cream p-3 font-sans text-sm text-ink">
      {parts.map((p, i) =>
        p.kind === "url" ? (
          <a
            key={i}
            href={p.value}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-ink underline underline-offset-2"
          >
            {p.value}
          </a>
        ) : (
          <span key={i}>{p.value}</span>
        ),
      )}
    </div>
  );
}
