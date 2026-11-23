import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProductExplorer } from "@/components/ProductExplorer";
import { explorerCategories, explorerItems } from "@/lib/explorer";
import { productStats } from "@/lib/data";
import { catalog } from "@/data/site";

export const metadata: Metadata = {
  title: "Ürünler",
  description: `Anı Bisküvi'nin bisküvi, çikolata, kek, gofret, kraker, şekerleme ve makarna gruplarındaki ${productStats.total} ürünü; ad, açıklama veya ürün koduyla arayın.`,
  alternates: { canonical: "/urunler" },
};

export default function ProductsPage() {
  const items = explorerItems();
  const cats = explorerCategories();
  return (
    <>
      <PageHero
        eyebrow="Ürünler"
        title="Bütün lezzetler, tek rafta"
        crumbs={[{ href: "/urunler", label: "Ürünler" }]}
        lead={
          <p>
            Kaynak sitedeki {productStats.web} ürün kaydı ile {catalog.year} kataloğunda yer alıp sitede bulunmayan {productStats.catalogOnly} ürün,
            ürün kodlarıyla eşleştirilerek tek listede toplandı. Kategoriye göre süzün ya da arayın.
          </p>
        }
      />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <ProductExplorer items={items} categories={cats} />
      </div>
    </>
  );
}
