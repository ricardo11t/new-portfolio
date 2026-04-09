"use client";

import { useEffect, useRef, useState } from "react";
import { X, ExternalLink, Sparkles, AlertTriangle } from "lucide-react";
import { GithubIcon } from "./Icons";
import type { ProjectData } from "./ProjectCard";
import styles from "./ProjectModal.module.css";

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.offsetWidth;
    const index = Math.round(scrollRef.current.scrollLeft / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Auto-focus the close button
    setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>("button")?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const highlights: string[] = project.highlights
    ? JSON.parse(project.highlights)
    : [];

  const statusLabel =
    project.status === "completed" ? "Concluído" : "Em desenvolvimento";

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.scrollBehavior = 'auto';
  };

  const handlePointerLeave = () => {
    if (isDragging) setIsDragging(false);
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollRef.current) {
        const width = scrollRef.current.offsetWidth;
        const index = Math.round(scrollRef.current.scrollLeft / width);
        scrollRef.current.style.scrollBehavior = 'smooth';
        scrollRef.current.scrollTo({ left: index * width, behavior: 'smooth' });
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do projeto: ${project.title}`}
    >
      <div ref={modalRef} className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.titleRow}>
              <h2 className={styles.title}>{project.title}</h2>
              <span
                className={`badge badge-status ${project.status === "completed" ? "completed" : "in_progress"}`}
              >
                {statusLabel}
              </span>
            </div>
            <div className="gap-20">
              <div className={styles.headerSkills}>
                {project.skills.map(({ skill }) => (
                  <span key={skill.id} className={styles.skillTag}>
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      width={16}
                      height={16}
                      className={styles.skillIcon}
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div
                ref={scrollRef}
                onPointerDown={handlePointerDown}
                onPointerLeave={handlePointerLeave}
                onPointerUp={handlePointerUp}
                onPointerMove={handlePointerMove}
                onScroll={handleScroll}
                style={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 0,
                  cursor: isDragging ? "grabbing" : "grab",
                  userSelect: "none",
                  touchAction: "pan-x",
                  scrollbarWidth: "none",
                  scrollSnapType: isDragging ? "none" : "x mandatory"
                }}
              >
                {project.images.map((img) => (
                  <img
                    key={img.id}
                    src={img.url}
                    alt={img.alt || "Project Image"}
                    style={{
                      width: "100%",
                      flexShrink: 0,
                      height: "auto",
                      maxHeight: "500px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      objectFit: "contain",
                      pointerEvents: "none",
                      scrollSnapAlign: "center"
                    }}
                    draggable="false"
                  />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "12px" }}>
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                        scrollRef.current?.scrollTo({ left: idx * (scrollRef.current?.offsetWidth || 0), behavior: 'smooth' });
                    }}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: idx === currentIndex ? "var(--text-primary)" : "var(--border-color)",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "background-color 0.2s"
                    }}
                    aria-label={`Ir para imagem ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
          {/* Description */}
          <div className={styles.detailSection}>
            <p className={styles.details}>{project.details}</p>
          </div>

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>
                <Sparkles size={18} className={styles.sectionIcon} />
                Destaques
              </h3>
              <ul className={styles.highlightList}>
                {highlights.map((h, i) => (
                  <li key={i} className={styles.highlightItem}>
                    <span className={styles.highlightDot} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && (
            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>
                <AlertTriangle size={18} className={styles.sectionIcon} />
                Desafios & Soluções
              </h3>
              <p className={styles.challengeText}>{project.challenges}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <GithubIcon size={16} />
              Código Fonte
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <ExternalLink size={16} />
              Ver Demo
            </a>
          )}
          <button onClick={onClose} className="btn btn-ghost" style={{ marginLeft: "auto" }}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
