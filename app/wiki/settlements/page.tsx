import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { StableFloorPlan } from "@/components/stable-floor-plan";
import { InnFloorPlan } from "@/components/inn-floor-plan";
export const metadata = {
  alternates: { canonical: "/wiki/settlements/" },
  title: "Settlements, Inns & Stables",
  description:
    "Create settlement structures: a simple checklist, overhead layout, and exterior and interior inspiration. Owners and territory stewards can register settlement structures.",
};
export default function Settlements() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="Settlements"
        description="Build Inns and Stables in your territory to earn Coins. Follow the requirements, then register each building with a sign."
      />
      <div className="wrap settlement-layout">
        <nav className="settlement-nav" aria-label="Settlement structures">
          <a href="#getting-started">Getting started</a>
          <a href="#inn">Inn</a>
          <a href="#stable">Stable</a>
        </nav>
        <div className="inn-build-guide">
          <section id="getting-started" className="wiki-settlement-start">
            <h2>Start with a home</h2>
            <p>
              Build a Hearthstone and confirm your territory. Then add an Inn or
              Stable inside its borders.
            </p>
            <p>
              Owners and stewards can register settlement buildings. Use your
              Hearthstone Core to invite friends and choose their permissions.
            </p>
            <div className="wiki-related">
              <Link className="text-link" href="/wiki/structures/hearthstone/">
                Build your first Hearthstone ↗
              </Link>
              <Link
                className="text-link"
                href="/wiki/structures/hearthstone/#membership"
              >
                Roles &amp; permissions ↗
              </Link>
            </div>
          </section>
          <section id="inn" aria-labelledby="inn-title">
            <header className="settlement-structure-heading">
              <h2 id="inn-title">Inn</h2>
              <p>Build a welcoming Inn that earns Coins for your territory.</p>
            </header>
            <div className="inn-inspiration-views settlement-examples">
              <figure>
                <div className="inn-art-view">
                  <img
                    src="/art/inn-exterior-interior-v1.png"
                    width="2056"
                    height="765"
                    alt="Minecraft-style timber and stone Inn exterior with a welcoming entrance and an UnrealInn sign beside the door."
                  />
                </div>
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
              </figure>
            </div>
            <section
              className="inn-build-basics"
              aria-labelledby="inn-checklist-title"
            >
              <div className="inn-checklist">
                <h3 id="inn-checklist-title">Build requirements</h3>
                <ol>
                  <li>
                    <strong>Build within your existing territory.</strong>
                    <p>
                      Only the territory owner or a steward can register or
                      deregister buildings.
                    </p>
                  </li>
                  <li>
                    <strong>Stay within 20 × 20 × 20 blocks.</strong>
                    <p>
                      The full cube must fit inside your territory without
                      overlapping another settlement building.
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
                      Design it your way. No fixed blueprint or separate
                      bedrooms needed.
                    </p>
                  </li>
                  <li>
                    <strong>Place this sign at the entrance last.</strong>
                    <p>
                      Write [UnrealInn] and a unique name on the next line. Save
                      to register; right-click the sign to manage your Inn.
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
                  </li>
                </ol>
                <Link
                  href="/wiki/structures/hearthstone/"
                  className="text-link"
                >
                  Need territory? Build a Hearthstone <ArrowUpRight size={17} />
                </Link>
              </div>
              <InnFloorPlan />
            </section>
            <section
              id="inn-income"
              className="inn-income"
              aria-labelledby="inn-income-title"
            >
              <h3 id="inn-income-title">Inn income</h3>
              <p>
                Add a bed and a chest or barrel together for each extra room.
                Earnings go to the territory owner.
              </p>
              <div
                className="inn-income-chart"
                role="img"
                aria-label="Hourly Inn income: 2 rooms, 2 beds and 3 storage blocks earn 10 Coins; 3 rooms, 3 beds and 4 storage blocks earn 15; 4 rooms, 4 beds and 5 storage blocks earn 18; 5 rooms, 5 beds and 6 storage blocks earn 20."
              >
                {[
                  { rooms: 2, coins: 10 },
                  { rooms: 3, coins: 15 },
                  { rooms: 4, coins: 18 },
                  { rooms: 5, coins: 20 },
                ].map(({ rooms, coins }) => (
                  <div
                    className="inn-income-row"
                    key={rooms}
                    aria-hidden="true"
                  >
                    <div className="inn-income-label">
                      <strong>{rooms} rooms</strong>
                      <span>
                        {rooms} beds · {rooms + 1} storage
                      </span>
                    </div>
                    <div className="inn-income-track">
                      <div
                        className="inn-income-bar"
                        style={{ width: `${(coins / 20) * 100}%` }}
                      >
                        <strong>{coins}</strong>
                      </div>
                    </div>
                  </div>
                ))}
                <span className="inn-income-unit" aria-hidden="true">
                  COINS PER HOUR
                </span>
              </div>
              <p className="inn-art-note">
                Validated Inns keep earning while you are offline. Missing
                requirements or lost territory stop new earnings.
              </p>
            </section>
            <div className="inn-commands">
              <p>
                <code>/inn list</code> — status and progress.{" "}
                <code>/inn remove Oak Inn</code> — deregister without removing
                blocks.
              </p>
            </div>
          </section>
          <section id="stable" aria-labelledby="stable-title">
            <header className="settlement-structure-heading">
              <h2 id="stable-title">Stable</h2>
              <p>A place to board horses and earn income for your territory.</p>
            </header>
            <div className="inn-inspiration-views settlement-examples">
              <figure>
                <img
                  className="settlement-example-image"
                  src="/art/stable-exterior-v1.png"
                  width="1448"
                  height="1086"
                  loading="lazy"
                  alt="Timber Stable exterior at sunset with two saddled horses tethered to fence posts, hay bales, a tack barrel and a water cauldron."
                />
              </figure>
              <figure>
                <img
                  className="settlement-example-image"
                  src="/art/stable-interior-v1.png"
                  width="1448"
                  height="1086"
                  loading="lazy"
                  alt="Lantern-lit timber Stable interior with two saddled horses tethered beside the aisle, hay bales, water and a tack barrel."
                />
              </figure>
            </div>
            <section
              className="inn-build-basics"
              aria-label="Stable build requirements and layout"
            >
              <div className="inn-checklist">
                <h3>Build requirements</h3>
                <ol>
                  <li>
                    <strong>Build within your existing territory.</strong>
                    <p>
                      Owners and stewards can register and deregister
                      structures.
                    </p>
                  </li>
                  <li>
                    <strong>Stay within 20 × 20 × 20 blocks.</strong>
                    <p>
                      The entire registered cube must fit inside your territory
                      without overlapping another settlement structure.
                    </p>
                  </li>
                  <li>
                    <strong>Include the essentials.</strong>
                    <ul>
                      <li>
                        At least 2 saddled, tamed adult horses, each led
                        directly to a fence post
                      </li>
                      <li>2 hay bales</li>
                      <li>1 water-filled cauldron</li>
                      <li>1 barrel for tack</li>
                    </ul>
                    <p>
                      Horses can share a post and belong to any player. Both
                      horse and post must be inside the cube. Other equines do
                      not count.
                    </p>
                  </li>
                  <li>
                    <strong>Get creative!</strong>
                    <p>
                      An open paddock works. No stalls, walls, roof or clear
                      routes needed. Hay and water are not consumed.
                    </p>
                  </li>
                  <li>
                    <strong>Place this sign at the entrance last.</strong>
                    <p>
                      Write [UnrealStable] and a unique name on the next line.
                      Save to register; right-click the sign to manage your
                      Stable.
                    </p>
                    <div
                      className="inn-entry-sign"
                      aria-label="Example Stable entrance sign"
                    >
                      <code>
                        [UnrealStable]
                        <br />
                        Green Pastures
                      </code>
                    </div>
                  </li>
                </ol>
              </div>
              <StableFloorPlan />
            </section>
            <section
              id="stable-income"
              className="inn-income"
              aria-labelledby="stable-income-title"
            >
              <h3 id="stable-income-title">Stable income</h3>
              <p>
                Each eligible horse increases income, up to six. Earnings go to
                the territory owner.
              </p>
              <div
                className="inn-income-chart"
                role="img"
                aria-label="Hourly Stable income: 0 or 1 eligible horse earns 0 Coins; 2 earn 10; 3 earn 15; 4 earn 18; 5 earn 20; 6 or more earn 21."
              >
                {[
                  { horses: "0–1", coins: 0 },
                  { horses: "2", coins: 10 },
                  { horses: "3", coins: 15 },
                  { horses: "4", coins: 18 },
                  { horses: "5", coins: 20 },
                  { horses: "6+", coins: 21 },
                ].map(({ horses, coins }) => (
                  <div
                    className="inn-income-row"
                    key={horses}
                    aria-hidden="true"
                  >
                    <div className="inn-income-label">
                      <strong>{horses} horses</strong>
                      <span>Saddled · tamed · tethered</span>
                    </div>
                    <div className="inn-income-track">
                      {coins === 0 ? (
                        <strong>0</strong>
                      ) : (
                        <div
                          className="inn-income-bar"
                          style={{ width: `${(coins / 21) * 100}%` }}
                        >
                          <strong>{coins}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <span className="inn-income-unit" aria-hidden="true">
                  COINS PER HOUR
                </span>
              </div>
              <p className="inn-art-note">
                A horse stops earning if it loses its saddle or lead, leaves the
                cube or dies. Bring back and tether eligible horses to restore
                income.
              </p>
            </section>
            <div className="inn-commands">
              <p>
                <code>/stable list</code> — status and progress.{" "}
                <code>/stable remove Green Pastures</code> — deregister without
                removing blocks.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
