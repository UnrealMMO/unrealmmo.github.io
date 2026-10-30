import { test } from "node:test";
import assert from "node:assert/strict";
import { scenePan } from "../components/scene-pan";
test("pan moves continuously in one direction through the entire reward road", () => {
  for (const distance of [0, 800, 2600]) {
    let previous = 0;
    for (let i = 0; i <= 1000; i++) {
      const next = scenePan(i / 1000, distance);
      assert.ok(next <= previous);
      assert.ok(next >= -distance);
      previous = next;
    }
    assert.equal(scenePan(1, distance), distance === 0 ? 0 : -distance);
    assert.equal(scenePan(2, distance), distance === 0 ? 0 : -distance);
    assert.equal(scenePan(-1, distance), 0);
  }
});
