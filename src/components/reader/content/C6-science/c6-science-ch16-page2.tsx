import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "1. Growth" }, { value: "✓" }, { value: "✓" }, { value: "✓" }, { value: "×" }],
  [{ value: "2. Movement" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "3. Taking Food" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "4. Breathing" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "5. Getting rid of waste" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "6. Respond to Heat" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "7. Respond to touch" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "8. Respond to light" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "9. Giving birth to young ones" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh16Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            Don&apos;t forget to give reasons for why you think something is living.
          </p>
          <p className="text-xs">
            Chair and tables also have four legs like buffalo. And why don&apos;t they move? Trees also
            cannot move but they can produce seeds which produce new plants. How do we know whether some
            things are living and some others are non-living?
          </p>
          <p className="text-xs">
            You will notice that there are many characteristics of living things. Do all living things
            have common characteristics that make them different from nonliving things?
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Do you know you are a living being? How can you say that?</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-emerald-805 pt-2">
            Activity-2: Compare the characteristics
          </h3>
          <p className="text-xs">
            Some characteristics that are listed in Table-1 tells you that you are a living being. Compare
            these characteristics with plants, animals and rocks.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <FillInTable
            title="Table 1: Characteristics comparison list"
            columns={["Characteristics", "In you", "In plants", "In animals", "In rocks"]}
            rows={TABLE1_ROWS}
            storageKey="c6-science-ch16-table1"
          />

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs pt-2">
            <li>Do plants and animals possess the same characteristics as you do?</li>
            <li>In which way do the characteristics of plants differ from you or from other animals?</li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>A new born blue whale measures 23 feet (=7 meters) long and weighs up to 6,000 pounds (3000 kg).</TipBox>
      </div>
    </div>
  );
}
