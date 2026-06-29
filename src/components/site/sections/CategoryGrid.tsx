import { Link } from "@tanstack/react-router";
import { Baby, Cake, Flower2, Gift, Heart, type LucideIcon } from "lucide-react";

type Category = { icon: LucideIcon; label: string };

const CATEGORIES: Category[] = [
  { icon: Baby, label: "New Baby" },
  { icon: Gift, label: "Anniversaries" },
  { icon: Cake, label: "Birthdays" },
  { icon: Flower2, label: "Roses" },
  { icon: Heart, label: "Weddings" },
];

/** Circular icon links to occasion-based browsing of the collection. */
export function CategoryGrid() {
  return (
    <section className="py-20 md:py-24 bg-cream-soft/40">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 text-center">
        <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-wide text-rose">
          Flower Categories
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-ink/65 leading-relaxed">
          Explore our floral categories to find the perfect blooms for any occasion — from
          vibrant roses to delicate lilies, every taste and celebration.
        </p>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {CATEGORIES.map(({ icon: Icon, label }) => (
            <Link key={label} to="/collection" className="group flex flex-col items-center gap-3">
              <div className="size-24 md:size-28 rounded-full border-2 border-blush bg-cream grid place-items-center text-rose group-hover:bg-blush-soft group-hover:-translate-y-1 transition-all">
                <Icon className="size-9" strokeWidth={1.4} />
              </div>
              <span className="text-sm tracking-wide text-ink/75 group-hover:text-rose transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
