import Image from "next/image";
import Link from "next/link";
import { AniLogo } from "./AniLogo";

export type CardData = {
  slug: string;
  name: string;
  description: string | null;
  categoryName: string;
  subName: string | null;
  color: string;
  soft: string;
  weight: string | null;
  origin: string;
  image: { src: string; width: number; height: number; background: "white" | "transparent" } | null;
  code: string | null;
};

export function ProductCardView({ p, priority = false, headingLevel = "h3" }: { p: CardData; priority?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <Link
      href={`/urun/${p.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-white p-3 shadow-[0_18px_40px_-26px_rgba(138,9,16,.55)] ring-2 ring-red/10 transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-out-back)] hover:-translate-y-2 hover:rotate-[-0.6deg] hover:shadow-[0_30px_50px_-24px_rgba(138,9,16,.6)] hover:ring-red"
    >
      <div className="card-shine relative aspect-square overflow-hidden rounded-[22px]" style={{ background: p.soft }}>
        <span
          aria-hidden
          className="absolute -bottom-10 left-1/2 h-3/4 w-3/4 -translate-x-1/2 rounded-full opacity-40 blur-2xl transition-transform duration-700 group-hover:scale-125"
          style={{ background: p.color }}
        />
        {p.image ? (
          <div className={`lift-pack absolute inset-[8%] ${p.image.background === "white" ? "pack-white" : ""}`}>
            <Image
              src={p.image.src}
              alt={`${p.name} ambalajı`}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw"
              className={`object-contain ${p.image.background === "white" ? "" : "drop-shadow-[0_18px_22px_rgba(43,22,10,.28)]"}`}
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
            <AniLogo className="h-10 w-auto opacity-80" />
            <span className="max-w-[16ch] text-xs font-semibold text-choco-700">Ambalaj görseli kaynakta ayrı olarak yok</span>
          </div>
        )}
        {p.origin === "katalog" && (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-red-600 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-white shadow">
            2026 Katalog
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-1.5 pb-1.5 pt-3.5">
        <p className="flex flex-wrap items-center gap-x-1.5 text-[0.78rem] font-bold uppercase tracking-wide text-choco-700">
          <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.categoryName}
          {p.subName && p.subName !== p.categoryName && <span className="font-semibold normal-case tracking-normal text-choco-500">· {p.subName}</span>}
        </p>
        <H className="font-display text-[1.2rem] font-extrabold leading-tight text-choco-900">{p.name}</H>
        {p.description && p.description.toLocaleLowerCase("tr") !== p.name.toLocaleLowerCase("tr") && (
          <p className="line-clamp-2 text-[0.92rem] leading-snug text-choco-700">{p.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2.5">
          <span className="text-sm font-bold text-choco-800">{p.weight ?? ""}</span>
          <span className="inline-flex items-center gap-1 text-sm font-extrabold text-red-700">
            İncele
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
