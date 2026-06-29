import seraphineAsset from "@/assets/bouquet-seraphine.jpg.asset.json";
import fleurRoseAsset from "@/assets/bouquet-fleur-rose.jpg.asset.json";
import cupidsBlossomAsset from "@/assets/bouquet-cupids-blossom.jpg.asset.json";
import pinkRadianceAsset from "@/assets/bouquet-pink-radiance.jpg.asset.json";
import celestialBloomAsset from "@/assets/bouquet-celestial-bloom.jpg.asset.json";
import heavenlyWhisperAsset from "@/assets/bouquet-heavenly-whisper.jpg.asset.json";
import nakedPrestigeAsset from "@/assets/bouquet-naked-prestige.jpg.asset.json";
import amourRougeAsset from "@/assets/bouquet-amour-rouge.jpg.asset.json";
import goldenGraceAsset from "@/assets/bouquet-golden-grace.jpg.asset.json";
import whiteSnowAsset from "@/assets/bouquet-white-snow.jpg.asset.json";
import snowPetalsAsset from "@/assets/bouquet-snow-petals.jpg.asset.json";
import petalsEmbraceAsset from "@/assets/bouquet-petals-embrace.jpg.asset.json";
import romanceVelvetAsset from "@/assets/bouquet-romance-velvet.jpg.asset.json";
import redLetterAsset from "@/assets/bouquet-red-letter.jpg.asset.json";
import rosettaAsset from "@/assets/rosetta.jpeg.asset.json";

const seraphine = seraphineAsset.url;
const fleurRose = fleurRoseAsset.url;
const cupidsBlossom = cupidsBlossomAsset.url;
const pinkRadiance = pinkRadianceAsset.url;
const celestialBloom = celestialBloomAsset.url;
const heavenlyWhisper = heavenlyWhisperAsset.url;
const nakedPrestige = nakedPrestigeAsset.url;
const amourRouge = amourRougeAsset.url;
const goldenGrace = goldenGraceAsset.url;
const whiteSnow = whiteSnowAsset.url;
const snowPetals = snowPetalsAsset.url;
const petalsEmbrace = petalsEmbraceAsset.url;
const romanceVelvet = romanceVelvetAsset.url;
const redLetter = redLetterAsset.url;
const rosetta = rosettaAsset.url;



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
  {
    slug: "pink-radiance",
    name: "Pink Radiance",
    tagline: "Thirty small suns, all blushing at once",
    price: 1250,
    category: "Bouquets",
    image: pinkRadiance,
    emotion: "For joy that refuses to be quiet",
    description:
      "Thirty mini pink roses crowd together like a chorus mid-song — bright, fearless, impossibly cheerful. Pink roses have always carried the gentler half of love's vocabulary: gratitude, admiration, the kind of affection that doesn't need a reason. The miniature variety pushes it further — tiny rosettes packed petal-on-petal, each one a fingertip of fuchsia, together glowing like a single radiant heart. Wrapped in a crisp sheet of crystal-clear cellophane that catches the light like still water, and finished with a single satin ribbon that trails behind the stems like a held breath. It's the bouquet you give when you want someone's whole day to turn pink.",
    stems: ["30 mini pink roses", "1 layer of premium wrapping", "1 satin ribbon"],
  },
  {
    slug: "celestial-bloom",
    name: "Celestial Bloom",
    tagline: "Moonlight, wrapped in midnight",
    price: 1200,
    category: "Bouquets",
    image: celestialBloom,
    emotion: "For reverence, remembrance, and quiet awe",
    description:
      "White lilies open like small, slow moons at the heart of this bouquet — petals so pure they almost glow, golden anthers held inside like tiny lit lamps. The white lily has carried meaning for centuries: purity, majesty, the soul caught mid-flight. In old paintings, angels hand them to mortals; in older gardens, they were planted to mark the holy and the deeply loved. Surrounding them, baby's breath drifts like distant constellations, and the whole bouquet is cradled in cloud-white tissue and sheathed in dramatic matte-black wrap — night and starlight, held in one hand. \"The lily speaks where words kneel down.\" A gift for the moments too sacred for noise.",
    stems: ["5 stems of white Oriental lilies", "1 generous bunch of gypsophila (baby's breath)", "Ivory inner wrap", "Matte-black outer wrap", "Hand-tied raffia"],
  },
  {
    slug: "heavenly-whisper",
    name: "Heavenly Whisper",
    tagline: "Soft as a secret, told in petals",
    price: 500,
    category: "Bouquets",
    image: heavenlyWhisper,
    emotion: "For tender beginnings and unsaid affection",
    description:
      "Seven blush-pink roses gather close like friends sharing a secret — petals the colour of a blush caught mid-sentence, edges curling open to reveal that deeper rose-gold heart. Pink roses are the soft language of love: gratitude, sweetness, admiration that doesn't need to announce itself. A single deep green leaf peeks through, grounding all that softness, and the entire bouquet is sleeved in cloud-white matte paper folded into careful petals of its own, then sashed with a wide peach satin ribbon that spills like warm light. \"Some feelings don't shout — they bloom.\" Heavenly Whisper is the bouquet for the gentle, unhurried kind of love.",
    stems: ["7 blush-pink roses", "Fresh green foliage", "Layered matte-white wrapping paper", "Peach satin ribbon"],
  },
  {
    slug: "naked-prestige",
    name: "Naked Prestige",
    tagline: "Red roses, stripped to their truth",
    price: 500,
    category: "Bouquets",
    image: nakedPrestige,
    emotion: "For love that needs no decoration",
    description:
      "A dozen long-stemmed red roses, hand-tied and left utterly bare — no wrap, no cellophane, no clever distraction. Just deep crimson heads gathered into one velvet crown, leaves still on the stems, thorns still telling the truth, finished with nothing but a single ivory satin ribbon. The red rose has always been the loudest word in love's vocabulary: passion, devotion, the heart laid open. Strip away the paper and that meaning sharpens — this is feeling without performance, romance without apology. Each bloom is hand-selected for that dark, blood-velvet red that almost drinks the light, petals layered tight like a kept promise. \"A red rose, naked, is the bravest sentence in the world.\" Naked Prestige is for the moments when you mean it — and you want them to know you mean it.",
    stems: ["12 long-stemmed red roses", "Natural green foliage on the stem", "Single ivory satin ribbon", "Hand-tied, unwrapped presentation"],
  },
  {
    slug: "amour-rouge",
    name: "Amour Rouge",
    tagline: "Red roses, dressed for the night",
    price: 499,
    category: "Bouquets",
    image: amourRouge,
    emotion: "For love that arrives in black-tie",
    description:
      "A tight, opulent crown of deep crimson roses — each bloom a small, velvet heart — gathered into a sharp matte-black cone wrap and finished with a single ribbon of vivid scarlet silk tied into a soft bow at the throat. The red rose has always been love's loudest word: passion, devotion, desire kept just barely behind the teeth. Dressed in black, that meaning sharpens into something cinematic — romance with a little danger in it, a confession made in candlelight. Each rose head is hand-selected for that dark, glossy red that almost drinks the light, petals layered tight like a kept secret, leaves tucked low so the colour does all the talking. \"Give a red rose and you've spoken; give a dozen, and you've sworn.\" Amour Rouge is for the moment you stop pretending you're casual about them.",
    stems: ["A dozen deep red roses", "Matte-black cone wrap", "Scarlet satin ribbon, hand-tied bow", "Natural green foliage at the base"],
  },
  {
    slug: "white-snow",
    name: "White Snow",
    tagline: "Pink hearts, hushed in winter paper",
    price: 699,
    category: "Bouquets",
    image: whiteSnow,
    emotion: "For soft confessions and snow-quiet love",
    description:
      "A close gathering of white roses, each petal kissed at the very edge with a brushstroke of pink — as if the cold had blushed them. White-and-pink bicolour roses carry a meaning all their own: the purity and new-beginning of the white rose softened by the gentle, growing affection of the pink. Together they whisper the loveliest sentence in the flower language — \"I'm falling for you, quietly.\" The blooms are nested in crisp white tissue folded into tall, sharp petals of paper that frame the bouquet like falling snow, then cinched at the throat with a wide pink satin ribbon tied into a soft bow. \"Some love arrives like snowfall — pale, sudden, and impossible to ignore.\" White Snow is the bouquet for tender beginnings and the words you almost said.",
    stems: ["A generous gathering of white roses with pink-blushed edges", "Crisp white tissue wrap folded into sharp petals", "Soft pink satin ribbon, hand-tied bow", "Natural green foliage at the base"],
  },
  {
    slug: "golden-grace",
    name: "Golden Grace",
    tagline: "A handful of sunshine, tied with cream",
    price: 599,
    category: "Bouquets",
    image: goldenGrace,
    emotion: "For warmth, gratitude, and unshakable cheer",
    description:
      "Two bright-faced sunflowers turn their heads toward you like small suns caught mid-rise, golden petals fanning out around deep amber centres dusted with pollen. Sunflowers have always been the flower of loyalty and light — they literally follow the sun, faces tracking warmth across the sky, which is why the old gardeners called them the most faithful bloom in the bed. Around them, drifts of baby's breath fall like soft scattered clouds, broad green leaves ground the stems in living gold, and the whole bouquet is sleeved in honeyed kraft paper with a clear inner wrap, finished at the throat with a cream satin ribbon tied into a generous bow. \"Keep your face to the sunshine and you cannot see the shadow.\" Golden Grace is the bouquet for the people who do exactly that — and for the ones who deserve a little of their own sun handed back.",
    stems: ["2 stems of fresh-cut sunflowers", "Soft baby's breath (gypsophila)", "Natural green sunflower foliage", "Honey-kraft outer wrap with clear inner sleeve", "Cream satin ribbon, hand-tied bow"],
  },
  {
    slug: "snow-petals",
    name: "Snow Petals",
    tagline: "Quiet white roses, dressed in kraft and eucalyptus",
    price: 699,
    category: "Bouquets",
    image: snowPetals,
    emotion: "For the calm, grounded kind of love",
    description:
      "A small choir of cream-white roses gathers at the heart of this bouquet, framed by silver-green eucalyptus leaves and a soft drift of baby's breath that floats around them like first snow. White roses are the oldest letter in the flower alphabet — purity, reverence, a new beginning offered with both hands — and the eucalyptus grounds all that softness with something steady, herbal, almost meditative, a scent that settles a room the moment you walk in. The whole arrangement is rolled into a cone of warm honey-kraft paper, tied at the throat with rough natural twine and finished with a wide white satin ribbon that spills across the linen like a held breath. \"Some love doesn't bloom loud — it lays itself down quietly and stays.\" Snow Petals is the bouquet for the people who love that way: gentle, grounded, and utterly true.",
    stems: ["A gathering of cream-white roses", "Fresh silver eucalyptus foliage", "Soft baby's breath (gypsophila)", "Honey-kraft cone wrap", "Natural twine and wide white satin ribbon"],
  },
  {
    slug: "petals-embrace",
    name: "Petal's Embrace",
    tagline: "Pink lilies, holding you close",
    price: 1299,
    category: "Bouquets",
    image: petalsEmbrace,
    emotion: "For a love that wraps itself around you",
    description:
      "A trio of pink Oriental lilies unfurls at the heart of this bouquet — each petal that impossibly soft shade between blush and dawn, brushed with a deeper rose down the centre vein and freckled gold in the throat. The pink lily is one of the most quietly romantic flowers in the world: in the old language of blooms it carries prosperity, admiration, and a love that's still learning how big it can grow. A single ivory rose tucks itself in like a kept secret, and clouds of baby's breath drift around the lilies like little stars caught in tulle. The whole arrangement is cradled in two layers of cream wrapping paper — the outer sheet softly crinkled, the inner one folded into careful petals of its own — and tied at the throat with a length of blush-pink twine, finished with a small message card waiting for your words. \"Some flowers don't just sit in your hands — they hold them back.\" Petal's Embrace is the bouquet for the love that arrives like a slow exhale: gentle, certain, and impossible to put down.",
    stems: ["3 stems of pink Oriental lilies", "1 ivory rose", "Generous baby's breath (gypsophila)", "Fresh green foliage", "Two layers of cream wrapping paper", "Blush-pink twine and message card"],
  },
  {
    slug: "romance-velvet",
    name: "Romance Velvet",
    tagline: "Crimson roses, hushed in champagne paper",
    price: 999,
    category: "Bouquets",
    image: romanceVelvet,
    emotion: "For old-cinema romance",
    description:
      "A close, opulent crown of deep crimson spray roses gathers at the top of this bouquet — each bloom a small velvet heart, layered tight with smaller buds still half-curled, the colour so saturated it almost drinks the light around it. Red roses are love's oldest and loudest word — passion, devotion, desire spoken without apology — and the spray rose adds a softer chorus underneath, three or four little blooms on every stem so the whole crown reads as a single, living velvet pillow. The arrangement is sleeved in a tall sheet of champagne-cream matte paper folded into a clean architectural cone, the seam dropping into a soft fishtail at the base, and finished at the throat with a wide burgundy satin ribbon tied into a generous hand-knotted bow that spills down the front like a held sigh. \"Red roses are the heart's loudest whisper.\" Romance Velvet is the bouquet for the quiet, cinematic kind of love — the one that doesn't need fireworks, only a single look held a beat too long.",
    stems: ["A full gathering of deep red spray roses", "Natural green foliage at the collar", "Architectural champagne-cream matte wrap", "Wide burgundy satin ribbon, hand-tied bow"],
  },
  {
    slug: "red-letter",
    name: "Red Letter",
    tagline: "One rose, one page, one feeling",
    price: 299,
    category: "Single Stem",
    image: redLetter,
    emotion: "For the words you finally want to say",
    description:
      "A single long-stemmed red rose, hand-picked for that deep velvet red that almost glows from within, laid against a backdrop of old book pages — real printed paper, slightly yellowed at the edges, the kind that smells faintly of libraries and rainy afternoons. There is something almost unbearably romantic about pairing a rose with a page: the rose is the feeling, the page is the language, and together they say what a text message never could. The stem keeps its full dark-green foliage, the bloom is sleeved first in the printed page and then in a soft cone of honey-kraft paper, finished at the throat with a slim satin ribbon stamped \"JUST FOR YOU.\" The red rose has spoken for lovers across every century — passion, devotion, the heart laid open without apology — and as a single stem, it speaks more honestly than a dozen ever could. **A letter of your choice (or one written by us) will be tucked inside the wrap, so the flower arrives carrying your words for your loved one.** Red Letter is the bouquet for confessions, anniversaries kept small, apologies that mean it, and the simple, unforgettable act of saying \"I thought of you today.\"",
    stems: ["1 long-stemmed red rose", "Natural green rose foliage", "Vintage printed book-page inner wrap", "Honey-kraft outer cone", "Clear cellophane sleeve", "\"Just For You\" satin ribbon", "A personal letter — yours or ours — tucked in with the flower"],
  },
];



const bouquetIndex: Map<string, Bouquet> = new Map(bouquets.map((b) => [b.slug, b]));
export const getBouquet = (slug: string): Bouquet | undefined => bouquetIndex.get(slug);
