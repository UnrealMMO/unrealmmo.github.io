import { test } from "node:test";
import assert from "node:assert/strict";
import {
  skills,
  xp,
  bonuses,
  levelRows,
  structures,
  materials,
  traitsFor,
} from "../content/game";
import { readFileSync } from "node:fs";
const near = (a: number, b: number) =>
  assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`);
test("complete monotonic XP curve and all 495 readable level entries", () => {
  assert.equal(xp.length, 99);
  assert.equal(xp[0], 0);
  assert.equal(xp[98], 1_000_000);
  assert.equal(xp[49], 40594);
  assert.equal(xp[74], 183678);
  for (let i = 1; i < 99; i++) assert.ok(xp[i] > xp[i - 1]);
  assert.equal(skills.flatMap(levelRows).length, 495);
  for (const s of skills) {
    const rows = levelRows(s);
    assert.equal(
      rows.reduce((sum, r) => sum + r.needed, 0),
      1_000_000,
    );
    for (const r of rows)
      for (const n of Object.values(r.bonuses))
        assert.ok(n >= 0 && Number.isFinite(n));
  }
});
test("ordinary progression and milestone pauses match documented caps", () => {
  for (const s of skills) {
    for (const value of Object.values(bonuses(s.id, 1))) near(value, 0);
    assert.deepEqual(bonuses(s.id, 98), bonuses(s.id, 99));
  }
  near(bonuses("sneak", 98)["Sneak speed"], 200);
  near(bonuses("farming", 98)["Growth opportunities"], 25);
  near(bonuses("farming", 98)["Double produce"], 25);
  near(bonuses("mining", 98)["Double ore"], 50);
  near(bonuses("woodcutting", 98)["Double wood"], 25);
  near(bonuses("fishing", 98)["Shorter base wait"], 25);
  near(bonuses("farming", 2)["Growth opportunities"], 25 / 46);
  near(bonuses("farming", 2)["Double produce"], 0);
  near(bonuses("farming", 3)["Double produce"], 25 / 45);
  assert.deepEqual(bonuses("mining", 9), bonuses("mining", 10));
});
test("Farming additional structure unlocks preserve crop progression and multiple same-level traits", () => {
  const farmer = skills.find((s) => s.id === "farming")!;
  const rows = levelRows(farmer);
  assert.ok(rows[24].delta.length);
  assert.ok(rows[24].traits.some((t) => t.name === "Coal Tree"));
  assert.ok(rows[49].traits.some((t) => t.name === "Green Thumb"));
  assert.ok(rows[49].traits.some((t) => t.name === "Redstone Tree"));
  assert.ok(rows[49].traits.some((t) => t.name === "2 active ore trees"));
  assert.equal(rows[49].delta.length, 0);
  assert.equal(traitsFor(farmer).filter((t) => t.structure).length, 8);
});
test("all ore trees have exact geometry, quantities and open output ports", () => {
  assert.equal(structures.length, 9);
  for (const s of structures.filter((s) => s.kind === "tree")) {
    const b = s.blocks;
    assert.equal(new Set(b.map((p) => `${p.x},${p.y},${p.z}`)).size, b.length);
    assert.equal(b.filter((p) => p.role === "canopy").length, 17);
    assert.equal(b.filter((p) => p.role === "trunk").length, 3);
    assert.equal(b.filter((p) => p.role === "core").length, 1);
    assert.equal(b.filter((p) => p.role === "air").length, 4);
    assert.equal(
      Object.values(materials(s)).reduce((a, b) => a + b, 0),
      21,
    );
    for (const p of b.filter((p) => p.role === "air")) {
      assert.equal(p.y, 2);
      assert.equal(Math.abs(p.x) + Math.abs(p.z), 1);
    }
    assert.equal(b.filter((p) => p.y === 3).length, 13);
    for (const p of b.filter((p) => p.y === 3))
      assert.ok(Math.abs(p.x) + Math.abs(p.z) <= 2);
    assert.equal(s.steps.length, 5);
  }
  assert.equal(
    materials(structures.find((s) => s.id === "gold-tree")!).GOLD_BLOCK,
    20,
  );
});
test("Hearthstone is a five-block cardinal pedestal on one layer", () => {
  const s = structures.find((s) => s.id === "hearthstone")!;
  assert.deepEqual(materials(s), { IRON_BLOCK: 1, STONE_BRICKS: 4 });
  assert.ok(s.blocks.every((b) => b.y === 0));
  assert.ok(
    s.blocks
      .filter((b) => b.role !== "core")
      .every((b) => Math.abs(b.x) + Math.abs(b.z) === 1),
  );
});
test("every structure trait resolves to a guide and identifiers are unique", () => {
  assert.equal(new Set(structures.map((s) => s.id)).size, 9);
  for (const s of skills)
    for (const t of traitsFor(s)) {
      assert.ok(t.level >= 1 && t.level <= 99);
      if (t.structure) assert.ok(structures.some((s) => s.id === t.structure));
    }
});
test("Pages publishes only verified main pushes, never pull requests", () => {
  const workflow = readFileSync(".github/workflows/verify.yml", "utf8");
  const deployment = workflow.split("  deploy:\n")[1];
  assert.ok(
    deployment.includes(
      "if: github.event_name == 'push' && github.ref == 'refs/heads/main'",
    ),
  );
  assert.ok(deployment.includes("needs: verify"));
  assert.ok(workflow.includes("- run: npm run verify"));
  assert.ok(workflow.includes("path: out"));
});

test("every displayed XP and passive bonus matches the executed Java plugin rules", () => {
  const fixture = JSON.parse(
    readFileSync("tests/fixtures/plugin-rules.json", "utf8"),
  );
  for (const s of skills)
    for (const [level, total, ...values] of fixture.levels[s.id]) {
      assert.equal(xp[level - 1], total);
      const actual = Object.values(bonuses(s.id, level));
      assert.equal(actual.length, values.length);
      actual.forEach((value, i) => near(value, values[i]));
    }
});
