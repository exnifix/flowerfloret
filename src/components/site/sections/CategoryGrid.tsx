"use client";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Cake, Gift, Heart, PartyPopper, Sparkles, type LucideIcon } from "lucide-react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { InView } from "@/components/motion-primitives/in-view";
import type { CategorySlug } from "@/lib/categories";

type Category = { icon: LucideIcon; label: string; slug: CategorySlug };

const CATEGORIES: Category[] = [
  { icon: Heart, label: "Wedding", slug: "wedding" },
  { icon: PartyPopper, label: "Birthday", slug: "birthday" },
  { icon: Gift, label: "Anniversaries", slug: "anniversaries" },
  { icon: Cake, label: "Cake", slug: "cake" },
  { icon: Sparkles, label: "Cake & Flower", slug: "cake-and-flower" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/** Circular icon links to occasion-based browsing of the collection. */
export function CategoryGrid() {
  return (
    <section className="py-20 md:py-24 bg-cream-soft/40">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 text-center">
        <TextEffect
          as="h2"
          per="word"
          preset="blur-slide"
          className="font-serif text-4xl md:text-5xl uppercase tracking-wide text-rose"
        >
          Flower Categories
        </TextEffect>
        <InView>
          <p className="mt-4 max-w-2xl mx-auto text-ink/65 leading-relaxed">
            Find the perfect blooms for every occasion — from wedding vows to birthday wishes and
            quiet anniversaries.
          </p>
        </InView>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {CATEGORIES.map(({ icon: Icon, label, slug }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
              whileHover={{ y: -6 }}
            >
              <Link
                to="/collection"
                search={{ cat: slug }}
                className="group flex flex-col items-center gap-3"
              >
                <span className="relative size-24 md:size-28 rounded-full border-2 border-blush bg-cream grid place-items-center text-rose group-hover:bg-blush-soft transition-colors duration-500">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border-2 border-rose/40 scale-100 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-700"
                  />
                  <Icon
                    className="size-9 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    strokeWidth={1.4}
                  />
                </span>
                <span className="text-sm tracking-wide text-ink/75 group-hover:text-rose transition-colors">
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
