"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export function HeroWindow({ children }: { children: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section className="hero" ref={section}>
      <motion.img
        className="hero-art"
        src="/art/unreal-valley-v2-1920.webp"
        srcSet="/art/unreal-valley-v2-1920.webp 1920w, /art/unreal-valley-v2-3840.webp 3840w"
        sizes="max(100vw, 177.69svh)"
        width={3840}
        height={2161}
        alt="An imagined Minecraft valley of forested mountains, a riverside homestead and ancient stone arches"
        fetchPriority="high"
        style={{ y: reduced ? 0 : y }}
      />
      {children}
    </section>
  );
}
