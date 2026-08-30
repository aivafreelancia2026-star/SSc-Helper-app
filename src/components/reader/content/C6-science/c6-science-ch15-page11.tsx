import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES: ExerciseItem[] = [
  { text: "Classify the following objects into transparent, translucent, and opaque:\nCardboard, duster, polythene cover, oily paper, glass, spectacle lens, piece of chalk, ball, table, book, window glass, palm, school bag, mirror, air, water.\nWhich type of materials do you find more in your surroundings?" },
  { text: "Hold a glass slab at one end with your hand and stand in sunlight. See the shadows of your hand and glass slab. Explain what you observed." },
  { text: "We can't identify the presence of completely transparent objects even in light. Is it correct or not? Support your answer." },
  { text: "Why can't we see objects which are behind us?" },
  { text: "If we focus a coloured light on an opaque object, does the shadow of the object possess colour or not? Predict and do the experiment to verify your predictions. (Coloured light can be obtained by covering torch glass with transparent coloured paper)" },
];

export function C6ScienceCh15Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            Did the light that fell on the book not get reflected? We know that we can see the objects only
            after light is reflected from them, as mentioned in activity 1.
          </p>
          <p className="text-xs">
            If light falls on any object, it is reflected back. But we see reflected light, only when
            light falls on the objects like mirror.
          </p>
          <p className="text-xs font-semibold text-amber-700 bg-amber-50/50 border border-amber-200 rounded-xl p-3">
            ⚠️ Precaution: You can reflect sunlight using mirrors and play with it. But make sure that the
            reflected light does not enter your eyes.
          </p>

          <div className="rounded-[16px] border border-sky-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-sky-850">Keywords</p>
            <p className="mt-1 font-body text-xs text-foreground/80 leading-relaxed">
              Light, sources of light, shadow, transparent substances, translucent substances, opaque substances, pinhole camera, image, reflection.
            </p>
          </div>

          <div className="rounded-[16px] border border-sky-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-sky-800 mb-2">What we have learnt</p>
            <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
              <li>We need light to see objects.</li>
              <li>A substance which gives light is known as a source of light.</li>
              <li>Shadows are formed when opaque objects obstruct the path of light.</li>
              <li>In addition to light and object we also need a screen to obtain the shadow of an opaque object.</li>
              <li>Colour of objects cannot be determined by looking at their shadows.</li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <div className="rounded-[16px] border border-sky-100 bg-white/70 p-4">
            <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
              <li>Light travels in a straight line.</li>
              <li>Light gets reflected when it falls on any object.</li>
              <li>People came to an understanding that light travels in a straight line by observing the shapes of shadows.</li>
              <li>An image and shadow are not same.</li>
            </ul>
          </div>

          <div className="flex items-center justify-between border-b border-sky-100 pb-4 pt-2">
            <h2 className="font-heading text-base font-bold text-sky-805">Improve your learning</h2>
            <div className="flex flex-col items-center border border-sky-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-sky-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-sky-50 border border-sky-100 flex items-center justify-center text-[10px] font-bold text-sky-700 font-mono select-none">
                C3Z5Z3
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES} start={1} />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Sundials use shadows to tell the time.</TipBox>
      </div>
    </div>
  );
}
