# UnrealMMO website

The public home and player handbook for UnrealMMO, an upcoming Minecraft MMORPG built on SMP. Original woodland-fantasy branding, seven full skill guides (693 level entries), eight ore-tree guides, four cumulative Hearthstone build guides, with a reusable interactive 3D build explorer.

## Run locally

Requires Node.js 22 or later and npm.

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run verify
```

This runs numerical/content/geometry checks, a production static export, and a check of internal links, local assets, metadata, image alt attributes and all pre-rendered level rows. Static output is in `out/`. TypeScript is checked during the Next.js production build.

## Publishing

The site is published at https://unrealmmo.com/. The user authorized publication on 19 October 2026. The repository uses GitHub Actions as its Pages source; the legacy branch/Jekyll publisher is disabled.

`.github/workflows/verify.yml` verifies pull requests and main pushes. Only a successful main push uploads the `out/` export and publishes it through the `github-pages` environment. Deployment permissions are scoped to the deployment job. The existing custom domain is `unrealmmo.com`.

This organization repository uses the root path, so no `basePath` is needed. `trailingSlash: true` produces directory-index routes that survive direct navigation and refresh. Canonical metadata uses the configured custom domain.

## Stack

Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Radix Dialog/Tabs, Lucide, Three.js, React Three Fiber and Drei. The PostCSS override pins 8.5.31 to resolve the upstream audit findings while retaining the reference site's framework family. Dependencies are locked in `package-lock.json`.

## Content and maintenance

- `content/skills.json`: player-facing skill traits, training and controls.
- `content/xp.json`: the exact 99-entry threshold table used by the game.
- `content/game.ts`: progression calculations and shared structure geometry.
- `content/trees.json`: eight ore-tree variants and shipped cycle defaults.
- `content/provenance.json`: source revision and review date.
- `tests/fixtures/plugin-rules.json`: numeric reference produced by executing the private plugin's pure Java rules for all 693 skill levels. No Java source is included here.

An authorized maintainer with the plugin checkout can refresh that fixture:

```sh
python3 scripts/check-plugin-source.py /path/to/UnrealSkills /path/to/JDK25/Home
npm test
```

Review every public content change against the game and update the provenance date/revision. Balance changes are not automatically inferred from a live server. The handbook is a source snapshot, not a live-server inventory. The current review reconciles all seven skill guides, utility spell unlocks, Ore Tree operation, Hearthstone commands, and cosmetic rewards. Numerical verification does not certify live gameplay or scalability.

To add a structure, add a definition in `content/game.ts` (or a tree variant in `content/trees.json`) with coordinates, materials and steps. It is picked up by static route generation, the catalogue, the viewer and the materials checklist. Extend tests for new geometry and unique operating rules.

## Browser behavior

Skill pages are readable in initial static HTML. Search, unlock-only filtering and a level preview are progressively added in the browser. Structure pages initially show a lightweight isometric drawing; WebGL loads on request. Orbit, camera presets, exploded layers, air-port highlighting, per-block selection, materials checklists and shareable `?layer=` links are supported. Text instructions and top-down diagrams remain available if WebGL fails. Checklist state is session-only. No analytics, accounts or third-party tracking are installed.

See [verification](docs/VERIFICATION.md) and [asset provenance](docs/ASSETS.md).
