"use client";

import { motion, type Variants } from "framer-motion";
import { useContext, type ReactNode } from "react";
import { IntroContext } from "@/components/welcome/IntroContext";
import styles from "./Reveal.module.css";

// Элементы с `data-reveal` без JS показываются сразу (см. globals.css).
// Общие настройки для всех анимаций сайта — меняйте здесь, а не в блоках.
export const EASE = [0.22, 1, 0.36, 1] as const; // быстрый старт, длинное мягкое торможение
export const VIEWPORT = { once: true, margin: "0px 0px -20% 0px" } as const; // срабатывает, когда блок поднялся на 20% от низа экрана
export const ACCENT = "#ff0009";

/**
 * Когда запускать анимацию: при появлении на экране (по умолчанию)
 * или сразу после заставки (`afterIntro`, для первого экрана).
 */
function useTrigger(afterIntro: boolean) {
  const introDone = useContext(IntroContext);
  return afterIntro
    ? { initial: "hidden", animate: introDone ? "visible" : "hidden" }
    : { initial: "hidden", whileInView: "visible", viewport: VIEWPORT };
}

/* ---------- Заголовок: строки выезжают из-под маски ---------- */

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

interface RevealTitleProps {
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  /** Каждый элемент — отдельная строка заголовка. */
  lines: ReactNode[];
  delay?: number;
  afterIntro?: boolean;
}

export function RevealTitle({ as = "h2", id, className, lines, delay = 0, afterIntro = false }: RevealTitleProps) {
  const Tag = motion[as];
  return (
    <Tag
      id={id}
      className={className}
      {...useTrigger(afterIntro)}
      variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
    >
      {lines.map((line, index) => (
        <span key={index} className={styles.mask}>
          <motion.span className={styles.line} variants={lineVariants} data-reveal>{line}</motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Акцентное слово внутри RevealTitle: после выезда строки плавно
 * перекрашивается из цвета заголовка (`from`) в красный.
 */
export function Accent({ children, from = "#ffffff" }: { children: ReactNode; from?: string }) {
  return (
    <motion.span
      variants={{
        hidden: { color: from },
        visible: { color: ACCENT, transition: { delay: 0.55, duration: 0.7, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.span>
  );
}

/* ---------- Текст, плашки, списки: мягкое проявление с подъёмом ---------- */

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } }),
};

interface RevealProps {
  as?: "div" | "p" | "h3" | "figure" | "ul" | "ol" | "li";
  className?: string;
  children: ReactNode;
  delay?: number;
  afterIntro?: boolean;
}

export function Reveal({ as = "div", className, children, delay = 0, afterIntro = false }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag className={className} {...useTrigger(afterIntro)} variants={fadeVariants} custom={delay} data-reveal>
      {children}
    </Tag>
  );
}
