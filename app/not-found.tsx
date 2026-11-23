import type { Metadata } from "next";
import Link from "next/link";
import { CookieBadge } from "@/components/Decor";

export const metadata: Metadata = { title: "Sayfa bulunamadı" };

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[800px] flex-col items-center px-4 py-24 text-center">
      <div className="relative">
        <CookieBadge className="h-40 w-40" />
        <span aria-hidden className="absolute -right-2 top-2 h-14 w-14 rounded-full bg-cream-100" />
      </div>
      <h1 className="font-display mt-8 text-[clamp(2.6rem,7vw,4.5rem)] font-extrabold leading-none">Bu sayfanın bir ısırığı eksik</h1>
      <p className="mt-4 max-w-md text-lg text-choco-800">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">Ana sayfa</Link>
        <Link href="/urunler" className="btn btn-ghost">Ürünler</Link>
      </div>
    </section>
  );
}
