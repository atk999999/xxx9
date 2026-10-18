"""Build local chapter search from supplied JSONL; no model/API required."""
import json, pathlib, re, sys, hashlib, zipfile
source=pathlib.Path(sys.argv[1]); epub=pathlib.Path(sys.argv[2])
out=pathlib.Path('KHO_TIEN_NGHICH/knowledge/tien-nghich'); out.mkdir(parents=True,exist_ok=True)
report=json.loads((source/'bao_cao_quet.json').read_text())
assert hashlib.sha256(epub.read_bytes()).hexdigest()==report['source_sha256']
index={}; count=0; chars=0
with zipfile.ZipFile(epub) as z: expected={n for n in z.namelist() if re.search(r'chap_\d+\.html$',n)}
seen=set()
for line in (source/'chuong_day_du.jsonl').open():
 c=json.loads(line); seen.add(c['source_file']); chars+=sum(map(len,c['paragraphs']))
 if c['id']==0: continue # table of contents is not narrative evidence
 count+=1
 (out/f"{c['id']}.json").write_text(json.dumps(c,ensure_ascii=False,separators=(',',':')))
 words=set(re.findall(r'[^\W\d_]{2,}', ' '.join(c['paragraphs']).lower()))
 for word in words: index.setdefault(word,[]).append(c['id'])
assert seen==expected
# Very common single words carry no useful ranking signal.
index={w:ids for w,ids in index.items() if len(ids)<count*.65}
(out/'index.json').write_text(json.dumps({'count':count,'words':index},ensure_ascii=False,separators=(',',':')))
(out/'source.json').write_text(json.dumps({'epub_sha256':report['source_sha256'],'chapter_files_verified':len(seen),'story_chapters':count,'excluded':'chap_0000.html (mục lục)','method':'Local lexical retrieval; excerpts are evidence, not verified encyclopedia facts.'},ensure_ascii=False,indent=2))
print('Verified',len(seen),'files; indexed',count,'chapters;',len(index),'terms')
