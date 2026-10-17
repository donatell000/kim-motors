"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Process.module.css";

const steps = [
  { title: "Консультация", description: "Обсуждаем ваш бюджет, пожелания и подбираем оптимальные варианты", image: "consultation" },
  { title: "Подбор автомобилей", description: "Отправляем актуальные предложения", image: "options" },
  { title: "Заключаем договор", description: "и оформляем автомобиль на экспорт.", image: "contract" },
  { title: "Доставка и таможня", description: "Организуем логистику и таможенное оформление.", image: "customs" },
];

export default function Process() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="process" aria-labelledby="process-title" className={styles.section}>
      <div className={styles.inner}>
        <h2 id="process-title" className={styles.title}>От покупки до получения<br />— всё под контролем</h2>
        <ol className={styles.steps}>
          {steps.map(({ title, description, image }, index) => (
            <motion.li
              key={image}
              className={styles.card}
              initial={false}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              style={{ y: reducedMotion ? 0 : 16 }}
              transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.08 }}
            >
              <div className={styles.copy}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <div className={`${styles.artwork} ${styles[image]}`} aria-hidden="true">
                {image === "options" ? ["bmw", "mercedes", "lexus"].map((car) => (
                  <Image key={car} className={styles[car]} src={`/process-${car}.webp`} alt="" width={500} height={245} sizes="(max-width: 540px) 55vw, 20vw" />
                )) : (
                  <Image src={`/process-${image}.webp`} alt="" fill sizes="(max-width: 540px) 90vw, (max-width: 1100px) 45vw, 25vw" />
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
