"use client";

import { type ReactNode } from "react";
import styles from "./WelcomeIntro.module.css";

interface WelcomeIntroProps {
  children: ReactNode;
}

export default function WelcomeIntro({ children }: WelcomeIntroProps) {
  return (
    <div className={styles.root}>
      <div className={styles.overlay} aria-hidden="true">
        <span className={styles.caption}>Корея · Китай → Кыргызстан</span>
        <div className={styles.brand}>
          <span className={styles.wordmark}>KIM<span>MOTORS</span></span>
          <div className={styles.lights}><span /><span /></div>
          <span className={styles.caption}>Ваш следующий автомобиль</span>
        </div>
        <span className={styles.caption}>Всё начинается с движения</span>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
