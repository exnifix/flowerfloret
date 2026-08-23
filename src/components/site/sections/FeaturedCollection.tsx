import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BouquetCard } from "@/components/site/BouquetCard";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { InView } from "@/components/motion-primitives/in-view";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import { bouquets } from "@/lib/bouquets";

/** Homepage grid of the featured bouquet collection with editorial intro + CTA. */
export function FeaturedCollection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <InView hidden={{ opacity: 0, x: -20 }} visible={{ opacity: 1, x: 0 }}>
              <p className="text-xs uppercase tracking-[0.25em] text-rose mb-4">Curated Collection</p>
            </InView>
            <TextEffect
              as="h2"
              per="word"
              preset="blur-slide"
              className="font-serif text-5xl md:text-6xl text-ink leading-tight"
            >
              Bouquets, composed as gestures.
            </TextEffect>
          </div>
          <InView>
            <p className="max-w-md text-ink/65 leading-relaxed">
              Each arrangement is a small composition of seasonal stems, hand-tied in our studio.
              Click any bouquet to read the story it carries.
            </p>
          </InView>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {bouquets.slice(0, 6).map((b, i) => (
            <BouquetCard key={b.slug} bouquet={b} index={i} priority={i < 3} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Magnetic strength={8}>
            <Link
              to="/collection"
              className="group inline-flex items-center gap-2 text-sm tracking-wide text-ink/70 hover:text-rose transition-colors"
            >
              View full collection
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
