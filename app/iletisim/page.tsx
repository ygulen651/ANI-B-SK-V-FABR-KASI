import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Anı Bisküvi merkez ve fabrika (Karaman) ile İstanbul Bölge Müdürlüğü iletişim bilgileri.",
  alternates: { canonical: "/iletisim" },
};

function Office({ o }: { o: typeof contact.hq | typeof contact.istanbul }) {
  return (
    <section className="rounded-[32px] bg-cream-50 p-7 ring-1 ring-choco-900/5">
      <h2 className="font-display text-2xl font-extrabold">{o.title}</h2>
      <address className="mt-3 not-italic leading-relaxed text-choco-800">
        {o.address.map((l) => (
          <span key={l} className="block">{l}</span>
        ))}
      </address>
      <dl className="mt-4 space-y-1.5">
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-bold">Telefon:</dt>
          <dd><a href={o.phone.href} className="font-bold text-red-700 underline underline-offset-4">{o.phone.label}</a></dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-bold">Faks:</dt>
          <dd>{o.fax}</dd>
        </div>
        {"email" in o && (
          <>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">E-posta:</dt>
              <dd><a href={`mailto:${o.email}`} className="font-bold text-red-700 underline underline-offset-4">{o.email}</a></dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">KEP:</dt>
              <dd className="break-all">{o.kep}</dd>
            </div>
          </>
        )}
      </dl>
      {"mapUrl" in o && (
        <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-6 !min-h-11 text-sm">
          Haritada aç <span className="sr-only">(Google Haritalar, yeni sekme)</span>
        </a>
      )}
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Bir bisküvi molası kadar yakınız"
        crumbs={[{ href: "/iletisim", label: "İletişim" }]}
        lead={<p>Sorularınız, iş birliği ve ihracat talepleriniz için telefon ve e-posta kanallarımızı kullanabilirsiniz.</p>}
      />
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-10">
        <div className="space-y-5">
          <Office o={contact.hq} />
          <Office o={contact.istanbul} />
        </div>
        <section aria-labelledby="form-baslik" className="rounded-[36px] bg-cream-200 p-7 sm:p-10">
          <h2 id="form-baslik" className="font-display text-3xl font-extrabold">İletişim formu</h2>
          <p className="mt-2 text-choco-800">Formu doldurun; mesajınızı e-posta uygulamanızda hazırlayalım.</p>
          <div className="mt-6">
            <Suspense fallback={null}>
              <ContactForm email={contact.hq.email} />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}
