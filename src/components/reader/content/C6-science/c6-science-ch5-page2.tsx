"use client";

import { useState } from "react";
import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

const OBJECTS = ["Door", "Towel", "Cycle", "Knife", "Mirror", "Shoes", "Water bottle", "Pot"];
const TABLE2_ROWS: TableCell[][] = OBJECTS.map((obj, i) => [
  { value: String(i + 1) },
  { value: obj },
  { value: i === 0 ? "Wood, metal, rubber." : "", editable: true },
]);

const QUESTIONS = [
  "Which objects are made of only one material?",
  "Which objects are made of more than one material?",
  "How many types of materials can be used for making chairs? (See Fig.2)",
];

export function C6ScienceCh5Page2() {
  const [answers, setAnswers] = useState<string[]>(() => QUESTIONS.map(() => ""));

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Table 2 Full Width */}
      <FillInTable
        title="Table 2"
        columns={["S.No", "Object", "Material"]}
        rows={TABLE2_ROWS}
        storageKey="c6-science-ch5-table2"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-3">
            {QUESTIONS.slice(0, 2).map((q, i) => (
              <div key={q} className="space-y-1">
                <p className="font-semibold text-indigo-800">• {q}</p>
                <input
                  type="text"
                  value={answers[i]}
                  onChange={(e) => {
                    const next = [...answers];
                    next[i] = e.target.value;
                    setAnswers(next);
                  }}
                  placeholder="Your answer…"
                  className="w-full rounded-[10px] border border-border/60 bg-white/70 px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-indigo-600 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch5_fig2.png"
              alt="Fig. 2 — Three chairs made of different materials"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 2
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <div className="space-y-1">
            <p className="font-semibold text-indigo-800">• {QUESTIONS[2]}</p>
            <input
              type="text"
              value={answers[2]}
              onChange={(e) => {
                const next = [...answers];
                next[2] = e.target.value;
                setAnswers(next);
              }}
              placeholder="Your answer…"
              className="w-full rounded-[10px] border border-border/60 bg-white/70 px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-indigo-600 focus:outline-none"
            />
          </div>

          <p className="pt-2">
            There are many objects in our surroundings such as chairs, tables, cycles, bullock carts,
            utensils, clothes, tyres, water, stones, etc.
          </p>
          <p>
            We see that different objects are made of different materials. Some objects are made of
            only one material, while some objects are made of more than one material.
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            Activity -2: Finding the objects made from different materials
          </h2>
          <p>Name as many things/objects as you can, made using the materials given in table 3.</p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>We see the colour of the object according to the light emitted by it.</TipBox>
      </div>
    </div>
  );
}
