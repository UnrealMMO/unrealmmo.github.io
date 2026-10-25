import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
const out = "public/brand/hearthmark";
await mkdir(out, { recursive: true });
const master = "docs/art/hearthmark-master.png";
const blank = (w, h, bg = "#00000000") =>
  sharp({ create: { width: w, height: h, channels: 4, background: bg } });
const icon = await sharp(
  await sharp(master)
    .extract({ left: 250, top: 180, width: 750, height: 680 })
    .png()
    .toBuffer(),
)
  .trim()
  .png()
  .toBuffer();
// Use the separately spaced wordmark; the approved emblem remains unchanged.
const wordmark = await sharp("docs/art/hearthmark-wordmark-spaced.png")
  .trim()
  .png()
  .toBuffer();
await sharp(icon).toFile(`${out}/icon-transparent.png`);
await sharp(wordmark).toFile(`${out}/wordmark-transparent.png`);
const fit = async (input, w, h) =>
  sharp(input).resize({ width: w, height: h, fit: "inside" }).png().toBuffer();
async function centered(input, w, h, y) {
  const b = await fit(input, w, h);
  const m = await sharp(b).metadata();
  return { input: b, left: Math.round((1200 - m.width) / 2), top: y };
}
const stacked = await blank(1200, 1080)
  .composite([
    await centered(icon, 720, 690, 25),
    await centered(wordmark, 1130, 230, 790),
  ])
  .png()
  .toBuffer();
await sharp(stacked)
  .trim()
  .extend({ top: 30, bottom: 30, left: 30, right: 30, background: "#00000000" })
  .toFile(`${out}/logo-stacked-transparent.png`);
const iconH = await fit(icon, 240, 240),
  wordH = await fit(wordmark, 900, 190);
const im = await sharp(iconH).metadata(),
  wm = await sharp(wordH).metadata();
await blank(1200, 280)
  .composite([
    { input: iconH, left: 15, top: Math.round((280 - im.height) / 2) },
    { input: wordH, left: 285, top: Math.round((280 - wm.height) / 2) },
  ])
  .toFile(`${out}/logo-horizontal-transparent.png`);
for (const size of [16, 32, 48, 64, 128, 180, 192, 256, 512, 1024]) {
  const pad = Math.max(1, Math.round(size * 0.09));
  const b = await fit(icon, size - pad * 2, size - pad * 2);
  const m = await sharp(b).metadata();
  await blank(size, size)
    .composite([
      {
        input: b,
        left: Math.round((size - m.width) / 2),
        top: Math.round((size - m.height) / 2),
      },
    ])
    .toFile(`${out}/icon-${size}.png`);
}
for (const size of [512, 1024]) {
  const b = await fit(icon, Math.round(size * 0.7), Math.round(size * 0.7));
  const m = await sharp(b).metadata();
  await blank(size, size, "#073326")
    .composite([
      {
        input: b,
        left: Math.round((size - m.width) / 2),
        top: Math.round((size - m.height) / 2),
      },
    ])
    .toFile(`${out}/avatar-${size}.png`);
}
const svg = (w, h, body) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${body}</svg>`,
  );
for (const [w, h] of [
  [468, 60],
  [728, 90],
  [1200, 300],
  [1500, 500],
  [1920, 1080],
  [1200, 630],
]) {
  const small = h < 100,
    wide = w / h > 3;
  const bg = await sharp("public/art/unreal-valley-v2-1920.webp")
    .resize(w, h, { fit: "cover" })
    .png()
    .toBuffer();
  const overlays = [
    {
      input: svg(
        w,
        h,
        `<rect width="100%" height="100%" fill="#031e16" opacity=".72"/><rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="#b68c39" stroke-width="2"/>`,
      ),
      left: 0,
      top: 0,
    },
  ];
  const logo = await fit(
    wide
      ? `${out}/logo-horizontal-transparent.png`
      : `${out}/logo-stacked-transparent.png`,
    Math.round(w * (small ? 0.56 : 0.65)),
    Math.round(h * (small ? 0.85 : 0.72)),
  );
  const m = await sharp(logo).metadata();
  overlays.push({
    input: logo,
    left: small ? 10 : Math.round((w - m.width) / 2),
    top: small ? Math.round((h - m.height) / 2) : Math.round(h * 0.06),
  });
  const font = small
    ? Math.round(h * 0.19)
    : Math.max(22, Math.round(h * 0.055));
  overlays.push({
    input: svg(
      w,
      h,
      `<text x="${small ? w * 0.79 : w * 0.5}" y="${small ? h * 0.57 : h * 0.89}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${font}" font-weight="bold" fill="#f5e4b1">mc.unrealmmo.com</text>`,
    ),
    left: 0,
    top: 0,
  });
  await sharp(bg)
    .composite(overlays)
    .png()
    .toFile(`${out}/banner-${w}x${h}.png`);
}
// ICO stores standard PNG frames, preserving the same approved icon at each size.
const sizes = [16, 32, 48];
const frames = await Promise.all(
  sizes.map((n) => sharp(`${out}/icon-${n}.png`).png().toBuffer()),
);
const header = Buffer.alloc(6 + 16 * frames.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, i) => {
  let p = 6 + i * 16;
  header[p] = sizes[i];
  header[p + 1] = sizes[i];
  header.writeUInt16LE(1, p + 4);
  header.writeUInt16LE(32, p + 6);
  header.writeUInt32LE(frame.length, p + 8);
  header.writeUInt32LE(offset, p + 12);
  offset += frame.length;
});
await writeFile(`${out}/favicon.ico`, Buffer.concat([header, ...frames]));
await sharp(`${out}/logo-stacked-transparent.png`)
  .webp({ quality: 90 })
  .toFile(`${out}/logo-stacked.webp`);
await sharp(`${out}/logo-horizontal-transparent.png`)
  .webp({ quality: 90 })
  .toFile(`${out}/logo-horizontal.webp`);
await writeFile(
  `${out}/README.txt`,
  `UnrealMMO — Hearthmark / The Bastion\n\nApproved option-one logo, with the display wordmark Unreal MMO. Original raster artwork, not vector.\nTransparent PNG: stacked logo, horizontal logo, wordmark, and icon.\nIcons: 16, 32, 48, 64, 128, 180, 192, 256, 512, 1024 pixels.\nUse icon-64.png as Minecraft server-icon.png.\nAvatars: 512 and 1024 pixels with emerald background and circular-crop safe margins.\nBanners: 468x60, 728x90, 1200x300, 1500x500, 1920x1080, 1200x630.\n1200x630 is also the website link-preview artwork. Dimensions are general-purpose exports; each listing service may have its own upload constraints.\nThe largest raster exports are resampled from the approved generated master; they are not vector originals.\nKeep aspect ratios intact. Gold artwork reads best on dark backgrounds. Leave clear space around the mark.\nProduction source and prompt: docs/art/hearthmark-master.png, hearthmark-wordmark-spaced.png and hearthmark-logo.json in the website repository.\n`,
);
execFileSync("zip", ["-qr", "../unrealmmo-brand-kit.zip", "."], { cwd: out });
console.log("Built Hearthmark logo kit.");
