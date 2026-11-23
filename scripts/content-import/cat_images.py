import pymupdf, json, sys, os
doc=pymupdf.open(sys.argv[1]); C=json.load(open(sys.argv[2])); OUT=sys.argv[3]; os.makedirs(OUT,exist_ok=True)
P=json.load(open(sys.argv[4]))
webcodes={dict(p['specs'])['ÇEŞİT NUMARASI'].strip() for p in P}
smasks={}
for pi,page in enumerate(doc):
    for im in page.get_images(full=True): smasks[im[0]]=im[1]
res=[]
for idx,e in enumerate(C):
    codes=[c[0] for c in e['grid'] if c[0]]
    e['idx']=idx
    e['webMatch']=[c for c in codes if c in webcodes]
    page=doc[e['page']-1]
    ttop=min([t[1] for t in e['title']] or [e['top']]); bot=e['top']+e['rows']*14.6
    best=None
    for info in page.get_image_info(xrefs=True):
        x0,y0,x1,y1=info['bbox']; w=x1-x0; h=y1-y0
        if w>420 or h>460 or w<40 or h<40: continue
        if 100<w<135 and 75<h<95: continue
        if not smasks.get(info['xref']): continue
        ov=min(y1,bot+30)-max(y0,ttop-30)
        if ov<=0: continue
        # prefer images horizontally away from the text column, larger overlap
        score=ov/ max(1,(bot-ttop+60)) 
        if x0 < e['left'] and x1 > e['left']-60 and y0 < bot and y1> ttop: score-=0.6  # overlaps text area
        if best is None or score>best[0]: best=(score,info)
    if best:
        info=best[1]; xr=info['xref']
        fn=f"p{e['page']:02d}_x{xr}.png"
        if not os.path.exists(os.path.join(OUT,fn)):
            pix=pymupdf.Pixmap(doc,xr)
            if pix.alpha==0 and smasks.get(xr):
                pix=pymupdf.Pixmap(pix,pymupdf.Pixmap(doc,smasks[xr]))
            if pix.colorspace and pix.colorspace.n not in (1,3): pix=pymupdf.Pixmap(pymupdf.csRGB,pix)
            pix.save(os.path.join(OUT,fn))
        e['image']=fn; e['imageBox']=[round(v) for v in info['bbox']]
    else: e['image']=None
json.dump(C,open(sys.argv[2],'w'),ensure_ascii=False,indent=1)
print('entries',len(C),'catalog-only',sum(1 for e in C if not e['webMatch']),'noimg',[ (e['page'],e['title'][:1]) for e in C if not e['image']])
