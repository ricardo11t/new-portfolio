"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ScrollReveal from "./ScrollReveal";
import type { ProjectData } from "./ProjectCard";
import styles from "./ProjectsSection.module.css";

export default function ProjectsSection({
  projects,
}: {
  projects: ProjectData[];
}) {
  const [modalProject, setModalProject] = useState<ProjectData | null>(null);
  const [filter, setFilter] = useState<string>("all");

  // Get unique skill names from all projects
  const allSkillNames = Array.from(
    new Set(
      projects.flatMap((p) => p.skills.map(({ skill }) => skill.name))
    )
  ).sort();

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) =>
          p.skills.some(({ skill }) => skill.name === filter)
        );

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">
            Meus <span className="gradient-text">Projetos</span>
          </h2>
          <p className="section-subtitle">
            Projetos pessoais e profissionais que demonstram minhas habilidades
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className={styles.filters}>
            <button
              onClick={() => setFilter("all")}
              className={`${styles.filterBtn} ${filter === "all" ? styles.filterActive : ""}`}
            >
              Todos
            </button>
            {allSkillNames.slice(0, 6).map((name) => (
              <button
                key={name}
                onClick={() => setFilter(name)}
                className={`${styles.filterBtn} ${filter === name ? styles.filterActive : ""}`}
              >
                {name}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {filtered.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 100}>
              <ProjectCard
                project={project}
                onOpenModal={setModalProject}
              />
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={styles.empty}>
            Nenhum projeto encontrado com esse filtro.
          </p>
        )}
      </div>

      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
}
