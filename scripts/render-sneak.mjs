// Original detailed character sprites generated with imagegen; FFmpeg supplies
// motion-compensated in-between frames. Run from the repository root with FFmpeg installed.
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
const work = await mkdtemp(join(tmpdir(), "unrealmmo-sneak-"));
const size = 560,
  fps = 24,
  duration = 7,
  spriteWidth = 378,
  baseline = 476;
const smooth = (x) => {
  x = Math.min(1, Math.max(0, x));
  return x * x * (3 - 2 * x);
};
try {
  for (const dir of ["keys", "motion", "frames"]) await mkdir(join(work, dir));
  const source = "public/art/sneak-poses.webp";
  const meta = await sharp(source).metadata();
  const bg = await sharp("public/art/sneak-woods.webp")
    .resize(size, size)
    .removeAlpha()
    .raw()
    .toBuffer();
  const poses = [];
  for (let i = 0; i < 7; i++) {
    const left = Math.round(((i % 4) * meta.width) / 4),
      top = Math.round((Math.floor(i / 4) * meta.height) / 2);
    const width = Math.round((((i % 4) + 1) * meta.width) / 4) - left,
      height = Math.round(((Math.floor(i / 4) + 1) * meta.height) / 2) - top;
    const { data, info } = await sharp(source)
      .extract({ left, top, width, height })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let bottom = 0;
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++)
        if (data[(y * width + x) * 4 + 3] > 128) bottom = Math.max(bottom, y);
    const sprite = await sharp(data, { raw: info })
      .resize({ width: spriteWidth })
      .png()
      .toBuffer();
    const offset = baseline - Math.round((bottom * spriteWidth) / width);
    poses.push({ sprite, offset });
    await sharp(bg, { raw: { width: size, height: size, channels: 3 } })
      .composite([{ input: sprite, left: 80, top: offset }])
      .png()
      .toFile(join(work, "keys", `${String(i).padStart(3, "0")}.png`));
  }
  for (let i = 7; i < 10; i++)
    await sharp(join(work, "keys", "006.png")).toFile(
      join(work, "keys", `${String(i).padStart(3, "0")}.png`),
    );
  execFileSync("ffmpeg", [
    "-loglevel",
    "error",
    "-y",
    "-framerate",
    "12",
    "-i",
    join(work, "keys", "%03d.png"),
    "-vf",
    "format=yuv444p,minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1",
    join(work, "motion", "%03d.png"),
  ]);
  const motion = [];
  for (let i = 1; i <= 13; i++)
    motion.push(
      await sharp(join(work, "motion", `${String(i).padStart(3, "0")}.png`))
        .removeAlpha()
        .raw()
        .toBuffer(),
    );
  for (let frame = 0; frame < fps * duration; frame++) {
    const t = frame / fps;
    let pixels,
      visibility = 1;
    if (t < 2 || t >= 6.5) {
      const phase = 2 * Math.PI * (t < 2 ? t / 2 : (t - 7) / 2);
      const strength = t < 2 ? 1 : smooth((t - 6.5) / 0.25);
      const stretch = 1 + 0.009 * Math.sin(phase) * strength;
      const pose = poses[0];
      const h = (await sharp(pose.sprite).metadata()).height;
      const resized = await sharp(pose.sprite)
        .resize(spriteWidth, Math.round(h * stretch))
        .png()
        .toBuffer();
      // Breathing stays anchored at the boots; a tiny lateral sway keeps the idle alive.
      pixels = await sharp(bg, {
        raw: { width: size, height: size, channels: 3 },
      })
        .composite([
          {
            input: resized,
            left: 80 + Math.round(1.4 * Math.sin(phase) * strength),
            top: pose.offset + Math.round(h - h * stretch),
          },
        ])
        .removeAlpha()
        .raw()
        .toBuffer();
    } else if (t < 3.75) {
      pixels = motion[Math.min(12, Math.round(smooth((t - 2) / 0.5) * 12))];
      visibility = 1 - smooth((t - 3) / 0.75);
    } else if (t < 5.75) {
      pixels = bg;
      visibility = 0;
    } else {
      const progress = smooth((t - 5.75) / 0.75);
      pixels = motion[Math.round((1 - progress) * 12)];
      visibility = progress;
    }
    if (visibility < 1) {
      const composite = Buffer.alloc(bg.length);
      // A soft pixel dissolve affects only the difference between character and woods.
      for (let y = 0; y < size; y++)
        for (let x = 0; x < size; x++) {
          const hash =
            ((((Math.floor(x / 3) * 73856093) ^
              (Math.floor(y / 3) * 19349663)) >>>
              0) %
              1024) /
            1024;
          const amount =
            visibility === 0 ? 0 : smooth((visibility - hash + 0.1) / 0.2);
          const offset = (y * size + x) * 3;
          for (let c = 0; c < 3; c++)
            composite[offset + c] = Math.round(
              bg[offset + c] + (pixels[offset + c] - bg[offset + c]) * amount,
            );
        }
      pixels = composite;
    }
    await sharp(pixels, { raw: { width: size, height: size, channels: 3 } })
      .png()
      .toFile(join(work, "frames", `${String(frame).padStart(3, "0")}.png`));
  }
  await sharp(join(work, "frames", "000.png"))
    .webp({ quality: 92 })
    .toFile("public/art/sneak-visible.webp");
  execFileSync("ffmpeg", [
    "-loglevel",
    "error",
    "-y",
    "-framerate",
    String(fps),
    "-i",
    join(work, "frames", "%03d.png"),
    "-filter_complex",
    "split[a][b];[a]palettegen=stats_mode=diff:max_colors=256[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle",
    "-loop",
    "0",
    "public/art/sneak-vanish.gif",
  ]);
  const first = await sharp(join(work, "frames", "000.png"))
    .raw()
    .toBuffer();
  const last = await sharp(join(work, "frames", "167.png"))
    .raw()
    .toBuffer();
  const hiddenA = await readFile(join(work, "frames", "096.png"));
  const hiddenB = await readFile(join(work, "frames", "120.png"));
  console.log({
    frames: fps * duration,
    duration,
    invisibleHoldIdentical: hiddenA.equals(hiddenB),
    loopMeanPixelDifference:
      first.reduce((sum, value, i) => sum + Math.abs(value - last[i]), 0) /
      first.length,
  });
} finally {
  await rm(work, { recursive: true, force: true });
}
