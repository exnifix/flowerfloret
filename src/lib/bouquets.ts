import seraphineAsset from "@/assets/bouquet-seraphine.jpg.asset.json";
import fleurRoseAsset from "@/assets/bouquet-fleur-rose.jpg.asset.json";
import cupidsBlossomAsset from "@/assets/bouquet-cupids-blossom.jpg.asset.json";

const seraphine = seraphineAsset.url;
const fleurRose = fleurRoseAsset.url;
const cupidsBlossom = cupidsBlossomAsset.url;

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
  {
    slug: "cupids-blossom",
    name: "Cupid's Blossom",
    tagline: "Love, caught mid-bloom",
    price: 1600,
    category: "Bouquets",
    image: cupidsBlossom,
    emotion: "For the first flutter of love",
    description:
      "Pink lilies — the quiet romantics of the flower world — open at the centre of this bouquet like soft pink kisses caught in slow motion. In the old language of flowers, the pink lily means prosperity, admiration, and a love that's still learning its own name. Each petal carries that blush you only see at dawn, with golden freckles deep in the throat and a perfume that lingers on the room long after you've left it. Drifts of baby's breath float around them like little stars, and the whole bouquet is cradled in cloud-soft ivory paper and tied off with a ribbon of cupid-pink silk. It's a love letter you can hold.",
    stems: ["3 stems of pink Oriental lilies", "1 generous bunch of gypsophila (baby's breath)", "Layered ivory wrapping paper", "Hot-pink satin ribbon"],
  },
];

export const getBouquet = (slug: string) => bouquets.find((b) => b.slug === slug);
