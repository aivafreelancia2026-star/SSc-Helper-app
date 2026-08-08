"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AlertIcon, CheckCircleIcon, CloseIcon, FeedbackIcon } from "@/components/icons";
import { getPageContextLabel } from "@/lib/page-context";

// Feedback is sent to AIVA Work Manager's shared product-feedback inbox, not
// stored in this app's own Supabase project. source stays "ssc-tutor" (the
// app's old name) rather than following the "SSC Helper" rename below —
// Work Manager's FEEDBACK_PRODUCT_TABS still keys off "ssc-tutor", so
// changing this value would silently stop matching that tab and orphan new
// submissions. Only change it together with that registration.
const FEEDBACK_API_URL = `${process.env.NEXT_PUBLIC_FEEDBACK_API_URL}/api/feedback`;

type Status = "idle" | "submitting" | "success" | "error";

// The modal itself, usable from any trigger (the floating button below, or
// the nav bar's "Feedback" item). Unmount/remount via the parent's own
// isOpen state to get a fresh instance each time — that's simpler than
// threading isOpen through here too, and resets message/status for free.
export function FeedbackModal({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageContext = getPageContextLabel(pathname, searchParams);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const res = await fetch(FEEDBACK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          source: "ssc-tutor",
          pageUrl: `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
          pageContext,
          platform: "web",
          submitterEmail: user?.email ?? null,
        }),
      });
      if (!res.ok) throw new Error("Feedback request failed");
    } catch {
      setStatus("error");
      return;
    }

    setStatus("success");
    setTimeout(onClose, 1800);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-heading"
      className="fixed inset-0 z-30 flex items-end justify-center px-4 pb-6 sm:items-center sm:pb-4"
    >
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-sm rounded-[32px] border border-white/60 bg-white/95 p-6 shadow-[12px_12px_28px_rgba(79,70,229,0.18),-8px_-8px_20px_rgba(255,255,255,0.8)] sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close feedback form"
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <CheckCircleIcon className="h-10 w-10 text-primary" />
            <p className="font-heading text-lg font-bold text-foreground">Thanks!</p>
            <p className="font-body text-sm text-foreground/60">
              Your feedback helps make SSC Helper better.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 id="feedback-heading" className="font-heading text-xl font-bold text-foreground">
              Send feedback
            </h2>
            <p className="mt-1 font-body text-sm text-foreground/60">
              Found a bug, or have an idea? Let us know.
            </p>
            <p className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 font-body text-xs font-semibold text-primary">
              📍 {pageContext}
            </p>

            <textarea
              ref={textareaRef}
              required
              minLength={3}
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your feedback here..."
              className="mt-4 w-full resize-none rounded-[20px] border-2 border-border bg-white/70 px-4 py-3 font-body text-base text-foreground placeholder:text-foreground/40 shadow-[inset_3px_3px_6px_rgba(79,70,229,0.08),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-colors focus:border-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
            />

            {status === "error" && (
              <div
                role="alert"
                className="mt-3 flex items-center gap-2 rounded-2xl bg-destructive/10 px-4 py-2.5 font-body text-sm font-semibold text-destructive"
              >
                <AlertIcon className="h-5 w-5 shrink-0" />
                <span>Couldn&apos;t send feedback right now. Please try again shortly.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-4 w-full cursor-pointer rounded-[20px] bg-accent py-3 font-heading text-base font-bold text-on-primary shadow-[0_6px_0_#c2410c,0_10px_18px_rgba(234,88,12,0.35)] transition-all duration-150 ease-out hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#c2410c,0_4px_10px_rgba(234,88,12,0.35)] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
            >
              {status === "submitting" ? "Sending..." : "Send feedback"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Floating trigger, used on pages outside the logged-in app shell (login,
// signup) where there's no nav bar to host a "Feedback" item.
export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Send feedback"
        className="fixed right-5 z-20 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full text-on-primary shadow-[6px_6px_14px_rgba(79,70,229,0.35),-4px_-4px_10px_rgba(255,255,255,0.6)] transition-transform duration-150 ease-out hover:brightness-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        style={{
          bottom: "calc(1.25rem + env(safe-area-inset-bottom))",
          background: "linear-gradient(155deg, var(--color-primary), var(--color-secondary))",
        }}
      >
        <FeedbackIcon className="h-6 w-6" />
      </button>

      {isOpen && <FeedbackModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
