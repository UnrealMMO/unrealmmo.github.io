"use client";
import { useRef, useEffect, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";

import { scenePan } from "./scene-pan";

export function SeasonJourney({ children }: { children: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const windowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const travel = useMotionValue(0);
  useEffect(() => {
    const measure = () =>
      travel.set(
        Math.max(
          0,
          imageRef.current!.clientHeight - windowRef.current!.clientHeight,
        ),
      );
    const observer = new ResizeObserver(measure);
    observer.observe(windowRef.current!);
    observer.observe(imageRef.current!);
    measure();
    return () => observer.disconnect();
  }, [travel]);
  const y = useTransform(() => scenePan(scrollYProgress.get(), travel.get()));
  return (
    <section
      ref={section}
      id="reward-road"
      className="road-lineup road-journey"
      aria-label="Season rewards, tiers 1 to 40"
    >
      <div className="journey-scenery" aria-hidden="true">
        <div className="journey-window" ref={windowRef}>
          <motion.img
            className="journey-landscape"
            ref={imageRef}
            src="/season/woodland-tall.webp"
            alt=""
            width={768}
            height={2048}
            style={{ y: reduced ? 0 : y }}
          />
          <div className="journey-shade" />
        </div>
      </div>
      {children}
    </section>
  );
}
