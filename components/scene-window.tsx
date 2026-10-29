"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";

export function useScenePan(target: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const pan = useTransform(scrollYProgress, [0, 1], [-28, 28]);
  const pixels = useTransform(pan, (value) => `${value}px`);
  return { "--scene-pan": reduced ? "0px" : pixels } as MotionStyle;
}

export function SceneWindow({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className: string;
  id?: string;
}) {
  const section = useRef<HTMLElement>(null);
  const style = useScenePan(section);
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
