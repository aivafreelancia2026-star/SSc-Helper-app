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
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <FillInTable
        title="Table 2"
        columns={["S.No", "Object", "Material"]}
        rows={TABLE2_ROWS}
        storageKey="c6-science-ch5-table2"
      />

      <div className="space-y-3">
        {QUESTIONS.map((q, i) => (
          <div key={q} className="space-y-1">
            <p>• {q}</p>
            <input
              type="text"
              value={answers[i]}
              onChange={(e) => {
                const next = [...answers];
                next[i] = e.target.value;
                setAnswers(next);
              }}
              placeholder="Your answer…"
              className="w-full rounded-[10px] border border-border/60 bg-white/70 px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
            />
          </div>
        ))}
      </div>

      <FigureNote emoji="🪑" caption="Fig. 2 — Three chairs made of different materials: wood, plastic, and wood with fabric" />

      <p>
        There are many objects in our surroundings such as chairs, tables, cycles, bullock carts,
        utensils, clothes, tyres, water, stones, etc.
      </p>
      <p>
        We see that different objects are made of different materials. Some objects are made of
        only one material, while some objects are made of more than one material.
      </p>

      <h2 className="font-heading text-base font-bold text-primary">
        Activity -2: Finding the objects made from diffrent materials
      </h2>
      <p>Name as many things/objects as you can, made using the materials given in table 3.</p>

      <TipBox>We see the colour of the object according to the light emitted by it.</TipBox>
    </div>
  );
}
