"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** `.reveal` sınıflı öğeleri görünür olduklarında `.is-in` ile açar. JS yoksa içerik zaten görünür. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in), .reveal-pop:not(.is-in), .light-up:not(.is-in), [data-countup]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            en.target.dispatchEvent(new CustomEvent("reveal"));
            io.unobserve(en.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
