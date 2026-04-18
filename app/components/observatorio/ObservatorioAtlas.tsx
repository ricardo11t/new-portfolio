"use client";

import AtlasTrack from "./AtlasTrack";
import { ChartViz } from "./chart-viz";
import { useObservatorio } from "./ObservatorioProviders";

export type AtlasProject = {
  id: number;
  title: string;
  slug: string;
  description: string;
  status: string;
  createdAt: string;
  skills: { skill: { name: string; category: string } }[];
};

function coordForIndex(i: number) {
  const raH = (4 + i * 5) % 24;
  const raM = (32 + i * 7) % 60;
  const dec = 18 - i * 11;
  const decStr = `${dec >= 0 ? "+" : ""}${dec}`;
  return `RA ${String(raH).padStart(2, "0")}h ${String(raM).padStart(2, "0")}m — DEC ${decStr}°`;
}

function TitleLine({ title }: { title: string }) {
  const parts = title.trim().split(/\s+/);
  if (parts.length <= 1) {
    return (
      <h3>
        <span className="i">{title}</span>
      </h3>
    );
  }
  const head = parts.slice(0, -1).join(" ");
  const tail = parts[parts.length - 1];
  return (
    <h3>
      {head} <span className="i">{tail}</span>
    </h3>
  );
}

export default function ObservatorioAtlas({ projects }: { projects: AtlasProject[] }) {
  const { t } = useObservatorio();
  const countLabel = String(Math.max(projects.length, 1)).padStart(2, "0");
  const idxParts = t("atlas.idx").split(/\s+—\s+/);

  return (
    <section className="atlas" id="atlas">
      <div className="atlas-head">
        <span className="idx">
          {idxParts[0]}
          {idxParts[1] ? (
            <>
              {" "}
              <span className="sep">—</span> {idxParts[1]}
            </>
          ) : null}
        </span>
        <span className="counter">
          <em>{countLabel}</em> {t("atlas.counterSuffix")}
        </span>
      </div>
      <div className="atlas-title">
        <h2>
          {t("atlas.title1")} <em>{t("atlas.titleEm")}</em>
          <br />
          {t("atlas.title2")}
        </h2>
        <div className="scroll-hint">
          <span>{t("atlas.scrollHint")}</span>
          <span className="kbd">←</span>
          <span className="kbd">→</span>
        </div>
      </div>

      <AtlasTrack>
        {projects.length === 0 ? (
          <article className="chart">
            <div className="coord">
              <span>RA 00h 00m — DEC +00°</span>
              <span className="tag">
                ★ {t("atlas.emptyTag")}
              </span>
            </div>
            <div className="viz">
              <span className="lbl">{t("atlas.emptyLbl")}</span>
              <span className="lbl-code">{t("atlas.emptyCode")}</span>
              <ChartViz variant={0} />
              <span className="status live">{t("atlas.emptyStatus")}</span>
            </div>
            <div className="info">
              <div className="num">{t("atlas.emptyNum")}</div>
              <h3>
                {t("atlas.emptyTitle")} <span className="i">{t("atlas.emptyTitleEm")}</span>
              </h3>
              <p>{t("atlas.emptyDesc")}</p>
            </div>
          </article>
        ) : (
          projects.map((project, i) => {
            const done = project.status === "completed";
            const isMeta = /portfolio/i.test(project.slug);
            const tag =
              project.skills[0]?.skill.category?.toUpperCase() ??
              (done ? t("atlas.statusProd").toUpperCase() : "DEV");
            const year = new Date(project.createdAt).getFullYear();
            const statusClass = isMeta ? "done" : done ? "done" : "live";
            const statusLabel = isMeta
              ? t("atlas.statusHere")
              : done
                ? t("atlas.statusProd")
                : t("atlas.statusDev");

            return (
              <article key={project.id} className="chart">
                <div className="coord">
                  <span>{coordForIndex(i)}</span>
                  <span className="tag">★ {tag}</span>
                </div>
                <div className="viz">
                  <span className="lbl">
                    chart.{String(i + 1).padStart(2, "0")} — {t("atlas.vizLbl")}
                  </span>
                  <span className="lbl-code">/{project.slug}/app/page.tsx</span>
                  <ChartViz variant={i} />
                  <span className={`status ${statusClass}`}>{statusLabel}</span>
                </div>
                <div className="info">
                  <div className="num">
                    PROJ / {String(i + 1).padStart(2, "0")} · {year}
                  </div>
                  <TitleLine title={project.title} />
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.skills.slice(0, 8).map(({ skill }) => (
                      <span key={`${project.id}-${skill.name}`}>{skill.name}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </AtlasTrack>
    </section>
  );
}
