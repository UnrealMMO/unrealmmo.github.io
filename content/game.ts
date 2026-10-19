import definitions from "./skills.json";
import treeDefinitions from "./trees.json";
import thresholds from "./xp.json";
export type SkillId =
  "sneak" | "farming" | "mining" | "woodcutting" | "fishing";
export type Trait = {
  level: number;
  name: string;
  description: string;
  structure?: string;
};
export type Skill = Omit<(typeof definitions)[number], "id" | "traits"> & {
  id: SkillId;
  traits: Trait[];
};
export const trees = treeDefinitions;
export const skills = definitions as Skill[];
export const milestones = [10, 20, 35, 50, 60, 75, 99];
export const sneakMilestones = [10, 15, 25, 35, 45, 50, 60, 75, 80, 99];
export const xp = thresholds;
export const title = (s: string) =>
  s
    .toLowerCase()
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
export const pct = (n: number) => `${Number(n.toFixed(2))}%`;
export function bonuses(id: SkillId, level: number): Record<string, number> {
  const l = Math.max(1, Math.min(99, level));
  const ordinary =
    l -
    1 -
    (id === "sneak" ? sneakMilestones : milestones).filter((m) => m <= l)
      .length;
  switch (id) {
    case "sneak":
      return { "Sneak speed": (ordinary * 200) / 88 };
    case "farming":
      return {
        "Growth opportunities": (Math.ceil(ordinary / 2) * 25) / 46,
        "Double produce": (Math.floor(ordinary / 2) * 25) / 45,
      };
    case "mining":
      return {
        "Mining speed": (ordinary * 50) / 91,
        "Double ore": (ordinary * 50) / 91,
      };
    case "woodcutting":
      return {
        "Chopping speed": (ordinary * 50) / 91,
        "Double wood": (ordinary * 25) / 91,
      };
    case "fishing":
      return { "Shorter base wait": (ordinary * 25) / 91 };
  }
}
export function traitsFor(skill: Skill): Trait[] {
  const extra: Trait[] =
    skill.id === "farming"
      ? trees.map((t) => ({
          level: t.level,
          name: t.name,
          description: `Build a ${t.name.toLowerCase()} to produce ${title(t.output).toLowerCase()} while you tend it nearby. Base cycle: ${t.seconds} active seconds.`,
          structure: t.id,
        }))
      : [];
  const slots: Trait[] =
    skill.id === "farming"
      ? [25, 50, 75, 99].map((level, i) => ({
          level,
          name: `${i + 1} active ore ${i ? "trees" : "tree"}`,
          description: `Up to ${i + 1} eligible nearby ore ${i ? "trees can" : "tree can"} produce at once. Other registered trees remain dormant.`,
        }))
      : [];
  return [...skill.traits, ...extra, ...slots].sort(
    (a, b) => a.level - b.level,
  );
}
export function levelRows(skill: Skill) {
  return xp.map((total, i) => {
    const level = i + 1,
      current = bonuses(skill.id, level),
      before = bonuses(skill.id, Math.max(1, level - 1));
    return {
      level,
      total,
      needed: level === 1 ? 0 : total - xp[i - 1],
      bonuses: current,
      delta: Object.entries(current)
        .filter(([key, value]) => value - before[key] > 0.000001)
        .map(([key, value]) => `${key} +${pct(value - before[key])}`),
      traits: traitsFor(skill).filter((t) => t.level === level),
    };
  });
}
export type Block = {
  x: number;
  y: number;
  z: number;
  material: string;
  role: "core" | "canopy" | "trunk" | "pedestal" | "air";
};
export type Structure = {
  id: string;
  name: string;
  kind: "tree" | "hearthstone";
  level: number;
  description: string;
  color: string;
  blocks: Block[];
  seconds?: number;
  output?: string;
  steps: string[];
};
export function treeBlocks(core: string, canopy: string): Block[] {
  const b: Block[] = [];
  for (let y = 0; y < 3; y++)
    b.push({ x: 0, y, z: 0, material: "GOLD_BLOCK", role: "trunk" });
  for (let x = -2; x <= 2; x++)
    for (let z = -2; z <= 2; z++)
      if (Math.abs(x) + Math.abs(z) <= 2)
        b.push({ x, y: 3, z, material: canopy, role: "canopy" });
  b.push({ x: 0, y: 4, z: 0, material: core, role: "core" });
  for (const [x, z] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]) {
    b.push({ x, y: 4, z, material: canopy, role: "canopy" });
    b.push({ x, y: 2, z, material: "AIR", role: "air" });
  }
  return b;
}
export const structures: Structure[] = [
  ...trees.map((t) => ({
    id: t.id,
    name: t.name,
    kind: "tree" as const,
    level: t.level,
    color: t.color,
    seconds: t.seconds,
    output: t.output,
    description: `A living source of ${title(t.output).toLowerCase()}, grown through your Farming skill.`,
    blocks: treeBlocks(t.core, t.canopy),
    steps: [
      "Place the first gold block at the base. Leave enough room for a five-by-five footprint.",
      "Place a second gold block directly above the first.",
      "Place the third gold trunk block. Keep the four adjacent cardinal spaces empty for resource output.",
      `Build the 13-block diamond-shaped lower canopy from ${title(t.canopy).toLowerCase()}s.`,
      `Place one ${title(t.core).toLowerCase()} in the crown center and four ${title(t.canopy).toLowerCase()}s around it. Placing the last solid component normally registers the complete tree.`,
    ],
  })),
  {
    id: "hearthstone",
    name: "Hearthstone",
    kind: "hearthstone",
    level: 0,
    color: "#b7c6bc",
    description:
      "A small foundation for a place of your own. Establish a protected home and choose who you share it with.",
    blocks: [
      { x: 0, y: 0, z: 0, material: "IRON_BLOCK", role: "core" },
      ...[
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].map(([x, z]) => ({
        x,
        y: 0,
        z,
        material: "STONE_BRICKS",
        role: "pedestal" as const,
      })),
    ],
    steps: [
      "Place one iron block, with stone bricks immediately north, south, east and west on the same layer. Right-click the iron core with your bound Hearthstone to preview the claim, then confirm within 60 seconds.",
    ],
  },
];
export function materials(s: Structure) {
  return s.blocks
    .filter((b) => b.role !== "air")
    .reduce<Record<string, number>>((a, b) => {
      a[b.material] = (a[b.material] || 0) + 1;
      return a;
    }, {});
}
export const palette: Record<string, string> = {
  GOLD_BLOCK: "#d4ac48",
  IRON_BLOCK: "#c6d3d0",
  DIAMOND_BLOCK: "#64d5d4",
  NETHERITE_BLOCK: "#51434b",
  BEACON: "#a8e6d7",
  COAL_BLOCK: "#42494c",
  COPPER_BLOCK: "#be815d",
  REDSTONE_BLOCK: "#b74b4b",
  LAPIS_BLOCK: "#526eb1",
  EMERALD_BLOCK: "#4eb58b",
  STONE_BRICKS: "#929d91",
  AIR: "#c8e8d0",
};
