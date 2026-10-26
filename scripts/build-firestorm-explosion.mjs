import sharp from "sharp";

// Pack the original frames without resizing or modifying their pixels.
const { width, height } = await sharp(
  "public/art/minecraft-fire/explosion_0.png",
).metadata();
await sharp({
  create: { width: width * 16, height, channels: 4, background: "#00000000" },
})
  .composite(
    Array.from({ length: 16 }, (_, i) => ({
      input: `public/art/minecraft-fire/explosion_${i}.png`,
      left: i * width,
      top: 0,
    })),
  )
  .png()
  .toFile("public/art/minecraft-fire/explosion-sequence.png");
