# Sneak animation

The character retains the original detailed UnrealMMO illustration: layered brown block hair, green eyes, forest-green tunic with gold trim, leather gauntlets and boots, diagonal chest strap, square gold belt buckle, and pixel iron sword. The wooded background is the original imagegen clean plate. The simplified Three.js character was removed.

The built-in imagegen tool created an eight-cell transparent pose sheet using the original crouched character PNG as an identity reference. The prompt required identical design, lighting, camera, scale and boot baseline through progressive standing-to-crouching poses. The first seven cells provide the complete motion; the final redundant cell is unused. The source sheet is retained as lossless `public/art/sneak-poses.webp`.

Run `node scripts/render-sneak.mjs` from the repository root with website dependencies and FFmpeg installed. The renderer uses Sharp (included with Next.js) to align the pose baselines and composite them over the original forest. FFmpeg motion compensation interpolates between the pose drawings; quintic easing settles into and out of the crouch. A continuous opacity fade removes the whole character, sword and shadow against the unchanged forest plate. No pixel-dither dissolve or palette quantization is used in the current animation.

| Time | Action |
| --- | --- |
| 0–1.5 seconds | Standing hold |
| 1.5–2.25 seconds | Eased crouch |
| 2.25–3 seconds | Crouched anticipation |
| 3–4.25 seconds | Smooth fade into invisibility |
| 4.25–5.5 seconds | Fully invisible hold |
| 5.5–6.75 seconds | Reappear in the crouch |
| 6.75–7.5 seconds | Eased return to standing |
| 7.5–9 seconds | Standing hold, matching the loop start |

The production asset is `public/art/sneak-cloak-v3.mp4`: silent H.264, 640 × 640, 432 frames at 48 fps, nine seconds, 1,014,295 bytes. Generation verifies identical first/last source frames and an unchanged invisible hold. Set `SNEAK_PROOF_DIR` to save sampled PNGs and the render report. This remains an interpolated 2D illustration, not skeletal animation or captured gameplay.

The page mounts the video when the section first enters view, pauses it offscreen or when the document is hidden, with no visible playback controls. Reduced-motion users receive the standing image without mounting the video. The same image remains as a loading/error and no-JavaScript fallback. A blocked autoplay attempt retains the still illustration.

The prior seven-second, 24 fps `sneak-vanish.gif` is retained as a historical asset but is no longer loaded by the component. Existing illustration sources and earlier verification evidence remain unchanged.

The v3 renderer explicitly composites zero visibility as the background. This fixes the single fully visible frame at 5.5 seconds that v2 emitted before the reappearance fade. Generation now asserts that frame 264 exactly matches the invisible hold. Both older animation assets are retained as history.
