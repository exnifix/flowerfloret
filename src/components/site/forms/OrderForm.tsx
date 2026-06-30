import { useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const built = buildOrderPayload(new FormData(form));
    if (!built.ok) {
      setStatus("error");
      setErrorMsg(built.error);
      return;
    }

    const res = await submitOrder(built.payload);
    if (!res.ok) {
      setStatus("error");
      setErrorMsg(res.error);
      return;
    }

    setStatus("sent");
    form.reset();
    setSelectedBouquet("");
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

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-8 py-4 text-sm tracking-wide hover:bg-rose transition-colors disabled:opacity-60"
      >
        {status === "sending" ? (
          <><Loader2 className="size-4 animate-spin" /> Sending…</>
        ) : (
          <><Send className="size-4" /> Place Your Order</>
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
