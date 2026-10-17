import Image from "next/image";
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
        <h2 id="platforms-title" className={styles.title}>
          Прямой доступ<br />к <span>площадкам</span>
        </h2>
        <p className={styles.subtitle}>Покупаем там, где рождается цена</p>
        <ul className={styles.logos} aria-label="Автомобильные площадки">
          {platforms.map(({ slug, name }) => (
            <li key={slug}>
              <Image src={`/platform-${slug}.webp`} alt={name} width={600} height={200} sizes="(max-width: 600px) 42vw, (max-width: 900px) 28vw, 13vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
