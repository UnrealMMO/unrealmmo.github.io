// Illustrative minimum Inn. Coordinates are block cells inside a 20 × 20 footprint.
export const innExample = {
  limit: 20,
  floor: { min: 3, max: 16 },
  doorway: [9, 10],
  beds: [
    { x: 5, z: 5 },
    { x: 7, z: 5 },
  ],
  storage: [
    { x: 5, z: 7, kind: "chest" },
    { x: 7, z: 7, kind: "chest" },
    { x: 14, z: 10, kind: "barrel" },
  ],
  furnace: { x: 15, z: 10 },
  sign: { x: 10, z: 17 },
} as const;
