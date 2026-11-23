/**
 * Site genelindeki kurumsal içerikler.
 * Tüm metinler https://www.anibiskuvi.com.tr ve 2026 tarihli ürün kataloğundan alınmıştır.
 * Kaynak eşleşmeleri ve çelişkiler için CONTENT_SOURCES.md dosyasına bakın.
 */

export const SOURCE = "https://www.anibiskuvi.com.tr";

export const company = {
  shortName: "Anı Bisküvi",
  legalName: "Anı Bisküvi Gıda Sanayi ve Ticaret A.Ş.",
  siteUrl: "https://www.anibiskuvi.com.tr",
  description:
    "Karaman'da üretim yapan Anı Bisküvi; bisküvi, çikolata, kek, gofret, kraker, şekerleme ve makarna ürünlerini Türkiye'deki ve dünyadaki tüketicilerle buluşturur.",
};

export const contact = {
  hq: {
    title: "Merkez – Fabrika",
    address: ["Organize Sanayi Bölgesi 16. Cadde No:16", "Karaman / Türkiye"],
    phone: { label: "+90 (338) 224 12 30", href: "tel:+903382241230" },
    fax: "+90 (338) 224 12 34",
    kep: "anibiskuvi@hs01.kep.tr",
    email: "bilgi@anibiskuvi.com.tr",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=An%C4%B1+Bisk%C3%BCvi+G%C4%B1da+San.+ve+Tic.+A.%C5%9E.+Karaman",
  },
  istanbul: {
    title: "İstanbul Bölge Müdürlüğü",
    address: ["Mahmutbey Mahallesi, İSTOÇ Toptancılar Sitesi,", "32. Ada No: 66/68 Bağcılar", "İstanbul / Türkiye"],
    phone: { label: "+90 (212) 659 19 66 - 67", href: "tel:+902126591966" },
    fax: "+90 (212) 659 19 68",
  },
};

export const social = [
  { name: "Instagram", href: "https://www.instagram.com/anibiskuvia.s/" },
  { name: "Facebook", href: "https://www.facebook.com/AniBiskuvi" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UC5HMffWg-Rs5uF6fGjPZUEg" },
] as const;

export const officialLanguageSites = [
  { label: "English", href: "http://en.anibiskuvi.com.tr", lang: "en" },
  { label: "العربية", href: "http://ar.anibiskuvi.com.tr", lang: "ar" },
];

export const catalog = {
  href: "/assets/docs/ani-biskuvi-urun-katalogu-2026.pdf",
  sourceHref: `${SOURCE}/assets/dosyalar/Katalog.pdf`,
  year: 2026,
  pages: 92,
  sizeLabel: "9,9 MB",
  // PDF meta verisi: CreationDate 15 Mayıs 2026 (Adobe InDesign)
  createdLabel: "Mayıs 2026",
  cover: { src: "/assets/site/katalog-kapak.webp", width: 910, height: 1287 },
};

export const mainNav = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/kurumsal", label: "Anı'yı Tanıyın" },
  { href: "/kalite", label: "Kalite" },
  { href: "/ihracat", label: "İhracat" },
  { href: "/medya", label: "Medya" },
  { href: "/iletisim", label: "İletişim" },
];

/* ------------------------------------------------------------------ */
/* Kurumsal sayfalar                                                   */
/* ------------------------------------------------------------------ */

export type CorporatePage = {
  slug: string;
  title: string;
  summary: string;
  source: string;
};

export const corporatePages: CorporatePage[] = [
  { slug: "tarihce", title: "Tarihçe & Kilometre Taşları", summary: "1994'te Karaman'da başlayan yolculuk.", source: `${SOURCE}/tarihcemiz` },
  { slug: "misyon-vizyon", title: "Misyon & Vizyon", summary: "Şirketin kendi ifadesiyle hedefleri.", source: `${SOURCE}/misyon-vizyon` },
  { slug: "baskanin-mesaji", title: "Başkanın Mesajı", summary: "Yönetim Kurulu Başkanı'nın mesajı.", source: `${SOURCE}/baskanin-mesaji` },
  { slug: "sosyal-sorumluluk", title: "Sosyal Sorumluluk", summary: "Kültür, eğitim ve toplum için çalışmalar.", source: `${SOURCE}/sosyal-sorumluluk` },
  { slug: "bilgi-toplumu-hizmeti", title: "Bilgi Toplumu Hizmeti", summary: "Ticari ve yasal şirket bilgileri.", source: `${SOURCE}/bilgi-toplumu-hizmeti` },
  { slug: "kurumsal-kimlik", title: "Kurumsal Kimlik", summary: "Logo dosyaları.", source: `${SOURCE}/kurumsal-kimlik` },
];

export const history = {
  paragraphs: [
    "Karaman'da kurulan ANI BİSKÜVİ A.Ş. ilk olarak bisküvi üretimiyle faaliyetine başlamış, kuruluşundan bu güne satışlarında gösterdiği büyük sıçramayla sürekli yatırımlara yönelmiştir. 40 çalışanla başlayan ilk üretim, kilometre taşlarına göre 1995 yılında gerçekleşmiştir.",
    "Şirket, gösterdiği performans sonucunda 1997, 2000, 2008, 2009, 2010, 2011 ve 2012 yıllarında İstanbul Sanayi Odasınca yayınlanan Türkiye'nin ikinci 500 büyük firması arasında yer almış; ardından 2013 ve 2014 yıllarında Türkiye'nin ilk 500 büyük firması arasına girme başarısını göstermiştir.",
    "Anı Bisküvi, 65.000 m² açık ve 115.000 m² kapalı alanda faaliyetini sürdürdüğü fabrikada, dünya ülkelerine yaptığı ihracatla Karaman'da en çok ihracat yapan şirketler sıralamasında 1. sıraya yükselmiştir (2011–2014 Karaman il birincisi).",
    "Fabrika bünyesindeki bisküvi, kek, çikolata, gofret, kraker, marshmallow, şeker ve fındık kreması hatlarına 2010 yılında kakao kremalı mozaik bisküvi, fındık pasta ve çikolata damlalı bisküvi hatları eklenmiştir. 2015 yılında kremalı bisküvi ürünleri için yurt dışından en son model, tam otomatik yeni bir tesis devreye girmiştir.",
  ],
  // 2026 kataloğu, s.3 (görsel metin)
  pastaParagraph:
    "Anı Bisküvi, yeni bir yatırım olarak kurduğu makarna üretim tesisinde 2023 yılında üretime başlamıştır. Tesis, İç Anadolu'nun sert durum buğdayından makarna üretmek üzere her etabı el değmeden, tam otomatik sistemle tasarlanmıştır.",
  pastaSource: "2026 Ürün Kataloğu, s.3",
};

/** Yalnızca kaynakta yılıyla birlikte geçen kilometre taşları */
export const milestones: { year: string; title: string; text: string; image?: string; source: string }[] = [
  { year: "1994", title: "Anı Bisküvi'nin kuruluşu", text: "Türkiye'nin yükselen değeri Anı Bisküvi, Karaman'da doğdu.", image: "/assets/milestones/1994.webp", source: "Kilometre Taşlarımız" },
  { year: "1995", title: "İlk üretim", text: "40 çalışanıyla günlük 20 ton lezzeti müşterilerine sundu.", image: "/assets/milestones/1995.webp", source: "Kilometre Taşlarımız" },
  { year: "1996", title: "İkinci bisküvi hattı", text: "İkinci bisküvi hattını harekete geçirerek 45 çeşide ulaştı.", image: "/assets/milestones/1996.webp", source: "Kilometre Taşlarımız" },
  { year: "1998", title: "İhracatta adım adım", text: "20 ülkeye ihracat yaparak lezzeti yaymaya devam etti.", image: "/assets/milestones/1998.webp", source: "Kilometre Taşlarımız" },
  { year: "1999", title: "Gofret ve kek hattı", text: "Gofret ve kek üretimini başarıyla gerçekleştirerek yoluna devam etti.", image: "/assets/milestones/1999.webp", source: "Kilometre Taşlarımız" },
  { year: "2001", title: "Kek hattında büyük yatırım", text: "1. kek hattı yatırımını gerçekleştirip yeni ürünlerini beğeniye sundu.", image: "/assets/milestones/2001.webp", source: "Kilometre Taşlarımız" },
  { year: "2002", title: "Şeker ve fındık kreması", text: "Şeker ve fındık kreması yatırımlarıyla ağızları tatlandırmaya devam etti.", image: "/assets/milestones/2002.webp", source: "Kilometre Taşlarımız" },
  { year: "2003", title: "Çikolata yatırımı", text: "Çikolatada büyük bir yatırım yaptı; ulusal ve yerel market zincirlerine girdi.", source: "Kilometre Taşlarımız" },
  { year: "2004", title: "Nugalı bar hattı", text: "Çikolatada nugalı yeni bar hattıyla 100 çeşide ulaştı.", image: "/assets/milestones/2004.webp", source: "Kilometre Taşlarımız" },
  { year: "2005", title: "Gofrette 2 kat üretim", text: "İkinci gofret hattıyla kapasite iki katına çıktı.", source: "Kilometre Taşlarımız" },
  { year: "2006", title: "İkinci kek hattı", text: "Müşterilerine daha fazla tat için ikinci kek hattı kuruldu.", source: "Kilometre Taşlarımız" },
  { year: "2007", title: "Üçüncü kek hattı", text: "Üçüncü kek hattıyla kek üretim kapasitesinde üçüncü büyük kek üreticisi haline geldi.", source: "Kilometre Taşlarımız" },
  { year: "2008", title: "Tüketici kalite ödülü", text: "“Markasına En Çok Güvenilen Tüketici Kalite Ödülü”nü kazandı.", image: "/assets/milestones/2008.webp", source: "Kilometre Taşlarımız" },
  { year: "2009", title: "Gofret hattı yenilendi", text: "Dördüncü kez Türkiye'nin ikinci 500 büyük firması arasında yer aldı; gofret hattı yenilendi.", image: "/assets/milestones/2009.webp", source: "Kilometre Taşlarımız" },
  { year: "2010", title: "Yeni hatlar", text: "Kakao kremalı mozaik bisküvi, fındıklı pasta ve çikolata damlalı bisküvi hattı devreye girdi.", image: "/assets/milestones/2010.webp", source: "Kilometre Taşlarımız" },
  { year: "2014", title: "Başarılarla dolu bir yıl", text: "TİM'in 2013 verilerine göre en çok ihracat yapan 1000 firma arasında 208'inci, Türkiye'nin 500 Büyük Sanayi Kuruluşu listesinde 435'inci sırada yer aldı.", image: "/assets/milestones/2014.webp", source: "Kilometre Taşlarımız" },
  { year: "2015", title: "Yeni kremalı bisküvi tesisi", text: "Kremalı bisküvi ürünleri için tam otomatik yeni tesis devreye girdi.", source: "Tarihçemiz" },
  { year: "2023", title: "Makarna üretimi", text: "Yeni makarna üretim tesisi üretime başladı.", source: "2026 Ürün Kataloğu, s.3" },
];

export const missionVision = {
  vision: {
    intro: "ANI BİSKÜVİ GIDA SAN. ve TİC. A.Ş. olarak unlu mamuller, çikolata, şekerleme sektöründe;",
    items: [
      "Sürekli yeni yatırımlarla sektörde büyümeyi sürdürmek,",
      "Ülkemizde sektöründe 2020 yılında ilk dört şirket arasına girmek yanında uluslararası ihracatta ülke sayısını 90'dan 140 ülkeye çıkarmak,",
      "“ANI” markasını ülkemizde ve dünyada en çok tercih edilen marka olmasını sağlamak,",
      "Tüm faaliyetlerimizde doğruluk, çalışkanlık yanında sıfır hata ile kaliteli mamuller üreterek ülkemiz ve dünyanın en güvenilir şirketi olmaktır.",
    ],
  },
  mission: {
    intro: "ANI BİSKÜVİ GIDA SAN. ve TİC. A.Ş. olarak unlu mamuller, çikolata, şekerleme sektöründe;",
    items: [
      "Çalışanlarımıza, tüketicilerimize ve tüm insanlara, çevreye duyarlı bir anlayış içinde yaratılan değerle ülke ekonomisine katkı sağlayarak şirketimizi uluslararası bir şirket haline getirmektir.",
    ],
  },
  note: "Vizyon metni kaynak sitede yer aldığı şekliyle aktarılmıştır; 2020 hedefi geçmiş tarihlidir.",
};

export const chairmanMessage = {
  paragraphs: [
    "Anı Bisküvi şirketi olarak ülkemiz ve tüm dünya toplumuna unlu ve şekerli mamullerde kaliteli, beğenilen tatta, sağlıklı ürünler sunmak temel hedefimizdir. Anı Bisküvi olarak bunu sağlarken en üstün teknolojiye sahip tesis ekipmanları ile üretim faaliyetini sürdürmekteyiz.",
    "Mamul üretimi için seçilen hammaddeler fiziksel ve kimyasal analizlerden geçirilerek kullanılmasına özen gösterilmektedir. Sosyal projelere de açık olan şirketimiz çalışanları, tedarikçileri, satıcıları ve tüketicileri Anı marka şemsiyesi altında birleşmiş bir aileyiz.",
    "Dileğimiz; ülkemiz var oldukça şirketimiz de var olacaktır.",
  ],
  signature: "Ahmet Vefik BOYNUKALIN",
  role: "Yönetim Kurulu Başkanı",
};

export const socialResponsibility = {
  paragraphs: [
    "Şirketimiz üretim faaliyetleri dışında ülkemizin bilhassa kültürel hayatına katkıda bulunmak için, her yıl Karaman ilinde kutlanan Türk Dil Bayramı etkinliklerine katkıda bulunmak üzere kitap ve eser yayınlayarak hediye şeklinde ücretsiz dağıtmaktadır. Bu faaliyet kurucu ortağımız İbrahim Rıfkı BOYNUKALIN yönetiminde sürdürülmektedir.",
  ],
  books: [
    { year: "2011", title: "Türkiye, Karaman ve Anı Bisküvi" },
    { year: "2012", title: "Karaman'ın İktisadi ve Sosyal Gelişimi" },
    { year: "2013", title: "Karaman Beylerinden Pir Ahmet" },
    { year: "2014", title: "Karaman ve Ankara'dan Anılar" },
    { year: "2015", title: "Milli Mücadele'de Karaman" },
  ],
  more: [
    "Karaman ile ilgili eser hazırlayanlar, çalışmalarını incelenmek üzere şirkete gönderebilir. Teklif edilen çalışma değerlendirildikten sonra uygun görülürse yayınlanacaktır.",
    "Kurucu ortak Ömer Nazım BOYNUKALIN, Karamanoğlu Mehmetbey Üniversitesi Yaşatma ve Yaptırma Vakfı Başkanı olarak üniversite için arsa temini (2 milyon m²), kampüslerden birinin yapımı ve kampüs içine 2000 fidan dikimi çalışmalarında yer almıştır.",
    "Vakıf olarak Hemşirelik Yüksekokulu için 3700 m²'lik 5 katlı bina tahsis edilmiş; Türk Hava Kurumu'na bağlı Havacılık Yüksekokulu'nun Karaman'da açılması için girişimlerde bulunulmuştur.",
    "Şirket çalışanlarından gönüllü kan bağışı yapılmış, Mut–Mersin yoluna fidan dikimi gerçekleştirilmiş; Kızılay Kız Öğrenci Yurdu yapımına gönüllü katkı sağlanmıştır.",
  ],
};

export const infoSociety: { label: string; value: string }[] = [
  { label: "Ticaret Unvanı", value: "Anı Bisküvi Gıda Sanayi ve Ticaret Anonim Şirketi" },
  { label: "Şirket Türü", value: "Anonim Şirketi" },
  { label: "Mersis", value: "0069006315900010" },
  { label: "Ticaret Sicil Memurluğu", value: "Karaman" },
  { label: "Ticaret Sicil Numarası", value: "4969" },
  { label: "Adres", value: "Organize Sanayi Bölgesi 16. Cadde No:16 Karaman" },
  { label: "Telefon", value: "0338 224 12 30 (pbx)" },
  { label: "Faks", value: "0338 224 12 34" },
  { label: "E-posta", value: "bilgi@anibiskuvi.com.tr" },
  { label: "Taahhüt Edilen Sermaye", value: "70.000.000" },
  { label: "Ödenen Sermaye", value: "66.378.000" },
  { label: "Tescil Tarihi", value: "21.12.1994" },
  { label: "Vergi Dairesi", value: "Karaman Vergi Dairesi" },
  { label: "Vergi Numarası", value: "0690063159" },
  { label: "Sektör", value: "Peksimet, bisküvi, gofret, dondurma külahı, kağıt helva vb. ürünlerin imalatı (çikolata kaplı olanlar dahil)" },
];

export const infoSocietyDocs = [
  { label: "2024 Yılı Olağanüstü Genel Kurula Çağrı İlanı", href: `${SOURCE}/assets/dosyalar/GenelKurulToplantisinaDavet.pdf` },
  { label: "2014 Toplantı Tutanağı – 2013 Dönemi (30/05/2014)", href: `${SOURCE}/assets/dosyalar/2014-toplanti-tutanagi-2013-donemi-30-05-2014-3254-d_2.pdf` },
  { label: "2013 Toplantı Tutanağı – 2012 Dönemi", href: `${SOURCE}/assets/dosyalar/2013-toplanti-tutanagi-2012-donemi-8100-d.pdf` },
  { label: "2014 Ticaret Sicili Gazetesi (24/04/2014)", href: `${SOURCE}/assets/dosyalar/2014-ticaret-sicili-gazetesi-24-04-2014-8348-d.pdf` },
  { label: "2013 Yılı İç Yönerge (30/05/2014)", href: `${SOURCE}/assets/dosyalar/2013-yili-ic-yonerge-30-05-2014-1431-d.pdf` },
];

export const brandAssets = [
  { label: "Anı Bisküvi Logo (AI)", href: `${SOURCE}/assets/dosyalar/ani-biskuvi-logo-ai-4820-d.zip` },
  { label: "Anı Bisküvi Logo (JPG)", href: `${SOURCE}/assets/dosyalar/ani-biskuvi-logo-jpg-6799-d.zip` },
  { label: "Anı Bisküvi Logo (PNG)", href: `${SOURCE}/assets/dosyalar/ani-biskuvi-logo-png-1972-d.zip` },
];

/* ------------------------------------------------------------------ */
/* Kalite                                                              */
/* ------------------------------------------------------------------ */

export const quality = {
  policy:
    "Çalışanlarımızın ortak katılımıyla kaliteli, güvenli ve özgün üretim yaparak, gıda güvenliğini en üst düzeyde sağlayarak, müşteri memnuniyetini ön planda tutarak, yenilikler doğrultusunda sürekli iyileşmeyi baz alarak, yasal şartlar ve müşteri gerekliliklerine uygunluğu ön planda tutmayı amaç edindik.",
  policies: [
    {
      title: "Gıda Güvenliği BRC Politikası",
      lead: "Kuruluşumuzda çalışan herkesin gönül seferberliği ve bilinçli çabaları ile müşterilerimize lezzetli, kaliteli ve güvenli ürünler sunarak rekabet yarışında önde olmak ana ilkemizdir.",
      items: [
        "Mevzuata uygunluğa önem verir,",
        "Çalışanlarımızı eğitir,",
        "Üretimde hijyen kurallarına uyulmasını sağlar,",
        "Gelişen şartlara uyum için akılcı ve planlı çalışmaya önem verir,",
        "Bilgi ve verilere dayalı karar verir,",
        "Müşterilerimizin istek ve beklentilerini sürekli olarak izler; kaliteli, güvenli, yasal ve özgün ürünler üretir,",
        "Tedarikçilerimizle iş birliği yapar,",
        "Faaliyetlerimizin etkinliğini, gıda güvenliği ve kalite kültürünü sürekli iyileştiririz.",
      ],
    },
    {
      title: "Helal Politikası",
      lead: "Helal sertifikalı ürünlerimizi aşağıdaki ilkelere uygun olarak üretmeyi ve dağıtmayı taahhüt ediyoruz:",
      items: [
        "Ürünlerde kullanılan malzemeler, ilgili kurumlarca Helal Sertifikalı ve hayvansal menşeli yasak bölümlerden arınmış olacaktır.",
        "İmalatı, ambalajlanması, depolanması ve dağıtımı sırasında kir/pis içermez.",
        "Ürünler tüketici kullanımı için güvenli ve gıda ile temas uygulamaları için ulusal gıda güvenliği gereklilikleriyle uyumlu olacaktır.",
        "Ürün temiz ve hijyenik bir ortamda üretilecek, depolanacak ve dağıtılacaktır.",
      ],
    },
    {
      title: "Hijyen ve Sanitasyon Politikası",
      lead: "",
      items: [
        "Paydaşlarımızın isteklerine göre sağlıklı, hijyenik, standartlara uygun ve güvenilir ürünler üretmek,",
        "Her kademede eğitimli ve bilinçli personel yaklaşımını benimsemek ve uygulamak,",
        "Hijyen ve Sanitasyon Yönetim Sisteminin sürekli iyileştirilmesini, geliştirilmesini ve etkinliğini artırmak,",
        "Yasal ve düzenleyici şartlara uygunluğunu sağlamak.",
      ],
    },
    {
      title: "Enerji Politikası",
      lead: "TS ISO 50001 Enerji Yönetim Sisteminin kurulumu ve işletilmesiyle, sürekli olarak enerji performansının iyileştirilmesi, maliyetlerin azaltılması, enerji verimliliğine yönelik yatırımların optimize edilmesi, çevresel ve sera gazı salınımının azaltılması ve doğal kaynakların korunması ana hedef olarak belirlenmiştir.",
      items: [],
    },
    {
      title: "Su Verimliliği Politikası",
      lead: "TS 46001 Su Verimliliği Politikamız kapsamında su kaynaklarının verimli kullanılmasını ve kalitesini korumayı, su tüketimini izleyip verimlilik çalışmaları gerçekleştirmeyi ve suyu gelecek nesillere aktarılacak bir emanet olarak görmeyi taahhüt ederiz.",
      items: [],
    },
    {
      title: "Çevre Politikası",
      lead: "",
      items: [
        "Ülkemizdeki çevre mevzuatına uymak ve güncelliğini sağlamak,",
        "Çevre ile ilgili mümkün olan her alanda ölçülebilir sürekli gelişmeyi sağlamak,",
        "Kirliliği ve atıkları en aza indirmek,",
        "Çalışanlar ve taşeronlara sürekli eğitim vermek.",
      ],
    },
    {
      title: "İş Sağlığı ve Güvenliği Politikası",
      lead: "Benimsemiş olduğumuz İş Sağlığı ve Güvenliği Politikası, insana ve içinde yaşadığı çalışma ortamına duyulan saygıya dayanmaktadır.",
      items: [],
    },
    {
      title: "Bilgi Güvenliği Politikası",
      lead: "İş sürekliliğimize ve bilgiye yönelik her türlü riski yönetmek amacıyla; kurum içinde sürekli iyileştirerek ve bilgi güvenliği farkındalığı sağlayarak, tüm çalışanlarımız ve iş ortaklarımızın katılımı ile işlediğimiz tüm fiziksel ve elektronik veriyi koruma hedefi ile devam ettireceğimizi taahhüt etmekteyiz.",
      items: [],
    },
    {
      title: "Taklit ve Tağşiş Politikası",
      lead: "",
      items: [
        "İşletmemiz hiçbir koşulda üretmiş olduğu ürünlerde taklit ve tağşişte bulunmaz.",
        "Tedarikçilerini taklit-tağşiş risk değerlendirmesine göre belirler ve taklit-tağşiş teşebbüsünde bulunmuş tedarikçiler ile çalışmaz.",
      ],
    },
    {
      title: "Üretim Alanı Kuralları",
      lead: "Fiziksel görünüş ve takı, yabancı madde, personel sağlık kontrolleri ve üretim alanlarına giriş politikaları:",
      items: [
        "Üretim alanlarına koruyucu önlüksüz, bonesiz girilmesine izin verilmez; üretim alanlarında hiçbir takı kullanılamaz.",
        "Üretim alanlarında fiziksel bulaşmaya sebep olabilecek cam, kırılabilir plastik, ahşap ve tel malzemeler kullanımdan kaldırılmıştır.",
        "Personelin periyodik sağlık muayeneleri yaptırılır.",
        "Ziyaretçiler ve tedarikçiler üretim alanlarına özel önlük ve bone giyerek, ziyaretçi kontrol listesine tabi tutularak girer.",
      ],
    },
  ],
  signature: { name: "A. Kemal BOYNUKALIN", role: "Genel Müdür" },
  /** Kaynak metinlerde adı geçen belgeler — geçerlilik tarihleri kaynakta yok */
  documentsMentioned: [
    { name: "TSE / TSEK", where: "Tarihçemiz" },
    { name: "TS EN ISO 9001", where: "Tarihçemiz" },
    { name: "ISO 22000 (HACCP disiplinini içeren)", where: "Tarihçemiz; haber: “TSE ISO EN 22000 Belgesini Aldı”" },
    { name: "Helal gıda üretim belgesi", where: "Tarihçemiz" },
    { name: "ISO 27001 Bilgi Güvenliği", where: "Tarihçemiz" },
    { name: "BRC Food Versiyon 8 (A seviye)", where: "Haber: “Anı Bisküvi BRC Sertifikasını Aldı”" },
  ],
};

/* ------------------------------------------------------------------ */
/* İhracat                                                             */
/* ------------------------------------------------------------------ */

export const exportContent = {
  paragraphs: [
    "ANI Bisküvi Gıda San. ve Tic. A.Ş., satış politikaları doğrultusunda yurt içi satışlarının yanı sıra ihracat konusuna da büyük önem vermektedir.",
    "Yurt dışında da kaliteli ürün ve marka politikalarından ödün vermeyen Anı Bisküvi, tüketicilerinin desteğiyle en kaliteli ve en güvenilir ürünleri dünya piyasasına sürerek güçlü adımlarla yoluna devam etmektedir.",
    "Anı Bisküvi'nin el değmeden ürettiği ürünler, lezzet ve kıvam bakımından dünya ülkelerinde kabul ve rağbet görmektedir.",
  ],
  recognition: [
    "Türkiye İhracatçılar Meclisi'nin (TİM) 2014 verileri doğrultusunda Türkiye'de en çok ihracat yapan 1000 firma araştırmasında 183'üncü sırada yer almıştır.",
    "Akdeniz İhracatçı Birlikleri Genel Sekreterliği'ne bağlı Hububat Bakliyat ve Yağlı Tohumlar İhracatçı Birliği nezdinde hububat sektöründe en çok ihracat yapan 3'üncü firma unvanını almıştır.",
  ],
  countriesNote:
    "Kaynak sitedeki İhracat sayfasında, ürünlerin ihraç edildiği ülkelerden bazıları olarak listelenen ülkeler. Sayfada güncelleme tarihi belirtilmemiştir; metin TİM'in 2014 verilerine atıf yapmaktadır.",
  /** Kaynak listedeki Türkçe ad → harita veri setindeki ad */
  countries: [
    ["Amerika Birleşik Devletleri", "United States of America"], ["Afganistan", "Afghanistan"], ["Almanya", "Germany"], ["Angola", "Angola"],
    ["Arnavutluk", "Albania"], ["Avustralya", "Australia"], ["Avusturya", "Austria"], ["Azerbaycan", "Azerbaijan"], ["Bahreyn", "Bahrain"],
    ["Belçika", "Belgium"], ["Benin", "Benin"], ["Birleşik Arap Emirlikleri", "United Arab Emirates"], ["Bolivya", "Bolivia"],
    ["Bosna Hersek", "Bosnia and Herz."], ["Bulgaristan", "Bulgaria"], ["Cezayir", "Algeria"], ["Cibuti", "Djibouti"], ["Çad", "Chad"],
    ["Çek Cumhuriyeti", "Czechia"], ["Dominik Cumhuriyeti", "Dominican Rep."], ["Ekvator Ginesi", "Eq. Guinea"], ["Etiyopya", "Ethiopia"],
    ["Fas", "Morocco"], ["Fransa", "France"], ["Fildişi Sahili", "Côte d'Ivoire"], ["Filistin", "Palestine"], ["Gabon", "Gabon"],
    ["Gambiya", "Gambia"], ["Gana", "Ghana"], ["Gine", "Guinea"], ["Gine Bissau", "Guinea-Bissau"], ["Güney Afrika Cumhuriyeti", "South Africa"],
    ["Gürcistan", "Georgia"], ["Hırvatistan", "Croatia"], ["Hindistan", "India"], ["Hollanda", "Netherlands"], ["Irak", "Iraq"],
    ["İngiltere", "United Kingdom"], ["İran", "Iran"], ["İrlanda", "Ireland"], ["İsrail", "Israel"], ["Kuzey Kıbrıs T.C.", "N. Cyprus"],
    ["Kamerun", "Cameroon"], ["Karadağ", "Montenegro"], ["Katar", "Qatar"], ["Kenya", "Kenya"], ["Kolombiya", "Colombia"], ["Kongo", "Congo"],
    ["Kosova", "Kosovo"], ["Kuveyt", "Kuwait"], ["Liberya", "Liberia"], ["Libya", "Libya"], ["Litvanya", "Lithuania"], ["Lübnan", "Lebanon"],
    ["Macaristan", "Hungary"], ["Madagaskar", "Madagascar"], ["Makedonya", "Macedonia"], ["Maldiv Adaları", "Maldives"], ["Malezya", "Malaysia"],
    ["Mali", "Mali"], ["Malta", "Malta"], ["Mauritius", "Mauritius"], ["Mısır", "Egypt"], ["Moğolistan", "Mongolia"], ["Moritanya", "Mauritania"],
    ["Mozambik", "Mozambique"], ["Nijer", "Niger"], ["Nijerya", "Nigeria"], ["Panama", "Panama"], ["Papua Yeni Gine", "Papua New Guinea"],
    ["Polonya", "Poland"], ["Portekiz", "Portugal"], ["Romanya", "Romania"], ["Rusya Federasyonu", "Russia"], ["Sao Tome", "São Tomé"],
    ["Senegal", "Senegal"], ["Seyşel Adaları", "Seychelles"], ["Sırbistan", "Serbia"], ["Slovakya", "Slovakia"], ["Somali", "Somalia"],
    ["Sudan", "Sudan"], ["Suudi Arabistan", "Saudi Arabia"], ["Tacikistan", "Tajikistan"], ["Tanzanya", "Tanzania"], ["Togo", "Togo"],
    ["Tunus", "Tunisia"], ["Türkmenistan", "Turkmenistan"], ["Uganda", "Uganda"], ["Umman", "Oman"], ["Uruguay", "Uruguay"],
    ["Ürdün", "Jordan"], ["Yemen", "Yemen"],
  ] as [string, string][],
  /** 1:110m harita veri setinde poligonu olmayan küçük ülkeler için yaklaşık başkent koordinatları [boylam, enlem] */
  smallCountryPoints: {
    Bahrain: [50.58, 26.22], Maldives: [73.51, 4.17], Malta: [14.51, 35.9], Mauritius: [57.5, -20.16], Seychelles: [55.45, -4.62], "São Tomé": [6.73, 0.34],
  } as Record<string, [number, number]>,
};

/* ------------------------------------------------------------------ */
/* Medya                                                               */
/* ------------------------------------------------------------------ */

export const videos = [
  { title: "Anı Bisküvi – Kurumsal Tanıtım Filmi – 2016", id: "8BbQL6zIceU" },
  { title: "Gıda Fuarı 2015 – Görüntüler ve Rıfkı Boynukalın'ın Röportajı", id: "m6iYkV2qq-4" },
  { title: "Anı Bisküvi Fuar Görüntüleri ve Değerlendirme", id: "OH_s74u1lZY" },
  { title: "Rıfkı Boynukalın Röportajı – Sektör TV", id: "Al1pu0FRjoQ" },
  { title: "2012 Gıda Fuarı Değerlendirmesi – Ülke TV", id: "TS8mMpT8rmA" },
  { title: "2013 Gıda Fuarı Değerlendirmesi – Ülke TV", id: "d0Aw7R1fn6E" },
  { title: "2014 Gıda Fuarı – Genel Koordinatör Değerlendirmesi", id: "ouGqfePS1yg" },
  { title: "Çıkış Yolu – Bloomberg HT / Rıfkı Boynukalın Röportajı", id: "Cj2yoymDKDc" },
  { title: "Anı Bisküvi – Kurumsal Tanıtım Filmi – 2013", id: "5ydVEFTvs-M" },
];

export const career = {
  text: "Orta ve uzun vadede açılabilecek pozisyonlarda değerlendirilmek üzere adaylar aranmaktadır. Başvuru sonrasında niteliklerinize ve iş tecrübenize uygun pozisyonlar oluşması halinde sizinle iletişime geçilecektir.",
  applyHref: `${SOURCE}/kariyer`,
  applyNote: "Başvurular, mevcut resmî sitedeki üyelik sistemi üzerinden alınmaktadır.",
};
