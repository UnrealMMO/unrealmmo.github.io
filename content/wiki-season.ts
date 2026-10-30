import season from "./season-0.json";
import previews from "./wiki-cosmetic-previews.json";

export const cosmeticTypes: Record<string, string> = {
  harvest_warden_mask: "Headwear Style",
  candlekeeper_pickaxe: "Pickaxe Style",
  little_lantern: "Pet",
  harvest_warden_sword: "Sword Style",
  harvest_warden_hat: "Headwear Style",
  harvest_warden_shield: "Shield Style",
  hollow_pilgrim_hood: "Headwear Style",
  hollow_regent_mask: "Headwear Style",
  graveglass_pickaxe: "Pickaxe Style",
  nevermore: "Pet",
  graveglass_axe: "Axe Style",
  hollow_regent_sword: "Sword Style",
  graveglass_shovel: "Shovel Style",
  hollow_regent_mantle: "Back Style",
  graveglass_hoe: "Hoe Style",
  hollow_regent_bow: "Bow Style",
  hollow_regent_shield: "Shield Style",
  hollow_regent_crown: "Headwear Style",
  nevermore_ghost: "Pet",
  harvest_warden_regalia: "Armor Style",
  hollow_regent_regalia: "Armor & Helmet Styles",
};
export function seasonUnlocks(id: string) {
  return season.tiers.flatMap((t) =>
    (["free", "premium"] as const).flatMap((track) =>
      t[track]?.reward === id
        ? [
            {
              tier: t.tier,
              track: track === "free" ? "Regular" : "Premium",
              count: t[track]!.count,
              xp: t.tier * season.xpPerTier,
            },
          ]
        : [],
    ),
  );
}
export const cosmeticGroups = [
  "Headwear",
  "Outfits",
  "Tools & weapons",
  "Companions",
  "Titles",
] as const;
export type WikiCosmetic = {
  id: string;
  rewardId: string;
  name: string;
  type: string;
  group: (typeof cosmeticGroups)[number];
  description: string;
  image: string;
  model?: string;
  angle?: number;
};
const descriptions: Record<string, string> = {
  of_the_hollow_court: "Unlock the title “Of the Hollow Court”.",
  sovereign_of_the_hollow: "Unlock the title “Sovereign of the Hollow”.",
  little_lantern: "A small candlelit companion for your travels.",
  nevermore: "A raven companion with outstretched wings.",
  nevermore_ghost: "A pale, ghostly raven to keep you company.",
  hollow_regent_mantle: "A flowing cape to finish your Regent outfit.",
  harvest_warden_regalia:
    "The Warden chestpiece, leggings and boots, earned together.",
  hollow_regent_regalia:
    "The Regent chestpiece, leggings and boots, plus the Dread Lantern helmet.",
};
export const wikiCosmetics: WikiCosmetic[] = Object.entries(season.rewards)
  .filter(([, r]) => r.kind === "cosmetic" || r.kind === "title")
  .map(([id, r]) => {
    const p = previews[id as keyof typeof previews];
    const type = r.kind === "title" ? "Title" : cosmeticTypes[id];
    const group =
      type === "Title"
        ? "Titles"
        : type === "Pet"
          ? "Companions"
          : type === "Headwear Style"
            ? "Headwear"
            : /Armor|Back/.test(type)
              ? "Outfits"
              : "Tools & weapons";
    return {
      id: id.replaceAll("_", "-"),
      rewardId: id,
      name: r.label,
      type,
      group,
      description:
        descriptions[id] ??
        (type === "Title"
          ? `Add “${r.label}” to your collection of titles.`
          : `${type} from the Hollow Harvest collection.`),
      image: p?.image ?? "/wiki/items/name_tag.png",
      model: p ? `/season/models/${id}.json` : undefined,
      angle: p?.angle,
    };
  });
wikiCosmetics.push({
  id: "dread-lantern",
  rewardId: "hollow_regent_regalia",
  name: "Dread Lantern",
  type: "Helmet Style",
  group: "Headwear",
  description:
    "A sinister jack-o’-lantern helmet, included with the tier-40 Regent Set.",
  image: previews.dread_lantern.image,
  model: "/wiki/cosmetics/dread_lantern.json",
  angle: previews.dread_lantern.angle,
});
export const cosmeticHref = (id: string) =>
  `/wiki/cosmetics/season-zero/${id}/`;
export const seasonSupplies = Object.entries(season.rewards).flatMap(
  ([id, r]) =>
    r.kind === "supplies" && "items" in r
      ? [{ id, name: r.label, items: r.items, unlocks: seasonUnlocks(id) }]
      : [],
);
const giftGuides: Record<string, string> = {
  small_pouch: "coin-pouches",
  medium_pouch: "coin-pouches",
  large_pouch: "coin-pouches",
  harvest_treasury: "coin-pouches",
  lesser_scroll: "exp-scrolls",
  greater_scroll: "exp-scrolls",
  grand_scroll: "exp-scrolls",
  full_repair: "repair-notes",
};
export const seasonRewardGuides: Record<string, string> = Object.fromEntries(
  Object.entries(season.rewards).map(([id, r]) => [
    id,
    r.kind === "gift"
      ? `/wiki/items/${giftGuides[id]}/`
      : r.kind === "supplies"
        ? `/wiki/items/supply-packs/#${id}`
        : cosmeticHref(id.replaceAll("_", "-")),
  ]),
);
