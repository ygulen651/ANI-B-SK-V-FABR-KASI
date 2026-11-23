import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Arrow } from "@/components/Decor";
import { news } from "@/lib/data";
import { quality } from "@/data/site";

export const metadata: Metadata = {
  title: "Kalite ve Belgeler",
  description: "Anı Bisküvi kalite, gıda güvenliği (BRC), helal, hijyen, enerji, su verimliliği, çevre, İSG ve bilgi güvenliği politikaları.",
  alternates: { canonical: "/kalite" },
};

export default function QualityPage() {
  const certNews = news.filter((n) => /BRC|22000/i.test(n.title));
  return (
    <>
      <PageHero
        eyebrow="Üretim & kalite"
        title="Kalite Politikamız"
        crumbs={[{ href: "/kalite", label: "Kalite" }]}
        lead={<p>{quality.policy}</p>}
      />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Politikalar" className="rounded-[28px] bg-cream-50 p-5 ring-1 ring-choco-900/5">
              <p className="font-display text-lg font-extrabold">Politikalar</p>
              <ul className="mt-3 space-y-1">
                {quality.policies.map((p, i) => (
                  <li key={p.title}>
                    <a href={`#politika-${i}`} className="block rounded-xl px-3 py-2 font-semibold text-choco-800 hover:bg-cream-200">
                      {p.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#belgeler" className="block rounded-xl px-3 py-2 font-bold text-red-700 hover:bg-cream-200">
                    Belgeler hakkında
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
          <div className="space-y-5">
            <div className="relative aspect-[1024/645] overflow-hidden rounded-[36px]">
              <Image src="/assets/site/kalite.webp" alt="Laboratuvar ortamında test tüpleri (kaynak sitedeki kalite görseli)" fill sizes="(min-width: 1024px) 900px, 92vw" className="object-cover" />
            </div>
            {quality.policies.map((p, i) => (
              <section key={p.title} id={`politika-${i}`} className="reveal scroll-mt-28 rounded-[32px] bg-cream-50 p-7 ring-1 ring-choco-900/5 sm:p-9">
                <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{p.title}</h2>
                {p.lead && <p className="mt-3 text-lg leading-relaxed text-choco-800">{p.lead}</p>}
                {p.items.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3 text-choco-800">
                        <span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-red" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <p className="px-2 font-semibold text-choco-800">
              {quality.signature.name} · {quality.signature.role}
            </p>

            <section id="belgeler" className="scroll-mt-28 rounded-[36px] bg-[var(--c-gofret)] p-7 sm:p-9">
              <h2 className="font-display text-3xl font-extrabold">Belgeler hakkında</h2>
              <p className="mt-3 max-w-[64ch] text-lg">
                Kaynak sitenin “Sertifikalar” sayfası “Hazırlanıyor” durumundadır. Aşağıdaki belgeler kurumsal metinlerde ve haberlerde adı geçen
                belgelerdir; düzenlenme ve geçerlilik tarihleri kaynakta yer almadığı için güncel sertifikasyon durumu olarak sunulmamaktadır.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {quality.documentsMentioned.map((d) => (
                  <li key={d.name} className="rounded-[22px] bg-cream-50 p-5">
                    <p className="font-display text-lg font-extrabold">{d.name}</p>
                    <p className="mt-1 text-sm font-semibold text-choco-700">Geçtiği yer: {d.where}</p>
                  </li>
                ))}
              </ul>
              {certNews.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-3">
                  {certNews.map((n) => (
                    <li key={n.id}>
                      <Link href={`/medya/${n.slug}`} className="btn btn-dark !min-h-11 text-sm">
                        {n.title} <Arrow className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-6 font-semibold">
                Güncel belge kopyaları için <Link href="/iletisim?konu=kalite" className="underline underline-offset-4">bizimle iletişime geçin</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
