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
            Four Hearthstone stages · later stages are plans, not build recipes
          </caption>
          <thead>
            <tr>
              <th>Stage</th>
              <th>Protected volume</th>
              <th>Ground area</th>
              <th>Status</th>
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
                <td>{s.status}</td>
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
            {s.guide ? (
              <Link className="text-link" href={`/structures/${s.guide}/`}>
                Stage {s.stage} build guide ↗
              </Link>
            ) : (
              <p className="small-note">
                Concept only. Recommended size; exact recipe and materials are
                not finalized.
              </p>
            )}
          </div>
        ))}
      </div>
      <p>
        Each proposed upgrade after Stage 2 offers four times the ground area.
        Stage 4 would provide sixteen times Stage 2’s land for a settlement.
        Stages 3 and 4 cannot currently be recognized or claimed.
      </p>
      <p className="small-note">
        Server status: in development. Stage 2 and the Hearthstone Core naming
        are implemented in the development build and await rollout to the main
        server.
      </p>
    </section>
  );
}
