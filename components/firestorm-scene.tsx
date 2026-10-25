"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

export function FirestormScene() {
  const section = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={section}
      className="firestorm-showcase"
      aria-labelledby="firestorm-heading"
      data-paused={paused || !visible}
    >
      <div className="firestorm-stage" key={replay}>
        <img
          className="firestorm-landscape"
          src="/art/firestorm-valley-v1.webp"
          width={2172}
          height={724}
          loading="lazy"
          alt="An illustrated Minecraft valley at dusk, with two zombies approaching across a clearing beneath a mountain village."
        />
        <div className="firestorm-effects" aria-hidden="true">
          <div className="firestorm-target" />
          <div className="firestorm-ground-glow" />
          <div className="firestorm-caster">
            <img
              src="/art/firestorm-caster-v1.webp"
              width={600}
              height={900}
              loading="lazy"
              alt=""
            />
            <span className="firestorm-staff-light" />
          </div>
          {Array.from({ length: 28 }, (_, i) => (
            <span
              className="firestorm-meteor"
              key={i}
              style={
                {
                  left: `${73 + ((i * 7) % 20)}%`,
                  "--fall-delay": `${(i % 8) * 0.16}s`,
                  "--fall-x": `${(i % 3) * 6 - 6}px`,
                } as CSSProperties
              }
            >
              <i />
            </span>
          ))}
          {Array.from({ length: 16 }, (_, i) => (
            <span
              className="firestorm-ember"
              key={i}
              style={
                {
                  left: `${73 + ((i * 11) % 21)}%`,
                  "--ember-delay": `${(i % 4) * 0.23}s`,
                  "--ember-x": `${(i % 5) * 14 - 28}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
      <div className="firestorm-shade" aria-hidden="true" />
      <div className="wrap firestorm-content">
        <div className="firestorm-copy">
          <span className="firestorm-eyebrow">MAGIC · FIRE STAFF</span>
          <h2 id="firestorm-heading">
            Turn the tide.
            <br />
            <em>Call down fire.</em>
          </h2>
          <p>
            A staff in your hand. A storm at your command. Mark your ground and
            unleash Firestorm—a rain of fire over the enemies in your path.
          </p>
          <p>
            From a single Ember Bolt to a sweeping Inferno Nova, discover a
            different way to fight.
          </p>
          <div className="firestorm-controls">
            <button
              type="button"
              aria-label={
                paused
                  ? "Play Firestorm animation"
                  : "Pause Firestorm animation"
              }
              onClick={() => setPaused(!paused)}
            >
              {paused ? <Play size={15} /> : <Pause size={15} />}
              {paused ? "Play" : "Pause"}
            </button>
            <button
              type="button"
              aria-label="Replay Firestorm animation"
              onClick={() => {
                setReplay((value) => value + 1);
                setPaused(false);
              }}
            >
              <RotateCcw size={15} /> Replay spell
            </button>
          </div>
        </div>
      </div>
      <span className="firestorm-caption">
        FIRESTORM <span>·</span> SPELL ILLUSTRATION
      </span>
    </section>
  );
}
