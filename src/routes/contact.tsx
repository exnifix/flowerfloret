import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, Phone } from "lucide-react";
import { z } from "zod";
import { Layout } from "@/components/site/Layout";
import { OrderForm } from "@/components/site/forms/OrderForm";
import { InfoCard } from "@/components/site/forms/InfoCard";
import { getBouquet } from "@/lib/bouquets";
import {
  SHOP_EMAIL,
  SHOP_INSTA_DISPLAY,
  SHOP_INSTA_URL,
  SHOP_PHONE,
  SHOP_PHONE_TEL_HREF,
} from "@/lib/contact-info";

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
          email: SHOP_EMAIL,
          telephone: `+880${SHOP_PHONE.replace(/^0/, "")}`,
          priceRange: "$$",
          sameAs: [SHOP_INSTA_URL],
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { bouquet: bouquetParam } = Route.useSearch();
  const initialBouquet = bouquetParam ? getBouquet(bouquetParam)?.name ?? "" : "";

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
          <OrderForm initialBouquet={initialBouquet} />

          <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
            <InfoCard icon={<Mail className="size-4" />} label="Email" value={SHOP_EMAIL} href={`mailto:${SHOP_EMAIL}`} />
            <InfoCard icon={<Phone className="size-4" />} label="Phone" value={SHOP_PHONE} href={SHOP_PHONE_TEL_HREF} />
            <InfoCard icon={<Instagram className="size-4" />} label="Instagram" value={`@${SHOP_INSTA_DISPLAY}`} href={SHOP_INSTA_URL} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
