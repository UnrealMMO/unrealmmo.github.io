import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import season from "../content/season-0.json";

test("Season 0 has 40 shared tiers with cosmetic-only premium milestones", () => {
  assert.equal(season.tiers.length, 40);
  assert.equal(season.tiers.filter((t) => t.premium).length, 16);
  for (const [i, t] of season.tiers.entries()) {
    assert.equal(t.tier, i + 1);
    assert.ok(t.free);
    if (t.premium)
      assert.ok(
        ["cosmetic", "title"].includes(
          season.rewards[t.premium.reward as keyof typeof season.rewards].kind,
        ),
      );
  }
  assert.equal(season.price.minorUnits, 1500);
  assert.equal(season.price.currency, "USD");
  assert.equal(season.xpPerTier * season.tiers.length, 100000);
  assert.equal(season.voteXp, 500);
});
test("Published gameplay totals match the reward schedule", () => {
  let coins = 0,
    xp = 0,
    repairs = 0,
    supplies = 0;
  for (const t of season.tiers) {
    const r = season.rewards[t.free.reward as keyof typeof season.rewards];
    if (r.kind === "supplies") supplies += t.free.count;
    if ("unit" in r && "amount" in r) {
      if (r.unit === "Coins") coins += r.amount * t.free.count;
      if (r.unit === "skill EXP") xp += r.amount * t.free.count;
      if (r.unit === "% repair") repairs += t.free.count;
    }
  }
  assert.deepEqual([coins, xp, repairs, supplies], [920, 120000, 6, 11]);
});
test("Checkout placeholders stay local and cannot collect payment or fulfill premium", () => {
  const source = readFileSync("app/season-pass/page.tsx", "utf8");
  assert.ok(source.includes('href="#checkout-placeholder"'));
  assert.ok(source.includes('href="#checkout-status"'));
  assert.ok(source.includes("No payments are taken here"));
  assert.doesNotMatch(
    source,
    /https:\/\/.*stripe|<form|fetch\(|localStorage|sessionStorage|use server/,
  );
});

test("Every visual reward has eight real render views and a large preview", async () => {
  const { existsSync } = await import("node:fs");
  const previews = JSON.parse(
    readFileSync("content/season-previews.json", "utf8"),
  );
  for (const [id, reward] of Object.entries(season.rewards)) {
    if (reward.kind === "title") continue;
    assert.ok(previews[id], id);
    assert.equal(
      previews[id].source,
      reward.kind === "cosmetic" ? "game-model" : "original-item-art",
    );
    for (let angle = 0; angle < 8; angle++)
      assert.ok(existsSync(`public/season/rewards/${id}-${angle}.webp`));
    assert.ok(existsSync(`public/season/rewards/${id}-large.webp`));
  }
  assert.ok(existsSync("public/season/woodland.webp"));
  assert.ok(existsSync("public/season/court.webp"));
});

test("Every visual reward has self-contained turntable geometry and textures", () => {
  for (const [id, reward] of Object.entries(season.rewards)) {
    if (reward.kind === "title") continue;
    const model = JSON.parse(
      readFileSync(`public/season/models/${id}.json`, "utf8"),
    );
    assert.ok(Number.isFinite(model.angle));
    assert.ok(model.meshes.length > 0);
    for (const mesh of model.meshes) {
      assert.match(mesh.texture, /^data:image\/png;base64,/);
      assert.ok(mesh.positions.length > 0 && mesh.positions.length % 9 === 0);
      assert.equal(mesh.uvs.length, (mesh.positions.length / 3) * 2);
      assert.ok([...mesh.positions, ...mesh.uvs].every(Number.isFinite));
    }
  }
});
