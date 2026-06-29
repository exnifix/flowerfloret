import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/** Bottom-of-page invitation to start a custom-order conversation. */
export function ContactCTA() {
  return (
    <section className="bg-cream-soft/70 py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:px-10 text-center">
        <h2 className="font-serif text-5xl md:text-6xl text-ink">Let's Create Magic</h2>
        <p className="mt-3 italic font-italic text-ink/60 text-lg">
          Tell us about your floral dreams
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-blush-soft hover:bg-blush text-ink px-8 py-4 text-sm tracking-wide transition-colors"
        >
          Start a conversation
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
