import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
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
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-20 size-[420px] rounded-full bg-blush-soft/45 blur-3xl animate-blob" />
        <div className="absolute top-40 -right-24 size-[480px] rounded-full bg-sage/30 blur-3xl animate-blob delay-300" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-20 md:pt-28 pb-24 md:pb-36 text-center">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-rose mb-8 animate-fade-up">
            <Sparkles className="size-3.5" /> Floret · Est. with love
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.95] text-ink animate-fade-up delay-100">
            Where Emotions
            <br />
            <span className="italic font-italic text-rose">Bloom</span>
          </h1>
          <p className="mt-8 max-w-xl mx-auto text-base md:text-lg text-ink/70 leading-relaxed animate-fade-up delay-200">
            Flowers are not just flowers — they are feelings, gestures, and moments
            captured in petals. Each bouquet is hand-tied as a love letter.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up delay-300">
            <Link
              to="/collection"
              className="group inline-flex items-center gap-2 rounded-full bg-blush-soft hover:bg-blush text-ink px-8 py-4 text-sm tracking-wide transition-all hover:-translate-y-0.5"
            >
              Explore Our Collection
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/build"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 hover:border-rose hover:text-rose text-ink px-8 py-4 text-sm tracking-wide transition-colors"
            >
              Build Your Own Bouquet
            </Link>
          </div>

          <div className="mt-20 md:mt-28 relative max-w-3xl mx-auto animate-fade-in-slow delay-500">
            <div className="absolute inset-0 -m-6 bg-blush/10 rounded-[3rem] blur-2xl" />
            <img
              src={hero}
              alt="Soft pink ranunculus in morning light"
              width={1400}
              height={900}
              className="relative w-full rounded-[2rem] object-cover animate-float"
            />
          </div>
        </div>
      </section>

      <QuoteCarousel />

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
