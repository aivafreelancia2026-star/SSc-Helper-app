"use client";

import { useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
import { usePageTurn } from "@/lib/use-page-turn";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

type ActiveModal = "feedback" | "reset" | "more" | "upgrade" | null;

const NAV_ITEMS = [
  { key: "feedback" as const, label: "Feedback", icon: FeedbackIcon },
  { key: "reset" as const, label: "Reset", icon: ResetIcon },
  { key: "more" as const, label: "Others", icon: MoreIcon },
  { key: "upgrade" as const, label: "Upgrade", icon: SparklesIcon },
];

// Swipe must travel at least this far horizontally, and stay mostly
// horizontal, before it's treated as a change rather than a scroll.
const SWIPE_THRESHOLD_PX = 50;

export function NavBar({ defaultClass }: { defaultClass: number | null }) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const close = () => setActiveModal(null);

  // Inside a book (a page is open in the reader), the arrows/swipe turn
  // pages instead of switching grades — same controls, context-dependent
  // meaning, since only one of these makes sense at a time.
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inBook = pathname === "/reader" && searchParams.has("page");

  const classGrade = useClassGrade(defaultClass);
  const pageTurn = usePageTurn();
  const { goPrev, goNext, isFirst, isLast } = inBook ? pageTurn : classGrade;

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

  function handleConfirmReset() {
    window.dispatchEvent(new Event(RESET_PAGE_ANSWERS_EVENT));
    close();
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
          aria-label={inBook ? "Previous page" : "Previous class"}
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
          aria-label={inBook ? "Next page" : "Next class"}
          className="flex cursor-pointer flex-col items-center justify-center py-3 text-foreground/80 transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </nav>

      {activeModal === "feedback" && <FeedbackModal onClose={close} />}

      {activeModal === "reset" &&
        (inBook ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-heading"
            className="fixed inset-0 z-30 flex items-end justify-center px-4 pb-6 sm:items-center sm:pb-4"
          >
            <div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />
            <div className="relative w-full max-w-sm rounded-[32px] border border-white/60 bg-white/95 p-6 text-center shadow-[12px_12px_28px_rgba(79,70,229,0.18),-8px_-8px_20px_rgba(255,255,255,0.8)] sm:p-8">
              <h2 id="reset-heading" className="font-heading text-lg font-bold text-foreground">
                Reset this page?
              </h2>
              <p className="mt-2 font-body text-sm text-foreground/60">
                This clears every answer you&apos;ve typed on this page so you can try again.
                Points you&apos;ve already earned stay — this doesn&apos;t touch your score.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleConfirmReset}
                  className="w-full cursor-pointer rounded-[20px] bg-accent py-3 font-heading text-base font-bold text-on-primary shadow-[0_6px_0_#c2410c,0_10px_18px_rgba(234,88,12,0.35)] transition-all duration-150 ease-out hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#c2410c,0_4px_10px_rgba(234,88,12,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
                >
                  Reset answers
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="w-full cursor-pointer rounded-[20px] border-2 border-border bg-white py-3 font-heading text-base font-bold text-foreground transition-colors hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <InfoModal
            title="Reset progress"
            message="Open a chapter page first — this resets whatever page you're currently reading."
            onClose={close}
          />
        ))}

      {activeModal === "more" && (
        <InfoModal
          title="Others"
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
