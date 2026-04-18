"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useObservatorio } from "@/app/components/observatorio/ObservatorioProviders";

export type ProjectDetailDTO = {
  id: number;
  title: string;
  slug: string;
  description: string;
  details: string;
  highlights: string | null;
  challenges: string | null;
  imageUrl: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  status: string;
  createdAt: string;
  skills: { skill: { name: string; category: string } }[];
  images: { id: number; url: string; alt: string | null; createdAt: string }[];
};

function splitBlocks(text: string) {
  return text
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Destaques no admin costumam ser JSON array de strings; aceita também texto em blocos. */
function parseHighlightBullets(raw: string | null): string[] {
  if (!raw?.trim()) return [];
  const t = raw.trim();
  if (t.startsWith("[")) {
    try {
      const parsed: unknown = JSON.parse(t);
      if (Array.isArray(parsed)) {
        return parsed.map((x) => String(x).trim()).filter(Boolean);
      }
    } catch {
      /* não é JSON válido */
    }
  }
  return splitBlocks(t);
}

type Slide = { key: string; url: string; alt: string };

export default function ProjectDetailClient({ project }: { project: ProjectDetailDTO }) {
  const { t } = useObservatorio();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const year = new Date(project.createdAt).getFullYear();
  const done = project.status === "completed";
  const statusClass = done ? "done" : "live";
  const statusLabel = done ? t("atlas.statusProd") : t("atlas.statusDev");

  const highlightItems = useMemo(() => parseHighlightBullets(project.highlights), [project.highlights]);

  const slides: Slide[] = useMemo(() => {
    const list: Slide[] = [];
    if (project.imageUrl) {
      list.push({ key: "cover", url: project.imageUrl, alt: project.title });
    }
    for (const img of project.images) {
      list.push({
        key: `img-${img.id}`,
        url: img.url,
        alt: img.alt ?? project.title,
      });
    }
    return list;
  }, [project.imageUrl, project.images, project.title]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const goPrev = useCallback(() => {
    setLightbox((i) => {
      if (i === null || slides.length < 2) return i;
      return (i - 1 + slides.length) % slides.length;
    });
  }, [slides.length]);

  const goNext = useCallback(() => {
    setLightbox((i) => {
      if (i === null || slides.length < 2) return i;
      return (i + 1) % slides.length;
    });
  }, [slides.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, closeLightbox, goPrev, goNext]);

  const openSlide = (index: number) => {
    if (slides[index]) setLightbox(index);
  };

  return (
    <main className="project-detail-page">
      <Link href="/" className="pd-back">
        {t("project.back")}
      </Link>
      <div className="pd-meta">
        {t("project.meta")} · {year}
      </div>
      <h1>{project.title}</h1>
      <div className={`pd-status ${statusClass}`}>{statusLabel}</div>
      <p className="pd-lead">{project.description}</p>

      {project.imageUrl ? (
        <button
          type="button"
          className="pd-hero-img pd-gallery-thumb"
          data-hover
          onClick={() => openSlide(0)}
          aria-label={t("project.galleryZoom")}
        >
          <img src={project.imageUrl} alt="" />
        </button>
      ) : null}

      {project.details.trim() ? (
        <>
          <h2>{t("project.sectionDetails")}</h2>
          <div className="pd-body">
            {splitBlocks(project.details).map((block, i) => (
              <p key={i}>{block}</p>
            ))}
          </div>
        </>
      ) : null}

      {highlightItems.length > 0 ? (
        <>
          <h2>{t("project.sectionHighlights")}</h2>
          <div className="pd-highlights-list">
            <ul>
              {highlightItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      ) : null}

      {project.challenges ? (
        <>
          <h2>{t("project.sectionChallenges")}</h2>
          <div className="pd-body">
            {splitBlocks(project.challenges).map((block, i) => (
              <p key={i}>{block}</p>
            ))}
          </div>
        </>
      ) : null}

      {project.skills.length > 0 ? (
        <>
          <h2>{t("project.sectionStack")}</h2>
          <div className="pd-tags">
            {project.skills.map(({ skill }) => (
              <span key={`${project.id}-${skill.name}`}>{skill.name}</span>
            ))}
          </div>
        </>
      ) : null}

      {project.demoUrl ? (
        <>
          <h2>{t("project.demoLive")}</h2>
          <p className="pd-embed-open">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              {t("project.demoOpenTab")}
            </a>
          </p>
          <div className="pd-embed-wrap">
            <iframe
              src={project.demoUrl}
              title={t("project.demoLive")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
            />
          </div>
          <p className="pd-embed-note">{t("project.demoEmbedNote")}</p>
        </>
      ) : null}

      {project.images.length > 0 ? (
        <>
          <h2>{t("project.sectionGallery")}</h2>
          <div className="pd-gallery">
            {project.images.map((img, i) => {
              const slideIndex = (project.imageUrl ? 1 : 0) + i;
              return (
                <button
                  key={img.id}
                  type="button"
                  className="pd-gallery-thumb"
                  data-hover
                  onClick={() => openSlide(slideIndex)}
                  aria-label={t("project.galleryZoom")}
                >
                  <figure>
                    <img src={img.url} alt={img.alt ?? project.title} loading="lazy" />
                  </figure>
                </button>
              );
            })}
          </div>
        </>
      ) : null}

      <div className="pd-links">
        {project.demoUrl ? (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            {t("project.demo")}
          </a>
        ) : null}
        {project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            {t("project.code")}
          </a>
        ) : null}
      </div>

      {lightbox !== null && slides[lightbox] ? (
        <div
          className="pd-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t("project.galleryZoom")}
        >
          <button
            type="button"
            className="pd-lightbox-backdrop"
            onClick={closeLightbox}
            aria-label={t("project.lightboxClose")}
          />
          <div className="pd-lightbox-inner">
          <button
            type="button"
            className="pd-lightbox-close"
            data-hover
            onClick={closeLightbox}
            aria-label={t("project.lightboxClose")}
          >
            ×
          </button>
            {slides.length > 1 ? (
              <button
                type="button"
                className="pd-lightbox-nav pd-lightbox-prev"
                data-hover
                onClick={goPrev}
                aria-label={t("project.lightboxPrev")}
              >
                ‹
              </button>
            ) : null}
            <div className="pd-lightbox-imgwrap">
              <img src={slides[lightbox].url} alt={slides[lightbox].alt} />
            </div>
            {slides.length > 1 ? (
              <button
                type="button"
                className="pd-lightbox-nav pd-lightbox-next"
                data-hover
                onClick={goNext}
                aria-label={t("project.lightboxNext")}
              >
                ›
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </main>
  );
}
