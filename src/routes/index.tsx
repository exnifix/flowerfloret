import { createFileRoute } from "@tanstack/react-router";
import { AurevonLanding } from "@/components/site/AurevonLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurevon — A Carefully Curated Floral Collection" },
      {
        name: "description",
        content:
          "Aurevon is a private floral gallery of carefully curated, hand-tied arrangements. Reserve your place on the waitlist.",
      },
      { property: "og:title", content: "Aurevon — A Carefully Curated Floral Collection" },
      {
        property: "og:description",
        content: "A private floral gallery beyond compare. Reserve your place in our waitlist.",
      },
      { property: "og:url", content: "https://flowerfloret.lovable.app/" },
      { name: "twitter:title", content: "Aurevon — A Carefully Curated Floral Collection" },
      {
        name: "twitter:description",
        content: "A private floral gallery beyond compare. Reserve your place in our waitlist.",
      },
    ],
    links: [{ rel: "canonical", href: "https://flowerfloret.lovable.app/" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  return <AurevonLanding />;
}
