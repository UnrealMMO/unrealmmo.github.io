import { notFound } from "next/navigation";
import Link from "next/link";
import { structures, title, materials } from "@/content/game";
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
        <h1>{s.name}</h1>
        <p>{s.description}</p>
        <div className="structure-facts">
          <span>
            {Object.values(materials(s)).reduce((a, b) => a + b, 0)} solid
            blocks
          </span>
          <span>
            {s.kind === "tree"
              ? `Produces ${title(s.output!).toLowerCase()}`
              : s.fullWorldHeight
                ? `${s.claimSize} × ${s.claimSize} footprint · full world height`
                : `${s.claimSize} × ${s.claimSize} × ${s.claimSize} protected area`}
          </span>
          <span>
            {s.kind === "tree"
              ? `${s.seconds}s base active cycle`
              : "One territory per player"}
          </span>
        </div>
      </header>
      <div className="wrap">
        <StructureViewer key={s.id} structure={s} />
        {s.kind === "tree" ? (
          <>
            <section className="guide-split rules-panel">
              <div>
                <h2>Build. Tend. Collect.</h2>
                <ol className="guide-list">
                  <li>
                    Follow the exact pattern. Whoever places the last block
                    normally registers and owns the tree.
                  </li>
                  <li>
                    Reach Farming level {s.level}. Production runs while the
                    tree’s chunks are loaded, even when you are offline.
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
                  You can register up to 10 trees of each type. Low-level trees
                  remain dormant until their owner qualifies.
                </p>
                <p>
                  Production pauses if chunks unload, the tree is damaged or
                  outputs are blocked. Unloaded time earns no resources, and
                  trees grant no Farming XP.
                </p>
                <Link className="text-link" href="/skills/farming/">
                  Explore Farming progression ↗
                </Link>
              </div>
            </section>
            <section className="handbook-note">
              <h3>Builder’s notes</h3>
              <p>
                Trees can cross chunk borders, but their 5 × 5 × 5 spaces cannot
                overlap. Repairs keep the same owner. Clear dropped items: eight
                uncollected item entities pause production.
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
                <h2>
                  {(s.stage ?? 1) > 1
                    ? "Build. Recognize. Upgrade."
                    : "Preview, then claim."}
                </h2>
                <ol className="guide-list">
                  <li>
                    The item you carry is your bound Hearthstone Core. Recover
                    it with <code>/hearthstone token</code> if needed.
                  </li>
                  <li>
                    {(s.stage ?? 1) > 1
                      ? "Follow the layer guide to complete this Hearthstone tier, keeping the gold heart and every required block from the lower stages."
                      : "Build the pedestal or a higher complete tier. Look at the gold heart and use /hearthstone preview to check the highest completed tier that fits."}
                  </li>
                  <li>
                    {(s.stage ?? 1) > 1
                      ? "Stand within eight blocks of the original core and right-click your Hearthstone Core. Green means ready; red explains what’s missing. Click green to preview and confirm within 60 seconds."
                      : "Inspect the private border preview. Confirm within 60 seconds using the menu."}
                  </li>
                  <li>
                    Right-click your Hearthstone Core to manage your home, show
                    its boundary and invite other players.
                  </li>
                </ol>
                <p>
                  You can start at any completed tier. Look at the gold heart
                  and use <code>/hearthstone preview</code> to find the highest
                  tier that fits around neighbors and world limits. Confirm
                  within 60 seconds.
                </p>
              </div>
              <div>
                <h3>Understand your borders</h3>
                <p>
                  {(s.stage ?? 1) > 1
                    ? s.fullWorldHeight
                      ? "Stage 4 protects 200 × 200 blocks from bedrock to build height, including above and below your home. Borders run from core −100 to +99. In the Overworld, that covers Y −64 to 319; other worlds use their own limits. Existing Wardtowers get this protection automatically. The diagram uses a core at Y 64, with the foundation on layer 1."
                      : `Stage ${s.stage} protects exactly ${s.claimSize} blocks on each axis. Horizontally, this extends from core −${s.claimSize! / 2} through +${s.claimSize! / 2 - 1}, inclusive. Near world height limits the cube shifts vertically to fit, preserving your previous protection. The viewer illustrates a centered cube; its layer 1 is the foundation below the core.`
                    : "Protection reaches eight blocks each way from the gold heart, including vertically: a 17 × 17 × 17 cube. The diagram overlay illustrates that boundary."}
                </p>
                <p>
                  You get one starter territory across all worlds. Protection
                  works offline with no upkeep. Confirm the preview to claim it.
                </p>
                <p>
                  Stay at least 128 horizontal blocks from spawn. Claims must
                  fit within world limits and avoid reserved areas and existing
                  claim columns. After PvP damage, wait 30 seconds to found or
                  upgrade.
                </p>
              </div>
            </section>
            {(s.stage ?? 1) > 1 && (
              <section className="handbook-note">
                <h3>Adding to Stage {(s.stage ?? 2) - 1}</h3>
                <p>
                  {s.stage === 2
                    ? "Add 25 stone bricks, 8 polished andesite and 4 iron blocks."
                    : s.stage === 3
                      ? "Add 48 stone bricks, 24 polished andesite, 4 iron blocks and 4 lanterns."
                      : "Add 77 stone bricks, 56 polished andesite, 4 iron blocks, 16 chiseled stone bricks and 1 netherrack. Bring flint and steel to light the netherrack; the flame stays protected while registered."}{" "}
                  The checklist shows the full structure, including previous
                  stages.
                </p>
                <p>
                  Upgrades cost no Coins and need no rooms, paths or enclosure.
                  Decorate freely. Only the owner can confirm; members and
                  invitations stay. The menu updates live and rechecks the build
                  on confirmation.
                </p>
              </section>
            )}
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
                <code>/hearthstone invite &lt;player&gt; &lt;role&gt;</code> ·{" "}
                <code>/hearthstone accept &lt;owner&gt;</code>
              </p>
              <p>
                Stewards manage ordinary members, not owners or other stewards.
                Territory storage access lets members collect ore-tree drops; it
                does not transfer tree ownership.
              </p>
              <p>
                Only the owner can abandon a claim and must confirm again. This
                destroys the gold heart and unlocks the remaining blocks. Stay
                near the Hearthstone to keep it loaded.
              </p>
            </section>
          </>
        )}
        <p className="small-note guide-version">
          Balance may change before launch.
        </p>
      </div>
    </div>
  );
}
