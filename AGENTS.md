# UnrealMMO website

This is the public website, not the private gameplay implementation. Keep plugin code, worlds, player data, logs, credentials, and private API configuration out of this repository.

- Preserve the Next.js App Router / React / TypeScript / Tailwind static-export setup.
- The user authorized GitHub Pages publication on 19 October 2026. Publish the verified static export from main only. Pull requests must never deploy. Keep the existing organization-site repository name; leave the custom domain unset until the user provides it.
- Commit and push verified changes to main.
- Explain only implemented skills and structures. Keep NPC features out of the public site for now. Server availability remains "In development" until confirmed.
- Verify handbook numbers against the actual plugin rules. Do not infer full Folia compatibility or load capacity from website tests.
- Structure definitions drive geometry, quantities, layer diagrams, and guides. Preserve non-WebGL instructions and keyboard controls.
- Use original UnrealMMO branding and artwork. Dragonwilds is a visual reference, not an asset source; Dead Reckoning is a UI/technology reference, not UnrealMMO's identity.
- Run npm run verify after changes to data or behavior. Browser-check affected interactive and responsive layouts.
