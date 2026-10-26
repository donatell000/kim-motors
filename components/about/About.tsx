import FadeImage from "@/components/fade-image/FadeImage";
import { Reveal, RevealTitle } from "@/components/reveal/Reveal";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className={styles.section}>
      <div className={styles.inner}>
        <FadeImage className={styles.audi} src="/about-audi.webp" alt="" width={1200} height={675} sizes="(max-width: 900px) 100vw, 55vw" />
        <div className={styles.copy}>
          <RevealTitle id="about-title" className={styles.title} lines={["Кто мы?"]} />
          <Reveal as="p" className={styles.experience} delay={0.15}>
            <strong>Наша команда уже более 15 лет</strong> занимается импортом автомобилей
          </Reveal>
          <Reveal className={styles.mission} delay={0.25}>
            <h3>Наша МИССИЯ:</h3>
            <p>Заказ автомобиля должен быть таким же простым, как любая другая онлайн-покупка.</p>
            <p>Мы работаем, чтобы вам не пришлось учиться на своих ошибках.</p>
          </Reveal>
        </div>
        <figure className={styles.portrait}>
          <FadeImage className={styles.car} src="/about-car.webp" alt="" width={1400} height={788} sizes="(max-width: 900px) 100vw, 65vw" />
          <FadeImage className={styles.founder} src="/about-founder.webp" alt="Владимир Ким, основатель Kim Motors" width={963} height={1633} sizes="(max-width: 600px) 90vw, (max-width: 900px) 450px, 40vw" />
          <figcaption className={styles.caption}>
            <strong>Ким Владимир</strong>
            <span>основатель Kim Motors</span>
          </figcaption>
        </figure>
        <Reveal as="figure" className={styles.story} delay={0.35}>
          <blockquote>
            <p>«20 лет назад я потерял деньги при первом заказе Audi. Именно тогда я решил: такого не должно случаться ни с кем другим.»</p>
          </blockquote>
          <figcaption>Ким Владимир</figcaption>
        </Reveal>
      </div>
    </section>
  );
}
