"use client";

import { useObservatorio } from "./ObservatorioProviders";

export default function ObservatorioFooter() {
  const { t } = useObservatorio();

  return (
    <footer className="footer">
      <span>{t("footer.copy")}</span>
      <span>
        <span
          className="kbd"
          style={{ padding: "1px 6px", border: "1px solid var(--fg-4)", borderRadius: 3, fontSize: 10 }}
        >
          Ctrl+K
        </span>{" "}
        {t("footer.search")}
      </span>
      <span>{t("footer.build")}</span>
    </footer>
  );
}
