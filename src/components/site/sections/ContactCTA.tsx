import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { InView } from "@/components/motion-primitives/in-view";
import { Magnetic } from "@/components/motion-primitives/magnetic";

/** Bottom-of-page invitation to start a custom-order conversation. */
export function ContactCTA() {
  return (
    <section className="bg-cream-soft/70 py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:px-10 text-center">
        <TextEffect
          as="h2"
          per="word"
          preset="blur-slide"
          className="font-serif text-5xl md:text-6xl text-ink"
        >
          Let&rsquo;s Create Magic
        </TextEffect>
        <InView>
          <p className="mt-3 italic font-italic text-ink/60 text-lg">
            Tell us about your floral dreams
          </p>
        </InView>
        <InView hidden={{ opacity: 0, scale: 0.92 }} visible={{ opacity: 1, scale: 1 }}>
          <Magnetic strength={10} className="mt-8">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-blush-soft hover:bg-blush text-ink px-8 py-4 text-sm tracking-wide transition-colors"
            >
              Start a conversation
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </InView>
      </div>
    </section>
  );
}
