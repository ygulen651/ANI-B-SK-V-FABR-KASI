import Link from "next/link";
import { Crumbs, Wave } from "./Decor";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anibiskuvi.com.tr";

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const all = [{ href: "/", label: "Ana Sayfa" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: SITE_URL + c.href })),
  };
  return (
    <nav aria-label="Konum" className={`text-sm font-semibold ${tone === "light" ? "text-cream-100" : "text-choco-700"}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page" className="font-bold">{c.label}</span>
            ) : (
              <Link href={c.href} className="underline-offset-4 hover:underline">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  bg = "var(--ani-red-600)",
  ink = "#fff",
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: React.ReactNode;
  crumbs: Crumb[];
  bg?: string;
  ink?: string;
  children?: React.ReactNode;
}) {
  const dark = ink !== "var(--choco-900)";
  return (
    <section className={`relative ${dark ? "on-dark" : ""}`}>
      <div
        className={`relative overflow-hidden ${dark ? "" : "-mt-20 pt-20 lg:-mt-24 lg:pt-24"}`}
        style={{ background: bg, color: ink }}
      >
        <div aria-hidden className="sunburst spin-slow no-mobile-motion absolute -right-56 -top-56 h-[720px] w-[720px] opacity-90" />
        {[12, 34, 58, 77, 90].map((l, i) => (
          <span
            key={l}
            aria-hidden
            className="drift mobile-hide"
            style={{
              left: `${l}%`,
              bottom: "-8%",
              width: 8 + (i % 3) * 4,
              height: 8 + (i % 3) * 4,
              borderRadius: i % 2 ? "3px" : "9999px",
              background: i % 2 ? "var(--c-gofret)" : "rgba(255,255,255,.8)",
              ["--dur" as string]: `${9 + i * 1.5}s`,
              ["--fd" as string]: `${-i * 2.2}s`,
              ["--dy" as string]: "-360px",
              ["--dx" as string]: `${i % 2 ? -30 : 30}px`,
              ["--o" as string]: ".7",
            }}
          />
        ))}
        <Crumbs tone={dark ? "cream" : "choco"} className="float absolute -right-4 top-6 h-44 w-44 opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-4 pb-10 pt-8 sm:px-6 lg:px-10 lg:pb-14 lg:pt-10">
          <Breadcrumbs items={crumbs} tone={dark ? "light" : "dark"} />
          <div className={`relative z-10 ${children ? "md:max-w-[54%]" : ""}`}>
          {eyebrow && (
            <p className={`intro mt-8 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-extrabold uppercase tracking-[0.14em] ${dark ? "bg-white text-red-700" : "bg-red-600 text-white"}`}>
              <span aria-hidden className={`h-2 w-2 rounded-full ${dark ? "bg-red" : "bg-white"}`} />
              {eyebrow}
            </p>
          )}
          <h1 className="bounce-word font-display mt-3 max-w-[18ch] text-[clamp(2.6rem,7vw,5.6rem)] font-extrabold leading-[0.92] text-balance" style={{ ["--d" as string]: "80ms" }}>
            {title}
          </h1>
          {lead && (
            <div className="intro mt-5 max-w-[62ch] text-lg leading-relaxed opacity-95" style={{ ["--d" as string]: "160ms" }}>
              {lead}
            </div>
          )}
          </div>
          {children}
        </div>
      </div>
      <Wave color={bg} flip animated />
    </section>
  );
}
