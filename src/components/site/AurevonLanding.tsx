import { useEffect, useMemo, useState } from "react";
import { Flower2, Instagram, Mail, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { bouquets, getProductCode } from "@/lib/bouquets";
import { CATEGORIES, SLUG_BY_CATEGORY, bouquetCategories } from "@/lib/categories";
import {
  SHOP_EMAIL,
  SHOP_INSTA_DISPLAY,
  SHOP_INSTA_URL,
  SHOP_PHONE_INTL,
  SHOP_PHONE_TEL_HREF,
} from "@/lib/contact-info";

const ENTRANCE = "cubic-bezier(0.16, 1, 0.3, 1)";
const OVERLAY = "cubic-bezier(0.76, 0, 0.24, 1)";

const links = [
  { label: "Home", href: "#home" },
  { label: "Story", href: "#story" },
  { label: "Collection", href: "#collection" },
  { label: "Inquire", href: "#inquire" },
];

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_212700_3bb9329b-5c50-4257-a09b-ca85cf3654a3.mp4";

type Filter = "All" | (typeof CATEGORIES)[number];
const FILTERS: Filter[] = ["All", ...CATEGORIES];

export function AurevonLanding() {
  const [mounted, setMounted] = useState(false);
  const [heroMounted, setHeroMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 100);
    const t2 = setTimeout(() => setHeroMounted(true), 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = useMemo(
    () =>
      (filter === "All" ? bouquets : bouquets.filter((b) => bouquetCategories(b).includes(filter))).map((b) => ({
        b,
        code: getProductCode(b.slug),
      })),
    [filter],
  );

  const enter = (delay: number) => ({
    transitionTimingFunction: ENTRANCE,
    transitionDelay: mounted ? `${delay}ms` : "0ms",
  });

  return (
    <div className="bg-black">
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <a
            href="#home"
            style={enter(0)}
            className={`text-white text-xl md:text-2xl font-semibold tracking-tight z-50 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            Floret
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            style={enter(200)}
            className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white/90 text-sm hover:bg-white/10 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            {open ? "Close" : "Navigate"}
          </button>

          <div
            style={enter(400)}
            className={`hidden md:flex transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <Flower2 className="w-7 h-7 text-white/90" />
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            style={enter(200)}
            className={`md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <span
              style={{ transitionTimingFunction: OVERLAY }}
              className={`w-6 h-[2px] bg-white transition-all duration-500 ${
                open ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              style={{ transitionTimingFunction: OVERLAY }}
              className={`w-6 h-[2px] bg-white transition-all duration-500 ${
                open ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <div
        style={{ transitionTimingFunction: OVERLAY }}
        className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center transition-all duration-700 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                transitionTimingFunction: OVERLAY,
                transitionDuration: "600ms",
                transitionDelay: open ? `${150 + i * 80}ms` : "0ms",
              }}
              className={`text-white font-instrument text-4xl md:text-6xl hover:opacity-60 transition-all ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <section id="home" className="relative h-screen w-full flex items-end justify-center overflow-hidden">
        <div
          style={{ transitionTimingFunction: ENTRANCE }}
          className={`absolute inset-0 transition-all duration-[1400ms] ${
            heroMounted ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        >
          <video
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 text-center px-6 pb-16 md:pb-24 max-w-4xl mx-auto">
          <h1
            style={{
              transitionTimingFunction: ENTRANCE,
              transitionDelay: heroMounted ? "400ms" : "0ms",
            }}
            className={`font-instrument text-white text-[2.5rem] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl mb-5 md:mb-6 transition-all duration-900 ${
              heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            A carefully curated
            <br className="hidden sm:block" /> collection beyond compare
          </h1>
          <p
            style={{
              transitionTimingFunction: ENTRANCE,
              transitionDelay: heroMounted ? "600ms" : "0ms",
            }}
            className={`text-white/70 text-base md:text-lg mb-8 md:mb-10 max-w-md mx-auto transition-all duration-900 ${
              heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Hand-tied bouquets that speak the language of feelings.
          </p>
          <a
            href="#collection"
            style={{
              transitionTimingFunction: ENTRANCE,
              transitionDelay: heroMounted ? "800ms" : "0ms",
            }}
            className={`inline-block px-8 py-3.5 bg-white text-black text-sm md:text-base font-medium rounded-full hover:bg-white/90 transition-all duration-900 ${
              heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Explore our collection
          </a>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="scroll-mt-24 px-6 md:px-10 py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-start">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-5">Our Story</p>
            <h2 className="font-instrument text-white text-4xl md:text-5xl leading-[1.05]">
              Floret — where flowers
              <br className="hidden md:block" /> become feelings
            </h2>
          </div>
          <div className="space-y-5 text-white/65 leading-relaxed text-[15px] md:text-base">
            <p>
              Floret is a small floral studio built on one belief: a bouquet is never only a bouquet. It is an
              apology, a confession, a congratulation, a quiet thank-you left on a doorstep — an emotion someone
              could not say out loud, arranged in petals instead.
            </p>
            <p>
              Every arrangement is hand-tied to order. We source fresh blooms, compose them in tulle, satin and
              paper, and finish each piece as if it were a love letter to whoever receives it. Roses for devotion,
              gerberas for joy, lilies for grace, sunflowers for the ones who make ordinary days brighter.
            </p>
            <p>
              Beyond the collection we build bespoke bouquets, flower-and-cake combos for birthdays and
              anniversaries, and full florals for weddings — plus our new Floret flower &amp; food cafe stall,
              where you can sit with the blooms a little longer.
            </p>
            <blockquote className="pl-5 border-l border-white/25 font-instrument italic text-xl md:text-2xl text-white/85">
              "We don't sell flowers. We translate feelings into petals."
            </blockquote>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/build"
                className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Build your bouquet
              </Link>
              <Link
                to="/cafe"
                className="px-6 py-3 rounded-full border border-white/25 text-white/90 text-sm hover:bg-white/10 transition-colors"
              >
                Visit Floret Cafe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="scroll-mt-24 px-6 md:px-10 py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-5">The Collection</p>
              <h2 className="font-instrument text-white text-4xl md:text-5xl leading-[1.05]">
                Every bouquet, every occasion
              </h2>
            </div>
            <p className="text-white/55 text-sm max-w-sm">
              Browse by moment — weddings, birthdays, anniversaries, cakes and cake &amp; flower combos. Tap any
              piece to see its full story and order it.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300 border ${
                  filter === f
                    ? "bg-white text-black border-white"
                    : "border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {items.map(({ b, code }) => (
              <Link
                key={b.slug}
                to="/product/$slug"
                params={{ slug: b.slug }}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 aspect-[4/5]">
                  <img
                    src={b.image}
                    alt={`${b.name} — ${b.tagline}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm text-[10px] tracking-[0.15em] text-white/80">
                    {code}
                  </span>
                </div>
                <div className="pt-3.5 flex items-baseline justify-between gap-3">
                  <h3 className="font-instrument text-white text-xl md:text-2xl leading-tight">{b.name}</h3>
                  <span className="text-white/70 text-sm shrink-0">৳{b.price}</span>
                </div>
                <p className="text-white/45 text-xs md:text-sm mt-1 line-clamp-2">{b.emotion}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to="/collection"
              search={filter === "All" ? {} : { cat: SLUG_BY_CATEGORY[filter] }}
              className="px-6 py-3 rounded-full border border-white/25 text-white/90 text-sm hover:bg-white/10 transition-colors"
            >
              Open full collection page
            </Link>
            <Link
              to="/reviews"
              className="px-6 py-3 rounded-full border border-white/25 text-white/90 text-sm hover:bg-white/10 transition-colors"
            >
              Customer reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Inquire */}
      <section id="inquire" className="scroll-mt-24 px-6 md:px-10 py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-5">Inquire</p>
          <h2 className="font-instrument text-white text-4xl md:text-5xl leading-[1.05] mb-10">
            Let's arrange something together
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href={`mailto:${SHOP_EMAIL}`}
              className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 hover:bg-white/[0.08] transition-colors"
            >
              <Mail className="w-5 h-5 text-white/70 mb-4" strokeWidth={1.5} />
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-2">Email</p>
              <p className="text-white text-base break-all">{SHOP_EMAIL}</p>
            </a>
            <a
              href={SHOP_PHONE_TEL_HREF}
              className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 hover:bg-white/[0.08] transition-colors"
            >
              <Phone className="w-5 h-5 text-white/70 mb-4" strokeWidth={1.5} />
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-2">Call or bKash</p>
              <p className="text-white text-base">{SHOP_PHONE_INTL}</p>
            </a>
            <a
              href={SHOP_INSTA_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 hover:bg-white/[0.08] transition-colors"
            >
              <Instagram className="w-5 h-5 text-white/70 mb-4" strokeWidth={1.5} />
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-2">Instagram</p>
              <p className="text-white text-base">@{SHOP_INSTA_DISPLAY}</p>
            </a>
          </div>

          <div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.04] p-6 md:p-8">
            <p className="text-white/65 text-sm leading-relaxed max-w-xl">
              Delivery across Dhaka with a flat ৳80 delivery charge. Same-day arrangements depend on availability —
              message us on Instagram or call for urgent gestures. For custom weddings and bulk orders, tell us the
              date and palette and we'll compose a quote.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/order"
                className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Place an order
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full border border-white/25 text-white/90 text-sm hover:bg-white/10 transition-colors"
              >
                Send an inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-10 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-instrument text-white text-2xl">Floret</span>
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Floret. Feelings, arranged in petals.</p>
        </div>
      </footer>
    </div>
  );
}
