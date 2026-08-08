"use client";

import { useEffect } from "react";

export function InfoModal({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-heading"
      className="fixed inset-0 z-30 flex items-end justify-center px-4 pb-6 sm:items-center sm:pb-4"
    >
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-sm rounded-[32px] border border-white/60 bg-white/95 p-6 text-center shadow-[12px_12px_28px_rgba(79,70,229,0.18),-8px_-8px_20px_rgba(255,255,255,0.8)] sm:p-8">
        <h2 id="info-modal-heading" className="font-heading text-lg font-bold text-foreground">
          {title}
        </h2>
        <p className="mt-2 font-body text-sm text-foreground/60">{message}</p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full cursor-pointer rounded-[20px] bg-accent py-3 font-heading text-base font-bold text-on-primary shadow-[0_6px_0_#c2410c,0_10px_18px_rgba(234,88,12,0.35)] transition-all duration-150 ease-out hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#c2410c,0_4px_10px_rgba(234,88,12,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
