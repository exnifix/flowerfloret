import ig1 from "@/assets/ig-1.jpg";
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";
import ig5 from "@/assets/ig-5.jpg";
import ig6 from "@/assets/ig-6.jpg";
import { SHOP_INSTA_URL, SHOP_INSTA_DISPLAY } from "@/lib/contact-info";

const IMAGES = [ig1, ig2, ig3, ig4, ig5, ig6];

/** Grid of Instagram thumbnails linking out to the shop's feed. */
export function InstagramGrid() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-ink">Follow Our Journey</h2>
        <p className="mt-3 italic font-italic text-ink/60">@{SHOP_INSTA_DISPLAY} on Instagram</p>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {IMAGES.map((src, i) => (
            <a
              key={i}
              href={SHOP_INSTA_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-cream-soft"
            >
              <img
                src={src}
                alt={`Instagram post ${i + 1}`}
                width={600}
                height={600}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-rose/0 group-hover:bg-rose/15 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
