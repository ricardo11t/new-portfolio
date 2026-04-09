import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <span className={styles.name}>Ricardo Holanda</span>
            <span className={styles.tagline}>Desenvolvedor Fullstack</span>
          </div>

          <div className={styles.socials}>
            <a
              href="https://github.com/ricardo11t"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/joão-ricardo-257059363"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="mailto:ricardo11t.dev@gmail.com"
              className={styles.socialLink}
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <div className={styles.copyright}>
            <span>
              © {new Date().getFullYear()} · Ricardo Holanda
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
