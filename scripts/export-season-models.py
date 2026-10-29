"""Export the same original reward geometry/textures for on-demand browser turntables."""
import runpy,json,hashlib,base64,io
from pathlib import Path
from PIL import Image
r=runpy.run_path('scripts/render-season-assets.py',run_name='season_renderer')
out=Path('public/season/models');out.mkdir(exist_ok=True)
for rid,reward in r['source']['rewards'].items():
 if reward['kind']=='title':continue
 if reward['kind']=='cosmetic':
  names=[r['mapping'][asset.split(':')[1]] for asset in reward['assetIds']]
  if rid.endswith('_regalia'):polys,_=r['worn_outfit'](names)
  else:
   if rid in ['nevermore','nevermore_ghost']:names=[f'season1_{rid}{suffix}' for suffix in ['', '_left','_right']]
   polys=[]
   for name in names:
    m,t=r['load'](name);polys+=r['geometry'](m,t)
 else:
  kind='supply' if reward['kind']=='supplies' else 'scroll' if 'SCROLL' in reward['giftReward'] else 'repair' if 'REPAIR' in reward['giftReward'] else 'coins'
  tier=['common','uncommon','rare','epic','legendary'].index(reward.get('rarity','common'));m,t=r['invented'](kind,tier);polys=r['geometry'](m,t)
 groups={}
 for v,uv,tex,face in polys:
  key=hashlib.sha256(tex.tobytes()).hexdigest()
  if key not in groups:
   b=io.BytesIO();Image.fromarray(tex).save(b,format='PNG');groups[key]={'texture':'data:image/png;base64,'+base64.b64encode(b.getvalue()).decode(),'positions':[],'uvs':[]}
  g=groups[key]
  for i in [0,1,2,0,2,3]:g['positions']+=v[i].round(5).tolist();g['uvs']+=[float(uv[i][0]),1-float(uv[i][1])]
 (out/f'{rid}.json').write_text(json.dumps({'angle':165 if rid in ['nevermore','nevermore_ghost'] else 30,'meshes':list(groups.values())},separators=(',',':')))
print('Exported',len(list(out.glob('*.json'))),'reward models')
