"use client";

import { useState } from "react";
import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

const TONGUE_ROWS: TableCell[][] = [
  [{ value: "Frog" }, { value: "", editable: true }],
  [{ value: "Cow" }, { value: "", editable: true }],
  [{ value: "Dog" }, { value: "", editable: true }],
];

export function C6ScienceCh4Page9() {
  const [observation, setObservation] = useState("");

  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <textarea
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
        placeholder="Write your observations about how a dog gets its food…"
        rows={3}
        className="w-full rounded-[12px] border border-border/60 bg-white/70 px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
      />

      <ul className="list-disc space-y-1.5 pl-5">
        <li>How does a dog find its food?</li>
        <li>Which parts are involved in taking in food?</li>
        <li>How does a dog eat meat?</li>
        <li>How does a dog drink water?</li>
      </ul>

      <p>
        Dogs eat food by using their sharp teeth and tongue. Wild animals like lion, fox, wolf,
        tiger and others also have sharp teeth. Can you say how they get their food?
      </p>

      <FigureNote emoji="🦁" caption="A lion cub gnawing on a bone, and a tiger baring its sharp teeth" />

      <p>Animals that hunt have strong legs to run, sharp claws to catch and sharp teeth to tear flesh.</p>
      <p>Rabbits and squirrels also have teeth. They eat seeds, tubers, leaves etc. by using their teeth.</p>

      <ul className="list-disc space-y-1.5 pl-5">
        <li>Do you know how dogs and cats use their teeth?</li>
      </ul>

      <p>
        We can see sharp teeth in a dog&apos;s or cat&apos;s mouth. They tear flesh of animals by
        using these sharp teeth. Did you ever see how a cat hunts a rat? What do you feel about
        it&apos;s actions and concentration while hunting?
      </p>

      <h2 className="font-heading text-base font-bold text-primary">4.5.2. Using the tongue</h2>
      <p>
        <strong>Activity-8:</strong> Compare how a frog, cow and dog use their tongues
      </p>

      <FillInTable
        title=""
        columns={["Animal", "Use of tongue"]}
        rows={TONGUE_ROWS}
        storageKey="c6-science-ch4-tongue"
      />

      <h2 className="font-heading text-base font-bold text-primary">4.6. Getting food without hunting:</h2>
      <p>
        Some animals get their food by hunting and some others do not hunt. Write about any two
        animals that get their food without hunting.
      </p>
      <p>
        It is very interesting to watch how a duck catches its food. Ducks also have teeth, but
        they are not like the teeth of a cow or lion. They are not useful in chewing food too. They
        act as filters to get food from water.
      </p>

      <FigureNote emoji="🦆" caption="A duck's beak, and a duck swimming while filtering food from water" />

      <TipBox>Blue whale weighs in the range of 110-160 tonnes and grows to a length between 20-30 meters.</TipBox>
    </div>
  );
}
