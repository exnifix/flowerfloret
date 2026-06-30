import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { z } from "zod";
import { Layout } from "@/components/site/Layout";
import { OrderForm } from "@/components/site/forms/OrderForm";
import { getBouquet } from "@/lib/bouquets";

const searchSchema = z.object({
  bouquet: z.string().optional(),
  custom: z.string().optional(),
});

export const Route = createFileRoute("/order")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Complete Your Order — Floret" },
      { name: "description", content: "Finalise your Floret order: delivery details and bKash payment." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { bouquet: slug, custom } = Route.useSearch();
  const bouquet = slug ? getBouquet(slug) : undefined;
  const initialBouquet = bouquet?.name ?? "";
  const customNote = custom?.trim() ?? "";

  return (
    <Layout>
      <section className="pt-12 pb-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-rose transition-colors mb-8"
          >
            <ArrowLeft className="size-4" /> Back to Collection
          </Link>

          <p className="text-xs uppercase tracking-[0.25em] text-rose mb-4 animate-fade-up">Checkout</p>
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-[1] animate-fade-up delay-100">
            Complete your <span className="italic font-italic text-rose">order</span>
          </h1>
          <p className="mt-4 italic font-italic text-ink/60 text-lg animate-fade-up delay-200">
            {bouquet ? `You're ordering ${bouquet.name}. ` : ""}Delivery and payment details below.
          </p>

          {customNote && bouquet && (
            <div className="mt-8 rounded-2xl border border-rose/30 bg-blush-soft/50 p-5 animate-fade-up delay-200">
              <p className="text-xs uppercase tracking-[0.2em] text-rose mb-2 flex items-center gap-2">
                <Sparkles className="size-3.5" /> Your customizations
              </p>
              <p className="text-sm text-ink/80 leading-relaxed">{customNote}</p>
              <Link
                to="/build"
                search={{ base: bouquet.slug }}
                className="mt-3 inline-block text-xs text-rose underline hover:no-underline"
              >
                Edit customizations
              </Link>
            </div>
          )}

          <div className="mt-10 animate-fade-up delay-300">
            <OrderForm initialBouquet={initialBouquet} customNote={customNote} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
