import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ShoppingBag, Sparkles } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { bouquets, getBouquet } from "@/lib/bouquets";
import { BouquetCard } from "@/components/site/BouquetCard";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const bouquet = getBouquet(params.slug);
    if (!bouquet) throw notFound();
    return { bouquet };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.bouquet.name} — Floret` },
          { name: "description", content: loaderData.bouquet.description.slice(0, 160) },
          { property: "og:title", content: `${loaderData.bouquet.name} — Floret` },
          { property: "og:description", content: loaderData.bouquet.tagline },
          { property: "og:image", content: loaderData.bouquet.image },
        ]
      : [{ title: "Floret" }],
  }),
  notFoundComponent: () => (
    <Layout>
      <div className="py-32 text-center">
        <h1 className="font-serif text-4xl">Bouquet not found</h1>
        <Link to="/collection" className="mt-6 inline-block text-rose underline">
          Back to collection
        </Link>
      </div>
    </Layout>
  ),
  component: ProductPage,
});

const perks = [
  "Handcrafted with premium, fresh-cut stems",
  "Includes a personalised handwritten message card",
  "Care instructions tucked inside every wrap",
  "Same-day delivery available within the city",
];

function ProductPage() {
  const { bouquet } = Route.useLoaderData();
  const related = bouquets.filter((b) => b.slug !== bouquet.slug).slice(0, 3);

  return (
    <Layout>
      <section className="pt-12 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-rose transition-colors mb-10"
          >
            <ArrowLeft className="size-4" /> Back to Collection
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="relative animate-fade-up">
              <div className="absolute -inset-4 bg-blush/15 rounded-[2.5rem] blur-2xl" />
              <img
                src={bouquet.image}
                alt={bouquet.name}
                width={800}
                height={1000}
                className="relative w-full rounded-[2rem] object-cover aspect-[4/5]"
              />
            </div>

            <div className="animate-fade-up delay-100">
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-sage/30 text-ink/70 uppercase tracking-[0.18em]">
                {bouquet.category}
              </span>
              <h1 className="mt-6 font-serif text-5xl md:text-7xl text-ink leading-[1]">{bouquet.name}</h1>
              <p className="mt-3 font-italic italic text-xl text-ink/60">{bouquet.tagline}</p>

              <div className="mt-8 flex items-center gap-4">
                <span className="font-serif text-3xl text-rose">${bouquet.price.toFixed(2)}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full bg-sage/30 text-ink/70">
                  In Stock
                </span>
              </div>

              <p className="mt-8 text-ink/75 leading-relaxed text-lg">{bouquet.description}</p>

              <div className="mt-8 rounded-2xl bg-cream-soft/70 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-rose mb-3 flex items-center gap-2">
                  <Sparkles className="size-3.5" /> {bouquet.emotion}
                </p>
                <h3 className="font-serif text-xl mb-4">Composed with</h3>
                <ul className="space-y-2">
                  {bouquet.stems.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-ink/75">
                      <span className="mt-1.5 size-1.5 rounded-full bg-rose shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 space-y-3">
                {perks.map((p) => (
                  <div key={p} className="flex items-start gap-3 text-sm text-ink/75">
                    <Check className="size-4 text-rose mt-0.5 shrink-0" strokeWidth={2} /> {p}
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="mt-10 w-full inline-flex items-center justify-center gap-2 rounded-full bg-blush-soft hover:bg-blush text-ink px-8 py-5 text-sm tracking-wide transition-colors"
              >
                <ShoppingBag className="size-4" />
                Inquire About This Arrangement
              </Link>

              <div className="mt-6 rounded-2xl bg-cream-soft/60 p-5 text-sm text-ink/70">
                <p className="font-serif text-base text-ink mb-1">Need help choosing?</p>
                <p>
                  Tell us the feeling — gratitude, longing, congratulations — and we'll suggest the
                  perfect composition.{" "}
                  <Link to="/contact" className="text-rose underline">Message us</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-soft/60 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-serif text-3xl md:text-4xl mb-10">You may also love</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {related.map((b, i) => (
              <BouquetCard key={b.slug} bouquet={b} index={i} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
