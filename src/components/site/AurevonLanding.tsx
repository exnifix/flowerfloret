import { useEffect, useState } from "react";
import { Flower2 } from "lucide-react";

const ENTRANCE = "cubic-bezier(0.16, 1, 0.3, 1)";
const OVERLAY = "cubic-bezier(0.76, 0, 0.24, 1)";

const links = [
  { label: "Home", href: "#" },
  { label: "Story", href: "#" },
  { label: "Collection", href: "#" },
  { label: "Inquire", href: "#" },
];

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_212700_3bb9329b-5c50-4257-a09b-ca85cf3654a3.mp4";

export function AurevonLanding() {
  const [mounted, setMounted] = useState(false);
  const [heroMounted, setHeroMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
            href="#"
            style={enter(0)}
            className={`text-white text-xl md:text-2xl font-semibold tracking-tight z-50 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            Aurevon
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

      <section className="relative h-screen w-full flex items-end justify-center overflow-hidden">
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
            Reserve your place in our private gallery.
          </p>
          <a
            href="#"
            style={{
              transitionTimingFunction: ENTRANCE,
              transitionDelay: heroMounted ? "800ms" : "0ms",
            }}
            className={`inline-block px-8 py-3.5 bg-white text-black text-sm md:text-base font-medium rounded-full hover:bg-white/90 transition-all duration-900 ${
              heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Join the waitlist
          </a>
        </div>
      </section>
    </div>
  );
}
