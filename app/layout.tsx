import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { categories, categoryTheme } from "@/lib/data";
import { company, contact, social } from "@/data/site";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["600", "700", "800"],
});
const sans = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anibiskuvi.com.tr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Anı Bisküvi – Bisküvi, Çikolata, Kek, Gofret ve Daha Fazlası", template: "%s | Anı Bisküvi" },
  description: company.description,
  applicationName: "Anı Bisküvi",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Anı Bisküvi",
    images: [{ url: "/assets/site/fabrika.webp", width: 780, height: 1123, alt: "Anı Bisküvi Karaman tesisi" }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#fbf3e4",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  alternateName: company.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/site/ani-logo.svg`,
  foundingDate: "1994-12-21",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Organize Sanayi Bölgesi 16. Cadde No:16",
    addressLocality: "Karaman",
    addressCountry: "TR",
  },
  telephone: "+90 338 224 12 30",
  email: contact.hq.email,
  sameAs: social.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navCats = categories.map((c) => ({ slug: c.slug, name: c.name, count: c.productCount, color: categoryTheme[c.slug].bg }));
  return (
    <html lang="tr" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="min-h-dvh">
        <a href="#icerik" className="skip-link">
          İçeriğe geç
        </a>
        <Header categories={navCats} />
        <main id="icerik" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
