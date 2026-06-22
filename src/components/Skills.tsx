"use client";

import { useTranslations } from "next-intl";
import styles from "./Skills.module.css";

const skills = {
  backend: [
    { name: ".NET Core / C#", level: 85 },
    { name: "Entity Framework", level: 75 },
    { name: "Python", level: 80 },
    { name: "REST APIs", level: 85 },
    { name: "WebSockets", level: 70 },
    { name: "SQL / SQLite / MSSQL", level: 70 },
  ],
  ai_ml: [
    { name: "RAG Architecture", level: 75 },
    { name: "YOLOv8", level: 70 },
    { name: "Computer Vision", level: 65 },
    { name: "OpenCV", level: 65 },
    { name: "LLM Integration", level: 70 },
  ],
  frontend: [
    { name: "React", level: 65 },
    { name: "Next.js", level: 60 },
    { name: "TypeScript", level: 65 },
    { name: "HTML / CSS", level: 70 },
  ],
  tools: [
    { name: "Git / GitHub", level: 80 },
    { name: "Docker", level: 55 },
    { name: "Linux", level: 60 },
    { name: "Vercel", level: 65 },
    { name: "Web Scraping", level: 75 },
  ],
};

type SkillCategoryKey = keyof typeof skills;

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className={styles.skillItem}>
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const t = useTranslations("skills");

  const categories: SkillCategoryKey[] = ["backend", "ai_ml", "frontend", "tools"];

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className="container">
        <span className="section-label">{t("section_label")}</span>
        <h2 className="section-heading">{t("heading")}</h2>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <div key={cat} className={`card ${styles.category}`}>
              <h3 className={styles.categoryTitle}>
                {t(`categories.${cat}`)}
              </h3>
              <div className={styles.skillList}>
                {skills[cat].map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
