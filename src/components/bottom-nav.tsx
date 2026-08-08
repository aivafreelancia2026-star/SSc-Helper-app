"use client";

import { useState } from "react";
import Link from "next/link";
import { InfoModal } from "@/components/info-modal";
import { LogoutButton } from "@/components/logout-button";
import { HomeIcon, MoreIcon, TrophyIcon, UserIcon } from "@/components/icons";

type ActiveModal = "leaderboard" | "more" | null;

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
        <Link href="/profile" className={itemClass}>
          <UserIcon className="h-5 w-5" />
          My profile
        </Link>
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

      {activeModal === "more" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="more-modal-heading"
          className="fixed inset-0 z-30 flex items-end justify-center px-4 pb-6 sm:items-center sm:pb-4"
        >
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-sm rounded-[32px] border border-white/60 bg-white/95 p-6 text-center shadow-[12px_12px_28px_rgba(79,70,229,0.18),-8px_-8px_20px_rgba(255,255,255,0.8)] sm:p-8">
            <h2 id="more-modal-heading" className="font-heading text-lg font-bold text-foreground">
              More
            </h2>
            <p className="mt-2 font-body text-sm text-foreground/60">
              More options are coming soon.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <LogoutButton />
              <button
                type="button"
                onClick={close}
                className="w-full cursor-pointer rounded-[20px] bg-accent py-3 font-heading text-base font-bold text-on-primary shadow-[0_6px_0_#c2410c,0_10px_18px_rgba(234,88,12,0.35)] transition-all duration-150 ease-out hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#c2410c,0_4px_10px_rgba(234,88,12,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
