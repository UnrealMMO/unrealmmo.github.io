# UnrealMMO Hearthmark brand kit

Approved direction: **The Bastion**, option one. Gold U-shaped shield, central flame and angular lower M detail. Gold artwork is best placed on dark emerald or a darkened landscape.

Download: `/brand/unrealmmo-brand-kit.zip`.

The kit includes transparent PNG stacked and horizontal logos, wordmark and standalone emblem; transparent square icons from 16 to 1024 pixels; emerald avatars at 512 and 1024 pixels; and landscape banners at 468×60, 728×90, 1200×300, 1500×500, 1920×1080 and 1200×630. The banners include `mc.unrealmmo.com`. Dimensions are general-purpose exports, not guarantees for every social or listing service. Avatar margins accommodate a circular crop.

The website uses compact WebP logos for its hero, navigation and footer, PNG/ICO browser icons and a 1200×630 branded link preview. Minecraft uses the transparent 64×64 PNG as `server-icon.png`.

Production master: `docs/art/hearthmark-master.png`, generated using the built-in image tool. Exact extraction prompt: `docs/art/hearthmark-logo.json`. Rebuild exports with `node scripts/build-brand-kit.mjs` from the repository root. The script uses the existing original valley artwork for banners. Keep shape proportions and the emblem/wordmark spacing intact. These are raster assets; large outputs are resampled, not native vector artwork.

No social accounts or external server-listing entries were modified. The kit supplies assets ready for those uploads.
