import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ExportMap } from "@/components/ExportMap";
import { Arrow } from "@/components/Decor";
import { exportContent, SOURCE } from "@/data/site";

export const metadata: Metadata = {
  title: "İhracat",
  description: "Anı Bisküvi ihracat yaklaşımı ve kaynak sitede listelenen ihracat ülkeleri. İş ortaklığı için bizimle iletişime geçin.",
  alternates: { canonical: "/ihracat" },
};

export default function ExportPage() {
  const sorted = [...exportContent.countries].sort((a, b) => a[0].localeCompare(b[0], "tr"));
  return (
    <>
      <PageHero
        eyebrow="İhracat"
        title="Dünyanın dört bir yanına Anı lezzeti"
        crumbs={[{ href: "/ihracat", label: "İhracat" }]}
        lead={<p>{exportContent.paragraphs[0]}</p>}
      />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="reveal rounded-[40px] bg-cream-50 p-4 ring-1 ring-choco-900/5 sm:p-8">
          <ExportMap />
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 px-2 text-sm font-semibold text-choco-800">
            <span className="flex items-center gap-2"><span aria-hidden className="h-3 w-3 rounded-full bg-red" />Kaynakta listelenen ülke ({exportContent.countries.length})</span>
            <span className="flex items-center gap-2"><span aria-hidden className="h-3 w-3 rounded-full bg-choco-900" />Türkiye · Karaman</span>
          </div>
          <p className="mt-3 px-2 text-sm text-choco-700">{exportContent.countriesNote}</p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="prose-ani text-lg text-choco-800">
            {exportContent.paragraphs.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h2 className="font-display !mb-4 !mt-10 text-3xl font-extrabold text-choco-900">Kaynakta yer alan başarılar</h2>
            {exportContent.recognition.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-sm text-choco-700">Bu sıralamalar kaynakta belirtilen yıllara aittir; güncel sıralama olarak sunulmamaktadır.</p>
          </div>
          <section aria-labelledby="ulke-listesi">
            <h2 id="ulke-listesi" className="font-display text-3xl font-extrabold">
              Listelenen ülkeler
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {sorted.map(([tr]) => (
                <li key={tr} className="rounded-full bg-cream-50 px-3.5 py-1.5 text-sm font-bold text-choco-900 ring-1 ring-choco-900/10">
                  {tr}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-choco-700">
              Kaynak:{" "}
              <a href={`${SOURCE}/ihracat`} target="_blank" rel="noopener" className="font-bold underline underline-offset-4">
                anibiskuvi.com.tr/ihracat
              </a>
            </p>
          </section>
        </div>

        <section className="on-dark reveal mt-20 overflow-hidden rounded-[44px] bg-red-600 p-8 text-cream-50 sm:p-14">
          <h2 className="font-display max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[0.95]">Ülkenizde Anı&apos;nın iş ortağı olun</h2>
          <p className="mt-4 max-w-[54ch] text-lg text-cream-100">
            Distribütörlük, ithalat ve özel talepleriniz için ihracat ekibimize ulaşın. Ürün kodları ve konteyner bilgileri E-Katalog&apos;da yer alır.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/iletisim?konu=ihracat" className="btn btn-cream">
              İletişime geçin <Arrow />
            </Link>
            <Link href="/urunler" className="btn bg-black/20 text-cream-50 ring-2 ring-cream-50/60">
              Ürünleri inceleyin
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
