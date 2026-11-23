# Anı Bisküvi – Kurumsal ve Ürün Tanıtım Sitesi

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion. Tüm sayfalar statik olarak üretilir (480 sayfa).

## Çalıştırma

```bash
npm install
npm run dev          # geliştirme: http://localhost:3000
npm run build        # üretim derlemesi
npm run start        # üretim sunucusu
npm run lint         # TypeScript denetimi
```

Kanonik adresler ve site haritası için yayın alan adını `NEXT_PUBLIC_SITE_URL` ile verin (varsayılan `https://www.anibiskuvi.com.tr`).

## Yapı

| Klasör | İçerik |
|---|---|
| `app/` | Sayfalar: ana sayfa, `/urunler`, `/urunler/[kategori]`, `/urun/[slug]`, `/kurumsal/[sayfa]`, `/kalite`, `/ihracat`, `/medya`, `/medya/[slug]`, `/iletisim`, `/kariyer`, `sitemap.xml`, `robots.txt` |
| `components/` | Yeniden kullanılabilir bileşenler (menü, ürün kartı/gezgini, açılış sahnesi, ihracat haritası, form…) |
| `data/` | `products.json` (422 ürün), `categories.json`, `news.json`, `site.ts` (kurumsal metinler, iletişim, politikalar) |
| `lib/` | Veri erişimi ve yardımcılar |
| `public/assets/` | Yerel ürün/haber/kurumsal görselleri (WebP), logo, E-Katalog PDF |
| `scripts/content-import/` | İçerik aktarım betikleri |

İçerik kaynakları, eşleştirme kuralları, eksikler ve çelişkiler: **[CONTENT_SOURCES.md](CONTENT_SOURCES.md)**.

## Notlar

- Açılış başlığı “Her Anına Bir Lezzet!” tasarım için önerilen bir reklam metnidir; şirketin resmî sloganı olarak sunulmaz.
- İletişim formunun sunucu tarafı gönderim altyapısı yoktur; form doğrulama yapar ve mesajı kullanıcının e-posta uygulamasında hazırlar. Gerçek bir gönderim servisi bağlandığında `components/ContactForm.tsx` güncellenmelidir.
- Animasyonlar `prefers-reduced-motion` tercihine uyar; JavaScript kapalıyken tüm içerik görünür kalır.
