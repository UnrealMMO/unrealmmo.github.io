"use client";

import { useEffect, useRef, useState } from "react";
import {
  castPose,
  deformArm,
  deformBody,
  type Point,
} from "@/components/firestorm-rig";

type Triangle = [Point, Point, Point];
type Layer = { image: HTMLImageElement; triangles: Triangle[] };

// Cache only occupied triangles. The mesh bends the existing artwork at joints;
// it never switches between the old six still frames.
function makeLayer(image: HTMLImageElement): Layer {
  const scratch = document.createElement("canvas");
  scratch.width = 600;
  scratch.height = 900;
  const ctx = scratch.getContext("2d")!;
  ctx.drawImage(image, 0, 0, 600, 900);
  const pixels = ctx.getImageData(0, 0, 600, 900).data;
  const triangles: Triangle[] = [];
  const step = 30;
  for (let y = 0; y < 900; y += step) {
    for (let x = 0; x < 600; x += step) {
      let occupied = false;
      for (let sy = y; sy < y + step && !occupied; sy++)
        for (let sx = x; sx < x + step; sx++)
          if (pixels[(sy * 600 + sx) * 4 + 3] > 8) {
            occupied = true;
            break;
          }
      if (!occupied) continue;
      triangles.push([
        [x, y],
        [x + step, y],
        [x, y + step],
      ]);
      triangles.push([
        [x + step, y],
        [x + step, y + step],
        [x, y + step],
      ]);
    }
  }
  return { image, triangles };
}

function drawLayer(
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  deform: (point: Point) => Point,
) {
  for (const triangle of layer.triangles) {
    const [a, b, c] = triangle;
    const [p, q, r] = triangle.map(deform);
    const det = (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
    const xx =
      ((q[0] - p[0]) * (c[1] - a[1]) - (r[0] - p[0]) * (b[1] - a[1])) / det;
    const xy =
      ((r[0] - p[0]) * (b[0] - a[0]) - (q[0] - p[0]) * (c[0] - a[0])) / det;
    const yx =
      ((q[1] - p[1]) * (c[1] - a[1]) - (r[1] - p[1]) * (b[1] - a[1])) / det;
    const yy =
      ((r[1] - p[1]) * (b[0] - a[0]) - (q[1] - p[1]) * (c[0] - a[0])) / det;
    ctx.save();
    ctx.beginPath();
    // Tiny overlap prevents antialiasing cracks along shared mesh edges.
    const center: Point = [(p[0] + q[0] + r[0]) / 3, (p[1] + q[1] + r[1]) / 3];
    for (const [i, point] of [p, q, r].entries()) {
      const dx = point[0] - center[0],
        dy = point[1] - center[1];
      const distance = Math.hypot(dx, dy);
      const x = point[0] + (dx / distance) * 0.6;
      const y = point[1] + (dy / distance) * 0.6;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.clip();
    ctx.transform(
      xx,
      yx,
      xy,
      yy,
      p[0] - xx * a[0] - xy * a[1],
      p[1] - yx * a[0] - yy * a[1],
    );
    ctx.drawImage(layer.image, 0, 0, 600, 900);
    ctx.restore();
  }
}

export function FirestormCaster({ paused }: { paused: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const [layers, setLayers] = useState<Layer[] | null>(null);
  const [reduced, setReduced] = useState(false);
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    let alive = true;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    Promise.all(
      ["firestorm-caster-body-v2.webp", "firestorm-casting-arm-v2.webp"].map(
        (name) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = `/art/${name}`;
          }),
      ),
    )
      .then((images) => {
        if (alive) setLayers(images.map(makeLayer));
      })
      .catch(() => {
        /* Keep the static fallback if artwork cannot load. */
      });
    return () => {
      alive = false;
      preference.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!layers || !canvas.current || !clock.current) return;
    const ctx = canvas.current.getContext("2d");
    if (!ctx) return;
    const timeline = clock.current.getAnimations()[0];
    let frame = 0;
    const draw = () => {
      const time = reduced ? 0 : Number(timeline?.currentTime ?? 0);
      const pose = castPose(time / 9000);
      ctx.clearRect(0, 0, 800, 1050);
      ctx.save();
      ctx.translate(100, 150);
      drawLayer(ctx, layers[0], (point) => deformBody(point, pose));
      drawLayer(ctx, layers[1], (point) => deformArm(point, pose));
      ctx.restore();
      if (!paused && !reduced) frame = requestAnimationFrame(draw);
    };
    draw();
    setPainted(true);
    return () => cancelAnimationFrame(frame);
  }, [layers, paused, reduced]);

  return (
    <div className="firestorm-caster">
      <span ref={clock} className="firestorm-caster-clock" />
      {!painted && (
        <img
          className="firestorm-caster-fallback"
          src="/art/firestorm-caster-v1.webp"
          alt=""
          width={600}
          height={900}
        />
      )}
      <canvas
        ref={canvas}
        width={800}
        height={1050}
        className="firestorm-caster-canvas"
      />
    </div>
  );
}
