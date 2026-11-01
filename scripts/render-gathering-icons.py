"""Render Gathering Stone's actual pack geometry; extract native ingredient artwork.
Usage: python scripts/render-gathering-icons.py <Minecraft 26.2.jar> <unrealmmo assets directory>
"""
import hashlib,io,json,runpy,sys,zipfile
from pathlib import Path
import numpy as np
from PIL import Image
jar,pack=Path(sys.argv[1]),Path(sys.argv[2])
sys.argv=[sys.argv[0],str(pack)]
r=runpy.run_path('scripts/render-season-assets.py',run_name='wiki_renderer')
out=Path('public/wiki/items');sources={}
with zipfile.ZipFile(jar) as z:
 def texture(name):
  source='assets/minecraft/textures/'+name+'.png';data=z.read(source)
  sources[source]=hashlib.sha256(data).hexdigest()
  return np.array(Image.open(io.BytesIO(data)).convert('RGBA'))
 for name in ['iron_ingot','redstone','hopper']:
  Image.fromarray(texture('item/'+name)).save(out/(name+'.png'))
 cube={'elements':[r['box']([0,0,0],[16,16,16],'stone')]}
 r['render'](r['geometry'](cube,{'stone':texture('block/stone_bricks')}),135,256).save(out/'stone_bricks.png')
 p=pack/'models/item/gathering_stone.json';model=json.loads(p.read_text());textures={}
 sources['UnrealMMO:models/item/gathering_stone.json']=hashlib.sha256(p.read_bytes()).hexdigest()
 for key,value in model['textures'].items():
  if not value.startswith('#'):textures[key]=texture(value.split(':')[-1])
 r['render'](r['geometry'](model,textures),135,256).save(out/'gathering_stone.png')
Path('docs/gathering-icons.json').write_text(json.dumps({'method':'Native Minecraft textures and actual Gathering Stone resource-pack cuboids, rendered with existing website renderer','sources':sources},indent=2)+'\n')
