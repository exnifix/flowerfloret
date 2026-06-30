import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Instagram, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { bouquets, getProductCode, type Bouquet } from "@/lib/bouquets";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/build", label: "Build Your Bouquet" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

type Result = { b: Bouquet; code: string; score: number };

function prefixMatch(haystack: string, q: string) {
  const s = haystack.toLowerCase();
  if (s.startsWith(q)) return true;
  return s.split(/[\s\-_/&,]+/).some((w) => w.startsWith(q));
}

function scoreBouquet(b: Bouquet, code: string, q: string): number {
  const name = b.name.toLowerCase();
  const cat = b.category.toLowerCase();
  const tag = b.tagline.toLowerCase();
  const codeLc = code.toLowerCase();

  if (name.startsWith(q)) return 100;
  if (codeLc.startsWith(q) || codeLc.replace(/-/g, "").startsWith(q.replace(/-/g, ""))) return 95;
  if (prefixMatch(b.name, q)) return 80;
  if (prefixMatch(b.category, q)) return 60;
  if (prefixMatch(b.tagline, q)) return 40;
  if (name.includes(q) || cat.includes(q) || tag.includes(q)) return 10;
  return 0;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const list: Result[] = [];
    for (const b of bouquets) {
      const code = getProductCode(b.slug);
      const score = scoreBouquet(b, code, q);
      if (score > 0) list.push({ b, code, score });
    }
    list.sort((a, z) => z.score - a.score || a.b.name.localeCompare(z.b.name));
    return list.slice(0, 8);
  }, [query]);

  function closeSearch() {
    setSearchOpen(false);
    setOpen(false);
  }

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    navigate({ to: "/collection", search: q ? { q } : {} });
    closeSearch();
  }

  useEffect(() => {
    if (!searchOpen) return;
    function onDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [searchOpen]);

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

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label={searchOpen ? "Close search" : "Search bouquets"}
            aria-expanded={searchOpen}
            className="size-11 grid place-items-center rounded-full border border-blush/60 text-rose hover:bg-blush-soft transition-colors"
          >
            {searchOpen ? <X className="size-4" strokeWidth={1.5} /> : <Search className="size-4" strokeWidth={1.5} />}
          </button>
          <a
            href="https://www.instagram.com/flo.rettt/"
            target="_blank"
            rel="noreferrer"
            aria-label="Floret on Instagram"
            className="hidden sm:grid size-11 place-items-center rounded-full border border-blush/60 text-rose hover:bg-blush-soft transition-colors"
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

      <div
        className={`overflow-hidden border-border/60 bg-cream/95 backdrop-blur-md transition-all duration-300 ease-out ${
          searchOpen ? "max-h-[80vh] opacity-100 border-t" : "max-h-0 opacity-0 border-t-0"
        }`}
        aria-hidden={!searchOpen}
      >
        <div ref={panelRef} className="mx-auto max-w-3xl px-6 lg:px-10 py-4">
          <form onSubmit={submitSearch} className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="size-4 text-ink/50 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
              <input
                autoFocus={searchOpen}
                type="search"
                inputMode="search"
                autoComplete="off"
                placeholder="Search bouquets by name, code, or feeling…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full bg-cream border border-blush/70 pl-11 pr-10 py-3 text-sm text-ink placeholder:text-ink/45 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/20 transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-6 grid place-items-center rounded-full text-ink/50 hover:text-ink hover:bg-blush-soft transition-colors"
                >
                  <X className="size-3.5" strokeWidth={1.5} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-full bg-rose text-cream text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </form>

          <div className="mt-3">
            {query.trim() && (
              <div key={query} className="animate-fade-in">
                {results.length === 0 ? (
                  <p className="text-sm text-ink/60 px-2 py-6 text-center">
                    No bouquets match “{query}”. Try a shorter prefix.
                  </p>
                ) : (
                  <ul className="rounded-2xl border border-blush/50 bg-cream/80 overflow-hidden divide-y divide-blush/40">
                    {results.map(({ b, code }, i) => (
                      <li
                        key={b.slug}
                        className="animate-fade-in"
                        style={{ animationDelay: `${Math.min(i, 6) * 35}ms`, animationFillMode: "both" }}
                      >
                        <Link
                          to="/product/$slug"
                          params={{ slug: b.slug }}
                          onClick={closeSearch}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-blush-soft/70 transition-colors"
                        >
                          <img
                            src={b.image}
                            alt=""
                            loading="lazy"
                            className="size-12 rounded-xl object-cover border border-blush/40"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-3">
                              <p className="font-serif text-base text-ink truncate">{b.name}</p>
                              <span className="text-[11px] tracking-wider text-ink/50 shrink-0">{code}</span>
                            </div>
                            <p className="text-xs text-ink/60 truncate">{b.category} · ৳{b.price}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        type="button"
                        onClick={(e) => submitSearch(e)}
                        className="w-full text-left px-3 py-2.5 text-xs tracking-wide text-rose hover:bg-blush-soft/70 transition-colors"
                      >
                        See all results for “{query.trim()}” →
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
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
