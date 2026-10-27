"""Refresh an independent numerical fixture by running the private plugin's pure Java rules.
Usage: python3 scripts/check-plugin-source.py /path/to/UnrealSkills /path/to/JDK/Home
Only numeric public handbook data is written; Java source stays in a temporary directory.
"""
from pathlib import Path
import json,subprocess,sys,tempfile,shutil
repo=Path(sys.argv[1]).resolve(); jdk=Path(sys.argv[2]).resolve()
specs={'sneak':('SneakRules','SneakRules.speedBonus(l)*100'), 'farming':('FarmRules','FarmRules.growth(l)*100, FarmRules.yield(l)*100'),'mining':('MiningRules','MiningRules.bonus(l)*100, MiningRules.bonus(l)*100'),'woodcutting':('WoodRules','WoodRules.speed(l)*100, WoodRules.yield(l)*100'),'fishing':('FishingRules','FishingRules.reduction(l)*100'), 'magic':('AttunementRules','AttunementRules.regenPercent(l), AttunementRules.potencyPercent(l)'), 'construction':('BuildingRules','BuildingRules.reach(l), Math.round((1-BuildingRules.hungerMultiplier(l))*100)')}
fixture={'sourceCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=repo,text=True).strip(),'levels':{}}
with tempfile.TemporaryDirectory(prefix='unrealmmo-handbook-') as temp:
 root=Path(temp); sources=[]
 api=root/'dev/unreal/skills/api';api.mkdir(parents=True)
 xp=api/'XpCurve.java';shutil.copyfile(repo/'skills-api/src/main/java/dev/unreal/skills/api/XpCurve.java',xp);sources.append(str(xp))
 for skill,(cls,expr) in specs.items():
  directory=root/f'dev/unreal/skills/{skill}';directory.mkdir(parents=True)
  rules=directory/f'{cls}.java';shutil.copyfile(repo/f'skills-{skill}/src/main/java/dev/unreal/skills/{skill}/{cls}.java',rules);sources.append(str(rules))
  driver=directory/'HandbookSnapshot.java'
  driver.write_text(f'''package dev.unreal.skills.{skill};
public class HandbookSnapshot {{public static void main(String[] args) {{for(int l=1;l<=99;l++){{System.out.print(l+","+dev.unreal.skills.api.XpCurve.DRAGONWILDS.threshold(l,1)); for(double n:new double[]{{{expr}}})System.out.print(","+n);System.out.println();}}}}}}''');sources.append(str(driver))
 subprocess.run([str(jdk/'bin/javac'),'-d',str(root),*sources],check=True)
 for skill in specs:
  out=subprocess.check_output([str(jdk/'bin/java'),'-cp',str(root),f'dev.unreal.skills.{skill}.HandbookSnapshot'],text=True)
  fixture['levels'][skill]=[[float(x) if '.' in x else int(x) for x in line.split(',')] for line in out.splitlines()]
Path('tests/fixtures').mkdir(exist_ok=True)
Path('tests/fixtures/plugin-rules.json').write_text(json.dumps(fixture,indent=2)+'\n')
print('Executed original Java rules for all 693 skill levels; saved numerical reference fixture.')
