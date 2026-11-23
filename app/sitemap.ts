import type { MetadataRoute } from "next";
import { categories, news, products } from "@/lib/data";
import { corporatePages } from "@/data/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anibiskuvi.com.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/urunler", "/kurumsal", "/kalite", "/ihracat", "/medya", "/iletisim", "/kariyer"];
  return [
    ...staticPaths.map((p) => ({ url: SITE_URL + p, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...categories.map((c) => ({ url: `${SITE_URL}/urunler/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...corporatePages.map((c) => ({ url: `${SITE_URL}/kurumsal/${c.slug}`, priority: 0.5 })),
    ...products.map((p) => ({ url: `${SITE_URL}/urun/${p.slug}`, priority: 0.6 })),
    ...news.map((n) => ({ url: `${SITE_URL}/medya/${n.slug}`, priority: 0.3 })),
  ];
}
