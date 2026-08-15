"use client";

import { useEffect, useState } from "react";
import { useScore } from "@/components/score-provider";

export function ReadingTaskChecklist({
  title,
  tasks,
  storageKey,
}: {
  title: string;
  tasks: string[];
  storageKey: string;
}) {
  const { addPoints } = useScore();
  const [checked, setChecked] = useState<boolean[]>(() => tasks.map(() => false));

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      setChecked(JSON.parse(saved));
    } catch {
      // Ignore malformed saved checklist data.
    }
  }, [storageKey]);

  function toggleTask(index: number) {
    const next = [...checked];
    const wasChecked = next[index];
    next[index] = !wasChecked;
    setChecked(next);
    localStorage.setItem(storageKey, JSON.stringify(next));

    if (!wasChecked) addPoints(1);
  }

  return (
    <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
      <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">{title}</h3>
      <div className="space-y-3 px-5 pb-5 pt-4">
        {tasks.map((task, index) => (
          <label
            key={task}
            className={`flex cursor-pointer items-start gap-3 rounded-[14px] border p-3 transition-colors ${
              checked[index] ? "border-primary bg-primary/10" : "border-white/70 bg-white/75"
            }`}
          >
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={() => toggleTask(index)}
              className="mt-1 h-4 w-4"
            />
            <span className="text-base leading-loose text-foreground">{task}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
