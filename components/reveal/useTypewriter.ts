"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 2000;

/**
 * Печатает и стирает слова по кругу — для подсказок (placeholder) в полях.
 * Пока `active` ложно, показывает первое слово без анимации.
 * `words` должен быть постоянным массивом (объявленным вне компонента).
 */
export function useTypewriter(words: readonly string[], active: boolean) {
  const [text, setText] = useState(words[0]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!active) return;
    let word = 0;
    let chars = words[0].length;
    let deleting = true;
    let timer: number;

    const tick = () => {
      if (deleting) {
        chars -= 1;
        if (chars <= 0) {
          deleting = false;
          word = (word + 1) % words.length;
        }
      } else {
        chars += 1;
      }
      const current = words[word];
      setText(current.slice(0, chars));

      const finished = !deleting && chars >= current.length;
      setTyping(!finished);
      if (finished) deleting = true;
      timer = window.setTimeout(tick, finished ? HOLD_MS : deleting ? DELETE_MS : TYPE_MS);
    };

    timer = window.setTimeout(tick, HOLD_MS);
    return () => {
      clearTimeout(timer);
      setText(words[0]);
      setTyping(false);
    };
  }, [active, words]);

  // Курсор «|» виден только пока текст печатается или стирается.
  return typing ? `${text}|` : text;
}
