"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export function SneakScene() {
  const scene = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [inView, setInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReduced(preference.matches);
    const visibility = () => setPageVisible(!document.hidden);
    motion();
    visibility();
    preference.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasEntered(true);
      },
      { threshold: 0.05 },
    );
    if (scene.current) observer.observe(scene.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    let disposed = false;
    if (paused || reduced || !inView || !pageVisible) player.pause();
    else {
      player.play().catch((error: DOMException) => {
        // Autoplay restrictions leave a usable Play button and the still poster.
        if (!disposed && error.name !== "AbortError") setPaused(true);
      });
    }
    return () => {
      disposed = true;
    };
  }, [paused, reduced, inView, pageVisible, hasEntered, failed]);

  return (
    <figure
      ref={scene}
      className="stealth-scene"
      aria-label="A sword-bearing Minecraft adventurer crouches on a wooded path, fades smoothly into invisibility, then reappears and stands."
    >
      <img
        src="/art/sneak-visible.webp"
        alt=""
        aria-hidden="true"
        width="640"
        height="640"
        loading="lazy"
      />
      {hasEntered && !reduced && !failed && (
        <video
          ref={video}
          className={`stealth-scene-video${ready ? " is-ready" : ""}`}
          src="/art/sneak-cloak-v2.mp4"
          poster="/art/sneak-visible.webp"
          width="640"
          height="640"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onLoadedData={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
      {!reduced && !failed && (
        <button
          type="button"
          className="scene-motion"
          aria-label={paused ? "Play sneak animation" : "Pause sneak animation"}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
          {paused ? "Play" : "Pause"}
        </button>
      )}
    </figure>
  );
}
