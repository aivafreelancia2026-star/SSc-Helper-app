"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ScoreContextValue = { score: number; addPoints: (delta: number) => void };
const ScoreContext = createContext<ScoreContextValue | null>(null);

// App-wide score state, seeded from the server-fetched profile so it's
// correct on first paint, then updated optimistically as the student
// answers gradable questions (see FillInTable). Persists to Supabase on
// every change — if the `score` column migration hasn't run yet, this
// update just silently fails and the score resets to the DB value (0) on
// next load, same fail-soft pattern as the role/email columns.
export function ScoreProvider({
  initialScore,
  children,
}: {
  initialScore: number;
  children: React.ReactNode;
}) {
  const [score, setScore] = useState(initialScore);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const supabase = createClient();
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) await supabase.from("profiles").update({ score }).eq("id", user.id);
    })();
  }, [score]);

  function addPoints(delta: number) {
    setScore((prev) => prev + delta);
  }

  return <ScoreContext.Provider value={{ score, addPoints }}>{children}</ScoreContext.Provider>;
}

export function useScore(): ScoreContextValue {
  const ctx = useContext(ScoreContext);
  if (!ctx) throw new Error("useScore must be used within a ScoreProvider");
  return ctx;
}
