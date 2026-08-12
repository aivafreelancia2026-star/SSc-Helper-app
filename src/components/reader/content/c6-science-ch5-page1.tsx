import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "Objects that would have broken" }, { value: "Cup, ", editable: true }],
  [{ value: "Objects that would not have broken" }, { value: "Stainless steel glass, ", editable: true }],
];

export function C6ScienceCh5Page1() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>Mary was sitting in her room and studying. Suddenly she heard a loud sound from the kitchen. Mary went to the kitchen and saw a cat running away.</p>

      <ul className="list-disc space-y-1.5 pl-5">
        <li>Can you guess what could have happened? Write it down in your note book.</li>
      </ul>

      <FigureNote emoji="🐈" caption="Fig. 1 — A cat startled among fallen kitchen objects" />

      <p>
        Mary saw that many objects had fallen on the floor. Some of them were broken and some
        were not. Can you guess which objects might have broken and which might not have broken?
        Fill in the table 1.
      </p>

      <FillInTable title="Table 1" columns={["", ""]} rows={TABLE1_ROWS} storageKey="c6-science-ch5-table1" />

      <ul className="list-disc space-y-1.5 pl-5">
        <li>Can you guess reasons why some objects broke and some did not?</li>
      </ul>

      <p>In our day to day life, we use several things for different activities. These things are made of different materials.</p>

      <h2 className="font-heading text-base font-bold text-primary">5.1. Materials and Objects</h2>
      <h2 className="font-heading text-base font-bold text-primary">
        Activity-1: Finding the materials used to make different objects
      </h2>
      <p>Every object is made up of some material. To make any object one or more materials are needed.</p>
      <p>For example body of your pen is made of plastic, where as its clip is made of Iron.</p>
      <p>
        A list of things is given in table 2. Name the materials from which each object may
        possibly be made of. Add some more things you know to the list?
      </p>
      <p>(If you don&apos;t know which material the object is made of, discuss with your friends and find out.)</p>

      <TipBox>The color of a object depends on the color of light it transmits.</TipBox>
    </div>
  );
}
