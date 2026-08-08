"use client";

import { useEffect, useState } from "react";

export type TableCell = { value: string; editable?: boolean };

// A table where some cells are pre-filled (from the textbook) and others
// are blank for the student to fill in themselves — student input persists
// locally per-table so it survives a reload while reading. `storageKey`
// must be unique per table (e.g. "c6-science-ch1-table1").
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
                {row.map((cell, colIdx) => (
                  <td key={colIdx} className="border-t border-border/40 px-3 py-2 font-body text-sm text-foreground">
                    {cell.editable ? (
                      <input
                        type="text"
                        value={values[rowIdx]?.[colIdx] ?? ""}
                        onChange={(e) => handleChange(rowIdx, colIdx, e.target.value)}
                        placeholder="Type here…"
                        className="w-full rounded-[8px] border border-border/60 bg-white/70 px-2 py-1 text-sm text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                      />
                    ) : (
                      cell.value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
