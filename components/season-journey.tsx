"use client";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export function SeasonJourney({ children }: { children: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const foreground = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    [0, 0, 0.8, 1],
  );
  const approach = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 0.65, 1]);
  return (
    <section
      ref={section}
      id="reward-road"
      className="road-lineup road-journey"
      aria-label="Season rewards, tiers 1 to 40"
    >
      <div className="journey-scenery" aria-hidden="true">
        <div className="journey-window">
          <motion.img
            className="journey-landscape"
            src="/season/harvest-approach.webp"
            alt=""
            width={1672}
            height={941}
            style={{ y: reduced ? "-12%" : y, scale: reduced ? 1 : scale }}
          />
          <motion.div
            className="journey-relics"
            style={{
              opacity: reduced ? 1 : foreground,
              scale: reduced ? 1 : approach,
            }}
          >
            <img
              className="journey-armor"
              src="/season/rewards/regent-hero.webp"
              alt=""
              width={1000}
              height={1000}
              loading="lazy"
            />
            <img
              className="journey-raven"
              src="/wiki/cosmetics/nevermore_ghost.webp"
              alt=""
              width={360}
              height={360}
              loading="lazy"
            />
            <img
              className="journey-helmet"
              src="/wiki/cosmetics/dread_lantern.webp"
              alt=""
              width={360}
              height={360}
              loading="lazy"
            />
          </motion.div>
          <div className="journey-shade" />
        </div>
      </div>
      {children}
    </section>
  );
}
