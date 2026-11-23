import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import {
  brandAssets,
  chairmanMessage,
  corporatePages,
  history,
  infoSociety,
  infoSocietyDocs,
  milestones,
  missionVision,
  socialResponsibility,
} from "@/data/site";

export function generateStaticParams() {
  return corporatePages.map((p) => ({ sayfa: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ sayfa: string }> }): Promise<Metadata> {
  const { sayfa } = await params;
  const p = corporatePages.find((x) => x.slug === sayfa);
  if (!p) return {};
  return { title: p.title, description: `Anı Bisküvi – ${p.title}: ${p.summary}`, alternates: { canonical: `/kurumsal/${p.slug}` } };
}

export default async function CorporateSubPage({ params }: { params: Promise<{ sayfa: string }> }) {
  const { sayfa } = await params;
  const page = corporatePages.find((x) => x.slug === sayfa);
  if (!page) notFound();

  return (
    <>
      <PageHero
        eyebrow="Kurumsal"
        title={page.title}
        crumbs={[
          { href: "/kurumsal", label: "Anı'yı Tanıyın" },
          { href: `/kurumsal/${page.slug}`, label: page.title },
        ]}
      />
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        {sayfa === "tarihce" && <History />}
        {sayfa === "misyon-vizyon" && <MissionVision />}
        {sayfa === "baskanin-mesaji" && <Chairman />}
        {sayfa === "sosyal-sorumluluk" && <Social />}
        {sayfa === "bilgi-toplumu-hizmeti" && <InfoSociety />}
        {sayfa === "kurumsal-kimlik" && <Identity />}
        <p className="mt-16 border-t border-choco-900/10 pt-6 text-sm text-choco-700">
          İçerik kaynağı:{" "}
          <a href={page.source} target="_blank" rel="noopener" className="font-bold underline underline-offset-4">
            {page.source.replace("https://", "")}
          </a>
        </p>
      </div>
    </>
  );
}

function History() {
  return (
    <>
      <div className="prose-ani max-w-[68ch] text-lg text-choco-800">
        {history.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          {history.pastaParagraph} <span className="text-sm text-choco-700">({history.pastaSource})</span>
        </p>
      </div>
      <h2 className="font-display mt-16 text-[clamp(2rem,4vw,3rem)] font-extrabold">Kilometre taşları</h2>
      <p className="mt-2 text-choco-700">Yalnızca kaynakta yılıyla birlikte geçen gelişmeler listelenmiştir.</p>
      <ol className="relative mt-10 space-y-6 before:absolute before:bottom-0 before:left-[1.15rem] before:top-0 before:w-1 before:rounded-full before:bg-cream-300 sm:before:left-1/2 sm:before:-translate-x-1/2">
        {milestones.map((m, i) => (
          <li key={m.year} className={`reveal relative grid gap-4 pl-12 sm:grid-cols-2 sm:gap-12 sm:pl-0`}>
            <span aria-hidden className="absolute left-2 top-6 h-5 w-5 rounded-full border-4 border-cream-100 bg-red sm:left-1/2 sm:-translate-x-1/2" />
            <div className={`${i % 2 ? "sm:col-start-2" : "sm:text-right"}`}>
              <div className="rounded-[28px] bg-cream-50 p-6 ring-1 ring-choco-900/5">
                <p className="font-display text-4xl font-extrabold text-red-700">{m.year}</p>
                <h3 className="font-display mt-1 text-xl font-extrabold">{m.title}</h3>
                <p className="mt-2 text-choco-800">{m.text}</p>
                <p className="mt-2 text-xs font-semibold text-choco-500">Kaynak: {m.source}</p>
              </div>
            </div>
            {m.image && (
              <div className={`hidden sm:block ${i % 2 ? "sm:col-start-1 sm:row-start-1" : ""}`}>
                <div className="relative aspect-[420/249] overflow-hidden rounded-[24px] bg-cream-50">
                  <Image src={m.image} alt="" fill sizes="420px" className="object-contain" />
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}

function MissionVision() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[
        ["Vizyonumuz", missionVision.vision, "var(--c-biskuvi)"],
        ["Misyonumuz", missionVision.mission, "var(--c-kek)"],
      ].map(([title, block, color]) => {
        const b = block as typeof missionVision.vision;
        return (
          <section key={title as string} className="reveal rounded-[36px] p-8" style={{ background: color as string }}>
            <h2 className="font-display text-3xl font-extrabold">{title as string}</h2>
            <p className="mt-4 font-semibold">{b.intro}</p>
            <ul className="mt-4 space-y-3">
              {b.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-choco-900" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <p className="text-sm text-choco-700 md:col-span-2">{missionVision.note}</p>
    </div>
  );
}

function Chairman() {
  return (
    <figure className="rounded-[40px] bg-cream-50 p-8 ring-1 ring-choco-900/5 sm:p-12">
      <blockquote className="prose-ani text-xl leading-relaxed text-choco-900">
        {chairmanMessage.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </blockquote>
      <figcaption className="mt-8">
        <span className="font-display block text-2xl font-extrabold">{chairmanMessage.signature}</span>
        <span className="font-semibold text-choco-700">{chairmanMessage.role}</span>
      </figcaption>
    </figure>
  );
}

function Social() {
  return (
    <>
      <div className="prose-ani max-w-[68ch] text-lg text-choco-800">
        {socialResponsibility.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <h2 className="font-display mt-12 text-3xl font-extrabold">Yayımlanan eserler</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {socialResponsibility.books.map((b, i) => (
          <li key={b.year} className="reveal rounded-[28px] bg-cream-50 p-6 ring-1 ring-choco-900/5" style={{ ["--d" as string]: `${i * 60}ms` }}>
            <p className="font-display text-3xl font-extrabold text-red-700">{b.year}</p>
            <p className="mt-1 text-lg font-bold">{b.title}</p>
          </li>
        ))}
      </ul>
      <div className="prose-ani mt-12 max-w-[68ch] text-lg text-choco-800">
        {socialResponsibility.more.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </>
  );
}

function InfoSociety() {
  return (
    <>
      <dl className="overflow-hidden rounded-[32px] bg-cream-50 ring-1 ring-choco-900/5">
        {infoSociety.map((r) => (
          <div key={r.label} className="grid gap-1 border-b border-choco-900/8 px-6 py-4 last:border-0 sm:grid-cols-[260px_1fr] sm:gap-6">
            <dt className="font-bold text-choco-700">{r.label}</dt>
            <dd className="font-semibold text-choco-900">{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-choco-700">
        Kaynak sayfada yönetim kurulu ve denetçi bilgileri 2015 ve öncesine ait dönemlerle verildiği için güncel olarak aktarılmamıştır.
      </p>
      <h2 className="font-display mt-12 text-3xl font-extrabold">Belgeler</h2>
      <ul className="mt-4 space-y-2">
        {infoSocietyDocs.map((d) => (
          <li key={d.href}>
            <a href={d.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-bold text-red-700 underline underline-offset-4">
              {d.label} <span className="text-sm font-semibold text-choco-700">(PDF, resmî site)</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

function Identity() {
  return (
    <>
      <p className="max-w-[60ch] text-lg text-choco-800">Anı Bisküvi logosunun resmî dosyaları kaynak sitede aşağıdaki biçimlerde sunulmaktadır.</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {brandAssets.map((a) => (
          <li key={a.href}>
            <a
              href={a.href}
              className="flex h-full flex-col items-start gap-4 rounded-[28px] bg-cream-50 p-6 ring-1 ring-choco-900/5 transition-transform hover:-translate-y-1"
            >
              <span className="font-display text-xl font-extrabold">{a.label}</span>
              <span className="mt-auto text-sm font-bold text-red-700 underline underline-offset-4">ZIP indir (resmî site)</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-choco-700">
        Kurumsal kimlik kullanımına ilişkin sorularınız için <Link href="/iletisim" className="font-bold underline">iletişim</Link> sayfasını kullanabilirsiniz.
      </p>
    </>
  );
}
