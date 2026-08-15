import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh4Page1() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>
        Kartik loves playing with his pet dog by tossing it a ball or biscuits or even sometimes
        some small leaves and twigs. He observes that the dog sniffs and catches the biscuit in
        mid air and eats it up very quickly, while it just holds the ball in its mouth and only
        sniffs the leaves. If the dog is given milk it first sniffs it and then licks it up
        quickly.
      </p>

      <FigureNote emoji="🐕" caption="Fig. 1 (a) — Kartik playing with his pet dog" />

      <ul className="list-disc space-y-1.5 pl-5">
        <li>Kartik often wonders what the dog is trying to find out by sniffing.</li>
        <li>Why do dogs first sniff food before they eat it?</li>
      </ul>

      <p>
        In the previous chapter we talked about our food. There are a wide variety of animals in
        the living world and they too eat a wide variety of food items.
      </p>

      <h2 className="font-heading text-base font-bold text-primary">4.1. Food intake</h2>
      <p>Let&apos;s see how animals eat their food.</p>

      <h2 className="font-heading text-base font-bold text-primary">Activity-1:</h2>
      <p>
        You can see many animals in your surroundings. Discuss about them with your friends. Make a
        list of what they usually eat and what they usually do to find their food. Do not be in a
        hurry to complete this table. Keep adding to this list as you observe animals around you
        everyday. But don&apos;t forget to observe animals wherever you go.
      </p>

      <FigureNote emoji="🦴" caption="Fig. 1 (b) — A dog sniffing at a bone on the ground" />

      <TipBox>The first animals evolved about 600 million years ago during the late Precambrian.</TipBox>
    </div>
  );
}
