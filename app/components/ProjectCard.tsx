"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import styles from "./ProjectCard.module.css";

interface Skill {
  id: number;
  name: string;
  iconUrl: string;
  category: string;
}

export interface ProjectData {
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
  featured: boolean;
  displayOrder: number;
  skills: { skill: Skill }[];
  images?: { id: number; url: string; alt: string | null }[];
}

interface ProjectCardProps {
  project: ProjectData;
  onOpenModal: (project: ProjectData) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const statusLabel = project.status === "completed" ? "Concluído" : "Em desenvolvimento";

  return (
    <article
      className={`${styles.card} ${project.featured ? styles.featured : ""}`}
      onClick={() => onOpenModal(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenModal(project);
        }
      }}
      aria-label={`Ver detalhes do projeto ${project.title}`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={`badge badge-status ${project.status === "completed" ? "completed" : "in_progress"}`}>
            {statusLabel}
          </span>
        </div>
        <p className={styles.description}>{project.description}</p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.skills}>
          {project.skills.slice(0, 5).map(({ skill }) => (
            <span key={skill.id} className={styles.skillBadge}>
              <img
                src={skill.iconUrl}
                alt={skill.name}
                width={14}
                height={14}
                className={styles.skillIcon}
                loading="lazy"
              />
              {skill.name}
            </span>
          ))}
          {project.skills.length > 5 && (
            <span className={styles.skillBadge}>+{project.skills.length - 5}</span>
          )}
        </div>

        <div className={styles.actions}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionLink}
              onClick={(e) => e.stopPropagation()}
              aria-label="Ver código no GitHub"
            >
              <GithubIcon size={16} />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionLink}
              onClick={(e) => e.stopPropagation()}
              aria-label="Ver demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
          <span className={styles.viewDetails}>Ver detalhes →</span>
        </div>
      </div>

      {project.featured && <div className={styles.featuredBadge}>★</div>}
    </article>
  );
}
