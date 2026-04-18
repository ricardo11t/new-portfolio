"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Locale } from "./i18n/dictionaries";

export type ObsTheme = "dark" | "light";

type ObsCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: ObsTheme;
  setTheme: (t: ObsTheme) => void;
  toggleTheme: () => void;
  toggleLocale: () => void;
  t: (key: string) => string;
};

const ObsCtx = createContext<ObsCtx | null>(null);

const STORAGE_LOCALE = "obs-locale";
const STORAGE_THEME = "obs-theme";

export function useObservatorio() {
  const v = useContext(ObsCtx);
  if (!v) throw new Error("useObservatorio must be used inside ObservatorioProviders");
  return v;
}

export function ObservatorioProviders({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");
  const [theme, setThemeState] = useState<ObsTheme>("dark");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const l = localStorage.getItem(STORAGE_LOCALE) as Locale | null;
    const th = localStorage.getItem(STORAGE_THEME) as ObsTheme | null;
    if (l === "en" || l === "pt") setLocaleState(l);
    if (th === "light" || th === "dark") setThemeState(th);
    setHydrated(true);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_LOCALE, l);
    document.documentElement.lang = l === "en" ? "en" : "pt-BR";
  }, []);

  const setTheme = useCallback((t: ObsTheme) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_THEME, t);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: ObsTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_THEME, next);
      return next;
    });
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "pt" ? "en" : "pt");
  }, [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "pt-BR";
  }, [locale]);

  const t = useCallback(
    (key: string) => {
      const table = dictionaries[locale] as Record<string, string>;
      return table[key] ?? key;
    },
    [locale],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      theme,
      setTheme,
      toggleTheme,
      toggleLocale,
      t,
    }),
    [locale, setLocale, theme, setTheme, toggleTheme, toggleLocale, t],
  );

  if (!hydrated) {
    return (
      <ObsCtx.Provider value={value}>
        <div className="obs-portfolio grain" data-obs-theme="dark" data-obs-locale="pt" suppressHydrationWarning>
          <div className="obs-portfolio-surface">{children}</div>
        </div>
      </ObsCtx.Provider>
    );
  }

  return (
    <ObsCtx.Provider value={value}>
      <div className="obs-portfolio grain" data-obs-theme={theme} data-obs-locale={locale}>
        <div className="obs-portfolio-surface">{children}</div>
      </div>
    </ObsCtx.Provider>
  );
}
