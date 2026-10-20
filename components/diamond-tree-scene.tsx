"use client";

import { useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";

export function DiamondTreeScene() {
  const [paused, setPaused] = useState(false);

  return (
    <figure className="diamond-tree-scene" data-paused={paused}>
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
        {Array.from({ length: 10 }, (_, i) => (
          <span
            className="tree-diamond"
            key={`gem-${i}`}
            style={
              {
                left: `${24 + ((i * 19) % 54)}%`,
                top: `${44 + (i % 3) * 3}%`,
                "--delay": `${-i * 0.61}s`,
                "--duration": `${3.2 + (i % 3) * 0.5}s`,
                "--drift": `${(i % 2 ? 1 : -1) * (12 + i * 2)}px`,
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
      <button
        type="button"
        className="scene-motion"
        aria-label={
          paused
            ? "Play diamond tree animation"
            : "Pause diamond tree animation"
        }
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
        {paused ? "Play" : "Pause"}
      </button>
    </figure>
  );
}
