import ethereal from "@/assets/bouquet-ethereal-blush.jpg";
import garden from "@/assets/bouquet-garden-whispers.jpg";
import romance from "@/assets/bouquet-romance-bloom.jpg";
import sunset from "@/assets/bouquet-sunset-serenade.jpg";
import midnight from "@/assets/bouquet-midnight-velvet.jpg";
import wildflower from "@/assets/bouquet-wildflower-sonnet.jpg";

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
    slug: "ethereal-blush",
    name: "Ethereal Blush",
    tagline: "A whisper of tenderness",
    price: 89.99,
    category: "Bouquets",
    image: ethereal,
    emotion: "For tender moments",
    description:
      "A delicate composition of soft pink roses and garden peonies, swathed in hand-folded cream silk paper. Each petal carries the hush of early morning — the kind of quiet that exists between a held breath and a confession. Perfect for expressing the unspoken affections you keep close to your chest.",
    stems: ["Soft pink garden roses", "Cream peonies", "Sage eucalyptus", "Hand-tied silk ribbon"],
  },
  {
    slug: "garden-whispers",
    name: "Garden Whispers",
    tagline: "A summer afternoon, distilled",
    price: 124.99,
    category: "Bouquets",
    image: garden,
    emotion: "For quiet celebrations",
    description:
      "An enchanting collection of seasonal blooms in butter cream and dusty blush tones, layered with wisps of trailing greenery. Every flower tells a story of slow afternoons in unkempt gardens — sun-warmed petals, hummed lullabies, and the kind of beauty that doesn't try.",
    stems: ["Cream cabbage roses", "Blush ranunculus", "Pink astrantia", "Wild seeded eucalyptus"],
  },
  {
    slug: "romance-in-bloom",
    name: "Romance in Bloom",
    tagline: "Love letters, but softer",
    price: 149.99,
    category: "Bouquets",
    image: romance,
    emotion: "For declarations of love",
    description:
      "Luxurious pale pink roses cradled in clouds of delicate baby's breath, finished with a hand-tied silk satin ribbon. This is the bouquet for the moment your heart finally speaks louder than your hesitation — a symphony of devotion, bound in a single gesture.",
    stems: ["Pale pink roses", "Baby's breath", "Italian ruscus", "Blush satin ribbon"],
  },
  {
    slug: "sunset-serenade",
    name: "Sunset Serenade",
    tagline: "Golden hour, hand-tied",
    price: 94.99,
    category: "Bouquets",
    image: sunset,
    emotion: "For warm gratitude",
    description:
      "Sun-drenched amber and apricot roses gathered with delicate sprigs of gypsophila, wrapped in textured kraft paper. A bouquet that carries the last warm light of the day — the kind of gift that says thank you without ever needing the words.",
    stems: ["Apricot roses", "Yellow garden roses", "White gypsophila", "Natural kraft wrap"],
  },
  {
    slug: "midnight-velvet",
    name: "Midnight Velvet",
    tagline: "A poem written in burgundy",
    price: 119.99,
    category: "Bouquets",
    image: midnight,
    emotion: "For deep passion",
    description:
      "Deep burgundy roses with velvet petals so dark they seem to drink the light, layered against moody foliage. An offering for the quiet intensities — the loves that simmer long after the noise has gone. Bold, brooding, unforgettably elegant.",
    stems: ["Black baccara roses", "Burgundy spray roses", "Dark eucalyptus", "Bordeaux wrap"],
  },
  {
    slug: "wildflower-sonnet",
    name: "Wildflower Sonnet",
    tagline: "Untamed and unrehearsed",
    price: 74.99,
    category: "Bouquets",
    image: wildflower,
    emotion: "For free spirits",
    description:
      "Fragrant lavender stems, sun-faced daisies, and gilded wheat tied loosely with garden twine. A bouquet that refuses to be arranged — wild, fragrant, alive. For the friend who reminds you what it feels like to laugh too loudly.",
    stems: ["French lavender", "White daisies", "Dried wheat", "Hemp twine"],
  },
];

export const getBouquet = (slug: string) => bouquets.find((b) => b.slug === slug);
