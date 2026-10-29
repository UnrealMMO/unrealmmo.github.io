"""Website poses assembled from real equipment layers and the articulated pet models."""
import runpy,sys,json
from pathlib import Path
r=runpy.run_path('scripts/render-season-assets.py',run_name='season_renderer')
load,geometry,render,worn=r['load'],r['geometry'],r['render'],r['worn_outfit']
out=Path('public/season/rewards')
for rid in ['nevermore','nevermore_ghost']:
 names=['season1_'+rid,'season1_'+rid+'_left','season1_'+rid+'_right'];polys=[]
 for name in names:
  model,textures=load(name);polys+=geometry(model,textures)
 for frame in range(8):render(polys,165+frame*45).save(out/f'{rid}-{frame}.webp',quality=90)
 render(polys,165,800).save(out/f'{rid}-large.webp',quality=94)
manifest=json.loads(Path('content/season-previews.json').read_text())
for rid in ['nevermore','nevermore_ghost']:manifest[rid]['models']=['season1_'+rid,'season1_'+rid+'_left','season1_'+rid+'_right']
Path('content/season-previews.json').write_text(json.dumps(manifest,indent=2)+'\n')
polys,_=worn(['season1_hollow_regent_chest','season1_hollow_regent_legs','season1_hollow_regent_boots'],posed=True)
render(polys,-18,1000).save(out/'regent-hero.webp',quality=94)
