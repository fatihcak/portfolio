"use client";

import { useTranslations } from "next-intl";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import styles from "./Hero.module.css";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="top" className={styles.hero}>
      {/* Background gradient orbs */}
      <div className={styles.orb1} aria-hidden />
      <div className={styles.orb2} aria-hidden />

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <span className={styles.pulse} aria-hidden />
          {t("available")}
        </div>

        <h1 className={styles.heading}>
          <span className={styles.greeting}>{t("greeting")}</span>
          <span className={styles.name}>
            Fatih <span>Çakır</span>
          </span>
        </h1>

        <p className={styles.title}>{t("title")}</p>
        <p className={styles.subtitle}>{t("subtitle")}</p>

        <div className={styles.ctas}>
          <a href="#projects" className="btn btn-primary">
            {t("cta_projects")}
            <ArrowDown size={16} />
          </a>
          <a href="#contact" className="btn btn-secondary">
            {t("cta_contact")}
          </a>
        </div>

        <div className={styles.socials}>
          <a
            href="https://github.com/fatihcak"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://linkedin.com/in/fatihcak"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="mailto:fatcakirr@gmail.com"
            className={styles.socialLink}
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <div className={styles.socialLine} />
        </div>
      </div>

      <a href="#about" className={styles.scrollCue} aria-label="Scroll down">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
