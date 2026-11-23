# İçerik Kaynakları ve Aktarım Raporu

Bu belge, sitede kullanılan tüm içeriklerin nereden geldiğini, nasıl eşleştirildiğini ve kaynaklardaki eksik ya da çelişkili bilgileri listeler.
İnceleme tarihi: 23 Kasım 2026.

## 1. Kaynaklar

| Kaynak | Adres | Durum |
|---|---|---|
| Resmî site (TR) | https://www.anibiskuvi.com.tr/ | 461 iç sayfa tarandı (ana sayfa, 6 kategori, 27 alt kategori + sayfalama, 347 ürün detayı, 32 haber, kurumsal sayfalar). |
| Ürün kataloğu | https://www.anibiskuvi.com.tr/assets/dosyalar/Katalog.pdf | 92 sayfa, 9,9 MB. PDF meta verisi: Adobe InDesign, oluşturma 15.05.2026; sunucu `last-modified`: 15 May 2026. Sitede yerel kopya: `public/assets/docs/ani-biskuvi-urun-katalogu-2026.pdf`. |
| Resmî site (EN / AR) | http://en.anibiskuvi.com.tr, http://ar.anibiskuvi.com.tr | Erişilebilir; **aktarılmadı** (bkz. §6). Footer'da çalışan bağlantı olarak verildi. |
| Sosyal medya | Instagram `anibiskuvia.s`, Facebook `AniBiskuvi`, YouTube kanalı | Kaynak sitenin footer'ında bağlantılı; üçü de yanıt veriyor. Twitter bağlantısı kaynakta boş (`#.`) olduğundan eklenmedi. |

Referans siteler (ulker.com.tr, mms.com) yalnızca yapı ve atmosfer fikri için incelendi; logo, karakter, metin veya tasarım aktarılmadı.

### Aktarılmayan üçüncü taraf içerik
Kaynak sitenin her sayfasında gizli bir `<marquee width="1" height="1">` içinde sahte çanta/saat/takı sitelerine giden 50'den fazla spam bağlantı bulunuyor. Bunlar **aktarılmadı**. Bu durum kaynak sitenin ele geçirilmiş (SEO spam enjeksiyonu) olabileceğine işaret ediyor; mevcut sitenin sahibine bildirilmesi önerilir.

## 2. Ürün aktarımı

| | Adet |
|---|---|
| Sitedeki ürün kayıtları (her biri ayrı ürün detay sayfası) | 347 |
| – Katalogda aynı ürün koduyla eşleşen | 243 |
| – Yalnızca sitede bulunan (koduna katalogda rastlanmadı) | 104 |
| Yalnızca katalogda bulunan ürünler (yeni kayıt) | 75 |
| **Toplam** | **422** |
| Ana kategori | 7 (sitedeki 6 + katalogdaki **Makarna**) |

**Eşleştirme kuralı:** Sitedeki “ÇEŞİT NUMARASI” ile katalogdaki “Ürün Kodu” aynı değerdir. Aynı kod iki kaynakta da varsa tek kayıt oluşturuldu; site verisi “Ürün bilgileri”, katalog verisi “2026 ürün kataloğu” tablosunda kaynak bağlantısıyla ayrı ayrı gösterilir. Aynı kodun özdeş katalog sütunları tekilleştirildi.

**Tablo sütunları tahmin edilmedi:** Sitedeki tablolar etiketlidir (ÇEŞİT NUMARASI, GRAMAJ, KOLİ İÇİ ADET, 40" HC KONTEYNER). Katalogdaki etiketler metin değil görseldir; sayfa görüntüsü (s.8) yüksek çözünürlükte açılarak “Ürün Kodu / Code No, Ağırlık / Weight, Koli içi Adet / Quantity in Box, 40 HC CONTAINER” olduğu doğrulandı. Katalog değerleri PDF'teki metin katmanından konumlarına göre okundu; sorunlu sayfalar (5, 7, 9, 49, 51, 61, 72, 79, 85) sayfa görüntüleriyle tek tek kontrol edildi.

**Kategori yapısı:** Sitedeki kategori/alt kategori kırıntıları korunmuştur. Katalogdaki Marshmallow sayfaları sitede olduğu gibi *Bisküvi › Marshmallow Bisküvi* altına, Bar/Chocolate sayfaları *Çikolata › Bar* altına alınmıştır. Makarna (katalog s.4–6) yeni ana kategoridir. Pretzel, Üçgen ve Paprika krakeri için sitede uygun alt kategori olmadığından alt kategori atanmadı.

**Veri dosyaları:** `data/products.json`, `data/categories.json`, `data/news.json`, `data/site.ts`. Her ürün kaydında `sources` alanında kaynak URL (site ürün sayfası ve/veya `Katalog.pdf#page=N`), `sourceId`/`sourceSlug` ile özgün site kimliği tutulur. Aktarım betikleri: `scripts/content-import/`.

### Ürün adı düzeltmeleri (yalnızca biçim; özgün ad `sourceName` alanında)
| Kaynaktaki ad | Sitede | Gerekçe |
|---|---|---|
| `2035` | Cassy | Site adı ürün kodunun kendisi; aynı kod katalog s.14'te ve ambalajda “CASSY”. |
| ANTEP FISTIĞI AROMALI GOFRET, BISCHOMIO STICK, DIZZY STICK, KAKAOLU GOFRET, STAR TOYS, TATPO, TATPO DARK, VANİLYALI GOFRET, WAFERS | Başlık biçiminde | Tamamı büyük harfle girilmiş adlar. |

### Erişilemeyen ürün kayıtları
Site listelerinde görünmeyen ürün kimlikleri 1, 2, 3, 4, 105, 114, 115, 116, 125, 164, 171 doğrudan denendi; hepsi boş sayfa döndürüyor (yayından kaldırılmış). Aktarılmadı.

## 3. Görseller

- **Site ürün görselleri:** 360 görsel (`/assets/img/urunler/buyukGorsel/*`, 1000×1000 JPEG, 13 üründe birden fazla görsel) indirildi, oran korunarak 900 px WebP'ye çevrildi (`public/assets/products/`). Görseller kırpılmadı, değiştirilmedi; beyaz zemin yalnızca CSS `mix-blend-mode: multiply` ile zemine karıştırılır.
- **Katalog ambalaj kesimleri:** Katalogdaki ürün görselleri PDF'te alfa maskeli (smask) ayrı görsellerdir. Yalnızca katalogda bulunan 75 ürün için bu kesimler çıkarıldı ve her biri sayfa düzenine göre ilgili girişle eşlendi; eşleşmeler etiketli kontrol paftasında tek tek doğrulandı. Otomatik eşleşmenin yanlış görsel seçtiği 3 giriş (Torje: “New Product” rozeti; Wafer Kakao Kremalı 196-3: boş şerit; Bischimo: eşleşme yok) sayfa görüntüsüne bakılarak doğru kesimle elle düzeltildi. Çözünürlükleri düşüktür (~300–430 px), bu nedenle sitede küçük/orta boyda kullanıldı.
- **Katalog sayfası ürün görseli olarak kullanılmadı.** Kapak (E-Katalog önizlemesi) ve s.89'daki fabrika fotoğrafı yalnızca kendi amaçları için kullanıldı.
- **Görseli olmayan 7 ürün** (ambalaj yalnızca tanıtım sayfasındaki büyük kompozisyonun parçası, ayrı kesim yok): Who Finger Cake (2207), Who Finger Cake Ahududu (2208), Cangöz (1206/1207), Big Prens Kakao Kremalı (1360), Big Prens Vanilya / Çilek (1365-1366), Anı Pretzel Kraker (1429), Anı Üçgen Kraker (1430). Başka ürün görseli konmadı; logo ve açıklama gösterilir, katalog sayfasına bağlantı verilir.
- **Diğer görseller:** logo (`logo.svg`, değiştirilmeden, yalnızca boşluk kırpıldı), haber görselleri (32), kilometre taşı görselleri (16), kalite sayfası görseli, katalog s.89 fabrika fotoğrafı. Sitedeki kategori görselleri (`/assets/img/kategoriler/*.jpg`) genel ürün fotoğrafı olduğu ve Anı ambalajı içermediği için kullanılmadı. Instagram akış görselleri aktarılmadı.

### Yapay zekâ ile üretilmiş insan görselleri
Ana sayfa açılışındaki üç kişi (genç kadın, genç erkek, çay bardaklı teyze) **gerçek kişiler değildir**; site sahibinin tercihiyle yapay zekâ (ByteDance Seedream, ElevenLabs Flows üzerinden) ile üretilmiş temsili görsellerdir. Kişilerin elindeki bisküvi/gofret **logosuz ve ambalajsızdır**; hiçbir Anı ambalajı yapay zekâ ile üretilmedi veya değiştirilmedi, sahnedeki ambalajlar katalogdaki gerçek kesimlerdir. Bu kişiler müşteri yorumu, referans veya kampanya yüzü olarak sunulmaz. Yayına almadan önce markanın kendi kampanya fotoğraflarıyla değiştirilmesi önerilir (`public/assets/people/`).

## 4. Kurumsal içerik eşlemesi

| Yeni sayfa | Kaynak |
|---|---|
| /kurumsal, /kurumsal/tarihce | /tarihcemiz, /kilometre-taslarimiz, katalog s.3 (makarna tesisi) |
| /kurumsal/misyon-vizyon | /misyon-vizyon |
| /kurumsal/baskanin-mesaji | /baskanin-mesaji |
| /kurumsal/sosyal-sorumluluk | /sosyal-sorumluluk |
| /kurumsal/bilgi-toplumu-hizmeti | /bilgi-toplumu-hizmeti (belgeler resmî sitedeki PDF'lere bağlanır) |
| /kurumsal/kurumsal-kimlik | /kurumsal-kimlik (logo ZIP'leri resmî siteye bağlanır) |
| /kalite | /kalite, /sertifikalar (“Hazırlanıyor”), ilgili haberler |
| /ihracat | /ihracat |
| /medya, /medya/[haber] | /haberler, /haber-detay/*, /galeri (9 YouTube videosu) |
| /iletisim | /iletisim |
| /kariyer | /kariyer |

Eski adresler (`/tarihcemiz`, `/kategoriler/...`, `/haberler`, `/sertifikalar` vb.) `next.config.ts` içinde yeni sayfalara kalıcı yönlendirilir.

Zaman çizelgesinde yalnızca kaynakta **yılıyla birlikte** geçen olaylar yer alır. Haritada yalnızca kaynak İhracat sayfasındaki listede adı geçen ülkeler işaretlidir.

## 5. Çelişkili, eski veya eksik bilgiler

1. **Kuruluş yılı:** Kilometre taşları “1994 – Anı Bisküvi'nin kuruluşu”, Bilgi Toplumu Hizmeti “Tescil tarihi 21.12.1994” derken Tarihçe metni ve sitenin meta açıklaması “1995 yılında kurulan” der (1995 kilometre taşı: “İlk üretim”). Sitede kuruluş 1994, ilk üretim 1995 olarak gösterildi; çelişen ifade metinden çıkarıldı.
2. **E-Katalog yılı:** Kaynak ana sayfada “2025 E-KATALOG” yazıyor; indirilen PDF'in oluşturma tarihi 15.05.2026. Kapakta yıl yazmıyor. Sitede dosya meta verisine dayanarak “2026 Ürün Kataloğu” olarak sunuldu.
3. **Haber tarihleri:** 32 haberin tamamının tarihi 30.05.2021 (toplu yükleme). İçerikler 2010–2015 dönemine ait olaylardan söz ediyor; özgün yayın tarihleri kaynakta yok. Sitede “Arşiv · sitede yayın: 30 Mayıs 2021” olarak, açıklama notuyla gösterildi.
4. **İhracat ülke sayısı:** İhracat metni “90 ülke” der, hemen altındaki “bazıları” listesi 92 ülke adı içerir. Kilometre taşlarında 2010 için “78 ülke”, vizyonda “90'dan 140 ülkeye” hedefi geçer. Sitede sayı vurgulanmadı; listedeki 92 ülke işaretlendi. Listede “Kongo” yazıyor; Kongo Cumhuriyeti mi Demokratik Kongo mu olduğu belirtilmemiş, haritada Kongo Cumhuriyeti işaretlendi.
5. **Karaman ihracat birinciliği / İSO 500:** Site “2011–2014 Karaman il birincisi”, “2013–2014 ilk 500” derken katalog s.3 aynı cümlelerde 2015'i de içerir. Sitede kaynak site ifadesi kullanıldı.
6. **Çalışan sayısı:** Tarihçe 1500, Sosyal Sorumluluk 1450, 2010 kilometre taşı 900 çalışan der; tarihsiz oldukları için güncel istatistik olarak gösterilmedi. Üretim kapasitesi (2010: günde 180 ton; makarna tesisi: günde 300 ton) de güncel veri olarak sunulmadı.
7. **Sertifikalar:** Kaynakta sertifika sayfası “Hazırlanıyor”. Metinlerde ISO 9001, ISO 22000, TSE/TSEK, Helal, ISO 27001, BRC Food v8 (A) geçiyor; hiçbirinin düzenlenme/geçerlilik tarihi yok. Güncel sertifika olarak sunulmadı, “kaynak metinlerde adı geçen belgeler” olarak listelendi. Enerji (TS ISO 50001) ve su verimliliği (TS 46001) yalnızca politika metni olarak yer alır.
8. **Vizyon:** “2020 yılında ilk dört şirket arasına girmek” hedefi geçmiş tarihlidir; metin olduğu gibi, not düşülerek aktarıldı.
9. **Bilgi Toplumu Hizmeti:** Yönetim kurulu (2007–2015) ve denetçi (2014 dönemi) bilgileri eski tarihli olduğu için aktarılmadı.
10. **Katalog içi hatalar:** s.61 Dark&Light üçüncü sütununda (50 g, 24X6) ürün kodu ve konteyner değeri yok — “belirtilmemiş” gösterilir. s.77 “Pretzel Kraker” girişinin Türkçe açıklaması “Sütlü kokolin kaplamalı kakao kremalı gofret” (başka ürüne ait) — Türkçe açıklama boş bırakıldı. s.60 “BISCHIMO” yazımı katalogdaki gibi korundu. s.56 “Lub Lino” (hurma dolgulu bisküvi) sitedeki “Lup Lino” (bar) ile farklı ürün kabul edildi.
11. **Besin değeri / alerjen:** Hiçbir kaynakta yok; sitede yer verilmedi, ürün sayfalarında bu durum belirtildi.
12. **Kariyer:** Kaynakta açık pozisyon listesi yok; başvuru resmî sitedeki üyelik sistemiyle yapılıyor. Sitede bu sayfaya yönlendirildi.
13. **İletişim formu:** Kaynaktaki form ASP.NET postback ile çalışıyor; yeni sitede gönderim altyapısı yok. Form doğrulama yapar ve mesajı kullanıcının e-posta uygulamasında `bilgi@anibiskuvi.com.tr` adresine hazırlar; gönderildiğini iddia etmez.
14. **Hukuki metinler:** Kaynakta gizlilik politikası (`/gizlilik-politikamiz`) 404 veriyor; KVKK aydınlatma metni yok. Uydurulmadı.

### Site ile katalog arasında gramaj farkı olan ürünler (23)
Yalnızca aralık yazım farkları (ör. “22-25g” ↔ “22 gr, 25 gr”) elendi. Ürün sayfalarında bu ürünler için uyarı notu gösterilir.

| Kod | Ürün | Site | Katalog | Katalog sayfası | Site sayfası |
|---|---|---|---|---|---|
| 1155 | Bischomio Stick – BISCHOMIO STICK (Sütlü Çikolata Kaplı Çubuk Bisküvi) | 27g | 27,5 gr | s.56 | [/urunDetay/bıschomıo-stıck/358](https://www.anibiskuvi.com.tr/urunDetay/bıschomıo-stıck/358) |
| 5280 | Brawo Star – Çikolatalı Bisküvi | 85g | 60-70 gr | s.58 | [/urunDetay/brawo-star/259](https://www.anibiskuvi.com.tr/urunDetay/brawo-star/259) |
| 622 | Cimboo – Kakao  Kaplamalı Marshmallowlu Sandviç Bisküvi | 35-50g | 50 gr | s.50 | [/urunDetay/cimboo/322](https://www.anibiskuvi.com.tr/urunDetay/cimboo/322) |
| 621 | Coco Troy – Kakao ve Hindistan Cevizi Kaplamalı Marshmallowlu Sandviç Bisküvi | 30g | 25 gr | s.53 | [/urunDetay/coco-troy/307](https://www.anibiskuvi.com.tr/urunDetay/coco-troy/307) |
| 614 | Çokobella – Kakaolu Fındık Kreması | 300-350g | 350 gr | s.37 | [/urunDetay/cokobella/346](https://www.anibiskuvi.com.tr/urunDetay/cokobella/346) |
| 2141 | Ditto – Bitter Çikolata Kaplamalı Karamelli Bisküvi | 22-25g | 22 gr | s.30 | [/urunDetay/ditto/197](https://www.anibiskuvi.com.tr/urunDetay/ditto/197) |
| 194 | Finger Bisküvi – Sade Finger Bisküvi | 1100g | 1000 gr | s.76 | [/urunDetay/finger-biskuvi/55](https://www.anibiskuvi.com.tr/urunDetay/finger-biskuvi/55) |
| 201 | Gofret – Sade Gofret | 700-500g | 700 gr | s.49 | [/urunDetay/gofret/285](https://www.anibiskuvi.com.tr/urunDetay/gofret/285) |
| 609 | Jasmine – Muz Aromalı Kaplamalı Marshmallowlu Sandviç Bisküvi | 16g | 10 - 12 - 14 gr | s.51 | [/urunDetay/jasmine/312](https://www.anibiskuvi.com.tr/urunDetay/jasmine/312) |
| 869 | Kek – Meyveli Kek | 36-55g | 55 gr | s.18 | [/urunDetay/kek/133](https://www.anibiskuvi.com.tr/urunDetay/kek/133) |
| 193 | Kremalı Bisküvi – Vanilya Aromalı Kremalı Bisküvi | 900g | 800 gr | s.76 | [/urunDetay/kremali-biskuvi/54](https://www.anibiskuvi.com.tr/urunDetay/kremali-biskuvi/54) |
| 2724 | Marwa – Sütlü Kakao Kaplamalı Portakallı Nuga Bar | 1000-2000g | 2000 gr | s.36 | [/urunDetay/marwa/180](https://www.anibiskuvi.com.tr/urunDetay/marwa/180) |
| 2724 | Marwa – Sütlü Kakao Kaplamalı Portakallı Nuga Bar | 500g | 2000 gr | s.36 | [/urunDetay/marwa/181](https://www.anibiskuvi.com.tr/urunDetay/marwa/181) |
| 2665 | Maxi Star – Sütlü Kakao Kaplamalı Karamelli Nuga Bar | 500g | 13 gr | s.30 | [/urunDetay/maxi-star/179](https://www.anibiskuvi.com.tr/urunDetay/maxi-star/179) |
| 2725 | Mich Mich – Sütlü Kakao Kaplamalı Kayısılı Nuga Bar | 1000-2000g | 2000 gr | s.35 | [/urunDetay/mich-mich/182](https://www.anibiskuvi.com.tr/urunDetay/mich-mich/182) |
| 2725 | Mich Mich – Sütlü Kakao Kaplamalı Kayısılı Nuga Bar | 500g | 2000 gr | s.35 | [/urunDetay/mich-mich/183](https://www.anibiskuvi.com.tr/urunDetay/mich-mich/183) |
| 1355 | Moon – Kakaolu Fındık Kremalı Sandviç Bisküvi | 72g | 60 gr | s.62 | [/urunDetay/moon/249](https://www.anibiskuvi.com.tr/urunDetay/moon/249) |
| 1110 | Petit Beurre – Petit Beurre Bisküvi | 60g | 600 gr | s.75 | [/urunDetay/petit-beurre/202](https://www.anibiskuvi.com.tr/urunDetay/petit-beurre/202) |
| 195 | Petit Beurre – Petit Beurre Sade Bisküvi | 1100g | 1000 gr | s.76 | [/urunDetay/petit-beurre/56](https://www.anibiskuvi.com.tr/urunDetay/petit-beurre/56) |
| 2407 | Rolly – Fındıklı Sütlü Kokolin Bar | 650g | 400 gr, 500 gr | s.37 | [/urunDetay/rolly/173](https://www.anibiskuvi.com.tr/urunDetay/rolly/173) |
| 1036 | Tea Biscuits – Petit Beurre Bisküvi | 400g | 320 gr | s.76 | [/urunDetay/tea-biscuits/199](https://www.anibiskuvi.com.tr/urunDetay/tea-biscuits/199) |
| 1035 | Tea Biscuits – Petit Beurre Bisküvi | 110g | 80 gr, 100 gr | s.76 | [/urunDetay/tea-biscuits/211](https://www.anibiskuvi.com.tr/urunDetay/tea-biscuits/211) |
| 4195 | Wafers – ANI WAFERS VANİLYA  KREMALI KAKAOLU GOFRET | 65g | 60 gr | s.46 | [/urunDetay/wafers/349](https://www.anibiskuvi.com.tr/urunDetay/wafers/349) |

## 6. Kapsam dışı kalanlar

- **İngilizce ve Arapça içerik:** Resmî sitenin EN/AR sürümleri mevcut ama çeviriler aktarılmadı; çalışmayan dil düğmesi oluşturulmadı, footer'da resmî EN/AR sitelere bağlantı verildi.
- **Video gömme:** Galeri videoları YouTube bağlantısı olarak verildi (üçüncü taraf iframe/çerez yüklenmemesi için).
- **Instagram akışı:** Aktarılmadı.

## 7. Yalnızca katalogda bulunan ürünler (75)

| Ürün | Kategori | Katalog kodu | Katalog sayfası | Görsel |
|---|---|---|---|---|
| Anı Spagetti | Makarna | 7000 | 5 | Katalogdan kesim |
| Anı Makarna | Makarna | 7001, 7002 | 5 | Katalogdan kesim |
| Nour Spagetti | Makarna | 7003 | 5 | Katalogdan kesim |
| Anı Klasik Spagetti | Makarna | 7010 | 6 | Katalogdan kesim |
| Fellini Spagetti | Makarna | 7501 | 6 | Katalogdan kesim |
| Who Finger Cake | Kek | 2207 | 7 | **Yok** |
| Who Finger Cake Ahududu | Kek | 2208 | 7 | **Yok** |
| Goodway Kakaolu | Kek | 2206 | 8 | Katalogdan kesim |
| Brawo Donut Cake | Kek | 2029 | 12 | Katalogdan kesim |
| Anı Infinity Dubai | Kek | 2039 | 13 | Katalogdan kesim |
| Brawo Infinity Ahududu | Kek | 2030 | 13 | Katalogdan kesim |
| Dark Highway | Kek | 2214 | 17 | Katalogdan kesim |
| Brawo Magdalenas | Kek | 3213 | 19 | Katalogdan kesim |
| Swiss Roll Kakao Kremalı | Kek | 3106 | 20 | Katalogdan kesim |
| Swiss Roll Çikolata Aromalı | Kek | 3107 | 20 | Katalogdan kesim |
| Swiss Roll Çilek Aromalı | Kek | 3108 | 20 | Katalogdan kesim |
| Swiss Roll Sütlü Kakao Kaplamalı | Kek | 3111 | 24 | Katalogdan kesim |
| Swiss Roll Çilek Kremalı Sütlü Kakao Kaplamalı | Kek | 3112 | 24 | Katalogdan kesim |
| Brawo Infinity Antep Fıstıklı | Kek | 3311 | 24 | Katalogdan kesim |
| Brawo Infinity Ahududu | Kek | 3312 | 24 | Katalogdan kesim |
| Anı Mozaik Baton Kek | Kek | 876 | 25 | Katalogdan kesim |
| Pandora Mozaik Bar | Çikolata | 2694 | 27 | Katalogdan kesim |
| Tiviti | Çikolata | 2136 | 27 | Katalogdan kesim |
| Rodrigo | Çikolata | 2.980, 2.981 | 29 | Katalogdan kesim |
| Exclusive | Çikolata | 8124 | 31 | Katalogdan kesim |
| Torje | Çikolata | 2137 | 32 | Katalogdan kesim |
| Stella | Çikolata | 2681 | 34 | Katalogdan kesim |
| Mich Mich | Çikolata | 2725-1 | 35 | Katalogdan kesim |
| Maxistar | Çikolata | 2665-1 | 35 | Katalogdan kesim |
| Marwa | Çikolata | 2724-1 | 36 | Katalogdan kesim |
| Brawo Mini Pandora | Çikolata | 2143 | 37 | Katalogdan kesim |
| Rolly | Çikolata | 2407-1 | 37 | Katalogdan kesim |
| Anı Wafers Vanilya Kremalı | Gofret | 4204 | 42 | Katalogdan kesim |
| Gofron XXL | Gofret | 492 | 44 | Katalogdan kesim |
| Frolle X2 | Gofret | 4990 | 45 | Katalogdan kesim |
| Anı Wafers Vanilya | Gofret | 4141 | 47 | Katalogdan kesim |
| Anı Wafers Kakao | Gofret | 4142 | 47 | Katalogdan kesim |
| Anı Wafers Fındık | Gofret | 4143 | 47 | Katalogdan kesim |
| Anı Wafers Çilek | Gofret | 4144 | 47 | Katalogdan kesim |
| Anı Wafer Çilek | Gofret | 196-4 | 49 | Katalogdan kesim |
| Anı Wafers Vanilya | Gofret | 176 | 49 | Katalogdan kesim |
| Anı Wafers Vanilya | Gofret | 196-1, 196-2 | 49 | Katalogdan kesim |
| Wafer Kakao Kremalı | Gofret | 196-3 | 49 | Katalogdan kesim |
| Cimboo Dark | Bisküvi | 628, 634 | 50 | Katalogdan kesim |
| Love You | Bisküvi | 668 | 53 | Katalogdan kesim |
| Cangöz | Bisküvi | 1206, 1207 | 55 | **Yok** |
| Lub Lino | Bisküvi | 5322 | 56 | Katalogdan kesim |
| Zozo Cream Çilek | Bisküvi | 1344 | 57 | Katalogdan kesim |
| Zozo Cream Kakao | Bisküvi | 1345 | 57 | Katalogdan kesim |
| Zozo Cream Vanilya | Bisküvi | 1346 | 57 | Katalogdan kesim |
| Bischimo | Bisküvi | 5308 | 60 | Katalogdan kesim |
| Big Prens Kakao Kremalı | Bisküvi | 1358 | 63 | Katalogdan kesim |
| Big Prens Kakao Kremalı | Bisküvi | 1360 | 66 | **Yok** |
| Big Prens Vanilya / Çilek | Bisküvi | 1365-1366 | 66 | **Yok** |
| Custard Creams Çikolata | Bisküvi | 127 -2 | 67 | Katalogdan kesim |
| Custard Creams Çilek | Bisküvi | 127-3 | 67 | Katalogdan kesim |
| Custard Creams Portakal | Bisküvi | 127-5 | 67 | Katalogdan kesim |
| Custard Creams Vanilya | Bisküvi | 127-1 | 67 | Katalogdan kesim |
| Custard Creams Hindistan Cevizi | Bisküvi | 127-4 | 67 | Katalogdan kesim |
| Anı Kremalı Sandviç Bisküvi | Bisküvi | 1230 | 69 | Katalogdan kesim |
| Anı Finger Bisküvi | Bisküvi | 121 | 73 | Katalogdan kesim |
| Anı Petit Beurre | Bisküvi | 1028 | 75 | Katalogdan kesim |
| Anı Pretzel Kraker | Kraker | 1429 | 77 | **Yok** |
| Anı Üçgen Kraker | Kraker | 1430 | 77 | **Yok** |
| Anı Tuzlu Kraker | Kraker | 1153 | 78 | Katalogdan kesim |
| Çubuk Kraker | Kraker | 1147 | 79 | Katalogdan kesim |
| Crack Paprika | Kraker | 1157 | 80 | Katalogdan kesim |
| Çubuk Kraker | Kraker | 140-1 | 82 | Katalogdan kesim |
| Maxi Star Karamel | Şekerleme | 2670 | 84 | Katalogdan kesim |
| Mascot | Şekerleme | 6113 | 85 | Katalogdan kesim |
| Mascot | Şekerleme | 6101-1 | 85 | Katalogdan kesim |
| Mascot | Şekerleme | 6101-2 | 85 | Katalogdan kesim |
| Caramellim | Şekerleme | 2760 | 86 | Katalogdan kesim |
| Jolly | Şekerleme | 2875 | 87 | Katalogdan kesim |
| Trufon Twist | Şekerleme | 2775 | 88 | Katalogdan kesim |
