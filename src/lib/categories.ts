import type { Bouquet } from "@/lib/bouquets";

export const CATEGORIES = ["Wedding", "Birthday", "Anniversaries", "Cake", "Cake and Flower"] as const;
export type CategorySlug = "wedding" | "birthday" | "anniversaries" | "cake" | "cake-and-flower";

export const CATEGORY_BY_SLUG: Record<CategorySlug, (typeof CATEGORIES)[number]> = {
  wedding: "Wedding",
  birthday: "Birthday",
  anniversaries: "Anniversaries",
  cake: "Cake",
  "cake-and-flower": "Cake and Flower",
};

export const SLUG_BY_CATEGORY: Record<(typeof CATEGORIES)[number], CategorySlug> = {
  Wedding: "wedding",
  Birthday: "birthday",
  Anniversaries: "anniversaries",
  Cake: "cake",
  "Cake and Flower": "cake-and-flower",
};

/** Returns the category labels a bouquet belongs to. */
export function bouquetCategories(b: Bouquet): (typeof CATEGORIES)[number][] {
  if (b.category === "Cake & Flower Combo") return ["Cake", "Cake and Flower"];
  // Regular bouquets fit weddings, birthdays, and anniversaries.
  return ["Wedding", "Birthday", "Anniversaries"];
}

export function filterByCategorySlug(list: Bouquet[], slug: CategorySlug | undefined): Bouquet[] {
  if (!slug) return list;
  const label = CATEGORY_BY_SLUG[slug];
  if (!label) return list;
  return list.filter((b) => bouquetCategories(b).includes(label));
}
