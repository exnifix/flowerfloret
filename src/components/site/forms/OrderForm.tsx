import { useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Field } from "./Field";
import { PaymentMethodPicker } from "./PaymentMethodPicker";
import { BouquetSelect } from "./BouquetSelect";
import { buildOrderPayload, submitOrder } from "@/lib/order";
import { bouquets } from "@/lib/bouquets";
import { DELIVERY_CHARGE } from "@/lib/contact-info";

type Status = "idle" | "sending" | "sent" | "error";

const fmt = (n: number) => `৳${n.toLocaleString("en-BD")}`;

type Props = {
  /** Pre-selected bouquet name (e.g. from a deep link). */
  initialBouquet?: string;
};

/** Full ordering form: customer details, bouquet pick, payment, submit + feedback. */
export function OrderForm({ initialBouquet = "" }: Props) {
  const [selectedBouquet, setSelectedBouquet] = useState(initialBouquet);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const submittingRef = useRef(false);

  const selected = useMemo(
    () => bouquets.find((b) => b.name === selectedBouquet),
    [selectedBouquet],
  );
  const bouquetPrice = selected?.price ?? 0;
  const total = bouquetPrice + DELIVERY_CHARGE;

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

      const res = await submitOrder(built.payload);
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
          placeholder="Paste your bKash TrxID here, and describe the feeling you want to send — colours, recipient, anything that matters."
          className="mt-2 w-full rounded-2xl bg-cream/60 border border-border px-5 py-4 text-sm focus:outline-none focus:border-rose focus:bg-cream transition-colors resize-none"
        />
      </div>

      <div className="rounded-2xl border border-rose/30 bg-cream-soft/70 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/55 mb-3">Order Summary</p>
        <dl className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-ink/70">
              {selected ? selected.name : <span className="italic text-ink/50">No bouquet selected yet</span>}
            </dt>
            <dd className="font-mono text-ink">{selected ? fmt(bouquetPrice) : "—"}</dd>
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
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-8 py-4 text-sm tracking-wide hover:bg-rose transition-colors disabled:opacity-60"
      >
        {status === "sending" ? (
          <><Loader2 className="size-4 animate-spin" /> Sending…</>
        ) : (
          <><Send className="size-4" /> {selected ? `Place Order — ${fmt(total)}` : "Place Your Order"}</>
        )}
      </button>

      {status === "sent" && (
        <p className="text-center text-sm text-rose font-italic italic animate-fade-up">
          Thank you — once we confirm your bKash payment to 01710538698, we'll begin composing your bouquet and reach out within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-red-600 animate-fade-up">{errorMsg}</p>
      )}
    </form>
  );
}
