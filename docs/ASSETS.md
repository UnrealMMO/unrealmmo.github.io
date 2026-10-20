# Asset provenance

- `public/art/diamond-tree-ingame.webp`: user-supplied Minecraft gameplay screenshot, retained as source. `diamond-tree-cutout.webp` is a transparent background extraction made with the built-in image tool, preserving the tree design and a small grass patch. Homepage CSS fades the ground edge; structure guides are unchanged.
- `public/art/minecraft-diamond.webp`: user's supplied Minecraft diamond texture, losslessly encoded with its original transparency; replaces the original drawn SVG particles. Minecraft artwork belongs to Mojang/Microsoft.
- Tree cutout prompt (built-in image tool): Extract only the existing diamond-block tree and three-block gold trunk with a small feathered grass patch. Remove sky, clouds, beacon beam, river, hills and landscape. Preserve block arrangement, perspective, pixel textures, colors and lighting. Transparent background; no added sparkles, diamonds or text.

- `public/art/unreal-valley.webp`: original UnrealMMO concept artwork generated with the built-in image-generation tool on 19 October 2026, then encoded as WebP for delivery. Original PNG retained in the author's local generation library.
- `public/art/sneak-vanish.gif`: original seven-second sneak/invisibility loop using detailed imagegen character poses over the original wooded background. `sneak-poses.webp` preserves the original detailed character design across matching standing and crouching poses; `sneak-visible.webp` supplies the standing reduced-motion/paused still; `sneak-woods.webp` is the unchanged background plate. See [animation production notes](SNEAK-ANIMATION.md) for timing, provenance, and reproduction. This is illustrative art, not captured gameplay. No game textures or skins are distributed.
- `public/art/server-placard-v2.webp`: original transparent gold-and-emerald frame generated with the built-in image-generation tool; [full prompt and production notes](SERVER-SIGN-ART.md). The server address remains live HTML text.
- `public/brand/emblem.svg`: original geometric UnrealMMO mark created for this site.
- `components/skill-icon.tsx`: five original UnrealMMO vector skill emblems: a shadow hood, crystal-bearing sapling, pickaxe and ore, axe and oak bough, and a leaping fish with hook. Shared filled silhouettes, shaded inlays, and pale bevels preserve clarity at small sizes. Skyrim skill symbols and the user's supplied icon sheet informed the visual direction; no third-party icon paths or artwork were copied.
- Isometric structure diagrams: generated from public gameplay block-coordinate definitions, using original SVG geometry.
- 3D blocks: original flat material colors and outlines. No Minecraft texture pack or Dragonwilds assets are distributed.
- Cinzel, Figtree and Almendra: self-hosted via Fontsource, SIL Open Font License. License text is included in `public/licenses/`.
- Lucide icons: ISC license, included in `public/licenses/`. Application dependency licenses remain with their packages and lockfile references.

Dead Reckoning supplied the technology and UI reference. The Dragonwilds website informed the forest/fantasy visual direction. Their logos, artwork, fonts, tracking identifiers, server details and page copy were not copied.

## Generation brief

Create an original cinematic wide landscape illustration for the website of UnrealMMO, an upcoming Minecraft fantasy MMORPG. 16:9 landscape, premium game key art, recognizable voxel/block-based Minecraft terrain with cubic cliffs, block-built pine forests, mossy ancient stone arch on the right foreground, a small timber-and-stone player homestead beside a winding river, distant layered craggy mountains and luminous mist, warm morning sun spilling through deep emerald canopy, tiny firefly-like golden motes. Painterly lighting over crisp cubic geometry. Rich forest greens, jade, soft gold, warm cream, teal atmospheric depth. Sweeping valley visible across the middle, dark green foliage framing the scene, open sky and room for the title. No people, mobs, dragons, lettering, logos or UI. Hopeful, adventurous, quietly magical. Original artwork, no RuneScape assets.
