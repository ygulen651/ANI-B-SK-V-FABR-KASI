import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Arrow, CookieBadge } from "@/components/Decor";
import { categoryTheme } from "@/lib/data";
import { chairmanMessage, corporatePages, history } from "@/data/site";

export const metadata: Metadata = {
  title: "Anı'yı Tanıyın",
  description: "Anı Bisküvi'nin Karaman'dan başlayan hikâyesi, misyonu, vizyonu, sosyal sorumluluk çalışmaları ve kurumsal bilgileri.",
  alternates: { canonical: "/kurumsal" },
};

export default function CorporatePage() {
  const colors = Object.values(categoryTheme);
  return (
    <>
      <PageHero
        eyebrow="Anı'yı tanıyın"
        title="Karaman'dan doğan bir lezzet ailesi"
        crumbs={[{ href: "/kurumsal", label: "Anı'yı Tanıyın" }]}
        lead={<p>{history.paragraphs[0]}</p>}
      />
      <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-10">
        <div className="reveal relative mx-auto w-full max-w-[560px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[48px] rounded-br-[160px]">
            <Image src="/assets/site/fabrika.webp" alt="Anı Bisküvi Karaman tesisinin havadan görünümü" fill sizes="(min-width: 1024px) 560px, 92vw" className="object-cover object-[50%_80%]" />
          </div>
          <CookieBadge className="float absolute -right-4 -top-6 h-24 w-24" />
        </div>
        <div className="reveal prose-ani text-lg text-choco-800" style={{ ["--d" as string]: "100ms" }}>
          <h2 className="font-display mb-5 text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-none text-choco-900">Fabrikamız</h2>
          <p>{history.paragraphs[2]}</p>
          <p>{history.pastaParagraph}</p>
          <p className="text-sm text-choco-700">Kaynak: Tarihçemiz; {history.pastaSource}.</p>
        </div>
      </section>

      <section aria-labelledby="kurumsal-sayfalar" className="mx-auto max-w-[1400px] px-4 pt-24 sm:px-6 lg:px-10">
        <h2 id="kurumsal-sayfalar" className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold">
          Daha yakından tanıyın
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {corporatePages.map((p, i) => (
            <li key={p.slug} className="reveal" style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}>
              <Link
                href={`/kurumsal/${p.slug}`}
                className={`group flex h-full min-h-[200px] flex-col rounded-[32px] p-7 transition-transform duration-500 [transition-timing-function:var(--ease-out-back)] hover:-translate-y-1.5 ${colors[i].ink === "var(--choco-900)" ? "" : "on-dark"}`}
                style={{ background: colors[i].bg, color: colors[i].ink }}
              >
                <h3 className="font-display text-2xl font-extrabold leading-tight">{p.title}</h3>
                <p className="mt-2 font-semibold opacity-90">{p.summary}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 font-extrabold">
                  Oku <Arrow className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 pt-24 sm:px-6">
        <figure className="reveal relative rounded-[40px] bg-cream-50 p-8 ring-1 ring-choco-900/5 sm:p-12">
          <span aria-hidden className="font-display absolute -top-10 left-8 text-[8rem] leading-none text-red">“</span>
          <blockquote className="prose-ani font-display text-[clamp(1.3rem,2.4vw,1.8rem)] font-semibold leading-snug text-choco-900">
            <p>{chairmanMessage.paragraphs[0]}</p>
          </blockquote>
          <figcaption className="mt-6 font-bold text-choco-800">
            {chairmanMessage.signature} · {chairmanMessage.role}
            <Link href="/kurumsal/baskanin-mesaji" className="ml-3 text-red-700 underline underline-offset-4">
              Mesajın tamamı
            </Link>
          </figcaption>
        </figure>
      </section>
    </>
  );
}
