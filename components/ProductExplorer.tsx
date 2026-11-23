"use client";

import { useMemo, useState, useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ProductCardView, type CardData } from "./ProductCardView";
import { normalizeTr } from "@/lib/normalize";

export type ExplorerItem = CardData & { category: string; subcategory: string | null; search: string };
export type ExplorerCategory = { slug: string; name: string; color: string; count: number; subs: { slug: string; name: string; count: number }[] };

const PAGE = 24;

export function ProductExplorer({
  items,
  categories,
  fixedCategory,
}: {
  items: ExplorerItem[];
  categories: ExplorerCategory[];
  /** Kategori sayfasında kategori sabittir; yalnızca alt kategori filtresi gösterilir */
  fixedCategory?: string;
}) {
  const searchId = useId();
  const hydrated = useRef(false);

  // Izgara sunucuda filtresiz render edilir (düzen kayması olmaz); URL parametreleri yüklemeden sonra uygulanır.
  const [cat, setCat] = useState<string>(fixedCategory ?? "");
  const [sub, setSub] = useState<string>("");
  const [q, setQ] = useState<string>("");
  const [limit, setLimit] = useState(PAGE);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const k = sp.get("kategori");
    if (!fixedCategory && k && categories.some((c) => c.slug === k)) setCat(k);
    if (sp.get("alt")) setSub(sp.get("alt")!);
    if (sp.get("q")) setQ(sp.get("q")!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // URL'yi filtrelerle senkron tut (paylaşılabilir bağlantı), sayfayı yeniden yüklemeden
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true; // ilk çalışmada URL'ye dokunma (parametreler henüz okunuyor)
      return;
    }
    const t = setTimeout(() => {
      const sp = new URLSearchParams();
      if (!fixedCategory && cat) sp.set("kategori", cat);
      if (sub) sp.set("alt", sub);
      if (q.trim()) sp.set("q", q.trim());
      const next = sp.toString();
      const url = next ? `${window.location.pathname}?${next}` : window.location.pathname;
      if (url !== window.location.pathname + window.location.search) window.history.replaceState(window.history.state, "", url);
    }, 250);
    return () => clearTimeout(t);
  }, [cat, sub, q, fixedCategory]);

  const activeCat = categories.find((c) => c.slug === cat);
  const results = useMemo(() => {
    const nq = normalizeTr(q.trim());
    const terms = nq.split(/\s+/).filter(Boolean);
    return items.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!sub || p.subcategory === sub) &&
        terms.every((t) => p.search.includes(t)),
    );
  }, [items, cat, sub, q]);

  const visible = results.slice(0, limit);

  const pickCat = (slug: string) => {
    setCat(slug);
    setSub("");
    setLimit(PAGE);
  };

  const reset = () => {
    if (!fixedCategory) setCat("");
    setSub("");
    setQ("");
    setLimit(PAGE);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="sticky top-16 z-30 -mx-4 bg-cream-100/95 px-4 pb-4 pt-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative w-full shrink-0 lg:w-80">
            <label htmlFor={searchId} className="sr-only">
              Ürün adına göre ara
            </label>
            <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-choco-700">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <input
              id={searchId}
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setLimit(PAGE);
              }}
              placeholder="Ürün adı, açıklama ya da kod ara…"
              autoComplete="off"
              className="h-14 w-full rounded-full border-0 bg-cream-50 pl-12 pr-12 text-base font-semibold text-choco-900 shadow-[inset_0_0_0_2px_rgba(43,22,10,.12)] placeholder:text-choco-500 focus:shadow-[inset_0_0_0_2.5px_var(--ani-red)] focus:outline-none"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-cream-200 text-choco-900"
                aria-label="Aramayı temizle"
              >
                ×
              </button>
            )}
          </div>

          {!fixedCategory && (
            <div role="group" aria-label="Kategori filtresi" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible">
              <FilterChip active={!cat} onClick={() => pickCat("")} color="var(--choco-900)">
                Tümü <span className="opacity-70">{items.length}</span>
              </FilterChip>
              {categories.map((c) => (
                <FilterChip key={c.slug} active={cat === c.slug} onClick={() => pickCat(c.slug)} color={c.color}>
                  {c.name} <span className="opacity-70">{c.count}</span>
                </FilterChip>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence initial={false}>
          {activeCat && activeCat.subs.length > 1 && (
            <motion.div
              key={activeCat.slug}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              role="group"
              aria-label={`${activeCat.name} alt kategorileri`}
              className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]"
            >
              <SubChip active={!sub} onClick={() => { setSub(""); setLimit(PAGE); }}>Tümü</SubChip>
              {activeCat.subs.map((s) => (
                <SubChip key={s.slug} active={sub === s.slug} onClick={() => { setSub(s.slug); setLimit(PAGE); }}>
                  {s.name} <span className="opacity-60">{s.count}</span>
                </SubChip>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-6 text-lg font-bold text-choco-800" role="status" aria-live="polite">
        {results.length > 0 ? (
          <>
            <span className="font-display text-2xl font-extrabold text-choco-900">{results.length}</span> ürün bulundu
            {q.trim() && (
              <>
                {" "}· “<span className="text-red-700">{q.trim()}</span>”
              </>
            )}
          </>
        ) : (
          "Sonuç bulunamadı"
        )}
      </p>

      {results.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-[36px] bg-cream-50 px-6 py-16 text-center ring-1 ring-choco-900/5">
          <svg aria-hidden viewBox="0 0 120 120" className="h-28 w-28">
            <circle cx="60" cy="60" r="50" fill="var(--c-biskuvi)" />
            <path d="M60 10 a50 50 0 0 1 43 25 l-18 10 l8 14 l-20 6 z" fill="var(--cream-100)" />
            <circle cx="42" cy="52" r="4" fill="var(--choco-700)" />
            <circle cx="70" cy="74" r="4" fill="var(--choco-700)" />
            <circle cx="45" cy="82" r="4" fill="var(--choco-700)" />
          </svg>
          <h2 className="font-display mt-4 text-3xl font-extrabold">Bu tarifte ürün yok</h2>
          <p className="mt-2 max-w-md text-choco-700">
            Aramanızı kısaltmayı, Türkçe karakter olmadan yazmayı ya da filtreleri temizlemeyi deneyin.
          </p>
          <button type="button" onClick={reset} className="btn btn-primary mt-6">
            Filtreleri temizle
          </button>
        </div>
      ) : (
        <motion.ul layout className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.slug}
                layout="position"
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1], delay: Math.min(i % PAGE, 12) * 0.02 }}
              >
                <ProductCardView p={p} priority={i < 4} headingLevel="h2" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {results.length > limit && (
        <div className="mt-10 flex flex-col items-center gap-2">
          <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="btn btn-dark">
            Daha fazla göster
          </button>
          <p className="text-sm font-semibold text-choco-700">
            {visible.length} / {results.length} ürün gösteriliyor
          </p>
        </div>
      )}
    </MotionConfig>
  );
}

function FilterChip({ active, onClick, color, children }: { active: boolean; onClick: () => void; color: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`relative inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[0.95rem] font-extrabold transition-[transform,background-color,color] duration-300 [transition-timing-function:var(--ease-out-back)] hover:-translate-y-0.5 ${
        active ? "bg-red-600 text-white shadow-[0_8px_18px_-8px_rgba(212,17,26,.8)]" : "bg-white text-choco-900 ring-2 ring-red/15 hover:bg-cream-200"
      }`}
    >
      <span aria-hidden className="h-3 w-3 rounded-full ring-2 ring-cream-50/70" style={{ background: color }} />
      {children}
    </button>
  );
}

function SubChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-sm font-bold transition-colors ${
        active ? "bg-red-700 text-white" : "bg-cream-200 text-choco-900 hover:bg-cream-300"
      }`}
    >
      {children}
    </button>
  );
}
