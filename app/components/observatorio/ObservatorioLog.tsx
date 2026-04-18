"use client";

import { useObservatorio } from "./ObservatorioProviders";

export default function ObservatorioLog() {
  const { t, locale } = useObservatorio();

  return (
    <section className="log" id="log">
      <div className="sidebar">
        <div className="k">{t("log.k")}</div>
        <h2>
          {t("log.h1a")}
          <br />
          {t("log.h1b")}
          <br />
          {t("log.h1c")} <em>{t("log.h1d")}</em>
          <br />
          {locale === "en" ? (
            <>
              <em>{t("log.h1e")}</em>
              {t("log.h1f")}
            </>
          ) : (
            <>
              {t("log.h1e")} <em>{t("log.h1f")}</em>
            </>
          )}
        </h2>
        <div className="more">
          <strong>{t("log.lat")}</strong> -03.73
          <br />
          <strong>{t("log.lon")}</strong> -38.52
          <br />
          <strong>{t("log.tz")}</strong> {t("log.tzVal")}
          <br />
          <strong>{t("log.uptime")}</strong> {t("log.uptimeVal")}
        </div>
      </div>
      <div className="body">
        <div className="entry">
          <span className="date">{t("log.e1d")}</span>
          <div>
            <h4>{t("log.e1t")}</h4>
            <p>{t("log.e1p")}</p>
          </div>
        </div>
        <div className="entry">
          <span className="date">{t("log.e2d")}</span>
          <div>
            <h4>{t("log.e2t")}</h4>
            <p>{t("log.e2p")}</p>
          </div>
        </div>
        <div className="entry">
          <span className="date">{t("log.e3d")}</span>
          <div>
            <h4>{t("log.e3t")}</h4>
            <p>
              {t("log.e3pBefore")} <code>500</code>
              {t("log.e3pAfter")}
            </p>
          </div>
        </div>
        <div className="entry">
          <span className="date">{t("log.e4d")}</span>
          <div>
            <h4>{t("log.e4t")}</h4>
            <p>{t("log.e4p")}</p>
          </div>
        </div>
        <div className="entry">
          <span className="date">{t("log.e5d")}</span>
          <div>
            <h4>{t("log.e5t")}</h4>
            <p>{t("log.e5p")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
