import { Fragment } from "react";
import FadeImage from "@/components/fade-image/FadeImage";
import { Accent, Reveal, RevealTitle } from "@/components/reveal/Reveal";
import styles from "./Platforms.module.css";

const platforms = [
  { slug: "kcar", name: "K Car" },
  { slug: "encar", name: "Encar" },
  { slug: "autohub", name: "AutoHub" },
  { slug: "autobell", name: "Autobell" },
  { slug: "jenomotors", name: "Jenomotors" },
  { slug: "lotte-auction", name: "Lotte auction" },
];

export default function Platforms() {
  return (
    <section id="platforms" className={styles.section} aria-labelledby="platforms-title">
      <div className={styles.inner}>
        <RevealTitle
          id="platforms-title"
          className={styles.title}
          lines={["Прямой доступ", <Fragment key="accent">к <Accent from="#0e0d12">площадкам</Accent></Fragment>]}
        />
        <Reveal as="p" className={styles.subtitle} delay={0.2}>Покупаем там, где рождается цена</Reveal>
        <ul className={styles.logos} aria-label="Автомобильные площадки">
          {platforms.map(({ slug, name }, index) => (
            <Reveal as="li" key={slug} delay={0.3 + index * 0.06}>
              <FadeImage src={`/platform-${slug}.webp`} alt={name} width={600} height={200} sizes="(max-width: 600px) 42vw, (max-width: 900px) 28vw, 13vw" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
