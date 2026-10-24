import Link from "next/link";
import { hearthstoneStages } from "@/content/game";
export function HearthstoneProgression() {
  return (
    <section className="rules-panel" aria-labelledby="hearthstone-progression">
      <h2 id="hearthstone-progression">From a home to a settlement</h2>
      <p>
        The <strong>Hearthstone Core</strong> is the bound item you carry. The{" "}
        <strong>Hearthstone</strong> is the structure you build. Grow around the
        original monument, keeping your land and members.
      </p>
      <div className="table-scroll">
        <table>
          <caption>
            Four Hearthstone stages · build around your original core
          </caption>
          <thead>
            <tr>
              <th>Stage</th>
              <th>Protected volume</th>
              <th>Ground area</th>
            </tr>
          </thead>
          <tbody>
            {hearthstoneStages.map((s) => (
              <tr key={s.stage}>
                <th scope="row">
                  {s.stage} · {s.name}
                </th>
                <td>
                  {s.size} × {s.size} × {s.size}
                </td>
                <td>{(s.size * s.size).toLocaleString("en-US")} blocks²</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="guide-split">
        {hearthstoneStages.map((s) => (
          <div key={s.stage}>
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <Link className="text-link" href={`/structures/${s.guide}/`}>
              Stage {s.stage} build guide ↗
            </Link>
          </div>
        ))}
      </div>
      <p>
        Each upgrade after Stage 2 offers four times the ground area. Stage 4
        provides sixteen times Stage 2’s land for a settlement.
      </p>
    </section>
  );
}
