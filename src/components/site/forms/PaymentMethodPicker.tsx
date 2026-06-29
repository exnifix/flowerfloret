import { SHOP_PHONE } from "@/lib/contact-info";

const OPTIONS = [
  { value: "bKash", label: "bKash", hint: `Send to ${SHOP_PHONE}` },
  { value: "Nagad", label: "Nagad", hint: `Send to ${SHOP_PHONE}` },
  { value: "Cash on Delivery", label: "Cash on Delivery", hint: "Pay when it arrives" },
] as const;

/** Radio-card group for picking how the customer will pay. */
export function PaymentMethodPicker() {
  return (
    <div>
      <span className="text-xs uppercase tracking-[0.18em] text-ink/55">Payment method</span>
      <div className="mt-2 grid sm:grid-cols-3 gap-3">
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="cursor-pointer rounded-2xl border border-border bg-cream/60 px-4 py-3 text-sm hover:border-rose transition-colors has-[:checked]:border-rose has-[:checked]:bg-blush-soft/50 has-[:checked]:shadow-sm"
          >
            <input type="radio" name="payment_method" value={opt.value} className="sr-only" required />
            <div className="font-serif text-base text-ink">{opt.label}</div>
            <div className="text-[11px] text-ink/55 mt-0.5">{opt.hint}</div>
          </label>
        ))}
      </div>
    </div>
  );
}
