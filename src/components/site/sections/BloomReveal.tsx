"use client";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ScrollExpand } from "@/components/motion-primitives/scroll-expand";
import bloom from "@/assets/bouquet-garden-whispers.jpg";

/**
 * Scroll-driven section where a small framed bloom opens to full bleed
 * and hands the stage over to an editorial line about flowers as feeling.
 */
export function BloomReveal() {
  return (
    <section aria-label="Flowers as feeling" className="relative z-10 bg-cream">
      <ScrollExpand
        useWindowScroll
        src={bloom}
        alt="A hand-tied garden bouquet opening in soft light"
        title="Every bloom opens slowly"
        scrollHint="Scroll to let it bloom"
        startWidth={44}
        startHeight={62}
        startRadius={28}
        endRadius={0}
        mediaZoom={1.3}
        scrollDistance={1.15}
        holdDistance={0.35}
        overlayScrim={0.5}
      >
        <p className="text-cream/80 uppercase tracking-[0.4em] text-[10px] font-bold mb-5">
          Floret · Petal to gesture
        </p>
        <h2 className="font-serif italic font-light text-cream text-4xl sm:text-5xl lg:text-6xl leading-[0.95] max-w-3xl">
          Flowers are never only flowers
        </h2>
        <p className="mt-6 max-w-xl text-cream/85 text-sm sm:text-base leading-relaxed font-light">
          They are the words we could not shape — apology, longing, celebration, quiet devotion.
          Every stem we tie is chosen for the feeling it carries across a room.
        </p>
        <Link
          to="/collection"
          className="group mt-9 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-blush min-h-11"
        >
          Explore the collection
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </ScrollExpand>
    </section>
  );
}
