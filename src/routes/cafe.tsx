import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Coffee, Croissant, Flower2, Instagram, Sparkles } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { InView } from "@/components/motion-primitives/in-view";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import cafeHero from "@/assets/cafe-hero.jpg";
import cafeCounter from "@/assets/cafe-counter.jpg";

const TITLE = "Floret Cafe — Our New Flower & Food Stall";
const DESC =
  "Thank you for the love. Floret is opening a flower and food cafe — a little stall where blooms, coffee and cake sit at the same table.";

export const Route = createFileRoute("/cafe")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://flowerfloret.lovable.app/cafe" },
      { property: "og:image", content: cafeHero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: cafeHero },
    ],
    links: [{ rel: "canonical", href: "https://flowerfloret.lovable.app/cafe" }],
  }),
  component: CafePage,
});

const expectations = [
  {
    icon: Flower2,
    t: "Blooms on every table",
    d: "Fresh stems in little vases, changed each morning — so even a five-minute coffee feels like a gesture.",
  },
  {
    icon: Coffee,
    t: "Coffee, slow and warm",
    d: "Hand-poured brews and comforting cups, meant to be lingered over rather than rushed through.",
  },
  {
    icon: Croissant,
    t: "Sweet things, freshly made",
    d: "Cakes, bakes and small bites — the same softness we wrap into our bouquets, on a plate.",
  },
  {
    icon: Sparkles,
    t: "A bouquet bar",
    d: "Pick your stems, your wrap, your ribbon — and walk out holding something made in front of you.",
  },
];

function CafePage() {
  return (
    <Layout>
      <section className="pt-12 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <InView>
              <span className="inline-flex items-center gap-2 rounded-full border border-rose/40 bg-blush-soft px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-rose">
                <Sparkles className="size-3" strokeWidth={1.5} />
                Grand announcement
              </span>
            </InView>
            <TextEffect
              as="h1"
              per="char"
              preset="blur"
              speed={0.03}
              className="mt-6 font-serif text-5xl sm:text-6xl md:text-7xl text-ink leading-[1.02]"
            >
              Floret Cafe
            </TextEffect>
            <InView>
              <p className="mt-6 max-w-xl text-lg text-ink/75 leading-relaxed">
                A flower and food cafe — our very own little stall, where petals, coffee
                and cake finally share one table. Everyone is welcome to come, sit, and enjoy.
              </p>
            </InView>
            <AnimatedGroup className="mt-10 flex flex-wrap gap-3" preset="blur-slide">
              <Magnetic strength={10}>
                <a
                  href="https://www.instagram.com/flo.rett/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink text-cream px-8 py-4 text-sm tracking-wide hover:bg-rose transition-colors"
                >
                  <Instagram className="size-4" strokeWidth={1.5} />
                  Follow @floret for the opening
                </a>
              </Magnetic>
              <Magnetic strength={8}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-8 py-4 text-sm tracking-wide text-ink hover:bg-blush-soft transition-colors"
                >
                  Ask us anything
                  <ArrowRight className="size-4" />
                </Link>
              </Magnetic>
            </AnimatedGroup>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blush/15 rounded-[2.5rem] blur-2xl" aria-hidden />
            <img
              src={cafeHero}
              alt="A cream and blush flower cafe table with pink roses, a latte and a slice of cake"
              width={1408}
              height={1008}
              className="relative w-full rounded-[2rem] object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream-soft/60 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <InView>
            <p className="text-xs uppercase tracking-[0.25em] text-rose mb-5">Thank you</p>
          </InView>
          <TextEffect
            as="h2"
            per="word"
            preset="blur"
            className="font-serif text-4xl md:text-5xl text-ink leading-tight"
          >
            This one belongs to you.
          </TextEffect>
          <InView>
            <div className="mt-8 space-y-5 text-ink/75 leading-relaxed text-left sm:text-center">
              <p>
                Floret began as a small idea and a handful of stems. Every order you placed, every
                bouquet you gifted, every message you sent after a delivery — that is what carried
                us here.
              </p>
              <p>
                So from the bottom of our hearts: thank you. Thank you for trusting us with your
                birthdays, your apologies, your quiet I-miss-yous and your loudest celebrations.
              </p>
              <p>
                Because of that support, we are so happy to announce our new stall — a flower and
                food cafe where you can walk in, breathe a little slower, and enjoy the same warmth
                we try to wrap into every bouquet.
              </p>
            </div>
            <blockquote className="mt-10 font-italic italic font-serif text-xl md:text-2xl text-ink/80 text-balance">
              "A flower was never just a flower. Now it comes with coffee."
            </blockquote>
          </InView>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src={cafeCounter}
              alt="Cafe counter with kraft-wrapped rose bouquets, cakes and pastries"
              width={1200}
              height={1504}
              loading="lazy"
              className="w-full rounded-[2rem] object-cover aspect-[4/5]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <InView>
              <p className="text-xs uppercase tracking-[0.25em] text-rose mb-5">What to expect</p>
            </InView>
            <TextEffect
              as="h2"
              per="word"
              preset="blur"
              className="font-serif text-4xl md:text-5xl text-ink leading-tight"
            >
              Petals, plates and slow afternoons.
            </TextEffect>
            <AnimatedGroup className="mt-10 grid sm:grid-cols-2 gap-6" preset="blur-slide">
              {expectations.map((e) => (
                <div
                  key={e.t}
                  className="rounded-2xl border border-border/60 bg-cream-soft/50 p-6 transition-colors hover:border-rose/40"
                >
                  <div className="size-10 rounded-full bg-blush-soft grid place-items-center mb-4">
                    <e.icon className="size-4 text-rose" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl text-ink mb-2">{e.t}</h3>
                  <p className="text-sm text-ink/65 leading-relaxed">{e.d}</p>
                </div>
              ))}
            </AnimatedGroup>
          </div>
        </div>
      </section>

      <section className="bg-cream-soft/70 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <TextEffect
            as="h2"
            per="word"
            preset="blur"
            className="font-serif text-4xl md:text-5xl text-ink leading-tight"
          >
            Come, sit with the flowers.
          </TextEffect>
          <InView>
            <p className="mt-6 max-w-xl mx-auto text-ink/70 leading-relaxed">
              The opening date and exact location will be shared on our Instagram first — follow
              along so you do not miss the first bloom. Until then, our bouquets are always a
              message away.
            </p>
          </InView>
          <InView hidden={{ opacity: 0, scale: 0.94 }} visible={{ opacity: 1, scale: 1 }}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Magnetic strength={10}>
                <Link
                  to="/collection"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink text-cream px-8 py-4 text-sm tracking-wide hover:bg-rose transition-colors"
                >
                  Browse the collection
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Magnetic strength={8}>
                <Link
                  to="/build"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-8 py-4 text-sm tracking-wide text-ink hover:bg-blush-soft transition-colors"
                >
                  Build your bouquet
                </Link>
              </Magnetic>
            </div>
          </InView>
        </div>
      </section>
    </Layout>
  );
}
