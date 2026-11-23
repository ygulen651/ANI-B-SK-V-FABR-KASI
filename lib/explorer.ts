import { categories, categoryTheme, products, type Product } from "./data";
import { toCardData } from "@/components/ProductCard";
import type { ExplorerCategory, ExplorerItem } from "@/components/ProductExplorer";
import { normalizeTr } from "./normalize";

export function explorerItems(list: Product[] = products): ExplorerItem[] {
  return [...list].sort((a, b) => a.name.localeCompare(b.name, "tr")).map((p) => {
    const card = toCardData(p);
    return {
      ...card,
      category: p.category,
      subcategory: p.subcategory,
      search: normalizeTr([p.name, p.description, p.descriptionEn, p.code, card.subName, card.categoryName].filter(Boolean).join(" ")),
    };
  });
}

export function explorerCategories(): ExplorerCategory[] {
  return categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    color: categoryTheme[c.slug].bg,
    count: c.productCount,
    subs: c.subcategories.filter((s) => s.productCount > 0).map((s) => ({ slug: s.slug, name: s.name, count: s.productCount })),
  }));
}
