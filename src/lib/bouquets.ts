import seraphineAsset from "@/assets/bouquet-seraphine.jpg.asset.json";

const seraphine = seraphineAsset.url;

export type Bouquet = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stems: string[];
  emotion: string;
};

export const bouquets: Bouquet[] = [
  {
    slug: "seraphine",
    name: "Seraphine",
    tagline: "An angel, wrapped in linen",
    price: 800,
    category: "Bouquets",
    image: seraphine,
    emotion: "For ethereal devotion",
    description:
      "Blush pink lilies open like cupped hands at the heart of this bouquet, cradled in a soft cloud of baby's breath and wrapped in three layers of whisper-thin ivory paper. Seraphine is a quiet kind of grandeur — the bouquet you hand someone when ordinary words feel too small. Each lily petal carries that faint, dreamlike pink that lives between sunrise and a held breath, and the gypsophila drifts around it like a halo. It's the kind of gift that doesn't shout; it glows.",
    stems: ["1 stem of pink lily", "1 bunch of gypsophila (baby's breath)", "3 layers of premium wrapping paper"],
  },
];

export const getBouquet = (slug: string) => bouquets.find((b) => b.slug === slug);
