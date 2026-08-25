"use client";

import { useEffect, ReactNode } from "react";

export type Theme = "light" | "dark";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const theme = storedTheme ?? "light";
    applyTheme(theme);
  }, []);

  return <>{children}</>;
}

export function useTheme() {
  return {
    setTheme,
    getTheme,
    toggleTheme,
  };
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

export function getTheme(): Theme {
  const stored = localStorage.getItem("theme") as Theme | null;
  return stored ?? "light";
}

export function toggleTheme() {
  const current = getTheme();
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}
