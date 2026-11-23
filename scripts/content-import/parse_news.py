import re,sys,glob,json,html as H,os
out=[]
def clean(s):
    s=re.sub(r'<(br|/p|p)[^>]*>','\n',s); s=re.sub(r'<[^>]+>','',s); s=H.unescape(s).replace('\xa0',' ')
    return '\n'.join(l.strip() for l in s.split('\n') if l.strip())
for f in glob.glob(sys.argv[1]+'/haber_detay_*.html'):
    h=open(f).read()
    can=re.search(r'rel="canonical" href="([^"]+)"',h)
    m=re.search(r'mkdf-post-content-inner(.*?)<footer',h,re.S); s=m.group(1)
    img=re.search(r'<img[^>]+src="([^"]+)"',s)
    date=re.search(r'dateCreated[^>]*>\s*<a>([^<]+)</a>',s)
    title=re.search(r'<h2><a>(.*?)</a></h2>',s,re.S)
    body=re.search(r'</h2>(.*?)</div>\s*</div>\s*</div>',s,re.S)
    iframes=re.findall(r'<iframe[^>]+src="([^"]+)"',s)
    extra_imgs=re.findall(r'<img[^>]+src="([^"]+)"',body.group(1)) if body else []
    url=can.group(1) if can else None
    if not url:
        url='/'+os.path.basename(f)
    out.append(dict(url=url,id=int(re.search(r'(\d+)$',url).group(1)) if re.search(r'(\d+)$',url) else None,date=date.group(1).strip() if date else None,
      title=clean(title.group(1)) if title else None,image=img.group(1) if img else None,body=clean(body.group(1)) if body else '',iframes=iframes,extra_imgs=extra_imgs))
out.sort(key=lambda x:x['id'] or 0,reverse=True)
json.dump(out,open(sys.argv[2],'w'),ensure_ascii=False,indent=1)
for n in out: print(n['id'],n['date'],n['title'],n['image'],len(n['body']),n['iframes'][:1],n['url'])
