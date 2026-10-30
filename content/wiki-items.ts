export type Ingredient = { name: string; icon: string; href?: string };
export type WikiItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  model?: string;
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
  icon: "rune",
  href: "/wiki/items/magic-rune/",
};
const stick: Ingredient = { name: "Stick", icon: "stick" };
const magic = { href: "/skills/magic/", label: "Magic spells & unlocks" };
function staffRecipe(bucket: string, core: string): (Ingredient | null)[] {
  return [
    { name: bucket, icon: "bucket" },
    { name: core, icon: core === "Blaze Rod" ? "flame" : "gem" },
    { name: bucket, icon: "bucket" },
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
    id: "water-staff",
    name: "Water Staff",
    icon: "water",
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
    icon: "flame",
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
    icon: "rune",
    description: "Fuel for staff spells and magical abilities.",
    recipe: {
      shapeless: true,
      cells: [
        { name: "Flint", icon: "gem" },
        { name: "Lapis Lazuli", icon: "gem" },
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
    id: "skill-journal",
    name: "Skill Journal",
    icon: "book",
    description: "Check your levels, unlocks and skill settings.",
    recipe: {
      shapeless: true,
      cells: [
        { name: "Paper", icon: "paper" },
        stick,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      output: "1 Skill Journal",
      notes: ["Combine 1 paper and 1 stick in any arrangement."],
    },
    use: [
      "Right-click to browse your skills and unlocked abilities.",
      "Your progress belongs to your character. Losing the journal does not reset your skills.",
    ],
    related: [{ href: "/skills/", label: "Explore the skills" }],
  },
  {
    id: "coin-pouches",
    name: "Coin Pouches",
    icon: "coins",
    model: "small_pouch",
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
    icon: "scroll",
    model: "lesser_scroll",
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
    icon: "repair",
    model: "full_repair",
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
    icon: "gift",
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
