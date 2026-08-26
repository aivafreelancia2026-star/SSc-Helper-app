import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE2_ROWS: TableCell[][] = [
  [{ value: "1." }, { value: "Eats only plants" }, { value: "Cow, ", editable: true }],
  [{ value: "2." }, { value: "Eats only animals" }, { value: "Fox, ", editable: true }],
  [{ value: "3." }, { value: "Eats both" }, { value: "Human beings, ", editable: true }],
];

export function C6ScienceCh4Page3() {
  return (
     <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <p>
        We have seen that all animals depend on different types of food. Now let us do the above
        exercise in a slightly different manner. Add your own examples in the last column of table
        2.
      </p>

      {/* Table 2 Full Width */}
      <FillInTable
        title="Table 2"
        columns={["S.No.", "Food habits", "Examples"]}
        rows={TABLE2_ROWS}
        storageKey="c6-science-ch4-table2"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>Look at table 2 and try to answer the following questions:</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Which group of organisms (plants, animals) have an advantage in finding food? Why do you think so?</li>
            <li>Could the animals in food group 3 depend only on plants if animals were not available? Why?</li>
            <li>What will happen if all animals eat only plants?</li>
          </ul>

          <p className="pt-2">
            Animals that depend only on plants for food are called <strong>herbivores</strong>. Animals
            that depend on other animals for food are called <strong>carnivores</strong>. Animals that
            take food from plants and animals are called <strong>omnivores</strong>.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>
              Suppose omnivorous animals start depending only on plants. How it could affect the
              nature. Discuss in groups and write.
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p>We know that animals have their own ways of collecting and taking in food. Let us see how they do this.</p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">4.2. Search for food</h2>
          <p>
            Plants and animals are the main sources of food in our surroundings. Like us, animals also
            depend on these sources of food. Every animal has its own style of getting food. They track
            down, collect, grab or hunt and finally take food into the mouth.
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">4.3. Tracking down food</h2>
          <p>
            Most animals consume food that is regularly found. But, first, they must locate food. To
            do this, they use a wide range of senses - smell, sight, hearing, taste and touch. Some
            animals rely on more than one sense and they can therefore be highly developed in them.
          </p>
          <p className="pt-1 text-emerald-800 italic">Let us consider some examples to understand this better.</p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Some types of monkeys eat other animals like carnivores.</TipBox>
      </div>
    </div>
  );
}
