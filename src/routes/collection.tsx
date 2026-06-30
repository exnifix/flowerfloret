import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { BouquetCard } from "@/components/site/BouquetCard";
import { bouquets } from "@/lib/bouquets";
import {
  CATEGORY_BY_SLUG,
  filterByCategorySlug,
  type CategorySlug,
} from "@/lib/categories";

type Search = { cat?: CategorySlug };

const CHIPS: { label: string; slug?: CategorySlug }[] = [
  { label: "All" },
  { label: "Wedding", slug: "wedding" },
  { label: "Birthday", slug: "birthday" },
  { label: "Anniversaries", slug: "anniversaries" },
  { label: "Cake & Flower", slug: "cake-and-flower" },
];

export const Route = createFileRoute("/collection")({
  validateSearch: (raw: Record<string, unknown>): Search => {
    const cat = typeof raw.cat === "string" ? (raw.cat as CategorySlug) : undefined;
    return cat && cat in CATEGORY_BY_SLUG ? { cat } : {};
  },
  head: () => ({
    meta: [
      { title: "Bouquet Collection — Floret Hand-Tied Floral Arrangements" },
      { name: "description", content: "Browse Floret's hand-tied bouquets and cake & flower combos by occasion — weddings, birthdays, anniversaries." },
      { property: "og:title", content: "Bouquet Collection — Floret" },
      { property: "og:description", content: "Hand-tied bouquets and cake combos, browsable by occasion." },
      { property: "og:url", content: "https://flowerfloret.lovable.app/collection" },
      { name: "twitter:title", content: "Bouquet Collection — Floret" },
      { name: "twitter:description", content: "Hand-tied bouquets and cake combos, browsable by occasion." },
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
  const { cat } = Route.useSearch();
  const filtered = filterByCategorySlug(bouquets, cat);
  const activeLabel = cat ? CATEGORY_BY_SLUG[cat] : "Every bloom";

  return (
    <Layout>
      <section className="pt-20 md:pt-28 pb-10 text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-rose mb-6 animate-fade-up">The Collection</p>
          <h1 className="font-serif text-6xl md:text-7xl text-ink leading-[1] animate-fade-up delay-100">
            {activeLabel}, <br />
            <span className="italic font-italic text-rose">a story</span>.
          </h1>
          <p className="mt-8 text-ink/70 leading-relaxed animate-fade-up delay-200">
            Hand-tied in our studio for the occasion you have in mind. Tap a category to narrow,
            or browse everything.
          </p>
        </div>
      </section>

      <section className="pb-6">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 flex flex-wrap justify-center gap-3">
          {CHIPS.map((chip) => {
            const active = (chip.slug ?? undefined) === cat;
            return (
              <Link
                key={chip.label}
                to="/collection"
                search={chip.slug ? { cat: chip.slug } : {}}
                className={`px-5 py-2 rounded-full border text-sm tracking-wide transition-all ${
                  active
                    ? "bg-rose text-cream border-rose shadow-sm"
                    : "bg-cream text-ink/75 border-blush hover:border-rose hover:text-rose"
                }`}
              >
                {chip.label}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="pb-24 md:pb-32 pt-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {filtered.length === 0 ? (
            <p className="text-center text-ink/60">No bouquets in this category yet — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((b, i) => (
                <BouquetCard key={b.slug} bouquet={b} index={i} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
