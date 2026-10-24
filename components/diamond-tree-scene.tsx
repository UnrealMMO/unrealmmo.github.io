import type { CSSProperties } from "react";

export function DiamondTreeScene() {
  return (
    <figure className="diamond-tree-scene">
      <div className="diamond-tree-picture">
        <img
          src="/art/diamond-tree-cutout.webp"
          width="1000"
          height="1000"
          loading="lazy"
          alt="An in-game Diamond Tree with a crown of diamond blocks and a gold-block trunk on a small patch of grass."
        />
      </div>
      <div className="diamond-tree-magic" aria-hidden="true">
        {Array.from({ length: 16 }, (_, i) => (
          <span
            className="tree-sparkle"
            key={`spark-${i}`}
            style={
              {
                left: `${16 + ((i * 17) % 69)}%`,
                top: `${14 + ((i * 13) % 44)}%`,
                "--delay": `${-i * 0.43}s`,
                "--duration": `${2.4 + (i % 4) * 0.4}s`,
              } as CSSProperties
            }
          />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <span
            className="tree-diamond"
            key={`gem-${i}`}
            style={
              {
                left: `${32 + i * 9}%`,
                "--start": `${47 + (i % 3) * 1.5}%`,
                "--ground": `${i === 2 ? 98 : 91 + (i % 2) * 1.5}%`,
                "--delay": `${-i * 0.83}s`,
                "--duration": `${3.8 + (i % 3) * 0.35}s`,
                "--drift": `${i % 2 ? 5 : -5}px`,
              } as CSSProperties
            }
          >
            <img
              src="/art/minecraft-diamond.webp"
              width="360"
              height="360"
              alt=""
            />
          </span>
        ))}
      </div>
    </figure>
  );
}
