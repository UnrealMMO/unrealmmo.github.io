import Link from "next/link";
import { PageIntro } from "@/components/ui";
export const metadata = { title: "About & credits" };
export default function About() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="Built with purpose."
        description="UnrealMMO is an upcoming Minecraft MMORPG, expanding survival multiplayer through meaningful skills and structures."
      />
      <article className="wrap prose">
        <h2>A handbook that grows with the game</h2>
        <p>
          These guides describe the current development build, reviewed on 19
          October 2026. Progression figures and probabilities use shipped
          default settings. Server balance may change before launch. Joining
          details will be added when the server is ready.
        </p>
        <p>
          Five skills are covered here: Sneak, Farming, Mining, Woodcutting and
          Fishing. The structures catalogue covers eight ore trees and the four
          Hearthstone stages, from a pedestal to a protection tower. Additional
          features will be documented as they become available.
        </p>
        <h2>Artwork & identity</h2>
        <p>
          UnrealMMO’s emblem, structure illustrations and interface were created
          for this project. The valley illustration is original AI-assisted
          concept artwork, not an in-game screenshot or a promise of a specific
          map. Structure diagrams are generated from the game’s block patterns.
        </p>
        <p>
          The diamond, fire-charge, flame, smoke and explosion textures are
          Minecraft artwork belonging to Mojang and Microsoft. Firestorm
          combines these game textures with original illustrated characters and
          scenery.
        </p>
        <p>
          The site uses the open-source Cinzel and Figtree fonts, Lucide icons,
          Next.js, React, Tailwind CSS, Framer Motion, Radix UI and Three.js
          with React Three Fiber. Asset provenance and dependency licenses are
          recorded in the website repository.
        </p>
        <h2>Independent Minecraft community</h2>
        <p>
          UnrealMMO is not an official Minecraft product and is not approved by
          or associated with Mojang or Microsoft. RuneScape and Dragonwilds are
          not affiliated with UnrealMMO.
        </p>
        <h2>Privacy</h2>
        <p>
          Skill filters, material checklists and 3D controls run in your
          browser. Checklists reset when the page reloads. We do not show
          third-party advertising to players. Our{" "}
          <Link href="/privacy-policy/">Privacy policy</Link> explains website
          purchases, payment providers, cookies, server data and your choices.
        </p>
      </article>
    </div>
  );
}
