"use client";

import { useState, useEffect } from "react";
import { setTheme, getTheme } from "@/components/theme-provider";
import type { Theme } from "@/components/theme-provider";

export function ThemeSwitcher() {
  const [theme, setCurrentTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(getTheme());
  }, []);

  if (!mounted) return null;

  const handleThemeChange = (newTheme: Theme) => {
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-foreground">Theme</label>
      <div className="flex gap-2">
        {(["light", "dark", "system"] as const).map((t) => (
          <button
            key={t}
            onClick={() => handleThemeChange(t)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              theme === t
                ? "bg-primary text-on-primary"
                : "bg-muted text-foreground hover:bg-border"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
