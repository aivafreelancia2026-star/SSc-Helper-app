"use client";

import { useState } from "react";
import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "Ashok" }, { value: "Rice, Dal, Milk, Vegetables, Bread, Jam, Idly, Chutni" }],
  [{ value: "Neelam" }, { value: "Biryani, Chilli Chatni, Roti" }],
  [{ value: "", editable: true }, { value: "", editable: true }],
  [{ value: "", editable: true }, { value: "", editable: true }],
];

const REFLECTION_QUESTIONS = [
  "Are food items similar in your list and your friend's list?",
  "Count the number of food varieties you have listed in the table?",
  "Are all eating the same type of food items?",
  "What food items are served in midday meals in your school?",
];

export function C6ScienceCh1Page2() {
  const [answers, setAnswers] = useState<string[]>(() =>
    REFLECTION_QUESTIONS.map(() => ""),
  );

  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <h2 className="font-heading text-base font-bold text-primary">
        Activity-1: Finding varieties in our food
      </h2>
      <p>
        Every day we eat different types of food from morning to night. What did you eat
        yesterday? Make a list. Also discuss with your friends and collect information about what
        food they had eaten yesterday. Record the information in table 1.
      </p>

      <FillInTable
        title="Table 1 - What did I eat"
        columns={["Name of student", "Food eaten"]}
        rows={TABLE1_ROWS}
        storageKey="c6-science-ch1-table1"
      />

      <div className="space-y-3">
        {REFLECTION_QUESTIONS.map((q, i) => (
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

      <h2 className="font-heading text-base font-bold text-primary">1.2. Food ingredients</h2>
      <p>
        We eat different types of food material daily but some food items like rice, dal and
        vegetables are common in the daily menu in large parts of Telangana. On special occasions
        like festivals, birthdays and marriages we eat a larger variety of food.
      </p>

      <h3 className="font-heading text-sm font-bold text-primary">
        Activity-2: Many ingredients are needed to prepare food
      </h3>
      <p>
        Srinivas wants to eat something special on Sunday. He asked his mother to make biryani.
        His mother asked him to prepare a list of materials which would be required to make
        biryani.
      </p>
      <p>
        Here is the list made by Srinivas - rice, salt, jeera, tomato, potato, onion, etc. Help
        Srinivas if he had missed any material and complete the list.
      </p>
      <p>
        Srinivas was surprised that while cooking boiled rice we need only two materials, raw rice
        and water. But for making biryani we need many materials.
      </p>

      <TipBox>
        Don&apos;t eat bananas on an empty stomach; combining them with a bit of protein will help
        to normalize the insulin response caused by the sugar in the banana.
      </TipBox>
    </div>
  );
}
