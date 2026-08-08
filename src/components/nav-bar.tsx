"use client";

import { useRef, useState } from "react";
import { FeedbackModal } from "@/components/feedback-widget";
import { InfoModal } from "@/components/info-modal";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FeedbackIcon,
  MoreIcon,
  ResetIcon,
  SparklesIcon,
} from "@/components/icons";
import { useClassGrade } from "@/lib/use-class-grade";

type ActiveModal = "feedback" | "reset" | "more" | "upgrade" | null;

const NAV_ITEMS = [
  { key: "feedback" as const, label: "Feedback", icon: FeedbackIcon },
  { key: "reset" as const, label: "Reset", icon: ResetIcon },
  { key: "more" as const, label: "More", icon: MoreIcon },
  { key: "upgrade" as const, label: "Upgrade", icon: SparklesIcon },
];

// Swipe must travel at least this far horizontally, and stay mostly
// horizontal, before it's treated as a grade change rather than a scroll.
const SWIPE_THRESHOLD_PX = 50;

export function NavBar({ defaultClass }: { defaultClass: number | null }) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const close = () => setActiveModal(null);

  const { goPrev, goNext, isFirst, isLast } = useClassGrade(defaultClass);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const deltaX = t.clientX - touchStart.current.x;
    const deltaY = t.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }
  }

  return (
    <>
      <nav
        className="grid grid-cols-6 border-b border-black/5"
        style={{ background: "#EDC9BD" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Previous class"
          className="flex cursor-pointer flex-col items-center justify-center py-3 text-foreground/80 transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveModal(key)}
            className="flex cursor-pointer flex-col items-center gap-1 py-3 font-heading text-xs font-semibold text-foreground/80 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}

        <button
          type="button"
          onClick={goNext}
          disabled={isLast}
          aria-label="Next class"
          className="flex cursor-pointer flex-col items-center justify-center py-3 text-foreground/80 transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </nav>

      {activeModal === "feedback" && <FeedbackModal onClose={close} />}

      {activeModal === "reset" && (
        <InfoModal
          title="Reset progress"
          message="You don't have any progress saved yet — once you start working through chapters and quizzes, this is where you'll be able to clear it and start fresh."
          onClose={close}
        />
      )}

      {activeModal === "more" && (
        <InfoModal
          title="More"
          message="More options are coming soon."
          onClose={close}
        />
      )}

      {activeModal === "upgrade" && (
        <InfoModal
          title="Upgrade"
          message="Premium features aren't available yet — check back soon."
          onClose={close}
        />
      )}
    </>
  );
}
