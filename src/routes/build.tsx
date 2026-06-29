import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/build")({
  head: () => ({
    meta: [
      { title: "Build Your Own Bouquet — Custom Floral Arrangements | Floret" },
      { name: "description", content: "Compose a bespoke bouquet at Floret. Choose your roses, gerberas, lilies, sunflowers, wrap and ribbon — watch your arrangement come together stem by stem." },
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

type Choice = { id: string; name: string; color: string; image?: string; group?: string };

const flowers: Choice[] = [
  // Rose
  { id: "rose-pink", name: "Pink Rose", color: "#f4a6b8", group: "Rose" },
  { id: "rose-red", name: "Red Rose", color: "#b3121f", group: "Rose" },
  { id: "rose-white", name: "White Rose", color: "#fbf6ec", group: "Rose" },
  { id: "rose-yellow", name: "Yellow Rose", color: "#f6d365", group: "Rose" },
  // Gerbera
  { id: "gerbera-pink", name: "Pink Gerbera", color: "#f48fb1", group: "Gerbera" },
  { id: "gerbera-white", name: "White Gerbera", color: "#fdfaf1", group: "Gerbera" },
  { id: "gerbera-yellow", name: "Yellow Gerbera", color: "#ffd24a", group: "Gerbera" },
  { id: "gerbera-orange", name: "Orange Gerbera", color: "#f08a3a", group: "Gerbera" },
  { id: "gerbera-darkpink", name: "Dark Pink Gerbera", color: "#c2185b", group: "Gerbera" },
  // Lily
  { id: "lily-white", name: "White Lily", color: "#fcf7ea", group: "Lily" },
  { id: "lily-pink", name: "Pink Lily", color: "#e88aa6", group: "Lily" },
  // Sunflower
  { id: "sunflower", name: "Sunflower", color: "#e9a93a", group: "Sunflower" },
  // Additional
  { id: "gypsy", name: "Gypsophila (Baby's Breath)", color: "#ffffff", group: "Additional" },
];

const wraps: Choice[] = [
  { id: "offwhite", name: "Off White", color: "#f3ece0" },
  { id: "white", name: "White", color: "#ffffff" },
  { id: "pink", name: "Pink", color: "#f4c2cf" },
  { id: "black", name: "Black", color: "#1a1a1a" },
  { id: "maroon", name: "Maroon", color: "#5c1a23" },
  { id: "olive", name: "Olive", color: "#7c8438" },
  { id: "gray", name: "Gray", color: "#9aa0a6" },
  { id: "lightpink", name: "Light Pink", color: "#fadbe2" },
  { id: "transparent", name: "Transparent", color: "transparent" },
];

const ribbons: Choice[] = [
  { id: "black", name: "Black", color: "#1a1a1a" },
  { id: "pink", name: "Pink", color: "#f4a6b8" },
  { id: "white", name: "White", color: "#fbf6ec" },
  { id: "blue", name: "Blue", color: "#4a78c2" },
  { id: "goldenbrown", name: "Golden Brown", color: "#b07a3a" },
];

function BuildPage() {
  const [picks, setPicks] = useState<string[]>(["rose-pink"]);
  const [wrap, setWrap] = useState<string>("offwhite");
  const [ribbon, setRibbon] = useState<string>("pink");
  const [customSize, setCustomSize] = useState<string>("");
  const [note, setNote] = useState("");

  const toggle = (id: string) => {
    setPicks((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const previewStems = useMemo(
    () => flowers.filter((f) => picks.includes(f.id)),
    [picks],
  );
  const wrapColor = wraps.find((w) => w.id === wrap)?.color ?? "#f3ece0";
  const ribbonColor = ribbons.find((r) => r.id === ribbon)?.color ?? "#f4a6b8";

  const grouped = useMemo(() => {
    const g: Record<string, Choice[]> = {};
    flowers.forEach((f) => {
      const k = f.group ?? "Other";
      (g[k] ||= []).push(f);
    });
    return g;
  }, []);

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
            Compose your gesture, stem by stem. Pick your flowers, wrap, ribbon and size — we'll bring it to life.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1fr_400px] gap-10 items-start">
          {/* Controls */}
          <div className="space-y-10">
            <StepGroup step="01" label="Flowers · pick as many as you like">
              <div className="space-y-6">
                {Object.entries(grouped).map(([groupName, items]) => (
                  <div key={groupName}>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50 mb-3">{groupName}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {items.map((f) => {
                        const on = picks.includes(f.id);
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => toggle(f.id)}
                            aria-pressed={on}
                            className={`group relative text-left rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                              on
                                ? "border-rose bg-blush-soft/60 -translate-y-0.5 shadow-md ring-2 ring-rose/30"
                                : "border-border bg-card hover:border-rose/60 hover:bg-blush-soft/20"
                            }`}
                          >
                            {on && (
                              <span className="absolute top-2 right-2 size-5 rounded-full bg-rose text-cream flex items-center justify-center">
                                <Check className="size-3" strokeWidth={3} />
                              </span>
                            )}
                            <span
                              className="block size-10 rounded-full mb-3 ring-1 ring-black/10"
                              style={{ backgroundColor: f.color }}
                            />
                            <p className="text-sm font-medium">{f.name}</p>
                          </button>
                        );
                      })}

                    </div>
                  </div>
                ))}
              </div>
            </StepGroup>

            <StepGroup step="02" label="Wrap">
              <div className="flex flex-wrap gap-3">
                {wraps.map((w) => {
                  const on = wrap === w.id;
                  const isTransparent = w.id === "transparent";
                  return (
                    <button
                      key={w.id}
                      onClick={() => setWrap(w.id)}
                      className={`flex items-center gap-3 rounded-full border pl-2 pr-5 py-2 transition-colors ${
                        on ? "border-rose bg-blush-soft/40" : "border-border hover:border-rose/50"
                      }`}
                    >
                      <span
                        className="size-7 rounded-full ring-1 ring-black/10"
                        style={{
                          backgroundColor: isTransparent ? "transparent" : w.color,
                          backgroundImage: isTransparent
                            ? "linear-gradient(45deg,#eee 25%,transparent 25%,transparent 75%,#eee 75%),linear-gradient(45deg,#eee 25%,transparent 25%,transparent 75%,#eee 75%)"
                            : undefined,
                          backgroundSize: isTransparent ? "8px 8px" : undefined,
                          backgroundPosition: isTransparent ? "0 0, 4px 4px" : undefined,
                        }}
                      />
                      <span className="text-sm">{w.name}</span>
                    </button>
                  );
                })}
              </div>
            </StepGroup>

            <StepGroup step="03" label="Ribbon">
              <div className="flex flex-wrap gap-4">
                {ribbons.map((r) => {
                  const on = ribbon === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRibbon(r.id)}
                      aria-label={r.name}
                      title={r.name}
                      className={`size-10 rounded-full ring-2 ring-offset-2 ring-offset-cream transition-all ${
                        on ? "ring-rose scale-110" : "ring-transparent hover:ring-rose/40"
                      }`}
                      style={{ backgroundColor: r.color }}
                    />
                  );
                })}
              </div>
            </StepGroup>

            <StepGroup step="04" label="Size · tell us what you want" htmlFor="custom-size">
              <input
                id="custom-size"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                placeholder="e.g. 20 stems, large hand-tied, mini posy…"
                className="w-full rounded-full bg-card border border-border px-5 py-4 text-sm focus:outline-none focus:border-rose transition-colors"
              />
            </StepGroup>

            <StepGroup step="05" label="A note to tuck inside (optional)" htmlFor="bouquet-note">
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

          {/* Summary */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-3xl bg-card border border-border/60 p-6 space-y-4 shadow-[0_30px_80px_-40px_rgba(180,120,120,0.25)]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/45">Your bouquet</p>
                <h2 className="font-serif text-2xl">A bespoke gesture</h2>
              </div>
              <ul className="text-sm text-ink/70 space-y-1.5">
                {previewStems.length === 0 && (
                  <li className="text-ink/40 italic">No stems selected yet…</li>
                )}
                {previewStems.map((s) => (
                  <li key={s.id} className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.name}
                  </li>
                ))}
                <li className="text-ink/50 pt-2 border-t border-border/60 mt-2">
                  {wraps.find((w) => w.id === wrap)?.name} wrap · {ribbons.find((r) => r.id === ribbon)?.name} ribbon
                </li>
                {customSize && <li className="text-ink/50">Size: {customSize}</li>}
              </ul>
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-6 py-4 text-sm tracking-wide hover:bg-rose transition-colors"
              >
                Request This Bouquet
                <ArrowRight className="size-4" />
              </Link>
              <p className="text-xs text-ink/50 text-center italic font-italic">
                Final price confirmed after a quick chat about your selections and delivery.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

function StepGroup({
  step,
  label,
  children,
  htmlFor,
}: {
  step: string;
  label: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-serif text-rose text-lg">{step}</span>
        {htmlFor ? (
          <label htmlFor={htmlFor} className="font-serif text-2xl text-ink">
            {label}
          </label>
        ) : (
          <h2 className="font-serif text-2xl text-ink">{label}</h2>
        )}
      </div>
      {children}
    </div>
  );
}
