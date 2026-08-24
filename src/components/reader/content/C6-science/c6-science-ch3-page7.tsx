import { SummaryBox } from "@/components/reader/summary-box";
import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const SUMMARY_POINTS = [
  "The process of conversion of water vapour into water is called condensation.",
  "The cycle of evaporation and condensation of water, present on the Earth's surface, causes rain.",
  "The conversion of water into water vapour, water vapour to clouds and clouds to rain is known as water cycle.",
];

const EXERCISES: ExerciseItem[] = [
  { text: "Explain how clouds are formed?" },
  { text: "Write how water from clouds reaches the Oceans and seas?" },
  { text: "When do clouds become cool?" },
  { text: "Explain the relationship between the heat of sun and evaporation." },
  { text: "Why do we experience cloud like smoke near our mouth while we speak during winter season?" },
  {
    text: 'Correct the given sentence if necessary. "If the size of water drops decreases in the clouds, they can no longer hold the water drops."',
  },
  {
    text: "Which of the following days is more suitable for drying of washed clothes? Explain why.",
    extra: <p className="mt-1 italic text-foreground/70">(a) Windy day &nbsp; (b) Cloudy day</p>,
  },
  {
    text: "Which of the following statements are right or wrong?",
    subItems: [
      "evaporation takes place quickly when more heat is supplied.",
      "for condensation of water, it should be cooled.",
      "water vapour is formed due to evaporation.",
    ],
  },
  { text: "Draw a diagram which explains the water cycle." },
  { text: "How do you feel when you see a Rainbow? Express your feelings in the form of a song or a poem." },
  { text: "Clouds once seen at a particular point, may not be there after sometime? Why?" },
  {
    text: "Revanth blew air from his mouth onto the mirror while he was getting ready to school. He observed that the image in the mirror was not clear. What may be the reason?",
  },
  {
    text: "If it is raining in a village at the same time you don't find rain in another village. Why do you think it is happening so?",
  },
  { text: "If condensation fails to occur in nature what changes happen in water cycle?" },
  {
    text: "Why does the driver of a vehicle wipe the glass inside, even if the wiper is working on the outer surface of the glass when he drives in rain?",
  },
];

export function C6ScienceCh3Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <SummaryBox title="What we have learnt (continued)" points={SUMMARY_POINTS} />

          <div className="flex items-center justify-between border-b border-sky-100 pb-4 pt-2">
            <h2 className="font-heading text-base font-bold text-primary">Improve your learning</h2>
            <div className="flex flex-col items-center border border-sky-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-sky-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-sky-50 border border-sky-100 flex items-center justify-center text-[10px] font-bold text-sky-700 font-mono select-none">
                K8R1V6
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES.slice(0, 7)} start={1} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={EXERCISES.slice(7)} start={8} />
        </div>

      </div>

      {/* Dangerous Plastic Bags card spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <div className="rounded-[16px] border-2 border-red-200 bg-red-50/50 p-6 shadow-xs">
          <p className="text-center font-heading text-base font-bold text-red-800">Dangerous plastic bags</p>
          <p className="mt-3 indent-4 font-body text-sm leading-relaxed text-foreground/80">
            We use plastic bags, covers frequently. We use disposable plates and glasses in functions.
            All food materials are also packed with polythene paper in supermarkets. In this way we
            use polythene covers and throw away. But it takes very long time to decompose and mix
            into soil. These layers of plastics prevent the sinking of rain water into the soil. It
            leads to decreasing of ground water. They also obstruct drain water and channels during
            rainy season. It results in floods. Mainly cities and towns are affected by this.
          </p>
        </div>
      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-2">
        <TipBox>In some rainforests of equatorial region there are flying squirrels and snakes are present.</TipBox>
      </div>
    </div>
  );
}
