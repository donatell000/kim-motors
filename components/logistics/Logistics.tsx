"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Logistics.module.css";

export default function Logistics() {
  const reducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={styles.wrapper}>
      <footer className={styles.footer}>
        <span>Политика конфиденциальности</span>
        <span>© 2026 «kim motors»</span>
        <a href="https://wa.me/996500668685" target="_blank" rel="noopener noreferrer">
          Написать в WhatsApp
        </a>
      </footer>
      <section id="logistics" aria-labelledby="logistics-title" className={styles.section}>
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ y: reducedMotion ? 0 : 16 }}
        >
          <h2 id="logistics-title" className={styles.title}>логистика</h2>
          <p className={styles.description}>Введите номер трека для поиска.</p>
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className={styles.field}>
              <svg aria-hidden="true" viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                <circle cx="12" cy="6" r="5" />
                <path d="M9 13h6a7 7 0 0 1 7 7v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a7 7 0 0 1 7-7Z" />
              </svg>
              <input
                aria-label="Номер трека"
                name="track"
                type="text"
                placeholder="поиск по трекам..."
                required
                pattern=".*\S.*"
                title="Введите номер трека"
                onChange={() => setSubmitted(false)}
              />
            </div>
            <button type="submit" className={styles.submit}>найти</button>
          </form>
          <div role="status" className={styles.status}>
            {submitted && (
              <p>
                Онлайн-поиск пока не подключён. Уточните статус доставки у{' '}
                <a href="https://wa.me/996500668685" target="_blank" rel="noopener noreferrer">менеджера в WhatsApp</a>.
              </p>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
