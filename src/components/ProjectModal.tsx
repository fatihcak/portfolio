"use client";

import { useEffect, useRef, useState } from "react";
import { X, Play, ExternalLink, ZoomIn } from "lucide-react";
import { GithubIcon } from "./icons";
import styles from "./ProjectModal.module.css";

export interface ProjectModalData {
  title: string;
  description: string;
  longDescription: string;
  highlights?: string[];
  tech: string[];
  github?: string;
  live?: string;
  youtube?: string;
  screenshots?: { src: string; alt: string }[];
  diagrams?: { src: string; alt: string }[];
}

interface Props {
  data: ProjectModalData | null;
  onClose: () => void;
}

function getYouTubeId(url: string): string {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : "";
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <button className={styles.lightboxClose} onClick={onClose} aria-label="Close">
        <X size={22} />
      </button>
      <img
        src={src}
        alt={alt}
        className={styles.lightboxImg}
        onClick={(e) => e.stopPropagation()}
      />
      <p className={styles.lightboxCaption}>{alt}</p>
    </div>
  );
}

export default function ProjectModal({ data, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!data) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [data, onClose, lightbox]);

  if (!data) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const allImages = [
    ...(data.screenshots ?? []),
    ...(data.diagrams ?? []),
  ];

  return (
    <>
      <div className={styles.overlay} ref={overlayRef} onClick={handleOverlayClick}>
        <div className={styles.modal} role="dialog" aria-modal="true">
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>{data.title}</h2>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className={styles.body}>

            {/* YouTube embed */}
            {data.youtube && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>🎬 Demo</h3>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(data.youtube)}`}
                    title="Project demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.videoFrame}
                  />
                </div>
                <a
                  href={data.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ytLink}
                >
                  <Play size={13} /> Watch on YouTube
                </a>
              </div>
            )}

            {/* About */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>📋 About the Project</h3>
              <p className={styles.longDesc}>{data.longDescription}</p>
            </div>

            {/* Highlights */}
            {data.highlights && data.highlights.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>⚡ Key Highlights</h3>
                <ul className={styles.highlights}>
                  {data.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Screenshots */}
            {data.screenshots && data.screenshots.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>🖥️ Screenshots</h3>
                <div className={styles.gallery}>
                  {data.screenshots.map((s, i) => (
                    <button
                      key={i}
                      className={styles.galleryItem}
                      onClick={() => setLightbox(s)}
                      aria-label={`Enlarge: ${s.alt}`}
                    >
                      <div className={styles.imgWrapper}>
                        <img src={s.src} alt={s.alt} className={styles.galleryImg} loading="lazy" />
                        <div className={styles.imgOverlay}>
                          <ZoomIn size={22} />
                        </div>
                      </div>
                      <span className={styles.imgCaption}>{s.alt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Diagrams */}
            {data.diagrams && data.diagrams.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>📐 Architecture & Design</h3>
                <div className={styles.gallery}>
                  {data.diagrams.map((d, i) => (
                    <button
                      key={i}
                      className={styles.galleryItem}
                      onClick={() => setLightbox(d)}
                      aria-label={`Enlarge: ${d.alt}`}
                    >
                      <div className={styles.imgWrapper}>
                        <img src={d.src} alt={d.alt} className={styles.galleryImg} loading="lazy" />
                        <div className={styles.imgOverlay}>
                          <ZoomIn size={22} />
                        </div>
                      </div>
                      <span className={styles.imgCaption}>{d.alt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>🛠️ Tech Stack</h3>
              <div className={styles.techTags}>
                {data.tech.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className={styles.section}>
              <div className={styles.links}>
                {data.github && (
                  <a href={data.github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                    <GithubIcon size={17} /> GitHub
                  </a>
                )}
                {data.live && (
                  <a href={data.live} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                    <ExternalLink size={17} /> Live Demo
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}
