export type Point = [number, number];
export type CastPose = {
  shoulder: number;
  elbow: number;
  wrist: number;
  crouch: number;
  lean: number;
};

const poses: [number, CastPose][] = [
  [0, { shoulder: 32, elbow: -12, wrist: 24, crouch: 0, lean: 0 }],
  [0.08, { shoulder: 32, elbow: -12, wrist: 24, crouch: 0, lean: 0 }],
  [0.14, { shoulder: 42, elbow: -48, wrist: 8, crouch: 17, lean: -9 }],
  [0.24, { shoulder: -32, elbow: -22, wrist: -8, crouch: -5, lean: -3 }],
  [0.31, { shoulder: -4, elbow: 2, wrist: 28, crouch: 5, lean: 12 }],
  [0.38, { shoulder: -15, elbow: -16, wrist: 14, crouch: 0, lean: 4 }],
  [0.43, { shoulder: -4, elbow: 2, wrist: 28, crouch: 5, lean: 12 }],
  [0.5, { shoulder: -15, elbow: -16, wrist: 14, crouch: 0, lean: 4 }],
  [0.55, { shoulder: -4, elbow: 2, wrist: 28, crouch: 5, lean: 12 }],
  [0.66, { shoulder: 10, elbow: -14, wrist: 16, crouch: 7, lean: 5 }],
  [0.84, { shoulder: 32, elbow: -12, wrist: 24, crouch: 0, lean: 0 }],
  [1, { shoulder: 32, elbow: -12, wrist: 24, crouch: 0, lean: 0 }],
];

const smooth = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
};
const blend = (a: Point, b: Point, t: number): Point => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];
const rotate = (p: Point, origin: Point, degrees: number): Point => {
  const angle = (degrees * Math.PI) / 180,
    c = Math.cos(angle),
    s = Math.sin(angle);
  return [
    origin[0] + (p[0] - origin[0]) * c - (p[1] - origin[1]) * s,
    origin[1] + (p[0] - origin[0]) * s + (p[1] - origin[1]) * c,
  ];
};

export function castPose(cycle: number): CastPose {
  const phase = ((cycle % 1) + 1) % 1;
  const index = poses.findIndex(([time]) => time > phase);
  const [start, a] = poses[index - 1],
    [end, b] = poses[index];
  const t = smooth((phase - start) / (end - start));
  return Object.fromEntries(
    Object.keys(a).map((key) => [
      key,
      a[key as keyof CastPose] +
        (b[key as keyof CastPose] - a[key as keyof CastPose]) * t,
    ]),
  ) as CastPose;
}

export function deformBody([x, y]: Point, pose: CastPose): Point {
  // Hip motion fades out above the boots. Head, torso, hips and knees move
  // by different amounts, so the body compresses rather than tilting rigidly.
  const planted = smooth((840 - y) / 180);
  const upper = smooth((720 - y) / 260);
  return [
    x + pose.lean * upper + pose.crouch * 0.18 * planted * (1 - upper),
    y + pose.crouch * planted,
  ];
}

export function deformArm(point: Point, pose: CastPose): Point {
  const shoulder: Point = [312, 378],
    elbow: Point = [385, 345],
    grip: Point = [455, 308];
  const movedShoulder = deformBody(shoulder, pose);
  const upper = rotate(point, shoulder, pose.shoulder);
  const movedElbow = rotate(elbow, shoulder, pose.shoulder);
  const forearm = rotate(upper, movedElbow, pose.elbow);
  const movedGrip = rotate(
    rotate(grip, shoulder, pose.shoulder),
    movedElbow,
    pose.elbow,
  );
  const staff = rotate(point, grip, pose.wrist);
  staff[0] += movedGrip[0] - grip[0];
  staff[1] += movedGrip[1] - grip[1];
  // Across the elbow, blend the two bone transforms over a short soft joint.
  const alongArm =
    ((point[0] - elbow[0]) * 70 + (point[1] - elbow[1]) * -37) /
    Math.hypot(70, 37);
  const arm = blend(upper, forearm, smooth((alongArm + 25) / 50));
  // The long staff and hand move as one rigid piece around the wrist. Its
  // centerline distinguishes it from the adjoining forearm in this cutout.
  const staffLine = 455 + (308 - point[1]) * 0.36;
  const staffWeight = Math.max(
    smooth((300 - point[1]) / 35),
    smooth((point[0] - 415) / 30),
    smooth((point[1] - 320) / 20) * smooth((point[0] - staffLine + 30) / 15),
  );
  const result = blend(arm, staff, staffWeight);
  return [
    result[0] + movedShoulder[0] - shoulder[0],
    result[1] + movedShoulder[1] - shoulder[1],
  ];
}
