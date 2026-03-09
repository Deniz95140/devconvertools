"use client";

import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/i18n/config";

type ThemeToggleProps = {
  locale: Locale;
  modeLabel: string;
};

const lightLabelByLocale: Record<Locale, string> = {
  en: "Light",
  fr: "Clair",
  es: "Claro",
  de: "Hell",
  pt: "Claro",
  zh: "\u4eae\u8272",
  ru: "\u0421\u0432\u0435\u0442\u043b\u0430\u044f",
  ar: "\u0641\u0627\u062a\u062d",
  hi: "\u0932\u093e\u0907\u091f"
};

const darkLabelByLocale: Record<Locale, string> = {
  en: "Dark",
  fr: "Sombre",
  es: "Oscuro",
  de: "Dunkel",
  pt: "Escuro",
  zh: "\u6697\u8272",
  ru: "\u0422\u0451\u043c\u043d\u0430\u044f",
  ar: "\u062f\u0627\u0643\u0646",
  hi: "\u0921\u093e\u0930\u094d\u0915"
};

const STORAGE_KEY = "devconvertools-theme";

export function ThemeToggle({ locale, modeLabel }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.dataset.theme = stored;
      setIsReady(true);
      return;
    }

    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme(preferred);
    document.documentElement.dataset.theme = preferred;
    setIsReady(true);
  }, []);

  const currentLabel = useMemo(
    () => (theme === "light" ? lightLabelByLocale[locale] : darkLabelByLocale[locale]),
    [theme, locale]
  );

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`${modeLabel}: ${currentLabel}`}>
      {isReady ? `${modeLabel}: ${currentLabel}` : `${modeLabel}: ${darkLabelByLocale[locale]}`}
    </button>
  );
}
