import Link from "next/link";
import { PageIntro } from "@/components/ui";
export const metadata = { title: "About & credits" };
export default function About() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="Built with purpose."
        description="UnrealMMO adds skills, spells and settlements to Minecraft survival."
      />
      <article className="wrap prose">
        <h2>A handbook that grows with the game</h2>
        <p>
          These guides use the default game settings reviewed on 27 October
          2026. Balance may change before launch. Joining details will follow
          when the server is ready.
        </p>
        <p>
          Explore seven skills, eight ore trees and four Hearthstone stages.
          We’ll add guides as new features arrive.
        </p>
        <h2>Artwork & identity</h2>
        <p>
          Our branding and illustrations were made for UnrealMMO. The valley is
          AI-assisted concept art, not an in-game screenshot. Structure diagrams
          use the game’s actual block patterns.
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
          Skill previews, checklists and 3D controls run in your browser.
          Checklists reset on reload. We don’t show third-party ads. Our{" "}
          <Link href="/privacy-policy/">Privacy policy</Link> explains website
          purchases, payment providers, cookies, server data and your choices.
        </p>
      </article>
    </div>
  );
}
