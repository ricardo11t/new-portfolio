import ScrollReveal from "./ScrollReveal";
import { Mail, ArrowUpRight, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import styles from "./Contact.module.css";

const CONTACTS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+55 (85) 99434-8418",
    href: "https://wa.me/5585994348418", // Configure seu número aqui
    color: "#25D366",
  },
  {
    icon: Mail,
    label: "Email",
    value: "ricardo11t.dev@gmail.com",
    href: "mailto:ricardo11t.dev@gmail.com",
    color: "#6366f1",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "João Ricardo",
    href: "https://www.linkedin.com/in/joão-ricardo-257059363",
    color: "#0077b5",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "ricardo11t",
    href: "https://github.com/ricardo11t",
    color: "#333",
  },
];

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">
            Vamos <span className="gradient-text">Conversar</span>?
          </h2>
          <p className="section-subtitle">
            Estou sempre aberto a novas oportunidades e projetos interessantes
          </p>
        </ScrollReveal>

        <div className={styles.cards}>
          {CONTACTS.map((contact, i) => (
            <ScrollReveal key={contact.label} delay={i * 100}>
              <a
                href={contact.href}
                target={contact.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div
                  className={styles.iconWrapper}
                  style={{ background: `${contact.color}15`, color: contact.color }}
                >
                  <contact.icon size={24} />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>{contact.label}</span>
                  <span className={styles.cardValue}>{contact.value}</span>
                </div>
                <ArrowUpRight size={18} className={styles.arrow} />
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className={styles.cta} style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <a
              href="https://wa.me/5585994348418?text=Olá!%20Vi%20seu%20portfólio%20e%20gostaria%20de%20conversar%20com%20você." // Configure seu whatsapp aqui
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: "1rem", padding: "14px 32px", background: "#25D366", borderColor: "#25D366" }}
            >
              <MessageCircle size={18} />
              Iniciar Conversa
            </a>

            <a
              href="mailto:ricardo11t.dev@gmail.com"
              className="btn btn-outline"
              style={{ fontSize: "1rem", padding: "14px 32px" }}
            >
              <Mail size={18} />
              Email
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
