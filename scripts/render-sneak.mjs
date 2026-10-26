// Original character poses and forest plate; interpolate the crouch and render
// a full-color, continuously eased cloak fade. Requires FFmpeg and website deps.
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
const work = await mkdtemp(join(tmpdir(), "unrealmmo-sneak-"));
const size = 640,
  fps = 48,
  duration = 9;
const scale = size / 560,
  spriteWidth = Math.round(378 * scale),
  baseline = Math.round(476 * scale);
const smooth = (value) => {
  const x = Math.max(0, Math.min(1, value));
  return x * x * x * (x * (x * 6 - 15) + 10);
};
try {
  for (const dir of ["keys", "motion", "frames"]) await mkdir(join(work, dir));
  const meta = await sharp("public/art/sneak-poses.webp").metadata();
  const raw = { width: size, height: size, channels: 3 };
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
    const { data, info } = await sharp("public/art/sneak-poses.webp")
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
    const pixels = await sharp(bg, { raw })
      .composite([{ input: sprite, left: Math.round(80 * scale), top: offset }])
      .removeAlpha()
      .raw()
      .toBuffer();
    poses.push(pixels);
    await sharp(pixels, { raw })
      .png()
      .toFile(join(work, "keys", `${String(i).padStart(3, "0")}.png`));
  }
  // Padding lets optical flow reach the exact final crouch before it holds.
  for (let i = 7; i < 10; i++)
    await sharp(poses[6], { raw })
      .png()
      .toFile(join(work, "keys", `${String(i).padStart(3, "0")}.png`));
  execFileSync("ffmpeg", [
    "-loglevel",
    "error",
    "-y",
    "-framerate",
    "8",
    "-i",
    join(work, "keys", "%03d.png"),
    "-vf",
    `format=yuv444p,minterpolate=fps=${fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1`,
    join(work, "motion", "%03d.png"),
  ]);
  const motion = [];
  for (let i = 1; i <= 37; i++)
    motion.push(
      await sharp(join(work, "motion", `${String(i).padStart(3, "0")}.png`))
        .removeAlpha()
        .raw()
        .toBuffer(),
    );
  // The fade operates on the clean crouch plate, keeping the entire forest still.
  // Smooth coverage, including the sword and boot shadows; no threshold noise,
  // animated grain, fragments, flashing outline, or limited-palette GIF encoding.
  const keyframes = new Set([
    0, 96, 144, 174, 204, 240, 288, 318, 348, 384, 431,
  ]);
  const proofDir = process.env.SNEAK_PROOF_DIR;
  if (proofDir) await mkdir(proofDir, { recursive: true });
  for (let frame = 0; frame < fps * duration; frame++) {
    const t = frame / fps;
    let pixels = poses[0],
      visibility = 1;
    if (t >= 1.5 && t < 2.25)
      pixels = motion[Math.min(36, Math.round(smooth((t - 1.5) / 0.75) * 36))];
    else if (t >= 2.25 && t < 4.25) {
      pixels = poses[6];
      visibility = 1 - smooth((t - 3) / 1.25);
    } else if (t >= 4.25 && t < 5.5) {
      pixels = bg;
      visibility = 0;
    } else if (t >= 5.5 && t < 6.75) {
      pixels = poses[6];
      visibility = smooth((t - 5.5) / 1.25);
    } else if (t >= 6.75 && t < 7.5)
      pixels =
        motion[Math.max(0, Math.round((1 - smooth((t - 6.75) / 0.75)) * 36))];
    if (visibility > 0 && visibility < 1) {
      const blended = Buffer.alloc(bg.length);
      for (let i = 0; i < bg.length; i++)
        blended[i] = Math.round(bg[i] + (pixels[i] - bg[i]) * visibility);
      pixels = blended;
    }
    const target = join(
      work,
      "frames",
      `${String(frame).padStart(3, "0")}.png`,
    );
    await sharp(pixels, { raw }).png().toFile(target);
    if (proofDir && keyframes.has(frame))
      await sharp(pixels, { raw })
        .png()
        .toFile(join(proofDir, `${String(frame).padStart(3, "0")}.png`));
  }
  const target = "public/art/sneak-cloak-v2.mp4";
  execFileSync("ffmpeg", [
    "-loglevel",
    "error",
    "-y",
    "-framerate",
    String(fps),
    "-i",
    join(work, "frames", "%03d.png"),
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "17",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    target,
  ]);
  const first = await readFile(join(work, "frames", "000.png"));
  const last = await readFile(join(work, "frames", "431.png"));
  const hiddenA = await readFile(join(work, "frames", "216.png"));
  const hiddenB = await readFile(join(work, "frames", "252.png"));
  const report = {
    frames: fps * duration,
    fps,
    duration,
    width: size,
    height: size,
    identicalLoopEndpoints: first.equals(last),
    invisibleHoldIdentical: hiddenA.equals(hiddenB),
    bytes: (await readFile(target)).length,
  };
  if (!report.identicalLoopEndpoints || !report.invisibleHoldIdentical)
    throw new Error("Animation continuity check failed");
  if (proofDir)
    await writeFile(
      join(proofDir, "render.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
  console.log(report);
} finally {
  await rm(work, { recursive: true, force: true });
}
