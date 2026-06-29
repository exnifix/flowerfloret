import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, Phone, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Layout } from "@/components/site/Layout";
import { supabase } from "@/integrations/supabase/client";
import { notifyNewOrder } from "@/lib/notify-order.functions";
import { bouquets, getBouquet } from "@/lib/bouquets";

const ORDER_EMAIL = "pusnojawadraiyan@gmail.com";
const ORDER_PHONE = "01718159391";
const ORDER_INSTA = "flo.rettt";
const ORDER_INSTA_URL = "https://www.instagram.com/flo.rettt/";
const ORDER_INSTA_DISPLAY = "floret";

const searchSchema = z.object({ bouquet: z.string().optional() });

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Contact Floret — Bespoke Bouquets & Event Florals" },
      { name: "description", content: "Tell us about your floral dreams. Floret takes bespoke orders, weddings, and event commissions — reach us by email, phone, or Instagram." },
      { property: "og:title", content: "Contact Floret — Bespoke Bouquets & Event Florals" },
      { property: "og:description", content: "Tell us about your floral dreams — bespoke orders and event commissions." },
      { property: "og:url", content: "https://flowerfloret.lovable.app/contact" },
      { name: "twitter:title", content: "Contact Floret" },
      { name: "twitter:description", content: "Tell us about your floral dreams." },
    ],
    links: [{ rel: "canonical", href: "https://flowerfloret.lovable.app/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Floret",
          description: "Small floral studio offering hand-tied bouquets, bespoke arrangements, and event florals by appointment.",
          url: "https://flowerfloret.lovable.app",
          email: "pusnojawadraiyan@gmail.com",
          telephone: "+8801718159391",
          priceRange: "$$",
          sameAs: [ORDER_INSTA_URL],
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { bouquet: bouquetParam } = Route.useSearch();
  const initialBouquet = bouquetParam && getBouquet(bouquetParam) ? getBouquet(bouquetParam)!.name : "";
  const [selectedBouquet, setSelectedBouquet] = useState<string>(initialBouquet);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const rawPhone = String(fd.get("phone") || "").trim().replace(/\s|-/g, "");
    const phone = rawPhone.startsWith("+880")
      ? rawPhone
      : rawPhone
      ? `+880${rawPhone.replace(/^0+/, "")}`
      : "";
    if (!/^\+880\d{9,10}$/.test(phone)) {
      setStatus("error");
      setErrorMsg("Please enter a valid Bangladeshi phone number starting with +880 (e.g. +8801718159391).");
      return;
    }
    const address = String(fd.get("address") || "").trim();
    if (!address) {
      setStatus("error");
      setErrorMsg("Please provide a delivery address.");
      return;
    }
    const rawInsta = String(fd.get("instagram") || "").trim().replace(/^@/, "");
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone,
      address,
      instagram: rawInsta || null,
      occasion: String(fd.get("occasion") || "").trim() || null,
      message: String(fd.get("message") || "").trim() || null,
      bouquet: String(fd.get("bouquet") || "").trim() || null,
    };

    const { error } = await supabase.from("orders").insert(payload);
    if (error) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again, or reach us on Instagram @floret.");
      return;
    }
    notifyNewOrder({ data: payload }).catch((err) => console.error("notify failed", err));
    setStatus("sent");
    form.reset();
    setSelectedBouquet("");
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
            <div>
              <label htmlFor="bouquet-select" className="text-xs uppercase tracking-[0.18em] text-ink/55">Which bouquet?</label>
              <select
                id="bouquet-select"
                name="bouquet"
                value={selectedBouquet}
                onChange={(e) => setSelectedBouquet(e.target.value)}
                className="mt-2 w-full rounded-full bg-cream/60 border border-border px-5 py-3.5 text-sm focus:outline-none focus:border-rose focus:bg-cream transition-colors appearance-none cursor-pointer"
              >
                <option value="">— Not sure yet / surprise me —</option>
                {bouquets.map((b) => (
                  <option key={b.slug} value={b.name}>{b.name} — ৳{b.price.toLocaleString("en-BD")}</option>
                ))}
                <option value="Custom / Build your own">Custom / Build your own</option>
              </select>
            </div>
            <Field label="Occasion" name="occasion" placeholder="A birthday, an apology, a Tuesday…" />
            <div>
              <label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-ink/55">Tell us more</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Describe the feeling you want to send. Colours, recipient, anything that matters."
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
                Thank you — your order has bloomed into our studio. We'll reach out within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-600 animate-fade-up">{errorMsg}</p>
            )}
          </form>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
            <InfoCard icon={<Mail className="size-4" />} label="Email" value={ORDER_EMAIL} href={`mailto:${ORDER_EMAIL}`} />
            <InfoCard icon={<Phone className="size-4" />} label="Phone" value={ORDER_PHONE} href={`tel:+880${ORDER_PHONE.replace(/^0/, "")}`} />
            <InfoCard icon={<Instagram className="size-4" />} label="Instagram" value={`@${ORDER_INSTA_DISPLAY}`} href={ORDER_INSTA_URL} />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, name, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-[0.18em] text-ink/55">{label}</label>
      <input
        id={id}
        name={name}
        {...rest}
        className="mt-2 w-full rounded-full bg-cream/60 border border-border px-5 py-3.5 text-sm focus:outline-none focus:border-rose focus:bg-cream transition-colors"
      />
    </div>
  );
}

function InfoCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <div className="mx-auto size-9 rounded-full bg-blush-soft grid place-items-center text-rose mb-2">{icon}</div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-ink/55">{label}</p>
      <p className="font-serif text-lg text-ink break-all">{value}</p>
    </>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block rounded-2xl bg-cream-soft/60 p-5 hover:bg-blush-soft/60 transition-colors">{inner}</a>
  ) : (
    <div className="rounded-2xl bg-cream-soft/60 p-5">{inner}</div>
  );
}
