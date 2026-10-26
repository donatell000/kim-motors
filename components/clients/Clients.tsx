import FadeImage from "@/components/fade-image/FadeImage";
import { Reveal, RevealTitle } from "@/components/reveal/Reveal";
import styles from "./Clients.module.css";

const photos = [
  { src: "/client-1.webp", alt: "Передача автомобиля Hyundai клиенту Kim Motors" },
  { src: "/client-2.webp", alt: "Клиент Kim Motors с приобретённым автомобилем" },
  { src: "/client-3.webp", alt: "Кадр из истории клиента Kim Motors" },
  { src: "/client-4.webp", alt: "Кадр из истории покупки автомобиля через Kim Motors" },
];

export default function Clients() {
  return (
    <section id="clients" aria-labelledby="clients-title" className={styles.section}>
      <RevealTitle id="clients-title" className={styles.title} lines={["Наши клиенты"]} />
      <ul className={styles.gallery} tabIndex={0} aria-label="Фотографии клиентов — прокручиваемая галерея">
        {photos.map(({ src, alt }, index) => (
          <Reveal as="li" className={styles.card} key={src} delay={0.15 + index * 0.08}>
            <FadeImage src={src} alt={alt} fill sizes="(max-width: 540px) 80vw, (max-width: 900px) 44vw, 24vw" />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
