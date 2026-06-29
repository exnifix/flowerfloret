import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Baby, Gift, Cake, Flower2, Heart } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { QuoteCarousel } from "@/components/site/QuoteCarousel";
import { BouquetCard } from "@/components/site/BouquetCard";
import { bouquets } from "@/lib/bouquets";
import hero from "@/assets/hero-flowers.jpg";
import ig1 from "@/assets/ig-1.jpg";
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";
import ig5 from "@/assets/ig-5.jpg";
import ig6 from "@/assets/ig-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Floret — Where Emotions Bloom" },
      { name: "description", content: "Floret crafts hand-tied bouquets that speak the language of feelings. Explore our collection, or compose your own." },
    ],
  }),
  component: HomePage,
});

const igs = [ig1, ig2, ig3, ig4, ig5, ig6];

function HomePage() {
  const featured = bouquets[0];
  return (
    <Layout>
      {/* HERO — magazine caption-card */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute -top-24 -left-24 size-[420px] rounded-full bg-blush/40 blur-3xl animate-blob" />
        <div aria-hidden className="absolute top-48 -right-24 size-[480px] rounded-full bg-cream-soft blur-3xl animate-blob delay-300" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16 pt-14 md:pt-20 lg:pt-24 pb-20 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
            {/* Left column */}
            <div className="md:col-span-5 z-20 animate-fade-up">
              <p className="text-rose uppercase tracking-[0.4em] text-[11px] font-bold mb-6">
                <Sparkles className="inline size-3 mr-2 -mt-0.5" aria-hidden />
                Est. with love · Floret
              </p>
              <h1 className="font-serif italic font-light text-ink text-7xl sm:text-8xl lg:text-[9rem] leading-[0.82] mb-8 tracking-tight">
                Floret
              </h1>
              <p className="text-ink/85 text-base md:text-lg leading-relaxed max-w-sm font-light">
                Cultivating beauty through heirloom blooms and seasonal stories.
                Each bouquet is hand-tied as a love letter — from petal to gesture.
              </p>

              <div className="mt-10 flex flex-wrap gap-5 items-center">
                <Link
                  to="/collection"
                  className="inline-flex items-center gap-2 bg-rose text-cream px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors duration-300 min-h-11"
                >
                  Shop the collection
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  to="/build"
                  className="border-b border-blush text-ink pb-1 text-xs font-bold uppercase tracking-[0.2em] hover:border-ink transition-colors min-h-11 inline-flex items-center"
                >
                  Build your own bouquet
                </Link>
              </div>
            </div>

            {/* Right visual composition */}
            <div className="md:col-span-7 relative h-[460px] sm:h-[560px] md:h-[640px] lg:h-[720px] flex items-center justify-center">
              <div aria-hidden className="absolute -top-12 -right-12 w-56 h-56 bg-cream-soft rounded-full -z-10 opacity-70 blur-2xl" />

              <div className="absolute right-0 top-0 w-[78%] h-[85%] z-0 rounded-sm shadow-xl overflow-hidden">
                <img
                  src={hero}
                  alt="A field of ranunculus in soft morning light"
                  width={1400}
                  height={1700}
                  className="size-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                />
              </div>

              <div className="absolute left-0 bottom-0 w-[58%] sm:w-1/2 aspect-[4/5] z-30 border-[10px] md:border-[12px] border-cream shadow-2xl rounded-sm overflow-hidden">
                <img
                  src={igs[2]}
                  alt="Close-up of a single blush peony"
                  width={600}
                  height={750}
                  className="size-full object-cover"
                />
              </div>

              <div aria-hidden className="absolute right-10 top-1/3 w-px h-28 bg-rose/30 z-10 hidden md:block" />

              {/* Editorial caption card */}
              <figure className="absolute bottom-8 right-6 md:right-10 max-w-xs bg-cream/95 backdrop-blur p-5 md:p-6 border-l-2 border-rose z-40 hidden md:block shadow-sm">
                <blockquote className="font-serif italic text-ink text-lg md:text-xl leading-snug">
                  &ldquo;Flowers are the quietest of conversations.&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-[10px] uppercase tracking-[0.25em] text-rose font-bold">
                  Floret Journal · Spring
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Oversized background wordmark */}
          <div
            aria-hidden
            className="hidden lg:block absolute -bottom-10 right-0 font-serif text-[200px] leading-none text-blush/25 select-none pointer-events-none"
          >
            Bloom
          </div>
        </div>
      </section>


      <QuoteCarousel />

      {/* FLOWER CATEGORIES */}
      <section className="py-20 md:py-24 bg-cream-soft/40">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 text-center">
          <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-wide text-rose">Flower Categories</h2>
          <p className="mt-4 max-w-2xl mx-auto text-ink/65 leading-relaxed">
            Explore our floral categories to find the perfect blooms for any occasion — from
            vibrant roses to delicate lilies, every taste and celebration.
          </p>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {[
              { icon: Baby, label: "New Baby" },
              { icon: Gift, label: "Anniversaries" },
              { icon: Cake, label: "Birthdays" },
              { icon: Flower2, label: "Roses" },
              { icon: Heart, label: "Weddings" },
            ].map(({ icon: Icon, label }) => (
              <Link
                key={label}
                to="/collection"
                className="group flex flex-col items-center gap-3"
              >
                <div className="size-24 md:size-28 rounded-full border-2 border-blush bg-cream grid place-items-center text-rose group-hover:bg-blush-soft group-hover:-translate-y-1 transition-all">
                  <Icon className="size-9" strokeWidth={1.4} />
                </div>
                <span className="text-sm tracking-wide text-ink/75 group-hover:text-rose transition-colors">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* COLLECTION */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-rose mb-4">Curated Collection</p>
              <h2 className="font-serif text-5xl md:text-6xl text-ink leading-tight">
                Bouquets, composed
                <br />
                as <span className="italic font-italic">gestures</span>.
              </h2>
            </div>
            <p className="max-w-md text-ink/65 leading-relaxed">
              Each arrangement is a small composition of seasonal stems, hand-tied in our studio.
              Click any bouquet to read the story it carries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {bouquets.map((b, i) => (
              <BouquetCard key={b.slug} bouquet={b} index={i} />
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              to="/collection"
              className="group inline-flex items-center gap-2 text-sm tracking-wide text-ink/70 hover:text-rose transition-colors"
            >
              View full collection
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* BUILD YOUR OWN */}
      <section className="bg-cream-soft/70 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-rose mb-5">Bespoke</p>
          <h2 className="font-serif text-5xl md:text-6xl text-ink leading-tight max-w-3xl mx-auto">
            Craft your own <span className="italic font-italic text-rose">emotion</span>.
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-ink/70 leading-relaxed">
            Choose every bloom, every ribbon, every gesture. From quiet gratitude to wild
            celebration — we will weave your story in petals.
          </p>
          <Link
            to="/build"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink text-cream px-9 py-4 text-sm tracking-wide hover:bg-rose transition-colors"
          >
            Start composing
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-ink">Follow Our Journey</h2>
          <p className="mt-3 italic font-italic text-ink/60">@floret on Instagram</p>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {igs.map((src, i) => (
              <a
                key={i}
                href="https://instagram.com/floret"
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl bg-cream-soft"
              >
                <img
                  src={src}
                  alt={`Instagram post ${i + 1}`}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-rose/0 group-hover:bg-rose/15 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT TEASER */}
      <section className="bg-cream-soft/70 py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-10 text-center">
          <h2 className="font-serif text-5xl md:text-6xl text-ink">Let's Create Magic</h2>
          <p className="mt-3 italic font-italic text-ink/60 text-lg">Tell us about your floral dreams</p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-blush-soft hover:bg-blush text-ink px-8 py-4 text-sm tracking-wide transition-colors"
          >
            Start a conversation
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
