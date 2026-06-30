import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Sparkles } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { bouquets, getBouquet } from "@/lib/bouquets";
import { BouquetCard } from "@/components/site/BouquetCard";


export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const bouquet = getBouquet(params.slug);
    if (!bouquet) throw notFound();
    return { bouquet };
  },
  head: ({ params, loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.bouquet.name} — ${loaderData.bouquet.tagline} | Floret` },
          { name: "description", content: loaderData.bouquet.description.slice(0, 160) },
          { property: "og:title", content: `${loaderData.bouquet.name} — Floret` },
          { property: "og:description", content: loaderData.bouquet.tagline },
          { property: "og:type", content: "product" },
          { property: "og:image", content: loaderData.bouquet.image },
          { property: "og:url", content: `https://flowerfloret.lovable.app/product/${params.slug}` },
          { property: "product:price:amount", content: loaderData.bouquet.price.toString() },
          { property: "product:price:currency", content: "BDT" },
          { name: "twitter:title", content: `${loaderData.bouquet.name} — Floret` },
          { name: "twitter:description", content: loaderData.bouquet.tagline },
          { name: "twitter:image", content: loaderData.bouquet.image },
        ]
      : [{ title: "Floret" }],
    links: loaderData
      ? [
          { rel: "canonical", href: `https://flowerfloret.lovable.app/product/${params.slug}` },
          { rel: "preload", as: "image", href: loaderData.bouquet.image, fetchpriority: "high" },
        ]
      : [],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: loaderData.bouquet.name,
              description: loaderData.bouquet.description,
              image: loaderData.bouquet.image,
              category: loaderData.bouquet.category,
              brand: { "@type": "Brand", name: "Floret" },
              offers: {
                "@type": "Offer",
                price: loaderData.bouquet.price.toString(),
                priceCurrency: "BDT",
                availability: "https://schema.org/InStock",
                url: `https://flowerfloret.lovable.app/product/${params.slug}`,
              },
            }),
          },
        ]
      : [],
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
                alt={`${bouquet.name} — ${bouquet.tagline}, a hand-tied Floret bouquet`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
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
                <span className="font-serif text-3xl text-rose">৳{bouquet.price.toLocaleString("en-BD")}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full bg-sage/30 text-ink/70">
                  In Stock
                </span>
              </div>

              <p className="mt-8 text-ink/75 leading-relaxed text-lg">{bouquet.description}</p>

              <div className="mt-8 rounded-2xl bg-cream-soft/70 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-rose mb-3 flex items-center gap-2">
                  <Sparkles className="size-3.5" /> {bouquet.emotion}
                </p>
                <h2 className="font-serif text-xl mb-4">Composed with</h2>
                <ul className="space-y-2">
                  {bouquet.stems.map((s: string) => (
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
                to="/order"
                search={{ bouquet: bouquet.slug }}
                aria-label={`Buy ${bouquet.name} now for ৳${bouquet.price}`}
                className="group mt-10 block w-full overflow-hidden rounded-2xl border border-ink/15 bg-ink text-cream shadow-[0_18px_40px_-18px_rgba(61,10,5,0.55)] hover:shadow-[0_22px_50px_-18px_rgba(61,10,5,0.7)] active:translate-y-px transition-all"
              >
                <div className="flex items-stretch divide-x divide-cream/15">
                  <div className="flex flex-col items-start justify-center px-6 py-5 bg-ink/95">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-cream/60">Total</span>
                    <span className="font-serif text-2xl text-cream leading-none mt-1">
                      ৳{bouquet.price.toLocaleString("en-BD")}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-3 px-6 py-5 bg-rose text-cream group-hover:bg-rose/90 transition-colors">
                    <ShoppingBag className="size-5" strokeWidth={1.75} />
                    <span className="font-serif text-xl tracking-wide">Buy Now</span>
                    <span className="ml-1 inline-flex size-7 items-center justify-center rounded-full bg-cream/15 group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 bg-cream-soft/90 text-ink/70 px-6 py-2.5 text-[11px] tracking-wide">
                  <span className="inline-flex items-center gap-1.5"><Check className="size-3 text-rose" strokeWidth={2.5} /> Same-day delivery</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5"><Check className="size-3 text-rose" strokeWidth={2.5} /> Hand-tied today</span>
                  <span className="inline-flex items-center gap-1.5"><Check className="size-3 text-rose" strokeWidth={2.5} /> Secure bKash</span>
                </div>
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
