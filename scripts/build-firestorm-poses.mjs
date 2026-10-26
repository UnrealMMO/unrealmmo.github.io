import sharp from "sharp";
import fs from "node:fs/promises";
const source = "docs/art/firestorm-caster-poses-source.png";
const { width, height } = await sharp(source).metadata();
const cellWidth = width / 4,
  cellHeight = height / 2;
const selected = [0, 1, 2, 4, 5, 6];
const frames = [];
const anchors = [];
for (const [index, cell] of selected.entries()) {
  const tile = await sharp(source)
    .extract({
      left: (cell % 4) * cellWidth,
      top: Math.floor(cell / 4) * cellHeight,
      width: cellWidth,
      height: cellHeight,
    })
    .ensureAlpha()
    .raw()
    .toBuffer();
  let left = cellWidth,
    right = 0,
    bottom = 0;
  for (let y = Math.floor(cellHeight * 0.82); y < cellHeight; y++)
    for (let x = 0; x < cellWidth; x++) {
      if (tile[(y * cellWidth + x) * 4 + 3] < 220) continue;
      left = Math.min(left, x);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
  const dx = Math.round(cellWidth * 0.43 - (left + right) / 2),
    dy = Math.round(cellHeight * 0.955 - bottom);
  const cropLeft = Math.max(0, -dx),
    cropTop = Math.max(0, -dy);
  const cropWidth = Math.min(cellWidth - cropLeft, cellWidth - Math.max(0, dx));
  const cropHeight = Math.min(
    cellHeight - cropTop,
    cellHeight - Math.max(0, dy),
  );
  const shifted = await sharp({
    create: {
      width: cellWidth,
      height: cellHeight,
      channels: 4,
      background: "#00000000",
    },
  })
    .composite([
      {
        input: await sharp(tile, {
          raw: { width: cellWidth, height: cellHeight, channels: 4 },
        })
          .extract({
            left: cropLeft,
            top: cropTop,
            width: cropWidth,
            height: cropHeight,
          })
          .png()
          .toBuffer(),
        left: Math.max(0, dx),
        top: Math.max(0, dy),
      },
    ])
    .png()
    .toBuffer();
  frames.push({
    input: await sharp(shifted).resize(400, 600).png().toBuffer(),
    left: index * 400,
    top: 0,
  });
  anchors.push({ sourceCell: cell, dx, dy, footBaseline: bottom });
}
await sharp({
  create: { width: 2400, height: 600, channels: 4, background: "#00000000" },
})
  .composite(frames)
  .webp({ quality: 92 })
  .toFile("public/art/firestorm-caster-sequence-v3.webp");
await fs.writeFile(
  "docs/art/firestorm-pose-alignment.json",
  JSON.stringify(
    { source, sourceSize: [width, height], frameSize: [400, 600], anchors },
    null,
    2,
  ) + "\n",
);
console.log(anchors);
