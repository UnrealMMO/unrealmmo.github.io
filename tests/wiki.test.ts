import { test } from "node:test";
import assert from "node:assert/strict";
import { searchWiki, wikiEntries } from "../content/wiki";
import { wikiItems } from "../content/wiki-items";

test("wiki search finds gameplay terms across categories", () => {
  assert.ok(searchWiki(" claim ").some((e) => e.href.includes("hearthstone")));
  assert.ok(
    searchWiki("LAVA bucket", "items").some((e) => e.name === "Fire Staff"),
  );
  assert.ok(
    searchWiki("horse", "settlements").some((e) => e.name === "Stable"),
  );
  assert.ok(searchWiki("inn", "structures").some((e) => e.name === "Inn"));
  assert.equal(searchWiki("fire staff", "settlements").length, 0);
  assert.equal(searchWiki("nothing-matches-this").length, 0);
  assert.equal(searchWiki("   ").length, wikiEntries.length);
  assert.equal(
    new Set(wikiEntries.map((e) => e.href)).size,
    wikiEntries.length,
  );
});

test("recipe grids preserve the agreed staff ingredients and unlock", () => {
  for (const [id, bucket, core] of [
    ["water-staff", "Water Bucket", "Amethyst Shard"],
    ["fire-staff", "Lava Bucket", "Blaze Rod"],
  ]) {
    const item = wikiItems.find((i) => i.id === id)!;
    assert.deepEqual(
      item.recipe!.cells.map((c) => c?.name),
      [
        bucket,
        core,
        bucket,
        "Magic Rune",
        "Stick",
        "Magic Rune",
        "Magic Rune",
        "Stick",
        "Magic Rune",
      ],
    );
    assert.ok(item.recipe!.notes!.some((n) => n.includes("empty buckets")));
  }
  assert.equal(
    wikiItems.find((i) => i.id === "fire-staff")!.requirement,
    "Magic level 25 · Ember Bolt",
  );
  assert.equal(
    wikiItems.find((i) => i.id === "magic-rune")!.recipe!.output,
    "8 Magic Runes",
  );
});

test("every Season Zero reward has a Wiki destination and every guide has a preview", async () => {
  const { existsSync } = await import("node:fs");
  const { default: season } = await import("../content/season-0.json");
  const { seasonRewardGuides, wikiCosmetics, seasonUnlocks } =
    await import("../content/wiki-season");
  for (const id of Object.keys(season.rewards)) {
    assert.ok(seasonRewardGuides[id], `Missing reward guide: ${id}`);
    assert.ok(
      wikiEntries.some(
        (entry) => entry.href === seasonRewardGuides[id].split("#")[0],
      ),
      id,
    );
  }
  for (const entry of wikiEntries)
    assert.ok(existsSync(`public${entry.image}`), entry.image);
  for (const c of wikiCosmetics) {
    assert.equal(seasonUnlocks(c.rewardId).length, 1, c.id);
    if (c.model) assert.ok(existsSync(`public${c.model}`), c.model);
  }
  const helmet = wikiCosmetics.find((c) => c.id === "dread-lantern")!;
  assert.deepEqual(seasonUnlocks(helmet.rewardId), [
    { tier: 40, track: "Premium", count: 1, xp: 100000 },
  ]);
  assert.ok(
    searchWiki("season zero", "cosmetics").some(
      (c) => c.name === "Dread Lantern",
    ),
  );
});
