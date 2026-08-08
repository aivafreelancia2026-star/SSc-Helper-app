"use client";

import { useState } from "react";
import { FeedbackModal } from "@/components/feedback-widget";
import { InfoModal } from "@/components/info-modal";
import { FeedbackIcon, MoreIcon, ResetIcon, SparklesIcon } from "@/components/icons";

type ActiveModal = "feedback" | "reset" | "more" | "upgrade" | null;

const NAV_ITEMS = [
  { key: "feedback" as const, label: "Feedback", icon: FeedbackIcon },
  { key: "reset" as const, label: "Reset", icon: ResetIcon },
  { key: "more" as const, label: "More", icon: MoreIcon },
  { key: "upgrade" as const, label: "Upgrade", icon: SparklesIcon },
];

export function NavBar() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const close = () => setActiveModal(null);

  return (
    <>
      <nav
        className="grid grid-cols-4 border-b border-black/5"
        style={{ background: "#EDC9BD" }}
      >
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
