"use client";

import { useState } from "react";
import { TipBox } from "@/components/reader/tip-box";

const WORD_GRID = [
  ["Rat", "Cat", "Lion"],
  ["Grass", "Deer", "Fox"],
  ["Dog", "Tiger", "Hen"],
  ["Wolf", "Man", "Worms"],
];

function WordGrid() {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-2 rounded-[12px] border border-border/50 bg-white/70 p-4 font-heading text-sm font-semibold text-foreground">
      {WORD_GRID.flat().map((word, i) => (
        <span key={i}>{word}</span>
      ))}
    </div>
  );
}

export function C6ScienceCh4Page11() {
  const [observation, setObservation] = useState("");

  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <h2 className="font-heading text-base font-bold text-primary">Activity-10: Food Chains</h2>
      <p>Look at Fig. 5 and write your observations.</p>

      <textarea
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
        placeholder="Your observations…"
        rows={3}
        className="w-full rounded-[12px] border border-border/60 bg-white/70 px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
      />

      <p>Now, try to draw a food chain that starts from grain and ends with a cat.</p>
      <p>
        Food chains cannot always be represented by a straight line. They can be branched with
        several food chains connected to each other and form a food web. Look at the following.
      </p>

      <WordGrid />

      <p>Draw connections to show which animal is eaten by whom.</p>

      <WordGrid />

      <p>
        Food chains form food web where one animal depends upon more than one source for food.
        Think, in which category do you belong?
      </p>
      <p>
        We use pesticides and insecticides to protect crops but every year a large number of frogs
        die by eating poisioned insects. What would happen to the food chain if all frogs die?
      </p>

      <h2 className="font-heading text-base font-bold text-primary">4.9. Animal colonies and food</h2>
      <p>There are many animals that live in colonies - from huge elephants to tiny ants.</p>

      <h2 className="font-heading text-base font-bold text-primary">4.9.1. The wonder world of ants :</h2>
      <p>Ants do a lot of things. Their colony has large ant forces to do work. There are mainly workers, soldiers, female and male ants.</p>
      <p>The worker ants collect and maintain food stock for other ants in the colony along with several other duties.</p>
      <p>
        Just as we rear cows for milk, some species of ants nurture a type of insect called aphids
        for honeydew.
      </p>

      <TipBox>Many desert animals are nocturnal. They live in burrows to escape the extreme temperatures in the day.</TipBox>
    </div>
  );
}
