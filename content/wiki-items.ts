import type { WikiItemIconName } from "./wiki-icons";
export type Ingredient = {
  name: string;
  icon: WikiItemIconName;
  href?: string;
};
export type WikiItem = {
  id: string;
  name: string;
  description: string;
  icon: WikiItemIconName;
  requirement?: string;
  recipe?: {
    shapeless?: boolean;
    cells: (Ingredient | null)[];
    output: string;
    notes?: string[];
  };
  use: string[];
  obtain?: string;
  variants?: { name: string; benefit: string; requirement?: string }[];
  related: { href: string; label: string }[];
};
const rune: Ingredient = {
  name: "Magic Rune",
  icon: "magic_rune",
  href: "/wiki/items/magic-rune/",
};
const stick: Ingredient = { name: "Stick", icon: "stick" };
const magic = { href: "/skills/magic/", label: "Magic spells & unlocks" };
function staffRecipe(bucket: string, core: string): (Ingredient | null)[] {
  return [
    {
      name: bucket,
      icon: bucket === "Water Bucket" ? "water_bucket" : "lava_bucket",
    },
    { name: core, icon: core === "Blaze Rod" ? "blaze_rod" : "amethyst_shard" },
    {
      name: bucket,
      icon: bucket === "Water Bucket" ? "water_bucket" : "lava_bucket",
    },
    rune,
    stick,
    rune,
    rune,
    stick,
    rune,
  ];
}
export const wikiItems: WikiItem[] = [
  {
    id: "supply-packs",
    name: "Supply Packs",
    icon: "chest",
    description:
      "Food, building materials and crafting supplies from the regular pass.",
    obtain: "Earn these packs as you progress through Season Zero.",
    use: ["Each award contains the materials listed below."],
    related: [
      { href: "/wiki/cosmetics/season-zero/", label: "Season Zero collection" },
    ],
  },
  {
    id: "water-staff",
    name: "Water Staff",
    icon: "water_staff",
    description: "Cast water spells, from Water Bolt to Healing Spring.",
    requirement: "Magic level 1",
    recipe: {
      cells: staffRecipe("Water Bucket", "Amethyst Shard"),
      output: "1 Water Staff",
      notes: [
        "Use 2 water buckets, 1 amethyst shard, 4 Magic Runes and 2 sticks.",
        "Both empty buckets are returned.",
      ],
    },
    use: [
      "Carry Magic Runes to fuel your spells. Each cast uses one rune and Mana.",
      "More water spells unlock as you train Magic.",
    ],
    related: [
      magic,
      { href: "/wiki/items/magic-rune/", label: "Craft Magic Runes" },
    ],
  },
  {
    id: "fire-staff",
    name: "Fire Staff",
    icon: "fire_staff",
    description: "Wield Ember Bolt, then unlock stronger fire spells.",
    requirement: "Magic level 25 · Ember Bolt",
    recipe: {
      cells: staffRecipe("Lava Bucket", "Blaze Rod"),
      output: "1 Fire Staff",
      notes: [
        "Use 2 lava buckets, 1 plain blaze rod, 4 Magic Runes and 2 sticks.",
        "Both empty buckets are returned. Craft it yourself at a crafting table; automated Crafters cannot make Fire Staffs.",
      ],
    },
    use: [
      "Reach Magic level 25 to unlock Ember Bolt and craft the staff.",
      "Each cast uses one Magic Rune and Mana. Train Magic to unlock Firestorm, Inferno Nova and Flame Lance.",
    ],
    related: [
      magic,
      { href: "/wiki/items/magic-rune/", label: "Craft Magic Runes" },
    ],
  },
  {
    id: "magic-rune",
    name: "Magic Rune",
    icon: "magic_rune",
    description: "Fuel for staff spells and magical abilities.",
    recipe: {
      shapeless: true,
      cells: [
        { name: "Flint", icon: "flint" },
        { name: "Lapis Lazuli", icon: "lapis_lazuli" },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      output: "8 Magic Runes",
      notes: [
        "Combine 1 plain flint and 1 lapis lazuli in any arrangement.",
        "Use crafted Magic Runes in staff recipes. Ordinary flint will not work in their place.",
      ],
    },
    use: [
      "Keep runes in your inventory when casting. Each staff cast consumes one rune.",
    ],
    related: [
      { href: "/wiki/items/water-staff/", label: "Water Staff" },
      { href: "/wiki/items/fire-staff/", label: "Fire Staff" },
      magic,
    ],
  },
  {
    id: "coin-pouches",
    name: "Coin Pouches",
    icon: "gold_nugget",
    description:
      "A little extra spending money. Right-click to collect the Coins.",
    obtain:
      "Earn pouches through the regular Season Pass or find them in Gift Boxes.",
    variants: [
      { name: "Small Coin Pouch", benefit: "20 Coins" },
      { name: "Medium Coin Pouch", benefit: "60 Coins" },
      { name: "Large Coin Pouch", benefit: "150 Coins" },
      { name: "Grand Coin Pouch", benefit: "250 Coins" },
    ],
    use: ["Right-click a pouch to add its Coins to your balance."],
    related: [
      { href: "/wiki/items/gift-box/", label: "Gift Box" },
      { href: "/season-pass/", label: "Season Pass rewards" },
    ],
  },
  {
    id: "exp-scrolls",
    name: "EXP Scrolls",
    icon: "enchanted_book",
    description: "Choose a skill and give it a boost.",
    obtain:
      "Earn scrolls through the regular Season Pass or find them in Gift Boxes.",
    variants: [
      {
        name: "Lesser EXP Scroll",
        benefit: "5,000 skill EXP",
        requirement: "Skill level 40",
      },
      {
        name: "Greater EXP Scroll",
        benefit: "15,000 skill EXP",
        requirement: "Skill level 60",
      },
      {
        name: "Grand EXP Scroll",
        benefit: "30,000 skill EXP",
        requirement: "Skill level 75",
      },
    ],
    use: [
      "Right-click, then choose an eligible UnrealMMO skill.",
      "The chosen skill must meet the scroll’s level requirement and have room for all its EXP before level 99. Scroll EXP is a fixed amount; boosts do not multiply it.",
    ],
    related: [
      { href: "/skills/", label: "Skill unlocks" },
      { href: "/season-pass/", label: "Season Pass rewards" },
    ],
  },
  {
    id: "repair-notes",
    name: "Repair Notes",
    icon: "paper",
    description: "Restore a damaged tool, weapon or piece of armor.",
    obtain:
      "Find repair notes in Gift Boxes. Full Repair Notes are also available on the regular Season Pass.",
    variants: [
      {
        name: "Half Repair Note",
        benefit: "Restores up to half the item’s maximum durability",
      },
      { name: "Full Repair Note", benefit: "Fully repairs the item" },
    ],
    use: [
      "Right-click the note and choose a damaged item from the menu.",
      "If you have no eligible items, keep the note for later.",
    ],
    related: [
      { href: "/wiki/items/gift-box/", label: "Gift Box" },
      { href: "/season-pass/", label: "Season Pass rewards" },
    ],
  },
  {
    id: "gift-box",
    name: "Gift Box",
    icon: "chest",
    description: "Open a surprise reward, with rare collectibles to discover.",
    obtain:
      "Gift Boxes are awarded for accepted votes from connected server lists.",
    use: [
      "Right-click to open a box and receive one reward.",
      "Possible rewards include Coin Pouches, EXP Scrolls, Repair Notes, and rare title or name-color tokens.",
    ],
    related: [
      { href: "/wiki/items/coin-pouches/", label: "Coin Pouches" },
      { href: "/wiki/items/exp-scrolls/", label: "EXP Scrolls" },
      { href: "/wiki/items/repair-notes/", label: "Repair Notes" },
    ],
  },
];
