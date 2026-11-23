import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Arrow } from "@/components/Decor";
import { formatTrDate, news } from "@/lib/data";
import { videos } from "@/data/site";

export const metadata: Metadata = {
  title: "Haberler ve Medya",
  description: "Anı Bisküvi haber arşivi ve video galerisi.",
  alternates: { canonical: "/medya" },
};

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Basın / medya"
        title="Haberler & videolar"
        crumbs={[{ href: "/medya", label: "Medya" }]}
        lead={
          <p>
            Kaynak sitedeki {news.length} haberin tamamı {formatTrDate(news[0].sitePublishedAt)} tarihinde siteye toplu olarak eklenmiştir. Haberlerin
            özgün yayın tarihleri kaynakta yer almadığından, aşağıda sitedeki yayın tarihi gösterilir ve haberler arşiv niteliğindedir.
          </p>
        }
      />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold">Haber arşivi</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((n, i) => (
            <li key={n.id} className="reveal" style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}>
              <Link href={`/medya/${n.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[30px] bg-cream-50 ring-1 ring-choco-900/5 transition-transform duration-500 hover:-translate-y-1">
                <div className="relative aspect-[16/10] overflow-hidden bg-cream-200">
                  <Image src={n.image.src} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-bold text-choco-700">
                    Arşiv · <time dateTime={n.sitePublishedAt}>{formatTrDate(n.sitePublishedAt)}</time>
                  </p>
                  <h3 className="font-display mt-2 text-xl font-extrabold leading-tight">{n.title}</h3>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 font-extrabold text-red-700">
                    Oku <Arrow className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section id="video" aria-labelledby="video-baslik" className="scroll-mt-28 pt-24">
          <h2 id="video-baslik" className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold">
            Video galeri
          </h2>
          <p className="mt-2 text-choco-700">Videolar YouTube&apos;da yeni sekmede açılır.</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <li key={v.id}>
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-center gap-4 rounded-[24px] bg-cream-50 p-5 ring-1 ring-choco-900/5 transition-transform hover:-translate-y-1"
                >
                  <span aria-hidden className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-red text-white transition-transform group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6"><path d="M7 4.5v15l13-7.5z" fill="currentColor" /></svg>
                  </span>
                  <span className="font-bold leading-snug text-choco-900">
                    {v.title}
                    <span className="sr-only"> (YouTube, yeni sekmede açılır)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
