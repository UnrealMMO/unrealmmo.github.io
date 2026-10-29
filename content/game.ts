import hearthstoneBlueprints from "./hearthstone-blueprints.json";
import definitions from "./skills.json";
import treeDefinitions from "./trees.json";
import thresholds from "./xp.json";
export type SkillId =
  | "sneak"
  | "farming"
  | "mining"
  | "woodcutting"
  | "fishing"
  | "magic"
  | "construction";
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
export const formatBonus = (name: string, value: number) =>
  name === "Placement reach" ? `${value} blocks` : pct(value);
export function bonuses(id: SkillId, level: number): Record<string, number> {
  const l = Math.max(1, Math.min(99, level));
  const ordinary =
    l -
    1 -
    (id === "sneak" ? sneakMilestones : milestones).filter((m) => m <= l)
      .length;
  switch (id) {
    case "magic":
      return {
        "Mana regeneration": Math.min(25, 5 * (1 + Math.floor(l / 20))),
        "Spell potency":
          l < 10
            ? 0
            : l >= 99
              ? 25
              : Math.min(20, 5 * Math.floor((l + 10) / 20)),
      };
    case "construction":
      return {
        "Placement reach": l >= 99 ? 2 : l >= 60 ? 1.5 : l >= 30 ? 1 : 0.5,
        "Home hunger reduction": l >= 75 ? 100 : l >= 30 ? 50 : 0,
      };
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
          description: `Produces ${title(t.output).toLowerCase()} every ${t.seconds} active seconds before growth bonuses. Works in loaded chunks, even while you’re offline.`,
          structure: t.id,
        }))
      : [];
  return [...skill.traits, ...extra].sort((a, b) => a.level - b.level);
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
        .map(
          ([key, value]) => `${key} +${formatBonus(key, value - before[key])}`,
        ),
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
  stage?: number;
  claimSize?: number;
  fullWorldHeight?: boolean;
  claimHeight?: number;
  claimFloor?: number;
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
    name: "Hearthstone · Stage 1",
    stage: 1,
    claimSize: 17,
    kind: "hearthstone",
    level: 0,
    color: "#b7c6bc",
    description:
      "A small foundation for a place of your own. Establish a protected home and choose who you share it with.",
    blocks: [
      { x: 0, y: 0, z: 0, material: "GOLD_BLOCK", role: "core" },
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
      "Place one gold block, with stone bricks immediately north, south, east and west on the same layer. You can finish a higher tier before claiming. Right-click the gold heart with your bound Hearthstone Core to preview the highest completed tier that fits, then confirm within 60 seconds.",
    ],
  },
];
// Viewer layers start at the foundation; the original gold heart is on layer 2.
const starter = structures.find((s) => s.id === "hearthstone")!;
const stageTwo: Block[] = hearthstoneBlueprints[1].map((b) => ({
  ...b,
  y: b.y + 1,
  role: b.x === 0 && b.y === 0 && b.z === 0 ? "core" : "pedestal",
}));
structures.push({
  id: "hearthstone-stage-2",
  name: "Fortified Hearthstone · Stage 2",
  kind: "hearthstone",
  stage: 2,
  claimSize: 50,
  level: 0,
  color: "#b7c6bc",
  description:
    "Build around your original Hearthstone to protect a 50 × 50 × 50 home. Your existing land and members stay with you.",
  blocks: stageTwo,
  steps: [
    "Add a complete 5 × 5 stone-brick foundation one block below the original gold heart. This diagram's layer 1 is that new foundation.",
    "Keep the original gold heart and its four cardinal stone bricks. Add polished andesite at all four outer corners of the foundation.",
    "Add a second polished-andesite block to each corner pillar. Extra decoration is allowed; no enclosed rooms or paths are required.",
    "Cap each pillar with an iron block. For an initial claim, right-click the gold heart with your Hearthstone Core. For an existing claim, open the Core menu within eight blocks and use its green upgrade item. Review the preview and confirm within 60 seconds.",
  ],
});
for (const stage of [3, 4]) {
  const width = stage * 2 + 1,
    pillar = stage === 3 ? 6 : 14;
  const blocks: Block[] = hearthstoneBlueprints[stage - 1].map((b) => ({
    ...b,
    y: b.y + 1,
    role: b.x === 0 && b.y === 0 && b.z === 0 ? "core" : "pedestal",
  }));
  const top = Math.max(...blocks.map((b) => b.y));
  structures.push({
    id: `hearthstone-stage-${stage}`,
    name:
      stage === 3
        ? "Hearthstone Sanctuary · Stage 3"
        : "Hearthstone Wardtower · Stage 4",
    kind: "hearthstone",
    stage,
    claimSize: stage === 3 ? 100 : 200,
    ...(stage === 4
      ? { fullWorldHeight: true, claimHeight: 384, claimFloor: -127 }
      : {}),
    level: 0,
    color: "#b7c6bc",
    blocks,
    description:
      stage === 3
        ? "Raise a lantern-lit sanctuary for a village, workshops and farms. Protect a 100 × 100 × 100 volume."
        : "Build an iconic protection tower for a town center, roads and building plots. Protect a 200 × 200 footprint from the world’s lowest build layer to its highest.",
    steps: Array.from({ length: top + 1 }, (_, y) =>
      y === 0
        ? `Expand the stone-brick foundation to ${width} × ${width}, one block below the original core. Retain every block of the previous stage.`
        : y <= pillar
          ? `Retain the inner structure shown on this layer. Add polished andesite at all four outer corners, making each new pillar ${pillar} blocks tall.`
          : y === pillar + 1
            ? "Cap each of the four new outer pillars with one iron block."
            : y === pillar + 2
              ? `Connect the four caps with a complete stone-brick perimeter ring.${stage === 4 ? " Add a stone-brick cross through the center, joining opposite sides in both directions." : ""}`
              : stage === 3
                ? "Place a lantern on each corner of the upper ring. For an initial claim, right-click the gold heart with your Hearthstone Core. Already claimed? Use the green upgrade item in the Core menu to preview and confirm Stage 3."
                : y === pillar + 3
                  ? "Place chiseled stone bricks on every other block of the crown ring, including all four corners. Place one netherrack block at the center of the crossbeam."
                  : "Light a fire on top of the central netherrack with flint and steel. The flame is protected while the Hearthstone is registered. For an initial claim, right-click the gold heart with your Hearthstone Core. Already claimed? Use the Core menu to preview and confirm Stage 4.",
    ),
  });
}
export const hearthstoneStages = [
  {
    stage: 1,
    name: "Hearthstone Pedestal",
    size: 17,
    guide: "hearthstone",
    description: "A five-block pedestal for your first protected home.",
  },
  {
    stage: 2,
    name: "Fortified Hearthstone",
    size: 50,
    guide: "hearthstone-stage-2",
    description:
      "A 5 × 5 foundation and four iron-capped pillars for a homestead.",
  },
  {
    stage: 3,
    name: "Hearthstone Sanctuary",
    size: 100,
    guide: "hearthstone-stage-3",
    description:
      "A 7 × 7 fortified shrine, nine blocks above its foundation, with outer columns, an upper stone ring and corner lanterns. Space for a village, workshops and farms.",
  },
  {
    stage: 4,
    name: "Hearthstone Wardtower",
    size: 200,
    guide: "hearthstone-stage-4",
    description:
      "A 9 × 9 protection tower, 18 blocks above its foundation, with buttresses, a crenellated crown and a burning netherrack beacon. Protects a 200 × 200 footprint through the full world height, with space for a town center, roads and building plots.",
  },
] as const;
export function materials(s: Structure) {
  return s.blocks
    .filter((b) => b.role !== "air" && b.material !== "FIRE")
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
  POLISHED_ANDESITE: "#a5a8a1",
  LANTERN: "#efb851",
  NETHERRACK: "#884239",
  FIRE: "#ff992f",
  CHISELED_STONE_BRICKS: "#7d8e85",
  AIR: "#c8e8d0",
};
