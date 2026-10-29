"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";

export function useScenePan(
  target: RefObject<HTMLElement | null>,
  distance = 28,
) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const pan = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const pixels = useTransform(pan, (value) => `${value}px`);
  return { "--scene-pan": reduced ? "0px" : pixels } as MotionStyle;
}

export function SceneWindow({
  children,
  className,
  id,
  panDistance = 28,
}: {
  children: ReactNode;
  className: string;
  id?: string;
  panDistance?: number;
}) {
  const section = useRef<HTMLElement>(null);
  const style = useScenePan(section, panDistance);
  return (
    <motion.section
      ref={section}
      id={id}
      className={`${className} scene-window`}
      style={style}
    >
      {children}
    </motion.section>
  );
}
