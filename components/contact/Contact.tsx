"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import styles from "./Contact.module.css";

export default function Contact() {
  const reducedMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `Здравствуйте! Хочу заказать автомобиль.\nИмя: ${data.get("name")}\nАвтомобиль: ${data.get("car")}\nБюджет ($): ${data.get("budget")}\nТелефон: ${data.get("phone")}`;
    window.location.assign(`https://wa.me/996500668685?text=${encodeURIComponent(text)}`);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <motion.h2 
            id="contact-title" 
            className={styles.title}
            initial={false}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ y: reducedMotion ? 0 : 20 }}
          >
            заказать <br /><span>автомобиль</span>
          </motion.h2>
          <div className={styles.car}>
            <Image src="/contact-car.webp" alt="Чёрный BMW — автомобиль под заказ" fill sizes="(max-width: 900px) 100vw, 60vw" />
          </div>
        </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="car">Желаемый автомобиль</label>
              <input type="text" id="car" name="car" placeholder="Например: Hyundai Santa Fe" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="name">Ваше имя</label>
              <input type="text" id="name" name="name" autoComplete="name" placeholder="Иван Иванов" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="budget">Бюджет ОТ и ДО ($)</label>
              <input type="text" id="budget" name="budget" placeholder="20 000 - 30 000" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="phone">Ваш номер телефона</label>
              <input type="tel" id="phone" name="phone" autoComplete="tel" placeholder="+996 (___) __ __ __" required />
            </div>
            <button type="submit" className={styles.submit}>
              Оставить заявку
            </button>
            <p className={styles.hint}>Откроется WhatsApp с текстом заявки. Отправьте сообщение менеджеру.</p>
          </form>

        <div className={styles.info}>
          <div className={styles.socials}>
            <a href="https://instagram.com/kim.motors.kg" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              @kim.motors.kg
            </a>
            <a href="https://youtube.com/@Vladimir_Kim_PRO_Auto" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              @Vladimir_Kim_PRO_Auto
            </a>
            <a href="https://wa.me/996500668685" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              +996 500 668 685
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
