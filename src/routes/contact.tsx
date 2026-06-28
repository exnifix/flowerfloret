import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";

const ORDER_EMAIL = "pusnojawadraiyan@gmail.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Floret" },
      { name: "description", content: "Tell us about your floral dreams. Floret takes bespoke orders and event commissions." },
      { property: "og:title", content: "Contact — Floret" },
      { property: "og:description", content: "Tell us about your floral dreams." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") || "";
    const email = fd.get("email") || "";
    const phone = fd.get("phone") || "";
    const occasion = fd.get("occasion") || "";
    const message = fd.get("message") || "";
    const subject = encodeURIComponent(`Floret order from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nOccasion: ${occasion}\n\n${message}`
    );
    window.location.href = `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Layout>
      <section className="pt-16 pb-12 text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-rose mb-6 animate-fade-up">Reach Out</p>
          <h1 className="font-serif text-6xl md:text-7xl text-ink leading-[1] animate-fade-up delay-100">
            Let's Create <span className="italic font-italic text-rose">Magic</span>
          </h1>
          <p className="mt-6 italic font-italic text-ink/60 text-lg animate-fade-up delay-200">
            Tell us about your floral dreams
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border/60 rounded-3xl p-6 md:p-10 space-y-5 shadow-[0_20px_60px_-30px_rgba(180,120,120,0.2)]"
          >
            <Field label="Your Name" name="name" placeholder="How shall we greet you?" required />
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
              <Field label="Phone" name="phone" placeholder="Optional" />
            </div>
            <Field label="Occasion" name="occasion" placeholder="A birthday, an apology, a Tuesday…" />
            <div>
              <label className="text-xs uppercase tracking-[0.18em] text-ink/55">Tell us more</label>
              <textarea
                name="message"
                rows={5}
                placeholder="Describe the feeling you want to send. Colours, recipient, anything that matters."
                className="mt-2 w-full rounded-2xl bg-cream/60 border border-border px-5 py-4 text-sm focus:outline-none focus:border-rose focus:bg-cream transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-8 py-4 text-sm tracking-wide hover:bg-rose transition-colors"
            >
              <Send className="size-4" /> Send Message
            </button>
            {sent && (
              <p className="text-center text-sm text-rose font-italic italic animate-fade-up">
                Thank you — your email is opening now. We'll bloom into your inbox very soon.
              </p>
            )}
          </form>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
            <InfoCard icon={<Mail className="size-4" />} label="Email" value={ORDER_EMAIL} />
            <InfoCard icon={<Instagram className="size-4" />} label="Instagram" value="@floret" />
            <InfoCard icon={<MapPin className="size-4" />} label="Studio" value="By appointment" />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.18em] text-ink/55">{label}</label>
      <input
        {...rest}
        className="mt-2 w-full rounded-full bg-cream/60 border border-border px-5 py-3.5 text-sm focus:outline-none focus:border-rose focus:bg-cream transition-colors"
      />
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-cream-soft/60 p-5">
      <div className="mx-auto size-9 rounded-full bg-blush-soft grid place-items-center text-rose mb-2">{icon}</div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-ink/55">{label}</p>
      <p className="font-serif text-lg text-ink break-all">{value}</p>
    </div>
  );
}
