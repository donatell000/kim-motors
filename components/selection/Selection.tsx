"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Selection.module.css";

const steps = [
  { title: "Проверим документы", description: "Проверим документы на соответствие требованиям." },
  { title: "Проведём осмотр автомобиля", description: "Организуем диагностику и необходимые проверки." },
  { title: "Приёмка автомобиля", description: "По приезду встретим автомобиль, проведём приёмку и организуем выгрузку." },
  { title: "Таможенная очистка", description: "Организуем таможенное оформление автомобиля." },
];

export default function Selection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="delivery" aria-labelledby="selection-title" className={styles.section}>
      <Image className={styles.background} src="/selection-cars.webp" alt="" fill sizes="100vw" />
      <motion.div
        className={styles.inner}
        initial={false}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        style={{ y: reducedMotion ? 0 : 20 }}
        transition={{ duration: reducedMotion ? 0 : 0.6 }}
      >
        <h2 id="selection-title" className={styles.title}>Вы уже выбрали <span>авто</span></h2>
        <div className={styles.details}>
          <div className={styles.next}>
            <h3>Что сделаем дальше:</h3>
            <ol className={styles.steps}>
              {steps.map(({ title, description }) => (
                <li key={title}>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
          <ul className={styles.statuses} aria-label="Результат работы">
            <li>Автомобиль<br />приобретён</li>
            <li>Автомобиль доставлен</li>
            <li>Все этапы доставки организованы</li>
          </ul>
        </div>
        <div className={styles.actions}>
          <a className={styles.primary} href="#contact"><span aria-hidden="true">＋</span>Рассчитать стоимость</a>
          <a className={styles.secondary} href="#contact"><span aria-hidden="true">↗</span>Получить подбор авто</a>
        </div>
      </motion.div>
    </section>
  );
}
