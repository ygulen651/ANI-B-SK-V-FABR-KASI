import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/PageHero";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { Arrow, Wave } from "@/components/Decor";
import { AniLogo } from "@/components/AniLogo";
import {
  categoryTheme,
  getCategory,
  getProduct,
  products,
  related,
  siblings,
  subcategoryName,
  weightLabel,
  weightsDiffer,
  type Variant,
} from "@/lib/data";
import { catalog } from "@/data/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anibiskuvi.com.tr";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const cat = getCategory(p.category);
  const w = weightLabel(p);
  return {
    title: `${p.name}${w ? ` ${w}` : ""} – ${cat?.name}`,
    description: [p.description, `${cat?.name} kategorisinde Anı Bisküvi ürünü.`, p.code ? `Ürün kodu ${p.code}.` : ""].filter(Boolean).join(" "),
    alternates: { canonical: `/urun/${p.slug}` },
    openGraph: p.images[0] ? { images: [{ url: p.images[0].src, width: p.images[0].width, height: p.images[0].height }] } : undefined,
  };
}

function SpecTable({ caption, columns, source }: { caption: string; columns: Variant[]; source: React.ReactNode }) {
  const rows: [keyof Variant, string][] = [
    ["code", "Ürün kodu"],
    ["weight", "Ağırlık"],
    ["unitsPerBox", "Koli içi adet"],
    ["container40HC", "40' HC konteyner"],
  ];
  return (
    <div className="overflow-hidden rounded-[28px] bg-cream-50 ring-1 ring-choco-900/5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left">
          <caption className="px-5 pb-2 pt-5 text-left">
            <span className="font-display block text-lg font-extrabold text-choco-900">{caption}</span>
            <span className="mt-0.5 block text-sm font-semibold text-choco-700">{source}</span>
          </caption>
          <tbody>
            {rows.map(([k, label]) => (
              <tr key={k} className="border-t border-choco-900/8">
                <th scope="row" className="whitespace-nowrap bg-cream-200/60 px-5 py-3 text-sm font-bold text-choco-800">
                  {label}
                </th>
                {columns.map((c, i) => (
                  <td key={i} className="px-5 py-3 font-bold tabular-nums text-choco-900">
                    {c[k] ?? <span className="font-semibold text-choco-500">belirtilmemiş</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const t = categoryTheme[p.category];
  const sub = subcategoryName(p.category, p.subcategory);
  const sibs = siblings(p);
  const rel = related(p, 8);
  const catPages = Array.from(new Set(p.catalog.map((c) => c.page)));
  const differs = weightsDiffer(p);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description ?? undefined,
    image: p.images.map((i) => SITE_URL + i.src),
    brand: { "@type": "Brand", name: "Anı" },
    manufacturer: { "@type": "Organization", name: "Anı Bisküvi Gıda Sanayi ve Ticaret A.Ş." },
    category: [cat.name, sub].filter(Boolean).join(" > "),
    sku: p.code ?? undefined,
    weight: weightLabel(p) ?? undefined,
    url: `${SITE_URL}/urun/${p.slug}`,
  };

  return (
    <>
      <article>
        <div className="relative -mt-20 overflow-hidden pt-20 lg:-mt-24 lg:pt-24" style={{ background: t.soft }}>
          <div className="mx-auto max-w-[1400px] px-4 pb-12 pt-8 sm:px-6 lg:px-10">
            <Breadcrumbs
              items={[
                { href: "/urunler", label: "Ürünler" },
                { href: `/urunler/${cat.slug}`, label: cat.name },
                { href: `/urun/${p.slug}`, label: p.name },
              ]}
            />
            <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
              <div className="lg:sticky lg:top-24">
                {p.images.length > 0 ? (
                  <ProductGallery images={p.images} name={p.name} soft="var(--cream-50)" color={t.bg} />
                ) : (
                  <div className="flex aspect-square flex-col items-center justify-center gap-4 rounded-[44px] bg-cream-50 p-10 text-center">
                    <AniLogo className="h-20 w-auto" />
                    <p className="max-w-[34ch] font-semibold text-choco-700">
                      Bu ürünün ambalajı katalogda yalnızca bir tanıtım sayfası görselinin parçası olarak yer alıyor; ayrı ve temiz bir ambalaj
                      görseli bulunmadığı için gösterilmiyor.
                    </p>
                    <a href={`${catalog.href}#page=${catPages[0]}`} target="_blank" rel="noopener" className="btn btn-dark">
                      Katalogda gör (s.{catPages[0]})
                    </a>
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/urunler/${cat.slug}`}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold ${t.ink === "var(--choco-900)" ? "" : "on-dark"}`}
                    style={{ background: t.bg, color: t.ink }}
                  >
                    {cat.name}
                  </Link>
                  {sub && sub !== cat.name && (
                    <Link
                      href={`/urunler/${cat.slug}?alt=${p.subcategory}`}
                      className="rounded-full bg-cream-50 px-4 py-2 text-sm font-bold text-choco-900 ring-1 ring-choco-900/10"
                    >
                      {sub}
                    </Link>
                  )}
                  {p.origin === "katalog" && (
                    <span className="rounded-full bg-choco-900 px-4 py-2 text-sm font-bold text-cream-50">{catalog.year} kataloğundan</span>
                  )}
                </div>
                <h1 className="intro font-display mt-5 text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold leading-[0.92] text-balance">{p.name}</h1>
                {p.description && (
                  <p className="intro mt-5 text-xl font-semibold leading-snug text-choco-800" style={{ ["--d" as string]: "100ms" }}>
                    {p.description}
                  </p>
                )}
                {p.descriptionEn && (
                  <p className="mt-2 text-base text-choco-700">
                    <span className="font-bold">Katalogdaki İngilizce tanım:</span> <span lang="en">{p.descriptionEn}</span>
                  </p>
                )}

                <div className="mt-8 space-y-5">
                  {p.web && (
                    <SpecTable
                      caption="Ürün bilgileri"
                      columns={[p.web]}
                      source={
                        <>
                          Kaynak:{" "}
                          <a href={p.sources[0]} className="underline underline-offset-2" target="_blank" rel="noopener">
                            anibiskuvi.com.tr ürün sayfası
                          </a>
                        </>
                      }
                    />
                  )}
                  {p.catalog.length > 0 && (
                    <SpecTable
                      caption={`${catalog.year} ürün kataloğu${p.catalog.length > 1 ? " · varyantlar" : ""}`}
                      columns={p.catalog.map((c) => c.variant)}
                      source={
                        <>
                          Kaynak:{" "}
                          <a href={`${catalog.href}#page=${catPages[0]}`} className="underline underline-offset-2" target="_blank" rel="noopener">
                            E-Katalog, s.{catPages.join(", ")}
                          </a>
                        </>
                      }
                    />
                  )}
                  {differs && (
                    <p className="rounded-2xl bg-[var(--c-gofret-soft)] px-5 py-4 text-sm font-semibold text-choco-900">
                      Bu ürünün ağırlık bilgisi web sitesi ile {catalog.year} kataloğunda farklı görünüyor. Güncel bilgi için lütfen bizimle iletişime geçin.
                    </p>
                  )}
                </div>

                {sibs.length > 0 && (
                  <div className="mt-8">
                    <h2 className="font-display text-2xl font-extrabold">Diğer varyantlar</h2>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {sibs.slice(0, 24).map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/urun/${s.slug}`}
                            className="inline-flex flex-col rounded-2xl bg-cream-50 px-4 py-2.5 ring-1 ring-choco-900/10 transition-transform hover:-translate-y-0.5"
                          >
                            <span className="text-sm font-extrabold text-choco-900">{weightLabel(s) ?? s.code}</span>
                            {s.description && <span className="max-w-[28ch] truncate text-xs font-semibold text-choco-700">{s.description}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-10 flex flex-wrap gap-3">
                  <Link href={`/iletisim?konu=urun&urun=${encodeURIComponent(p.name + (p.code ? ` (${p.code})` : ""))}`} className="btn btn-primary">
                    Bu ürün için bilgi alın <Arrow />
                  </Link>
                  <a href={catalog.href} target="_blank" rel="noopener" className="btn btn-ghost">
                    E-Katalog (PDF)
                  </a>
                </div>
                <p className="mt-6 text-sm text-choco-700">
                  Besin değeri ve alerjen bilgileri kaynaklarda yer almadığı için bu sayfada gösterilmemektedir; lütfen ürün ambalajındaki bilgileri esas alın.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Wave color={t.soft} flip />
      </article>

      {rel.length > 0 && (
        <section aria-labelledby="ilgili-baslik" className="mx-auto max-w-[1400px] px-4 pt-12 sm:px-6 lg:px-10">
          <h2 id="ilgili-baslik" className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold">
            Bunları da sevebilirsiniz
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {rel.map((r) => (
              <li key={r.slug} className="reveal">
                <ProductCard product={r} />
              </li>
            ))}
          </ul>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
