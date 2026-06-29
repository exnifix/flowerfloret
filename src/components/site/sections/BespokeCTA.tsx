import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/** Call-to-action band inviting visitors to compose a custom bouquet. */
export function BespokeCTA() {
  return (
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
  );
}
