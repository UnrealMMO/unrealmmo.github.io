"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

export function SneakScene() {
  const [paused, setPaused] = useState(false);

  return (
    <figure className="stealth-scene">
      <picture>
        <source
          media="(prefers-reduced-motion: reduce)"
          srcSet="/art/sneak-visible.webp"
        />
        <img
          src={paused ? "/art/sneak-visible.webp" : "/art/sneak-vanish.gif"}
          alt="A Minecraft adventurer crouches with an iron sword on a wooded path, then fades into invisibility."
          width="640"
          height="640"
          loading="lazy"
        />
      </picture>
      <button
        type="button"
        className="scene-motion"
        aria-label={paused ? "Play sneak animation" : "Pause sneak animation"}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
        {paused ? "Play" : "Pause"}
      </button>
    </figure>
  );
}
