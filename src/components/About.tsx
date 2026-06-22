"use client";

import { useTranslations } from "next-intl";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import styles from "./About.module.css";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <span className="section-label">{t("section_label")}</span>
        <div className={styles.grid}>
          <div className={styles.text}>
            <h2 className="section-heading">{t("heading")}</h2>
            <p>{t("bio_1")}</p>
            <p>{t("bio_2")}</p>
            <p>{t("bio_3")}</p>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <MapPin size={16} className={styles.icon} />
                <span>{t("location")}</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.infoItem}>
                <GraduationCap size={16} className={styles.icon} />
                <span>{t("education")}</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.infoItem}>
                <Briefcase size={16} className={styles.icon} />
                <span className={styles.available}>{t("status")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
