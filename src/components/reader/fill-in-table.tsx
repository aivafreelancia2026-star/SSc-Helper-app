"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export type TableCell = {
  value: string;
  editable?: boolean;
  // Acceptable correct answers for this cell (case/whitespace-insensitive,
  // any one match counts). Omit for cells with no single right answer
  // (e.g. "what did YOU eat" is personal, not gradable).
  correctAnswers?: string[];
};

function isCorrect(cell: TableCell, typedValue: string): boolean {
  const normalized = typedValue.trim().toLowerCase();
  if (!normalized) return false;
  return cell.correctAnswers!.some((answer) => answer.trim().toLowerCase() === normalized);
}

// A table where some cells are pre-filled (from the textbook) and others
// are blank for the student to fill in themselves — student input persists
// locally per-table so it survives a reload while reading. `storageKey`
// must be unique per table (e.g. "c6-science-ch1-table1"). Cells that carry
// `correctAnswers` get a "Check answers" button and a right/wrong badge;
// tables with no gradable cells (nothing has correctAnswers) skip that UI
// entirely, since not every table has a single right answer.
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
  const [values, setValues] = useState<string[][]>(() => rows.map((row) => row.map((c) => c.value)));
  const [checked, setChecked] = useState(false);
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";

  const isGradable = rows.some((row) => row.some((cell) => cell.correctAnswers));

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setValues(JSON.parse(saved));
      } catch {
        // ignore malformed saved data
      }
    }
  }, [storageKey]);

  function handleChange(rowIdx: number, colIdx: number, newValue: string) {
    const next = values.map((row) => [...row]);
    next[rowIdx][colIdx] = newValue;
    setValues(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    if (checked) setChecked(false);
  }

  return (
    <div className="w-full space-y-2">
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
                  const showResult = checked && cell.editable && cell.correctAnswers;
                  const correct = showResult ? isCorrect(cell, typedValue) : null;

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

      {isGradable && (
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="mx-auto block cursor-pointer rounded-[12px] bg-primary px-4 py-1.5 font-heading text-xs font-bold text-on-primary transition-opacity hover:opacity-90"
        >
          Check answers
        </button>
      )}
    </div>
  );
}
