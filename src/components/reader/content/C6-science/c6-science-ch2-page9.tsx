import { FigureNote } from "@/components/reader/figure-note";
import { SummaryBox } from "@/components/reader/summary-box";
import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const SUMMARY_POINTS = [
  "Lode stone is a natural magnet.",
  "Magnets are of different shapes i.e. bar magnets, horse shoe magnets, ring type magnets, disc magnets, etc.",
  "The materials that are attracted by magnets are called magnetic materials. The materials that are not attracted by magnets are called non-magnetic materials.",
  "A bar magnet always has two ends whose attracting capacity is more than other parts of it. The poles of the magnet lie at these ends.",
  "Each magnet has two magnetic poles: 1) North Pole and 2) South Pole.",
  "A freely suspended magnet always aligns in the North-South direction.",
  "Unlike poles of two magnets attract each other; whereas like poles repel each other.",
  "Magnetic property possessed by a magnetic substance due to the presence of a magnet near to it, is called magnetic induction.",
];

const EXERCISES: ExerciseItem[] = [
  {
    text: "Predict which of the following material are magnetic and non-magnetic material. Test with a bar magnet and check your predictions. What do you say after testing all materials?",
    extra: (
      <p className="mt-1 italic text-foreground/70">
        Plastic, Iron, Stainless steel, Wood, Aluminium, Gold, Silver, Copper, Paper, Cloth.
      </p>
    ),
  },
  { text: "List out the magnetic and non magnetic materials in your class room." },
  {
    text: "For which purposes do people use magnets in their daily life? Ask your family members and elders and collect the information and prepare a list of uses of magnets.",
  },
  { text: "Draw a bar magnet and locate the poles." },
  {
    text: "Observe and locate North and South poles for the second bar magnet shown in the figure below.",
    extra: <FigureNote emoji="🧲" caption="Two bar magnets side by side, ends numbered ① and ② — first magnet marked S and N" />,
  },
];

export function C6ScienceCh2Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch2_fig11b.png"
              alt="Fig. 11 (b) — A bar magnet held near a safety pin, not touching it"
              className="max-w-full h-auto rounded-lg shadow-sm max-h-[140px]"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 11 (b) — A bar magnet held near a safety pin, not touching it
            </p>
          </div>

          <p className="pt-2">
            Ask your friend to bring an alpin and touch the safety pin. You will notice that the alpin
            will stick to the safety pin. This shows that due to magnetic induction safety pin acts as
            a magnet.
          </p>
          <p>
            Magnetic property possessed by a magnetic substance due to the presence of a magnet near it,
            is called magnetic induction.
          </p>

          <div className="rounded-[16px] border border-border/50 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-primary">Keywords</p>
            <p className="mt-1 font-body text-xs text-foreground/80">
              Magnet, Magnetic compass, magnetic material, non-magnetic material, North Pole, South
              Pole, like poles, unlike poles, attraction, repulsion, magnetic induction
            </p>
          </div>

          <SummaryBox
            title="What we have learnt"
            points={SUMMARY_POINTS.slice(0, 5)}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <SummaryBox
            title="What we have learnt (continued)"
            points={SUMMARY_POINTS.slice(5)}
          />

          <div className="flex items-center justify-between border-b border-sky-100 pb-4 pt-2">
            <h2 className="font-heading text-base font-bold text-primary">Improve your learning</h2>
            <div className="flex flex-col items-center border border-sky-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-sky-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-sky-50 border border-sky-100 flex items-center justify-center text-[10px] font-bold text-sky-700 font-mono select-none">
                Z9Q9Q1
              </div>
            </div>
          </div>

          <ExerciseList
            items={[
              ...EXERCISES.slice(0, 4),
              {
                text: "Observe and locate North and South poles for the second bar magnet shown in the figure below.",
                extra: (
                  <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-sky-100 p-3 mt-2">
                    <img
                      src="/assets/images/C6-science/ch2_q5_magnet.png"
                      alt="Two bar magnets side by side"
                      className="max-w-full h-auto rounded shadow-xs"
                    />
                    <p className="text-center font-body text-[10px] italic text-foreground/50 mt-1.5">
                      Two bar magnets side by side, ends numbered ① and ②
                    </p>
                  </div>
                )
              }
            ]}
          />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Earth magnets can be 20 times more powerful than a fridge magnet.</TipBox>
      </div>
    </div>
  );
}
