"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, Award, Play, ChevronRight } from "lucide-react";
import { GithubIcon } from "./icons";
import styles from "./Projects.module.css";
import ProjectModal, { type ProjectModalData } from "./ProjectModal";

const projectKeys = ["market", "conveyor", "tofas", "wala"] as const;
type ProjectKey = (typeof projectKeys)[number];

const projectMeta: Record<
  ProjectKey,
  {
    github?: string;
    live?: string;
    featured?: boolean;
    award?: boolean;
    youtube?: string;
    highlights?: string[];
    screenshots?: { src: string; alt: string }[];
    diagrams?: { src: string; alt: string }[];
  }
> = {
  market: {
    github: "https://github.com/fatihcak",
    featured: true,
    award: true,
    youtube: "https://www.youtube.com/watch?v=baMASW4e2c4",
    highlights: [
      "🏆 Best Project Award — Faculty of Computing & Technology, EMU",
      "🤖 RAG-based AI assistant answers natural language price queries in real time",
      "🛒 Smart Basket Optimizer finds the cheapest market combination for a given shopping list",
      "🔍 Fuzzy product matching via Levenshtein Distance handles typos and spelling variants",
      "🌐 Web scraping aggregates live prices from multiple Cyprus supermarkets",
      "✅ Selenium, JMeter & Postman tested — follows OWASP Top 10 security standards",
      "📐 Built with .NET 8 REST API + React frontend, designed with Agile across 8 work packages",
    ],
    screenshots: [
      { src: "/images/market/ui-homepage.webp", alt: "Homepage — product search & categories" },
      { src: "/images/market/ui-basket.webp",   alt: "Basket Comparison — cheapest market for your list" },
      { src: "/images/market/ui-chatbot.webp",  alt: "AI Market Assistant — RAG-powered chatbot" },
    ],
    diagrams: [
      { src: "/images/market/high-level-design.png", alt: "High Level Architecture Diagram" },
    ],
  },
  conveyor: {
    github: "https://github.com/fatihcak",
  },
  tofas: {
    github: "https://github.com/fatihcak",
  },
  wala: {
    github: "https://github.com/fatihcak",
  },
};

function getYouTubeId(url: string): string {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : "";
}

function YouTubeEmbed({ url }: { url: string }) {
  const id = getYouTubeId(url);
  return (
    <div className={styles.videoWrapper}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="Graduation Project Presentation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.videoFrame}
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.videoLabel}
      >
        <Play size={13} />
        Watch on YouTube
      </a>
    </div>
  );
}

export default function Projects() {
  const t = useTranslations("projects");
  const [activeModal, setActiveModal] = useState<ProjectModalData | null>(null);

  const openModal = (key: ProjectKey) => {
    const meta = projectMeta[key];
    const hasDetails =
      meta.highlights || meta.screenshots || meta.diagrams || meta.youtube;
    if (!hasDetails) return;

    setActiveModal({
      title: t(`items.${key}.title`),
      description: t(`items.${key}.description`),
      longDescription: t(`items.${key}.long_description`),
      highlights: meta.highlights,
      tech: t.raw(`items.${key}.tech`) as string[],
      github: meta.github,
      live: meta.live,
      youtube: meta.youtube,
      screenshots: meta.screenshots,
      diagrams: meta.diagrams,
    });
  };

  return (
    <>
      <section id="projects" className={`section ${styles.projects}`}>
        <div className="container">
          <span className="section-label">{t("section_label")}</span>
          <h2 className="section-heading">{t("heading")}</h2>

          <div className={styles.grid}>
            {projectKeys.map((key) => {
              const meta = projectMeta[key];
              const techRaw = t.raw(`items.${key}.tech`) as string[];
              const hasDetails =
                meta.highlights || meta.screenshots || meta.diagrams || meta.youtube;

              return (
                <article
                  key={key}
                  className={`card ${styles.card} ${meta.featured ? styles.featured : ""}`}
                >
                  {meta.featured && (
                    <div className={styles.featuredBadge}>{t("featured")}</div>
                  )}
                  {meta.award && (
                    <div className={styles.awardBadge}>
                      <Award size={13} />
                      {t("award")}
                    </div>
                  )}

                  <div className={styles.cardInner}>
                    <div className={styles.cardBody}>
                      <h3 className={styles.title}>{t(`items.${key}.title`)}</h3>
                      <p className={styles.description}>
                        {t(`items.${key}.description`)}
                      </p>

                      <div className={styles.cardFooter}>
                        <div className={styles.tags}>
                          {techRaw.map((tech: string) => (
                            <span key={tech} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className={styles.links}>
                          {meta.github && (
                            <a
                              href={meta.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.iconLink}
                              aria-label="GitHub"
                            >
                              <GithubIcon size={18} />
                            </a>
                          )}
                          {meta.live && (
                            <a
                              href={meta.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.iconLink}
                              aria-label="Live demo"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                          {hasDetails && (
                            <button
                              className={styles.detailsBtn}
                              onClick={() => openModal(key)}
                              aria-label="View details"
                            >
                              {t("view_details")} <ChevronRight size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {meta.youtube && (
                      <YouTubeEmbed url={meta.youtube} />
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ProjectModal data={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
}
