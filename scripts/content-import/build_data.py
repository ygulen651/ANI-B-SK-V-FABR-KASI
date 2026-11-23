"""Kaynak verileri (site + katalog) birleştirir, görselleri WebP'ye çevirir, proje data/ klasörüne yazar.
Kullanım: python build_data.py <src_dir> <project_dir>
"""
import json, os, re, sys, subprocess, unicodedata
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from curation import CUR, MERGE

SRC, PROJ = sys.argv[1], sys.argv[2]
BASE = "https://www.anibiskuvi.com.tr"
CAT_PDF = BASE + "/assets/dosyalar/Katalog.pdf"
OUT_IMG = os.path.join(PROJ, "public/assets/products")
os.makedirs(OUT_IMG, exist_ok=True)
os.makedirs(os.path.join(PROJ, "data"), exist_ok=True)

TR = str.maketrans("çğıöşüÇĞİÖŞÜâîû", "cgiosuCGIOSUaiu")
def slugify(s):
    s = s.translate(TR).lower()
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")

def to_webp(src, dst, maxw=900, q=80):
    if not os.path.exists(dst):
        im = Image.open(src)
        w, h = im.size
        args = ["cwebp", "-quiet", "-q", str(q), "-alpha_q", "90", "-m", "6"]
        if w > maxw:
            args += ["-resize", str(maxw), "0"]
        subprocess.run(args + [src, "-o", dst], check=True)
    im = Image.open(dst)
    return im.size

CATS = [
    dict(slug="biskuvi", name="Bisküvi", sourceId=1),
    dict(slug="cikolata", name="Çikolata", sourceId=2),
    dict(slug="kek", name="Kek", sourceId=3),
    dict(slug="gofret", name="Gofret", sourceId=4),
    dict(slug="kraker", name="Kraker", sourceId=5),
    dict(slug="sekerleme", name="Şekerleme", sourceId=6),
    dict(slug="makarna", name="Makarna", sourceId=None),
]
cat_by_name = {c["name"]: c for c in CATS}
for c in CATS:
    c["subcategories"] = []
    c["sourceUrl"] = f"{BASE}/kategoriler/{c['slug']}/{c['sourceId']}" if c["sourceId"] else CAT_PDF + "#page=5"

def add_sub(cat, slug, name, url=None):
    for s in cat["subcategories"]:
        if s["slug"] == slug:
            return s
    s = dict(slug=slug, name=name, sourceUrl=url)
    cat["subcategories"].append(s)
    return s

P = json.load(open(os.path.join(SRC, "products_raw.json")))
C = json.load(open(os.path.join(SRC, "catalog_raw.json")))

def num(s):
    return s.strip() if s else None

# katalog kodu -> [(entry, col)]
cat_by_code = {}
for e in C:
    for col in e["grid"]:
        if col and col[0]:
            cat_by_code.setdefault(col[0].strip(), []).append((e, col))

def variant_from_col(col):
    col = list(col) + [None] * (4 - len(col))
    return dict(code=num(col[0]), weight=num(col[1]), unitsPerBox=num(col[2]), container40HC=num(col[3]))

products = []
used_slugs = set()
def uniq(slug):
    base, i = slug, 2
    while slug in used_slugs:
        slug = f"{base}-{i}"; i += 1
    used_slugs.add(slug)
    return slug

# ---- Web ürünleri
for p in P:
    crumbs = p["crumbs"]
    cat = cat_by_name[crumbs[2][1]]
    m = re.match(r"/altKategoriler/([^/]+)/\d+/(\d+)", crumbs[3][0] or "")
    sub = add_sub(cat, m.group(1), crumbs[3][1], BASE + crumbs[3][0])
    specs = dict(p["specs"])
    code = specs.get("ÇEŞİT NUMARASI", "").strip()
    slug = uniq(f"{slugify(p['slug'])}-{p['id']}")
    imgs = []
    for k, src in enumerate(p["images"]):
        fn = src.replace("/assets/img/", "").replace("/", "__")
        dst_name = f"{slug}{'' if k == 0 else '-' + str(k + 1)}.webp"
        w, h = to_webp(os.path.join(SRC, "img", fn), os.path.join(OUT_IMG, dst_name))
        imgs.append(dict(src=f"/assets/products/{dst_name}", width=w, height=h, origin=BASE + src, background="white"))
    catalog, seen_v = [], set()
    for e, col in cat_by_code.get(code, []):
        v = variant_from_col(col)
        key = tuple(v.values())
        if key in seen_v:
            continue
        seen_v.add(key)
        catalog.append(dict(page=e["page"], variant=v))
    products.append(dict(
        slug=slug, name=p["name"], category=cat["slug"], subcategory=sub["slug"],
        description=p["description"] or None, descriptionEn=None,
        code=code or None,
        web=dict(code=code or None, weight=specs.get("GRAMAJ"), unitsPerBox=specs.get("KOLİ İÇİ ADET"), container40HC=specs.get('40" HC KONTEYNER')),
        catalog=catalog, images=imgs,
        sources=[BASE + p["url"]] + ([f"{CAT_PDF}#page={c['page']}" for c in catalog[:1]] if catalog else []),
        origin="web+katalog" if catalog else "web",
        sourceId=p["id"], sourceSlug=p["slug"],
    ))

# ---- Yalnızca katalogda olanlar
SUBNAMES = {"kek": "Kek", "bar": "Bar", "kaplamasiz-gofret": "Kaplamasız Gofret", "kaplamali-gofret": "Kaplamalı Gofret",
            "dokme": "Dökme", "marshmallow-biskuvi": "Marshmallow Bisküvi", "special": "Special", "kremali": "Kremalı",
            "sandvic-biskuvi": "Sandviç Bisküvi", "finger-biskuvi": "Finger Bisküvi", "petit-beurre": "Petit Beurre",
            "tuzlu-kraker": "Tuzlu Kraker", "cubuk-kraker": "Çubuk Kraker", "yumusak-seker": "Yumuşak Şeker", "dolgulu": "Dolgulu"}
merged_into = {}
for src_idx, dst_idx in MERGE.items():
    merged_into[src_idx] = dst_idx
cat_only = {}
for e in C:
    if e["webMatch"]:
        continue
    idx = e["idx"]
    target = merged_into.get(idx, idx)
    if target not in CUR:
        raise SystemExit(f"curation missing for idx {idx}: {e['title']}")
    cat_only.setdefault(target, []).append(e)

for idx, entries in cat_only.items():
    name, cslug, sslug, desc, desc_en, img_override = CUR[idx]
    if sslug == "dokme-gofret":
        sslug = "dokme"
    cat = next(c for c in CATS if c["slug"] == cslug)
    if sslug:
        existing = next((s for s in cat["subcategories"] if s["slug"] == sslug), None)
        add_sub(cat, sslug, SUBNAMES.get(sslug, sslug), existing["sourceUrl"] if existing else None)
    variants = []
    for e in entries:
        for col in e["grid"]:
            variants.append(dict(page=e["page"], variant=variant_from_col(col)))
    first = entries[0]
    code = next((v["variant"]["code"] for v in variants if v["variant"]["code"]), None)
    slug = uniq(slugify(name) + "-" + slugify(code or str(idx)))
    imgs = []
    imgfile = None if img_override == "none" else (img_override or first.get("image"))
    if imgfile:
        srcf = os.path.join(SRC, "catimg", imgfile)
        if not os.path.exists(srcf):
            srcf = os.path.join(SRC, "cand", imgfile)
        w, h = to_webp(srcf, os.path.join(OUT_IMG, slug + ".webp"))
        imgs.append(dict(src=f"/assets/products/{slug}.webp", width=w, height=h, origin=f"{CAT_PDF}#page={first['page']}", background="transparent"))
    products.append(dict(
        slug=slug, name=name, category=cslug, subcategory=sslug,
        description=desc, descriptionEn=desc_en, code=code,
        web=None, catalog=variants, images=imgs,
        sources=[f"{CAT_PDF}#page={first['page']}"], origin="katalog",
        sourceId=None, sourceSlug=None,
    ))

# ---- Ad düzeltmeleri (yalnızca biçim; özgün ad sourceName alanında saklanır)
NAME_FIX = {"2035": "Cassy", "ANTEP FISTIĞI AROMALI GOFRET": "Antep Fıstığı Aromalı Gofret", "BISCHOMIO STICK": "Bischomio Stick",
            "DIZZY STICK": "Dizzy Stick", "KAKAOLU\xa0GOFRET": "Kakaolu Gofret", "KAKAOLU  GOFRET": "Kakaolu Gofret", "STAR TOYS": "Star Toys",
            "TATPO": "Tatpo", "TATPO DARK": "Tatpo Dark", "VANİLYALI GOFRET": "Vanilyalı Gofret", "WAFERS": "Wafers"}  # site adı ürün kodu; katalog s.14 ve ambalaj: CASSY
def tr_title(s):
    words = s.replace("\xa0", " ").split()
    out = []
    for w in words:
        lw = w.replace("I", "ı").replace("İ", "i").lower()
        out.append(lw[:1].replace("i", "İ").replace("ı", "I").upper() + lw[1:])
    return " ".join(out)
for p in products:
    orig = p["name"]
    name = NAME_FIX.get(orig, orig).replace("\xa0", " ")
    name = " ".join(name.split())
    if name.isupper():
        name = tr_title(name)
    if name != orig:
        p["sourceName"] = orig
    p["name"] = name

# Kategori sayıları
for c in CATS:
    c["productCount"] = sum(1 for p in products if p["category"] == c["slug"])
    for s in c["subcategories"]:
        s["productCount"] = sum(1 for p in products if p["category"] == c["slug"] and p["subcategory"] == s["slug"])

json.dump(products, open(os.path.join(PROJ, "data/products.json"), "w"), ensure_ascii=False, indent=1)
json.dump(CATS, open(os.path.join(PROJ, "data/categories.json"), "w"), ensure_ascii=False, indent=1)

# Uyuşmazlık raporu (site vs katalog, aynı kod)
def norm_w(s):
    return re.sub(r"\s|gr|g", "", (s or "").lower())
mism = []
for p in products:
    if p["web"] and p["catalog"]:
        ws = {norm_w(c["variant"]["weight"]) for c in p["catalog"]}
        if norm_w(p["web"]["weight"]) not in ws:
            mism.append((p["code"], p["name"], p["web"]["weight"], sorted({c["variant"]["weight"] for c in p["catalog"]}), p["sources"][0]))
json.dump(mism, open(os.path.join(SRC, "weight_mismatch.json"), "w"), ensure_ascii=False, indent=1)
print("products", len(products), "web", sum(p["origin"] != "katalog" for p in products),
      "catalog-only", sum(p["origin"] == "katalog" for p in products), "noimage", [p["name"] for p in products if not p["images"]],
      "mismatch", len(mism))
for c in CATS:
    print(c["slug"], c["productCount"], [(s["slug"], s["productCount"]) for s in c["subcategories"]])
