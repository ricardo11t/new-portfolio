"use client";

import { useObservatorio } from "./ObservatorioProviders";

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "ricardo11t.dev@gmail.com";
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/ricardo11t";
const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/joao-ricardo";
const PHONE_DISPLAY = "+55 85 99434-8418";
const PHONE_TEL = "+5585994348418";

export default function ObservatorioContact() {
  const { t } = useObservatorio();

  return (
    <section className="console-section" id="contact">
      <h2>
        {t("contact.h2a")} <em>{t("contact.h2b")}</em> {t("contact.h2c")}
        <br />
        {t("contact.h2d")} <em>{t("contact.h2e")}</em>
        {t("contact.h2f")}
      </h2>

      <div className="console-box">
        <div className="cb-head">
          <div className="tl-btns" style={{ display: "flex", gap: 5 }}>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#6a6a6a",
                display: "inline-block",
              }}
            />
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#444",
                display: "inline-block",
              }}
            />
          </div>
          <span>{t("contact.shellTitle")}</span>
          <span style={{ marginLeft: "auto", color: "var(--fg-4)" }}>{t("contact.shellMeta")}</span>
        </div>
        <div className="cb-body">
          <div className="line">
            <span className="prompt">$</span> <span className="cmd">{t("contact.cat")}</span>
          </div>
          <div className="output">
            {t("contact.email")}{" "}
            <a href={`mailto:${EMAIL}`} target="_blank" rel="noreferrer">
              {EMAIL}
            </a>
          </div>
          <div className="output">
            {t("contact.phone")}{" "}
            <a target="blank_" href={`https://wa.me/5585994348418?text=${encodeURIComponent("Olá, me interessei pelo seu trabalho, vim pelo seu portfólio.")}`}>{PHONE_DISPLAY}</a>
          </div>
          <div className="output">
            {t("contact.github")}{" "}
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              {GITHUB_URL.replace("https://", "")}
            </a>
          </div>
          <div className="output">
            {t("contact.linkedin")}{" "}
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              /in/joao-ricardo
            </a>
          </div>
          <div className="output">
            {t("contact.langs")} {t("contact.langsVal")}
          </div>
          <div className="output">
            {t("contact.status")}{" "}
            <span style={{ color: "var(--accent)" }}>{t("contact.statusVal")}</span>
          </div>
          <div className="output" style={{ marginTop: 10 }}>
            {t("contact.cvHint")}{" "}
            <a href="/cv/curriculum-pt.pdf" download aria-label={t("contact.cvAriaPt")}>
              {t("contact.cvPt")}
            </a>
            {" · "}
            <a href="/cv/curriculum-en.pdf" download aria-label={t("contact.cvAriaEn")}>
              {t("contact.cvEn")}
            </a>
          </div>
          <div className="line" style={{ marginTop: 14 }}>
            <span className="prompt">$</span> <span className="cmd">{t("contact.prompt")}</span>
            <span className="caret"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
