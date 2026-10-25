# Asset provenance

- `public/art/wardtower-shield-wide-v1.webp`: wide reframe of the original Wardtower illustration using built-in imagegen, placing the shield and tower on the left for the homepage section background. [Edit prompt](art/wardtower-backdrop.json). A responsive CSS gradient keeps the adjacent copy readable.

- `public/brand/hearthmark/`: approved Hearthmark / Bastion identity, extracted to transparency with built-in imagegen. Stacked and horizontal logos, icon, wordmark, favicons, avatars and six banner sizes derive from the same raster master. [Prompt and source](art/hearthmark-logo.json), [kit guide](BRAND-KIT.md). Replaces the original geometric emblem in the live site; the old SVG remains only as a historical asset.

- `public/art/wardtower-frame-v1.webp`: original antique-gold and emerald oak-leaf picture frame generated with the built-in image tool, encoded as quality-90 WebP with transparency preserved. The landscape remains a separate image. [Generation prompt](art/wardtower-frame.json).

- `public/art/wardtower-shield-v1.webp`: original Tier 4 Wardtower landscape generated with the built-in image tool, encoded as quality-88 WebP (1536 × 1024). The distant tower and protective dome are illustrative artwork, not a gameplay capture. [Generation prompt](art/wardtower-shield.json).

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

## Hero enhancement — 20 October 2026

`public/art/unreal-valley-v2-1920.webp` and `public/art/unreal-valley-v2-3840.webp` are responsive delivery versions of an image-tool enhancement of the original valley. The generator returned 1672 × 941 pixels despite a 3840 × 2160 request. The enhanced source was resampled with Lanczos3 to 1920 × 1081 and 3840 × 2161 and encoded as quality-92 WebP. These are upscaled delivery assets, not native 4K renders. The original artwork remains available.

Edit prompt: Enhance the existing UnrealMMO hero at maximum available resolution while preserving the voxel valley composition, left sunrise, forest framing, river and waterfalls, lower-right house, right stone arch, snow mountain and emerald/gold palette. Improve fine block edges, stone texture, foliage and distant detail without oversharpening. No text, UI, bars, people, mobs or new structures; uninterrupted landscape to every edge.

## Firestorm showcase — 25 October 2026

`public/art/firestorm-valley-v1.webp` (2172 × 724) and `public/art/firestorm-caster-v1.webp` (600 × 900, alpha preserved) are original artwork created with built-in imagegen. [Exact prompts](art/firestorm.json). The user's gameplay screenshot informed the fire-staff design and rain-of-fire concept; it is not distributed. The valley is a static full-width background; a transparent caster, staff light, targeting ellipse, falling fire and embers share its responsive coordinate plane. This is an illustrative spell scene, not captured gameplay. The caster's PNG master was generated at 1024 × 1536 and downscaled for delivery. Total delivered artwork is about 399 KB.

The nine-second CSS loop charges the staff, reveals the target, rains fire and fades to a resting scene. Pause freezes all layers; replay remounts only the scene to restart its timeline. Intersection observation pauses the scene offscreen. Reduced motion uses a static caster, glow and targeting ring, without rain or embers. Controls use native buttons and visible keyboard focus. Mobile retains the same scene coordinates and crops the static landscape, placing text above the clearing.

Public copy describes implemented Firestorm, Ember Bolt and Inferno Nova without adding new unlocks or balance claims. No plugin or server files changed.
