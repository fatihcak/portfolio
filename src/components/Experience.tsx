"use client";

import { useTranslations } from "next-intl";
import styles from "./Experience.module.css";

export default function Experience() {
  const t = useTranslations("experience");

  const items = ["grad", "bursa", "tofas"] as const;

  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <div className="container">
        <span className="section-label">{t("section_label")}</span>
        <h2 className="section-heading">{t("heading")}</h2>

        <div className={styles.timeline}>
          {items.map((key, i) => (
            <div key={key} className={styles.item}>
              <div className={styles.left}>
                <span className={styles.period}>{t(`items.${key}.period`)}</span>
              </div>

              <div className={styles.connector}>
                <div className={`${styles.dot} ${i === 0 ? styles.dotActive : ""}`} />
                {i < items.length - 1 && <div className={styles.line} />}
              </div>

              <div className={`card ${styles.card}`}>
                <h3 className={styles.role}>{t(`items.${key}.role`)}</h3>
                <p className={styles.company}>{t(`items.${key}.company`)}</p>
                <p className={styles.desc}>{t(`items.${key}.description`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
