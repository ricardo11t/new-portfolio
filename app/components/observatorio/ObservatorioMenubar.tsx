"use client";

import { useEffect, useState } from "react";
import { useObservatorio } from "./ObservatorioProviders";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function ObservatorioMenubar() {
  const { t } = useObservatorio();
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    function tick() {
      const d = new Date();
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="menubar">
      <div className="left">
        <span className="brand">
          {"\u25C6"} {t("menubar.brand")}
        </span>
        <button type="button" className="menu-item" onClick={() => scrollToId("atlas")}>
          {t("menubar.projects")}
        </button>
        <button type="button" className="menu-item" onClick={() => scrollToId("log")}>
          {t("menubar.log")}
        </button>
        <button type="button" className="menu-item" onClick={() => scrollToId("contact")}>
          {t("menubar.contact")}
        </button>
      </div>
      <div className="right">
        <span>
          <span className="kbd">Ctrl</span>
          <span className="kbd">K</span> {t("menubar.commands")}
        </span>
        <span>
          <span className="dot"></span>
          {t("menubar.available")}
        </span>
        <span id="mb-clock">{time}</span>
        <span>{t("menubar.version")}</span>
      </div>
    </div>
  );
}
