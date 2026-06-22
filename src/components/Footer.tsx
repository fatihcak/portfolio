"use client";

import { useLocale } from "next-intl";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const locale = useLocale();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.logo}>FC<span>.</span></span>
        <p className={styles.copy}>
          © {year} Fatih Çakır
        </p>
        <div className={styles.footerLinks}>
          <a href={`/${locale}#about`} className={styles.footerLink}>About</a>
          <a href={`/${locale}#projects`} className={styles.footerLink}>Projects</a>
          <a href={`/${locale}#contact`} className={styles.footerLink}>Contact</a>
        </div>
      </div>
    </footer>
  );
}
