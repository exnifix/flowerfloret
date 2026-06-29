import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Flower2, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/build")({
  head: () => ({
    meta: [
      { title: "Build Your Own Bouquet — Custom Floral Arrangements | Floret" },
      { name: "description", content: "Compose a bespoke bouquet at Floret. Choose your blooms, accents, wrap, and ribbon — watch your arrangement come together stem by stem." },
      { property: "og:title", content: "Build Your Own Bouquet — Custom Floral Arrangements | Floret" },
      { property: "og:description", content: "Compose your own gesture, stem by stem." },
      { property: "og:url", content: "https://flowerfloret.lovable.app/build" },
      { name: "twitter:title", content: "Build Your Own Bouquet | Floret" },
      { name: "twitter:description", content: "Compose your own gesture, stem by stem." },
    ],
    links: [{ rel: "canonical", href: "https://flowerfloret.lovable.app/build" }],
  }),
  component: BuildPage,
});

type Choice = { id: string; name: string; color: string; price: number };

const bases: Choice[] = [
  { id: "rose-blush", name: "Blush Garden Rose", color: "#f5b6b8", price: 240 },
  { id: "peony-cream", name: "Cream Peony", color: "#fbeadf", price: 320 },
  { id: "ranunculus", name: "Coral Ranunculus", color: "#f0a08c", price: 280 },
  { id: "rose-burgundy", name: "Burgundy Velvet Rose", color: "#6b1f2a", price: 260 },
  { id: "tulip-white", name: "Ivory Tulip", color: "#f5efe4", price: 180 },
  { id: "lavender", name: "French Lavender", color: "#b3a3d8", price: 140 },
];

const accents: Choice[] = [
  { id: "babys-breath", name: "Baby's Breath", color: "#ffffff", price: 120 },
  { id: "eucalyptus", name: "Silver Eucalyptus", color: "#c9d5c5", price: 100 },
  { id: "wheat", name: "Dried Wheat", color: "#d9c290", price: 80 },
  { id: "astrantia", name: "Pink Astrantia", color: "#e7b4be", price: 120 },
];

const wraps: Choice[] = [
  { id: "cream", name: "Cream Silk", color: "#f6ecdc", price: 160 },
  { id: "blush", name: "Blush Paper", color: "#f4cdcf", price: 120 },
  { id: "kraft", name: "Natural Kraft", color: "#c9a784", price: 100 },
  { id: "sage", name: "Sage Linen", color: "#cdd7c4", price: 160 },
];

const ribbons: Choice[] = [
  { id: "blush-silk", name: "Blush Silk", color: "#f5b6b8" },
  { id: "ivory", name: "Ivory Satin", color: "#f3ebd9" },
  { id: "moss", name: "Moss Velvet", color: "#7a8966" },
  { id: "twine", name: "Hemp Twine", color: "#b59872" },
] as Choice[];

const sizes = [
  { id: "petite", name: "Petite", desc: "12 stems", mult: 1 },
  { id: "signature", name: "Signature", desc: "24 stems", mult: 1.8 },
  { id: "abundant", name: "Abundant", desc: "40 stems", mult: 2.8 },
];

function BuildPage() {
  const [base, setBase] = useState<string[]>(["rose-blush"]);
  const [accent, setAccent] = useState<string[]>(["babys-breath"]);
  const [wrap, setWrap] = useState<string>("cream");
  const [ribbon, setRibbon] = useState<string>("blush-silk");
  const [size, setSize] = useState<string>("signature");
  const [note, setNote] = useState("");

  const toggle = (arr: string[], id: string, max = 3) => {
    if (arr.includes(id)) return arr.filter((x) => x !== id);
    if (arr.length >= max) return [...arr.slice(1), id];
    return [...arr, id];
  };

  const total = useMemo(() => {
    const stems = [...bases, ...accents].filter((c) => [...base, ...accent].includes(c.id));
    const stemSum = stems.reduce((s, c) => s + c.price, 0);
    const wrapPrice = wraps.find((w) => w.id === wrap)?.price ?? 0;
    const mult = sizes.find((s) => s.id === size)?.mult ?? 1;
    return Math.round(stemSum * mult + wrapPrice + 200);
  }, [base, accent, wrap, size]);

  const previewStems = [
    ...bases.filter((b) => base.includes(b.id)),
    ...accents.filter((a) => accent.includes(a.id)),
  ];
  const wrapColor = wraps.find((w) => w.id === wrap)?.color ?? "#f6ecdc";
  const ribbonColor = ribbons.find((r) => r.id === ribbon)?.color ?? "#f5b6b8";

  return (
    <Layout>
      <section className="pt-12 pb-8 text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-rose mb-5 animate-fade-up">
            <Sparkles className="size-3.5" /> Bespoke Atelier
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-ink leading-[1] animate-fade-up delay-100">
            Build Your Own <span className="italic font-italic text-rose">Bouquet</span>
          </h1>
          <p className="mt-6 text-ink/70 leading-relaxed animate-fade-up delay-200">
            Compose your gesture, stem by stem. Watch your bouquet bloom in real time on the right.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1fr_400px] gap-10 items-start">
          {/* Controls */}
          <div className="space-y-10">
            <StepGroup step="01" label={`Base flowers · pick up to 3`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {bases.map((b) => {
                  const on = base.includes(b.id);
                  return (
                    <button
                      key={b.id}
                      onClick={() => setBase((prev) => toggle(prev, b.id, 3))}
                      className={`group text-left rounded-2xl border p-4 transition-all ${
                        on ? "border-rose bg-blush-soft/40 -translate-y-0.5" : "border-border bg-card hover:border-rose/50"
                      }`}
                    >
                      <span className="block size-10 rounded-full mb-3 ring-1 ring-black/5" style={{ backgroundColor: b.color }} />
                      <p className="text-sm font-medium">{b.name}</p>
                      <p className="text-xs text-ink/55 mt-1">+৳{b.price}</p>
                      {on && <Check className="size-4 text-rose mt-2" />}
                    </button>
                  );
                })}
              </div>
            </StepGroup>

            <StepGroup step="02" label="Accent stems · pick up to 2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {accents.map((a) => {
                  const on = accent.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => setAccent((prev) => toggle(prev, a.id, 2))}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        on ? "border-rose bg-blush-soft/40" : "border-border bg-card hover:border-rose/50"
                      }`}
                    >
                      <span className="block size-8 rounded-full mb-3 ring-1 ring-black/5" style={{ backgroundColor: a.color }} />
                      <p className="text-sm">{a.name}</p>
                      <p className="text-xs text-ink/55 mt-1">+৳{a.price}</p>
                    </button>
                  );
                })}
              </div>
            </StepGroup>

            <StepGroup step="03" label="Wrap">
              <div className="flex flex-wrap gap-3">
                {wraps.map((w) => {
                  const on = wrap === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => setWrap(w.id)}
                      className={`flex items-center gap-3 rounded-full border pl-2 pr-5 py-2 transition-colors ${
                        on ? "border-rose bg-blush-soft/40" : "border-border hover:border-rose/50"
                      }`}
                    >
                      <span className="size-7 rounded-full ring-1 ring-black/5" style={{ backgroundColor: w.color }} />
                      <span className="text-sm">{w.name}</span>
                    </button>
                  );
                })}
              </div>
            </StepGroup>

            <StepGroup step="04" label="Ribbon">
              <div className="flex flex-wrap gap-3">
                {ribbons.map((r) => {
                  const on = ribbon === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRibbon(r.id)}
                      aria-label={r.name}
                      className={`size-10 rounded-full ring-2 ring-offset-2 ring-offset-cream transition-all ${
                        on ? "ring-rose scale-110" : "ring-transparent hover:ring-rose/40"
                      }`}
                      style={{ backgroundColor: r.color }}
                    />
                  );
                })}
              </div>
            </StepGroup>

            <StepGroup step="05" label="Size">
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((s) => {
                  const on = size === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.id)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        on ? "border-rose bg-blush-soft/40" : "border-border bg-card hover:border-rose/50"
                      }`}
                    >
                      <p className="font-serif text-xl">{s.name}</p>
                      <p className="text-xs text-ink/55">{s.desc}</p>
                    </button>
                  );
                })}
              </div>
            </StepGroup>

            <StepGroup step="06" label="A note to tuck inside (optional)" htmlFor="bouquet-note">
              <textarea
                id="bouquet-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={200}
                placeholder="A line, a memory, a secret…"
                className="w-full rounded-2xl bg-card border border-border px-5 py-4 text-sm focus:outline-none focus:border-rose transition-colors resize-none"
              />
              <p className="text-[10px] uppercase tracking-[0.18em] text-ink/40 mt-2">{note.length}/200</p>
            </StepGroup>
          </div>

          {/* Live Preview */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-3xl bg-card border border-border/60 overflow-hidden shadow-[0_30px_80px_-40px_rgba(180,120,120,0.25)]">
              <div
                className="aspect-square relative grid place-items-center transition-colors duration-500"
                style={{ backgroundColor: wrapColor }}
              >
                {/* Stems visual */}
                <div className="relative w-44 h-56">
                  {previewStems.length === 0 ? (
                    <div className="absolute inset-0 grid place-items-center text-ink/40 text-sm">
                      <Flower2 className="size-10" strokeWidth={1.2} />
                    </div>
                  ) : (
                    previewStems.map((s, i) => {
                      const total = previewStems.length;
                      const angle = -25 + (i / Math.max(total - 1, 1)) * 50;
                      const offset = (i - (total - 1) / 2) * 18;
                      return (
                        <div
                          key={s.id}
                          className="absolute left-1/2 top-4 origin-bottom transition-all duration-500 animate-fade-up"
                          style={{
                            transform: `translateX(${offset}px) rotate(${angle}deg)`,
                            zIndex: 10 - Math.abs(i - total / 2),
                          }}
                        >
                          <div className="w-1 h-40 bg-green-700/40 mx-auto" />
                          <div
                            className="size-12 rounded-full -mt-44 mx-auto ring-2 ring-white/40 shadow-md"
                            style={{ backgroundColor: s.color }}
                          />
                        </div>
                      );
                    })
                  )}
                  {/* ribbon */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-2 w-20 h-2 rounded-full transition-colors"
                    style={{ backgroundColor: ribbonColor }}
                  />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink/45">Your bouquet</p>
                  <h2 className="font-serif text-2xl">A bespoke gesture</h2>
                </div>
                <ul className="text-sm text-ink/70 space-y-1.5">
                  {previewStems.map((s) => (
                    <li key={s.id} className="flex items-center gap-2">
                      <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                      {s.name}
                    </li>
                  ))}
                  <li className="text-ink/50 pt-2 border-t border-border/60 mt-2">
                    {wraps.find((w) => w.id === wrap)?.name} wrap · {ribbons.find((r) => r.id === ribbon)?.name} ribbon
                  </li>
                  <li className="text-ink/50">{sizes.find((s) => s.id === size)?.name} · {sizes.find((s) => s.id === size)?.desc}</li>
                </ul>
                <div className="flex items-baseline justify-between pt-4 border-t border-border/60">
                  <span className="text-sm text-ink/60">Estimate</span>
                  <span className="font-serif text-3xl text-rose">${total.toFixed(2)}</span>
                </div>
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-6 py-4 text-sm tracking-wide hover:bg-rose transition-colors"
                >
                  Request This Bouquet
                  <ArrowRight className="size-4" />
                </Link>
                <p className="text-xs text-ink/50 text-center italic font-italic">
                  Final price confirmed after a quick chat about delivery.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

function StepGroup({ step, label, children, htmlFor }: { step: string; label: string; children: React.ReactNode; htmlFor?: string }) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-serif text-rose text-lg">{step}</span>
        {htmlFor ? (
          <label htmlFor={htmlFor} className="font-serif text-2xl text-ink">{label}</label>
        ) : (
          <h2 className="font-serif text-2xl text-ink">{label}</h2>
        )}
      </div>
      {children}
    </div>
  );
}
