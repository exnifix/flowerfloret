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
import blushingGraceAsset from "@/assets/blushing-grace.jpeg.asset.json";
import eleganceDesireAsset from "@/assets/elegance-desire.jpeg.asset.json";
import creamyLoveAsset from "@/assets/creamy-love.jpeg.asset.json";
import imperialBeautyAsset from "@/assets/imperial-beauty.jpeg.asset.json";
import softLoveAsset from "@/assets/soft-love.jpeg.asset.json";
import phoenixBloomAsset from "@/assets/phoenix-bloom.jpeg.asset.json";
import elaraAsset from "@/assets/elara.jpeg.asset.json";
import tranquilBloomAsset from "@/assets/tranquil-bloom.jpeg.asset.json";
import luxeIvoryAsset from "@/assets/luxe-ivory.jpeg.asset.json";
import crimsonLoveAsset from "@/assets/crimson-love.jpeg.asset.json";
import pearlRoyaleAsset from "@/assets/pearl-royale.jpeg.asset.json";
import goldenHarmonyAsset from "@/assets/golden-harmony.jpeg.asset.json";
import sunflowerSerenityAsset from "@/assets/sunflower-serenity.jpeg.asset.json";
import pinkDesireAsset from "@/assets/pink-desire.jpeg.asset.json";
import pinkEleganceAsset from "@/assets/pink-elegance.jpeg.asset.json";
import vanillaAffectionAsset from "@/assets/vanilla-affection.jpeg.asset.json";
import blossomsOfDesireAsset from "@/assets/blossoms-of-desire.jpeg.asset.json";
import artOfUnspokenWordAsset from "@/assets/art-of-unspoken-word.jpeg.asset.json";
import snowfallAsset from "@/assets/snowfall.jpeg.asset.json";
import gentleMomentsOfLoveAsset from "@/assets/gentle-moments-of-love.jpeg.asset.json";
import petalsAndPastriesAsset from "@/assets/petals-and-pastries.jpeg.asset.json";

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
const blushingGrace = blushingGraceAsset.url;
const eleganceDesire = eleganceDesireAsset.url;
const creamyLove = creamyLoveAsset.url;
const imperialBeauty = imperialBeautyAsset.url;
const softLove = softLoveAsset.url;
const phoenixBloom = phoenixBloomAsset.url;
const elara = elaraAsset.url;
const tranquilBloom = tranquilBloomAsset.url;
const luxeIvory = luxeIvoryAsset.url;
const crimsonLove = crimsonLoveAsset.url;
const pearlRoyale = pearlRoyaleAsset.url;
const goldenHarmony = goldenHarmonyAsset.url;
const sunflowerSerenity = sunflowerSerenityAsset.url;
const pinkDesire = pinkDesireAsset.url;
const pinkElegance = pinkEleganceAsset.url;
const vanillaAffection = vanillaAffectionAsset.url;
const blossomsOfDesire = blossomsOfDesireAsset.url;
const artOfUnspokenWord = artOfUnspokenWordAsset.url;
const snowfall = snowfallAsset.url;
const gentleMomentsOfLove = gentleMomentsOfLoveAsset.url;
const petalsAndPastries = petalsAndPastriesAsset.url;



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
    slug: "petals-and-pastries",
    name: "Petals and Pastries",
    tagline: "Cherry-red roses in tulle with a pearl-dotted ivory cake and a single wish-it candle",
    price: 1499,
    category: "Cake & Flower Combo",
    image: petalsAndPastries,
    emotion: "For the small, candle-lit moments that turn into the whole memory",
    description:
      "A romantic cluster of cherry-red roses — petals stacked tight and velvety, the colour of stage curtains and slow songs — cradled inside layers of crisp white tulle that fan out like a ballerina's skirt, finished with a hand-tied scarlet satin bow. Set beside a tall, drum-shaped vanilla bento cake in ivory porcelain buttercream, the top swirled in fine concentric ridges and scattered with tiny edible ivory pearls, wrapped in a soft mint-cream collar and finished with a generous scarlet silk bow at the front. Crowned with a single, slow-burning gold spiral wish-it candle, flickering warm against the dark. Red roses are the oldest, most fearless word for love and devotion; the white tulle is the hush around it; the pearl-dotted cake and lone candle are the moment you actually make the wish. Petals and Pastries is for intimate birthdays, quiet anniversaries, late-night surprises and the kind of love you'd rather show than say — delivered together, cinematic, tender, and made to be photographed before it's eaten.",
    stems: ["~12 premium cherry-red roses, full-bloom", "Layered crisp white tulle wrap with scarlet satin bow", "Tall ivory porcelain-buttercream vanilla bento cake", "Concentric ridge top with edible ivory pearl scatter", "Mint-cream collar with scarlet silk front bow", "Single tall gold spiral wish-it candle"],
  },
  {
    slug: "gentle-moments-of-love",
    name: "Gentle Moments Of Love",
    tagline: "A swooning armful of blush-pink roses with a gold-lettered birthday cake in a keepsake box",
    price: 1999,
    category: "Cake & Flower Combo",
    image: gentleMomentsOfLove,
    emotion: "For the slow, unhurried kind of love that asks for nothing and means everything",
    description:
      "An indulgent armful of fully-bloomed blush-pink roses — petals brushed from soft cream at the base into a rich watercolour rose at the tips, faces wide open and unafraid, the kind of bloom that looks photographed even in person — bundled into a generous, sculptural bouquet that spills across the linen like a love poem in slow motion. Paired with a petite round vanilla bento cake nestled inside a crisp ivory keepsake gift-box with a clear scalloped window: smooth porcelain-white buttercream sides, a fine sprinkle of edible gold dust across the top, and 'Happy Birthday' hand-lettered in delicate shimmering gold script, finished with a tiny gold-foil heart pressed beside it. Tied off with a long, glossy dusty-rose satin ribbon trailing across the table. Soft-pink roses are the oldest, gentlest word for tenderness, grace, and admiration spoken without raising the voice; the gold-script cake is the quiet celebration that lives inside it. Gentle Moments Of Love is for birthdays that deserve a little ceremony, for the partner you're still surprised by, for the friend who turns ordinary afternoons into a story — delivered together, soft, romantic, and made to be remembered.",
    stems: ["~24 premium blush-pink roses, full-bloom", "Petite round vanilla bento cake in ivory keepsake gift-box", "Edible gold-dust shimmer top", "Hand-piped shimmering gold 'Happy Birthday' script with gold-foil heart", "Long dusty-rose satin trailing ribbon", "Sculptural ivory matte wrap"],
  },
  {
    slug: "snowfall",
    name: "Snowfall",
    tagline: "Velvet red roses dusted in baby's breath, beside a love-lettered birthday cake",
    price: 1599,
    category: "Cake & Flower Combo",
    image: snowfall,
    emotion: "For the kind of love that arrives like winter light — quiet, warm, unforgettable",
    description:
      "A deep, cinematic bouquet of velvet-red roses — each bloom heavy with petals the colour of old film and slow-burning candles — set against a snowstorm of fresh baby's breath that drifts through the arrangement like soft falling snow. Wrapped in whisper-thin ivory tissue and finished with a glossy black satin ribbon trailing long across the linen, the whole thing feels caught between a love letter and a December morning. Paired with a petite round vanilla bento cake, piped in tall vertical buttercream scallops, edged in delicate champagne-gold pearls, and hand-lettered in flowing dark script: 'Happy Birthday love' — the kind of cake that looks like it was made by someone who actually means it. Red roses are the oldest, loudest, most honest word for love; baby's breath is the hush around it; the cake is the celebration in the middle. Snowfall is for birthdays that matter, for anniversaries you want to do properly this time, for the person who turns even ordinary Tuesdays into something worth photographing. Delivered together — soft, romantic, a little bit cinematic, exactly the kind of moment people remember.",
    stems: ["~9 premium velvet-red roses, full-bloom", "Lush fresh baby's breath halo", "Petite round vanilla bento cake with vertical buttercream scallops", "Champagne-gold edible pearl trim", "Hand-piped dark script: 'Happy Birthday love'", "Whisper-ivory tissue wrap with glossy black satin ribbon"],
  },
  {
    slug: "art-of-unspoken-word",
    name: "The Art Of Unspoken Word",
    tagline: "White gerberas and a scarlet-ribboned cake — everything you couldn't say, said anyway",
    price: 1139,
    category: "Cake & Flower Combo",
    image: artOfUnspokenWord,
    emotion: "For the feelings that arrive without needing a sentence",
    description:
      "An armful of pure-white gerbera daisies — faces wide open, petals fanned like little suns, soft chartreuse-green centres still holding the morning — tucked together with sprigs of silvery-grey eucalyptus that smell faintly of clean rain. The bouquet is sleeved in soft ivory matte paper, calm and unfussy, letting the flowers do every bit of the talking. Beside it sits a petite round vanilla bento cake, its sides piped in tall vertical buttercream pleats like a little ballerina skirt, and its top hand-lettered in glossy scarlet script: 'happy birthday' — finished with a constellation of tiny red fondant hearts and a generous, hand-tied red satin double-bow trailing long ribbons across the table. White gerberas, in the old language of flowers, mean innocence, purity, and a gentleness that doesn't need to explain itself; the splash of scarlet ribbon is the heartbeat underneath. Together, this combo is for the things you wish you'd said sooner — the thank-you, the I-see-you, the I'm-still-here. Perfect for birthdays, quiet apologies, long-awaited reunions, and the kind of love that's always been louder than its words.",
    stems: ["~9 premium pure-white gerbera daisies", "Fresh silvery-grey eucalyptus accents", "Petite round vanilla bento cake with vertical buttercream pleats", "Hand-piped scarlet 'happy birthday' script with red fondant hearts", "Hand-tied scarlet satin double-bow", "Soft ivory matte paper wrap"],
  },
  {
    slug: "blossoms-desire",
    name: "Blossoms Desire",
    tagline: "Powder-pink roses and golden candlelight, hand-delivered",
    price: 1399,
    category: "Cake & Flower Combo",
    image: blossomsOfDesire,
    emotion: "For the celebrations that taste like cake and feel like love",
    description:
      "A swooning armful of powder-pink roses — petals layered like ballet skirts, each bloom caught at that perfect half-open moment where the centre still keeps a secret — bundled into soft ivory matte paper that falls open in dramatic, sculptural curves. Paired with a petite round vanilla bento cake, finished in pale-blush buttercream rimmed with a delicate gold leaf trim, and hand-lettered in shimmering gold script: 'Happy Birthday'. Two tall, twisted golden candles stand proudly at the centre, waiting to be lit. Soft-pink roses are the language of grace, gentleness, and admiration spoken without raising the voice — combined with the cake, Blossoms Desire is the whole golden-hour celebration in one delivery: the gasp at the door, the strike of the match, the slow phone-camera circle, the wish made between two breaths. Perfect for birthdays, anniversaries, surprise office moments, and the kind of love that wants to arrive in person.",
    stems: ["~16 premium powder-pink roses, half-bloom", "Petite round vanilla bento cake with gold-leaf rim", "Hand-piped shimmering gold 'Happy Birthday' script", "2 tall twisted golden pillar candles", "Sculptural ivory matte wrap with story-print kraft base"],
  },
  {
    slug: "vanilla-affection",
    name: "Vanilla Affection",
    tagline: "Cream roses and a candlelit cake — the whole celebration, hand-delivered",
    price: 1499,
    category: "Cake & Flower Combo",
    image: vanillaAffection,
    emotion: "For the birthdays that deserve to be remembered softly",
    description:
      "A generous gathering of ivory-cream roses — petals layered like folded silk, blushing faintly at the edges where the light catches them — bundled into a soft mint-pistachio wrap that falls open like a whispered secret. Paired with a petite round vanilla bento cake, finished in smooth buttercream and hand-lettered with a gold-and-chocolate 'Happy Birthday' script, a tiny red fondant heart pressed gently beside the words, and a single tall golden candle waiting to be lit. Cream roses speak of admiration in its quietest form — devotion without spectacle, love that doesn't need to raise its voice. Together with the cake, Vanilla Affection is the whole celebration in one delivery: the gasp at the door, the candle being struck, the slow circle of friends gathered around a phone camera. Perfect for birthdays, anniversaries, surprise office moments, or the long-distance kind of love that arrives in person for one perfect afternoon.",
    stems: ["~20 premium ivory-cream roses, half-bloom", "Petite round vanilla bento cake with buttercream finish", "Hand-piped gold & chocolate 'Happy Birthday' script with fondant heart", "1 tall golden pillar candle", "Soft mint-pistachio matte wrap with ivory tissue lining"],
  },
  {
    slug: "pink-elegance",
    name: "Pink Elegance",
    tagline: "Three blush daisies, smiling shyly through cellophane",
    price: 499,
    category: "Bouquets",
    image: pinkElegance,
    emotion: "For the soft, sunlit kind of happiness",
    description:
      "Three perfect blush-pink gerbera daisies stand tall together — petals fanned wide like tiny suns caught mid-bloom, faces tilted as if listening for good news. Their soft peach-pink centres melt into creamy ivory tips, the kind of colour that looks freshly painted by morning light. Cradled in a sculpted fold of pale pink mesh and ivory tissue, the bouquet is sleeved in crystal-clear cellophane shaped into a graceful elongated cone — slender, architectural, almost couture. A small handwritten 'happy' tag swings from a paperclip at the throat, and a long blush-coral satin ribbon is tied into a generous double bow with trailing tails that sway with every step. Gerberas, in the language of flowers, mean cheerfulness, innocence, and the simple, uncomplicated joy of being thought of. Pink Elegance is the bouquet for a first apartment, a passed exam, a sweet 'just because' Tuesday, or the friend who deserves to feel seen. Quiet, graceful, and impossibly sweet.",
    stems: ["3 premium blush-pink gerbera daisies", "Pale pink mesh and ivory tissue lining", "Architectural clear cellophane cone wrap", "Blush-coral satin double-bow ribbon", "Handwritten 'happy' kraft tag"],
  },
  {
    slug: "rosetta",
    name: "Rosetta",
    tagline: "One rose. One promise. Nothing else needed.",
    price: 149,
    category: "Single Stem",
    image: rosetta,
    emotion: "For the quiet, deliberate kind of love",
    description:
      "A single red rose — chosen for its perfect, unbruised head — stands tall inside a sheer cellophane sleeve, dressed in midnight-black crepe petals that flare around the stem like the skirt of a gown. Finished with a slim crimson satin ribbon tied into a soft bow, Rosetta is the bouquet that doesn't need to explain itself. One rose has always meant one thing — \"you, and only you\" — and the black wrap turns that whisper into a statement: serious, devoted, a little dramatic, deeply romantic. Hand it over on a first date, slip it into the seat of a car, leave it on a pillow. It's the smallest grand gesture in the shop.",
    stems: ["1 long-stem premium red rose", "Crystal-clear cellophane sleeve", "Black crepe paper wrap", "Crimson satin ribbon"],
  },
  {
    slug: "blushing-grace",
    name: "Blushing Grace",
    tagline: "Soft as a first hello, sweet as a held hand",
    price: 499,
    category: "Bouquets",
    image: blushingGrace,
    emotion: "For tender beginnings and gentle confessions",
    description:
      "Ten plump pink rosebuds — each one caught at that perfect, just-about-to-open moment — cluster together like a circle of friends sharing a secret. Their petals carry that impossible bubblegum-pink that looks lit from within, framed by glossy emerald leaves that make the colour sing even louder. Pink roses, in the old floriographies, mean grace, admiration, and a happiness that's still a little shy of itself. The whole bouquet is cradled in two generous wraps of soft rose-pink crepe paper folded into a graceful cone, and finished with a striped grosgrain ribbon in cherry-red and white — the kind of bow that turns a delivery into an occasion. Send it for a first date, a sweet sixteen, a thank-you, or a Tuesday that deserved more than a text.",
    stems: ["10 stems of premium pink roses (bud-stage)", "Fresh emerald foliage", "Double-layer rose-pink crepe wrap", "Cherry-and-white striped grosgrain ribbon"],
  },
  {
    slug: "elegance-desire",
    name: "Elegance Desire",
    tagline: "A cathedral of pink roses, carried like a secret",
    price: 849,
    category: "Bouquets",
    image: eleganceDesire,
    emotion: "For the longing that finally finds its words",
    description:
      "An extravagant gathering of spray roses — dozens of small, perfectly-formed pink heads blooming in tiers along tall emerald stems — rises out of the wrap like a slow exhale. Each cluster carries that soft, candlelit pink that sits exactly between blush and bubblegum: feminine, romantic, a little theatrical. The stems are tall and proudly bare, gathered into a single tight grip and sleeved in crystal-clear cellophane that's folded into a sharp architectural cone, so the whole bouquet reads like a stained-glass window held up to the light. A wide, glossy pink satin ribbon is tied at the throat into a generous double bow, its long tails trailing past the wrist. Spray roses, by tradition, are roses multiplied — admiration in plural, affection said over and over in the same breath. Hand this one across a doorway and you're not whispering a feeling anymore; you're announcing it.",
    stems: ["Premium pink spray roses (multi-head, long-stem)", "Tall fresh-cut emerald foliage", "Architectural clear cellophane cone wrap", "Wide blush-pink satin double-bow ribbon"],
  },
  {
    slug: "creamy-love",
    name: "Creamy Love",
    tagline: "Quiet vows, folded in white paper",
    price: 699,
    category: "Bouquets",
    image: creamyLove,
    emotion: "For a love that doesn't need volume to be heard",
    description:
      "A gathering of cream-white roses — petals so soft they look poured rather than grown — nestle into a bed of deep emerald leaves and peek out from a crisp, architectural fold of matte white paper. Each rose sits at that perfect, half-opened moment: still holding its secret, already showing its heart. White roses have always been the flower of pure intention — new beginnings, sincere devotion, the kind of feeling that doesn't need to be dressed up to be believed. The wrap is folded sharp and clean, like a love letter that's been read once and saved forever, and tied at the throat with a slim ivory satin ribbon knotted into a simple, unfussy bow. Creamy Love is the bouquet for the quiet ones — the first \"I love you,\" the morning-after gesture, the apology that finally lands, the anniversary that doesn't need a speech. Pure, gentle, and impossibly elegant.",
    stems: ["Premium cream-white roses (half-bloom)", "Fresh emerald rose foliage", "Architectural matte white paper wrap", "Ivory satin ribbon"],
  },
  {
    slug: "imperial-beauty",
    name: "Imperial Beauty",
    tagline: "Deep red roses, dressed like royalty",
    price: 599,
    category: "Bouquets",
    image: imperialBeauty,
    emotion: "For the love that arrives like a verdict — final, certain, unforgettable",
    description:
      "A close gathering of velvet-deep red roses — petals so darkly saturated they look almost burgundy in low light, almost ruby when the sun catches them — sits at the heart of a crisp, architectural fold of matte white paper. Each rose is caught at that perfect, half-open moment where the bloom is most generous: full, lush, unapologetic. Red roses have always been the language of devotion at its loudest — passion, desire, a love that has stopped pretending to be casual — and Imperial Beauty wears that meaning like a crown. The wrap is folded into a sharp ivory cone, clean and modern, letting the roses speak without competition. Tied at the throat with a wide blush-pink satin ribbon knotted into a soft, generous bow, the bouquet carries a quiet contrast — fierce roses, tender ribbon, the warmth of a confession dressed in restraint. Hand it across a candlelit table, place it on a doorstep at midnight, deliver it on an anniversary that deserves something heavier than words. Imperial Beauty isn't a bouquet — it's a declaration.",
    stems: ["Premium deep-red roses (half-bloom, long-stem)", "Architectural matte white paper wrap", "Wide blush-pink satin ribbon"],
  },
  {
    slug: "soft-love",
    name: "Soft Love",
    tagline: "Pink lilies, opening like a slow confession",
    price: 1999,
    category: "Bouquets",
    image: softLove,
    emotion: "For the love that grows quietly, then all at once",
    description:
      "A generous gathering of pink Oriental lilies — petals brushed in that dreamlike blush that fades from soft cotton-candy at the tips to a deeper rose at the heart — opens slowly out of a crisp, glossy pink wrap folded into a sculptural cone. Each lily is caught mid-bloom: some still cupped like a held breath, others fully open with their freckled hearts and golden anthers on full display, a few buds still tucked in like secrets waiting their turn. Lush emerald foliage frames every face, making the pink almost glow. Pink lilies, in the old language of flowers, mean prosperity, abundance, and a love that's already imagined the future — they're the bouquet you give when ordinary affection has quietly turned into something bigger. The wrap is tied off with a slim painted ribbon, soft and feminine, and the long bare stems peek out at the base like the bouquet was just lifted from the garden. Soft Love is the grand, unhurried gesture — the anniversary, the proposal-in-waiting, the apology that means it, the \"I've thought about this for a long time.\"",
    stems: ["Premium pink Oriental lilies (multi-bloom, long-stem)", "Fresh emerald lily foliage", "Architectural glossy pink wrap", "Painted ivory ribbon"],
  },
  {
    slug: "phoenix-bloom",
    name: "Phoenix Bloom",
    tagline: "Crimson gerberas, rising bright from the ash",
    price: 999,
    category: "Bouquets",
    image: phoenixBloom,
    emotion: "For the comeback, the second chance, the love that refused to die",
    description:
      "A dense, perfectly round cluster of deep-crimson gerbera daisies — petals long and lacquer-bright, hearts inked in velvet-black — burst out of a sheer architectural wrap edged in soft blush and dusted with constellations of baby's breath. Each gerbera is caught at full bloom, faces turned up like small suns at their boldest hour, framed by glossy emerald leaves that make the red read almost cinematic. Red gerberas, in the language of flowers, mean fierce love, courage, and a happiness that's been earned — the kind of joy that comes back stronger after it's been tested. Drifts of white gypsophila weave between the heads like sparks, softening all that fire without dimming it. The wrap is folded into a wide, generous shape that frames the bouquet like a painting, with crisp blush and charcoal borders that give the whole thing the air of an editorial portrait. Phoenix Bloom is the bouquet for the milestone after the struggle — the recovery, the promotion, the reconciliation, the \"I knew you'd make it.\" Bold, joyful, and impossible to ignore.",
    stems: ["Premium deep-red gerbera daisies (full-bloom)", "Fresh white baby's breath (gypsophila)", "Glossy emerald foliage", "Architectural sheer wrap with blush-and-charcoal border"],
  },
  {
    slug: "elara",
    name: "Elara",
    tagline: "Pink lilies and baby's breath, soft as morning light",
    price: 1099,
    category: "Bouquets",
    image: elara,
    emotion: "For the tender kind of forever",
    description:
      "A delicate cluster of pink Oriental lilies stretches out of a soft blush wrap like a slow, sleepy yawn — petals brushed in dreamy candy-pink with deeper rose veins running through their hearts, edges curling back as if caught mid-stretch. Around them, a generous cloud of baby's breath drifts like tiny stars caught in a veil, softening every line and making the whole bouquet glow as if lit from within. Pink lilies whisper of prosperity, abundance, and a love that's quietly imagining the future; baby's breath has always meant everlasting devotion, the small constant promises that hold the bigger ones together. The wrap is layered — soft matte blush paper on the outside, a sheer veil of organza tucked inside — and finished at the throat with a wispy white ribbon tied into an airy, almost weightless bow. Elara feels like a love letter written on a Sunday morning: gentle, sincere, in no hurry. Send it for a quiet anniversary, a new chapter, a thank-you that means more than it says, or simply because someone deserves to feel softly adored.",
    stems: ["Premium pink Oriental lilies", "Fresh white baby's breath (gypsophila)", "Layered matte blush wrap with sheer organza veil", "Wispy white satin ribbon"],
  },
  {
    slug: "tranquil-bloom",
    name: "Tranquil Bloom",
    tagline: "A hundred tiny white roses, hushed under sheer veil",
    price: 1599,
    category: "Bouquets",
    image: tranquilBloom,
    emotion: "For the calm, certain love that doesn't need to prove itself",
    description:
      "A breathtaking fan of nearly a hundred miniature white spray roses opens like an unfurled lace fan — each tiny bud caught at that perfect half-bloom moment, ivory petals brushed with the faintest cream at their hearts, pressed together so densely the whole bouquet reads like a single soft cloud. The stems are slim and impossibly long, gathered into a tight throat and sleeved in pleated sheer organza that catches the light like spun glass; a delicate pearl trim runs along the upper edge, framing the roses like the hem of a wedding veil. White spray roses, by tradition, mean purity, deep admiration, and the kind of love that has quietly chosen you again and again — multiplied across every small bud is a promise repeated in soft handwriting. A wide champagne-gold satin ribbon is tied at the base into a luxurious double bow, its sheen warming the cool ivory and the silvery green of the wrap. Tranquil Bloom is the bouquet of grand, quiet occasions — the engagement, the bridal morning, the milestone anniversary, the \"I'd choose you a hundred times over.\" Serene, opulent, unforgettable.",
    stems: ["~100 premium miniature white spray roses (half-bloom)", "Pleated sheer organza wrap with pearl trim", "Wide champagne-gold satin double-bow ribbon"],
  },
  {
    slug: "luxe-ivory",
    name: "Luxe Ivory",
    tagline: "A cloud of baby's breath, cradled in blush",
    price: 699,
    category: "Bouquets",
    image: luxeIvory,
    emotion: "For the soft, lasting kind of devotion",
    description:
      "A generous, snow-white cloud of baby's breath bursts out of a sculptural blush-pink wrap, each tiny bloom catching the light like a constellation of paper stars. The gypsophila is gathered thick and full — hundreds of dainty ivory florets spilling outward in every direction, soft as sea foam, dense enough to feel almost weightless and weighty all at once. Beneath the blooms, a sheer ivory veil tucks inside the wrap, framing the heart of the bouquet like the inner lining of a couture gown. The outer wrap is folded into long, architectural petals of matte rose-pink paper that curl back to reveal the flowers like a slow reveal in a love story. Baby's breath, in the language of flowers, means everlasting love, innocence, and the kind of devotion that doesn't need to be loud to be true — a flower of small constant promises. Finished at the throat with two ribbons — one ivory satin, one blush — tied into an elegant trailing double bow. Luxe Ivory is the bouquet for the moments that don't need many words: the just-because, the soft apology, the new chapter, the quiet \"I'm proud of you.\" Pure, dreamy, and impossibly tender.",
    stems: ["Premium fresh baby's breath (gypsophila) — generous cloud", "Sheer ivory inner veil", "Architectural matte blush-pink paper wrap", "Ivory and blush satin double-bow ribbon"],
  },
  {
    slug: "crimson-love",
    name: "Crimson Love",
    tagline: "Red roses kissed by snow-white stars",
    price: 899,
    category: "Bouquets",
    image: crimsonLove,
    emotion: "For the love that is loud in feeling, gentle in voice",
    description:
      "A perfect dome of deep crimson roses — velvet-red, half-open, faces turned upward like an audience in love — is woven through with delicate sprigs of snow-white baby's breath that drift between the blooms like tiny falling stars. Each rose is full-headed and lush, the kind of red that reads almost black at the edges and ruby at the heart, framed by the soft ivory haze of gypsophila that softens all that fire without dimming it. Red roses speak of devotion, desire, and a love that has stopped pretending to be small; baby's breath answers back with innocence and the promise of forever — together they say everything a card can't. The whole arrangement is cradled in a crisp, architectural fold of matte ivory paper that opens like the petals of a single enormous flower, and finished at the throat with a wide crimson satin ribbon tied into a generous, glossy bow. Tucked at the top, a small ivory card waits for your handwriting. Crimson Love is the bouquet for the milestone confession — the proposal, the anniversary, the \"I should have said this sooner.\" Classic, cinematic, unforgettable.",
    stems: ["Premium deep-red roses (half-bloom)", "Fresh white baby's breath (gypsophila)", "Architectural matte ivory paper wrap", "Wide crimson satin ribbon", "Ivory message card"],
  },
  {
    slug: "pearl-royale",
    name: "Pearl Royale",
    tagline: "Oriental lilies wrapped in cloud-soft elegance",
    price: 1899,
    category: "Bouquets",
    image: pearlRoyale,
    emotion: "For the quiet kind of grandeur — soft, regal, unforgettable",
    description:
      "A poised gathering of pristine Oriental lilies — wide, star-shaped blooms in pearl-white, each petal brushed with a stroke of blush-pink running down its center like the inside of a seashell — opens generously above slim, half-closed buds that lean upward like notes waiting to be sung. The lilies are full-faced and fragrant, the kind that perfume an entire room within minutes of arriving, framed by deep glossy green leaves that make every petal glow even brighter. In the language of flowers, white lilies speak of purity, devotion, and a love rooted in respect; the soft pink at their heart adds tenderness, admiration, and the warmth of a long, gentle affection — together they say, \"I see you, and I think you are extraordinary.\" The whole bouquet is cradled in layers of cloud-soft, sheer ivory wrap that flares open like the inside of a couture skirt, gathered at the throat with a wide blush-peach satin ribbon tied into a generous, trailing bow. Pearl Royale is the bouquet for the moments that deserve a little ceremony — the milestone birthday, the anniversary that matters, the apology that comes with meaning, the \"thank you for everything.\" Quietly luxurious, deeply romantic, and impossible to forget.",
    stems: ["Premium fresh Oriental lilies (white with pink center) — full bloom and buds", "Deep green lily foliage", "Layered cloud-soft sheer ivory wrap", "Wide blush-peach satin ribbon bow"],
  },
  {
    slug: "golden-harmony",
    name: "Golden Harmony",
    tagline: "Sunflowers and baby's breath in rustic kraft",
    price: 1899,
    category: "Bouquets",
    image: goldenHarmony,
    emotion: "For the sunshine person who makes everything brighter",
    description:
      "A radiant gathering of golden sunflowers — wide, generous faces with deep amber centers and bold yellow petals that fan out like little suns caught mid-bloom — is laced through with drifting clouds of snow-white baby's breath and crowned with dark, fern-like foliage that frames every petal in deep forest green. The sunflowers turn their heads toward the light the way only sunflowers do, full of warmth, loyalty, and unfiltered joy; in the language of flowers, they stand for adoration, devotion, and the kind of love that follows you the way the bloom follows the sun. The baby's breath softens all that gold with a quiet, snowy hush — innocence and everlasting affection braided gently through the brightness. The whole bouquet is cradled in layers of natural kraft paper folded into a long, architectural cone, lined with a sheer ivory veil that catches the light, and finished at the throat with a wide sage-green organza ribbon tied into a soft, trailing bow. Golden Harmony is the bouquet for the friend who is your sunshine, the partner who has loved you loud, the parent who has always shown up, the new beginning that deserves applause. Earthy, joyful, and impossibly warm — happiness, wrapped.",
    stems: ["Premium fresh sunflowers — full bloom", "Snow-white baby's breath (gypsophila)", "Deep green fern foliage", "Natural kraft paper wrap with sheer ivory veil", "Sage-green organza ribbon bow"],
  },
  {
    slug: "sunflower-serenity",
    name: "Sunflower Serenity",
    tagline: "A single sunflower, simply wrapped",
    price: 399,
    category: "Bouquets",
    image: sunflowerSerenity,
    emotion: "For the small joys that mean the most",
    description:
      "A single, sun-faced sunflower — wide golden-orange petals fanning outward around a deep chocolate-brown center, framed by a few bold, glossy green leaves that look freshly cut from the garden — is wrapped with quiet care in soft brown kraft paper and lined with a vintage book page, its old-print text peeking through like a love note left in a library. The bloom is full and confident, the kind of sunflower that turns a whole room toward the window, and in the language of flowers it stands for warmth, loyalty, adoration, and the simple promise of always showing up. A crisp clear sleeve hugs it lightly to keep every petal pristine, finished at the throat with a slim signature ribbon. Sunflower Serenity is the bouquet for the everyday gestures that matter most — the just-because, the \"thinking of you,\" the first date that wants to feel thoughtful instead of grand, the friend who needs a little sunshine on a quiet afternoon. Small in size, big in feeling — happiness, gift-wrapped in a single bloom.",
    stems: ["1 premium fresh sunflower — full bloom", "Fresh green sunflower foliage", "Vintage book-page inner liner", "Natural brown kraft paper wrap", "Clear protective sleeve with signature ribbon"],
  },
  {
    slug: "pink-desire",
    name: "Pink Desire",
    tagline: "A blush cloud of spray roses in crystal wrap",
    price: 599,
    category: "Bouquets",
    image: pinkDesire,
    emotion: "For the soft, hopeful kind of love",
    description:
      "A generous gathering of soft pink spray roses — dozens of small, perfectly formed blooms in every stage from tight bud to half-open bloom — rises in a tall, airy fan of blush and rose, each cluster branching like a hand-drawn watercolor. The petals shift from cool ballet-pink at the edges to a warmer, deeper rose at the heart, and the stems are long and slender with fresh green sepals that keep every flower looking just-cut. In the language of flowers, pink roses speak of admiration, gentle affection, gratitude, and the kind of love that's still unfolding — sweet, sincere, never showy. The whole bouquet is wrapped in a crisp, crystal-clear cellophane that opens like a tall lantern around the blooms and catches the light from every angle, then gathered at the throat with a wide, blush-pink organza ribbon tied into a soft, trailing double bow. Pink Desire is the bouquet for the new beginning — the first date that's quietly serious, the friendship that's becoming something more, the \"I've been thinking about you,\" the birthday that wants to feel romantic without saying too much. Tender, romantic, and irresistibly pretty.",
    stems: ["Premium fresh pink spray roses — multi-bloom stems", "Fresh green rose foliage", "Crystal-clear cellophane wrap", "Wide blush-pink organza ribbon double bow"],
  },











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
