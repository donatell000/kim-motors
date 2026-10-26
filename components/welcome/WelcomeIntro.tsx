"use client";

import { useEffect, useState, type ReactNode } from "react";
import { IntroContext } from "./IntroContext";
import styles from "./WelcomeIntro.module.css";

// Заставка держится, пока не загрузится фото первого экрана,
// но не меньше MIN_MS (чтобы успела отыграть и не мигала)
// и не дольше MAX_MS (чтобы не держать на медленном интернете).
const MIN_MS = 1000;
const MAX_MS = 2000;

interface WelcomeIntroProps {
  children: ReactNode;
}

export default function WelcomeIntro({ children }: WelcomeIntroProps) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // При «уменьшении движения» заставка скрыта стилями — не заставляем ждать.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => setDone(true), 0);
      return () => clearTimeout(timer);
    }

    const start = performance.now();
    const timers: number[] = [window.setTimeout(() => setDone(true), MAX_MS)];
    const finish = () => {
      timers.push(window.setTimeout(() => setDone(true), Math.max(0, MIN_MS - (performance.now() - start))));
    };

    const image = document.querySelector<HTMLImageElement>("#hero img");
    if (!image || image.complete) {
      finish();
    } else {
      image.addEventListener("load", finish, { once: true });
      image.addEventListener("error", finish, { once: true });
    }

    return () => {
      timers.forEach(clearTimeout);
      image?.removeEventListener("load", finish);
      image?.removeEventListener("error", finish);
    };
  }, []);

  return (
    <div className={styles.root}>
      <div className={`${styles.overlay} ${done ? styles.done : ""}`} aria-hidden="true" data-intro>
        <span className={styles.caption}>Корея · Китай → Кыргызстан</span>
        <div className={styles.brand}>
          <span className={styles.wordmark}>KIM<span>MOTORS</span></span>
          <div className={styles.lights}><span /><span /></div>
          <span className={styles.caption}>Ваш следующий автомобиль</span>
        </div>
        <span className={styles.caption}>Всё начинается с движения</span>
      </div>
      <IntroContext.Provider value={done}>{children}</IntroContext.Provider>
    </div>
  );
}
