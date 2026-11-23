import Link from "next/link";
import { AniLogo } from "./AniLogo";
import { Wave } from "./Decor";
import { categories } from "@/lib/data";
import { contact, corporatePages, social, catalog, officialLanguageSites } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark relative mt-24 text-white">
      <Wave color="var(--ani-red-700)" variant={1} animated />
      <div className="relative overflow-hidden bg-red-700">
        <div aria-hidden className="sunburst spin-slow no-mobile-motion absolute -bottom-72 -right-60 h-[700px] w-[700px] opacity-60" />
        <div className="relative mx-auto grid max-w-[1400px] gap-12 px-4 pb-10 pt-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:px-10">
          <div>
            <Link href="/" aria-label="Anı Bisküvi ana sayfa" className="wobble inline-block rounded-full bg-white px-4 py-3 shadow-lg" style={{ ["--r" as string]: "-2deg" }}>
              <AniLogo className="h-12 w-auto" />
            </Link>
            <address className="mt-6 not-italic leading-relaxed text-white/90">
              <strong className="block font-display text-lg text-white">{contact.hq.title}</strong>
              {contact.hq.address.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
              <a href={contact.hq.phone.href} className="mt-3 block font-bold text-white underline-offset-4 hover:underline">
                Tel: {contact.hq.phone.label}
              </a>
              <span className="block">Faks: {contact.hq.fax}</span>
              <a href={`mailto:${contact.hq.email}`} className="block font-bold text-white underline-offset-4 hover:underline">
                {contact.hq.email}
              </a>
              <span className="block text-sm text-white/85">KEP: {contact.hq.kep}</span>
            </address>
          </div>

          <nav aria-label="Ürün kategorileri">
            <h2 className="font-display text-lg font-extrabold text-white">Ürünler</h2>
            <ul className="mt-4 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/urunler/${c.slug}`} className="text-white/90 underline-offset-4 hover:text-white hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <a href={catalog.href} target="_blank" rel="noopener" className="font-bold text-white underline-offset-4 hover:underline">
                  E-Katalog {catalog.year} (PDF)
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Kurumsal">
            <h2 className="font-display text-lg font-extrabold text-white">Kurumsal</h2>
            <ul className="mt-4 space-y-2">
              {corporatePages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/kurumsal/${p.slug}`} className="text-white/90 underline-offset-4 hover:text-white hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
              {[
                ["/kalite", "Kalite & Belgeler"],
                ["/ihracat", "İhracat"],
                ["/medya", "Haberler & Medya"],
                ["/kariyer", "Kariyer"],
                ["/iletisim", "İletişim"],
              ].map(([h, l]) => (
                <li key={h}>
                  <Link href={h} className="text-white/90 underline-offset-4 hover:text-white hover:underline">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-lg font-extrabold text-white">Bizi takip edin</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-bold text-white ring-1 ring-white/30 transition-colors hover:bg-white hover:text-red-700"
                  >
                    {s.name}
                    <span className="sr-only">(yeni sekmede açılır)</span>
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 font-display text-lg font-extrabold text-white">{contact.istanbul.title}</h2>
            <address className="mt-2 not-italic leading-relaxed text-white/90">
              {contact.istanbul.address.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
              <a href={contact.istanbul.phone.href} className="block font-bold text-white underline-offset-4 hover:underline">
                Tel: {contact.istanbul.phone.label}
              </a>
            </address>
            <p className="mt-6 text-sm text-white/85">
              Diğer diller (mevcut resmî site):{" "}
              {officialLanguageSites.map((l, i) => (
                <span key={l.href}>
                  {i > 0 && " · "}
                  <a href={l.href} lang={l.lang} className="font-bold text-white underline underline-offset-4" target="_blank" rel="noopener">
                    {l.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="relative border-t border-white/20">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-6 text-sm text-white/85 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
            <p>© {year} Anı Bisküvi Gıda Sanayi ve Ticaret A.Ş.</p>
            <p>Karaman / Türkiye</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
