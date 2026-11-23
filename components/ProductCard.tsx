import { type Product, categoryTheme, getCategory, subcategoryName, weightLabel } from "@/lib/data";
import { ProductCardView, type CardData } from "./ProductCardView";

export function toCardData(p: Product): CardData {
  const t = categoryTheme[p.category];
  const img = p.images[0];
  return {
    slug: p.slug,
    name: p.name,
    description: p.description,
    categoryName: getCategory(p.category)?.name ?? p.category,
    subName: subcategoryName(p.category, p.subcategory),
    color: t.bg,
    soft: t.soft,
    weight: weightLabel(p),
    origin: p.origin,
    image: img ? { src: img.src, width: img.width, height: img.height, background: img.background } : null,
    code: p.code,
  };
}

export function ProductCard({ product, priority = false, headingLevel = "h3" }: { product: Product; priority?: boolean; headingLevel?: "h2" | "h3" }) {
  return <ProductCardView p={toCardData(product)} priority={priority} headingLevel={headingLevel} />;
}
