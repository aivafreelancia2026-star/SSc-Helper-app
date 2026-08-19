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
  "groundnuts, red chillies, garlic"
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
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Fig 2 Container */}
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
        <img
          src="/assets/images/C6-science/fig2.png"
          alt="Fig 2 : Ingredients required to cook Biryani"
          className="max-w-full h-auto rounded-lg shadow-sm"
        />
        <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
          Fig 2 : Ingredients required to cook Biryani
        </p>
      </div>

      {/* Two-Column Text Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <p>
            To make different kinds of food we need different materials. These materials which are
            required to prepare food are known as ingredients.
          </p>
          <p>
            Discuss in groups some food items you like to eat and try to find out what ingredients are
            used to prepare them. Write them in a table form.
          </p>
          <p>
            When you purchase packaged food, biscuits or any cool drink, you will find their
            ingredients written on their packets.
          </p>
        </div>

        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-4 md:pt-0 md:pl-8">
          <p>
            Have you ever thought from where these ingredients come. Do you know we get vegetables and
            fruits from plants; eggs, milk, meat from animals. Is there any other source you can think
            of?
          </p>
          <p>
            Some ingredients have been listed in Table-3. Find out the source of each ingredient; if
            it is a plant mark (P) or an animal (A), or something else (O).
          </p>
        </div>
      </div>
      
      {/* Table 2 */}
      <div className="pt-2">
        <FillInTable
          title="Table 2 - Ingredients of some food items"
          columns={["S.No.", "Food items you like", "Required ingredients (comma-separated, e.g. milk, rice, sugar)"]}
          rows={TABLE2_ROWS}
          storageKey="c6-science-ch1-table2"
        />
      </div>

      {/* Tip Box */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Chicory is beneficial for digestive and circulatory system.</TipBox>
      </div>
    </div>
  );
}
