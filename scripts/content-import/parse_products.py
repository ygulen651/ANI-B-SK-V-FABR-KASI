import re, sys, os, json, html as H, glob
D=sys.argv[1]
def txt(s): 
    s=re.sub(r'<br\s*/?>','\n',s); s=re.sub(r'</p>\s*<p>','\n',s)
    s=re.sub(r'<[^>]+>','',s); s=H.unescape(s)
    return re.sub(r'[ \t\r]+',' ',re.sub(r'\n\s*\n+','\n',s)).strip()
out=[]
for f in sorted(glob.glob(D+'/urunDetay_*.html')):
    h=open(f).read()
    can=re.search(r'rel="canonical" href="([^"]+)"',h)
    url=can.group(1) if can else None
    m=re.search(r'/urunDetay/([^/]+)/(\d+)',url or '')
    bc=re.search(r'class="breadcrumbs">(.*?)</div>',h,re.S)
    crumbs=[(a,txt(b)) for a,b in re.findall(r'<a(?: href="([^"]*)")?>(.*?)</a>',bc.group(1),re.S)] if bc else []
    name=re.search(r'lblUrunAd">(.*?)</span>',h,re.S)
    desc=re.search(r'lblAciklama">(.*?)</span>\s*</p>',h,re.S)
    rows=re.findall(r'<tr>\s*<td[^>]*>(.*?)</td>\s*<td>(.*?)</td>\s*</tr>',h,re.S)
    big=re.findall(r'data-src="(/assets/img/urunler/buyukGorsel/[^"]+)"',h)
    thumbs=re.findall(r'mibreit-thumbElement">\s*<img src="([^"]+)"',h)
    rel=re.search(r'<section class="related products">(.*?)</section>',h,re.S)
    related=sorted(set(re.findall(r'/urunDetay/[^"/]+/(\d+)',rel.group(1)))) if rel else []
    out.append(dict(file=os.path.basename(f),url=url,slug=m and m.group(1),id=m and int(m.group(2)),
      name=txt(name.group(1)) if name else None, description=txt(desc.group(1)) if desc else None,
      crumbs=crumbs, specs=[(txt(a),txt(b)) for a,b in rows], images=big, thumbs=thumbs, related=related))
json.dump(out,open(sys.argv[2],'w'),ensure_ascii=False,indent=1)
print(len(out))
from collections import Counter
print(Counter(tuple(c[1] for c in p['crumbs'][2:4]) for p in out).most_common(60))
print(Counter(k for p in out for k,v in p['specs']))
print('noimg',[p['url'] for p in out if not p['images']])
print('noname',[p['file'] for p in out if not p['name']])
print('multiimg',sum(1 for p in out if len(p['images'])>1))
