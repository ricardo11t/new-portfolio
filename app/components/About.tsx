import ScrollReveal from "./ScrollReveal";
import { Globe, Database, Monitor, Code2 } from "lucide-react";
import styles from "./About.module.css";
import AboutGallery from "./AboutGallery";

type AboutImageItem = {
  id: number;
  createdAt: Date;
  url: string;
  alt: string | null;
};

const STATS = [
  { label: "Experiência", value: "2+ anos" },
  { label: "Projetos", value: "10+" },
  { label: "Tecnologias", value: "15+" },
];

const AREAS = [
  { icon: Globe, label: "Frontend", color: "#6366f1" },
  { icon: Database, label: "Backend", color: "#22c55e" },
  { icon: Monitor, label: "Desktop", color: "#a855f7" },
  { icon: Code2, label: "APIs", color: "#f59e0b" },
];

export default function About({ images = [] }: { images?: AboutImageItem[] }) {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <p className="section-subtitle">
            Desenvolvedor apaixonado por criar soluções eficientes e escaláveis
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          <ScrollReveal className={styles.textCol} delay={120}>
            <p className={styles.paragraph}>
              Tenho experiência com frameworks como <strong>Next.js</strong>,{" "}
              <strong>NestJS</strong>, <strong>Spring Boot</strong>, linguagens como <strong>TypeScript</strong>, {" "} 
              <strong>Java</strong>, <strong>Python</strong> e bancos de
              dados relacionais como <strong>PostgreSQL</strong> e <strong>MySQL</strong>. Gosto de criar soluções eficientes e
              escaláveis, sempre focando na experiência do usuário.
            </p>
            <p className={styles.paragraph}>
              Já participei de projetos colaborativos, contribuindo tanto no
              frontend quanto no backend, e estou sempre aberto a aprender novas
              tecnologias e metodologias.
            </p>
            <p className={styles.paragraph}>
              Meu objetivo é crescer como desenvolvedor, contribuir para
              projetos inovadores e ajudar empresas a alcançarem seus objetivos
              através da tecnologia.
            </p>

            <div className={styles.areas}>
              {AREAS.map((area) => (
                <div key={area.label} className={styles.area}>
                  <area.icon size={20} style={{ color: area.color }} />
                  <span>{area.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className={styles.rightCol} delay={200}>
            <AboutGallery images={images} />

            <div className={styles.statsSection}>
              <div className={styles.statsGrid}>
                {STATS.map((stat) => (
                  <div key={stat.label} className={styles.statCard}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
