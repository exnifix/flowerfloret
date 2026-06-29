import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-8xl text-ink">404</h1>
        <h2 className="mt-4 font-serif text-2xl text-ink">This page hasn't bloomed yet</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has wilted, or never grew here.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-blush-soft px-7 py-3 text-sm text-ink hover:bg-blush transition-colors"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-ink">Something didn't blossom</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          A little gust caught us. Try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-ink text-cream px-6 py-2.5 text-sm hover:bg-ink/90 transition-colors"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-border px-6 py-2.5 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Floret — Where Emotions Bloom" },
      { name: "description", content: "Hand-tied bouquets composed as gestures. Floret crafts floral arrangements that speak the language of unspoken feelings." },
      { property: "og:title", content: "Floret — Where Emotions Bloom" },
      { property: "og:description", content: "Hand-tied bouquets composed as gestures. Floret crafts floral arrangements that speak the language of unspoken feelings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Floret — Where Emotions Bloom" },
      { name: "twitter:description", content: "Hand-tied bouquets composed as gestures. Floret crafts floral arrangements that speak the language of unspoken feelings." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fce57ac1-4615-4af7-92d9-13ff9b0a4177/id-preview-92112fd2--da013ce0-a7fa-495b-ae1c-8c4890277b1d.lovable.app-1782556626080.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fce57ac1-4615-4af7-92d9-13ff9b0a4177/id-preview-92112fd2--da013ce0-a7fa-495b-ae1c-8c4890277b1d.lovable.app-1782556626080.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Karla:wght@300;400;500;600;700&display=swap",
      },


    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
