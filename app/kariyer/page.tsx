import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Arrow } from "@/components/Decor";
import { career } from "@/data/site";

export const metadata: Metadata = {
  title: "Kariyer",
  description: "Anı Bisküvi'de kariyer: genel başvuru bilgileri.",
  alternates: { canonical: "/kariyer" },
};

export default function CareerPage() {
  return (
    <>
      <PageHero eyebrow="Kariyer" title="Anı ailesine katılın" crumbs={[{ href: "/kariyer", label: "Kariyer" }]} />
      <div className="mx-auto max-w-[900px] px-4 sm:px-6">
        <div className="rounded-[36px] bg-cream-50 p-8 ring-1 ring-choco-900/5 sm:p-12">
          <p className="font-display text-2xl font-bold leading-snug">Değerli ziyaretçimiz,</p>
          <p className="mt-4 text-lg leading-relaxed text-choco-800">{career.text}</p>
          <p className="mt-6 text-choco-700">{career.applyNote}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={career.applyHref} target="_blank" rel="noopener" className="btn btn-primary">
              Başvuru sayfasına git <Arrow /> <span className="sr-only">(resmî site, yeni sekme)</span>
            </a>
            <Link href="/iletisim?konu=kariyer" className="btn btn-ghost">
              Soru sorun
            </Link>
          </div>
        </div>
        <p className="mt-6 text-sm text-choco-700">Kaynakta açık pozisyon listesi yer almamaktadır.</p>
      </div>
    </>
  );
}
