"use client";

import { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

interface ScrollSnapContainerProps {
  children: ReactNode;
}

/**
 * Полноэкранный контейнер с эффектом scroll snap: пользователь
 * останавливается на границе каждой секции. Сам эффект реализован на
 * нативном CSS (`scroll-snap-type`), без сторонних библиотек.
 * `MotionConfig` отключает анимации секций для пользователей с
 * `prefers-reduced-motion`.
 */
export default function ScrollSnapContainer({ children }: ScrollSnapContainerProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="snap-container">{children}</div>
    </MotionConfig>
  );
}
