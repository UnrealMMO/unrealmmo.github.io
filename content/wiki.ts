import { structures } from "./game";
import { wikiItems } from "./wiki-items";
import { wikiCosmetics, cosmeticHref } from "./wiki-season";
export const wikiCategories = [
  {
    id: "structures",
    name: "Structures",
    description: "Ore trees, Hearthstones and build guides.",
    image: "/art/diamond-tree-ingame.webp",
  },
  {
    id: "settlements",
    name: "Settlements",
    description: "Claim a home. Build Inns and Stables.",
    image: "/art/stable-exterior-v1.png",
  },
  {
    id: "items",
    name: "Items & Crafting",
    description: "Recipes, useful items and how to get them.",
    image: "/wiki/items/enchanted_book.png",
  },
  {
    id: "cosmetics",
    name: "Cosmetics",
    description: "Season Zero outfits, pets and collectibles.",
    image: "/wiki/cosmetics/hollow_regent_regalia.webp",
  },
] as const;
export type WikiCategory = (typeof wikiCategories)[number]["id"];
export type WikiEntry = {
  name: string;
  description: string;
  href: string;
  categories: WikiCategory[];
  keywords: string;
  image: string;
};
export const wikiEntries: WikiEntry[] = [
  ...structures.map((s) => ({
    name: s.name,
    image: `/wiki/structures/${s.id}.svg`,
    description: s.description,
    href: `/wiki/structures/${s.id}/`,
    categories: (s.kind === "hearthstone"
      ? ["structures", "settlements"]
      : ["structures"]) as WikiCategory[],
    keywords:
      s.kind === "tree"
        ? `farming ore tree ${s.output}`
        : "claim protection territory home hearthstone upgrade permissions",
  })),
  {
    name: "Starting a settlement",
    image: `/wiki/structures/${structures.find((s) => s.kind === "hearthstone")!.id}.svg`,
    description: "Claim territory and register your first building.",
    href: "/wiki/settlements/#getting-started",
    categories: ["settlements"],
    keywords: "claim permissions steward owner territory home",
  },
  {
    name: "Inn",
    image: "/art/inn-exterior-interior-v1.png",
    description: "Build and register an Inn that earns Coins.",
    href: "/wiki/settlements/#inn",
    categories: ["structures", "settlements"],
    keywords: "beds rooms storage registration sign income coins",
  },
  {
    name: "Stable",
    image: "/art/stable-exterior-v1.png",
    description: "Board horses and earn income for your territory.",
    href: "/wiki/settlements/#stable",
    categories: ["structures", "settlements"],
    keywords:
      "horse saddle lead fence hay cauldron registration sign income coins",
  },
  ...wikiItems.map((i) => ({
    name: i.name,
    image: `/wiki/items/${i.icon}.png`,
    description: i.description,
    href: `/wiki/items/${i.id}/`,
    categories: ["items"] as WikiCategory[],
    keywords: [
      i.requirement,
      i.obtain,
      ...i.use,
      ...(i.recipe?.cells.map((c) => c?.name) ?? []),
      ...(i.variants?.map(
        (v) => `${v.name} ${v.benefit} ${v.requirement ?? ""}`,
      ) ?? []),
    ].join(" "),
  })),
  ...wikiCosmetics.map((c) => ({
    name: c.name,
    description: c.type,
    image: c.image,
    href: cosmeticHref(c.id),
    categories: ["cosmetics"] as WikiCategory[],
    keywords: `Season Zero Season 0 Hollow Harvest ${c.description} ${c.group}`,
  })),
];
export function searchWiki(query: string, category: string = "all") {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return wikiEntries.filter(
    (e) =>
      (category === "all" || e.categories.includes(category as WikiCategory)) &&
      words.every((word) =>
        `${e.name} ${e.description} ${e.keywords}`.toLowerCase().includes(word),
      ),
  );
}
