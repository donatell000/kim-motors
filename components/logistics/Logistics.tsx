"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal, RevealTitle, VIEWPORT } from "@/components/reveal/Reveal";
import { useTypewriter } from "@/components/reveal/useTypewriter";
import { WHATSAPP_URL, whatsappWithText } from "@/lib/site";
import { ROUTE, type TrackResult } from "@/lib/tracking";
import styles from "./Logistics.module.css";

// Карта (Leaflet) нужна только после поиска — не грузим её заранее.
const TrackingMap = dynamic(() => import("./TrackingMap"), {
  ssr: false,
  loading: () => <div className={styles.map} aria-hidden="true" />,
});

// Подсказка в поиске чередует текст и пример номера контейнера.
const trackExamples = ["номер контейнера...", "TBJU1234567", "номер контейнера...", "CICU7654321"] as const;

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found"; result: TrackResult }
  | { status: "not_found"; number: string }
  | { status: "error" };

const dateFormat = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", timeZone: "Asia/Bishkek" });

export default function Logistics() {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const formInView = useInView(formRef, VIEWPORT);
  const placeholder = useTypewriter(trackExamples, formInView && !reducedMotion && !value);

  const search = useCallback(async (raw: string) => {
    const number = raw.trim().toUpperCase();
    if (!number) return;

    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setState({ status: "loading" });

    // Номер попадает в адрес страницы — ссылкой можно поделиться с клиентом.
    const url = new URL(window.location.href);
    url.searchParams.set("track", number);
    url.hash = "logistics";
    window.history.replaceState(null, "", url);

    try {
      const response = await fetch(`/api/track?number=${encodeURIComponent(number)}`, { signal: controller.signal });
      if (response.status === 404 || response.status === 400) {
        setState({ status: "not_found", number });
      } else if (!response.ok) {
        setState({ status: "error" });
      } else {
        setState({ status: "found", result: (await response.json()) as TrackResult });
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") setState({ status: "error" });
    }
  }, []);

  // Открыли ссылку вида /?track=TBJU1234567 — сразу ищем и прокручиваем к блоку.
  useEffect(() => {
    const number = new URLSearchParams(window.location.search).get("track");
    if (!number) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- однократно подставляем номер из адреса
    setValue(number);
    search(number);
    document.getElementById("logistics")?.scrollIntoView();
  }, [search]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search(value);
  };

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
          <Reveal as="p" className={styles.description} delay={0.15}>Введите номер контейнера, чтобы узнать, где он сейчас.</Reveal>
          <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m15.5 15.5 5 5" />
              </svg>
              <input
                aria-label="Номер контейнера"
                name="track"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                required
                pattern=".*\S.*"
                title="Введите номер контейнера"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
              />
            </div>
            <button type="submit" className={styles.submit} disabled={state.status === "loading"}>
              {state.status === "loading" ? "ищем…" : "найти"}
            </button>
          </form>

          <div role="status" aria-live="polite" className={styles.status}>
            {state.status === "not_found" && (
              <p>
                Контейнер <strong>{state.number}</strong> не найден. Проверьте номер или{" "}
                <a href={whatsappWithText(`Здравствуйте! Подскажите статус контейнера ${state.number}.`)} target="_blank" rel="noopener noreferrer">
                  спросите менеджера в WhatsApp
                </a>.
              </p>
            )}
            {state.status === "error" && (
              <p>
                Не удалось получить данные. Попробуйте ещё раз через минуту или{" "}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">напишите менеджеру</a>.
              </p>
            )}
            {state.status === "found" && (
              <p className={styles.srOnly}>Контейнер {state.result.number}: {state.result.text}</p>
            )}
          </div>
          {state.status === "found" && <TrackResultCard result={state.result} />}
        </div>
      </section>
    </div>
  );
}

function TrackResultCard({ result }: { result: TrackResult }) {
  const currentIndex = ROUTE.findIndex((stop) => stop.id === result.point);
  const updated = new Date(result.updatedAt);

  return (
    <article className={styles.result} aria-label={`Контейнер ${result.number}`}>
      <header className={styles.resultHeader}>
        <h3>{result.number}</h3>
        {!Number.isNaN(updated.getTime()) && <span>Обновлено {dateFormat.format(updated)}</span>}
      </header>
      <p className={styles.resultText}>{result.text}</p>

      <ol className={styles.route} aria-label="Маршрут">
        {ROUTE.map((stop, index) => (
          <li
            key={stop.id}
            className={index < currentIndex ? styles.passed : index === currentIndex ? styles.current : undefined}
            aria-current={index === currentIndex ? "step" : undefined}
          >
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.stopName}>{stop.name}</span>
          </li>
        ))}
      </ol>

      <TrackingMap point={result.point} />
    </article>
  );
}
