import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { InnFloorPlan } from "@/components/inn-floor-plan";
export const metadata = {
  title: "Settlements & Inns",
  description:
    "Build your first Inn: a simple checklist, overhead layout, and exterior and interior inspiration. Owners and territory stewards can register settlement structures.",
};
export default function Settlements() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="Build an Inn. Make it yours."
        description="A place to rest. A warm hearth. The beginning of your settlement."
      />
      <div className="wrap inn-build-guide">
        <section
          className="inn-build-basics"
          aria-labelledby="inn-checklist-title"
        >
          <div className="inn-checklist">
            <span className="eyebrow">YOUR FIRST SETTLEMENT BUILDING</span>
            <h2 id="inn-checklist-title">Five steps. Your design.</h2>
            <ol>
              <li>
                <strong>Build within your existing settlement.</strong>
                <p>
                  You must own the territory or be one of its stewards to
                  register or deregister structures.
                </p>
              </li>
              <li>
                <strong>Stay within 20 × 20 × 20 blocks.</strong>
                <p>
                  The whole Inn’s registered cube must fit your territory and
                  stay separate from other Inns.
                </p>
              </li>
              <li>
                <strong>Include the essentials.</strong>
                <ul>
                  <li>2–5 complete beds</li>
                  <li>3–6 chests or barrels</li>
                  <li>1 furnace or smoker</li>
                </ul>
              </li>
              <li>
                <strong>Get creative!</strong>
                <p>
                  Choose your walls, floors, roof, and decorations. No fixed
                  blueprint or separate bedrooms required.
                </p>
              </li>
              <li>
                <strong>Place this sign at the entrance last.</strong>
                <p>
                  Write these two lines on the front. Save it to register, or
                  right-click to check again.
                </p>
                <div
                  className="inn-entry-sign"
                  aria-label="Example front of entrance sign"
                >
                  <code>
                    [UnrealInn]
                    <br />
                    Oak Inn
                  </code>
                </div>
                <p className="inn-small-note">
                  Replace “Oak Inn” with your own name. Stay within eight blocks
                  while it checks.
                </p>
              </li>
            </ol>
            <Link href="/structures/hearthstone/" className="text-link">
              Need territory? Build a Hearthstone <ArrowUpRight size={17} />
            </Link>
          </div>
          <InnFloorPlan />
        </section>
        <section
          className="inn-inspiration"
          aria-labelledby="inn-inspiration-title"
        >
          <div className="inn-inspiration-heading">
            <div>
              <span className="eyebrow">FROM THE BASICS TO YOUR OWN PLACE</span>
              <h2 id="inn-inspiration-title">
                Same essentials. A little imagination.
              </h2>
            </div>
            <p>
              Timber beams, a welcoming entrance, and a cozy interior. Make
              something worth coming home to.
            </p>
          </div>
          <div className="inn-inspiration-views">
            <figure>
              <div className="inn-art-view">
                <img
                  src="/art/inn-exterior-interior-v1.png"
                  width="2056"
                  height="765"
                  alt="Minecraft-style timber and stone Inn exterior with a welcoming entrance and an UnrealInn sign beside the door."
                />
              </div>
              <figcaption>THE FRONT · A SIGN AT THE ENTRANCE</figcaption>
            </figure>
            <figure>
              <div className="inn-art-view inn-art-interior">
                <img
                  src="/art/inn-exterior-interior-v1.png"
                  width="2056"
                  height="765"
                  alt="Cozy Minecraft-style Inn interior with a plank floor, red beds, storage chests, a furnace and warm lanterns."
                />
              </div>
              <figcaption>THE INTERIOR · ROOM TO MAKE IT YOURS</figcaption>
            </figure>
          </div>
          <p className="inn-art-note">
            Illustrated build inspiration. Your Inn does not need to look like
            this.
          </p>
        </section>
        <details className="inn-quick-reference">
          <summary>Income &amp; useful commands</summary>
          <div>
            <p>
              A valid Inn earns{" "}
              <strong>10 / 15 / 18 / 20 Coins per hour</strong> for 2 / 3 / 4 /
              5 rooms. After the minimum, add a bed and a storage block together
              for each extra room. Earnings go to the territory owner, even when
              a steward registers it.
            </p>
            <p>
              <code>/inn list</code> — status and progress.{" "}
              <code>/inn remove Oak Inn</code> — deregister without removing
              blocks. Right-click the sign after expanding. Validated Inns keep
              earning while you are offline; missing requirements or lost
              territory stop new earnings.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
