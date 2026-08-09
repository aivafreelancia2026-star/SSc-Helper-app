"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

export type TableCell = {
  value: string;
  editable?: boolean;
  // Acceptable correct answers for this cell (case/whitespace-insensitive,
  // any one match counts). Omit for cells with no single right answer
  // (e.g. "what did YOU eat" is personal, not gradable).
  correctAnswers?: string[];
};

type ScoredEntry = { value: string; correct: boolean } | null;

function isCorrect(cell: TableCell, typedValue: string): boolean {
  const normalized = typedValue.trim().toLowerCase();
  if (!normalized) return false;
  return cell.correctAnswers!.some((answer) => answer.trim().toLowerCase() === normalized);
}

// A table where some cells are pre-filled (from the textbook) and others
// are blank for the student to fill in themselves — student input persists
// locally per-table so it survives a reload while reading. `storageKey`
// must be unique per table (e.g. "c6-science-ch1-table1"). Cells that carry
// `correctAnswers` are graded the moment the student leaves the field
// (onBlur) — no separate "check" step — awarding +1/-1 to the account
// score. Re-blurring an unchanged answer doesn't re-score it (can't farm
// points by tabbing in and out); changing the answer and blurring again
// does re-score, since that's a genuine new attempt.
export function FillInTable({
  title,
  columns,
  rows,
  storageKey,
}: {
  title: string;
  columns: string[];
  rows: TableCell[][];
  storageKey: string;
}) {
  const { addPoints } = useScore();
  const [values, setValues] = useState<string[][]>(() => rows.map((row) => row.map((c) => c.value)));
  const [scored, setScored] = useState<ScoredEntry[][]>(() => rows.map((row) => row.map(() => null)));
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";

  const valuesKey = `${storageKey}-values`;
  const scoredKey = `${storageKey}-scored`;

  useEffect(() => {
    const savedValues = localStorage.getItem(valuesKey);
    if (savedValues) {
      try {
        setValues(JSON.parse(savedValues));
      } catch {
        // ignore malformed saved data
      }
    }
    const savedScored = localStorage.getItem(scoredKey);
    if (savedScored) {
      try {
        setScored(JSON.parse(savedScored));
      } catch {
        // ignore malformed saved data
      }
    }
    // Restoring a previous session's scored state on mount is a pure
    // display concern (already-earned points were already persisted to the
    // account when they were first scored) — must not call addPoints here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesKey, scoredKey]);

  function handleChange(rowIdx: number, colIdx: number, newValue: string) {
    const next = values.map((row) => [...row]);
    next[rowIdx][colIdx] = newValue;
    setValues(next);
    localStorage.setItem(valuesKey, JSON.stringify(next));
  }

  function handleBlur(rowIdx: number, colIdx: number) {
    const cell = rows[rowIdx][colIdx];
    if (!cell.editable || !cell.correctAnswers) return;

    const typedValue = (values[rowIdx]?.[colIdx] ?? "").trim();
    if (!typedValue) return;

    const previous = scored[rowIdx]?.[colIdx];
    if (previous && previous.value === typedValue) return; // already scored this exact answer

    const correct = isCorrect(cell, typedValue);
    addPoints(correct ? 1 : -1);
    setFeedback(correct);

    const next = scored.map((row) => [...row]);
    next[rowIdx][colIdx] = { value: typedValue, correct };
    setScored(next);
    localStorage.setItem(scoredKey, JSON.stringify(next));
  }

  return (
    <div className="w-full space-y-2">
      {feedback !== null && (
        <AnswerFeedback correct={feedback} onDone={() => setFeedback(null)} />
      )}
      <p className="text-center font-heading text-sm font-bold text-primary">{title}</p>
      <div className="overflow-x-auto rounded-[12px] border border-border/60">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-primary/80">
              {columns.map((col) => (
                <th key={col} className="px-3 py-2 font-heading text-xs font-semibold text-on-primary">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-muted/40" : "bg-white"}>
                {row.map((cell, colIdx) => {
                  const typedValue = values[rowIdx]?.[colIdx] ?? "";
                  const scoredEntry = scored[rowIdx]?.[colIdx];
                  const correct =
                    scoredEntry && scoredEntry.value === typedValue.trim() ? scoredEntry.correct : null;

                  return (
                    <td
                      key={colIdx}
                      className="border-t border-border/40 px-3 py-2 font-body text-sm text-foreground"
                    >
                      {cell.editable ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={typedValue}
                              onChange={(e) => handleChange(rowIdx, colIdx, e.target.value)}
                              onBlur={() => handleBlur(rowIdx, colIdx)}
                              placeholder="Type here…"
                              className={`w-full rounded-[8px] border bg-white/70 px-2 py-1 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none ${
                                correct === true
                                  ? "border-green-500 bg-green-50"
                                  : correct === false
                                    ? "border-destructive bg-destructive/5"
                                    : "border-border/60 focus:border-primary"
                              }`}
                            />
                            {correct === true && <span className="text-green-600">✓</span>}
                            {correct === false && <span className="text-destructive">✗</span>}
                          </div>
                          {isRevealed && cell.correctAnswers && (
                            <p className="font-mono text-[10px] font-semibold text-primary">
                              Answer: {cell.correctAnswers[0]}
                            </p>
                          )}
                        </div>
                      ) : (
                        cell.value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
