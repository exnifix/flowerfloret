import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { bouquets } from "@/lib/bouquets";

const BASE_URL = "https://flowerfloret.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/collection", priority: "0.9", changefreq: "weekly" },
          { path: "/build", priority: "0.9", changefreq: "monthly" },
          { path: "/cafe", priority: "0.8", changefreq: "monthly" },
          { path: "/about", priority: "0.7", changefreq: "monthly" },
          { path: "/contact", priority: "0.7", changefreq: "monthly" },
          ...bouquets.map((b) => ({ path: `/product/${b.slug}`, priority: "0.8", changefreq: "monthly" as const })),
        ];

        const urls = entries
          .map(
            (e) =>
              `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
