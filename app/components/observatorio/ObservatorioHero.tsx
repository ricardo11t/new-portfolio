"use client";

import SkyCanvas from "./SkyCanvas";
import FloatingBigClock from "./FloatingBigClock";
import { buildStackRows } from "./stack-from-skills";
import { useObservatorio } from "./ObservatorioProviders";

type Skill = { name: string; category: string };

export default function ObservatorioHero({ skills }: { skills: Skill[] }) {
  const { t, theme } = useObservatorio();
  const stack = buildStackRows(skills);

  return (
    <section className="hero">
      <SkyCanvas theme={theme} />

      <div className="hero-content">
        <div className="prompt-line">
          <span className="user">{t("hero.user")}</span>
          <span className="path">~/</span>
          <span>$</span>
          <span className="cmd">{t("hero.cmd")}</span>
        </div>
        <h1>
          <span className="glitch-hover">Ricardo</span>
          <br />
          <span className="glitch-hover">Holanda</span>
          <span className="em">.</span>
          <span className="caret"></span>
        </h1>
        <p className="tagline">{t("hero.tagline")}</p>
      </div>

      <div className="window w-stack">
        <div className="titlebar">
          <div className="tl-btns">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="title">{t("hero.stackTitle")}</span>
          <span className="meta">rw</span>
        </div>
        <div className="content">
          {stack.map((row) => (
            <div key={row.k} className="stack-row">
              <span className="k">{row.k}</span>
              <span className="v">
                {"accent" in row ? (
                  <>
                    {row.v} <span className="accent">{row.accent}</span>
                  </>
                ) : (
                  row.v
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="window w-clock">
        <div className="titlebar">
          <div className="tl-btns">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="title">{t("hero.clockTitle")}</span>
        </div>
        <div className="content">
          <FloatingBigClock />
          <div className="tz">{t("hero.tz")}</div>
          <div className="coords">{t("hero.coords")}</div>
        </div>
      </div>

      <div className="window w-now">
        <div className="titlebar">
          <div className="tl-btns">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="title">{t("hero.nowTitle")}</span>
          <span className="meta">{t("hero.nowMeta")}</span>
        </div>
        <div className="content">
          <div className="now-head">{t("hero.nowHead")}</div>
          <ul className="now-list">
            <li>{t("hero.now1")}</li>
            <li>{t("hero.now2")}</li>
            <li>{t("hero.now3")}</li>
            <li>{t("hero.now4")}</li>
          </ul>
        </div>
      </div>

      <div className="sky-hint">{t("hero.skyHint")}</div>

      <div className="ascii-sig" aria-hidden="true">
        {t("hero.asciiLine1")}
        {"\n"} │ {t("hero.asciiLine2")}
      </div>
    </section>
  );
}
