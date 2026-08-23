"use client";
import { memo } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { getProductCode, type Bouquet } from "@/lib/bouquets";

const EASE = [0.16, 1, 0.3, 1] as const;

function BouquetCardImpl({
  bouquet,
  index = 0,
  priority = false,
}: {
  bouquet: Bouquet;
  index?: number;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: Math.min(index, 5) * 0.08, ease: EASE }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link
        to="/product/$slug"
        params={{ slug: bouquet.slug }}
        className="group flex h-full flex-col bg-card rounded-2xl overflow-hidden border border-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_60px_-24px_rgba(180,120,120,0.35)] transition-shadow duration-500"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-soft">
          <img
            src={bouquet.image}
            alt={`${bouquet.name} bouquet — ${bouquet.tagline}`}
            width={800}
            height={1000}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "low"}
            className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>
        <div className="p-5 md:p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-xl md:text-2xl text-ink">{bouquet.name}</h3>
            <span className="text-[10px] font-mono tracking-[0.12em] text-ink/45 shrink-0">
              {getProductCode(bouquet.slug)}
            </span>
          </div>
          <p className="text-xs italic text-ink/55 mt-1 font-italic">{bouquet.tagline}</p>
          <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
            {bouquet.description}
          </p>
          <div className="mt-auto pt-4 border-t border-border/60 flex items-center justify-between">
            <span className="font-serif text-xl text-rose transition-transform duration-500 group-hover:-translate-y-0.5">
              ৳{bouquet.price.toLocaleString("en-BD")}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-sage/30 text-ink/70">
              In Stock
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export const BouquetCard = memo(BouquetCardImpl);
