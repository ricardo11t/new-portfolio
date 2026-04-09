"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SkillGlobe from "./SkillGlobe";
import styles from "./Skills.module.css";

interface Skill {
  id: number;
  name: string;
  iconUrl: string;
  category: string;
}


interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const categories = ["todos", ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "todos" || skill.category === activeCategory
  );

  const visibleSkills = isExpanded ? filteredSkills : filteredSkills.slice(0, 8);

  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">
            Habilidades <span className="gradient-text">Técnicas</span>
          </h2>
          <p className="section-subtitle">
            Tecnologias e ferramentas que utilizo no dia a dia
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setIsExpanded(false);
                }}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ""}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {visibleSkills.map((skill, index) => (
            <ScrollReveal key={skill.id} delay={index * 50}>
              <div className={styles.skillCard}>
                <img
                  src={skill.iconUrl}
                  alt={skill.name}
                  width={32}
                  height={32}
                  className={styles.skillIcon}
                  loading="lazy"
                />
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillCategory}>{skill.category}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filteredSkills.length > 8 && (
          <ScrollReveal delay={100}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="btn btn-outline"
                style={{ padding: "12px 24px" }}
              >
                {isExpanded ? "Mostrar menos" : "Ver todas as skills"}
              </button>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={200}>
          <div style={{ marginTop: 80 }}>
             <h3 style={{ textAlign: "center", fontSize: "1.25rem", color: "var(--text-secondary)", marginBottom: 20 }}>Ecossistema de Tecnologia</h3>
             <SkillGlobe skills={skills} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
