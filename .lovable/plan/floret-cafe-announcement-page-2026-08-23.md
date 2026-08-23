# Floret Cafe Announcement Page

A new dedicated page at `/cafe` announcing the Floret flower & food cafe stall, with a heartfelt thank-you to customers.

## Content

- **Hero**: "Floret Cafe" headline with a soft "Now Open" / grand announcement badge, animated bloom-in text matching the rest of the site.
- **Thank you note**: A warm, story-driven message thanking everyone for the support that made this possible.
- **The announcement**: Introducing the new stall — a flower and food cafe where everyone can come, sit, and enjoy blooms alongside good food.
- **What to expect**: Three or four soft cards (fresh blooms on every table, coffee & bakes, a bouquet bar, a corner for slow afternoons) — written warmly, no invented address, hours, or prices.
- **Closing CTA**: Follow @floret on Instagram for the opening date and location, plus links to the existing contact page and collection.
- **Imagery**: Two or three generated cafe images in the existing cream/blush editorial style.

Any real details (address, hours, menu, prices) are left out for now and can be added later once you have them.

## Technical notes

- New route `src/routes/cafe.tsx` with its own `head()` metadata (unique title, description, og/twitter tags, og:image from the generated hero once absolute).
- New section components under `src/components/site/sections/` for the cafe hero and highlights, reusing `TextEffect`, `AnimatedGroup`, `InView`, and `Magnetic` primitives so it feels identical in motion to the rest of the site.
- Add "Cafe" to the nav in `src/components/site/Header.tsx` (desktop + mobile) and the footer links.
- Add `/cafe` to `src/routes/sitemap[.]xml.ts`.
- Cafe images generated into `src/assets/` and imported as ES6 imports; lazy-loaded with alt text.
- Semantic tokens only — no hardcoded colors; reduced-motion respected via existing global CSS.
