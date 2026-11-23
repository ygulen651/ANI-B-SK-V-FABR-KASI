import Image from "next/image";
import type { Product } from "@/lib/data";
import { AniLogo } from "./AniLogo";

/**
 * Ambalaj görseli. Oranı korunur (object-contain), kırpılmaz.
 * Beyaz zeminli site fotoğrafları `multiply` ile zemine karışır; katalog kesimleri zaten şeffaftır.
 */
export function PackImage({
  product,
  sizes,
  priority = false,
  className = "",
  imgClassName = "",
  index = 0,
}: {
  product: Product;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  index?: number;
}) {
  const img = product.images[index];
  if (!img) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 text-center ${className}`}>
        <AniLogo className="h-10 w-auto opacity-80" />
        <span className="max-w-[14ch] text-xs font-semibold text-choco-700">Ambalaj görseli kaynakta ayrı olarak yok</span>
      </div>
    );
  }
  return (
    <div className={`relative ${img.background === "white" ? "pack-white" : ""} ${className}`}>
      <Image
        src={img.src}
        alt={`${product.name} ambalajı`}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={`object-contain ${img.background === "white" ? "" : "drop-shadow-[0_18px_22px_rgba(43,22,10,.28)]"} ${imgClassName}`}
      />
    </div>
  );
}
