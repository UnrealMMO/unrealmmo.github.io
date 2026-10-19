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
  const scale = compact ? 14 : 19,
    cy = structure.kind === "tree" ? 195 : 127;
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
