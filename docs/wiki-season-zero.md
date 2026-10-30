# Wiki previews and Season Zero collection

The guide directory uses static images beside each title. Structures are isometric diagrams generated from the existing block definitions; native items use Minecraft 26.2 textures or rendered UnrealMMO item geometry. Inn and Stable illustrations are examples, not fixed blueprints. Cosmetic detail pages reuse the accessible rotating viewer and static fallback.

The Cosmetics category contains a Season Zero collection grouped into headwear, outfits, tools/weapons, companions and titles. Every one of the 43 catalog reward types resolves to a Wiki page or supply-pack anchor. Dread Lantern has its own page and retains the premium tier-40 Regent Set unlock. Existing Coin Pouch, EXP Scroll and Repair Note guides remain shared across seasons.

## Asset regeneration

Run from the website root:

- `node --import tsx scripts/render-wiki-structures.tsx`
- `python scripts/render-wiki-cosmetics.py` (Pillow and NumPy required)
- `python scripts/export-wiki-icons.py /path/to/26.2.jar /path/to/assets/unrealmmo` (Pillow and NumPy required)

Cosmetic previews use the already-published self-contained model files; the standalone helmet uses the published resource-pack archive. Per-preview source hashes and chosen front angles are in `content/wiki-cosmetic-previews.json`. Native item provenance is in `docs/wiki-icons.json`. No private player or server data is exported.

## Verification — 29 October 2026

- Full verification: 25 tests, static export, 50 guide destinations, 43 season reward destinations, old guide compatibility and image/link checks.
- Browser: 1366×900 desktop and 390×844 mobile, guide filters/search, left-aligned thumbnails, collection grouping, armor and helmet detail pages, pause control and no horizontal overflow.
- This is a website-only change. It makes no new claims about server release acceptance and does not change reward contracts, grant logic or checkout behavior.
