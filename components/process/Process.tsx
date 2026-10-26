"use client";

import { motion } from "framer-motion";
import FadeImage from "@/components/fade-image/FadeImage";
import { EASE, Reveal, RevealTitle, VIEWPORT } from "@/components/reveal/Reveal";
import styles from "./Process.module.css";

const steps = [
  { title: "Консультация", description: "Обсуждаем ваш бюджет, пожелания и подбираем оптимальные варианты", image: "consultation" },
  { title: "Подбор автомобилей", description: "Отправляем актуальные предложения", image: "options" },
  { title: "Заключаем договор", description: "и оформляем автомобиль на экспорт.", image: "contract" },
  { title: "Доставка и таможня", description: "Организуем логистику и таможенное оформление.", image: "customs" },
];

// Три фото во второй карточке: сначала лежат стопкой в центре, затем
// веером разъезжаются на свои места. x/y — сдвиг к центру стопки.
const fan = [
  { car: "bmw", rotate: -20, x: "-22%", y: "40%" },
  { car: "mercedes", rotate: 8, x: "28%", y: "20%" },
  { car: "lexus", rotate: -8, x: "-8%", y: "-30%" },
];

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className={styles.section}>
      <div className={styles.inner}>
        <RevealTitle id="process-title" className={styles.title} lines={["От покупки до получения", "— всё под контролем"]} />
        <ol className={styles.steps}>
          {steps.map(({ title, description, image }, index) => (
            <Reveal as="li" key={image} className={styles.card} delay={index * 0.08}>
              <div className={styles.copy}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <div className={`${styles.artwork} ${styles[image]}`} aria-hidden="true">
                {image === "options" ? (
                  <motion.div className={styles.fan} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
                    {fan.map(({ car, rotate, x, y }, carIndex) => (
                      <motion.div
                        key={car}
                        className={`${styles.photo} ${styles[car]}`}
                        data-reveal
                        variants={{
                          hidden: { rotate: 0, x, y },
                          visible: { rotate, x: 0, y: 0, transition: { duration: 1.1, ease: EASE, delay: 0.35 + carIndex * 0.06 } },
                        }}
                      >
                        <FadeImage src={`/process-${car}.webp`} alt="" width={500} height={245} sizes="(max-width: 540px) 55vw, 20vw" />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <FadeImage src={`/process-${image}.webp`} alt="" fill sizes="(max-width: 540px) 90vw, (max-width: 1100px) 45vw, 25vw" />
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
