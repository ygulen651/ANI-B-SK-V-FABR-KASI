"use client";

import { useEffect, useRef, useState } from "react";

/** Kullanıcı kontrollü yatay vitrin: otomatik dönmez, ok tuşları ve sürükleme/kaydırma ile gezinilir. */
export function ShowcaseRail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={ref}
        aria-label={label}
        className="snap-row -mx-4 flex gap-4 overflow-x-auto px-4 pb-6 pt-2 sm:-mx-6 sm:gap-5 sm:px-6 lg:-mx-10 lg:px-10"
      >
        {children}
      </ul>
      <div className="mt-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={atStart}
          aria-label="Önceki ürünler"
          className="grid h-12 w-12 place-items-center rounded-full bg-choco-900 text-cream-50 transition-[transform,opacity] hover:-translate-y-0.5 disabled:opacity-30 disabled:hover:translate-y-0"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 rotate-180">
            <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={atEnd}
          aria-label="Sonraki ürünler"
          className="grid h-12 w-12 place-items-center rounded-full bg-choco-900 text-cream-50 transition-[transform,opacity] hover:-translate-y-0.5 disabled:opacity-30 disabled:hover:translate-y-0"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
            <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
