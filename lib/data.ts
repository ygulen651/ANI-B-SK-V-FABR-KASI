import productsJson from "@/data/products.json";
import categoriesJson from "@/data/categories.json";
import newsJson from "@/data/news.json";

export type Variant = {
  code: string | null;
  weight: string | null;
  unitsPerBox: string | null;
  container40HC: string | null;
};

export type ProductImage = {
  src: string;
  width: number;
  height: number;
  origin: string;
  background: "white" | "transparent";
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  subcategory: string | null;
  description: string | null;
  descriptionEn: string | null;
  code: string | null;
  web: Variant | null;
  catalog: { page: number; variant: Variant }[];
  images: ProductImage[];
  sources: string[];
  origin: "web" | "katalog" | "web+katalog";
  sourceId: number | null;
  sourceSlug: string | null;
};

export type Subcategory = { slug: string; name: string; sourceUrl: string | null; productCount: number };
export type Category = {
  slug: string;
  name: string;
  sourceId: number | null;
  sourceUrl: string;
  productCount: number;
  subcategories: Subcategory[];
};

export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  sitePublishedAt: string;
  image: { src: string; width: number; height: number };
  body: string[];
  source: string;
};

export const products = productsJson as Product[];
export const categories = categoriesJson as Category[];
export const news = (newsJson as NewsItem[]).slice().sort((a, b) => b.id - a.id);

/** Kategori bazlı görsel kimlik (renkler globals.css içinde de tanımlı) */
export const categoryTheme: Record<
  string,
  { bg: string; ink: string; soft: string; tagline: string; heroSlugs: string[] }
> = {
  biskuvi: {
    bg: "var(--c-biskuvi)",
    ink: "var(--choco-900)",
    soft: "var(--c-biskuvi-soft)",
    tagline: "Kremalı, sandviç, marshmallow ve çay saatinin klasikleri",
    heroSlugs: ["big-prens-kakao-kremali-1358", "custard-creams-portakal-127-5", "zozo-cream-cilek-1344"],
  },
  cikolata: {
    bg: "var(--c-cikolata)",
    ink: "var(--cream-50)",
    soft: "var(--c-cikolata-soft)",
    tagline: "Nugalı barlar, kaplamalı çubuklar ve fındık kreması",
    heroSlugs: ["maxistar-2665-1", "tiviti-2136", "torje-2137"],
  },
  kek: {
    bg: "var(--c-kek)",
    ink: "var(--choco-900)",
    soft: "var(--c-kek-soft)",
    tagline: "Rulo kekler, donutlar ve kremalı dilimler",
    heroSlugs: ["brawo-donut-cake-2029", "swiss-roll-cilek-kremali-sutlu-kakao-kaplamali-3112", "ani-infinity-dubai-2039"],
  },
  gofret: {
    bg: "var(--c-gofret)",
    ink: "var(--choco-900)",
    soft: "var(--c-gofret-soft)",
    tagline: "Çıtır katlar, bol krema",
    heroSlugs: ["gofron-xxl-492", "frolle-x2-4990", "ani-wafers-cilek-4144"],
  },
  kraker: {
    bg: "var(--c-kraker)",
    ink: "var(--choco-900)",
    soft: "var(--c-kraker-soft)",
    tagline: "Tuzlu, susamlı, peynirli; çubuk ve fiyonk",
    heroSlugs: ["cubuk-kraker-1147", "crack-paprika-1157", "ani-tuzlu-kraker-1153"],
  },
  sekerleme: {
    bg: "var(--c-sekerleme)",
    ink: "var(--cream-50)",
    soft: "var(--c-sekerleme-soft)",
    tagline: "Meyve dolgulu yumuşak şekerler ve karamelli lezzetler",
    heroSlugs: ["mascot-6101-1", "jolly-2875", "caramellim-2760"],
  },
  makarna: {
    bg: "var(--c-makarna)",
    ink: "var(--cream-50)",
    soft: "var(--c-makarna-soft)",
    tagline: "2023'te üretime başlayan tesisten spagetti ve makarna",
    heroSlugs: ["ani-spagetti-7000", "fellini-spagetti-7501", "nour-spagetti-7003"],
  },
};

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function subcategoryName(cat: string, sub: string | null) {
  if (!sub) return null;
  return getCategory(cat)?.subcategories.find((s) => s.slug === sub)?.name ?? null;
}

export function productsBySlugs(slugs: string[]) {
  return slugs.map((s) => getProduct(s)).filter((p): p is Product => Boolean(p));
}

/** Aynı ürün ailesine ait diğer kayıtlar (aynı ad + aynı kategori) */
export function siblings(p: Product) {
  const base = familyKey(p.name);
  return products.filter((o) => o.slug !== p.slug && o.category === p.category && familyKey(o.name) === base);
}

export function related(p: Product, limit = 8) {
  const sib = new Set(siblings(p).map((s) => s.slug));
  const pool = products.filter(
    (o) => o.slug !== p.slug && !sib.has(o.slug) && o.category === p.category && o.images.length > 0,
  );
  const sameSub = pool.filter((o) => o.subcategory === p.subcategory);
  const rest = pool.filter((o) => o.subcategory !== p.subcategory);
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const o of [...sameSub, ...rest]) {
    const k = familyKey(o.name);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(o);
    if (out.length >= limit) break;
  }
  return out;
}

export function familyKey(name: string) {
  return name
    .toLocaleLowerCase("tr")
    .replace(/\(.*?\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Ürün kartlarında gösterilecek kısa gramaj bilgisi */
export function weightLabel(p: Product) {
  if (p.web?.weight) return p.web.weight.replace(/(\d)g\b/g, "$1 g");
  const ws = Array.from(new Set(p.catalog.map((c) => c.variant.weight).filter(Boolean))) as string[];
  return ws.length ? ws.join(" · ").replace(/\bgr\b/g, "g") : null;
}

/** Site ile katalog ağırlık bilgileri gerçekten farklı mı? (yalnızca aralık yazımı farkı sayılmaz) */
export function weightsDiffer(p: Product) {
  if (!p.web || p.catalog.length === 0) return false;
  const nums = (s: string | null) =>
    (s ?? "").toLowerCase().replace(/gr|g|\s/g, "").replace(/,/g, ".").split(/[-–]/).filter(Boolean);
  const cat = new Set(p.catalog.flatMap((c) => nums(c.variant.weight)));
  return !nums(p.web.weight).every((w) => cat.has(w));
}

export function getNews(slug: string) {
  return news.find((n) => n.slug === slug);
}

export function formatTrDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export const productStats = {
  total: products.length,
  web: products.filter((p) => p.origin !== "katalog").length,
  catalogOnly: products.filter((p) => p.origin === "katalog").length,
};
