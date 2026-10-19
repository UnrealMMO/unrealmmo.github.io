# Website verification — 19 October 2026

## Automated evidence

- Production static export and TypeScript validation passed.
- Eight automated test groups passed: XP completeness, ordinary/milestone progression, combined Farming unlocks, ore-tree geometry and material counts, Hearthstone geometry, guide references, non-publishing CI configuration, and direct comparison with executed Java rules.
- All 495 displayed levels were compared against the actual plugin's pure Java implementations, compiled with Java 25. The numeric fixture records the plugin commit. This executes no game/server logic.
- Export inspection passed for 20 HTML files (18 content pages plus generated not-found outputs), 584 internal asset/link references, 42 image alt attributes, and 495 server-rendered level rows.
- npm dependency audit: zero reported vulnerabilities after the PostCSS 8.5.31 override.

## Browser checks

The actual static export was served locally, without a Next.js runtime server. Browser verification covered desktop (1280 × 720) and mobile (390 × 844):

- Homepage visual layout and navigation to the skills and structures catalogues. A feathered forest-green overlay, brighter text and restrained shadows improve hero readability on desktop and mobile; screenshots are saved in `docs/screenshots/`.
- Mobile menu opening, navigation and dismissal. No document-level horizontal overflow on inspected mobile pages.
- Complete 99-row initial skill table, unlock-only filter, search for Diamond Tree and return to all levels.
- Keyboard-controlled level slider reaching level 99, showing 1,000,000 XP and correct cumulative Farming bonuses.
- Skill-page anchor navigation and scrollable mobile progression table.
- Diamond Tree WebGL model creation, exploded layers, output openings, all camera presets and reset, previous-layer navigation, selected-block inspection and materials checkbox. Shareable layer links were copied and reloaded successfully.
- Hearthstone WebGL rendering and its 17 × 17 × 17 territory overlay on mobile.
- Non-WebGL instructions, diagrams and materials remain in the static HTML. The WebGL error boundary was inspected in code; a forced driver-failure scenario was not exercised.

A camera framing issue in exploded view was found and corrected. Developer-mode logs included a Three.js Clock deprecation warning from the rendering dependencies; no application error was observed during those interactions. Browser testing is representative, not an exhaustive matrix of hardware and browser versions.

## Delivery scope

No Minecraft plugin, game data, server configuration or deployment was changed. Website verification does not demonstrate Folia compatibility, authenticated multiplayer behavior or server capacity. Gameplay values describe a reviewed development snapshot and shipped defaults.

The repository contains website source, public gameplay facts, original artwork and numeric test fixtures. No private plugin source, player data, game worlds, credentials, raw server logs or reference-site tracking configuration is included.

The only workflow verifies builds. It cannot publish Pages. GitHub Pages must remain disabled until explicitly requested.
