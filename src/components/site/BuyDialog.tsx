import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderForm } from "./forms/OrderForm";

type Props = {
  bouquetName?: string;
  trigger: ReactNode;
};

/** Modal that surfaces the full ordering + delivery form. Opens on demand from a "Buy Now" trigger. */
export function BuyDialog({ bouquetName, trigger }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-cream border-blush/40 sm:rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl text-ink">
            Complete your order
          </DialogTitle>
          <DialogDescription className="italic font-italic text-ink/60">
            {bouquetName ? `You're ordering ${bouquetName}. ` : ""}Delivery and payment details below.
          </DialogDescription>
        </DialogHeader>
        <OrderForm initialBouquet={bouquetName ?? ""} />
      </DialogContent>
    </Dialog>
  );
}
