"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import FadeImage from "@/components/fade-image/FadeImage";
import { EASE, Reveal, RevealTitle, VIEWPORT } from "@/components/reveal/Reveal";
import { useTypewriter } from "@/components/reveal/useTypewriter";
import { SOCIALS, WHATSAPP_URL, whatsappWithText } from "@/lib/site";
import styles from "./Contact.module.css";

const icons = {
  user: <><circle cx="12" cy="7" r="4.5" /><path d="M4 21v-1.5A6.5 6.5 0 0 1 10.5 13h3a6.5 6.5 0 0 1 6.5 6.5V21Z" /></>,
  budget: <><path d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm0 1.8a7.7 7.7 0 1 1 0 15.4 7.7 7.7 0 0 1 0-15.4Z" /><path d="M11.2 6h1.6v1.2c1.4.2 2.4 1 2.6 2.3h-1.7c-.1-.6-.7-1-1.7-1-.9 0-1.5.4-1.5 1s.5.8 1.8 1.1c1.8.4 3.2.9 3.2 2.6 0 1.3-1 2.2-2.7 2.4V17h-1.6v-1.4c-1.6-.2-2.7-1.1-2.8-2.5H10c.1.7.8 1.1 1.9 1.1 1 0 1.6-.4 1.6-1s-.5-.8-1.9-1.1c-1.7-.4-3-.9-3-2.5 0-1.2.9-2.1 2.6-2.4Z" /></>,
  car: <path d="M6.2 5h11.6a2 2 0 0 1 1.9 1.4l1.3 4.1A2.5 2.5 0 0 1 22 12.6V17a1 1 0 0 1-1 1h-1v1.5a1.5 1.5 0 0 1-3 0V18H7v1.5a1.5 1.5 0 0 1-3 0V18H3a1 1 0 0 1-1-1v-4.4a2.5 2.5 0 0 1 1-2.1l1.3-4.1A2 2 0 0 1 6.2 5Zm.3 2-1 3.5h13l-1-3.5ZM5.5 12.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm13 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />,
  phone: <path d="M6.6 2.5c.5-.1 1 .2 1.2.7l1.6 3.8c.2.5.1 1-.3 1.4L7.3 10a14 14 0 0 0 6.7 6.7l1.6-1.8c.4-.4.9-.5 1.4-.3l3.8 1.6c.5.2.8.7.7 1.2l-.5 3c-.1.6-.6 1-1.2 1C10.4 21.4 2.6 13.6 2.6 4.2c0-.6.4-1.1 1-1.2Z" />,
};

const fields: { id: string; name: string; placeholder: string; icon: keyof typeof icons; type?: string; autoComplete?: string }[] = [
  { id: "name", name: "name", placeholder: "Ваше имя", icon: "user", autoComplete: "name" },
  { id: "budget", name: "budget", placeholder: "Бюджет ОТ и ДО ($)", icon: "budget" },
  { id: "car", name: "car", placeholder: "Желаемый автомобиль", icon: "car" },
  { id: "phone", name: "phone", placeholder: "Ваш номер телефона", icon: "phone", type: "tel", autoComplete: "tel" },
];

// Подсказка в поле «Желаемый автомобиль» чередует название поля и примеры моделей.
const carExamples = ["Желаемый автомобиль", "Hyundai Palisade", "Желаемый автомобиль", "Kia K5", "Желаемый автомобиль", "Zeekr 001"] as const;

const socialIcons: Record<string, ReactNode> = {
  whatsapp: <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm4.6 12.6c-.2.6-1.1 1.1-1.6 1.1-.4.1-.9.1-1.5-.1a13 13 0 0 1-1.4-.5 10.6 10.6 0 0 1-4-3.6c-.3-.4-.9-1.3-.9-2.4s.6-1.7.8-1.9c.2-.2.5-.3.6-.3h.5c.1 0 .3 0 .5.4l.7 1.7c.1.1.1.3 0 .4l-.2.4-.4.4c-.1.1-.2.3-.1.5.2.3.7 1.1 1.4 1.8 1 .9 1.8 1.1 2 1.3.3.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l1.6.8c.3.1.4.2.5.3.1.1.1.6-.1 1.1Z" />,
  instagram: <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm4 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm4.5-3.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />,
  youtube: <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm-2 5.3v7.4L16 12Z" />,
};

const socials = [
  { icon: "whatsapp", href: WHATSAPP_URL, label: "+996 500 668 685", note: "Авто из Кореи и Китая | Бишкек | СНГ" },
  { icon: "instagram", href: SOCIALS.instagram, label: "@kim.motors.kg" },
  { icon: "youtube", href: SOCIALS.youtube, label: "@Vladimir_Kim_PRO_Auto" },
];

export default function Contact() {
  const reducedMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const formInView = useInView(formRef, VIEWPORT);
  const carPlaceholder = useTypewriter(carExamples, formInView && !reducedMotion);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `Здравствуйте! Хочу заказать автомобиль.\nИмя: ${data.get("name")}\nАвтомобиль: ${data.get("car")}\nБюджет ($): ${data.get("budget")}\nТелефон: ${data.get("phone")}`;
    window.location.assign(whatsappWithText(text));
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className={styles.section}>
      <FadeImage className={styles.background} src="/contact-background.webp" alt="" fill sizes="100vw" />

      <RevealTitle id="contact-title" className={styles.title} lines={["Заказать", "автомобиль"]} />

      {/* BMW мягко выезжает слева и останавливается. */}
      <motion.div
        className={styles.car}
        data-reveal
        initial={{ x: "-12%", opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      >
        <FadeImage src="/contact-car.webp" alt="Чёрный BMW — автомобиль под заказ" fill sizes="(max-width: 900px) 130vw, 86vw" />
      </motion.div>

      <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
        {fields.map(({ id, name, placeholder, icon, type = "text", autoComplete }) => (
          <div className={styles.field} key={id}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">{icons[icon]}</svg>
            <label htmlFor={id} className={styles.srOnly}>{placeholder}</label>
            <input type={type} id={id} name={name} placeholder={id === "car" ? carPlaceholder : placeholder} autoComplete={autoComplete} required />
          </div>
        ))}
        <button type="submit" className={styles.submit}>Оставить заявку</button>
        <p className={styles.consent}>
          Нажимая кнопку, вы соглашаетесь с <Link href="/privacy">политикой конфиденциальности</Link>
        </p>
      </form>

      <Reveal as="ul" className={styles.socials} delay={0.3}>
        {socials.map(({ icon, href, label, note }) => (
          <li key={icon}>
            <span className={styles.socialIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">{socialIcons[icon]}</svg>
            </span>
            <span className={styles.socialText}>
              <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
              {note && <small>{note}</small>}
            </span>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
