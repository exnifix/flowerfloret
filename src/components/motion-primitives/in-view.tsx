"use client";
import { motion, type TargetAndTransition, type Transition } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InViewProps = {
  children: ReactNode;
  className?: string;
  hidden?: TargetAndTransition;
  visible?: TargetAndTransition;
  transition?: Transition;
  /** Replay each time the element scrolls into view. */
  repeat?: boolean;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
};

/** Animates its content when it scrolls into the viewport. */
export function InView({
  children,
  className,
  hidden = { opacity: 0, y: 24, filter: "blur(6px)" },
  visible = { opacity: 1, y: 0, filter: "blur(0px)" },
  transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  repeat = false,
  amount = 0.25,
}: InViewProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount }}
      variants={{ hidden, visible }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
