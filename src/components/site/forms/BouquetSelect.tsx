import { bouquets } from "@/lib/bouquets";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

/** Dropdown of every catalogue bouquet plus a custom option. */
export function BouquetSelect({ value, onChange }: Props) {
  return (
    <div>
      <label htmlFor="bouquet-select" className="text-xs uppercase tracking-[0.18em] text-ink/55">
        Which bouquet?
      </label>
      <select
        id="bouquet-select"
        name="bouquet"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-full bg-cream/60 border border-border px-5 py-3.5 text-sm focus:outline-none focus:border-rose focus:bg-cream transition-colors appearance-none cursor-pointer"
      >
        <option value="">— Not sure yet / surprise me —</option>
        {bouquets.map((b) => (
          <option key={b.slug} value={b.name}>
            {b.name} — ৳{b.price.toLocaleString("en-BD")}
          </option>
        ))}
        <option value="Custom / Build your own">Custom / Build your own</option>
      </select>
    </div>
  );
}
