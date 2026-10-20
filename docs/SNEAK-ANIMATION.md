# Sneak animation

The character retains the original detailed UnrealMMO illustration: layered brown block hair, green eyes, forest-green tunic with gold trim, leather gauntlets and boots, diagonal chest strap, square gold belt buckle, and pixel iron sword. The wooded background is the original imagegen clean plate. The simplified Three.js character was removed.

The built-in imagegen tool created an eight-cell transparent pose sheet using the original crouched character PNG as an identity reference. The prompt required identical design, lighting, camera, scale and boot baseline through progressive standing-to-crouching poses. The first seven cells provide the complete motion; the final redundant cell is unused. The source sheet is retained as lossless `public/art/sneak-poses.webp`.

Run `node scripts/render-sneak.mjs` from the repository root with website dependencies and FFmpeg installed. The renderer uses Sharp (included with Next.js) to align the pose baselines and composite them over the original forest. FFmpeg motion compensation interpolates between pose drawings. Idle breathing is anchored at the feet. A soft pixel dissolve removes the character while preserving the woods. It reverses the pose progression while revealing the character during the return to standing.

| Time              | Action                                  |
| ----------------- | --------------------------------------- |
| 0–2 seconds       | Standing with breathing and subtle sway |
| 2–2.5 seconds     | Smooth crouching motion                 |
| 2.5–3 seconds     | Hold the crouch                         |
| 3–3.75 seconds    | Dissolve into invisibility              |
| 3.75–5.75 seconds | Fully invisible for two seconds         |
| 5.75–6.5 seconds  | Reappear while standing up              |
| 6.5–7 seconds     | Settle into the starting idle pose      |

The GIF contains 168 frames at 24 fps. Generation verifies identical first/last source frames and an unchanged invisible hold. The page provides pause/play and a standing still for reduced-motion settings.
