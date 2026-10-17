import Image from "next/image";
import styles from "./Hero.module.css";

const managerUrl = "https://wa.me/996500668685";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <Image
        src="/hero-car.webp"
        alt="Белый BMW на фоне гор Кыргызстана"
        fill
        preload
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.shade} />
      <header className={styles.header}>
        <a href="#hero" className={styles.logo} aria-label="Kim Motors — главная">
          <Image src="/kim-motors-logo.svg" alt="Kim Motors" width={200} height={60} />
        </a>
        <nav className={styles.nav} aria-label="Основная навигация">
          <a href="#advantages">О компании</a>
          <a href="#delivery">Доставка</a>
          <a href="#contact">Контакты</a>
        </nav>
        <a className={styles.request} href={managerUrl}>Оставить заявку</a>
        <a className={styles.phone} href="tel:+996500668685">+996 (500) 668 685</a>
      </header>
      <ul className={styles.facts}>
        <li><strong>1500+</strong><span>довольных <br />клиентов</span></li>
        <li><strong>Офис</strong><span>в Корее</span></li>
        <li><strong>Авто</strong><span>в наличии <br />/ Под заказ</span></li>
      </ul>
      <div className={styles.bottom}>
        <h1 id="hero-title" className={styles.title}>
          Авто из Кореи<br />и Китая напрямую,<br /><span>без переплат</span>
        </h1>
        <div className={styles.actions}>
          <a className={styles.primary} href={`${managerUrl}?text=${encodeURIComponent("Здравствуйте! Хочу рассчитать стоимость автомобиля.")}`}>
            <span aria-hidden="true">↗</span> Рассчитать стоимость
          </a>
          <a className={styles.secondary} href={managerUrl}>Связаться с менеджером</a>
        </div>
      </div>
    </section>
  );
}
