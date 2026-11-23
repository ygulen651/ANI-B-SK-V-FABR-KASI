import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80, 90],
  },
  async redirects() {
    // Eski site adreslerinden yeni yapıya yönlendirmeler
    return [
      { source: "/tarihcemiz", destination: "/kurumsal/tarihce", permanent: true },
      { source: "/misyon-vizyon", destination: "/kurumsal/misyon-vizyon", permanent: true },
      { source: "/baskanin-mesaji", destination: "/kurumsal/baskanin-mesaji", permanent: true },
      { source: "/sosyal-sorumluluk", destination: "/kurumsal/sosyal-sorumluluk", permanent: true },
      { source: "/kilometre-taslarimiz", destination: "/kurumsal/tarihce", permanent: true },
      { source: "/bilgi-toplumu-hizmeti", destination: "/kurumsal/bilgi-toplumu-hizmeti", permanent: true },
      { source: "/kurumsal-kimlik", destination: "/kurumsal/kurumsal-kimlik", permanent: true },
      { source: "/sertifikalar", destination: "/kalite#belgeler", permanent: true },
      { source: "/haberler", destination: "/medya", permanent: true },
      { source: "/galeri", destination: "/medya#video", permanent: true },
      { source: "/kategoriler/:slug/:id", destination: "/urunler/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
