import Image from "next/image";
import Link from "next/link";
import { ShowcaseRail } from "@/components/ShowcaseRail";
import { ProductCard } from "@/components/ProductCard";
import { ExportMap } from "@/components/ExportMap";
import { CountUp } from "@/components/CountUp";
import { HeroShowcase, type ShowCategory, type HeroPerson } from "@/components/HeroShowcase";
import { Arrow, CookieBadge, Crumbs, Wave } from "@/components/Decor";
import { categories, categoryTheme, news, products, productsBySlugs, productStats, formatTrDate } from "@/lib/data";
import { catalog, exportContent, history, milestones, quality } from "@/data/site";

/** Yapay zekâ ile üretilmiş temsili kişiler (gerçek müşteri değildir; bkz. CONTENT_SOURCES.md) */
const PEOPLE: HeroPerson[] = [
  { src: "/assets/people/kadin.webp", width: 900, height: 881, alt: "Elinde bisküviyle kahkaha atan genç kadın", x: -2, w: 30, front: true, delay: 500 },
  { src: "/assets/people/teyze.webp", width: 900, height: 864, alt: "Bir elinde çay bardağı, diğerinde bisküvi tutan gülümseyen kadın", x: 36, w: 28, front: true, delay: 700 },
  { src: "/assets/people/erkek.webp", width: 900, height: 788, alt: "Gofret yerken gülen genç adam", x: 72, w: 30, front: true, delay: 900 },
];

const SHOWCASE = [
  "brawo-donut-cake-2029",
  "big-prens-kakao-kremali-1358",
  "custard-creams-cilek-127-3",
  "gofron-xxl-492",
  "swiss-roll-sutlu-kakao-kaplamali-3111",
  "maxistar-2665-1",
  "zozo-cream-kakao-1345",
  "frolle-x2-4990",
  "crack-paprika-1157",
  "ani-infinity-dubai-2039",
  "cimboo-dark-628",
  "fellini-spagetti-7501",
  "jolly-2875",
  "tiviti-2136",
];

/** Açılışta yukarı doğru süzülen kırıntılar (dekoratif) */
const DRIFT = [
  { l: "6%", b: "-4%", s: 14, dur: 11, fd: 0, dx: 30, dy: -520, shape: "c" },
  { l: "18%", b: "-6%", s: 9, dur: 9, fd: -3, dx: -20, dy: -480, shape: "r" },
  { l: "33%", b: "-4%", s: 12, dur: 13, fd: -6, dx: 40, dy: -560, shape: "c" },
  { l: "47%", b: "-8%", s: 8, dur: 10, fd: -2, dx: -30, dy: -500, shape: "r" },
  { l: "58%", b: "-5%", s: 16, dur: 14, fd: -8, dx: 20, dy: -600, shape: "c" },
  { l: "71%", b: "-6%", s: 10, dur: 12, fd: -4, dx: -40, dy: -540, shape: "r" },
  { l: "84%", b: "-4%", s: 13, dur: 10, fd: -1, dx: 25, dy: -500, shape: "c" },
  { l: "93%", b: "-7%", s: 9, dur: 15, fd: -9, dx: -15, dy: -620, shape: "r" },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-extrabold uppercase tracking-[0.14em] ${light ? "bg-white text-red-700" : "bg-red-600 text-white"}`}>
      <span aria-hidden className={`h-2 w-2 rounded-full ${light ? "bg-red" : "bg-white"}`} />
      {children}
    </p>
  );
}

export default function Home() {
  const showcase = productsBySlugs(SHOWCASE);
  const SHADE: Record<string, string> = {
    biskuvi: "#b06a05", cikolata: "#2a0c02", kek: "#b01e4c", gofret: "#b38300", kraker: "#a84505", sekerleme: "#4a14a3", makarna: "#0b2f99",
  };
  const show: ShowCategory[] = categories.map((c) => {
    const t = categoryTheme[c.slug];
    // Önce kategoriye özel seçilenler, sonra katalogdaki diğer şeffaf ambalaj kesimleri
    const pool = [
      ...productsBySlugs(t.heroSlugs),
      ...products.filter((p) => p.category === c.slug && p.images[0]?.background === "transparent" && !t.heroSlugs.includes(p.slug)),
    ];
    const seen = new Set<string>();
    const packs = pool
      .filter((p) => {
        const k = p.name.split(" ")[0] + p.name.split(" ")[1];
        if (!p.images[0] || seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, 5)
      .map((p) => ({ slug: p.slug, name: p.name, src: p.images[0].src, width: p.images[0].width, height: p.images[0].height }));
    const subs = c.subcategories.filter((s) => s.productCount > 0 && s.name !== c.name).sort((a, b) => b.productCount - a.productCount).map((s) => ({ slug: s.slug, name: s.name, count: s.productCount }));
    return { slug: c.slug, name: c.name, count: c.productCount, tagline: t.tagline, bg: t.bg, ink: t.ink, shade: SHADE[c.slug], packs, subs };
  });
  const latest = news.slice(0, 3);
  const timeline = milestones.filter((m) => ["1994", "1995", "1999", "2003", "2004", "2007", "2010", "2015", "2023"].includes(m.year));

  return (
    <>
      {/* 2–3. AÇILIŞ + KATEGORİ SEKMELERİ + SEÇİLİ KATEGORİ ---------- */}
      <HeroShowcase categories={show} totalProducts={productStats.total} people={PEOPLE} />

      {/* 4. VİTRİN (kırmızı) ------------------------------------------- */}
      <section aria-labelledby="vitrin-baslik" className="on-dark relative mt-16 overflow-hidden">
        <Wave color="var(--ani-red-600)" variant={2} animated />
        <div className="relative bg-red-600 pb-16 pt-6 text-white">
          <div aria-hidden className="dots absolute inset-0 opacity-60" />
          <CookieBadge className="parallax absolute -right-10 top-10 h-40 w-40 opacity-90" fill="var(--c-gofret)" />
          <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div className="reveal flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow light>Vitrin</Eyebrow>
                <h2 id="vitrin-baslik" className="font-display mt-4 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[0.95]">
                  Raflardan seçmeler
                </h2>
              </div>
              <p className="max-w-md text-white">Gerçek ambalajlarıyla, kataloğun ve sitenin farklı köşelerinden seçtiğimiz ürünler. Okları kullanın ya da yana kaydırın.</p>
            </div>
            <div className="mt-8">
              <ShowcaseRail label="Öne çıkan ürünler">
                {showcase.map((p, i) => (
                  <li key={p.slug} className="reveal-pop w-[72%] shrink-0 sm:w-[44%] md:w-[31%] lg:w-[23%]" style={{ ["--d" as string]: `${Math.min(i, 5) * 90}ms` }}>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ShowcaseRail>
            </div>
            <div className="mt-6">
              <Link href="/urunler" className="btn btn-cream">
                Tüm ürünleri gör ({productStats.total}) <Arrow />
              </Link>
            </div>
          </div>
        </div>
        <Wave color="var(--ani-red-600)" flip variant={0} animated />
      </section>

      {/* 5. HİKÂYE ------------------------------------------------------- */}
      <section aria-labelledby="hikaye-baslik" className="relative mx-auto max-w-[1400px] px-4 pt-20 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal relative mx-auto w-full max-w-[520px]">
            <div aria-hidden className="absolute -inset-4 -rotate-3 rounded-[56px] rounded-tl-[170px] bg-red" />
            <div className="zoom-view relative aspect-[4/5] overflow-hidden rounded-[48px] rounded-tl-[160px] shadow-[0_40px_70px_-40px_rgba(90,0,6,.8)]">
              <Image
                src="/assets/site/fabrika.webp"
                alt="Anı Bisküvi Karaman tesisinin havadan görünümü; binada ANI Makarna yazısı"
                fill
                sizes="(min-width: 1024px) 520px, 92vw"
                className="object-cover object-[50%_78%]"
              />
            </div>
            <div className="wobble absolute -bottom-6 -right-2 rounded-[28px] bg-white px-6 py-5 text-red-700 shadow-xl ring-4 ring-red sm:-right-8" style={{ ["--r" as string]: "4deg" }}>
              <p className="font-display text-4xl font-extrabold leading-none">1994</p>
              <p className="mt-1 text-sm font-bold">Karaman&apos;da kuruluş</p>
            </div>
            <CookieBadge className="float absolute -left-6 -top-8 h-24 w-24" fill="var(--c-gofret)" />
          </div>
          <div className="reveal" style={{ ["--d" as string]: "120ms" }}>
            <Eyebrow>Anı&apos;nın hikâyesi</Eyebrow>
            <h2 id="hikaye-baslik" className="font-display mt-4 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[0.95] text-balance">
              Karaman&apos;da doğdu, <span className="text-red">sofralara yayıldı</span>
            </h2>
            <div className="prose-ani mt-6 max-w-[60ch] text-lg text-choco-800">
              <p>{history.paragraphs[2]}</p>
              <p>{history.paragraphs[3]}</p>
            </div>
            <Link href="/kurumsal/tarihce" className="btn btn-primary mt-8">
              Tarihçeyi oku <Arrow />
            </Link>
          </div>
        </div>

        <ol className="mt-20 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-9" aria-label="Seçilmiş kilometre taşları">
          {timeline.map((m, i) => (
            <li
              key={m.year}
              className={`reveal-pop group relative rounded-[24px] p-5 transition-transform duration-500 [transition-timing-function:var(--ease-out-back)] hover:-translate-y-2 hover:rotate-2 ${i % 2 ? "bg-white text-choco-900 ring-2 ring-red" : "on-dark bg-red-600 text-white"}`}
              style={{ ["--d" as string]: `${i * 70}ms` }}
            >
              <p className="font-display text-3xl font-extrabold">{m.year}</p>
              <p className="mt-2 font-bold leading-snug">{m.title}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. ÜRETİM & KALİTE (kırmızı) ------------------------------------ */}
      <section aria-labelledby="kalite-baslik" className="on-dark relative mt-24">
        <Wave color="var(--ani-red-700)" variant={1} animated />
        <div className="relative overflow-hidden bg-red-700 pb-20 pt-10 text-white">
          <div aria-hidden className="sunburst spin-slow no-mobile-motion absolute -left-40 -top-40 h-[640px] w-[640px] opacity-70" />
          <Crumbs tone="cream" className="absolute bottom-6 left-[38%] h-40 w-40 opacity-40" />
          <div className="relative mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
            <div className="reveal">
              <Eyebrow light>Üretim & kalite</Eyebrow>
              <h2 id="kalite-baslik" className="font-display mt-4 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[0.95]">
                Lezzetin arkasında sıkı bir disiplin
              </h2>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-white">{quality.policy}</p>
              <Link href="/kalite" className="btn btn-cream mt-8">
                Kalite politikalarımız <Arrow />
              </Link>
            </div>
            <div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {quality.policies.slice(0, 6).map((p, i) => (
                  <li
                    key={p.title}
                    className="reveal-pop flex items-center gap-3 rounded-[24px] bg-white p-5 text-choco-900 shadow-[0_14px_30px_-18px_rgba(0,0,0,.5)] transition-transform duration-500 [transition-timing-function:var(--ease-out-back)] hover:-translate-y-1 hover:rotate-1"
                    style={{ ["--d" as string]: `${i * 80}ms` }}
                  >
                    <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-red-600 text-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <p className="font-display text-lg font-bold leading-tight">{p.title}</p>
                  </li>
                ))}
              </ul>
              <div className="reveal mt-6 rounded-[24px] bg-[var(--c-gofret)] p-6 text-choco-900" style={{ ["--d" as string]: "200ms" }}>
                <p className="font-display text-xl font-extrabold">Kaynak metinlerde adı geçen belgeler</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {quality.documentsMentioned.map((d) => (
                    <li key={d.name} className="rounded-full bg-white px-3 py-1.5 text-sm font-bold">
                      {d.name}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold">
                  Belgelerin tarih ve geçerlilik bilgisi kaynakta yer almadığı için güncel sertifika durumu olarak sunulmamıştır.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Wave color="var(--ani-red-700)" flip variant={2} animated />
      </section>

      {/* 7. İHRACAT ------------------------------------------------------- */}
      <section aria-labelledby="ihracat-baslik" className="relative mx-auto max-w-[1400px] px-4 pt-20 sm:px-6 lg:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="reveal">
            <Eyebrow>İhracat</Eyebrow>
            <h2 id="ihracat-baslik" className="font-display mt-4 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[0.95] text-balance">
              Anı lezzetleri <span className="text-red">sınır tanımıyor</span>
            </h2>
            <p className="mt-6 flex items-baseline gap-3">
              <CountUp to={exportContent.countries.length} className="font-display text-7xl font-extrabold leading-none text-red" />
              <span className="text-lg font-bold text-choco-800">ülke, kaynak sitedeki ihracat listesinde</span>
            </p>
            <p className="mt-6 max-w-[54ch] text-lg text-choco-800">{exportContent.paragraphs[1]}</p>
            <p className="mt-4 text-sm text-choco-700">{exportContent.countriesNote}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/iletisim?konu=ihracat" className="btn btn-primary">
                İş ortağımız olun <Arrow />
              </Link>
              <Link href="/ihracat" className="btn btn-ghost">
                Ülke listesi
              </Link>
            </div>
          </div>
          <div className="reveal relative rounded-[40px] bg-white p-4 shadow-[0_30px_60px_-30px_rgba(138,9,16,.45)] ring-2 ring-red/15 sm:p-8" style={{ ["--d" as string]: "120ms" }}>
            <ExportMap />
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 px-2 text-sm font-semibold text-choco-800">
              <span className="flex items-center gap-2"><span aria-hidden className="h-3 w-3 rounded-full bg-red" />Kaynakta listelenen ülke ({exportContent.countries.length})</span>
              <span className="flex items-center gap-2"><span aria-hidden className="h-3 w-3 rounded-full bg-choco-900" />Türkiye · Karaman</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. HABERLER ------------------------------------------------------ */}
      <section aria-labelledby="haber-baslik" className="relative mt-24">
        <Wave color="var(--cream-200)" variant={0} animated />
        <div className="bg-cream-200 pb-20 pt-6">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div className="reveal flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>Haberler & medya</Eyebrow>
                <h2 id="haber-baslik" className="font-display mt-4 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[0.95]">
                  Haber arşivinden
                </h2>
              </div>
              <p className="max-w-md text-choco-800">
                Haberler kaynak sitede {formatTrDate(latest[0].sitePublishedAt)} tarihinde toplu olarak yayımlanmıştır; özgün yayın tarihleri belirtilmemiştir.
              </p>
            </div>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {latest.map((n, i) => (
                <li key={n.id} className="reveal-pop" style={{ ["--d" as string]: `${i * 110}ms` }}>
                  <Link href={`/medya/${n.slug}`} className="card-shine group flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_20px_40px_-26px_rgba(138,9,16,.5)] transition-transform duration-500 [transition-timing-function:var(--ease-out-back)] hover:-translate-y-2 hover:rotate-[-0.8deg]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-cream-300">
                      <Image src={n.image.src} alt="" fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-sm font-bold text-choco-700">
                        Arşiv · sitede yayın: <time dateTime={n.sitePublishedAt}>{formatTrDate(n.sitePublishedAt)}</time>
                      </p>
                      <h3 className="font-display mt-2 text-xl font-extrabold leading-tight text-choco-900">{n.title}</h3>
                      <span className="mt-auto inline-flex items-center gap-1 pt-5 font-extrabold text-red-700">
                        Haberi oku <Arrow className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/medya" className="btn btn-primary mt-8">
              Tüm haberler ve videolar <Arrow />
            </Link>
          </div>
        </div>
        <Wave color="var(--cream-200)" flip variant={1} animated />
      </section>

      {/* 9. E-KATALOG ----------------------------------------------------- */}
      <section aria-labelledby="katalog-baslik" className="relative mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 lg:px-10">
        <div className="on-dark zoom-view relative overflow-hidden rounded-[48px] bg-red-600 px-6 py-12 text-white sm:px-12 lg:px-16 lg:py-16">
          <div aria-hidden className="sunburst spin-mid no-mobile-motion absolute -right-40 -top-40 h-[700px] w-[700px]" />
          <div aria-hidden className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-black/10" />
          {DRIFT.slice(0, 5).map((d, i) => (
            <span
              key={i}
              aria-hidden
              className="drift mobile-hide"
              style={{ left: d.l, bottom: "-6%", width: d.s, height: d.s, borderRadius: "9999px", background: "#fff", ["--dur" as string]: `${d.dur}s`, ["--fd" as string]: `${d.fd}s`, ["--dx" as string]: `${d.dx}px`, ["--dy" as string]: "-420px", ["--o" as string]: ".45" }}
            />
          ))}
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Eyebrow light>E-Katalog</Eyebrow>
              <h2 id="katalog-baslik" className="font-display mt-4 text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-[0.9]">
                {catalog.year} Ürün Kataloğu
              </h2>
              <p className="mt-5 max-w-[46ch] text-lg text-white">
                Makarnadan şekerlemeye tüm ürün grupları; ürün kodu, gramaj, koli içi adet ve 40&apos; HC konteyner bilgileriyle.
              </p>
              <dl className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
                <div className="rounded-full bg-white px-4 py-2 text-red-700"><dt className="sr-only">Sayfa</dt><dd>{catalog.pages} sayfa</dd></div>
                <div className="rounded-full bg-white px-4 py-2 text-red-700"><dt className="sr-only">Dosya</dt><dd>PDF · {catalog.sizeLabel}</dd></div>
                <div className="rounded-full bg-white px-4 py-2 text-red-700"><dt className="sr-only">Hazırlanma</dt><dd>{catalog.createdLabel}</dd></div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={catalog.href} target="_blank" rel="noopener" className="btn btn-cream">
                  Kataloğu görüntüle <Arrow /> <span className="sr-only">(PDF, yeni sekmede açılır)</span>
                </a>
                <a href={catalog.href} download className="btn btn-outline-white">
                  İndir (PDF)
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-[70%] max-w-[340px] sm:w-[52%] lg:w-[80%]">
              <div className="float relative" style={{ ["--r" as string]: "5deg", ["--dur" as string]: "5s", ["--float" as string]: "-18px", ["--tilt" as string]: "-6deg" }}>
                <Image
                  src={catalog.cover.src}
                  alt={`Anı Bisküvi ${catalog.year} ürün kataloğu kapağı`}
                  width={catalog.cover.width}
                  height={catalog.cover.height}
                  sizes="(min-width: 1024px) 340px, 60vw"
                  className="h-auto w-full rounded-[18px] shadow-[0_40px_60px_-20px_rgba(0,0,0,.55)] ring-8 ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
