import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { Layout } from "@/components/site/Layout";
import { OrderForm } from "@/components/site/forms/OrderForm";
import { getBouquet } from "@/lib/bouquets";

const searchSchema = z.object({
  bouquet: z.string().optional(),
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
  const { bouquet: slug } = Route.useSearch();
  const bouquet = slug ? getBouquet(slug) : undefined;
  const initialBouquet = bouquet?.name ?? "";

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

          <div className="mt-10 animate-fade-up delay-300">
            <OrderForm initialBouquet={initialBouquet} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
