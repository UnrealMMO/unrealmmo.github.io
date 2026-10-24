import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  Box,
  Flame,
  House,
  ShieldCheck,
} from "lucide-react";
import { PageIntro } from "@/components/ui";
import { hearthstoneStages } from "@/content/game";

export const metadata = {
  title: "Settlements & Inns",
  description:
    "Build a settlement inside your Hearthstone territory. Learn how to register an Inn, arrange beds and storage, fit its protected cube and earn Coins.",
};
const income = [
  { rooms: 2, beds: 2, storage: 3, coins: 10 },
  { rooms: 3, beds: 3, storage: 4, coins: 15 },
  { rooms: 4, beds: 4, storage: 5, coins: 18 },
  { rooms: 5, beds: 5, storage: 6, coins: 20 },
];
export default function Settlements() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="A place to put down roots."
        description="Claim a home, build with purpose, and turn a patch of wilderness into a settlement. Your Hearthstone protects the land. Your buildings give it life."
      />
      <div className="wrap settlement-guide">
        <nav
          className="settlement-jumps"
          aria-label="Settlement guide sections"
        >
          <a href="#territory">Your territory</a>
          <a href="#build-an-inn">Build an Inn</a>
          <a href="#inn-boundary">Space & boundaries</a>
          <a href="#inn-income">Income</a>
          <a href="#inn-help">Help & commands</a>
        </nav>
        <section
          className="settlement-foundation"
          id="territory"
          aria-labelledby="territory-title"
        >
          <div>
            <span className="eyebrow">01 / Lay the foundation</span>
            <h2 id="territory-title">
              Every settlement starts with protected land.
            </h2>
            <p>
              A settlement grows from useful buildings within your own
              territory. The <strong>Hearthstone</strong> is the monument you
              build; the <strong>Hearthstone Core</strong> is the bound item you
              carry to manage your claim.
            </p>
            <p>
              Build and claim your Hearthstone first. Upgrade it through four
              stages to make room for more buildings. Open the Core’s menu near
              your Hearthstone: a green upgrade item means the next stage is
              available; a red item explains what is missing or blocking the
              upgrade.
            </p>
            <Link className="text-link" href="/structures/hearthstone/">
              Start with the Hearthstone build guide <ArrowUpRight size={17} />
            </Link>
          </div>
          <aside
            className="settlement-land"
            aria-label="Hearthstone territory sizes"
          >
            <ShieldCheck size={30} aria-hidden="true" />
            <h3>Room to grow</h3>
            <ol>
              {hearthstoneStages.map((stage) => (
                <li key={stage.stage}>
                  <Link href={`/structures/${stage.guide}/`}>
                    <span>
                      Stage {stage.stage} · {stage.name}
                    </span>
                    <strong>
                      {stage.size} × {stage.size} × {stage.size}
                    </strong>
                  </Link>
                </li>
              ))}
            </ol>
            <p>
              All three dimensions are protected. Leave room above and below
              your buildings, too.
            </p>
          </aside>
        </section>
        <div className="settlement-callout">
          <strong>Scout before you settle.</strong>
          <p>
            Use <code>/territory check</code> to find claims within 200
            horizontal blocks of your position. The distance is measured to the
            nearest edge of each claim; claims belonging to offline players
            still count.
          </p>
        </div>

        <section
          id="build-an-inn"
          className="settlement-section"
          aria-labelledby="inn-title"
        >
          <span className="eyebrow">02 / Welcome travelers</span>
          <h2 id="inn-title">Your first settlement building: the Inn.</h2>
          <p className="settlement-lead">
            A few beds, supplies, and somewhere to cook. Arrange them your way,
            give the place a name, and register it with a sign.
          </p>
          <div className="inn-requirements">
            <article>
              <BedDouble aria-hidden="true" />
              <strong>2–5 beds</strong>
              <p>
                Complete beds, with both halves intact. Any bed color works.
              </p>
            </article>
            <article>
              <Box aria-hidden="true" />
              <strong>3–6 storage blocks</strong>
              <p>Normal chests, barrels, or a mixture of both.</p>
            </article>
            <article>
              <Flame aria-hidden="true" />
              <strong>1 furnace or smoker</strong>
              <p>
                Fuel and contents do not matter. Blast furnaces do not count.
              </p>
            </article>
            <article>
              <House aria-hidden="true" />
              <strong>1 named sign</strong>
              <p>Inside your territory, close to the elements it registers.</p>
            </article>
          </div>
          <div className="settlement-callout">
            <strong>Make it yours.</strong>
            <p>
              There is no fixed blueprint, enclosure requirement, route check,
              or furnishing bonus. Walls, roofs, doors, decorations, and
              separate bedrooms are your design choices. A “room” is a paired
              bed and storage unit for income, not a space the game needs to
              walk through.
            </p>
          </div>
          <div className="inn-registration">
            <div>
              <h3>Register it in three steps</h3>
              <ol className="settlement-steps">
                <li>
                  <strong>Build inside your own claim.</strong>
                  <p>
                    Place at least two beds, three chests or barrels, and a
                    furnace or smoker. Only the territory owner can register the
                    Inn; membership or steward access is not enough.
                  </p>
                </li>
                <li>
                  <strong>Write the front of a sign.</strong>
                  <p>
                    Put <code>[UnrealInn]</code> on the first line and your
                    Inn’s name on the second. Use 1–32 letters, numbers, spaces,
                    underscores, or hyphens, starting with a letter or number.
                    Each of your Inns needs a different name.
                  </p>
                </li>
                <li>
                  <strong>Save the sign and stay nearby.</strong>
                  <p>
                    Saving checks construction and registers a valid Inn. Stay
                    within eight blocks until the check finishes. Right-click
                    the sign to check again or update its registered size after
                    expanding.
                  </p>
                </li>
              </ol>
            </div>
            <aside
              className="inn-sign-example"
              aria-label="Example Inn sign, front side"
            >
              <span>FRONT OF YOUR SIGN</span>
              <div className="inn-sign-board">
                <code>
                  [UnrealInn]
                  <br />
                  Oak Inn
                </code>
              </div>
              <p>Two lines. A name of your own.</p>
              <p>
                Look for the registration confirmation, then use{" "}
                <code>/inn list</code> to check its status.
              </p>
            </aside>
          </div>
          <p className="handbook-note">
            A double chest counts as two storage blocks. Trapped chests and
            other containers do not count. Storage can be empty, and the cooking
            appliance can be unlit. Extra furniture is allowed; earnings stop
            growing at five rooms.
          </p>
        </section>

        <section
          id="inn-boundary"
          className="settlement-section"
          aria-labelledby="boundary-title"
        >
          <span className="eyebrow">03 / Give it space</span>
          <h2 id="boundary-title">Your build defines the boundary.</h2>
          <div className="settlement-boundary-grid">
            <div>
              <p>
                The game finds the nearest eligible cooking appliance, then
                nearby beds and storage. The sign, cooking block, both halves of
                each selected bed, and selected storage define the smallest cube
                that contains them.
              </p>
              <p>
                That cube can be any size up to{" "}
                <strong>20 × 20 × 20 blocks</strong>. The limit is the full span
                of the cube, not a 20-block radius from the sign. It searches up
                to 19 blocks in each direction from the sign, within your
                territory.
              </p>
              <p>
                The longest span sets all three dimensions. If your selected
                elements span 12 blocks across, 7 deep, and 4 high, the
                registered space is a <strong>12 × 12 × 12 cube</strong>. It
                extends the shorter dimensions and shifts them when needed to
                fit the claim.
              </p>
              <p>
                <strong>The entire cube must fit inside your territory</strong>,
                including its empty space. It cannot overlap another registered
                Inn. Keep neighboring Inns separated so they do not compete for
                the same furniture.
              </p>
            </div>
            <figure className="inn-cube-figure">
              <svg
                viewBox="0 0 360 290"
                role="img"
                aria-labelledby="inn-cube-title inn-cube-desc"
              >
                <title id="inn-cube-title">
                  An Inn’s registered space is a cube
                </title>
                <desc id="inn-cube-desc">
                  An illustrative cube with equal width, depth and height, each
                  at most 20 blocks. The entire cube belongs inside one
                  territory.
                </desc>
                <path
                  d="M70 90 180 35 290 90 180 145Z"
                  fill="#d7bc8138"
                  stroke="#9b793e"
                  strokeWidth="2"
                />
                <path
                  d="M70 90 180 145 180 255 70 200Z"
                  fill="#9eb77738"
                  stroke="#547247"
                  strokeWidth="2"
                />
                <path
                  d="M180 145 290 90 290 200 180 255Z"
                  fill="#10282016"
                  stroke="#547247"
                  strokeWidth="2"
                />
                <path
                  d="M180 35V145M70 200 180 145 290 200"
                  fill="none"
                  stroke="#547247"
                  strokeDasharray="5 6"
                />
                <text x="180" y="18" textAnchor="middle">
                  UP TO 20 × 20 × 20
                </text>
                <text x="180" y="282" textAnchor="middle">
                  ONE CUBE · INSIDE YOUR CLAIM
                </text>
              </svg>
              <figcaption>
                Build compact or spread out. The same size limit applies to
                every axis.
              </figcaption>
            </figure>
          </div>
          <div className="settlement-callout">
            <strong>Expanding your Inn?</strong>
            <p>
              Add a bed and a storage block together, then right-click the sign.
              This is especially important for furniture outside the existing
              cube: routine checks only inspect the registered space. If a
              crowded layout will not register, move the sign or required
              elements closer together.
            </p>
          </div>
        </section>

        <section
          id="inn-income"
          className="settlement-section"
          aria-labelledby="income-title"
        >
          <span className="eyebrow">04 / Keep the hearth warm</span>
          <h2 id="income-title">A working Inn earns Coins.</h2>
          <p className="settlement-lead">
            Income goes to the owner’s wallet after a completed operating hour.
            The basic Inn has two rooms; each extra bed paired with an extra
            storage block adds another, up to five.
          </p>
          <div className="table-scroll">
            <table>
              <caption>
                Default Inn income · one furnace or smoker and a sign are
                required at every size
              </caption>
              <thead>
                <tr>
                  <th scope="col">Rooms</th>
                  <th scope="col">Beds</th>
                  <th scope="col">Chests / barrels</th>
                  <th scope="col">Coins per hour</th>
                </tr>
              </thead>
              <tbody>
                {income.map((row) => (
                  <tr key={row.rooms}>
                    <th scope="row">{row.rooms} rooms</th>
                    <td>{row.beds}</td>
                    <td>{row.storage}</td>
                    <td>
                      <strong>{row.coins} Coins</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="settlement-two-column">
            <article>
              <h3>Grow in pairs</h3>
              <p>
                The third room adds 5 Coins per hour, the fourth adds 3, and the
                fifth adds 2. Adding only beds or only storage does not increase
                income. There is no instant payout for registering and no
                registration fee.
              </p>
            </article>
            <article>
              <h3>Your Inn keeps working</h3>
              <p>
                Once validated, a functioning Inn can earn while you are offline
                and its area is unloaded. Saved operating status also allows
                income to catch up after a server restart. When the area loads
                again, construction is checked again.
              </p>
            </article>
            <article>
              <h3>Keep its requirements intact</h3>
              <p>
                Losing territory, removing or renaming the sign, breaking beds,
                or dropping below the storage or cooking requirements stops new
                earnings and resets the incomplete operating hour.
                Re-registering a changed layout also resets partial progress.
              </p>
            </article>
            <article>
              <h3>Check before you leave</h3>
              <p>
                Use <code>/inn list</code> to see whether the Inn is operating,
                its progress, and any earned Coins awaiting delivery. A new or
                invalid Inn must pass a construction check before it can earn
                while unloaded.
              </p>
            </article>
          </div>
        </section>

        <section
          id="inn-help"
          className="settlement-section"
          aria-labelledby="help-title"
        >
          <span className="eyebrow">Keep this close</span>
          <h2 id="help-title">An innkeeper’s field notes.</h2>
          <div className="settlement-commands">
            <div>
              <code>/inn list</code>
              <p>
                View your registered Inns, operating progress, and pending
                income.
              </p>
            </div>
            <div>
              <code>/inn remove Oak Inn</code>
              <p>
                Deregister an Inn by name. Its blocks remain; new income stops.
              </p>
            </div>
            <div>
              <code>/territory check</code>
              <p>
                See claims within 200 horizontal blocks before choosing a
                location.
              </p>
            </div>
          </div>
          <div className="settlement-faq">
            <details>
              <summary>
                The sign will not register. What should I check?
              </summary>
              <p>
                Make sure you own the territory, the marker is on the sign’s
                front, and the name is valid and unique among your Inns. Check
                for two complete beds, three eligible storage blocks, and a
                furnace or smoker. Every selected element and the entire cube
                must fit your territory without overlapping another Inn. Stay
                near the sign and wait a few seconds before trying again.
              </p>
            </details>
            <details>
              <summary>Can members build an Inn on my land?</summary>
              <p>
                Members with permission can help build, but only you as the
                territory owner can register or remove your Inn. Income belongs
                to the registered owner.
              </p>
            </details>
            <details>
              <summary>
                Do I need guests, stocked chests, or separate bedrooms?
              </summary>
              <p>
                No. Income depends on the required structure elements and valid
                territory, not guests, container contents, fuel, room
                partitions, or decorations.
              </p>
            </details>
            <details>
              <summary>What happens if I abandon my territory?</summary>
              <p>
                The Inn stops earning. Founding a new claim in the same place
                does not revive its old registration: register the Inn again
                under the new claim. Coins already earned remain payable to
                their original owner.
              </p>
            </details>
            <details>
              <summary>Can I share furniture between two Inns?</summary>
              <p>
                No. Registered cubes cannot overlap, and furniture already
                within another registered Inn is not reused. Give each Inn its
                own required elements and enough space for its complete cube.
              </p>
            </details>
          </div>
          <Link className="text-link" href="/structures/">
            Explore Hearthstone stages and structure guides{" "}
            <ArrowUpRight size={17} />
          </Link>
        </section>
      </div>
    </div>
  );
}
