"""Extract Minecraft 26.2 item textures and render the pack's real custom models.
Usage: python scripts/export-wiki-icons.py /path/to/26.2.jar /path/to/assets/unrealmmo
Requires Pillow/numpy. Outputs only public artwork and source hashes.
"""
import hashlib, io, json, math, runpy, sys, zipfile
from pathlib import Path
import numpy as np
from PIL import Image
jar, pack = Path(sys.argv[1]), Path(sys.argv[2])
# Reuse the existing resource-pack face/UV renderer without running its export loop.
sys.argv = [sys.argv[0], str(pack)]
r = runpy.run_path('scripts/render-season-assets.py', run_name='wiki_renderer')
out = Path('public/wiki/items'); out.mkdir(parents=True, exist_ok=True)
provenance = {}
with zipfile.ZipFile(jar) as archive:
    for name in ['water_bucket','lava_bucket','amethyst_shard','blaze_rod','flint','lapis_lazuli','stick','paper','book','gold_nugget','enchanted_book']:
        source = f'assets/minecraft/textures/item/{name}.png'
        data = archive.read(source)
        (out / f'{name}.png').write_bytes(data)
        provenance[name] = {'source': f'Minecraft Java 26.2: {source}', 'sha256': hashlib.sha256(data).hexdigest(), 'method':'original texture, unchanged'}
    # Vanilla ChestModel.createSingleBodyLayer: exact closed single-chest cuboids.
    # Minecraft renders this item with a special entity renderer, not a flat item texture.
    source = 'assets/minecraft/textures/entity/chest/normal.png'
    data = archive.read(source)
    texture = np.array(Image.open(io.BytesIO(data)).convert('RGBA'))
    elements=[]
    for lo,hi,u,v in [([1,0,1],[15,10,15],0,19),([1,9,1],[15,14,15],0,0),([7,7,15],[9,11,16],0,0)]:
        w,h,d = np.array(hi)-lo
        element=r['box'](lo,hi,'chest')
        coords={'north':[u+d,v+d,u+d+w,v+d+h], 'south':[u+2*d+w,v+d,u+2*d+2*w,v+d+h], 'east':[u,v+d,u+d,v+d+h], 'west':[u+d+w,v+d,u+2*d+w,v+d+h], 'up':[u+d,v,u+d+w,v+d], 'down':[u+d+w,v+d,u+d+2*w,v]}
        for face,uv in coords.items():element['faces'][face]['uv']=[float(n)/4 for n in uv]
        elements.append(element)
    r['render'](r['geometry']({'elements':elements},{'chest':texture}),135,256).save(out/'chest.png')
    provenance['chest']={'source':f'Minecraft Java 26.2: {source}', 'sha256':hashlib.sha256(data).hexdigest(), 'geometry':'ChestModel.createSingleBodyLayer; closed single chest', 'method':'rendered native geometry and texture'}
for name in ['water_staff','fire_staff','magic_rune']:
    model,textures=r['load'](name)
    # Animated atlases use UVs within a single frame, not the entire vertical strip.
    for key,texture in textures.items():
        tex_id=model['textures'][key].split(':')[1]
        meta=pack/'textures'/f'{tex_id}.png.mcmeta'
        if meta.exists():
            animation=json.loads(meta.read_text())['animation']
            width=animation.get('width',texture.shape[1]); height=animation.get('height',width)
            first=animation.get('frames',[0])[0]; first=first.get('index',0) if isinstance(first,dict) else first
            textures[key]=texture[first*height:(first+1)*height,:width]
    polys=r['geometry'](model,textures)
    # Keep the item GUI pose from the resource pack, viewed from its front.
    center=np.array([8,8,8]); rotation=np.eye(3)
    for axis, degrees in enumerate(model.get('display',{}).get('gui',{}).get('rotation',[0,0,0])):
        a=math.radians(degrees); matrix=np.eye(3); i,j=[n for n in range(3) if n!=axis]
        matrix[i,i]=matrix[j,j]=math.cos(a);matrix[i,j]=-math.sin(a);matrix[j,i]=math.sin(a)
        if axis==1:matrix=matrix.T
        rotation=rotation@matrix
    polys=[((vertices-center)@rotation.T+center,uv,tex,face) for vertices,uv,tex,face in polys]
    r['render'](polys,0,256).save(out/f'{name}.png')
    model_path=pack/'models/item'/f'{name}.json';texture_path=pack/'textures/item'/f'{name}.png'
    provenance[name]={'source':f'UnrealMMO resource pack: models/item/{name}.json', 'modelSha256':hashlib.sha256(model_path.read_bytes()).hexdigest(), 'textureSha256':hashlib.sha256(texture_path.read_bytes()).hexdigest(), 'method':'rendered native geometry, GUI pose and textures'}
Path('docs/wiki-icons.json').write_text(json.dumps(provenance,indent=2)+'\n')
print(f'Exported {len(provenance)} game item icons.')
