import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const SUMMARY_POINTS = [
  "Cotton, wool, silk, jute are all obtained from plants and animals. They are called natural fibres.",
  "Fibres made of chemicals are called artificial or synthetic fibres.",
  "Tiny strands like structures are called fibres. These fibres are converted into yarn. Yarns are woven together to make a fabric.",
  "Cotton fibres are made from cotton ball.",
  "Jute fibre is obtained from the stem of a jute plant.",
  "The process of removing seeds from cotton wool is called ginning.",
  "Making cotton yarn from fibre is called spinning.",
  "Handlooms and power looms are used in weaving fabrics."
];

const EXERCISES: ExerciseItem[] = [
  { text: "What will happen if a rain coat is made from cotton fabric?" },
  { text: "Make a flow chart showing the process of getting a fabric (clothes) from cotton plant." },
  { text: "Coconut fibre is also similar to cotton. Make a list of some articles made of coconut fibre." },
  {
    text: "See the list of garments mentioned below. Think of the fabric used to make them. Classify the fabric of following garments as natural or artificial.",
    extra: <p className="mt-1 font-semibold text-indigo-805 text-xs">Dhotis, Venkatagiri saree, jeans, umbrella cloth, bed-sheet, your shirt or skirt, rain-coat, gunny-bags.</p>
  },
  { text: "Explain the process of making yarn from cotton wool." },
  {
    text: "Small strand like structures in cotton are called :",
    extra: <p className="mt-1 text-foreground/70 text-xs italic">a. fabric &nbsp; b. fibre &nbsp; c. loom &nbsp; d. cocoon</p>
  },
  { text: "Making fabric from cotton yarn is called....................." },
  { text: "What would you do to remove wrinkles from cotton clothes?" },
  { text: "Prepare a bag using cloth. Collect pieces of coloured fabric and make designs on your bag by using them. Display it on school display day." },
  { text: "Make a scrap book containing pictures of different types of fabric and name them." },
  { text: "Discuss with your teacher and prepare an information chart about spinning mills in our state." }
];

export function C6ScienceCh8Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            In the same manner, weave a paper sheet by using colourful paper strips. Palm leaves peepal
            leaves are also used in knitting mats.
          </p>
          <p>
            The handloom industry is well developed in our State. Places like Gadwal, Siricilla, Venkatagiri,
            Kothakota, Narayanpet and Pochampalli are famous for handloom industry. Warangal is famous for
            carpet industry.
          </p>

          <div className="rounded-[16px] border border-indigo-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-indigo-800">Keywords</p>
            <p className="mt-1 font-body text-xs text-foreground/80 leading-relaxed">
              Fabrics, fibres, yarn, natural fibres, artificial fibres, ginning, spinning, weaving, looms
            </p>
          </div>

          <div className="rounded-[16px] border border-indigo-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-indigo-800 mb-2">What we have learnt</p>
            <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
              {SUMMARY_POINTS.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-4">
            <h2 className="font-heading text-base font-bold text-indigo-800">Improve your learning</h2>
            <div className="flex flex-col items-center border border-indigo-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-indigo-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 font-mono select-none">
                H4D5Q9
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES} start={1} />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Rayon threads are made by adding chemicals to the wood pulp.</TipBox>
      </div>
    </div>
  );
}
