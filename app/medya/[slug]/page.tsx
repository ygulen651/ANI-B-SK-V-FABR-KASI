import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/PageHero";
import { Arrow } from "@/components/Decor";
import { formatTrDate, getNews, news } from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anibiskuvi.com.tr";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.body.join(" ").slice(0, 155),
    alternates: { canonical: `/medya/${n.slug}` },
    openGraph: { type: "article", images: [{ url: n.image.src, width: n.image.width, height: n.image.height }] },
  };
}

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) notFound();
  const idx = news.findIndex((x) => x.slug === n.slug);
  const prev = news[idx + 1];
  const next = news[idx - 1];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.title,
    image: [SITE_URL + n.image.src],
    datePublished: n.sitePublishedAt,
    publisher: { "@type": "Organization", name: "Anı Bisküvi" },
  };
  return (
    <article className="mx-auto max-w-[900px] px-4 pt-6 sm:px-6">
      <Breadcrumbs
        items={[
          { href: "/medya", label: "Medya" },
          { href: `/medya/${n.slug}`, label: n.title },
        ]}
      />
      <p className="mt-8 inline-flex rounded-full bg-cream-200 px-4 py-1.5 text-sm font-bold text-choco-800">
        Arşiv haberi · sitede yayın: <time dateTime={n.sitePublishedAt} className="ml-1">{formatTrDate(n.sitePublishedAt)}</time>
      </p>
      <h1 className="intro font-display mt-4 text-[clamp(2.2rem,5.5vw,4rem)] font-extrabold leading-[0.95] text-balance">{n.title}</h1>
      <div className="relative mt-8 overflow-hidden rounded-[36px] bg-cream-200" style={{ aspectRatio: `${n.image.width} / ${n.image.height}` }}>
        <Image src={n.image.src} alt="" fill priority sizes="(min-width: 900px) 900px, 92vw" className="object-contain" />
      </div>
      <div className="prose-ani mt-10 text-lg text-choco-800">
        {n.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <p className="mt-10 rounded-2xl bg-cream-50 px-5 py-4 text-sm text-choco-700 ring-1 ring-choco-900/5">
        Bu haberin özgün yayın tarihi kaynakta belirtilmemiştir; içerikteki sıralama ve rakamlar haberin yazıldığı döneme aittir. Kaynak:{" "}
        <a href={n.source} target="_blank" rel="noopener" className="font-bold underline underline-offset-4">
          anibiskuvi.com.tr
        </a>
      </p>
      <nav aria-label="Diğer haberler" className="mt-12 grid gap-3 sm:grid-cols-2">
        {prev && (
          <Link href={`/medya/${prev.slug}`} className="rounded-[24px] bg-cream-50 p-5 ring-1 ring-choco-900/5 hover:bg-cream-200">
            <span className="text-sm font-bold text-choco-700">← Önceki</span>
            <span className="mt-1 block font-bold">{prev.title}</span>
          </Link>
        )}
        {next && (
          <Link href={`/medya/${next.slug}`} className="rounded-[24px] bg-cream-50 p-5 text-right ring-1 ring-choco-900/5 hover:bg-cream-200 sm:col-start-2">
            <span className="text-sm font-bold text-choco-700">Sonraki →</span>
            <span className="mt-1 block font-bold">{next.title}</span>
          </Link>
        )}
      </nav>
      <Link href="/medya" className="btn btn-ghost mt-10">
        Tüm haberler <Arrow />
      </Link>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
