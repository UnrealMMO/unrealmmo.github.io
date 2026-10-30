# Current tall woodland backdrop

The reward road now uses `public/season/woodland-tall.webp`, a downward extension of the original woodland, generated with the built-in image tool on 29 October 2026. Native output is 768×2048, encoded as WebP at quality 96 without upscaling. The older wide replacement below is retained as historical evidence and is not displayed.

The sticky window reveals one continuous top-to-bottom sweep. Translation uses the measured image height minus the window height, clamped to the road’s scroll progress. There are no repeating keyframes, direction changes, zoom or foreground reward overlays. Scrolling upward retraces the same scene. ResizeObserver updates travel after viewport changes; reduced-motion preferences keep the backdrop still.

## Tall image prompt

Extend this exact UnrealMMO woodland artwork into a VERY TALL VERTICAL PANORAMA for a scrolling website. Target 1536 pixels wide by 4096 pixels tall, portrait ratio approximately 1:2.67, highest detail. Preserve the provided original landscape as the TOP quarter of the final panorama, maintaining its purple moon, distant teal castle, rust-orange autumn trees and voxel Minecraft stone architecture. OUTPAINT downward with new coherent terrain for the remaining three quarters: a long meandering descending stone walkway through mossy arches and dense autumn forest, then ruined courtyards, weathered stone stairs, warm small candles and pumpkins, finally close foreground mossy cobblestone terraces. This must be ONE seamless continuous environment, not panels, no repeated scenery or mirrored segments, no stretched existing pixels. Every vertical section should contain rich crisp small block textures and distinct architectural details, with quiet dark teal open areas through center for cards overlaid later. Maintain original painterly voxel lighting and depth exactly. Do not replace it with a different castle scene. No large lantern props, no people or reward models, no text, no borders, no UI. Prioritize a truly tall composition with much more new imagery DOWNWARD than the reference, not a landscape image.

The requested dimensions were not returned by the tool; the native dimensions above describe the delivered asset.

## Current verification

All 26 tests, static export and link checks pass. Desktop 1280×720 and mobile 390×844 browser checks show continuous scenery, readable cards and no horizontal overflow. Desktop scroll offsets 1860, 3300, 4740 and 5460 produced translations −618.99, −1377.58, −2136.17 and −2515.47 pixels; scrolling back to 4740 restored −2136.17. Mobile movement also remained monotonic. The regression test samples the entire progress range, checking direction and travel bounds.

---

# Hollow Harvest approach backdrop

Generated with the built-in image-generation tool on 29 October 2026. Saved as `public/season/harvest-approach.webp`. Native output is 1672×941; no artificial upscaling. WebP quality 94. The browser renders an oversized image within a sticky viewport, pans vertically and scales from 1 to 1.18 across the reward track. Actual published game-model renders enter at the sides in the latter half. Cards and their text do not transform. Reduced-motion mode uses a still composition.

## Generation prompt

Create a very high detail oversized website backdrop, 3840x2160 landscape if supported. Minecraft voxel cinematic fantasy environment for UnrealMMO Hollow Harvest autumn season. A single coherent landscape with distant haunted Gothic castle on high cliffs and teal moonlit fog in upper half, winding descending stone approach through rust-orange autumn trees in middle, rich close foreground ruined courtyard stone terraces and pumpkins in lower half. Strong depth, crisp individually detailed voxel blocks, moss, fallen leaves, ivy, atmospheric shafts of turquoise light contrasting tiny warm candles. Viewing from far overlook toward courtyard. Wide quiet middle for website cards; striking details toward sides. No lantern objects at all, no oversized objects, no people, no reward items, no text or UI or logos. We will separately overlay actual game reward models in foreground. High resolution, not blurred, premium game environment key art. Tall enough content within 16:9 frame that scrolling from upper distant landscape to lower courtyard dramatically changes the scene. Match dark forest green, turquoise mist, amber and muted purple UnrealMMO Halloween palette.

## Checks

Full website verification passed (25 tests, static export, links/assets). Browser checked the distant start and close-up final tiers at desktop size, plus 390px mobile reward cards, modal open/close and zero horizontal overflow. The decorative giant lantern was removed from the road, not from the earned-reward catalogue.
