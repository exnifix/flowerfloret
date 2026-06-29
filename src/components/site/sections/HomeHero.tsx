import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import hero from "@/assets/hero-flowers.jpg";
import ig3 from "@/assets/ig-3.jpg";

/** Magazine-style landing hero with headline, CTAs and layered editorial imagery. */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute -top-24 -left-24 size-[420px] rounded-full bg-blush/40 blur-3xl animate-blob" />
      <div aria-hidden className="absolute top-48 -right-24 size-[480px] rounded-full bg-cream-soft blur-3xl animate-blob delay-300" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16 pt-14 md:pt-20 lg:pt-24 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
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

          <div className="md:col-span-7 relative h-[460px] sm:h-[560px] md:h-[640px] lg:h-[720px] flex items-center justify-center">
            <div aria-hidden className="absolute -top-12 -right-12 w-56 h-56 bg-cream-soft rounded-full -z-10 opacity-70 blur-2xl" />

            <div className="absolute right-0 top-0 w-[78%] h-[85%] z-0 rounded-sm shadow-xl overflow-hidden">
              <img
                src={hero}
                alt="A field of ranunculus in soft morning light"
                width={1400}
                height={1700}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="size-full object-cover transition-transform duration-[1200ms] hover:scale-105"
              />
            </div>

            <div className="absolute left-0 bottom-0 w-[58%] sm:w-1/2 aspect-[4/5] z-30 border-[10px] md:border-[12px] border-cream shadow-2xl rounded-sm overflow-hidden">
              <img
                src={ig3}
                alt="Close-up of a single blush peony"
                width={600}
                height={750}
                className="size-full object-cover"
              />
            </div>

            <div aria-hidden className="absolute right-10 top-1/3 w-px h-28 bg-rose/30 z-10 hidden md:block" />

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

        <div
          aria-hidden
          className="hidden lg:block absolute -bottom-10 right-0 font-serif text-[200px] leading-none text-blush/25 select-none pointer-events-none"
        >
          Bloom
        </div>
      </div>
    </section>
  );
}
