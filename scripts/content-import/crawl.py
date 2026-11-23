import re, sys, os, urllib.request, urllib.parse, hashlib, time
OUT=sys.argv[1]; os.makedirs(OUT, exist_ok=True)
BASE="https://www.anibiskuvi.com.tr"
seen=set(); queue=["/"]; pages={}
def fetch(u):
    import subprocess
    r=subprocess.run(["curl","-sL","-A","Mozilla/5.0","--max-time","30","-w","\n__STATUS__%{http_code}",BASE+urllib.parse.quote(u, safe="/?=&%-_.")],capture_output=True)
    t=r.stdout.decode("utf-8","replace"); i=t.rfind("\n__STATUS__")
    return t[i+11:], t[:i]
skip=re.compile(r'\.(css|js|pdf|jpg|jpeg|png|gif|ico|svg|webp)$', re.I)
while queue and len(seen)<600:
    u=queue.pop(0)
    if u in seen: continue
    seen.add(u)
    st,html=fetch(u)
    fn=re.sub(r'[^a-zA-Z0-9]+','_',u).strip('_') or 'home'
    open(os.path.join(OUT,fn+'.html'),'w').write(html)
    print(st, u, len(html), flush=True)
    for h in re.findall(r'href="([^"#]+)"', html):
        h=h.strip()
        if h.startswith('http'):
            p=urllib.parse.urlparse(h)
            if p.netloc not in ('www.anibiskuvi.com.tr','anibiskuvi.com.tr'): continue
            h=p.path
        if h.startswith('javascript') or h.startswith('tel') or h.startswith('mailto'): continue
        if not h.startswith('/'): h='/'+h
        if skip.search(h): continue
        if h not in seen: queue.append(h)
