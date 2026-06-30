import { SHOP_BKASH_NUMBER } from "@/lib/contact-info";

/** bKash-only payment instructions. The hidden input ensures payment_method is always submitted. */
export function PaymentMethodPicker() {
  return (
    <div>
      <span className="text-xs uppercase tracking-[0.18em] text-ink/55">Payment</span>
      <div className="mt-2 rounded-2xl border border-rose/40 bg-blush-soft/40 px-5 py-4 shadow-sm">
        <input type="hidden" name="payment_method" value="bKash" />
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-serif text-lg text-ink">bKash — Send Money</div>
            <div className="text-xs text-ink/60 mt-0.5">Account type: Personal</div>
          </div>
          <a
            href={`tel:${SHOP_BKASH_NUMBER}`}
            className="font-mono text-base text-ink tracking-wide bg-cream px-3 py-1.5 rounded-full border border-border"
          >
            {SHOP_BKASH_NUMBER}
          </a>
        </div>
        <ol className="mt-3 space-y-1 text-xs text-ink/70 leading-relaxed list-decimal list-inside">
          <li>Open bKash → <span className="font-medium">Send Money</span> to <span className="font-mono">{SHOP_BKASH_NUMBER}</span>.</li>
          <li>Send the <span className="font-medium">Total to pay</span> shown in the Order Summary below (bouquet price + ৳80 delivery).</li>
          <li>Place your order below and paste your <span className="font-medium">bKash TrxID</span> in the message field so we can confirm and start preparing your flowers.</li>
        </ol>
      </div>
    </div>
  );
}

