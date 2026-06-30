import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { HelpForm } from "@/components/site/forms/HelpForm";
import { InfoCard } from "@/components/site/forms/InfoCard";
import {
  SHOP_EMAIL,
  SHOP_INSTA_DISPLAY,
  SHOP_INSTA_URL,
} from "@/lib/contact-info";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Floret — We're Here to Help" },
      { name: "description", content: "Have a question about our flowers? Reach Floret for suggestions, custom requests, or general help — by email or Instagram." },
      { property: "og:title", content: "Contact Floret — We're Here to Help" },
      { property: "og:description", content: "Have a question? Floret is here to help — by email or Instagram." },
      { property: "og:url", content: "https://flowerfloret.lovable.app/contact" },
      { name: "twitter:title", content: "Contact Floret" },
      { name: "twitter:description", content: "We're here to help." },
    ],
    links: [{ rel: "canonical", href: "https://flowerfloret.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Layout>
      <section className="pt-16 pb-12 text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-rose mb-6 animate-fade-up">We're Here to Help</p>
          <h1 className="font-serif text-6xl md:text-7xl text-ink leading-[1] animate-fade-up delay-100">
            Ask <span className="italic font-italic text-rose">Floret</span>
          </h1>
          <p className="mt-6 italic font-italic text-ink/60 text-lg animate-fade-up delay-200">
            Suggestions, custom requests, or just a flower question — write to us.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <HelpForm />

          <div className="mt-10 grid sm:grid-cols-2 gap-4 text-center">
            <InfoCard icon={<Mail className="size-4" />} label="Email" value={SHOP_EMAIL} href={`mailto:${SHOP_EMAIL}`} />
            <InfoCard icon={<Instagram className="size-4" />} label="Instagram" value={`@${SHOP_INSTA_DISPLAY}`} href={SHOP_INSTA_URL} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
