import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { StableFloorPlan } from "@/components/stable-floor-plan";
import { InnFloorPlan } from "@/components/inn-floor-plan";
export const metadata = {
  title: "Settlements, Inns & Stables",
  description:
    "Create settlement structures: a simple checklist, overhead layout, and exterior and interior inspiration. Owners and territory stewards can register settlement structures.",
};
export default function Settlements() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="Settlements"
        description="Turn your protected territory into a settlement with structures you design. Meet each building’s requirements, register it with a sign, and bring your settlement to life."
      />
      <div className="wrap settlement-layout">
        <nav className="settlement-nav" aria-label="Settlement structures">
          <a href="#inn">Inn</a>
          <a href="#stable">Stable</a>
        </nav>
        <div className="inn-build-guide">
          <section id="inn" aria-labelledby="inn-title">
            <header className="settlement-structure-heading">
              <h2 id="inn-title">Inn</h2>
              <p>
                A place to rest, a warm hearth, and a steady income for your
                territory.
              </p>
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
                      You must own the territory or be one of its stewards to
                      register or deregister structures.
                    </p>
                  </li>
                  <li>
                    <strong>Stay within 20 × 20 × 20 blocks.</strong>
                    <p>
                      The whole Inn’s registered cube must fit your territory
                      and stay separate from other settlement structures.
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
                      Write [UnrealInn] with your Inn’s unique name underneath.
                      Save it to register your new structure, or right-click to
                      manage your inn.
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
                <Link href="/structures/hearthstone/" className="text-link">
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
                      Build an open paddock or a grand livery. No separate
                      stalls, walls, roof, or route checks required. Hay and
                      water are not consumed.
                    </p>
                  </li>
                  <li>
                    <strong>Place this sign at the entrance last.</strong>
                    <p>
                      Write [UnrealStable] with your Stable’s unique name
                      underneath. Save it to register, or right-click to manage
                      your Stable.
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
                Removing a saddle or lead, taking a horse outside the cube, or
                losing a horse removes its contribution. Return and tether
                eligible horses to restore income.
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
