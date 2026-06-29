import { Link } from "@tanstack/react-router";
import { Heart, Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/build", label: "Build Your Bouquet" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <Heart className="size-5 text-rose fill-rose group-hover:scale-110 transition-transform" strokeWidth={1.5} />
          <span className="font-serif text-2xl tracking-tight text-ink">Floret</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-ink/70 hover:text-ink transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-rose after:transition-all hover:after:w-full"
              activeProps={{ className: "text-ink after:w-full" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/flo.rett"
            target="_blank"
            rel="noreferrer"
            aria-label="Floret on Instagram"
            className="size-11 grid place-items-center rounded-full border border-blush/60 text-rose hover:bg-blush-soft transition-colors"
          >
            <Instagram className="size-4" strokeWidth={1.5} />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden size-11 grid place-items-center rounded-full border border-border"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-cream animate-fade-in-slow">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-serif text-2xl py-2 text-ink/80"
                activeProps={{ className: "text-rose" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
