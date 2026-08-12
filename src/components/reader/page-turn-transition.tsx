"use client";

import { useRef, type ReactNode } from "react";

// Wraps reader page content so navigating forward/backward replays a
// book-style page-turn animation, hinged at the edge you're turning toward.
// `page` is the current absolute page number — comparing it against the
// previous render (via a ref, not state, so this never causes an extra
// render of its own) tells us which direction to animate. Keying the inner
// div by `page` forces React to remount it on every page change, which is
// what makes the CSS animation replay each time instead of only playing once.
export function PageTurnTransition({ page, children }: { page: number; children: ReactNode }) {
  const prevPageRef = useRef(page);
  const direction = page >= prevPageRef.current ? "forward" : "backward";
  prevPageRef.current = page;

  return (
    <div className="page-turn-viewport w-full">
      <div
        key={page}
        className={direction === "forward" ? "animate-page-turn-forward" : "animate-page-turn-backward"}
      >
        {children}
      </div>
    </div>
  );
}
