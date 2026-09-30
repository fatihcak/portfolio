"use client";

import { useTranslations } from "next-intl";
import styles from "./Skills.module.css";

const skills = {
  backend: [
    { name: "PostgreSQL (RLS, PL/pgSQL, Triggers)", level: 82 },
    { name: "Supabase / Edge Functions (Deno)", level: 82 },
    { name: ".NET Core / C#", level: 80 },
    { name: "REST APIs & RPC", level: 85 },
    { name: "Python", level: 78 },
    { name: "Event-Driven Architecture", level: 72 },
  ],
  ai_ml: [
    { name: "LLM Integration (Gemini, GPT)", level: 78 },
    { name: "Agentic AI Workflows", level: 68 },
    { name: "RAG Architecture", level: 75 },
    { name: "YOLOv8 / Computer Vision", level: 70 },
    { name: "OpenCV", level: 65 },
  ],
  frontend: [
    { name: "React + TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Vite", level: 80 },
    { name: "Next.js", level: 72 },
    { name: "TanStack Query", level: 75 },
    { name: "Shadcn UI / Radix UI", level: 78 },
  ],
  tools: [
    { name: "Git / GitHub", level: 85 },
    { name: "Vitest / pgTAP (TDD)", level: 72 },
    { name: "Docker", level: 58 },
    { name: "Linux", level: 65 },
    { name: "Kafka / RabbitMQ", level: 32 },
  ],
};

type SkillCategoryKey = keyof typeof skills;

function SkillItem({ name }: { name: string }) {
  return (
    <li className={styles.skillItem}>
      {name}
    </li>
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
              <ul className={styles.skillList}>
                {skills[cat].map((skill) => (
                  <SkillItem key={skill.name} name={skill.name} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
