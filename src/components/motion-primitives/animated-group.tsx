"use client";
import { motion, type Variants } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export type PresetType = "fade" | "slide" | "scale" | "blur" | "blur-slide";

const presetVariants: Record<PresetType, { hidden: Record<string, unknown>; visible: Record<string, unknown> }> = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slide: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: "blur(6px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
  "blur-slide": {
    hidden: { opacity: 0, filter: "blur(6px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

type AnimatedGroupProps = {
  children: React.ReactNode;
  className?: string;
  preset?: PresetType;
  /** Delay between each child animation, in seconds. */
  stagger?: number;
  as?: keyof typeof motion;
  asChild?: keyof typeof motion;
};

/** Reveals its children one after another when scrolled into view. */
export function AnimatedGroup({
  children,
  className,
  preset = "blur-slide",
  stagger = 0.1,
  as = "div",
  asChild = "div",
}: AnimatedGroupProps) {
  const selected = presetVariants[preset];

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
  const item: Variants = {
    hidden: selected.hidden,
    visible: { ...selected.visible, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const MotionParent = motion[as] as typeof motion.div;
  const MotionChild = motion[asChild] as typeof motion.div;

  return (
    <MotionParent
      className={cn(className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {React.Children.map(children, (child, i) => (
        <MotionChild key={i} variants={item}>
          {child}
        </MotionChild>
      ))}
    </MotionParent>
  );
}
