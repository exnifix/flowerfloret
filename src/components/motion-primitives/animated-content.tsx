"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type AnimatedContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  container?: string | HTMLElement | null;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
};

/** React Bits-inspired reveal wrapper, adapted for SSR and reduced motion. */
export function AnimatedContent({
  children,
  container,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = "power3.in",
  onComplete,
  onDisappearanceComplete,
  className,
  ...props
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(element, { clearProps: "all", visibility: "visible" });
      onComplete?.();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const fallbackScroller = document.getElementById("snap-main-container");
    const scroller = typeof container === "string" ? document.querySelector(container) : container || fallbackScroller;
    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const startPercent = (1 - threshold) * 100;

    const context = gsap.context(() => {
      gsap.set(element, {
        [axis]: offset,
        scale,
        opacity: animateOpacity ? initialOpacity : 1,
        visibility: "visible",
      });

      const timeline = gsap.timeline({
        paused: true,
        delay,
        onComplete: () => {
          onComplete?.();
          if (disappearAfter > 0) {
            gsap.to(element, {
              [axis]: reverse ? distance : -distance,
              scale: 0.8,
              opacity: animateOpacity ? initialOpacity : 0,
              delay: disappearAfter,
              duration: disappearDuration,
              ease: disappearEase,
              onComplete: onDisappearanceComplete,
            });
          }
        },
      });

      timeline.to(element, { [axis]: 0, scale: 1, opacity: 1, duration, ease });

      ScrollTrigger.create({
        trigger: element,
        scroller: scroller instanceof HTMLElement ? scroller : undefined,
        start: `top ${startPercent}%`,
        once: true,
        onEnter: () => timeline.play(),
      });
    }, element);

    return () => context.revert();
  }, [
    animateOpacity,
    container,
    delay,
    direction,
    disappearAfter,
    disappearDuration,
    disappearEase,
    distance,
    duration,
    ease,
    initialOpacity,
    onComplete,
    onDisappearanceComplete,
    reverse,
    scale,
    threshold,
  ]);

  return (
    <div ref={ref} className={cn(className)} style={{ visibility: "hidden" }} {...props}>
      {children}
    </div>
  );
}