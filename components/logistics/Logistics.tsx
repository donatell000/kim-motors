"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal, RevealTitle, VIEWPORT } from "@/components/reveal/Reveal";
import { useTypewriter } from "@/components/reveal/useTypewriter";
import { WHATSAPP_URL } from "@/lib/site";
import styles from "./Logistics.module.css";

// Подсказка в поиске чередует текст и пример номера трека.
const trackExamples = ["поиск по трекам...", "KM-2410-0587", "поиск по трекам...", "KM-2409-1342"] as const;

export default function Logistics() {
  const reducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const formInView = useInView(formRef, VIEWPORT);
  const placeholder = useTypewriter(trackExamples, formInView && !reducedMotion);

  return (
    <div className={styles.wrapper}>
      <footer className={styles.footer}>
        <Link href="/privacy" className={styles.privacy}>Политика конфиденциальности</Link>
        <span>© 2026 «kim motors»</span>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          Написать в WhatsApp
        </a>
      </footer>
      <section id="logistics" aria-labelledby="logistics-title" className={styles.section}>
        <div>
          <RevealTitle id="logistics-title" className={styles.title} lines={["логистика"]} />
          <Reveal as="p" className={styles.description} delay={0.15}>Введите номер трека для поиска.</Reveal>
          <form
            ref={formRef}
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className={styles.field}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m15.5 15.5 5 5" />
              </svg>
              <input
                aria-label="Номер трека"
                name="track"
                type="text"
                placeholder={placeholder}
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
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">менеджера в WhatsApp</a>.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
