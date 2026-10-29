# Purchase layout and model depth correction

Purchase artwork is contained in a fixed-height grid cell: desktop 510px, phone 330px. At 390px viewport, the artwork cell ends 26px before the copy begins; no horizontal overflow. Desktop layout also checked.

All 39 browser model payloads regenerated with deterministic separation of coplanar faces, applied after model assembly and before grouping by texture. Same/opposite winding regression check passes; inputs remain unchanged. This corrects website preview depth conflicts, not the Minecraft renderer. Shovel and outfit turntables checked in browser, including the new original Dread Lantern model with tier-40 regular armor. npm run verify: 22 tests and static export pass.

Dread Lantern source: UnrealSkills/cosmetics-plugin/authoring/season1/jack_o_lantern.py. Website previews use its actual model/textures. Server reward definition candidate appends season1:jack_o_lantern as part 3 of the regular final bundle. Server release remains gated on saved-contract migration and native wearable fit/first-person acceptance; this page does not grant ownership.
