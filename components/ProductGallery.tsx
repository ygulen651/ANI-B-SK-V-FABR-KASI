"use client";

import Image from "next/image";
import { useState } from "react";

type Img = { src: string; width: number; height: number; background: "white" | "transparent" };

export function ProductGallery({ images, name, soft, color }: { images: Img[]; name: string; soft: string; color: string }) {
  const [i, setI] = useState(0);
  const img = images[i];
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[44px]" style={{ background: soft }}>
        <span aria-hidden className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50" style={{ background: color }} />
        <span aria-hidden className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-dashed border-white/50 spin-slow no-mobile-motion" />
        <div key={img.src} className={`intro-pop absolute inset-[9%] ${img.background === "white" ? "pack-white" : ""}`}>
          <div className="float relative h-full w-full" style={{ ["--dur" as string]: "7s", ["--float" as string]: "-10px" }}>
            <Image
              src={img.src}
              alt={`${name} ambalajı${images.length > 1 ? ` – görsel ${i + 1}` : ""}`}
              fill
              priority
              sizes="(min-width: 1024px) 600px, 92vw"
              className={`object-contain ${img.background === "white" ? "" : "drop-shadow-[0_30px_26px_rgba(43,22,10,.35)]"}`}
            />
          </div>
        </div>
      </div>
      {images.length > 1 && (
        <ul className="mt-4 flex flex-wrap gap-3" aria-label="Ürün görselleri">
          {images.map((m, k) => (
            <li key={m.src}>
              <button
                type="button"
                onClick={() => setI(k)}
                aria-pressed={k === i}
                aria-label={`Görsel ${k + 1}`}
                className={`relative h-20 w-20 overflow-hidden rounded-2xl ring-2 transition ${k === i ? "ring-red" : "ring-transparent hover:ring-choco-900/30"}`}
                style={{ background: soft }}
              >
                <Image src={m.src} alt="" fill sizes="80px" className={`object-contain p-1.5 ${m.background === "white" ? "pack-white" : ""}`} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
