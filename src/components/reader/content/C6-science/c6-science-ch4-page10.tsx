"use client";

import { useState } from "react";
import { CalloutBox } from "@/components/reader/callout-box";
import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

const OBSERVE_ITEMS = ["Lizard on the wall", "Spider in a Web", "Hen in the garden", "Butterfly on a flower."];

export function C6ScienceCh4Page10() {
  const [notes, setNotes] = useState<string[]>(() => OBSERVE_ITEMS.map(() => ""));

  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>Similarly, fish too have teeth which are used for the same purpose as that of ducks.</p>

      <h2 className="font-heading text-base font-bold text-primary">4.7. How leeches get their food?</h2>
      <p>When we walk on the banks of ponds, canals etc. What kind of animals do we see? We can see leeches, snails, earth worms etc.</p>
      <p>
        People in rural areas are familiar with leeches. While rearing cattle near water they find
        leeches on the skin of animals. Leeches stick on the skin and suck the blood of cattle as
        well as humans. They have special structures called suckers in their mouth to do this. Do
        snails and earthworms also suck something from the ground? Discuss this with your teacher
        and your friends.
      </p>

      <h2 className="font-heading text-base font-bold text-primary">Activity-9: Modes of collecting food</h2>
      <p>
        Observe the following animals in your surroundings. Find out how they get their food.
        Observe them everyday for at least a week. Write whatever you observe in your notebook.
      </p>

      <ol className="list-decimal space-y-2 pl-5">
        {OBSERVE_ITEMS.map((item, i) => (
          <li key={item}>
            <p>{item}</p>
            <input
              type="text"
              value={notes[i]}
              onChange={(e) => {
                const next = [...notes];
                next[i] = e.target.value;
                setNotes(next);
              }}
              placeholder="Your observation…"
              className="mt-1 w-full rounded-[10px] border border-border/60 bg-white/70 px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
            />
          </li>
        ))}
      </ol>

      <CalloutBox title="Do you know?">
        Some animals search for their food only at night. Cockroaches, desert lizards, rats, owls,
        bats, moths, grasshopper etc. get their food only at nights. During daytime they hide in
        dark places. These type of animals are called <strong>nocturnals</strong>.
      </CalloutBox>

      <h2 className="font-heading text-base font-bold text-primary">4.8. Food Chain :</h2>
      <p>
        There is a great balance in nature established among different plants and animals
        regarding their food habits. What will happen if all animals eat plants? To maintain a
        balance in nature animals follow different food habits.
      </p>
      <p>What do you find when you see Fig. 5?</p>

      <FigureNote emoji="🦩" caption="Fig. 5 — A crane catching fish and frogs at a pond, with eggs and larvae in the water" />

      <p>
        In a pond, we can see that eggs and larvae are eaten by fish and frogs. Fish and frogs are
        food for a crane. Think, which animals eat the crane?
      </p>

      <TipBox>Birds evolved from reptiles during the mesozoic era about 150 million years ago.</TipBox>
    </div>
  );
}
