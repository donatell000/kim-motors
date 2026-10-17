import Image from "next/image";
import styles from "./Advantages.module.css";

const advantages = [
  { id: "support", text: <><strong>Поддержка</strong> <br />и сопровождение <br /><strong>на всех этапах</strong></> },
  { id: "reports", text: <><strong>Подробный фото-</strong> <br />и видеоотчёт</> },
  { id: "company", text: <>Собственная экспортная <br /><strong>компания в Корее</strong></> },
  { id: "inspection", text: <><strong>Проверка</strong> <br />компьютерной <br />диагностикой авто <br /><strong>перед покупкой</strong></> },
  { id: "price", text: <><strong>Конкурентные <br />цены</strong></> },
];

export default function Advantages() {
  return (
    <section id="advantages" className={styles.section} aria-labelledby="advantages-title">
      <div className={styles.inner}>
        <h2 id="advantages-title" className={styles.title}>
          Почему <span>выбирают</span> нас
        </h2>
        <div className={styles.scene}>
          <Image
            src="/advantages-car.png"
            alt="Чёрный Mercedes-Benz на подиуме"
            width={2826}
            height={1235}
            sizes="(max-width: 900px) 100vw, 75vw"
            className={styles.car}
          />
          <ul className={styles.list}>
            {advantages.map(({ id, text }) => (
              <li key={id} className={`${styles.item} ${styles[id]}`}>
                <Image src={`/advantage-${id}.svg`} alt="" width={75} height={75} />
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
