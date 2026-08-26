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
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Table 1 Spanning Full Width */}
      <FillInTable
        title="Table 1"
        columns={["S. No.", "Animal/Bird", "What they eat/ drink", "How they find food"]}
        rows={TABLE1_ROWS}
        storageKey="c6-science-ch4-table1"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Which of the animals, listed by you, eat nearly the same type of food?</li>
            <li>What kind of food does your pet animals eat?</li>
            <li>Select any two animals in your list, describe the type of food they eat and how they get their food?</li>
            <li>Compare the types of food habits of two animals selected by you.</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Based upon the type of food the animals eat, they can be classified into how many main groups?</li>
          </ul>

          <p className="pt-2">Discuss with your friends and write.</p>
          <p className="font-semibold text-emerald-800">You could write like this:</p>

          <ol className="list-decimal space-y-3 pl-5">
            <li>
              <div className="flex items-center text-foreground/80 py-1">
                Some animals depend only on plants for food.
              </div>
            </li>
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
                  placeholder="Type classification group..."
                  className="w-full rounded-[10px] border border-border/60 bg-white/70 px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-emerald-600 focus:outline-none"
                />
              </li>
            ))}
          </ol>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Penguin, Ostrich, Emu, Rhea birds have wings. But they do not fly.</TipBox>
      </div>
    </div>
  );
}
