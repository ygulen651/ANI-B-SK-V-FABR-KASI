"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { AniLogo } from "./AniLogo";
import { mainNav, catalog, contact } from "@/data/site";

type NavCategory = { slug: string; name: string; count: number; color: string };

export function Header({ categories }: { categories: NavCategory[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sayfa değişince mobil menüyü kapat
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a,button");
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/") || (href === "/urunler" && pathname.startsWith("/urun/"));

  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden className="scroll-progress" />
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          open
            ? "bg-white"
            : scrolled
              ? "bg-white/95 shadow-[0_10px_30px_-14px_rgba(138,9,16,.45)] backdrop-blur-md"
              : "bg-white"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center gap-4 px-4 transition-[height] duration-300 sm:px-6 lg:px-10 ${
            scrolled ? "h-16" : "h-20 lg:h-24"
          }`}
        >
          <Link href="/" className="group relative z-10 shrink-0" aria-label="Anı Bisküvi ana sayfa">
            <AniLogo
              className={`w-auto transition-[height,transform] duration-300 group-hover:-rotate-3 ${scrolled ? "h-9" : "h-11 lg:h-14"}`}
            />
          </Link>

          <nav aria-label="Ana menü" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.href === "/urunler" ? (
                  <li key={item.href} className="group/dd relative">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={navCls(isActive(item.href))}
                    >
                      {item.label}
                      <svg aria-hidden viewBox="0 0 12 12" className="ml-1 inline h-3 w-3 transition-transform group-hover/dd:rotate-180 group-focus-within/dd:rotate-180">
                        <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </Link>
                    <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-300 group-hover/dd:visible group-hover/dd:translate-y-0 group-hover/dd:opacity-100 group-focus-within/dd:visible group-focus-within/dd:translate-y-0 group-focus-within/dd:opacity-100">
                      <ul className="grid grid-cols-2 gap-2 rounded-[28px] bg-cream-50 p-3 shadow-[0_30px_60px_-25px_rgba(43,22,10,.5)] ring-1 ring-choco-900/5">
                        {categories.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/urunler/${c.slug}`}
                              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 font-bold text-choco-900 transition-colors hover:bg-cream-200"
                            >
                              <span aria-hidden className="h-3.5 w-3.5 rounded-full" style={{ background: c.color }} />
                              {c.name}
                              <span className="ml-auto text-sm font-semibold text-choco-700">{c.count}</span>
                            </Link>
                          </li>
                        ))}
                        <li className="col-span-2">
                          <Link href="/urunler" className="flex items-center justify-between rounded-2xl bg-choco-900 px-4 py-3 font-bold text-cream-50">
                            Tüm ürünler <span aria-hidden>→</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={navCls(isActive(item.href))}>
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <a
            href={catalog.href}
            target="_blank"
            rel="noopener"
            className="btn btn-primary ml-auto hidden !min-h-11 !px-5 text-[0.95rem] sm:inline-flex lg:ml-4"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
              <path d="M5 3h9l5 5v13H5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M9 13h6M9 17h6M14 3v5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            E-Katalog <span className="sr-only">(PDF, yeni sekmede açılır)</span>
          </a>

          <button
            ref={menuBtn}
            type="button"
            className={`relative z-[60] ml-auto grid h-12 w-12 place-items-center rounded-full sm:ml-2 lg:hidden ${open ? "bg-white text-red-700" : "bg-red-600 text-white"}`}
            aria-expanded={open}
            aria-controls="mobil-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-4 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[14px] h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobil-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menüsü"
              className="on-dark fixed inset-x-0 bottom-0 top-0 z-50 overflow-y-auto bg-red-600 px-5 pb-10 pt-24 text-white lg:hidden"
              initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
              animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
              exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            >
              <nav aria-label="Mobil menü">
                <ul className="space-y-1">
                  {mainNav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.05, duration: 0.45 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="font-display flex items-center justify-between rounded-2xl px-3 py-3 text-[2rem] font-extrabold leading-none text-white aria-[current=page]:bg-white/15"
                      >
                        {item.label}
                        <span aria-hidden className="text-xl">→</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <motion.ul
                className="mt-6 flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                aria-label="Ürün kategorileri"
              >
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/urunler/${c.slug}`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-choco-900">
                      <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                      {c.name}
                    </Link>
                  </li>
                ))}
              </motion.ul>
              <div className="mt-8 flex flex-col gap-3">
                <a href={catalog.href} target="_blank" rel="noopener" className="btn btn-cream w-full">
                  E-Katalog {catalog.year} (PDF)
                </a>
                <a href={contact.hq.phone.href} className="btn btn-outline-white w-full">
                  {contact.hq.phone.label}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}

function navCls(active: boolean) {
  return `relative inline-flex items-center rounded-full px-3.5 py-2 text-[0.98rem] font-bold transition-colors xl:px-4 ${
    active ? "bg-red-600 text-white" : "text-choco-900 hover:bg-cream-200 hover:text-red-700"
  }`;
}
