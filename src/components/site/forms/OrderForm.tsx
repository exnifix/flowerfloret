import { useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Minus, Plus, Send } from "lucide-react";
import { toast } from "sonner";
import { Field } from "./Field";
import { PaymentMethodPicker } from "./PaymentMethodPicker";
import { BouquetSelect } from "./BouquetSelect";
import { ImageUploadField } from "./ImageUploadField";
import { buildOrderPayload, submitOrder } from "@/lib/order";
import { bouquets } from "@/lib/bouquets";
import { DELIVERY_CHARGE } from "@/lib/contact-info";

type Status = "idle" | "sending" | "sent" | "error";

const fmt = (n: number) => `৳${n.toLocaleString("en-BD")}`;

type Props = {
  /** Pre-selected bouquet name (e.g. from a deep link). */
  initialBouquet?: string;
  /** Pre-filled customization summary appended to the order message. */
  customNote?: string;
};

/** Full ordering form: customer details, bouquet pick, payment, submit + feedback. */
export function OrderForm({ initialBouquet = "", customNote = "" }: Props) {
  const [selectedBouquet, setSelectedBouquet] = useState(initialBouquet);
  const [quantity, setQuantity] = useState(1);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const submittingRef = useRef(false);

  const selected = useMemo(
    () => bouquets.find((b) => b.name === selectedBouquet),
    [selectedBouquet],
  );
  const bouquetPrice = selected?.price ?? 0;
  const subtotal = bouquetPrice * quantity;
  const total = subtotal + DELIVERY_CHARGE;

  const MAX_QTY = 20;
  const stepQty = (delta: number) =>
    setQuantity((q) => Math.min(MAX_QTY, Math.max(1, q + delta)));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Hard guard against double-submission from fast taps / Enter spam.
    if (submittingRef.current) return;
    submittingRef.current = true;

    const form = e.currentTarget;
    setStatus("sending");
    setErrorMsg("");

    try {
      const built = buildOrderPayload(new FormData(form));
      if (!built.ok) {
        setStatus("error");
        setErrorMsg(built.error);
        toast.error("Please check your details", { description: built.error });
        return;
      }

      // Encode quantity into the bouquet field so the order email shows it
      // without needing a schema change.
      const payload = {
        ...built.payload,
        bouquet: built.payload.bouquet
          ? `${built.payload.bouquet} × ${quantity}`
          : built.payload.bouquet,
        image_urls: imageUrls,
      };

      const res = await submitOrder(payload);
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(res.error);
        toast.error("Order didn't go through", { description: res.error });
        return;
      }

      setStatus("sent");
      toast.success("Order received", {
        description: "We'll confirm your bKash payment and reach out shortly.",
      });
      form.reset();
      setSelectedBouquet("");
      setQuantity(1);
      setImageUrls([]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error. Please try again.";
      setStatus("error");
      setErrorMsg(message);
      toast.error("Something went wrong", { description: message });
    } finally {
      submittingRef.current = false;
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border/60 rounded-3xl p-6 md:p-10 space-y-5 shadow-[0_20px_60px_-30px_rgba(180,120,120,0.2)]"
    >
      <Field label="Your Name" name="name" placeholder="How shall we greet you?" required />
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
        <Field
          label="Phone (Bangladesh)"
          name="phone"
          type="tel"
          placeholder="+8801XXXXXXXXX"
          required
          pattern="^\+880\d{9,10}$|^0?1\d{9}$"
        />
      </div>
      <Field label="Delivery Address" name="address" placeholder="House, road, area, city" required />
      <Field label="Instagram (optional)" name="instagram" placeholder="@yourhandle" />

      <BouquetSelect value={selectedBouquet} onChange={setSelectedBouquet} />

      <div>
        <span className="text-xs uppercase tracking-[0.18em] text-ink/55">Quantity</span>
        <div className="mt-2 flex items-center justify-between rounded-2xl bg-cream/60 border border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => stepQty(-1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="inline-flex items-center justify-center size-9 rounded-full border border-border bg-card hover:bg-blush-soft/60 hover:border-rose/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="size-4" />
            </button>
            <input
              type="number"
              min={1}
              max={MAX_QTY}
              value={quantity}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                if (Number.isNaN(n)) return setQuantity(1);
                setQuantity(Math.min(MAX_QTY, Math.max(1, n)));
              }}
              aria-label="Quantity"
              className="w-14 text-center font-serif text-xl text-ink bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => stepQty(1)}
              disabled={quantity >= MAX_QTY}
              aria-label="Increase quantity"
              className="inline-flex items-center justify-center size-9 rounded-full border border-border bg-card hover:bg-blush-soft/60 hover:border-rose/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <span className="text-xs text-ink/55 italic">
            {selected ? `${quantity} × ${fmt(bouquetPrice)}` : "Select a bouquet first"}
          </span>
        </div>
      </div>

      <PaymentMethodPicker />

      <Field label="Occasion" name="occasion" placeholder="A birthday, an apology, a Tuesday…" />

      <div>
        <label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-ink/55">
          Tell us more
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={customNote ? `Customizations — ${customNote}\n\n` : ""}
          placeholder="Paste your bKash TrxID here, and describe the feeling you want to send — colours, recipient, anything that matters."
          className="mt-2 w-full rounded-2xl bg-cream/60 border border-border px-5 py-4 text-sm focus:outline-none focus:border-rose focus:bg-cream transition-colors resize-none"
        />
      </div>

      <ImageUploadField
        label="Reference photos (optional)"
        hint="Share designs you'd like us to recreate — colours, style, inspiration."
        values={imageUrls}
        onValuesChange={setImageUrls}
      />

      <div className="rounded-2xl border border-rose/30 bg-cream-soft/70 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/55 mb-3">Order Summary</p>
        <dl className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-ink/70">
              {selected ? (
                <>
                  {selected.name} <span className="text-ink/50">× {quantity}</span>
                </>
              ) : (
                <span className="italic text-ink/50">No bouquet selected yet</span>
              )}
            </dt>
            <dd className="font-mono text-ink">{selected ? fmt(subtotal) : "—"}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-ink/70">Delivery charge</dt>
            <dd className="font-mono text-ink">{fmt(DELIVERY_CHARGE)}</dd>
          </div>
          <div className="border-t border-border/60 pt-3 mt-2 flex items-center justify-between">
            <dt className="font-serif text-base text-ink">Total to pay</dt>
            <dd className="font-serif text-2xl text-rose">{selected ? fmt(total) : fmt(DELIVERY_CHARGE) + "+"}</dd>
          </div>
        </dl>
        {selected ? (
          <p className="mt-3 text-xs text-ink/60 leading-relaxed">
            Send <span className="font-medium text-ink">{fmt(total)}</span> via bKash Send Money, then paste the TrxID in the message below.
          </p>
        ) : (
          <p className="mt-3 text-xs text-ink/55 italic">Pick a bouquet above to see your full total.</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        aria-live="polite"
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-8 py-4 text-sm tracking-wide hover:bg-rose transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <><Loader2 className="size-4 animate-spin" /> Placing your order…</>
        ) : (
          <><Send className="size-4" /> {selected ? `Place Order — ${fmt(total)}` : "Place Your Order"}</>
        )}
      </button>

      {status === "sending" && (
        <p className="text-center text-xs text-ink/60 italic animate-fade-up">
          Hang tight — sending your order securely. Please don't close this page.
        </p>
      )}
      {status === "sent" && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-2xl border border-rose/40 bg-blush-soft/50 p-4 text-sm text-ink animate-fade-up"
        >
          <CheckCircle2 className="size-5 text-rose shrink-0 mt-0.5" strokeWidth={2} />
          <p className="font-italic italic leading-relaxed">
            Thank you — once we confirm your bKash payment to 01710538698, we'll begin composing your bouquet and reach out within 24 hours.
          </p>
        </div>
      )}
      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 animate-fade-up"
        >
          <AlertCircle className="size-5 shrink-0 mt-0.5" strokeWidth={2} />
          <p className="leading-relaxed">{errorMsg}</p>
        </div>
      )}
    </form>
  );
}
