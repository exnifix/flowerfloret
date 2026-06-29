import type { ReactNode } from "react";

type InfoCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
};

/** Compact icon + label + value card linking to email / phone / social. */
export function InfoCard({ icon, label, value, href }: InfoCardProps) {
  const inner = (
    <>
      <div className="mx-auto size-9 rounded-full bg-blush-soft grid place-items-center text-rose mb-2">
        {icon}
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-ink/55">{label}</p>
      <p className="font-serif text-lg text-ink break-all">{value}</p>
    </>
  );

  if (!href) return <div className="rounded-2xl bg-cream-soft/60 p-5">{inner}</div>;

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="block rounded-2xl bg-cream-soft/60 p-5 hover:bg-blush-soft/60 transition-colors"
    >
      {inner}
    </a>
  );
}
