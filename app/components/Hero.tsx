"use client";

import { useEffect, useRef } from "react";
import { Mail, Download, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import styles from "./Hero.module.css";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBelow = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.particles} />

      <div className={styles.content}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <span className={styles.avatarText}>RH</span>
          </div>
          <div className={styles.avatarGlow} />
        </div>

        <h1 className={styles.title}>
          Desenvolvedor{" "}
          <span className="gradient-text">Fullstack</span>
        </h1>

        <p className={styles.subtitle}>
          Criando soluções web modernas usando principalmente TypeScript com frameworks como Next.js e NestJS.
          Apaixonado por código limpo, performance e experiências incríveis.
        </p>

        <div className={styles.ctas}>
          <button onClick={scrollToProjects} className="btn btn-primary">
            Ver Projetos
          </button>
          <a
            href="/Currículo - João Ricardo Holanda Lima.pdf"
            download
            className="btn btn-outline"
          >
            <Download size={16} />
            Download CV
          </a>
        </div>

        <div className={styles.socials}>
          <a
            href="https://github.com/ricardo11t"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/joão-ricardo-257059363"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="mailto:ricardo11t.dev@gmail.com"
            className={styles.socialLink}
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      <button
        onClick={scrollToBelow}
        className={styles.scrollIndicator}
        aria-label="Rolar para baixo"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}
