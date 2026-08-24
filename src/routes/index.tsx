import { createFileRoute } from "@tanstack/react-router";
import { AurevonLanding } from "@/components/site/AurevonLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Floret — Hand-Tied Bouquets Where Feelings Bloom" },
      {
        name: "description",
        content:
          "Floret is a floral studio in Dhaka crafting hand-tied bouquets, cake & flower combos and wedding florals. Explore the collection and order online.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Floret — Hand-Tied Bouquets Where Feelings Bloom" },
      {
        property: "og:description",
        content: "A curated floral collection beyond compare. Explore our bouquets and order online.",
      },
      { property: "og:url", content: "https://flowerfloret.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Floret — Hand-Tied Bouquets Where Feelings Bloom" },
      {
        name: "twitter:description",
        content: "A curated floral collection beyond compare. Explore our bouquets and order online.",
      },
    ],
    links: [{ rel: "canonical", href: "https://flowerfloret.lovable.app/" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  return <AurevonLanding />;
}
