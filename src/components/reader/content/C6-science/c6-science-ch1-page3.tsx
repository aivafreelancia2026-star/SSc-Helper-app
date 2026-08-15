import { IconGallery } from "@/components/reader/icon-gallery";
import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const INGREDIENT_ITEMS = [
  { emoji: "🫙", label: "Oil" },
  { emoji: "🌶️", label: "Green Chilli" },
  { emoji: "🧄", label: "Garlic" },
  { emoji: "🥔", label: "Potato" },
  { emoji: "🧂", label: "Salt" },
  { emoji: "🌾", label: "Jeera" },
  { emoji: "🌶️", label: "Chilli Powder" },
  { emoji: "🍚", label: "Rice" },
];

const PAYASAM_ANSWERS = [
  "milk, rice, sugar",
  "milk, sugar, rice",
  "milk, semiya, sugar",
  "milk, sugar, semiya",
  "vermicelli, milk, sugar",
  "semiya, milk, sugar",
  "rice, milk, sugar",
  "milk, sugar, vermicelli",
  "milk, sugar, sago",
  "sago, milk, sugar",
  "milk, sugar"
];

const CHICKEN_CURRY_ANSWERS = [
  "chicken, oil, salt, chilli powder",
  "chicken, oil, onions, spices",
  "chicken, onions, oil, spices",
  "chicken, water, spices, salt",
  "chicken, spices, oil, onions",
  "chicken, onions, spices, oil",
  "chicken, oil, spices",
  "chicken, oil, salt",
  "chicken, masala, oil",
  "chicken, oil, salt, chilli, onions"
];

const PALLIKARAM_ANSWERS = [
  "peanuts, red chillies, garlic, salt",
  "peanuts, chillies, salt",
  "groundnuts, chillies, salt",
  "peanuts, salt, chillies",
  "peanuts, red chilli, garlic, salt",
  "peanuts, chilli powder, salt",
  "peanuts, red chillies, salt",
  "groundnuts, red chillies, salt",
  "groundnuts, garlic, red chillies, salt",
  "peanuts, red chillies, garlic"
];

const TABLE2_ROWS: TableCell[][] = [
  [
    { value: "1." },
    { value: "Payasam" },
    { value: "", editable: true, correctAnswers: PAYASAM_ANSWERS }
  ],
  [
    { value: "2." },
    { value: "Chicken curry" },
    { value: "", editable: true, correctAnswers: CHICKEN_CURRY_ANSWERS }
  ],
  [
    { value: "3." },
    { value: "Pallikaram" },
    { value: "", editable: true, correctAnswers: PALLIKARAM_ANSWERS }
  ],
];

export function C6ScienceCh1Page3() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <div className="bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
        <IconGallery items={INGREDIENT_ITEMS} caption="Fig 2 : Ingredients required to cook Biryani" />
      </div>

      <p>
        To make different kinds of food we need different materials. These materials which are
        required to prepare food are known as ingredients.
      </p>
      <p>
        Discuss in groups some food items you like to eat and try to find out what ingredients are
        used to prepare them. Write them in a table form.
      </p>
      
      <FillInTable
        title="Table 2 - Ingredients of some food items"
        columns={["S.No.", "Food items you like", "Required ingredients (comma-separated, e.g. milk, rice, sugar)"]}
        rows={TABLE2_ROWS}
        storageKey="c6-science-ch1-table2"
      />

      <p className="pt-2">
        When you purchase packaged food, biscuits or any cool drink, you will find their
        ingredients written on their packets.
      </p>
      <p>
        Have you ever thought from where these ingredients come. Do you know we get vegetables and
        fruits from plants; eggs, milk, meat from animals. Is there any other source you can think
        of?
      </p>
      <p>
        Some ingredients have been listed in Table-3. Find out the source of each ingredient; if
        it is a plant mark (P) or an animal (A), or something else (O).
      </p>

      <TipBox>Chicory is beneficial for digestive and circulatory system.</TipBox>
    </div>
  );
}
