import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { BouquetCard } from "@/components/site/BouquetCard";
import { bouquets } from "@/lib/bouquets";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Bouquet Collection — Floret Hand-Tied Floral Arrangements" },
      { name: "description", content: "Browse Floret's signature hand-tied bouquet collection. Six seasonal compositions, each crafted as a gesture of feeling — from tender blush to deep burgundy." },
      { property: "og:title", content: "Bouquet Collection — Floret Hand-Tied Floral Arrangements" },
      { property: "og:description", content: "Six signature compositions, hand-tied as gestures." },
      { property: "og:url", content: "https://flowerfloret.lovable.app/collection" },
      { name: "twitter:title", content: "Bouquet Collection — Floret" },
      { name: "twitter:description", content: "Six signature compositions, hand-tied as gestures." },
    ],
    links: [{ rel: "canonical", href: "https://flowerfloret.lovable.app/collection" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Floret Bouquet Collection",
          url: "https://flowerfloret.lovable.app/collection",
        }),
      },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  return (
    <Layout>
      <section className="pt-20 md:pt-28 pb-12 text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-rose mb-6 animate-fade-up">The Collection</p>
          <h1 className="font-serif text-6xl md:text-7xl text-ink leading-[1] animate-fade-up delay-100">
            Every bloom, <br /><span className="italic font-italic text-rose">a story</span>.
          </h1>
          <p className="mt-8 text-ink/70 leading-relaxed animate-fade-up delay-200">
            Six signature compositions, each hand-tied in our studio and intended for a particular shade of feeling.
            Tap any bouquet for the full description.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {bouquets.map((b, i) => (
            <BouquetCard key={b.slug} bouquet={b} index={i} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
