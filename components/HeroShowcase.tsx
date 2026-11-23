"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { AniLogo } from "./AniLogo";
import { CookieBadge } from "./Decor";

export type HeroPerson = { src: string; width: number; height: number; alt: string; x: number; w: number; front: boolean; delay: number };
export type ShowPack = { slug: string; name: string; src: string; width: number; height: number };
export type ShowCategory = {
  slug: string;
  name: string;
  count: number;
  tagline: string;
  bg: string;
  ink: string;
  shade: string;
  packs: ShowPack[];
  subs: { slug: string; name: string; count: number }[];
};

/** Açılış sahnesinde ambalaj yerleri (%): bazıları dev harflerin önünde, bazıları arkasında */
const HERO_SLOTS = [
  { x: 25, y: 64, w: 13, r: -12, front: true },
  { x: 43, y: 0, w: 14, r: 8, front: false },
  { x: 61, y: 62, w: 13, r: 9, front: true },
  { x: 24, y: 4, w: 13, r: -8, front: false },
  { x: 63, y: 2, w: 13, r: 12, front: false },
];

/** Alt bölümde ortadaki kompozisyon */
const SPOT_SLOTS = [
  { x: 30, y: 10, w: 40, r: -4, z: 3 },
  { x: 2, y: 30, w: 32, r: -14, z: 2 },
  { x: 66, y: 28, w: 32, r: 12, z: 2 },
];

const FLOATERS = [
  { l: "4%", t: "16%", s: 96, r: 0, d: 0 },
  { l: "88%", t: "10%", s: 120, r: 30, d: -2 },
  { l: "12%", t: "62%", s: 70, r: 60, d: -4 },
  { l: "82%", t: "58%", s: 88, r: 15, d: -1 },
  { l: "2%", t: "84%", s: 60, r: 45, d: -3 },
  { l: "91%", t: "82%", s: 76, r: 80, d: -5 },
];

export function HeroShowcase({
  categories,
  totalProducts,
  people = [],
}: {
  categories: ShowCategory[];
  totalProducts: number;
  people?: HeroPerson[];
}) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const id = useId();
  const tabsRef = useRef<HTMLDivElement>(null);
  const c = categories[active];
  const n = categories.length;

  const go = (next: number, d?: number) => {
    const i = (next + n) % n;
    setDir(d ?? (i > active ? 1 : -1));
    setActive(i);
  };

  // Mobilde etkin sekmeyi yatay şeritte ortala
  useEffect(() => {
    const row = tabsRef.current;
    if (!row || row.scrollWidth <= row.clientWidth) return;
    const tab = row.querySelectorAll<HTMLElement>("[role=tab]")[active];
    if (!tab) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  const onTabKey = (e: React.KeyboardEvent) => {
    let next = active;
    if (e.key === "ArrowRight") next = active + 1;
    else if (e.key === "ArrowLeft") next = active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    go(next, e.key === "ArrowLeft" ? -1 : 1);
    const i = (next + n) % n;
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[i]?.focus();
  };

  const word = "LEZZETİ KEŞFET".split("");

  return (
    <MotionConfig reducedMotion="user">
      {/* ============================ AÇILIŞ ============================ */}
      <section aria-labelledby="hero-baslik" className="on-dark relative overflow-hidden text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(118deg, #a80b12 0%, #d4111a 30%, #ff2a33 62%, #ff5a3c 100%)" }}
        />
        <div aria-hidden className="dots absolute inset-0 opacity-70" />
        <div aria-hidden className="sunburst spin-slow no-mobile-motion absolute left-1/2 top-[55%] h-[1300px] w-[1300px] -translate-x-1/2 -translate-y-1/2 opacity-60" />

        <div className="relative mx-auto flex max-w-[1440px] flex-col px-4 pb-20 pt-8 sm:px-6 lg:px-10 lg:pb-24">
          <h1 id="hero-baslik" className="relative mx-auto w-[min(62vw,300px)]">
            <span className="sr-only">Anı Bisküvi – Her Anına Bir Lezzet!</span>
            <span aria-hidden className="intro-pop block" style={{ ["--d" as string]: "60ms" }}>
              <span className="float block" style={{ ["--dur" as string]: "8s", ["--float" as string]: "-6px", ["--tilt" as string]: "-1deg" }}>
                <span className="relative block">
                  <span className="absolute -inset-[4%] rounded-[50%] border-[3px] border-dashed border-white/70" />
                  <span className="block rounded-[50%] bg-white p-[3.5%] shadow-[0_24px_50px_rgba(90,0,6,.45),0_0_0_8px_rgba(255,255,255,.18),0_0_100px_rgba(255,220,220,.5)]">
                    <AniLogo className="block h-auto w-full" title="" />
                  </span>
                </span>
              </span>
            </span>
          </h1>
          <p className="intro mx-auto mt-4 max-w-xl text-center text-base font-semibold text-white sm:text-lg" style={{ ["--d" as string]: "120ms" }}>
            Karaman&apos;dan dünyaya {totalProducts} ürünlük lezzet ailesi
          </p>

          {/* Sahne: dev harfler + ambalajlar */}
          <div className="relative mx-auto mt-2 aspect-[4/3] w-full max-w-[1240px] sm:aspect-[2/1] lg:aspect-[2.5/1]">
            {/* Arkadaki ambalajlar */}
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              {c.packs.slice(0, 5).map((p, i) => {
                const s = HERO_SLOTS[i];
                if (s.front) return null;
                return <HeroPack key={c.slug + p.slug} p={p} s={s} i={i} dir={dir} z={1} />;
              })}
            </AnimatePresence>


            {/* İnsanlar (yapay zekâ ile üretilmiş temsili görseller) */}
            {people.map((pp, i) => (
              <div
                key={pp.src}
                className={`intro-pop pointer-events-none absolute bottom-0 [mask-image:linear-gradient(to_bottom,#000_80%,transparent_100%)] ${i === 1 ? "hidden sm:block" : ""}`}
                style={{ left: `${pp.x}%`, width: `${pp.w}%`, zIndex: pp.front ? 3 : 1, ["--d" as string]: `${pp.delay}ms` }}
              >
                <div className="float" style={{ ["--dur" as string]: `${7 + i}s`, ["--fd" as string]: `${-i * 1.7}s`, ["--float" as string]: "-8px", ["--tilt" as string]: "0.6deg" }}>
                  <Image
                    src={pp.src}
                    alt={pp.alt}
                    width={pp.width}
                    height={pp.height}
                    priority
                    sizes="(min-width: 1024px) 380px, 40vw"
                    className="h-auto w-full drop-shadow-[0_30px_30px_rgba(60,0,4,.45)]"
                  />
                </div>
              </div>
            ))}
            {/* Öndeki ambalajlar */}
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              {c.packs.slice(0, 5).map((p, i) => {
                const s = HERO_SLOTS[i];
                if (!s.front) return null;
                return <HeroPack key={c.slug + p.slug} p={p} s={s} i={i} dir={dir} z={3} />;
              })}
            </AnimatePresence>

            {/* Oklar */}
            <button
              type="button"
              onClick={() => go(active - 1, -1)}
              aria-label="Önceki kategori"
              className="absolute left-0 top-1/2 z-[5] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-red-700 shadow-xl transition-transform hover:scale-110 sm:-left-2 sm:h-14 sm:w-14"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              type="button"
              onClick={() => go(active + 1, 1)}
              aria-label="Sonraki kategori"
              className="absolute right-0 top-1/2 z-[5] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-red-700 shadow-xl transition-transform hover:scale-110 sm:-right-2 sm:h-14 sm:w-14"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>

          <div className="intro relative z-[4] mt-4 flex flex-wrap items-center justify-center gap-3" style={{ ["--d" as string]: "500ms" }}>
            <span className="sr-only" aria-live="polite">
              {c.name} sahnesi gösteriliyor
            </span>
            <Link href="/urunler" className="btn btn-cream">
              Lezzetleri Keşfet <span aria-hidden>→</span>
            </Link>
            <Link href="/kurumsal" className="btn btn-outline-white">
              Anı&apos;yı Tanı
            </Link>
          </div>
        </div>
      </section>

      {/* ======================= KATEGORİ SEKMELERİ ===================== */}
      <div className="relative z-20 -mt-12 px-4 sm:px-6">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Ürün kategorileri"
          onKeyDown={onTabKey}
          className="mx-auto flex max-w-[1140px] gap-1 overflow-x-auto rounded-[22px] bg-red-700 p-2 shadow-[0_24px_40px_-20px_rgba(90,0,6,.8)] [scrollbar-width:none] lg:justify-between"
        >
          {categories.map((cat, i) => {
            const on = i === active;
            return (
              <button
                key={cat.slug}
                id={`${id}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`${id}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => go(i)}
                className={`relative shrink-0 rounded-[16px] px-4 py-3.5 text-base font-extrabold transition-colors sm:px-5 sm:text-lg ${on ? "text-red-700" : "text-white hover:bg-white/10"}`}
              >
                {on && (
                  <motion.span
                    layoutId={`${id}-tabpill`}
                    className="absolute inset-0 rounded-[16px] bg-white shadow-md"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================= SEÇİLİ KATEGORİ ======================== */}
      <section
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="relative -mt-12 overflow-hidden bg-cream-200 pb-16 pt-28"
      >
        {FLOATERS.map((f, i) => (
          <div
            key={i}
            aria-hidden
            className={`float absolute ${i > 3 ? "hidden sm:block" : ""}`}
            style={{ left: f.l, top: f.t, width: f.s, height: f.s, ["--r" as string]: `${f.r}deg`, ["--dur" as string]: `${5 + i}s`, ["--fd" as string]: `${f.d}s`, ["--float" as string]: "-16px", ["--tilt" as string]: "12deg" }}
          >
            <CookieBadge className="h-full w-full drop-shadow-[0_14px_14px_rgba(90,40,0,.25)]" fill={i % 2 ? "var(--c-biskuvi)" : "#f0a43a"} />
          </div>
        ))}

        <div className="relative mx-auto max-w-[1100px] px-4 text-center sm:px-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30, rotate: -4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotate: -3, scale: 1 }}
              exit={{ opacity: 0, y: -20, rotate: 2, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <h2
                className="font-display text-[clamp(3.6rem,11vw,8.5rem)] font-extrabold leading-[0.9]"
                style={{
                  color: c.bg,
                  WebkitTextStroke: "2px var(--choco-900)",
                  textShadow: `1px 1px 0 ${c.shade}, 2px 2px 0 ${c.shade}, 3px 3px 0 ${c.shade}, 4px 4px 0 ${c.shade}, 5px 5px 0 ${c.shade}, 6px 6px 0 ${c.shade}, 7px 7px 0 ${c.shade}, 12px 16px 24px rgba(58,6,10,.35)`,
                }}
              >
                {c.name}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg font-bold text-choco-800">
                {c.tagline} · <span className="text-red-700">{c.count} ürün</span>
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Ortadaki ambalaj kompozisyonu */}
          <div className="relative mx-auto mt-6 aspect-[4/3] w-full max-w-[760px] sm:aspect-[16/9]">
            <AnimatePresence mode="popLayout" initial={false}>
              {c.packs.slice(0, 3).map((p, i) => {
                const s = SPOT_SLOTS[i];
                return (
                  <motion.div
                    key={c.slug + "-spot-" + p.slug}
                    className="absolute"
                    style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%`, zIndex: s.z }}
                    initial={{ y: 200, scale: 0.5, rotate: s.r * 3, opacity: 0 }}
                    animate={{ y: 0, scale: 1, rotate: s.r, opacity: 1 }}
                    exit={{ y: -120, scale: 0.7, opacity: 0, transition: { duration: 0.25 } }}
                    transition={{ type: "spring", stiffness: 240, damping: 17, delay: 0.1 + i * 0.09 }}
                  >
                    <Link href={`/urun/${p.slug}`} className="float group block" style={{ ["--dur" as string]: `${5 + i}s`, ["--fd" as string]: `${-i * 1.5}s`, ["--float" as string]: "-12px" }}>
                      <Image
                        src={p.src}
                        alt={p.name}
                        width={p.width}
                        height={p.height}
                        sizes="(min-width: 768px) 320px, 45vw"
                        className="h-auto max-h-[210px] w-full object-contain drop-shadow-[0_28px_24px_rgba(58,6,10,.35)] sm:max-h-[300px] transition-transform duration-500 [transition-timing-function:var(--ease-out-back)] group-hover:-rotate-3 group-hover:scale-110"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {c.subs.length > 0 && (
            <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label={`${c.name} alt kategorileri`}>
              {c.subs.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/urunler/${c.slug}?alt=${s.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-choco-900 shadow-sm ring-2 ring-red/15 transition-transform hover:-translate-y-0.5 hover:ring-red"
                  >
                    {s.name} <span className="text-red-700">{s.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Aralıklı dev bağlantı yazısı: harfler dalgalanır */}
          <Link
            href={`/urunler/${c.slug}`}
            className="group mt-10 inline-flex flex-wrap justify-center font-display text-[clamp(1.6rem,5vw,3.6rem)] font-extrabold text-red-600"
          >
            <span className="sr-only">Lezzeti keşfet: {c.name} ürünleri</span>
            {word.map((ch, i) => (
              <span
                key={i}
                aria-hidden
                className="letter-wave inline-block transition-colors group-hover:text-red-900"
                style={{ ["--d" as string]: `${i * 80}ms`, margin: "0 0.16em", minWidth: ch === " " ? "0.6em" : undefined }}
              >
                {ch}
              </span>
            ))}
          </Link>
        </div>
      </section>
    </MotionConfig>
  );
}

function HeroPack({
  p,
  s,
  i,
  dir,
  z,
}: {
  p: ShowPack;
  s: (typeof HERO_SLOTS)[number];
  i: number;
  dir: number;
  z: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${s.x}%`, top: `${s.y}%`, width: `max(${s.w}%, 96px)`, zIndex: z }}
      initial={{ x: dir * 420, y: 40, rotate: s.r + dir * 40, opacity: 0, scale: 0.7 }}
      animate={{ x: 0, y: 0, rotate: s.r, opacity: 1, scale: 1 }}
      exit={{ x: -dir * 420, rotate: s.r - dir * 40, opacity: 0, scale: 0.7, transition: { duration: 0.35 } }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.06 }}
    >
      <Link href={`/urun/${p.slug}`} className="float group block" style={{ ["--dur" as string]: `${4.5 + i * 0.8}s`, ["--fd" as string]: `${-i}s`, ["--float" as string]: "-14px" }}>
        <Image
          src={p.src}
          alt={p.name}
          width={p.width}
          height={p.height}
          priority={i < 2}
          sizes="(min-width: 1024px) 260px, 30vw"
          className="h-auto max-h-[230px] w-full object-contain drop-shadow-[0_26px_22px_rgba(60,0,4,.45)] transition-transform duration-500 [transition-timing-function:var(--ease-out-back)] group-hover:scale-110"
        />
      </Link>
    </motion.div>
  );
}
