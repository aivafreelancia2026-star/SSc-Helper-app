import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const ANIMALS = ["Hen", "Cow", "Dog", "Frog", "Snake", "Lizard", "Vulture", "Lion", "Man", "Humming bird"];
const GIVEN: Record<string, string> = { Hen: "Beak, ", Lion: "Legs, claws, mouth, " };

const TABLE3_ROWS: TableCell[][] = ANIMALS.map((animal, i) => [
  { value: String(i + 1) },
  { value: animal },
  { value: GIVEN[animal] ?? "", editable: true },
]);

export function C6ScienceCh4Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <h2 className="font-heading text-base font-bold text-emerald-800">Activity-2</h2>
      <p>In the list given in table 3, write the bodyparts of animals that are used to collect or capture food.</p>

      {/* Table 3 Full Width */}
      <FillInTable
        title="Table 3"
        columns={["S. No.", "Animal", "Bodypart used in collecting food"]}
        rows={TABLE3_ROWS}
        storageKey="c6-science-ch4-table3"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>Look at table 3 and answer:</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Which animals use similar parts in taking food?</li>
            <li>Compare the parts of dog to that of hen. Note down the similarities as well as differences observed by you.</li>
            <li>Compare the parts of humming bird and hen in taking in food.</li>
            <li>Did you find any similarities in the parts used taking food by lion and dog?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What are the similarities and differences between a vulture and a lion in their mode of taking in food?</li>
          </ul>

          <p className="pt-2">You may also add any other observations done by you in the table.</p>
          <p>
            We might have seen that the same part may be used in different ways by different animals.
            For example, tongue may be used by dog in a different manner as compared to frog. The dog
            uses tongue to lick while frog captures and swallows food with it.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>There are approximately 5,400 species of mammals alive today.</TipBox>
      </div>
    </div>
  );
}
