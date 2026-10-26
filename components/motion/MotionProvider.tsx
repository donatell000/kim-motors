"use client";

import { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/** Отключает анимации Framer Motion для пользователей с `prefers-reduced-motion`. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
