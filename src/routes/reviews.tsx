import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, Star, X } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Floret" },
      {
        name: "description",
        content:
          "Read what our customers say about Floret bouquets, and share your own star rating, photo and comment.",
      },
    ],
  }),
  component: ReviewsPage,
});

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string | null;
  image_url: string | null;
  bouquet_slug: string | null;
  created_at: string;
};

const MAX_IMAGE_BYTES = 600_000; // ~600 KB after base64 encoding

async function compressImage(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = dataUrl;
  });

  const maxDim = 1280;
  let { width, height } = img;
  if (width > maxDim || height > maxDim) {
    const ratio = Math.min(maxDim / width, maxDim / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, width, height);

  for (const quality of [0.8, 0.65, 0.5, 0.4, 0.3]) {
    const out = canvas.toDataURL("image/jpeg", quality);
    if (out.length <= MAX_IMAGE_BYTES) return out;
  }
  throw new Error("Image too large — please choose a smaller photo.");
}

function StarRow({
  value,
  onChange,
  size = 24,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
}) {
  const [hover, setHover] = useState(0);
  const interactive = !!onChange;
  return (
    <div className="flex items-center gap-1" role={interactive ? "radiogroup" : undefined} aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = (hover || value) >= n;
        return (
          <button
            key={n}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(n)}
            onMouseEnter={() => interactive && setHover(n)}
            onMouseLeave={() => interactive && setHover(0)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            aria-checked={value === n}
            role={interactive ? "radio" : undefined}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
          >
            <Star
              style={{ width: size, height: size }}
              className={active ? "fill-rose text-rose" : "text-ink/25"}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}

function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (!active) return;
      if (error) toast.error("Couldn't load reviews");
      else setReviews((data as Review[]) ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => {
    if (!reviews.length) return { avg: 0, total: 0, breakdown: [0, 0, 0, 0, 0] };
    const breakdown = [0, 0, 0, 0, 0];
    let sum = 0;
    reviews.forEach((r) => {
      breakdown[r.rating - 1] += 1;
      sum += r.rating;
    });
    return { avg: sum / reviews.length, total: reviews.length, breakdown };
  }, [reviews]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    try {
      const compressed = await compressImage(file);
      setImageUrl(compressed);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't process image");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!name.trim()) return toast.error("Please add your name.");
    if (rating < 1) return toast.error("Please pick a star rating.");
    setSubmitting(true);
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        name: name.trim().slice(0, 120),
        rating,
        comment: comment.trim() ? comment.trim().slice(0, 2000) : null,
        image_url: imageUrl,
      })
      .select()
      .single();
    setSubmitting(false);
    if (error) {
      toast.error("Couldn't post review");
      return;
    }
    toast.success("Thank you for your review!");
    setReviews((prev) => [data as Review, ...prev]);
    setName("");
    setRating(0);
    setComment("");
    setImageUrl(null);
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="text-center mb-12 animate-fade-up">
            <span className="text-xs uppercase tracking-[0.22em] text-rose">Reviews</span>
            <h1 className="mt-4 font-serif text-5xl md:text-6xl text-ink">Loved by our customers</h1>
            <p className="mt-3 italic text-ink/60">Honest words from those who've held our blooms.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Summary + form */}
            <aside className="lg:col-span-1 space-y-8">
              <div className="rounded-2xl bg-cream-soft/70 p-6 border border-border/60">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl text-ink">{stats.avg.toFixed(1)}</span>
                  <span className="text-ink/60">/ 5</span>
                </div>
                <div className="mt-2">
                  <StarRow value={Math.round(stats.avg)} size={20} />
                </div>
                <p className="mt-2 text-sm text-ink/60">
                  Based on {stats.total} review{stats.total === 1 ? "" : "s"}
                </p>

                <div className="mt-5 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = stats.breakdown[star - 1];
                    const pct = stats.total ? (count / stats.total) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs text-ink/70">
                        <span className="w-3">{star}</span>
                        <Star className="size-3 fill-rose text-rose" strokeWidth={1.5} />
                        <div className="flex-1 h-1.5 rounded-full bg-blush-soft overflow-hidden">
                          <div
                            className="h-full bg-rose transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6 text-right tabular-nums">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={submit} className="rounded-2xl bg-white p-6 border border-border/60 space-y-4">
                <h2 className="font-serif text-2xl">Leave a review</h2>

                <div>
                  <label className="text-xs uppercase tracking-wider text-ink/60">Your rating</label>
                  <div className="mt-2">
                    <StarRow value={rating} onChange={setRating} />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-ink/60">Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    maxLength={120}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-ink/60">Comment</label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your bouquet…"
                    maxLength={2000}
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-ink/60">Photo (optional)</label>
                  {imageUrl ? (
                    <div className="mt-2 relative inline-block">
                      <img
                        src={imageUrl}
                        alt="Review preview"
                        className="h-32 w-32 object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => setImageUrl(null)}
                        aria-label="Remove photo"
                        className="absolute -top-2 -right-2 size-6 grid place-items-center rounded-full bg-ink text-cream"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="mt-2 flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-border px-4 py-3 text-sm text-ink/70 hover:bg-cream-soft transition-colors w-fit">
                      <Camera className="size-4" />
                      Add a photo
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFile}
                      />
                    </label>
                  )}
                </div>

                <Button type="submit" disabled={submitting} className="w-full bg-rose hover:bg-rose/90 text-cream">
                  {submitting ? "Posting…" : "Post review"}
                </Button>
              </form>
            </aside>

            {/* List */}
            <div className="lg:col-span-2 space-y-5">
              {loading ? (
                <p className="text-ink/60">Loading reviews…</p>
              ) : reviews.length === 0 ? (
                <div className="rounded-2xl bg-cream-soft/60 p-10 text-center text-ink/60">
                  Be the first to share how Floret made you feel.
                </div>
              ) : (
                reviews.map((r) => (
                  <article
                    key={r.id}
                    className="rounded-2xl bg-white border border-border/60 p-6 animate-fade-up"
                  >
                    <header className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-serif text-lg text-ink">{r.name}</p>
                        <div className="mt-1">
                          <StarRow value={r.rating} size={16} />
                        </div>
                      </div>
                      <time className="text-xs text-ink/50">
                        {new Date(r.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </header>
                    {r.comment && (
                      <p className="mt-4 text-ink/80 whitespace-pre-wrap leading-relaxed">{r.comment}</p>
                    )}
                    {r.image_url && (
                      <a href={r.image_url} target="_blank" rel="noreferrer" className="mt-4 block w-fit">
                        <img
                          src={r.image_url}
                          alt={`Photo from ${r.name}'s review`}
                          loading="lazy"
                          className="max-h-72 rounded-xl border border-border object-cover"
                        />
                      </a>
                    )}
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
