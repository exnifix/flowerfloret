"use client";
import { motion, type TargetAndTransition, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type Preset = "fade" | "slide" | "blur" | "blur-slide" | "scale";

const presets: Record<Preset, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slide: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
  blur: { hidden: { opacity: 0, filter: "blur(8px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
  "blur-slide": {
    hidden: { opacity: 0, filter: "blur(8px)", y: 16 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  scale: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
};

type TextEffectProps = {
  children: string;
  className?: string;
  /** Animate per character or per word. */
  per?: "char" | "word";
  preset?: Preset;
  delay?: number;
  speed?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
};

/** Animates text in, one word or character at a time. */
export function TextEffect({
  children,
  className,
  per = "word",
  preset = "blur-slide",
  delay = 0,
  speed = 0.05,
  as = "p",
}: TextEffectProps) {
  const selected = presets[preset];
  const units = per === "char" ? Array.from(children) : children.split(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: speed, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: selected.hidden,
    visible: { ...selected.visible, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-label={children}
    >
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          variants={item}
          aria-hidden
          className="inline-block whitespace-pre will-change-transform"
        >
          {per === "word" ? `${unit}${i < units.length - 1 ? " " : ""}` : unit}
        </motion.span>
      ))}
    </MotionTag>
  );
}
