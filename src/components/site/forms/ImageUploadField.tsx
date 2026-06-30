import { useRef } from "react";
import { Camera, X } from "lucide-react";
import { toast } from "sonner";
import { compressImage } from "@/lib/image-compress";

type Props = {
  label?: string;
  hint?: string;
  value: string | null;
  onChange: (dataUrl: string | null) => void;
};

/** Optional photo upload — compresses to a small JPEG data URL on the client. */
export function ImageUploadField({
  label = "Reference photo (optional)",
  hint = "Upload a design you'd like us to recreate.",
  value,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    try {
      const compressed = await compressImage(file);
      onChange(compressed);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't process image");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="text-xs uppercase tracking-[0.18em] text-ink/55">{label}</label>
      <p className="mt-1 text-xs text-ink/55 italic">{hint}</p>
      {value ? (
        <div className="mt-3 relative inline-block">
          <img
            src={value}
            alt="Upload preview"
            className="h-36 w-36 object-cover rounded-xl border border-border"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove photo"
            className="absolute -top-2 -right-2 size-7 grid place-items-center rounded-full bg-ink text-cream shadow-md hover:bg-rose transition-colors"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : (
        <label className="mt-3 flex items-center gap-2 cursor-pointer rounded-2xl border border-dashed border-rose/40 bg-cream/60 px-5 py-4 text-sm text-ink/70 hover:bg-blush-soft/40 hover:border-rose transition-colors w-fit">
          <Camera className="size-4 text-rose" />
          Add a photo
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </label>
      )}
    </div>
  );
}
