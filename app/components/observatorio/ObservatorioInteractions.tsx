"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useObservatorio } from "./ObservatorioProviders";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "ricardo11t.dev@gmail.com";
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/ricardo11t";
const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/joao-ricardo";
const REPO_URL =
  process.env.NEXT_PUBLIC_PORTFOLIO_REPO_URL ?? "https://github.com/ricardo11t/new-portfolio";

type Cmd = { label: string; hint: string; action: () => void };

function parseThemeCommand(raw: string): "dark" | "light" | "toggle" | null {
  const q = raw.trim();
  if (/^(theme|tema)\s*:\s*(dark|escuro)\b/i.test(q)) return "dark";
  if (/^(theme|tema)\s*:\s*(light|claro)\b/i.test(q)) return "light";
  if (/^(theme|tema)\s*:\s*toggle\b/i.test(q) || /^(theme|tema)\s+toggle\b/i.test(q)) return "toggle";
  return null;
}

function parseLangCommand(raw: string): "pt" | "en" | "toggle" | null {
  const q = raw.trim();
  if (/^(lang|idioma|language)\s*:\s*(pt|br|portuguese|português)\b/i.test(q)) return "pt";
  if (/^(lang|idioma|language)\s*:\s*(en|english|inglês)\b/i.test(q)) return "en";
  if (/^(lang|idioma|language)\s*:\s*toggle\b/i.test(q) || /^(lang|idioma|language)\s+toggle\b/i.test(q))
    return "toggle";
  return null;
}

export default function ObservatorioInteractions() {
  const { t, setTheme, setLocale, toggleTheme, toggleLocale, theme, locale } = useObservatorio();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }, []);

  const commands = useMemo<Cmd[]>(
    () => [
      {
        label: t("cmd.scrollProjects"),
        hint: "enter",
        action: () => document.getElementById("atlas")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: t("cmd.scrollLog"),
        hint: "enter",
        action: () => document.getElementById("log")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: t("cmd.scrollContact"),
        hint: "enter",
        action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: t("cmd.themeLight"),
        hint: "enter",
        action: () => {
          setTheme("light");
          showToast(t("toast.themeLight"));
        },
      },
      {
        label: t("cmd.themeDark"),
        hint: "enter",
        action: () => {
          setTheme("dark");
          showToast(t("toast.themeDark"));
        },
      },
      {
        label: t("cmd.themeToggle"),
        hint: "enter",
        action: () => {
          toggleTheme();
          showToast(t("toast.themeToggle"));
        },
      },
      {
        label: t("cmd.langPt"),
        hint: "enter",
        action: () => {
          setLocale("pt");
          showToast(t("toast.langPt"));
        },
      },
      {
        label: t("cmd.langEn"),
        hint: "enter",
        action: () => {
          setLocale("en");
          showToast(t("toast.langEn"));
        },
      },
      {
        label: t("cmd.langToggle"),
        hint: "enter",
        action: () => {
          toggleLocale();
          showToast(t("toast.langToggle"));
        },
      },
      {
        label: t("cmd.copyEmail"),
        hint: "enter",
        action: () => {
          void navigator.clipboard?.writeText(CONTACT_EMAIL);
          showToast(t("toast.email"));
        },
      },
      {
        label: t("cmd.github"),
        hint: "enter",
        action: () => window.open(GITHUB_URL, "_blank"),
      },
      {
        label: t("cmd.linkedin"),
        hint: "enter",
        action: () => window.open(LINKEDIN_URL, "_blank"),
      },
      {
        label: t("cmd.hire"),
        hint: "*",
        action: () => {
          showToast(t("toast.hire"));
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        label: t("cmd.konami"),
        hint: "?",
        action: () => showToast(t("toast.konami")),
      },
      {
        label: t("cmd.viewSource"),
        hint: "enter",
        action: () => window.open(REPO_URL, "_blank"),
      },
    ],
    [t, setTheme, setLocale, toggleTheme, toggleLocale, showToast],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return commands
      .map((c, idx) => ({ c, idx }))
      .filter(({ c }) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    setSel(0);
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const runSpecial = useCallback(
    (raw: string): boolean => {
      const th = parseThemeCommand(raw);
      if (th === "dark") {
        setTheme("dark");
        showToast(t("toast.themeDark"));
        return true;
      }
      if (th === "light") {
        setTheme("light");
        showToast(t("toast.themeLight"));
        return true;
      }
      if (th === "toggle") {
        toggleTheme();
        showToast(t("toast.themeToggle"));
        return true;
      }
      const lang = parseLangCommand(raw);
      if (lang === "pt") {
        setLocale("pt");
        showToast(t("toast.langPt"));
        return true;
      }
      if (lang === "en") {
        setLocale("en");
        showToast(t("toast.langEn"));
        return true;
      }
      if (lang === "toggle") {
        toggleLocale();
        showToast(t("toast.langToggle"));
        return true;
      }
      const q = raw.trim().toLowerCase();
      if (/^sudo\s+hire-?me\b/.test(q)) {
        showToast(t("toast.hire"));
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        return true;
      }
      return false;
    },
    [setTheme, setLocale, toggleTheme, toggleLocale, showToast, t],
  );

  const run = useCallback(
    (globalIdx: number) => {
      commands[globalIdx]?.action();
      close();
    },
    [commands, close],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        setQuery("");
        setSel(0);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;

    const root = document.querySelector(".obs-portfolio");
    if (!root) return;

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    root.appendChild(dot);
    root.appendChild(ring);

    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let rx = mx;
    let ry = my;
    let dx = mx;
    let dy = my;
    let raf = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }

    function tick() {
      dx += (mx - dx) * 0.6;
      dy += (my - dy) * 0.6;
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    }

    const hoverSel =
      "a, button, [data-hover], .chart, .menu-item, .cp-item, .w-stack, .w-now, .w-clock, h1 .glitch-hover";

    function onOver(e: MouseEvent) {
      if ((e.target as HTMLElement).closest(hoverSel)) ring.classList.add("hover");
    }
    function onOut(e: MouseEvent) {
      if ((e.target as HTMLElement).closest(hoverSel)) ring.classList.remove("hover");
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      dot.remove();
      ring.remove();
    };
  }, [theme, locale]);

  useEffect(() => {
    const seq = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let i = 0;
    function onKey(e: KeyboardEvent) {
      if (open) return;
      if (e.key.toLowerCase() === seq[i].toLowerCase()) {
        i++;
        if (i === seq.length) {
          document.body.style.transition = "filter 0.4s";
          document.body.style.filter = "hue-rotate(160deg) saturate(1.3)";
          showToast(t("toast.chaos"));
          i = 0;
        }
      } else i = 0;
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, showToast, t]);

  function onPaletteKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") close();
    if (e.key === "Enter") {
      const item = filtered[sel];
      if (item) run(item.idx);
      else if (runSpecial(query)) close();
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!filtered.length) return;
      const next =
        e.key === "ArrowDown"
          ? (sel + 1) % filtered.length
          : (sel - 1 + filtered.length) % filtered.length;
      setSel(next);
    }
  }

  return (
    <>
      <div
        className={`cp-backdrop${open ? " open" : ""}`}
        id="cpBack"
        onClick={close}
        role="presentation"
      />
      <div className={`cmd-palette${open ? " open" : ""}`} id="cp">
        <div className="cp-head">
          <span className="arrow">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            className="cp-input"
            placeholder={t("cp.placeholder")}
            id="cpInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onPaletteKey}
          />
          <span style={{ color: "var(--fg-4)", fontSize: 10 }}>ESC</span>
        </div>
        <div className="cp-results" id="cpResults">
          {filtered.length === 0 ? (
            <div className="cp-item" style={{ color: "var(--fg-4)" }}>
              {t("cp.empty")}
            </div>
          ) : (
            filtered.map((row, i) => (
              <button
                type="button"
                key={row.idx}
                className={`cp-item${i === sel ? " sel" : ""}`}
                data-idx={row.idx}
                onClick={() => run(row.idx)}
              >
                <span>{row.c.label}</span>
                <span className="hint">{row.c.hint}</span>
              </button>
            ))
          )}
        </div>
      </div>

      <div className={`toast${toast ? " show" : ""}`} id="toast" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
