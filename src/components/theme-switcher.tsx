"use client";

import { useState, useEffect } from "react";
import { toggleTheme, getTheme } from "@/components/theme-provider";
import type { Theme } from "@/components/theme-provider";

export function ThemeSwitcher() {
  const [theme, setCurrentTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(getTheme());
  }, []);

  if (!mounted) return null;

  const handleToggle = () => {
    toggleTheme();
    setCurrentTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 font-medium text-foreground transition-colors hover:bg-border"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <>
          🌙 Dark Mode
        </>
      ) : (
        <>
          ☀️ Light Mode
        </>
      )}
    </button>
  );
}
