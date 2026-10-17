"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./About.module.css";

export default function About() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" aria-labelledby="about-title" className={styles.section}>
      <motion.div
        className={styles.inner}
        initial={false}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        style={{ y: 20 }}
        transition={{ duration: reducedMotion ? 0 : 0.6 }}
      >
        <Image className={styles.audi} src="/about-audi.webp" alt="" width={1200} height={675} sizes="(max-width: 900px) 100vw, 55vw" />
        <div className={styles.copy}>
          <h2 id="about-title" className={styles.title}>Кто мы?</h2>
          <p className={styles.experience}>
            <strong>Наша команда уже более 15 лет</strong> занимается импортом автомобилей
          </p>
          <div className={styles.mission}>
            <h3>Наша МИССИЯ:</h3>
            <p>Заказ автомобиля должен быть таким же простым, как любая другая онлайн-покупка.</p>
            <p>Мы работаем, чтобы вам не пришлось учиться на своих ошибках.</p>
          </div>
        </div>
        <figure className={styles.portrait}>
          <Image className={styles.car} src="/about-car.webp" alt="" width={1400} height={788} sizes="(max-width: 900px) 100vw, 65vw" />
          <Image className={styles.founder} src="/about-founder.webp" alt="Владимир Ким, основатель Kim Motors" width={963} height={1633} sizes="(max-width: 600px) 90vw, (max-width: 900px) 450px, 40vw" />
          <figcaption className={styles.caption}>
            <strong>Ким Владимир</strong>
            <span>основатель Kim Motors</span>
          </figcaption>
        </figure>
        <figure className={styles.story}>
          <blockquote>
            <p>«20 лет назад я потерял деньги при первом заказе Audi. Именно тогда я решил: такого не должно случаться ни с кем другим.»</p>
          </blockquote>
          <figcaption>Ким Владимир</figcaption>
        </figure>
      </motion.div>
    </section>
  );
}
