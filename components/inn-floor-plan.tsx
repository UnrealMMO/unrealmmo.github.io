import { innExample as plan } from "@/content/inn-example";
export function InnFloorPlan() {
  const block = 20;
  const at = (n: number) => 40 + n * block;
  const side = plan.floor.max - plan.floor.min + 1;
  const cells = Array.from(
    { length: (plan.floor.max - plan.floor.min + 1) ** 2 },
    (_, i) => ({
      x: plan.floor.min + (i % side),
      z: plan.floor.min + Math.floor(i / side),
    }),
  );
  return (
    <figure className="inn-plan">
      <div className="inn-plan-heading">
        <strong>Overhead view</strong>
      </div>
      <svg
        viewBox="0 0 480 480"
        role="img"
        aria-labelledby="inn-plan-title inn-plan-description"
      >
        <title id="inn-plan-title">
          A simple Inn inside a 20 by 20 footprint
        </title>
        <desc id="inn-plan-description">
          An oak plank floor with optional stone walls, an entrance at the
          bottom, two complete beds at the back left, two chests at the foot of
          the beds, a barrel next to the furnace, and an entrance sign. Each
          grid square is one block. Maximum height is also 20 blocks.
        </desc>
        <defs>
          <pattern
            id="inn-grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 0H0V20"
              fill="none"
              stroke="#b9c2a4"
              strokeWidth=".7"
            />
          </pattern>
          <pattern
            id="inn-planks"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect width="20" height="20" fill="#c3a16b" />
            <path
              d="M0 7H20M0 14H20M8 0V7M14 7V14M5 14V20"
              stroke="#9b794d"
              strokeWidth=".8"
            />
          </pattern>
          <pattern
            id="inn-stone"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect width="20" height="20" fill="#7c8478" />
            <path
              d="M0 0H20V20H0ZM0 10H20M10 0V10M5 10V20"
              fill="none"
              stroke="#a5ac9c"
              strokeWidth="1.4"
            />
          </pattern>
        </defs>
        <rect x="40" y="40" width="400" height="400" fill="#dfe4cf" />
        <rect x="40" y="40" width="400" height="400" fill="url(#inn-grid)" />
        <rect
          x="40"
          y="40"
          width="400"
          height="400"
          fill="none"
          stroke="#667c46"
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <path d="M40 29V20H440V29" fill="none" stroke="#667c46" />
        <text x="240" y="14" textAnchor="middle" className="inn-plan-dimension">
          20 BLOCKS MAX
        </text>
        {cells.map(({ x, z }) => {
          const wall =
            (x === plan.floor.min ||
              x === plan.floor.max ||
              z === plan.floor.min ||
              z === plan.floor.max) &&
            !(z === plan.floor.max && plan.doorway.some((d) => d === x));
          return (
            <rect
              key={`${x}-${z}`}
              x={at(x)}
              y={at(z)}
              width={block}
              height={block}
              fill={wall ? "url(#inn-stone)" : "url(#inn-planks)"}
              stroke={wall ? "#59604f" : "#ab895a"}
              strokeWidth=".7"
            />
          );
        })}
        {plan.beds.map((p) => (
          <g key={p.x}>
            <rect
              x={at(p.x) + 1}
              y={at(p.z) + 1}
              width="18"
              height="38"
              fill="#9c3836"
              stroke="#6d2828"
            />
            <rect
              x={at(p.x) + 2}
              y={at(p.z) + 2}
              width="16"
              height="10"
              fill="#f3eddc"
            />
            <path d={`M${at(p.x) + 2} ${at(p.z) + 19}h16`} stroke="#bd5950" />
          </g>
        ))}
        {plan.storage.map((p) => (
          <g key={p.x}>
            <rect
              x={at(p.x) + 1}
              y={at(p.z) + 1}
              width="18"
              height="18"
              fill="#aa7538"
              stroke="#5f4325"
              strokeWidth="1.5"
            />
            {p.kind === "barrel" ? (
              <>
                <path
                  d={`M${at(p.x) + 5} ${at(p.z) + 2}v16m5-16v16m5-16v16`}
                  stroke="#72502c"
                />
                <path
                  d={`M${at(p.x) + 2} ${at(p.z) + 5}h16m-16 10h16`}
                  stroke="#494d43"
                  strokeWidth="2.5"
                />
              </>
            ) : (
              <>
                <path
                  d={`M${at(p.x) + 2} ${at(p.z) + 8}h16`}
                  stroke="#5f4325"
                />
                <rect
                  x={at(p.x) + 8}
                  y={at(p.z) + 6}
                  width="4"
                  height="6"
                  fill="#e0cd8e"
                />
              </>
            )}
          </g>
        ))}
        <g>
          <rect
            x={at(plan.furnace.x) + 1}
            y={at(plan.furnace.z) + 1}
            width="18"
            height="18"
            fill="#6f7470"
            stroke="#373f37"
            strokeWidth="1.5"
          />
          <rect
            x={at(plan.furnace.x) + 4}
            y={at(plan.furnace.z) + 4}
            width="12"
            height="5"
            fill="#292f2a"
          />
          <rect
            x={at(plan.furnace.x) + 4}
            y={at(plan.furnace.z) + 12}
            width="12"
            height="4"
            fill="#dd9345"
          />
        </g>
        <path
          d={`M${at(plan.sign.x) + 10} ${at(plan.sign.z) + 6}v17`}
          stroke="#6e502d"
          strokeWidth="3"
        />
        <rect
          x={at(plan.sign.x) - 1}
          y={at(plan.sign.z) + 2}
          width="23"
          height="12"
          rx="1"
          fill="#dfbb79"
          stroke="#6e502d"
        />
        <path
          d={`M${at(plan.sign.x) + 3} ${at(plan.sign.z) + 6}h15m-15 4h15`}
          stroke="#6e502d"
        />
      </svg>
      <ul className="inn-plan-key" aria-label="Floor plan key">
        <li>
          <i className="key-bed" />2 beds
        </li>
        <li>
          <i className="key-storage" />3 chests / barrels
        </li>
        <li>
          <i className="key-furnace" />1 furnace / smoker
        </li>
        <li>
          <i className="key-sign" />
          Entrance sign
        </li>
      </ul>
    </figure>
  );
}
