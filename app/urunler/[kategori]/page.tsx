import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { ProductExplorer } from "@/components/ProductExplorer";
import { explorerCategories, explorerItems } from "@/lib/explorer";
import { categories, categoryTheme, getCategory, productsByCategory, productsBySlugs } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((c) => ({ kategori: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ kategori: string }> }): Promise<Metadata> {
  const { kategori } = await params;
  const c = getCategory(kategori);
  if (!c) return {};
  return {
    title: `${c.name} Ürünleri`,
    description: `Anı Bisküvi ${c.name.toLocaleLowerCase("tr")} ürünleri: ${categoryTheme[c.slug].tagline}. ${c.productCount} ürün.`,
    alternates: { canonical: `/urunler/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ kategori: string }> }) {
  const { kategori } = await params;
  const c = getCategory(kategori);
  if (!c) notFound();
  const t = categoryTheme[c.slug];
  const items = explorerItems(productsByCategory(c.slug));
  const cats = explorerCategories();
  const packs = productsBySlugs(t.heroSlugs);
  const dark = t.ink !== "var(--choco-900)";

  return (
    <>
      <PageHero
        eyebrow={`${c.productCount} ürün`}
        title={c.name}
        bg={t.bg}
        ink={t.ink}
        crumbs={[
          { href: "/urunler", label: "Ürünler" },
          { href: `/urunler/${c.slug}`, label: c.name },
        ]}
        lead={
          <>
            <p className="text-xl font-semibold">{t.tagline}.</p>
            {c.slug === "makarna" && (
              <p className="mt-3 text-base">
                Makarna grubu kaynak sitede yer almıyor; ürünler 2026 ürün kataloğundan (s.5–6) aktarıldı.
              </p>
            )}
          </>
        }
      >
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-4 hidden h-[78%] w-[44%] md:block lg:right-10">
          {packs.map((p, k) => {
            const img = p.images[0];
            if (!img) return null;
            return (
              <div
                key={p.slug}
                className="float absolute bottom-[6%]"
                style={{
                  left: `${k * 30}%`,
                  width: "42%",
                  zIndex: k === 1 ? 3 : 1,
                  ["--r" as string]: `${[-10, 3, 12][k]}deg`,
                  ["--dur" as string]: `${6 + k}s`,
                  ["--fd" as string]: `${-k}s`,
                }}
              >
                <Image
                  src={img.src}
                  alt=""
                  width={img.width}
                  height={img.height}
                  priority
                  sizes="260px"
                  className={`h-auto max-h-[300px] w-full object-contain ${img.background === "white" ? (dark ? "rounded-3xl" : "pack-white") : "drop-shadow-[0_20px_18px_rgba(0,0,0,.35)]"}`}
                />
              </div>
            );
          })}
        </div>
      </PageHero>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <ProductExplorer items={items} categories={cats} fixedCategory={c.slug} />
      </div>
    </>
  );
}
