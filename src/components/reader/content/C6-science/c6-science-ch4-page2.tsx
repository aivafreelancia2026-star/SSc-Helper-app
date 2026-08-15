"use client";

import { useState } from "react";
import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "1" }, { value: "Sparrow" }, { value: "Worms, grains" }, { value: "Seeing, picking with beak" }],
  [{ value: "2" }, { value: "Dog" }, { value: "Bones, bread" }, { value: "Sniffing" }],
  ...Array.from({ length: 8 }, (_, i) => [
    { value: String(i + 3) },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
  ]),
];

const GROUP_LINES = ["", "", ""];

export function C6ScienceCh4Page2() {
  const [groups, setGroups] = useState<string[]>(GROUP_LINES);

  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <FillInTable
        title="Table 1"
        columns={["S. No.", "Animal/Bird", "What they eat/ drink", "How they find food"]}
        rows={TABLE1_ROWS}
        storageKey="c6-science-ch4-table1"
      />

      <ul className="list-disc space-y-1.5 pl-5">
        <li>Which of the animals, listed by you, eat nearly the same type of food?</li>
        <li>What kind of food does your pet animals eat?</li>
        <li>Select any two animals in your list, describe the type of food they eat and how they get their food?</li>
        <li>Compare the types of food habits of two animals selected by you.</li>
        <li>Based upon the type of food the animals eat, they can be classified into how many main groups?</li>
      </ul>

      <p>Discuss with your friends and write.</p>
      <p>You could write like this:</p>

      <ol className="list-decimal space-y-2 pl-5">
        <li>Some animals depend only on plants for food.</li>
        {groups.map((value, i) => (
          <li key={i}>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                const next = [...groups];
                next[i] = e.target.value;
                setGroups(next);
              }}
              placeholder="Your answer…"
              className="w-full rounded-[10px] border border-border/60 bg-white/70 px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
            />
          </li>
        ))}
      </ol>

      <TipBox>Penguin, Ostrich, Emu, Rhea birds have wings. But they do not fly.</TipBox>
    </div>
  );
}
