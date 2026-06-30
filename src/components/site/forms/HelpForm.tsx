import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Field } from "./Field";
import { ImageUploadField } from "./ImageUploadField";
import { notifyNewOrder } from "@/lib/notify-order.functions";

type Status = "idle" | "sending" | "sent" | "error";

/** Lightweight help / inquiry form — no buying, no delivery. */
export function HelpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setErrorMsg("");
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const instagram = String(fd.get("instagram") || "").trim().replace(/^@/, "");
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMsg("Please share your name, email, and how we can help.");
      return;
    }

    try {
      await notifyNewOrder({
        data: {
          name,
          email,
          instagram: instagram || null,
          message: `[HELP REQUEST] ${message}`,
          bouquet: null,
          payment_method: "Help / Inquiry",
          image_urls: imageUrls,
        },
      });
      form.reset();
      setImageUrls([]);
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again, or reach us on Instagram @floret.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border/60 rounded-3xl p-6 md:p-10 space-y-5 shadow-[0_20px_60px_-30px_rgba(180,120,120,0.2)]"
    >
      <Field label="Your Name" name="name" placeholder="How shall we greet you?" required />
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
        <Field label="Instagram (optional)" name="instagram" placeholder="@yourhandle" />
      </div>

      <div>
        <label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-ink/55">
          What do you need help for?
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Ask us anything — flower suggestions, custom requests, event florals, care tips…"
          className="mt-2 w-full rounded-2xl bg-cream/60 border border-border px-5 py-4 text-sm focus:outline-none focus:border-rose focus:bg-cream transition-colors resize-none"
        />
      </div>

      <ImageUploadField
        label="Reference photo (optional)"
        hint="Share a flower design or inspiration you'd love us to recreate."
        value={imageUrl}
        onChange={setImageUrl}
      />


      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-8 py-4 text-sm tracking-wide hover:bg-rose transition-colors disabled:opacity-60"
      >
        {status === "sending" ? (
          <><Loader2 className="size-4 animate-spin" /> Sending…</>
        ) : (
          <><Send className="size-4" /> Send Message</>
        )}
      </button>

      {status === "sent" && (
        <p className="text-center text-sm text-rose italic animate-fade-up">
          Thank you — we'll get back to you within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-red-600 animate-fade-up">{errorMsg}</p>
      )}
      <p className="text-center text-xs text-ink/55">
        Looking to place an order? Browse the{" "}
        <a href="/collection" className="text-rose underline">collection</a> and tap <em>Buy Now</em>.
      </p>
    </form>
  );
}
