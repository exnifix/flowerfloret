import { Link } from "@tanstack/react-router";
import { Cake, Gift, Heart, PartyPopper, Sparkles, type LucideIcon } from "lucide-react";
import type { CategorySlug } from "@/lib/categories";

type Category = { icon: LucideIcon; label: string; slug: CategorySlug };

const CATEGORIES: Category[] = [
  { icon: Heart, label: "Wedding", slug: "wedding" },
  { icon: PartyPopper, label: "Birthday", slug: "birthday" },
  { icon: Gift, label: "Anniversaries", slug: "anniversaries" },
  { icon: Cake, label: "Cake", slug: "cake" },
  { icon: Sparkles, label: "Cake & Flower", slug: "cake-and-flower" },
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
          Find the perfect blooms for every occasion — from wedding vows to birthday wishes
          and quiet anniversaries.
        </p>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {CATEGORIES.map(({ icon: Icon, label, slug }) => (
            <Link
              key={slug}
              to="/collection"
              search={{ cat: slug }}
              className="group flex flex-col items-center gap-3"
            >
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
