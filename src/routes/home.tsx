import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { QuoteCarousel } from "@/components/site/QuoteCarousel";
import { HomeHero } from "@/components/site/sections/HomeHero";
import { BloomReveal } from "@/components/site/sections/BloomReveal";
import { CategoryGrid } from "@/components/site/sections/CategoryGrid";
import { FeaturedCollection } from "@/components/site/sections/FeaturedCollection";
import { CakeCombos } from "@/components/site/sections/CakeCombos";
import { BespokeCTA } from "@/components/site/sections/BespokeCTA";
import { InstagramGrid } from "@/components/site/sections/InstagramGrid";
import { ContactCTA } from "@/components/site/sections/ContactCTA";
import hero from "@/assets/hero-flowers.jpg";

const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fce57ac1-4615-4af7-92d9-13ff9b0a4177/id-preview-92112fd2--da013ce0-a7fa-495b-ae1c-8c4890277b1d.lovable.app-1782556626080.png";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Floret — Hand-Tied Bouquets Where Emotions Bloom" },
      { name: "description", content: "Floret crafts hand-tied bouquets that speak the language of feelings. Explore our seasonal collection or compose a bespoke arrangement." },
      { property: "og:title", content: "Floret — Hand-Tied Bouquets Where Emotions Bloom" },
      { property: "og:description", content: "Hand-tied bouquets composed as gestures by a small floral studio. Shop the collection or build your own." },
      { property: "og:url", content: "https://flowerfloret.lovable.app/home" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:title", content: "Floret — Hand-Tied Bouquets Where Emotions Bloom" },
      { name: "twitter:description", content: "Hand-tied bouquets composed as gestures by a small floral studio." },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: "https://flowerfloret.lovable.app/home" },
      { rel: "preload", as: "image", href: hero, fetchPriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Floret",
          url: "https://flowerfloret.lovable.app",
        }),
      },
    ],
  }),
  component: HomeSectionsPage,
});

function HomeSectionsPage() {
  return (
    <Layout>
      <HomeHero />
      <BloomReveal />
      <QuoteCarousel />
      <CategoryGrid />
      <FeaturedCollection />
      <CakeCombos />
      <BespokeCTA />
      <InstagramGrid />
      <ContactCTA />
    </Layout>
  );
}
