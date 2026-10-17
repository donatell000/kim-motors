"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SnapSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * Одна секция внутри `ScrollSnapContainer`. Занимает весь экран и
 * плавно появляется при входе в зону видимости. Анимация отключается
 * автоматически, если пользователь предпочитает уменьшенное движение
 * (см. `prefers-reduced-motion` в globals.css и `useReducedMotion`).
 */
export default function SnapSection({ id, children, className = "" }: SnapSectionProps) {
  return (
    <motion.section
      id={id}
      className={`snap-section ${className}`.trim()}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.6, once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
