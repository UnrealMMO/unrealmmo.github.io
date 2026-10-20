"use client";

import { useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";

export function DiamondTreeScene() {
  const [paused, setPaused] = useState(false);

  return (
    <figure className="diamond-tree-scene" data-paused={paused}>
      <div className="diamond-tree-picture">
        <img
          src="/art/diamond-tree-ingame.webp"
          width="1500"
          height="941"
          loading="lazy"
          alt="An in-game Diamond Tree with a crown of diamond blocks and a gold-block trunk in a grassy Minecraft landscape."
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
                top: `${36 + (i % 3) * 6}%`,
                "--delay": `${-i * 0.61}s`,
                "--duration": `${3.2 + (i % 3) * 0.5}s`,
                "--drift": `${(i % 2 ? 1 : -1) * (12 + i * 2)}px`,
              } as CSSProperties
            }
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M8 2h8v3h4v4h2v7h-3v4h-5v2H7v-3H3v-4H1v-5h3V6h4Z"
                fill="#124a50"
              />
              <path d="M8 5h8v3h3v7h-3v4H8v-3H4v-6h4Z" fill="#36c7c9" />
              <path d="M8 5h8v3H9v5H4v-3h4Z" fill="#c1fff1" />
              <path d="M9 13h10v2h-3v4H8v-3H5v-3Z" fill="#18999e" />
              <path d="M9 9h7v5H9Z" fill="#78e9e1" />
            </svg>
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
