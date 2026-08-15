"use client";

import { useState } from "react";
import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE5_ROWS_A: TableCell[][] = [
  [{ value: "Boiling" }, { value: "Potatoes, eggs …" }],
  [{ value: "Steaming" }, { value: "Idlis …" }],
];

const REFLECTION_QUESTIONS = [
  "Which parts of the plants do we generally use?",
  "Do we also use flowers as food? Which plants are these?",
  "Is there any plant of which whole plant can be eaten?",
];

export function C6ScienceCh1Page6() {
  const [answers, setAnswers] = useState<string[]>(() => REFLECTION_QUESTIONS.map(() => ""));

  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
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

      <p>
        We use various parts of plants for our food. Leaves, roots, seeds and fruits of plants are
        widely used whereas stems and flowers are not so widely used. We need several ingredients
        to cook different types of food. Whatever may be the source of ingredients — plants,
        animals or minerals, we use some in plenty but others are needed only in little quantities.
        Why is it so?
      </p>

      <h2 className="font-heading text-base font-bold text-primary">1.3. How people develop food habits?</h2>
      <p>
        People living in one region usually share common food habits. You might have seen paddy
        fields in your village. Think, why is paddy grown mostly in our state. The geographical and
        climatic conditions are more suitable for growing paddy so we produce more rice. Even
        though farmers grow various types of food crops we generally use rice as staple food. A
        variety of food items are prepared using rice.
      </p>
      <p>
        We eat more rice and rice products as compared to other cereals like wheat or maize. But in
        Rajasthan maize, bajra and wheat is produced more than rice. So the main food in Rajasthan
        is chapathi or roti instead of rice.
      </p>
      <p>
        Many times we hear people saying that &quot;I like this curry&quot;. &quot;I don&apos;t like
        that&quot;. This is not a good food habit, you should make a habit of eating all varieties
        of vegetable food items. This makes you strong and energetic.
      </p>

      <h2 className="font-heading text-base font-bold text-primary">1.4. Different methods of preparing food</h2>
      <p>
        Preparing food is an extremely important art and essential for life. There are many ways of
        preparing food. For cooking rice, rice is boiled. For making idly, rice rawa is mixed with
        grinder dal and fermented, then it is steamed. Potato chips are fried in oil.
      </p>
      <p>
        Some methods of cooking food are given in Table 5. Fill in the food items. Write down the
        food items cooked in the given methods.
      </p>

      <FillInTable
        title="Table 5 - Methods involved in making food"
        columns={["Method of preparing food", "Food items"]}
        rows={TABLE5_ROWS_A}
        storageKey="c6-science-ch1-table5a"
      />

      <TipBox>
        Onions are an excellent antioxidant, they protect us from diseases. They contain
        anti-allergic, antiviral and antihistamic properties.
      </TipBox>
    </div>
  );
}
