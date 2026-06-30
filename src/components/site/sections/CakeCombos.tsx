import { BouquetCard } from "@/components/site/BouquetCard";
import { bouquets } from "@/lib/bouquets";

/** Dedicated section showcasing cake-and-flower combo products. */
export function CakeCombos() {
  const combos = bouquets.filter((b) => b.category === "Cake & Flower Combo");
  if (combos.length === 0) return null;

  return (
    <section className="py-24 md:py-28 bg-cream-soft/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-rose mb-4">Cake & Flower Combos</p>
            <h2 className="font-serif text-5xl md:text-6xl text-ink leading-tight">
              The whole <span className="italic font-italic">celebration</span>,<br />
              hand-delivered.
            </h2>
          </div>
          <p className="max-w-md text-ink/65 leading-relaxed">
            A hand-tied bouquet paired with a petite bento cake and a candle waiting to be lit —
            the gasp at the door, the wish, the slow phone-camera circle, all in one delivery.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {combos.map((b, i) => (
            <BouquetCard key={b.slug} bouquet={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
