"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { FirestormCaster } from "@/components/firestorm-caster";

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
          src="/art/firestorm-valley-clean-v2.webp"
          width={2172}
          height={724}
          loading="lazy"
          alt="An illustrated Firestorm cast: an adventurer raises a Fire Staff and rains fireballs onto two zombies, which ignite and recoil in a Minecraft valley at dusk."
        />
        <div className="firestorm-effects" aria-hidden="true">
          <div className="firestorm-target" />
          <div className="firestorm-ground-glow" />
          <FirestormCaster paused={paused || !visible} />
          {[0, 1].map((enemy) => (
            <div
              className="firestorm-enemy"
              key={`enemy-${enemy}`}
              style={
                {
                  left: `${74 + enemy * 9.5}%`,
                  bottom: `${28 + enemy * 2}%`,
                  "--enemy-delay": `${enemy * 0.24}s`,
                } as CSSProperties
              }
            >
              <div className="firestorm-enemy-motion">
                <div className="firestorm-enemy-body">
                  {["upper", "left-leg", "right-leg"].map((part) => (
                    <img
                      className={`firestorm-enemy-${part}`}
                      key={part}
                      src="/art/firestorm-enemy-v1.webp"
                      width={400}
                      height={600}
                      alt=""
                      loading="lazy"
                    />
                  ))}
                </div>
                <span className="firestorm-hit" />
                <div className="firestorm-burning">
                  {Array.from({ length: 3 }, (_, flame) => (
                    <span
                      className="firestorm-flame"
                      key={flame}
                      style={
                        {
                          left: `${8 + (flame % 2) * 9}%`,
                          "--flame-bottom": `${6 + flame * 19}%`,
                          "--texture-delay": `${-0.8 - flame * 0.25}s`,
                        } as CSSProperties
                      }
                    />
                  ))}
                  <span className="firestorm-smoke" />
                </div>
              </div>
            </div>
          ))}
          {[0, 1].map((target) => (
            <div
              className="firestorm-strike"
              key={target}
              style={
                {
                  left: `${77.4 + target * 9.5}%`,
                  "--fall-delay": `${target * 0.24}s`,
                  "--ground-y": `${72 - target * 2}%`,
                } as CSSProperties
              }
            >
              <span className="firestorm-meteor">
                <span className="firestorm-projectile-fire" />
                <img
                  className="firestorm-projectile-core"
                  src="/art/minecraft-fire/fire_charge.png"
                  width={16}
                  height={16}
                  alt=""
                />
                <span className="firestorm-projectile-smoke" />
              </span>
              <span className="firestorm-explosion" />
            </div>
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
