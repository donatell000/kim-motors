"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment } from "react";
import FadeImage from "@/components/fade-image/FadeImage";
import { Accent, Reveal, RevealTitle, VIEWPORT } from "@/components/reveal/Reveal";
import styles from "./Selection.module.css";

const steps = [
  { title: "Проверим документы", description: "Проверим документы на соответствие требованиям." },
  { title: "Проведём осмотр автомобиля", description: "Организуем диагностику и необходимые проверки." },
  { title: "Приёмка автомобиля", description: "По приезду встретим автомобиль, проведём приёмку и организуем выгрузку." },
  { title: "Таможенная очистка", description: "Организуем таможенное оформление автомобиля." },
];

const statuses = [<>Автомобиль<br />приобретён</>, "Автомобиль доставлен", "Все этапы доставки организованы"];

// Трек доставки: статусы загораются по очереди, линия между ними прорисовывается.
const STEP_S = 0.6;
const START_S = 0.3;

const checkVariants: Variants = {
  hidden: { backgroundColor: "rgba(255, 255, 255, 0)", color: "rgba(16, 16, 17, 0)" },
  visible: (index: number) => ({
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: "rgba(16, 16, 17, 1)",
    transition: { delay: START_S + index * STEP_S, duration: 0.35 },
  }),
};

const labelVariants: Variants = {
  hidden: { opacity: 0.3 },
  visible: (index: number) => ({ opacity: 1, transition: { delay: START_S + index * STEP_S, duration: 0.5 } }),
};

const trackVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: (index: number) => ({
    scaleY: 1,
    transition: { delay: START_S + index * STEP_S + 0.2, duration: STEP_S - 0.2, ease: "easeInOut" },
  }),
};

export default function Selection() {
  return (
    <section id="delivery" aria-labelledby="selection-title" className={styles.section}>
      <FadeImage className={styles.background} src="/selection-cars.webp" alt="" fill sizes="100vw" />
      <div className={styles.inner}>
        <RevealTitle id="selection-title" className={styles.title} lines={[<Fragment key="line">Вы уже выбрали <Accent>авто</Accent></Fragment>]} />
        <div className={styles.details}>
          <div className={styles.next}>
            <Reveal as="h3" delay={0.1}>Что сделаем дальше:</Reveal>
            <ol className={styles.steps}>
              {steps.map(({ title, description }, index) => (
                <Reveal as="li" key={title} delay={0.2 + index * 0.08}>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <motion.ul className={styles.statuses} aria-label="Результат работы" initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            {statuses.map((status, index) => (
              <li key={index}>
                <motion.span className={styles.check} aria-hidden="true" variants={checkVariants} custom={index} data-reveal="check">✓</motion.span>
                <motion.span variants={labelVariants} custom={index} data-reveal>{status}</motion.span>
                {index < statuses.length - 1 && (
                  <motion.span className={styles.track} aria-hidden="true" variants={trackVariants} custom={index} data-reveal />
                )}
              </li>
            ))}
          </motion.ul>
        </div>
        <Reveal className={styles.actions} delay={0.2}>
          <a className={styles.primary} href="#contact"><span aria-hidden="true">＋</span>Рассчитать стоимость</a>
          <a className={styles.secondary} href="#contact"><span aria-hidden="true">↗</span>Получить подбор авто</a>
        </Reveal>
      </div>
    </section>
  );
}
