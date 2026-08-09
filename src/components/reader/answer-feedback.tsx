"use client";

import { useEffect } from "react";

const CONFETTI = ["🎉", "🎊", "✨", "⭐", "🎈", "💥"];

// Brief full-screen overlay shown right when an answer is scored — a
// celebration burst for correct, a gentle "aw" for wrong — then
// auto-dismisses. Purely a visual reaction to the +1/-1 that already
// happened; doesn't affect scoring itself.
export function AnswerFeedback({
  correct,
  onDone,
}: {
  correct: boolean;
  onDone: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1400);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
      {correct ? (
        <div className="relative">
          {CONFETTI.map((emoji, i) => {
            const angle = (i / CONFETTI.length) * 360;
            const distance = 70;
            const dx = Math.cos((angle * Math.PI) / 180) * distance;
            return (
              <span
                key={i}
                className="animate-confetti absolute left-1/2 top-1/2 text-2xl"
                style={{
                  transform: `translate(${dx}px, 0)`,
                  animationDelay: `${i * 40}ms`,
                }}
              >
                {emoji}
              </span>
            );
          })}
          <div className="animate-pop-in rounded-[24px] bg-white px-6 py-4 text-center shadow-[0_10px_30px_rgba(79,70,229,0.35)]">
            <p className="text-3xl">🎉</p>
            <p className="mt-1 font-heading text-base font-bold text-primary">Correct! +1</p>
          </div>
        </div>
      ) : (
        <div className="animate-shake-sad rounded-[24px] bg-white px-6 py-4 text-center shadow-[0_10px_30px_rgba(220,38,38,0.25)]">
          <p className="text-3xl">😢</p>
          <p className="mt-1 font-heading text-base font-bold text-destructive">Not quite — -1</p>
        </div>
      )}
    </div>
  );
}
