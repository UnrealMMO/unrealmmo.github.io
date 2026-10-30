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
  assert.equal(
    wikiItems.find((i) => i.id === "skill-journal")!.recipe!.shapeless,
    true,
  );
});
