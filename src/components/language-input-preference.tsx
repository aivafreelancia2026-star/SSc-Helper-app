"use client";

import { useEffect, useState } from "react";

export const TELUGU_INPUT_MODE_KEY = "ssc-helper-telugu-input-mode";
export const TELUGU_INPUT_MODE_EVENT = "ssc-helper-telugu-input-mode-changed";

export type TeluguInputMode = "typing" | "keypad-only";

const OPTIONS: Array<{
  value: TeluguInputMode;
  label: string;
  description: string;
}> = [
  {
    value: "typing",
    label: "English/Telugu typing + keypad",
    description: "Type directly or convert English letters to Telugu, with Telugu keys available.",
  },
  {
    value: "keypad-only",
    label: "Telugu keypad only",
    description: "Students answer using the app keypad only.",
  },
];

export function getStoredTeluguInputMode(): TeluguInputMode {
  if (typeof window === "undefined") return "typing";
  return localStorage.getItem(TELUGU_INPUT_MODE_KEY) === "keypad-only" ? "keypad-only" : "typing";
}

export function LanguageInputPreference() {
  const [mode, setMode] = useState<TeluguInputMode>("typing");

  useEffect(() => {
    setMode(getStoredTeluguInputMode());
  }, []);

  function updateMode(nextMode: TeluguInputMode) {
    setMode(nextMode);
    localStorage.setItem(TELUGU_INPUT_MODE_KEY, nextMode);
    window.dispatchEvent(new CustomEvent(TELUGU_INPUT_MODE_EVENT, { detail: nextMode }));
  }

  return (
    <section className="relative z-10 w-full max-w-sm rounded-[24px] border border-white/60 bg-white/80 p-5 shadow-[8px_8px_18px_rgba(79,70,229,0.1),-6px_-6px_14px_rgba(255,255,255,0.75)] backdrop-blur-sm">
      <div className="space-y-1 text-left">
        <h2 className="font-heading text-base font-bold text-foreground">Telugu answer input</h2>
        <p className="font-body text-xs leading-relaxed text-foreground/60">
          Choose how Telugu answers should be entered on this device.
        </p>
      </div>

      <div className="mt-4 space-y-2">
        {OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`block cursor-pointer rounded-[16px] border p-3 text-left transition-colors ${
              mode === option.value
                ? "border-primary bg-primary/10"
                : "border-border/60 bg-white/70 hover:bg-primary/5"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="telugu-input-mode"
                checked={mode === option.value}
                onChange={() => updateMode(option.value)}
                className="mt-1"
              />
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">{option.label}</p>
                <p className="mt-1 font-body text-xs leading-relaxed text-foreground/60">
                  {option.description}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
