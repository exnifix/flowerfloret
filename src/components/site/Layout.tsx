import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PetalField } from "./PetalField";
import { ScrollProgress } from "./ScrollProgress";
import { PageTransition } from "./PageTransition";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-cream text-ink flex flex-col">
      <ScrollProgress />
      <PetalField />
      <Header />
      <main className="relative z-10 flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
