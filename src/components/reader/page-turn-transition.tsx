"use client";

import { useRef, type ReactNode } from "react";
import { usePageTurn } from "@/lib/use-page-turn";

// Swipe must travel at least this far horizontally, and stay mostly
// horizontal, before it's treated as a page turn rather than a scroll.
// Matches the nav bar's own swipe threshold (see nav-bar.tsx) so swiping
// feels the same whether it starts on the nav bar or on the page itself.
const SWIPE_THRESHOLD_PX = 50;

// Wraps reader page content so navigating forward/backward replays a
// book-style page-turn animation, hinged at the edge you're turning toward.
// `page` is the current absolute page number — comparing it against the
// previous render (via a ref, not state, so this never causes an extra
// render of its own) tells us which direction to animate. Keying the inner
// div by `page` forces React to remount it on every page change, which is
// what makes the CSS animation replay each time instead of only playing once.
//
// Also owns swipe-to-turn-page: swiping left/right anywhere on the page
// content (not just the nav bar strip) moves to the next/previous page.
export function PageTurnTransition({ page, children }: { page: number; children: ReactNode }) {
  const prevPageRef = useRef(page);
  const direction = page >= prevPageRef.current ? "forward" : "backward";
  prevPageRef.current = page;

  const { goPrev, goNext } = usePageTurn();
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
    <div
      className="page-turn-viewport flex w-full justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        key={page}
        className={direction === "forward" ? "animate-page-turn-forward" : "animate-page-turn-backward"}
      >
        {children}
      </div>
    </div>
  );
}
