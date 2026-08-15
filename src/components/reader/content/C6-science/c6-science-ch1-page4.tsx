import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE3_DATA: [string, string[], string[]][] = [
  ["Cooking Oil", ["Plant", "P"], ["Groundnut", "Sunflower", "Coconut"]],
  ["Honey", ["Animal", "A"], ["Bee", "Bees"]],
  ["Chips", ["Plant", "P"], ["Potato"]],
  ["Turmeric powder", ["Plant", "P"], ["Turmeric"]],
  ["Salt", ["Others", "O"], ["Sea water", "Sea", "Mineral"]],
  ["Dough", ["Plant", "P"], ["Wheat"]],
  ["Meat", ["Animal", "A"], ["Goat", "Chicken", "Sheep"]],
  ["Rice", ["Plant", "P"], ["Rice plant", "Paddy"]],
  ["Eggs", ["Animal", "A"], ["Hen"]],
  ["Sugar", ["Plant", "P"], ["Sugarcane"]],
  ["Peanuts", ["Plant", "P"], ["Groundnut plant", "Groundnut"]],
];

const TABLE3_ROWS: TableCell[][] = TABLE3_DATA.map(([ingredient, category, source]) => [
  { value: ingredient },
  { value: "", editable: true, correctAnswers: category },
  { value: "", editable: true, correctAnswers: source },
]);

export function C6ScienceCh1Page4() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>Name the plant or animal also. You can take the help of your friends or elders.</p>

      <FillInTable
        title="Table 3 : Who gives us food?"
        columns={["Ingredients", "Plant/Animal/Others", "Name of plant or animal"]}
        rows={TABLE3_ROWS}
        storageKey="c6-science-ch1-table3"
      />

      <p>
        Try to enrich this list as much as you can. You will find that from animals we get milk,
        eggs and meat. If you observe carefully you will notice that there are a number of plants
        from which we get different kinds of food. Goats and sheep give us meat. Hens and ducks
        gives us meat and eggs. Can you elaborate this list. In plants we eat different parts, like
        leaf of spinach and coriander plants, flower of cauliflower plant, fruit of tomato and
        drumstick plants.
      </p>

      <div className="space-y-1">
        <p>• We get varieties of food material from plants</p>
        <p>• In some plants we eat only some parts as food.</p>
        <p>• In some we take entire plant as food. You may be having some doubt about the salt.
          It is a mineral and obtained from the sea.</p>
      </div>

      <p>
        Identify the part of the plant given in the table-4. You may discuss with your friends and
        write.
      </p>

      <TipBox>
        Beet roots are high in carbohydrate levels and should therefore be used frequently.
      </TipBox>
    </div>
  );
}
