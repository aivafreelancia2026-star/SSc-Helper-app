import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES: ExerciseItem[] = [
  { text: "What is an electric circuit? Explain with a diagram." },
  { text: "What are the parts of a torch-light?" },
  { text: "In a bulb the part which gives us light is:\na) Metal base\nb) Glass chamber\nc) Filament\nd) Terminals" },
  { text: "Classify the following into electric conductors and electric insulators:\na) Water\nb) Plastic pen\nc) Pencil lead\nd) Dry cotton cloth\ne) Wet cotton cloth\nf) Dry wood\ng) Wet wood" },
  { text: "Niharika observed an electrician repairing a street light wearing gloves on his hand. She asked him some questions. What would be those questions?" },
  { text: "In activity 4 we obsereved some situations where the torch bulb glows. Niharika challenged her friends that she could make the bulb not glow even with the cells kept in proper position. How she could have done?" },
  { text: "Connect a circuit as shown in the following diagram.\na) Does the bulb glow? Why?\nb) Draw the circuit so that the bulb glows." }
];

export function C6ScienceCh12Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            &ldquo;Well, why not try bamboo fiber as a filament?&rdquo; He executed his idea and amazingly
            the bamboo filament burned continuously for a number of days. Finally he succeeded in making a
            cotton filament that was even better than the bamboo one.
          </p>
          <p>
            As a result of many experiments, tungsten filament bulbs which we are using today were invented.
            Is n&apos;t that really surprising?
          </p>

          <div className="rounded-[16px] border border-sky-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-sky-800">Keywords</p>
            <p className="mt-1 font-body text-xs text-foreground/80 leading-relaxed">
              Electricity, cell, bulb, terminals, filament, switch, circuit, electric conductor, electric insulator, tungsten
            </p>
          </div>

          <div className="rounded-[16px] border border-sky-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-sky-800 mb-2">What we have learnt</p>
            <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
              <li>Cell is the source of electrical energy in a torch-light.</li>
              <li>Cell has two terminals, positive (+) and negative (-).</li>
              <li>The filament of the bulb emits light.</li>
              <li>Electricity requires a closed path for it to flow.</li>
              <li>A switch helps us to allow or break the flow of electricity in a circuit.</li>
              <li>In torch-light, when the cell, bulb and switch form a closed circuit, the bulb glows.</li>
              <li>Substances which allow the flow of electricity through them are known as conductors of electricity.</li>
              <li>Substances which do not allow the flow of electricity through them are known as insulators of electricity.</li>
              <li>The electric bulb was invented by Thomas Alva Edison.</li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex items-center justify-between border-b border-sky-100 pb-4">
            <h2 className="font-heading text-base font-bold text-sky-805">Improve your learning</h2>
            <div className="flex flex-col items-center border border-sky-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-sky-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-sky-50 border border-sky-100 flex items-center justify-center text-[10px] font-bold text-sky-700 font-mono select-none">
                C8F6T3
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES.slice(0, 6)} start={1} />
          
          <div className="pt-2">
            <h3 className="font-heading text-xs font-bold text-sky-900 mb-2">7. Connect a circuit as shown:</h3>
            <div className="flex justify-center bg-white rounded-xl border border-sky-100 p-2 max-w-[120px] mx-auto shadow-xs">
              <img
                src="/assets/images/C6-science/ch12_fig10.png"
                alt="Fig. 10 — Open loop circuit layout"
                className="max-w-full h-auto rounded"
              />
            </div>
            <ul className="list-alpha pl-5 text-xs text-foreground/80 mt-2 space-y-1">
              <li>a) Does the bulb glow? Why?</li>
              <li>b) Draw the circuit so that the bulb glows.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The world&apos;s first experimental electric power plant opened in Godalming, England.</TipBox>
      </div>
    </div>
  );
}
