import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import about from "@/assets/about-floret.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Floret — A Small Floral Studio for Emotional Gestures" },
      { name: "description", content: "Floret is a small floral studio that believes flowers are vessels of emotion. Read our story, values, and the craft behind every hand-tied bouquet." },
      { property: "og:title", content: "About Floret — A Small Floral Studio for Emotional Gestures" },
      { property: "og:description", content: "A small floral studio that believes flowers are vessels of emotion." },
      { property: "og:url", content: "https://flowerfloret.lovable.app/about" },
      { property: "og:image", content: about },
      { name: "twitter:title", content: "About Floret — A Small Floral Studio for Emotional Gestures" },
      { name: "twitter:description", content: "A small floral studio that believes flowers are vessels of emotion." },
      { name: "twitter:image", content: about },
    ],
    links: [{ rel: "canonical", href: "https://flowerfloret.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="pt-12 pb-24 bg-cream-soft/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-fade-up">
            <p className="text-xs uppercase tracking-[0.25em] text-rose mb-6">Our Story</p>
            <h1 className="font-serif text-6xl md:text-7xl text-ink leading-[1]">
              About <span className="italic font-italic">Floret</span>
            </h1>
            <div className="mt-8 space-y-5 text-ink/75 leading-relaxed">
              <p>
                At Floret, we believe that flowers are more than just beautiful decorations.
                They are vessels of emotion, carriers of unspoken words, and symbols of life's
                most precious moments.
              </p>
              <p>
                Every arrangement we create is infused with intention, care, and artistry.
                We source the finest blooms from local growers who respect the soil, and craft
                each piece as if it were a love letter to the recipient.
              </p>
              <p>
                Whether you're celebrating love, honouring a memory, or simply brightening someone's
                day — Floret is here to help you express what words cannot.
              </p>
            </div>
            <blockquote className="mt-10 pl-5 border-l-2 border-rose font-italic italic text-xl text-ink/80 text-balance">
              "We don't sell flowers. We translate feelings into petals."
            </blockquote>
          </div>
          <div className="relative animate-fade-up delay-100">
            <div className="absolute -inset-4 bg-blush/15 rounded-[2.5rem] blur-2xl" />
            <img
              src={about}
              alt="A close-up of fresh peach and cream blooms"
              width={900}
              height={1100}
              className="relative w-full rounded-[2rem] object-cover aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid md:grid-cols-3 gap-10 text-center">
          {[
            { t: "Sourced gently", d: "Stems from ethical local growers, in tune with the season." },
            { t: "Hand-tied slowly", d: "Each bouquet composed by hand, never rushed, never automated." },
            { t: "Delivered tenderly", d: "Wrapped with care and a handwritten note for the recipient." },
          ].map((v, i) => (
            <div key={v.t} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="mx-auto size-12 rounded-full bg-blush-soft grid place-items-center mb-5">
                <span className="font-serif text-rose">0{i + 1}</span>
              </div>
              <h3 className="font-serif text-2xl mb-2">{v.t}</h3>
              <p className="text-sm text-ink/65 leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
