# Hollow Harvest reward road

Published design replaces the text-led catalog with one continuous compact lineup,40 tier markers and56 reward cards. Regular rewards stay left;16 premium rewards have gold borders on the right. The USD15 premium offer appears after tier40. All checkout links remain local explanatory anchors with no payment or entitlement behavior.

## Artwork and model provenance

The21 cosmetic reward bundles use25 actual original resource-pack cuboid models and their authored face textures. `model-sources.json` records hashes of each source model and texture. Each visual reward has eight orthographic turntable angles plus an800px composition render;312 view frames were checked for nonempty alpha. Outfit previews now show the chest, leggings and boots worn together on a neutral player-proportioned mannequin. The renderer uses the actual humanoid and humanoid_leggings equipment textures with their armor UV layouts and outer/inner layer sizes. `armor-sources.json` records equipment definition and texture hashes. No helmet or other separately earned reward is added to the outfit. Studio lighting/rotation differs from vanilla rendering; these are model previews, not screenshots or new compatibility evidence.

Original voxel pouch, scroll, repair-note and supply-crate artwork was authored in the render script. Coin/scroll palette follows common/uncommon/rare/epic tiers. These are website illustrations; in-game consumables still use vanilla item appearances, which the inspector states. Four titles use typographic nameplates. No game item appearance was changed by this website delivery.

The woodland and court backdrops are original generated artwork: a moonlit lantern pilgrimage through autumn spruce ruins, and a spectral abandoned conservatory with plum banners, teal mist and candlelight. No third-party game art was copied. Actual reward renders are layered over both scenery and hero/purchase compositions. Desktop backgrounds remain fixed as the road scrolls; mobile and reduced-motion users receive ordinary scrolling backgrounds. No scroll hijacking or continuously running animation loop.

`render-season-assets.py` renders the original pack's JSON geometry and textures with Pillow/numpy. It requires the local canonical season catalog and model catalog alongside the supplied pack path; it is not run during public CI. Prebuilt artwork is tracked. Geometry is not invented for cosmetic previews. Consumable geometry is separate, original website artwork. No plugin code, player data or runtime logs are included in the website.

## Verification

21 tests and full static export verification passed:29 HTML pages,1189 local references,144 image alt checks and all693 existing skill rows. The reward catalog/amounts did not change. Browser checks at1280×720,390×844 and820×900 verify desktop/phone presentation, continuous tier ordering, all40 rows/56 cards/16 premium borders, actual-model rotation in both directions/wrap, scroll requirements, Escape and restored focus, and unavailable checkout anchors. No browser errors. Phone overflow caused by the purchase composition was corrected; final phone/tablet document width equals viewport width. Static card posters load lazily and inspector angles load only on demand; the complete artwork directory is approximately4.1MB, not the initial page transfer. No new WebGL contexts or runtime rendering dependency.

Screenshots here show desktop hero, premium showcase, model inspector and phone road. Preview did not test authenticated game clients or close outstanding Folia/cosmetic release gates. Source edits are website-only and require no server restart.

## Compact lineup and hero update

The hero now uses separate text/art grid columns (stacked on phone) and a posed player wearing the actual Regent equipment textures, with an original neutral character skin. No artwork crosses the copy region. Both ravens now assemble body plus real left/right wing geometry, facing the camera at165 degrees with wings spread; all8 preview angles were regenerated. Hero assembly recipe and source hashes are recorded alongside this document. These are static flight poses, not an in-game animation change. The regalia reward inspector remains the neutral mannequin; only the hero adds the posed character.

Cards use compact thumbnail-and-caption rows on desktop and small stacked cards on phones. Full-size model inspection remains available. Measured desktop lineup height5832px and phone5842px, preserving40 rows/56cards/16premium borders. Desktop1280, tablet820 and phone390 widths show no horizontal overflow; text and art rectangles do not overlap. Removed cosmetic-only marketing notices as requested; price and placeholder checkout unchanged. All21 tests/static export passed. No game server files were changed.

## Automatic model turntables

Reward dialogs now load real geometry and textures on demand and rotate smoothly at15degrees/second (24seconds per turn). The numbered8-view controls are removed; one Pause/Rotate button remains. The39 self-contained model payloads total about1.4MB, with only the selected reward fetched. Three.js loads dynamically; the lineup stays static/lightweight. Reduced-motion defaults to paused; hidden tabs stop frames; closing aborts pending fetches and disposes GPU resources. WebGL/model startup failure retains the static poster. Text titles stay static. Export recipe: export-season-models.py with the original pack path; uses the same geometry, equipment layers, complete winged ravens and original consumable art as the posters.
