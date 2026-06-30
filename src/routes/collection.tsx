import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/site/Layout";

import { BouquetCard } from "@/components/site/BouquetCard";
import { bouquets, getProductCode } from "@/lib/bouquets";
import {
  CATEGORY_BY_SLUG,
  filterByCategorySlug,
  type CategorySlug,
} from "@/lib/categories";

type Search = { cat?: CategorySlug; q?: string };

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
    const q = typeof raw.q === "string" && raw.q.trim() ? raw.q.trim() : undefined;
    const out: Search = {};
    if (cat && cat in CATEGORY_BY_SLUG) out.cat = cat;
    if (q) out.q = q;
    return out;
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

function matchesQuery(b: (typeof bouquets)[number], needle: string): boolean {
  return (
    b.name.toLowerCase().includes(needle) ||
    b.slug.toLowerCase().includes(needle) ||
    b.tagline.toLowerCase().includes(needle) ||
    (b.category?.toLowerCase().includes(needle) ?? false) ||
    getProductCode(b.slug).toLowerCase().includes(needle)
  );
}

function CollectionPage() {
  const { cat, q } = Route.useSearch() as Search;
  const navigate = useNavigate({ from: "/collection" });

  // Local input state so each keystroke does not trigger a router navigation + full re-render
  const [input, setInput] = useState(q ?? "");
  useEffect(() => {
    setInput(q ?? "");
  }, [q]);

  // Debounce URL sync (200ms) so the address bar updates without thrashing
  useEffect(() => {
    const trimmed = input.trim();
    const next = trimmed ? trimmed : undefined;
    if (next === q) return;
    const id = setTimeout(() => {
      navigate({ search: (prev: Search) => ({ ...prev, q: next }), replace: true });
    }, 200);
    return () => clearTimeout(id);
  }, [input, q, navigate]);

  const filtered = useMemo(() => {
    const byCat = filterByCategorySlug(bouquets, cat);
    const needle = input.trim().toLowerCase();
    return needle ? byCat.filter((b) => matchesQuery(b, needle)) : byCat;
  }, [cat, input]);

  const activeLabel: string = cat ? CATEGORY_BY_SLUG[cat] : "Every bloom";


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
            Hand-tied in our studio for the occasion you have in mind. Search by name or browse by category.
          </p>
        </div>
      </section>

      <section className="pb-4">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <label htmlFor="bouquet-search" className="sr-only">
            Search bouquets by name
          </label>
          <div className="relative">
            <Search className="size-4 text-ink/50 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
            <input
              id="bouquet-search"
              type="search"
              inputMode="search"
              autoComplete="off"
              placeholder="Search by name, code, or feeling…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-full bg-cream border border-blush/70 pl-11 pr-11 py-3 text-sm text-ink placeholder:text-ink/45 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/20 transition-all"
            />
            {input && (
              <button
                type="button"
                onClick={() => setInput("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 size-7 grid place-items-center rounded-full text-ink/60 hover:text-rose hover:bg-blush-soft transition-colors"
              >
                <X className="size-4" strokeWidth={1.5} />
              </button>
            )}

          </div>
        </div>
      </section>

      <section className="pb-6 pt-4">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 flex flex-wrap justify-center gap-3">
          {CHIPS.map((chip) => {
            const active = (chip.slug ?? undefined) === cat;
            return (
              <Link
                key={chip.label}
                to="/collection"
                search={(prev: Search) => ({ ...prev, cat: chip.slug })}
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
          {q && (
            <p className="text-center text-sm text-ink/60 mb-8">
              {filtered.length} {filtered.length === 1 ? "result" : "results"} for{" "}
              <span className="italic text-ink">"{q}"</span>
            </p>
          )}
          {filtered.length === 0 ? (
            <p className="text-center text-ink/60">
              {q ? "No bouquets match that search. Try another name." : "No bouquets in this category yet — check back soon."}
            </p>
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
