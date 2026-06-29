import seraphineAsset from "@/assets/bouquet-seraphine.jpg.asset.json";
import fleurRoseAsset from "@/assets/bouquet-fleur-rose.jpg.asset.json";

const seraphine = seraphineAsset.url;
const fleurRose = fleurRoseAsset.url;

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
  {
    slug: "fleur-rose",
    name: "Fleur Rose",
    tagline: "A white rose says what the heart cannot",
    price: 600,
    category: "Bouquets",
    image: fleurRose,
    emotion: "For pure, unspoken love",
    description:
      "Seven ivory roses, their petals brushed with the faintest blush of dawn, gather at the heart of this bouquet like a quiet confession. White roses have always been the language of beginnings — of new love, of reverence, of promises too tender for words. They speak of purity without coldness, of devotion without demand. Drifting around them, soft veils of baby's breath fall like first snow, and the whole arrangement is cradled in cloud-soft ivory paper, finished with a ribbon of gold silk. \"A rose is the silence of the world spoken in colour\" — and a white rose is that silence at its most honest.",
    stems: ["7 stems of white roses (blush-tipped)", "1 bunch of gypsophila (baby's breath)", "Premium ivory wrapping paper", "Gold satin ribbon"],
  },
];

export const getBouquet = (slug: string) => bouquets.find((b) => b.slug === slug);
