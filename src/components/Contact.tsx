"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import styles from "./Contact.module.css";

export default function Contact() {
  const t = useTranslations("contact");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <span className="section-label">{t("section_label")}</span>
        <h2 className="section-heading">{t("heading")}</h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>

        <div className={styles.links}>
          <a
            href="mailto:fatcakirr@gmail.com"
            className={styles.contactLink}
            id="contact-email"
          >
            <div className={styles.icon}>
              <Mail size={22} />
            </div>
            <div className={styles.linkText}>
              <span className={styles.linkLabel}>{t("email_label")}</span>
              <span className={styles.linkValue}>fatcakirr@gmail.com</span>
            </div>
            <button 
              className={`${styles.copyBtn} ${copiedId === "email" ? styles.copied : ""}`} 
              onClick={(e) => handleCopy(e, "fatcakirr@gmail.com", "email")}
              aria-label="Kopyala"
              title="Kopyala"
            >
              {copiedId === "email" ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </a>

          <a
            href="https://github.com/fatihcak"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
            id="contact-github"
          >
            <div className={styles.icon}>
              <GithubIcon size={22} />
            </div>
            <div className={styles.linkText}>
              <span className={styles.linkLabel}>{t("github_label")}</span>
              <span className={styles.linkValue}>github.com/fatihcak</span>
            </div>
            <button 
              className={`${styles.copyBtn} ${copiedId === "github" ? styles.copied : ""}`} 
              onClick={(e) => handleCopy(e, "https://github.com/fatihcak", "github")}
              aria-label="Kopyala"
              title="Kopyala"
            >
              {copiedId === "github" ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </a>

          <a
            href="https://linkedin.com/in/fatihcak"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
            id="contact-linkedin"
          >
            <div className={styles.icon}>
              <LinkedinIcon size={22} />
            </div>
            <div className={styles.linkText}>
              <span className={styles.linkLabel}>{t("linkedin_label")}</span>
              <span className={styles.linkValue}>linkedin.com/in/fatihcak</span>
            </div>
            <button 
              className={`${styles.copyBtn} ${copiedId === "linkedin" ? styles.copied : ""}`} 
              onClick={(e) => handleCopy(e, "https://linkedin.com/in/fatihcak", "linkedin")}
              aria-label="Kopyala"
              title="Kopyala"
            >
              {copiedId === "linkedin" ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
