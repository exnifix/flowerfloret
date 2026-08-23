"use client";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import hero from "@/assets/hero-flowers.jpg";
import ig3 from "@/assets/ig-3.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Magazine-style landing hero with animated headline and parallax imagery. */
export function HomeHero() {
  const { scrollY } = useScroll();
  const yBig = useTransform(scrollY, [0, 600], [0, 70]);
  const ySmall = useTransform(scrollY, [0, 600], [0, -50]);
  const yQuote = useTransform(scrollY, [0, 600], [0, -22]);

  return (
    <section className="relative overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 size-[420px] rounded-full bg-blush/40 blur-3xl"
        animate={{ x: [0, 30, -10, 0], y: [0, -28, 18, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-48 -right-24 size-[480px] rounded-full bg-cream-soft blur-3xl"
        animate={{ x: [0, -24, 14, 0], y: [0, 26, -16, 0], scale: [1, 0.95, 1.06, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16 pt-14 md:pt-20 lg:pt-24 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="md:col-span-5 z-20">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-rose uppercase tracking-[0.4em] text-[11px] font-bold mb-6"
            >
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="inline size-3 mr-2 -mt-0.5" aria-hidden />
              </motion.span>
              Est. with love · Floret
            </motion.p>

            <TextEffect
              as="h1"
              per="char"
              preset="blur-slide"
              speed={0.07}
              delay={0.15}
              className="font-serif italic font-light text-ink text-7xl sm:text-8xl lg:text-[9rem] leading-[0.82] mb-8 tracking-tight"
            >
              Floret
            </TextEffect>

            <TextEffect
              per="word"
              preset="fade"
              speed={0.014}
              delay={0.8}
              className="text-ink/85 text-base md:text-lg leading-relaxed max-w-sm font-light"
            >
              Cultivating beauty through heirloom blooms and seasonal stories. Each bouquet is
              hand-tied as a love letter — from petal to gesture.
            </TextEffect>

            <AnimatedGroup
              preset="blur-slide"
              stagger={0.14}
              className="mt-10 flex flex-wrap gap-5 items-center"
            >
              <Magnetic strength={8}>
                <Link
                  to="/collection"
                  className="group inline-flex items-center gap-2 bg-rose text-cream px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors duration-300 min-h-11"
                >
                  Shop the collection
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </Magnetic>
              <Magnetic strength={6}>
                <Link
                  to="/build"
                  className="border-b border-blush text-ink pb-1 text-xs font-bold uppercase tracking-[0.2em] hover:border-ink transition-colors min-h-11 inline-flex items-center"
                >
                  Build your own bouquet
                </Link>
              </Magnetic>
            </AnimatedGroup>
          </div>

          <div className="md:col-span-7 relative h-[460px] sm:h-[560px] md:h-[640px] lg:h-[720px] flex items-center justify-center">
            <motion.div
              aria-hidden
              className="absolute -top-12 -right-12 w-56 h-56 bg-cream-soft rounded-full -z-10 opacity-70 blur-2xl"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute right-0 top-0 w-[78%] h-[85%] z-0 rounded-sm shadow-xl overflow-hidden"
              style={{ y: yBig }}
              initial={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <img
                src={hero}
                alt="A field of ranunculus in soft morning light"
                width={1400}
                height={1700}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="size-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
              />
            </motion.div>

            <motion.div
              className="absolute left-0 bottom-0 w-[58%] sm:w-1/2 aspect-[4/5] z-30 border-[10px] md:border-[12px] border-cream shadow-2xl rounded-sm overflow-hidden"
              style={{ y: ySmall }}
              initial={{ opacity: 0, y: 60, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
            >
              <img
                src={ig3}
                alt="Close-up of a single blush peony"
                width={600}
                height={750}
                className="size-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-110"
              />
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute right-10 top-1/3 w-px bg-rose/30 z-10 hidden md:block"
              initial={{ height: 0 }}
              animate={{ height: 112 }}
              transition={{ duration: 1, delay: 0.9, ease: EASE }}
            />

            <motion.figure
              className="absolute bottom-8 right-6 md:right-10 max-w-xs bg-cream/95 backdrop-blur p-5 md:p-6 border-l-2 border-rose z-40 hidden md:block shadow-sm"
              style={{ y: yQuote }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            >
              <blockquote className="font-serif italic text-ink text-lg md:text-xl leading-snug">
                &ldquo;Flowers are the quietest of conversations.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[10px] uppercase tracking-[0.25em] text-rose font-bold">
                Floret Journal · Spring
              </figcaption>
            </motion.figure>
          </div>
        </div>

        <motion.div
          aria-hidden
          className="hidden lg:block absolute -bottom-10 right-0 font-serif text-[200px] leading-none text-blush/25 select-none pointer-events-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
        >
          Bloom
        </motion.div>
      </div>
    </section>
  );
}
