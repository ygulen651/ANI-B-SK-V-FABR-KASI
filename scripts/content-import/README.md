# İçerik aktarım betikleri

Sitedeki ürün, haber ve katalog verilerini üretmek için kullanılan betikler. Ayrıntılı kaynak envanteri: `../../CONTENT_SOURCES.md`.

Gereksinimler: Python 3, `curl`, `pdftoppm`/`pdftotext` (poppler), `cwebp`, Python paketleri `pymupdf` ve `pillow` (ayrı bir sanal ortama kurun).

Sıra (`SRC` geçici bir çalışma klasörü olsun):

1. `python3 crawl.py $SRC/pages` – anibiskuvi.com.tr iç sayfalarını indirir (yalnızca aynı alan adı).
2. `python3 parse_products.py $SRC/pages $SRC/products_raw.json` – ürün detay sayfalarını ayrıştırır.
3. `python3 parse_news.py $SRC/pages $SRC/news_raw.json` – haberleri ayrıştırır.
4. Katalog PDF'ini `$SRC/pdf/Katalog.pdf` olarak indirin; `python parse_catalog2.py $SRC/pdf/Katalog.pdf $SRC/catalog_raw.json`.
5. `python cat_images.py $SRC/pdf/Katalog.pdf $SRC/catalog_raw.json $SRC/catimg $SRC/products_raw.json` – katalogdaki alfa maskeli ambalaj kesimlerini çıkarır.
6. Ürün görsellerini `$SRC/img` klasörüne indirin (ürün sayfalarındaki `buyukGorsel` adresleri).
7. `python build_data.py $SRC <proje-klasörü>` – `data/products.json`, `data/categories.json` üretir ve görselleri WebP'ye çevirir.

`curation.py`, yalnızca katalogda bulunan ürünlerin adlarını/kategorilerini katalogdaki TR/EN metinlere sadık kalarak elle eşler; görsel eşleşmeleri sayfa görüntüleriyle tek tek kontrol edilmiştir.
