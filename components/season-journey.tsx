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
  // Repeat the long vertical reveal so motion stays visible throughout all 40 tiers.
  const y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["0%", "-33%", "0%", "-33%", "0%"],
  );
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
            src="/season/woodland.webp"
            alt=""
            width={1536}
            height={1024}
            style={{ y: reduced ? "-16%" : y }}
          />
          <div className="journey-shade" />
        </div>
      </div>
      {children}
    </section>
  );
}
