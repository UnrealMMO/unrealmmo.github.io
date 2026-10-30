// Actual Minecraft 26.2 textures and rendered resource-pack items.
// Source hashes and rendering provenance: docs/wiki-icons.json.
export const wikiItemIconNames = [
  "water_bucket",
  "lava_bucket",
  "amethyst_shard",
  "blaze_rod",
  "flint",
  "lapis_lazuli",
  "stick",
  "paper",
  "book",
  "gold_nugget",
  "enchanted_book",
  "chest",
  "name_tag",
  "water_staff",
  "fire_staff",
  "magic_rune",
] as const;
export type WikiItemIconName = (typeof wikiItemIconNames)[number];
