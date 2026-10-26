import assert from "node:assert/strict";
import test from "node:test";
import {
  castPose,
  deformArm,
  deformBody,
  type Point,
} from "../components/firestorm-rig";

test("casting loops continuously and keeps both boot anchors planted", () => {
  assert.deepEqual(castPose(0), castPose(1));
  assert.deepEqual(castPose(0), castPose(1 - 1e-8));
  const feet: Point[] = [
    [75, 845],
    [420, 880],
  ];
  for (let frame = 0; frame <= 540; frame++) {
    const pose = castPose(frame / 540);
    for (const foot of feet) assert.deepEqual(deformBody(foot, pose), foot);
  }
});

test("caster joints flow between key poses without a positional jump", () => {
  const points: Point[] = [
    [312, 378],
    [385, 345],
    [455, 308],
    [540, 100],
  ];
  const beats = [0.08, 0.14, 0.24, 0.31, 0.38, 0.43, 0.5, 0.55, 0.66, 0.84];
  for (const beat of beats) {
    for (const point of points) {
      const before = deformArm(point, castPose(beat - 1e-6));
      const after = deformArm(point, castPose(beat + 1e-6));
      assert.ok(Math.hypot(after[0] - before[0], after[1] - before[1]) < 0.01);
    }
  }
});

test("staff crown remains rigid through the lift and release", () => {
  const a: Point = [470, 100],
    b: Point = [565, 50];
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  for (let frame = 0; frame <= 540; frame++) {
    const pose = castPose(frame / 540);
    const p = deformArm(a, pose),
      q = deformArm(b, pose);
    assert.ok(Math.abs(Math.hypot(q[0] - p[0], q[1] - p[1]) - length) < 1e-8);
  }
});
