import pymupdf, json, re, sys
d=pymupdf.open(sys.argv[1])
entries=[]
def cl(vals,tol):
    vals=sorted(vals); out=[]
    for v in vals:
        if out and v-out[-1][-1]<=tol: out[-1].append(v)
        else: out.append([v])
    return [sum(g)/len(g) for g in out]
for pi,p in enumerate(d):
    pn=pi+1; H=p.rect.height
    lines=[]
    for b in p.get_text('dict')['blocks']:
        if b['type']!=0: continue
        for l in b['lines']:
            t=' '.join(s['text'] for s in l['spans']).strip()
            if t: lines.append(dict(t=t,b=l['bbox'],sz=round(l['spans'][0]['size'],1),cx=(l['bbox'][0]+l['bbox'][2])/2,cy=(l['bbox'][1]+l['bbox'][3])/2))
    vals=[l for l in lines if 9.5<=l['sz']<=10.5 and len(l['t'])<=16 and (re.search(r'\d',l['t']) or l['t'].strip()=='-') and l['b'][1]<H-45]
    n=len(vals); par=list(range(n))
    def f(i):
        while par[i]!=i: par[i]=par[par[i]]; i=par[i]
        return i
    for i in range(n):
        for j in range(i+1,n):
            a,b=vals[i],vals[j]
            if (abs(a['cx']-b['cx'])<=14 and abs(a['cy']-b['cy'])<=17) or (abs(a['cy']-b['cy'])<=3 and abs(a['cx']-b['cx'])<=62):
                par[f(i)]=f(j)
    groups={}
    for i in range(n): groups.setdefault(f(i),[]).append(vals[i])
    texts=[l for l in lines if l['sz']<9.6 and l['sz']>=6 and not re.fullmatch(r'[\d.,]+',l['t'])]
    for g in groups.values():
        rows=cl([v['cy'] for v in g],5); colsx=cl([v['cx'] for v in g],12)
        grid=[[None]*len(rows) for _ in colsx]
        for v in g:
            ci=min(range(len(colsx)),key=lambda k:abs(colsx[k]-v['cx'])); ri=min(range(len(rows)),key=lambda k:abs(rows[k]-v['cy']))
            grid[ci][ri]=v['t']
        top=min(v['b'][1] for v in g); left=min(v['b'][0] for v in g)
        cand=[t for t in texts if t['b'][3]<=top+22 and t['b'][1]>=top-120 and left-200<=t['b'][0]<=left-30]
        if not cand: cand=[t for t in texts if t['b'][3]<=top+22 and t['b'][1]>=top-120 and left-300<=t['b'][0]<=left-30]
        cand.sort(key=lambda t:-t['b'][1])
        blk=[]
        for t in cand:
            if not blk or blk[-1]['b'][1]-t['b'][3]<30: blk.append(t)
            else: break
        blk.sort(key=lambda t:t['b'][1])
        entries.append(dict(page=pn,top=round(top),left=round(left),rows=len(rows),grid=grid,title=[(t['t'],round(t['b'][1]),round(t['b'][0])) for t in blk]))
entries.sort(key=lambda e:(e['page'],e['top'],e['left']))
json.dump(entries,open(sys.argv[2],'w'),ensure_ascii=False,indent=1)
print(len(entries))
for e in entries:
    if e['rows']!=4 or not e['title'] or any(None in c for c in e['grid']): print('BAD',e['page'],e['rows'],e['grid'],[t[0] for t in e['title']])
