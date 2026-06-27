import { Link } from "@tanstack/react-router";
import type { Bouquet } from "@/lib/bouquets";

export function BouquetCard({ bouquet, index = 0 }: { bouquet: Bouquet; index?: number }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: bouquet.slug }}
      className="group block bg-card rounded-2xl overflow-hidden border border-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_-20px_rgba(180,120,120,0.25)] hover:-translate-y-1 transition-all duration-500 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="aspect-[4/5] overflow-hidden bg-cream-soft">
        <img
          src={bouquet.image}
          alt={bouquet.name}
          width={800}
          height={1000}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-5 md:p-6">
        <h3 className="font-serif text-xl md:text-2xl text-ink">{bouquet.name}</h3>
        <p className="text-xs italic text-ink/55 mt-1 font-italic">{bouquet.tagline}</p>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
          {bouquet.description}
        </p>
        <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
          <span className="font-serif text-xl text-rose">${bouquet.price.toFixed(2)}</span>
          <span className="text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-sage/30 text-ink/70">
            In Stock
          </span>
        </div>
      </div>
    </Link>
  );
}
