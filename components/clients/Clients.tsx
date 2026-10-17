"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Clients.module.css";

const photos = [
  { src: "/client-1.webp", alt: "Передача автомобиля Hyundai клиенту Kim Motors" },
  { src: "/client-2.webp", alt: "Клиент Kim Motors с приобретённым автомобилем" },
  { src: "/client-3.webp", alt: "Кадр из истории клиента Kim Motors" },
  { src: "/client-4.webp", alt: "Кадр из истории покупки автомобиля через Kim Motors" },
];

export default function Clients() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="clients" aria-labelledby="clients-title" className={styles.section}>
      <motion.div
        initial={false}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        style={{ y: reducedMotion ? 0 : 20 }}
        transition={{ duration: reducedMotion ? 0 : 0.6 }}
      >
        <h2 id="clients-title" className={styles.title}>Наши клиенты</h2>
        <ul className={styles.gallery} tabIndex={0} aria-label="Фотографии клиентов — прокручиваемая галерея">
          {photos.map(({ src, alt }) => (
            <li className={styles.card} key={src}>
              <Image src={src} alt={alt} fill sizes="(max-width: 540px) 80vw, (max-width: 900px) 44vw, 24vw" />
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
