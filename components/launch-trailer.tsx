"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export function LaunchTrailer() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="intro-video">
      <div className="launch-trailer">
        {playing ? (
          <iframe
            src="https://www.youtube-nocookie.com/embed/HCokldGg9WY?autoplay=1&rel=0"
            title="UnrealMMO official launch trailer"
            width={1280}
            height={720}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            className="launch-trailer-play"
            aria-label="Play UnrealMMO launch trailer"
            onClick={() => setPlaying(true)}
          >
            <img
              src="/art/unrealmmo-launch-trailer.jpg"
              alt=""
              width={1280}
              height={720}
              loading="lazy"
            />
            <span className="launch-trailer-caption">
              <span className="launch-trailer-play-icon" aria-hidden="true">
                <Play size={24} fill="currentColor" />
              </span>
              <span>Watch the launch trailer</span>
            </span>
          </button>
        )}
      </div>
      <a
        className="launch-trailer-link"
        href="https://youtu.be/HCokldGg9WY"
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch on YouTube ↗
      </a>
    </div>
  );
}
