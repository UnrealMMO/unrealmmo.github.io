# Asset provenance

- `public/art/unreal-valley.webp`: original UnrealMMO concept artwork generated with the built-in image-generation tool on 19 October 2026, then encoded as WebP for delivery. Original PNG retained in the author's local generation library.
- `public/art/sneak-vanish.gif`: original seven-second sneak/invisibility loop rendered from an articulated Three.js character, with procedural pixel textures and an iron sword, over an original imagegen wooded background. Standing idle runs from 0–2 seconds; crouching from 2–3 seconds; pixel dissolution from 3–3.75 seconds; full invisibility from 3.75–5.75 seconds; simultaneous reappearance and standing from 5.75–6.5 seconds; then standing idle returns smoothly to the start. `sneak-visible.webp` supplies the standing reduced-motion/paused still; `sneak-woods.webp` is the background plate. The original render source is `scripts/render-sneak.html`: serve the repository root locally, visit that file, and use its frame export control to produce a 112-frame atlas (8 columns, 560px tiles, 16fps). Split tiles in row-major order and encode as a looping GIF with FFmpeg. These are illustrative art, not captured gameplay. No game textures or skins are distributed.
- `public/art/server-placard-v2.webp`: original transparent gold-and-emerald frame generated with the built-in image-generation tool; [full prompt and production notes](SERVER-SIGN-ART.md). The server address remains live HTML text.
- `public/brand/emblem.svg`: original geometric UnrealMMO mark created for this site.
- Isometric structure diagrams: generated from public gameplay block-coordinate definitions, using original SVG geometry.
- 3D blocks: original flat material colors and outlines. No Minecraft texture pack or Dragonwilds assets are distributed.
- Cinzel, Figtree and Almendra: self-hosted via Fontsource, SIL Open Font License. License text is included in `public/licenses/`.
- Lucide icons: ISC license, included in `public/licenses/`. Application dependency licenses remain with their packages and lockfile references.

Dead Reckoning supplied the technology and UI reference. The Dragonwilds website informed the forest/fantasy visual direction. Their logos, artwork, fonts, tracking identifiers, server details and page copy were not copied.

## Generation brief

Create an original cinematic wide landscape illustration for the website of UnrealMMO, an upcoming Minecraft fantasy MMORPG. 16:9 landscape, premium game key art, recognizable voxel/block-based Minecraft terrain with cubic cliffs, block-built pine forests, mossy ancient stone arch on the right foreground, a small timber-and-stone player homestead beside a winding river, distant layered craggy mountains and luminous mist, warm morning sun spilling through deep emerald canopy, tiny firefly-like golden motes. Painterly lighting over crisp cubic geometry. Rich forest greens, jade, soft gold, warm cream, teal atmospheric depth. Sweeping valley visible across the middle, dark green foliage framing the scene, open sky and room for the title. No people, mobs, dragons, lettering, logos or UI. Hopeful, adventurous, quietly magical. Original artwork, no RuneScape assets.
