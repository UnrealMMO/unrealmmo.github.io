# Website verification — 19 October 2026

## Automated evidence

- Production static export and TypeScript validation passed.
- Eight automated test groups passed: XP completeness, ordinary/milestone progression, combined Farming unlocks, ore-tree geometry and material counts, Hearthstone geometry, guide references, main-only deployment guards, and direct comparison with executed Java rules.
- All 495 displayed levels were compared against the actual plugin's pure Java implementations, compiled with Java 25. The numeric fixture records the plugin commit. This executes no game/server logic.
- Export inspection passed for 20 HTML files (18 content pages plus generated not-found outputs), 584 internal asset/link references, 42 image alt attributes, and 495 server-rendered level rows.
- npm dependency audit: zero reported vulnerabilities after the PostCSS 8.5.31 override.

## Browser checks

The actual static export was served locally, without a Next.js runtime server. Browser verification covered desktop (1280 × 720) and mobile (390 × 844), with an additional 319-pixel-wide preview check:

- Homepage visual layout and navigation to the skills and structures catalogues. The feathered forest-green overlay uses 50% opacity, with two slow fog layers behind crisp text. CSS disables the fog animation for reduced-motion preferences. Animation movement and non-intercepting pointer behavior were checked in the browser; screenshots are saved in `docs/screenshots/`.
- Mobile menu opening, navigation and dismissal. No document-level horizontal overflow on inspected mobile pages.
- Complete 99-row initial skill table, unlock-only filter, search for Diamond Tree and return to all levels.
- Keyboard-controlled level slider reaching level 99, showing 1,000,000 XP and correct cumulative Farming bonuses.
- Skill-page anchor navigation and scrollable mobile progression table.
- Diamond Tree WebGL model creation, exploded layers, output openings, all camera presets and reset, previous-layer navigation, selected-block inspection and materials checkbox. Shareable layer links were copied and reloaded successfully.
- Hearthstone WebGL rendering and its 17 × 17 × 17 territory overlay on mobile.
- Non-WebGL instructions, diagrams and materials remain in the static HTML. The WebGL error boundary was inspected in code; a forced driver-failure scenario was not exercised.

A camera framing issue in exploded view and skill-card overflow at 319 pixels were found and corrected. Developer-mode logs included a Three.js Clock deprecation warning from the rendering dependencies; no application error was observed during those interactions. Browser testing is representative, not an exhaustive matrix of hardware and browser versions.

## Delivery scope

No Minecraft plugin, game data, server configuration or game-server deployment was changed. Website verification does not demonstrate Folia compatibility, authenticated multiplayer behavior or server capacity. Gameplay values describe a reviewed development snapshot, not a verified live-server configuration.

The repository contains website source, public gameplay facts, original artwork and numeric test fixtures. No private plugin source, player data, game worlds, credentials, raw server logs or reference-site tracking configuration is included.

The user subsequently authorized GitHub Pages publication. The workflow verifies before publishing the static export on main pushes; pull requests cannot deploy. Legacy branch publishing was disabled, and the custom domain remains unset.

## Full-screen hero — 20 October 2026

The hero now has a full-viewport minimum height without the former 95svh height or 1100px maximum, and reserves vertical space for its navigation and bottom status line. Mobile uses the same full-viewport floor with smaller padding. The half-strength shade and animated fog remain in place.

Browser measurements at 1440 × 900, 1920 × 1080, 2560 × 1440 and 390 × 844 confirmed the feature ribbon starts at or below the viewport bottom, with no document horizontal overflow. The large desktop selected the 3840px asset. The new artwork is an enhanced, upscaled source; see ASSETS.md for its native-resolution limitation.

## Provenance reconciliation — 20 October 2026

Re-executed all 495 XP/passive-bonus rows from current source revision `1f43d1ab6294384598c595cad8aaf10dccc9216a`; numeric values are unchanged. Source versions are core 0.9.1 / Farming 0.10.0, not verified deployed versions. The fixture revision now records that execution.

The whole-handbook source revision remains `9e15479bc684d7d742a705f8851a18e4bb314bb5`: Ore Tree nearby-owner and level-slot summaries still reflect that older snapshot. Provenance explicitly distinguishes this historical text from the current numerical review rather than certifying stale prose against newer source. Updating those guides is a separate follow-up. No new gameplay features, NPC content or private implementation were published. This metadata-only pass changes no interactive layout; earlier browser evidence above was not rerun.

Fresh `npm run verify` passed: eight test groups, production build/type validation, 23 generated pages, 20 exported HTML files, 599 local references, 49 image alt attributes and 495 pre-rendered level rows. `git diff --check` passed in all three repositories. Plugin code/configuration is unchanged; no native-server or Communities build is claimed by this documentation pass.

## Hearthstone update — 23 October 2026

Added the implemented Stage 2 structure from Territory 0.2.2: all 42 required blocks, four normalized build layers, exact 29 stone-brick / 8 polished-andesite / 5 iron-block totals, and separate added-material guidance. The Hearthstone Core item is distinguished from the built Hearthstone. A shared progression comparison labels the 100-cube Sanctuary and 200-cube Wardtower as planned, with no invented recipes or models. Stage 2 and the naming update are explicitly awaiting main-server rollout. Other gameplay provenance remains unchanged.

Browser checks cover the Stage 2 model, layer selection, material list, 50-cube overlay, and mobile diagrams at 390px. No horizontal page overflow or browser console errors were observed. The structure viewer now derives height, footprint labels and diagrams from geometry; the territory overlay and camera scale from the claim size. Text guides and layer diagrams remain available without WebGL. This qualifies website behavior only, not server compatibility or gameplay load.
