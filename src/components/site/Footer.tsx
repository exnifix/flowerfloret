import { Link } from "@tanstack/react-router";
import { Heart, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-cream-soft/60 mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="size-5 text-rose fill-rose" strokeWidth={1.5} />
            <span className="font-serif text-2xl text-ink">Floret</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Hand-tied bouquets, composed as gestures. We believe a flower is never just a flower —
            it is a feeling, given form.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-ink/50">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/collection" className="hover:text-rose transition-colors">Collection</Link></li>
            <li><Link to="/build" className="hover:text-rose transition-colors">Build Your Bouquet</Link></li>
            <li><Link to="/about" className="hover:text-rose transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-rose transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-ink/50">Get In Touch</h4>
          <a
            href="https://instagram.com/antoraken"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm hover:text-rose transition-colors"
          >
            <Instagram className="size-4" strokeWidth={1.5} />
            @antoraken
          </a>
          <a
            href="mailto:pusnojawadraiyan@gmail.com"
            className="flex items-center gap-2 text-sm hover:text-rose transition-colors break-all"
          >
            <Mail className="size-4 shrink-0" strokeWidth={1.5} />
            pusnojawadraiyan@gmail.com
          </a>
          <a
            href="tel:+8801718159391"
            className="flex items-center gap-2 text-sm hover:text-rose transition-colors"
          >
            <Phone className="size-4" strokeWidth={1.5} />
            01718159391
          </a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Floret · Designed for emotion.</p>
          <p className="italic font-serif text-sm">"Petals where words fall short."</p>
        </div>
      </div>
    </footer>
  );
}
