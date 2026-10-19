import { notFound } from "next/navigation";
import Link from "next/link";
import { structures, title } from "@/content/game";
import { Eyebrow } from "@/components/ui";
import { StructureViewer } from "@/components/structure-viewer";
export function generateStaticParams() {
  return structures.map((s) => ({ slug: s.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = structures.find((s) => s.id === slug);
  return { title: s?.name, description: s?.description };
}
export default async function StructurePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = structures.find((s) => s.id === slug);
  if (!s) notFound();
  return (
    <div className="parchment page-body">
      <header className="wrap structure-intro">
        <Link className="breadcrumb" href="/structures/">
          ← All structures
        </Link>
        <Eyebrow>
          {s.kind === "tree"
            ? `The ore orchard · Farming level ${s.level}`
            : "Your first territory"}
        </Eyebrow>
        <h1>{s.name}</h1>
        <p>{s.description}</p>
        <div className="structure-facts">
          <span>
            {s.kind === "tree" ? "21 solid blocks" : "5 solid blocks"}
          </span>
          <span>
            {s.kind === "tree"
              ? `Produces ${title(s.output!).toLowerCase()}`
              : "17 × 17 × 17 protected area"}
          </span>
          <span>
            {s.kind === "tree"
              ? `${s.seconds}s base active cycle`
              : "One starter claim per player"}
          </span>
        </div>
      </header>
      <div className="wrap">
        <StructureViewer key={s.id} structure={s} />
        {s.kind === "tree" ? (
          <>
            <section className="guide-split rules-panel">
              <div>
                <Eyebrow>Bring it to life</Eyebrow>
                <h2>Build. Tend. Collect.</h2>
                <ol className="guide-list">
                  <li>
                    Build the exact pattern. Your final normal block placement
                    registers the completed tree; the final placer becomes its
                    owner.
                  </li>
                  <li>
                    Reach Farming level {s.level} and stay online, alive and
                    eligible within 32 blocks of the core in the same world.
                  </li>
                  <li>
                    Keep the four output spaces open. Resources appear there for
                    normal collection or hoppers.
                  </li>
                  <li>
                    Use <code>/farming trees</code> or your Skill Journal to
                    inspect ownership, recipes and status.
                  </li>
                </ol>
              </div>
              <div>
                <h3>Growing with your skill</h3>
                <p>
                  The base cycle is {s.seconds} active seconds. Farming’s growth
                  bonus speeds it up; your double-yield chance rolls once on
                  each output.
                </p>
                <p>
                  You can run one nearby tree at level 25, two at 50, three at
                  75 and four at 99. Low-level or excess trees remain dormant
                  until eligible.
                </p>
                <p>
                  Production pauses while you are away or offline, while chunks
                  are unloaded, when the structure is damaged, or when its
                  output is blocked. There is no offline catch-up or passive
                  Farming XP.
                </p>
                <Link className="text-link" href="/skills/farming/">
                  Explore Farming progression ↗
                </Link>
              </div>
            </section>
            <section className="handbook-note">
              <h3>Builder’s notes</h3>
              <p>
                Trees may cross chunk borders. Their five-by-five-by-five
                bounding volumes cannot overlap. Repairs preserve the registered
                owner. Eight uncollected item entities pause production until
                cleared.
              </p>
              {s.id === "copper-tree" && (
                <p>
                  Copper blocks may be waxed or unwaxed at any oxidation stage.
                  Cut copper does not qualify.
                </p>
              )}
              {["emerald-tree", "diamond-tree"].includes(s.id) && (
                <p>
                  The beacon is the crown core. A vanilla beacon pyramid and
                  beam are not required.
                </p>
              )}
              <p>
                To release a damaged registration, stand within eight blocks of
                its former core and use{" "}
                <code>
                  /farming trees release &lt;x&gt; &lt;y&gt; &lt;z&gt;
                </code>
                . This releases registration, not blocks; an intact tree cannot
                be released.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="guide-split rules-panel">
              <div>
                <Eyebrow>Make it home</Eyebrow>
                <h2>Preview, then claim.</h2>
                <ol className="guide-list">
                  <li>
                    You receive a bound Hearthstone on joining. Recover it with{" "}
                    <code>/territory token</code> if needed.
                  </li>
                  <li>
                    Build the five-block pedestal. Right-click the iron block
                    with your Hearthstone, or look at it and use{" "}
                    <code>/territory preview</code>.
                  </li>
                  <li>
                    Inspect the private border preview. Confirm within 60
                    seconds using the menu or <code>/territory confirm</code>.
                  </li>
                  <li>
                    Open <code>/territory</code> to manage your home and invite
                    other players.
                  </li>
                </ol>
              </div>
              <div>
                <h3>Understand your borders</h3>
                <p>
                  Protection reaches eight blocks each way from the iron core,
                  including vertically: a 17 × 17 × 17 cube. The diagram overlay
                  illustrates that boundary.
                </p>
                <p>
                  One starter territory per owner, across all worlds. Protection
                  persists offline and has no upkeep. Previewing alone does not
                  claim the land.
                </p>
                <p>
                  The default spawn exclusion is 128 horizontal blocks. World
                  boundaries, reserved areas and existing claim columns can
                  prevent placement. Recent PvP damage adds a 30-second founding
                  delay.
                </p>
              </div>
            </section>
            <section className="membership">
              <h2>Invite your people</h2>
              <p>
                Choose a role when inviting a friend. Invitations last five
                minutes.
              </p>
              <div className="table-scroll">
                <table>
                  <caption className="sr-only">
                    Territory membership permissions
                  </caption>
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Doors & buttons</th>
                      <th>Storage & tree drops</th>
                      <th>Build</th>
                      <th>Manage members</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Guest", "Yes", "No", "No", "No"],
                      ["Storage", "Yes", "Yes", "No", "No"],
                      ["Builder", "Yes", "No", "Yes", "No"],
                      ["Resident", "Yes", "Yes", "Yes", "No"],
                      ["Steward", "Yes", "Yes", "Yes", "Yes"],
                    ].map((row) => (
                      <tr key={row[0]}>
                        {row.map((v, i) =>
                          i === 0 ? (
                            <th scope="row" key={i}>
                              {v}
                            </th>
                          ) : (
                            <td key={i}>{v}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                <code>/territory invite &lt;player&gt; &lt;role&gt;</code> ·{" "}
                <code>/territory accept &lt;owner&gt;</code>
              </p>
              <p>
                Stewards manage ordinary members, not owners or other stewards.
                Territory storage access lets members collect ore-tree drops; it
                does not transfer tree ownership.
              </p>
              <p>
                Only the owner can abandon a claim, using a fresh confirmation.
                The buildings remain. Breaking the surrounding pedestal blocks
                does not switch protection off.
              </p>
            </section>
          </>
        )}
        <p className="small-note guide-version">
          Development handbook · reviewed 19 October 2026 · Shipped defaults,
          subject to change.
        </p>
      </div>
    </div>
  );
}
