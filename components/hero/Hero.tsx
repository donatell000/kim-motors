import Image from "next/image";
import { Accent, Reveal, RevealTitle } from "@/components/reveal/Reveal";
import { CountUp, HeroBackdrop } from "./HeroMotion";
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL, whatsappWithText } from "@/lib/site";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <HeroBackdrop>
        <Image
          src="/hero-car.webp"
          alt="Белый BMW X7 из Кореи на фоне гор Кыргызстана"
          fill
          preload
          sizes="100vw"
          className={styles.image}
        />
      </HeroBackdrop>
      <div className={styles.shade} />
      <header className={styles.header}>
        <a href="#hero" className={styles.logo} aria-label="Kim Motors — главная">
          <Image src="/kim-motors-logo.svg" alt="Kim Motors" width={200} height={60} loading="eager" />
        </a>
        <nav className={styles.nav} aria-label="Основная навигация">
          <a href="#advantages">О компании</a>
          <a href="#delivery">Доставка</a>
          <a href="#contact">Контакты</a>
        </nav>
        <a className={styles.request} href={WHATSAPP_URL}>Оставить заявку</a>
        <a className={styles.phone} href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
      </header>
      <ul className={styles.facts}>
        <Reveal as="li" afterIntro delay={0.45}><strong><CountUp to={1500} suffix="+" /></strong><span>довольных <br />клиентов</span></Reveal>
        <Reveal as="li" afterIntro delay={0.55}><strong>Офис</strong><span>в Корее</span></Reveal>
        <Reveal as="li" afterIntro delay={0.65}><strong>Авто</strong><span>в наличии <br />/ Под заказ</span></Reveal>
      </ul>
      <div className={styles.bottom}>
        <RevealTitle
          as="h1"
          id="hero-title"
          className={styles.title}
          afterIntro
          delay={0.1}
          lines={["Авто из Кореи", "и Китая напрямую,", <Accent key="accent">без переплат</Accent>]}
        />
        <Reveal className={styles.actions} afterIntro delay={0.6}>
          <a className={styles.primary} href={whatsappWithText("Здравствуйте! Хочу рассчитать стоимость автомобиля.")}>
            <span aria-hidden="true">↗</span> Рассчитать стоимость
          </a>
          <a className={styles.secondary} href={WHATSAPP_URL}>Связаться с менеджером</a>
        </Reveal>
      </div>
    </section>
  );
}
