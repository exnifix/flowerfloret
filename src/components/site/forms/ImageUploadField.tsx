import { useRef } from "react";
import { Camera, X } from "lucide-react";
import { toast } from "sonner";
import { compressImage } from "@/lib/image-compress";

type Props = {
  label?: string;
  hint?: string;
  /** Single-image (legacy) API. */
  value?: string | null;
  onChange?: (dataUrl: string | null) => void;
  /** Multi-image API. When provided, the field becomes a gallery. */
  values?: string[];
  onValuesChange?: (next: string[]) => void;
  /** Max photos allowed in gallery mode. Defaults to 5. */
  max?: number;
};

/**
 * Optional photo upload. Supports both single-image (legacy) and multi-image
 * gallery modes. When `values` / `onValuesChange` are provided, users can
 * attach multiple reference photos.
 */
export function ImageUploadField({
  label = "Reference photos (optional)",
  hint = "Upload designs you'd like us to recreate.",
  value,
  onChange,
  values,
  onValuesChange,
  max = 5,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isMulti = Array.isArray(values) && typeof onValuesChange === "function";

  const list = isMulti ? values! : value ? [value] : [];
  const remaining = isMulti ? Math.max(0, max - list.length) : list.length === 0 ? 1 : 0;

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    try {
      if (isMulti) {
        const slots = Math.max(0, max - list.length);
        if (slots === 0) {
          toast.error(`You can attach up to ${max} photos.`);
          return;
        }
        const accepted = files.slice(0, slots);
        if (files.length > slots) {
          toast.message(`Only the first ${slots} photo${slots === 1 ? "" : "s"} were added (max ${max}).`);
        }
        const compressed: string[] = [];
        for (const f of accepted) {
          if (!f.type.startsWith("image/")) continue;
          try {
            compressed.push(await compressImage(f));
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Couldn't process one of the images");
          }
        }
        if (compressed.length) onValuesChange!([...list, ...compressed]);
      } else {
        const f = files[0];
        if (!f.type.startsWith("image/")) {
          toast.error("Please choose an image file.");
          return;
        }
        const c = await compressImage(f);
        onChange?.(c);
      }
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(idx: number) {
    if (isMulti) {
      onValuesChange!(list.filter((_, i) => i !== idx));
    } else {
      onChange?.(null);
    }
  }

  return (
    <div>
      <label className="text-xs uppercase tracking-[0.18em] text-ink/55">{label}</label>
      <p className="mt-1 text-xs text-ink/55 italic">
        {hint}
        {isMulti ? ` Up to ${max} photos.` : ""}
      </p>

      {list.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {list.map((src, i) => (
            <div key={i} className="relative">
              <img
                src={src}
                alt={`Upload preview ${i + 1}`}
                className="h-28 w-28 object-cover rounded-xl border border-border"
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="Remove photo"
                className="absolute -top-2 -right-2 size-7 grid place-items-center rounded-full bg-ink text-cream shadow-md hover:bg-rose transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {remaining > 0 && (
        <label className="mt-3 inline-flex items-center gap-2 cursor-pointer rounded-2xl border border-dashed border-rose/40 bg-cream/60 px-5 py-4 text-sm text-ink/70 hover:bg-blush-soft/40 hover:border-rose transition-colors w-fit">
          <Camera className="size-4 text-rose" />
          {list.length === 0 ? "Add a photo" : "Add another"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={isMulti}
            className="hidden"
            onChange={handleFiles}
          />
        </label>
      )}
    </div>
  );
}
