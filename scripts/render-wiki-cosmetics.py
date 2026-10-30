"""Render front-biased Wiki thumbnails from the published, self-contained model payloads.
No invented geometry. The standalone Dread Lantern comes from the published asset pack.
Run from the website root with Pillow/numpy and the UnrealMMO workspace available.
"""
import base64, hashlib, io, json, runpy, sys, zipfile
from pathlib import Path
import numpy as np
from PIL import Image
sys.argv=[sys.argv[0], '../UnrealSkills/cosmetics-plugin/resource-pack/assets/unrealcosmetics']
r=runpy.run_path('scripts/render-season-assets.py',run_name='wiki_renderer')
out=Path('public/wiki/cosmetics');out.mkdir(parents=True,exist_ok=True)
manifest={}
def payload_polys(model):
    polys=[]
    for mesh in model['meshes']:
        tex=np.array(Image.open(io.BytesIO(base64.b64decode(mesh['texture'].split(',')[1]))).convert('RGBA'))
        vertices=np.array(mesh['positions']).reshape(-1,3);uvs=np.array(mesh['uvs']).reshape(-1,2);uvs[:,1]=1-uvs[:,1]
        for i in range(0,len(vertices),6):
            indices=[i,i+1,i+2,i+5]
            polys.append((vertices[indices],uvs[indices],tex,'model'))
    return polys
season=json.loads(Path('content/season-0.json').read_text())
for rid,reward in season['rewards'].items():
    if reward['kind']!='cosmetic':continue
    source=Path(f'public/season/models/{rid}.json');model=json.loads(source.read_text())
    angle=165 if rid in ['nevermore','nevermore_ghost'] else 0 if rid.endswith('_regalia') else 12
    r['render'](payload_polys(model),angle,360).save(out/f'{rid}.webp',quality=95)
    manifest[rid]={'image':f'/wiki/cosmetics/{rid}.webp','angle':angle,'source':str(source),'sha256':hashlib.sha256(source.read_bytes()).hexdigest()}
archive=Path('public/resource-packs/unrealmmo-season0-4548c2a316a9.zip')
with zipfile.ZipFile(archive) as z:
    source='assets/unrealcosmetics/models/item/jack_o_lantern.json'
    m=json.loads(z.read(source));textures={}
    for key,value in m['textures'].items():
        if value.startswith('#'):continue
        namespace,path=value.split(':');textures[key]=np.array(Image.open(io.BytesIO(z.read(f'assets/{namespace}/textures/{path}.png'))).convert('RGBA'))
    polys=r['geometry'](m,textures);r['render'](polys,12,360).save(out/'dread_lantern.webp',quality=95)
    meshes={}
    for vertices,uv,texture,face in r['separate_coplanar_faces'](polys):
        key=hashlib.sha256(texture.tobytes()).hexdigest()
        if key not in meshes:
            b=io.BytesIO();Image.fromarray(texture).save(b,format='PNG');meshes[key]={'texture':'data:image/png;base64,'+base64.b64encode(b.getvalue()).decode(),'positions':[],'uvs':[]}
        g=meshes[key]
        for i in [0,1,2,0,2,3]:g['positions']+=vertices[i].tolist();g['uvs'] += [float(uv[i][0]),1-float(uv[i][1])]
    (out/'dread_lantern.json').write_text(json.dumps({'angle':12,'meshes':list(meshes.values())},separators=(',',':')))
    manifest['dread_lantern']={'image':'/wiki/cosmetics/dread_lantern.webp','angle':12,'source':f'{archive}:{source}','sha256':hashlib.sha256(z.read(source)).hexdigest()}
Path('content/wiki-cosmetic-previews.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(f'Rendered {len(manifest)} actual-model Wiki previews.')
