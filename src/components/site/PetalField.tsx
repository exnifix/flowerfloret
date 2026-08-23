"use client";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

type Petal = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  spin: number;
  opacity: number;
};

/** Deterministic pseudo-random so SSR and client markup match. */
function seeded(i: number, salt: number) {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Ambient layer of falling flower petals behind the whole site.
 * Purely decorative, pointer-transparent, and disabled for reduced motion.
 */
export function PetalField({ count = 16 }: { count?: number }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i, 1) * 100,
        size: 10 + seeded(i, 2) * 16,
        duration: 16 + seeded(i, 3) * 16,
        delay: -seeded(i, 4) * 24,
        drift: (seeded(i, 5) - 0.5) * 160,
        spin: 180 + seeded(i, 6) * 360,
        opacity: 0.25 + seeded(i, 7) * 0.35,
      })),
    [count],
  );

  if (reduce || !mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute -top-16"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, opacity: p.opacity }}
          initial={{ y: "-10vh", x: 0, rotate: 0 }}
          animate={{ y: "115vh", x: [0, p.drift, p.drift * 0.4], rotate: p.spin }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            x: { duration: p.duration, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <svg viewBox="0 0 24 24" className="size-full text-blush">
            <path
              fill="currentColor"
              d="M12 1c5 4.2 8 8 8 12.2C20 18 16.4 23 12 23S4 18 4 13.2C4 9 7 5.2 12 1Z"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
