"use client";

import { useState } from "react";
import Link from "next/link";
import { InfoModal } from "@/components/info-modal";
import { HomeIcon, MoreIcon, TrophyIcon, UserIcon } from "@/components/icons";

type ActiveModal = "leaderboard" | "profile" | "more" | null;

const itemClass =
  "flex cursor-pointer flex-col items-center gap-1 py-2.5 font-heading text-[11px] font-semibold text-foreground/80 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40";

export function BottomNav() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const close = () => setActiveModal(null);

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-black/10"
        style={{ background: "#EDC9BD", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <Link href="/dashboard" className={itemClass}>
          <HomeIcon className="h-5 w-5" />
          Home
        </Link>
        <button type="button" onClick={() => setActiveModal("leaderboard")} className={itemClass}>
          <TrophyIcon className="h-5 w-5" />
          Leaderboard
        </button>
        <button type="button" onClick={() => setActiveModal("profile")} className={itemClass}>
          <UserIcon className="h-5 w-5" />
          My profile
        </button>
        <button type="button" onClick={() => setActiveModal("more")} className={itemClass}>
          <MoreIcon className="h-5 w-5" />
          More
        </button>
      </nav>

      {activeModal === "leaderboard" && (
        <InfoModal
          title="Leaderboard"
          message="Leaderboards aren't available yet — check back soon."
          onClose={close}
        />
      )}

      {activeModal === "profile" && (
        <InfoModal
          title="My profile"
          message="A dedicated profile page is coming soon."
          onClose={close}
        />
      )}

      {activeModal === "more" && (
        <InfoModal title="More" message="More options are coming soon." onClose={close} />
      )}
    </>
  );
}
