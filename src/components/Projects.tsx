"use client";

import { useTranslations } from "next-intl";
import { ExternalLink, Award, Play } from "lucide-react";
import { GithubIcon } from "./icons";
import styles from "./Projects.module.css";

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
  }
> = {
  market: {
    github: "https://github.com/fatihcak",
    featured: true,
    award: true,
    youtube: "https://www.youtube.com/watch?v=baMASW4e2c4",
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

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <span className="section-label">{t("section_label")}</span>
        <h2 className="section-heading">{t("heading")}</h2>

        <div className={styles.grid}>
          {projectKeys.map((key) => {
            const meta = projectMeta[key];
            const techRaw = t.raw(`items.${key}.tech`) as string[];

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
  );
}
