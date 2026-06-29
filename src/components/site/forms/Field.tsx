import type { InputHTMLAttributes } from "react";

type FieldProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

/** Labeled pill-shaped text input used across order/contact forms. */
export function Field({ label, name, ...rest }: FieldProps) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-[0.18em] text-ink/55">
        {label}
      </label>
      <input
        id={id}
        name={name}
        {...rest}
        className="mt-2 w-full rounded-full bg-cream/60 border border-border px-5 py-3.5 text-sm focus:outline-none focus:border-rose focus:bg-cream transition-colors"
      />
    </div>
  );
}
