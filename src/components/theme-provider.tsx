"use client";

import { useEffect, ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const theme = storedTheme ?? "system";
    applyTheme(theme);
  }, []);

  return <>{children}</>;
}

export function useTheme() {
  return {
    setTheme,
    getTheme,
  };
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  if (theme === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }

  localStorage.setItem("theme", theme);
}

export function getTheme(): Theme {
  const stored = localStorage.getItem("theme") as Theme | null;
  return stored ?? "system";
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}
