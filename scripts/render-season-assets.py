"""Render original resource-pack cuboids with their face textures; no game/server data copied.
Run with a Python environment containing Pillow/numpy. Source pack passed explicitly.
Generated consumable geometry is website concept artwork, not a live resource-pack change.
"""
import json, math, re, sys, hashlib
from pathlib import Path
import numpy as np
from PIL import Image
pack=Path(sys.argv[1]); out=Path('public/season/rewards');out.mkdir(parents=True,exist_ok=True)
source=json.load(open('../UnrealSkills/season-pass/season-0.json'))
catalog=Path('../UnrealSkills/cosmetics-plugin/src/main/java/dev/unreal/cosmetics/Catalog.java').read_text()
mapping=dict(re.findall(r'new Entry\("season1:([^\"]+)","[^\"]+","([^\"]+)"',catalog))
faces={'north':[(0,1,0),(1,1,0),(1,0,0),(0,0,0)],'south':[(1,1,1),(0,1,1),(0,0,1),(1,0,1)],'east':[(1,1,0),(1,1,1),(1,0,1),(1,0,0)],'west':[(0,1,1),(0,1,0),(0,0,0),(0,0,1)],'up':[(0,1,1),(1,1,1),(1,1,0),(0,1,0)],'down':[(0,0,0),(1,0,0),(1,0,1),(0,0,1)]}
def solid(color):
 a=np.zeros((16,16,4),dtype=np.uint8)
 for y in range(16):
  for x in range(16):a[y,x]=[max(0,min(255,c+((x*7+y*11)%9-4)*2)) for c in color]+[255]
 return a
def box(lo,hi,key):return {'from':lo,'to':hi,'faces':{f:{'texture':'#'+key,'uv':[0,0,16,16]} for f in faces}}
def invented(kind,tier=0):
 colors=[(119,82,45),(65,101,75),(67,101,148),(115,68,124)]; cloth=colors[min(tier,3)]; elems=[]
 if kind=='coins':
  elems=[box([3,1,3],[13,3,13],'cloth'),box([2,3,2],[14,10+tier,14],'cloth'),box([4,10+tier,4],[12,13+tier,12],'cloth'),box([4,11+tier,3],[12,12+tier,13],'gold'),box([6,5,1.7],[10,9,2.1],'gold')]
  for x,y,z in [(5,14+tier,5),(9,14+tier,8),(7,15+tier,6)]:elems.append(box([x,y,z],[x+3,y+.8,z+3],'gold'))
 elif kind=='scroll':
  elems=[box([4,2,7],[12,15,8],'paper'),box([3,1,6],[13,3,9],'paper'),box([3,14,6],[13,16,9],'paper'),box([7,2,6.7],[9,15,8.2],'cloth'),box([6,7,6],[10,11,7],'gold')]
  for y in [5,7,9,11]:elems.append(box([4.7,y,6.8],[6.5,y+.3,7],'ink'))
 elif kind=='repair':
  elems=[box([3,2,7],[13,15,7.5],'paper'),box([5,5,6.5],[7,12,7],'gold'),box([5,10,6.5],[11,12,7],'gold'),box([8,3,6.5],[11,6,7],'cloth')]
 else:
  elems=[box([2,1,2],[14,12,14],'cloth')]
  for y in [2,6,10]:elems.append(box([1.8,y,1.8],[14.2,y+1,14.2],'wood'))
  for x in [3,11]:elems.append(box([x,0.8,1.5],[x+1,12.2,14.5],'gold'))
  elems.extend([box([4,12,4],[8,15,8],'paper'),box([9,12,8],[12,16,11],'leaf')])
 return {'elements':elems}, {'cloth':solid(cloth),'gold':solid((201,161,75)),'paper':solid((224,207,162)),'ink':solid((73,61,47)),'wood':solid((78,55,33)),'leaf':solid((78,124,83))}
def load(name):
 p=pack/'models/item'/f'{name}.json';m=json.load(open(p));tex={}
 for k,v in m['textures'].items():
  if v.startswith('#'):continue
  tex[k]=np.array(Image.open(pack/'textures'/(v.split(':')[1]+'.png')).convert('RGBA'))
 return m,tex

def geometry(model,textures,offset=(0,0,0)):
 result=[]
 for e in model['elements']:
  lo=np.array(e['from'],float);hi=np.array(e['to'],float)
  for f,d in e['faces'].items():
   key=d['texture'][1:]
   while key not in textures:key=model['textures'][key][1:]
   v=np.array(faces[f],float)*(hi-lo)+lo
   if 'rotation' in e:
    r=e['rotation'];axis='xyz'.index(r['axis']);a=math.radians(r['angle']);R=np.eye(3);i,j=[q for q in range(3) if q!=axis];R[i,i]=R[j,j]=math.cos(a);R[i,j]=-math.sin(a);R[j,i]=math.sin(a)
    if axis==1:R=R.T
    v=(v-np.array(r['origin']))@R.T+np.array(r['origin'])
   v+=offset
   u0,v0,u1,v1=d.get('uv',[0,0,16,16]);uv=np.array([(u0,v0),(u1,v0),(u1,v1),(u0,v1)])/16
   uv=np.roll(uv,int(d.get('rotation',0)/90),axis=0)
   result.append((v,uv,textures[key],f))
 return result

def render(polys,angle,size=360):
 yaw=math.radians(angle);pitch=math.radians(18)
 right=np.array([math.cos(yaw),0,math.sin(yaw)]);depth=np.array([math.sin(yaw)*math.cos(pitch),math.sin(pitch),-math.cos(yaw)*math.cos(pitch)]);up=np.cross(depth,right)
 # up must point toward positive world Y
 if up[1]<0:up=-up
 verts=np.concatenate([v for v,_,_,_ in polys]);center=(verts.min(0)+verts.max(0))/2
 radius=max(np.linalg.norm(v-center) for v in verts);scale=(size*.79)/(radius*2)
 output=np.zeros((size,size,4),dtype=np.uint8);zbuf=np.full((size,size),-1e9)
 for v,uv,tex,f in polys:
  v=v-center;screen=np.column_stack((v@right*scale+size/2,-v@up*scale+size/2,v@depth))
  normal=np.cross(v[1]-v[0],v[2]-v[0]);norm=np.linalg.norm(normal)
  # Keep both sides for thin/transparent model surfaces.
  shade=.66+.34*abs(np.dot(normal/max(norm,1e-9),np.array([.35,.75,-.55])))
  for ids in [(0,1,2),(0,2,3)]:
   tri=screen[list(ids)];uvt=uv[list(ids)];mn=np.maximum(0,np.floor(tri[:,:2].min(0)).astype(int));mx=np.minimum(size-1,np.ceil(tri[:,:2].max(0)).astype(int))
   if np.any(mx<mn):continue
   x,y=np.meshgrid(np.arange(mn[0],mx[0]+1)+.5,np.arange(mn[1],mx[1]+1)+.5);a,b,c=tri
   den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1])
   if abs(den)<1e-8:continue
   w0=((b[1]-c[1])*(x-c[0])+(c[0]-b[0])*(y-c[1]))/den;w1=((c[1]-a[1])*(x-c[0])+(a[0]-c[0])*(y-c[1]))/den;w2=1-w0-w1
   z=w0*a[2]+w1*b[2]+w2*c[2];u=w0*uvt[0,0]+w1*uvt[1,0]+w2*uvt[2,0];vv=w0*uvt[0,1]+w1*uvt[1,1]+w2*uvt[2,1]
   pixels=tex[np.clip((vv*tex.shape[0]).astype(int),0,tex.shape[0]-1),np.clip((u*tex.shape[1]).astype(int),0,tex.shape[1]-1)].copy();pixels[:,:,:3]=(pixels[:,:,:3]*shade).astype(np.uint8)
   zz=zbuf[mn[1]:mx[1]+1,mn[0]:mx[0]+1];mask=(w0>=-1e-6)&(w1>=-1e-6)&(w2>=-1e-6)&(z>zz)&(pixels[:,:,3]>10)
   output[mn[1]:mx[1]+1,mn[0]:mx[0]+1][mask]=pixels[mask];zz[mask]=z[mask]
 return Image.fromarray(output)
manifest={}
for rid,r in source['rewards'].items():
 if r['kind']=='title':continue
 polys=[];names=[]
 if r['kind']=='cosmetic':
  for i,asset in enumerate(r['assetIds']):
   name=mapping[asset.split(':')[1]];names.append(name);m,t=load(name)
   # Outfit previews are a three-piece product lineup, not an invented worn mesh.
   polys+=geometry(m,t,((i-1)*18,0,0) if len(r['assetIds'])>1 else (0,0,0))
  origin='game-model'
 else:
  kind='supply' if r['kind']=='supplies' else 'scroll' if 'SCROLL' in r['giftReward'] else 'repair' if 'REPAIR' in r['giftReward'] else 'coins'
  tier=['common','uncommon','rare','epic','legendary'].index(r.get('rarity','common'));m,t=invented(kind,tier);polys=geometry(m,t);origin='original-item-art'
 for frame in range(8):render(polys,30+frame*45).save(out/f'{rid}-{frame}.webp',quality=90)
 render(polys,30,800).save(out/f'{rid}-large.webp',quality=94)
 manifest[rid]={'source':origin,'models':names,'frames':8,'image':f'/season/rewards/{rid}-0.webp','large':f'/season/rewards/{rid}-large.webp'}
Path('content/season-previews.json').write_text(json.dumps(manifest,indent=2))
print(f'Rendered {len(manifest)} rewards, eight angles and large hero variants each.')
