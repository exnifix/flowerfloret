import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const quotes = [
  {
    text: "Flowers are not just petals and stems — they are whispered emotions, unspoken feelings, and gestures that words cannot capture.",
    by: "Floret Philosophy",
  },
  {
    text: "To give a flower is to hand someone a feeling you have been carrying quietly. It is the softest, bravest kind of language.",
    by: "On the Art of Giving",
  },
  {
    text: "A bouquet is a letter you cannot rewrite — every stem chosen, every petal placed, an honest sentence of the heart.",
    by: "Notes from the Studio",
  },
];

export function QuoteCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % quotes.length), 7000);
    return () => clearInterval(t);
  }, []);
  const q = quotes[i];

  return (
    <section className="bg-cream-soft/80 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10 relative">
        <button
          onClick={() => setI((p) => (p - 1 + quotes.length) % quotes.length)}
          aria-label="Previous"
          className="absolute left-2 lg:-left-4 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-full text-ink/40 hover:text-rose transition-colors"
        >
          <ChevronLeft className="size-6" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => setI((p) => (p + 1) % quotes.length)}
          aria-label="Next"
          className="absolute right-2 lg:-right-4 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-full text-ink/40 hover:text-rose transition-colors"
        >
          <ChevronRight className="size-6" strokeWidth={1.5} />
        </button>

        <div key={i} className="text-center animate-fade-up">
          <blockquote className="font-italic italic text-2xl md:text-3xl leading-relaxed text-ink/85 text-balance">
            “{q.text}”
          </blockquote>
          <p className="mt-8 text-sm text-rose tracking-[0.2em] uppercase">— {q.by}</p>
        </div>

        <div className="mt-12 flex justify-center gap-2">
          {quotes.map((_, j) => (
            <button
              key={j}
              onClick={() => setI(j)}
              aria-label={`Quote ${j + 1}`}
              className={`h-1.5 rounded-full transition-all ${j === i ? "w-8 bg-rose" : "w-1.5 bg-ink/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
