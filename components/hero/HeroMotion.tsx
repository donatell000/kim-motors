"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { useContext, useEffect, useRef, type ReactNode } from "react";
import { EASE } from "@/components/reveal/Reveal";
import { IntroContext } from "@/components/welcome/IntroContext";
import styles from "./Hero.module.css";

/** Фото первого экрана медленно «отъезжает» (1.06 → 1) после заставки. */
export function HeroBackdrop({ children }: { children: ReactNode }) {
  const introDone = useContext(IntroContext);
  return (
    <div className={styles.backdrop}>
      <motion.div
        className={styles.zoom}
        initial={{ scale: 1.06 }}
        animate={{ scale: introDone ? 1 : 1.06 }}
        transition={{ duration: 2.6, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Число набегает от 0 после заставки. В HTML сразу лежит итоговое
 * значение — его видят поисковики и пользователи без JS.
 */
export function CountUp({ to, suffix = "", delay = 0.5 }: { to: number; suffix?: string; delay?: number }) {
  const introDone = useContext(IntroContext);
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;
    if (!introDone) {
      element.textContent = `0${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.8,
      delay,
      ease: EASE,
      onUpdate: (value) => { element.textContent = `${Math.round(value)}${suffix}`; },
    });
    return () => controls.stop();
  }, [introDone, reducedMotion, to, suffix, delay]);

  return <span ref={ref} className={styles.count}>{`${to}${suffix}`}</span>;
}
