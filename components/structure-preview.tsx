import { palette, type Structure } from "@/content/game";
export function StructurePreview({
  structure,
  compact = false,
}: {
  structure: Structure;
  compact?: boolean;
}) {
  const blocks = structure.blocks
    .filter((b) => b.role !== "air")
    .sort((a, b) => a.x + a.z - (b.x + b.z) || a.y - b.y);
  const ys = blocks.map((b) => (b.x + b.z) * 0.5 - b.y * 1.15);
  const low = Math.min(...ys) - 0.5,
    high = Math.max(...ys) + 1.5;
  const span = Math.max(...blocks.map((b) => Math.abs(b.x - b.z))) + 1;
  const scale = Math.min(compact ? 14 : 19, 130 / span, 220 / (high - low));
  const cy = 130 - ((low + high) * scale) / 2;
  return (
    <svg
      viewBox="0 0 300 260"
      role="img"
      aria-label={`${structure.name} isometric block diagram`}
      className="structure-preview"
    >
      <ellipse
        cx="150"
        cy={cy + 30}
        rx="85"
        ry="22"
        fill="#000"
        opacity=".15"
      />
      {blocks.map((b) => {
        const x = 150 + (b.x - b.z) * scale,
          y = cy + (b.x + b.z) * scale * 0.5 - b.y * scale * 1.15,
          c = palette[b.material] || "#89958a";
        if (b.material === "LANTERN")
          return (
            <g
              key={`${b.x},${b.y},${b.z}`}
              transform={`translate(${x} ${y + scale * 0.35}) scale(${scale})`}
            >
              <path
                d="M-.12 .12V-.1H.12V.12"
                fill="none"
                stroke="#424d50"
                strokeWidth=".065"
              />
              <path
                d="M-.25 .13H.25L.4 .28H-.4Z"
                fill="#536062"
                stroke="#263b37"
                strokeWidth=".04"
              />
              <rect
                x="-.32"
                y=".28"
                width=".64"
                height=".56"
                fill="#ffd27c"
                stroke="#424d50"
                strokeWidth=".065"
              />
              <path
                d="M-.16 .3V.82M.16 .3V.82"
                stroke="#b47d3c"
                strokeWidth=".035"
              />
              <path
                d="M-.4 .84H.4V.95H-.4Z"
                fill="#424d50"
                stroke="#263b37"
                strokeWidth=".04"
              />
            </g>
          );
        return (
          <g key={`${b.x},${b.y},${b.z}`}>
            <path
              d={`M${x},${y - scale * 0.5} l${scale},${scale * 0.5} v${scale} l-${scale},${scale * 0.5} l-${scale},-${scale * 0.5} v-${scale}z`}
              fill={c}
              stroke="#152d29"
              strokeWidth=".8"
            />
            <path
              d={`M${x - scale},${y} l${scale},${scale * 0.5} v${scale} l-${scale},-${scale * 0.5}z`}
              fill="#000"
              opacity=".18"
            />
            <path
              d={`M${x + scale},${y} l-${scale},${scale * 0.5} v${scale} l${scale},-${scale * 0.5}z`}
              fill="#000"
              opacity=".3"
            />
            <path
              d={`M${x},${y - scale * 0.5} l${scale},${scale * 0.5} l-${scale},${scale * 0.5} l-${scale},-${scale * 0.5}z`}
              fill="#fff"
              opacity=".15"
            />
          </g>
        );
      })}
    </svg>
  );
}
