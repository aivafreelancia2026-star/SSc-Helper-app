import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES: ExerciseItem[] = [
  { text: "What is a habitat?" },
  { text: "Name some plants and animals that live in terrestrial habitat." },
  { text: "Why can&apos;t a fish live on land?" },
  { text: "&ldquo;Animal skin is a habitat for some organisms.&rdquo; What do you understand by this statement?" },
  {
    text: "Identify the habitats where more than one organism lives. Write different habitats where an animal lives.",
    extra: <p className="mt-1 font-semibold text-emerald-800">Human intestine, pond, kitchen, garden, tree, underground, grass.</p>
  },
  { text: "What would happen if a habitat is disturbed or destroyed?" },
  { text: "Why do some animals change their habitat?" },
  { text: "Observe a spider in its web and write how a spider uses its habitat." },
  { text: "Collect a hydrilla plant. Put it in a glass of water and observe for a week how it grows. Record your observation." },
  { text: "Take a map of Telangana and colour the areas where forests grow." },
  { text: "&ldquo;I am a living being, I have four legs. I live in water and also on land.&rdquo; Guess Who am I? Think who are there in my habitat along with me." },
  { text: "Write your experiences with your pet dog / cat / cow etc. that shows its affection on you." },
  { text: "Raziya doesn&apos;t want to disturb squirrels that eat fruits on the guava tree in her house. Why does she do so?" },
  { text: "Prepare a map that represents different habitats which exist in your school." },
  { text: "Prepare an article to deliver a speech in Literary Association meeting on &ldquo;Animals also have right to live.&rdquo;" },
];

export function C6ScienceCh6Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-2 pl-5 text-foreground/80 font-medium">
            <li>All habitats may be broadly grouped into terrestrial (land) and aquatic (water).</li>
            <li>Several kinds of plants and animals share the same habitat.</li>
            <li>Habitats shows the diversity of nature.</li>
            <li>Habitats are specific to the particular organism living there.</li>
            <li>Birds often change habitat in search of better living conditions. For example, some birds change habitat before laying eggs.</li>
            <li>We must not destroy habitats of other organisms to satisfy our needs; rather we must try to protect them.</li>
          </ul>

          <div className="flex items-center justify-between border-b border-sky-100 pb-4 pt-4">
            <h2 className="font-heading text-base font-bold text-emerald-800">Improve your learning</h2>
            <div className="flex flex-col items-center border border-emerald-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-emerald-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 font-mono select-none">
                X9P9Q5
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES.slice(0, 5)} start={1} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={EXERCISES.slice(5)} start={6} />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Where fresh water mixes with salt water you&apos;ll find mangroves.</TipBox>
      </div>
    </div>
  );
}
