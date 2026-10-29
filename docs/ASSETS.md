# Asset provenance

- `public/art/wardtower-shield-wide-v1.webp`: wide reframe of the original Wardtower illustration using built-in imagegen, placing the shield and tower on the left for the homepage section background. [Edit prompt](art/wardtower-backdrop.json). A responsive CSS gradient keeps the adjacent copy readable.

- `public/brand/hearthmark/`: approved Hearthmark / Bastion identity, extracted to transparency with built-in imagegen. Stacked and horizontal logos, icon, wordmark, favicons, avatars and six banner sizes derive from the same raster master. [Prompt and source](art/hearthmark-logo.json), [kit guide](BRAND-KIT.md). Replaces the original geometric emblem in the live site; the old SVG remains only as a historical asset.

- `public/art/wardtower-frame-v1.webp`: original antique-gold and emerald oak-leaf picture frame generated with the built-in image tool, encoded as quality-90 WebP with transparency preserved. The landscape remains a separate image. [Generation prompt](art/wardtower-frame.json).

- `public/art/wardtower-shield-v1.webp`: original Tier 4 Wardtower landscape generated with the built-in image tool, encoded as quality-88 WebP (1536 × 1024). The distant tower and protective dome are illustrative artwork, not a gameplay capture. [Generation prompt](art/wardtower-shield.json).

- `public/art/diamond-tree-ingame.webp`: user-supplied Minecraft gameplay screenshot, retained as source. `diamond-tree-cutout.webp` is a transparent background extraction made with the built-in image tool, preserving the tree design and a small grass patch. Homepage CSS fades the ground edge; structure guides are unchanged.
- `public/art/minecraft-diamond.webp`: user's supplied Minecraft diamond texture, losslessly encoded with its original transparency; replaces the original drawn SVG particles. Minecraft artwork belongs to Mojang/Microsoft.
- Tree cutout prompt (built-in image tool): Extract only the existing diamond-block tree and three-block gold trunk with a small feathered grass patch. Remove sky, clouds, beacon beam, river, hills and landscape. Preserve block arrangement, perspective, pixel textures, colors and lighting. Transparent background; no added sparkles, diamonds or text.

- `public/art/unreal-valley.webp`: original UnrealMMO concept artwork generated with the built-in image-generation tool on 19 October 2026, then encoded as WebP for delivery. Original PNG retained in the author's local generation library.
- `public/art/sneak-vanish.gif`: historical seven-second sneak/invisibility loop (no longer loaded by the page) using detailed imagegen character poses over the original wooded background. `sneak-poses.webp` preserves the original detailed character design across matching standing and crouching poses; `sneak-visible.webp` supplies the standing reduced-motion/loading still; `sneak-woods.webp` is the unchanged background plate. See [animation production notes](SNEAK-ANIMATION.md) for timing, provenance, and reproduction. This is illustrative art, not captured gameplay. No game textures or skins are distributed.
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

## Firestorm enemy reactions — 25 October 2026

`public/art/firestorm-valley-clean-v2.webp` (2172 × 724) removes the two painted-in enemies from the original valley with built-in imagegen. `public/art/firestorm-enemy-v1.webp` (400 × 600, transparent) is an extracted/recreated enemy sprite from the same original reference, generated at 1024 × 1536 and downscaled. [Exact edit prompts](art/firestorm-reactions.json). The original backdrop and earlier screenshots remain as historical assets.

The live scene now places two copies of that sprite over the static clean landscape. Each sprite's upper body and two legs use CSS clipping so alternating leg rotations and a slow advance suggest walking. Three timed volleys deliver 42 × 104px fireballs on desktop (25 × 64px on narrow layouts), impact glows, brief damage tint, recoil, body flames and rising smoke. The enemies advance 18px before the first impact; each hit returns 6px, ending at their initial position for the next nine-second loop. This is an illustrative choreography, not a gameplay knockback promise. The sprite adds about 24 KB; the new clean backdrop is about 287 KB. All reaction layers inherit pause/offscreen behavior, and reduced motion disables the walks, recoil, flashes and flames.

## Firestorm staff lift — 25 October 2026

`public/art/firestorm-caster-body-v2.webp` and `public/art/firestorm-casting-arm-v2.webp` are matching 600 × 900 transparent layers derived from the original caster with built-in imagegen. [Exact edit prompts](art/firestorm-staff-raise.json). Each generated 1024 × 1536 master was downscaled with alpha preserved. The original complete caster remains as historical artwork.

The body stays planted; the separate right arm, complete staff and nested glow rotate together around a shoulder anchor at 52% / 42% of the original canvas. In the existing nine-second loop, the staff starts lowered at 28°, lifts between 8% and 24%, reaches −18° before the first fireball appears at 25%, and follows through at the 31% / 43% / 55% impact beats. Enemy recoil and ignition retain their matching impact schedule (the second enemy and its aimed fireball are both delayed 0.24s). The staff returns to its initial lowered pose by 80%. Reduced motion leaves the arm in its static lowered pose; pause and offscreen pausing include the arm and glow.

## Minecraft fire and full-body casting — 25 October 2026

The live Firestorm scene now uses Minecraft Java 26.2's original `fire_charge`, `fire_0`, `fire_1`, `flame` and `big_smoke_4` textures, extracted byte-for-byte from the installed client at the user's request. These are Mojang/Microsoft artwork, not original UnrealMMO assets. [Source paths and SHA-256 hashes](art/minecraft-fire.json). The two 16 × 512 fire sheets animate their 32 frames at 20 Hz with nearest-neighbor pixel rendering. Fire-charge cores have animated flame envelopes; the enemies use three overlapping fire planes, plus native smoke and flame particles. The About page credits the game artwork.

`public/art/firestorm-caster-sequence-v3.webp` is a six-frame, 2400 × 600 transparent atlas derived from a new imagegen full-body pose sheet. [Exact prompt and production record](art/firestorm-casting-poses.json). The generator returned 1448 × 1086 rather than the requested 2048 × 1536. The retained source is `docs/art/firestorm-caster-poses-source.png`; `scripts/build-firestorm-poses.mjs` selects source cells 0, 1, 2, 4, 5 and 6, aligns their boot baselines, and resamples each 362 × 543 cell to 400 × 600. [Alignment data](art/firestorm-pose-alignment.json). These are modestly upscaled delivery frames, not native 400 × 600 artwork.

The six poses show ready stance, knee-bent anticipation, staff lift, overhead cast, forward release and follow-through. Discrete sprite poses replace the previous rotated arm layer; no caster transform tilts the whole figure. The overhead pose precedes the first rain at 25% of the nine-second loop, then the release holds through the three impact volleys and recovers to the same ready frame. Pixel fire, caster poses and enemy reactions share the existing pause/offscreen behavior. Reduced motion displays the ready pose with unburned enemies and no rain. Earlier artwork and evidence remain historical. This remains a website illustration, not recorded gameplay.

## Continuous casting and ground explosions — 25 October 2026

The live caster now uses a continuously interpolated canvas rig over the existing original `firestorm-caster-body-v2.webp` and `firestorm-casting-arm-v2.webp` artwork. A mesh bends the upper arm and forearm independently, moves the wrist and rigid staff together, and adds torso/hip compression while keeping the boot anchors planted. Smooth easing connects anticipation, overhead lift, release, volley follow-through and recovery; the six-frame atlas is retained only as historical artwork. `components/firestorm-rig.ts` records the joints and timing. The renderer reads the same nine-second CSS timeline as the spell, stops its animation-frame loop when paused/offscreen, and uses a static ready pose for reduced motion. The original complete caster is a loading/error fallback. No new generated image was needed for this revision.

Minecraft Java 26.2's original `explosion_0.png` through `explosion_15.png` were extracted byte-for-byte from the installed client, following its particle texture order. They belong to Mojang/Microsoft. The existing [texture provenance record](art/minecraft-fire.json) includes source paths and SHA-256 hashes. `scripts/build-firestorm-explosion.mjs` packs the unchanged 32 × 32 frames into a lossless 512 × 32 strip for delivery. Each ground impact plays all 16 frames over roughly 0.8 seconds; this is illustrative timing, not a promise of native spell explosion damage or terrain destruction.

The barrage is reduced from 14 projectiles per volley to two, with three volleys per loop: six total instead of 42. Desktop envelopes are 88 × 132px (previously 52 × 88px); narrow layouts use 56 × 84px (previously 32 × 54px). Fireballs and their explosions share a ground anchor at the enemies' feet, and each lane retains its matching enemy's 0.24-second stagger. All previous art and verification evidence remain available.

- `public/art/sneak-cloak-v2.mp4`: historical nine-second, 48 fps full-color sneak loop, rendered from the existing original pose sheet and forest plate. Eased crouch/stand motion and continuous opacity fade replace the historical GIF’s pixel dissolve. No new third-party artwork. See [animation production notes](SNEAK-ANIMATION.md).

- `public/art/sneak-cloak-v3.mp4`: current corrected Sneak loop, using the same original art and timing as v2, with the zero-opacity reveal boundary fixed.

## Bright discovery scene — 29 October 2026

`public/art/discover-valley-v1.webp` and `discover-valley-v1-768.webp` are original artwork generated with the built-in image_gen tool. Promotional concept art depicting existing skill and settlement themes, not a server screenshot or exact structure blueprint. The full prompt is in `docs/discover-scene-prompt.txt`. WebP encoding uses Sharp; 1536px and 768px variants serve desktop and mobile.
