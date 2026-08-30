import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES_L: ExerciseItem[] = [
  { text: "Between an electric bulb and a tube light, which forms sharp shadows of objects? Do experiment to find and give the reason." },
  { text: "What is required to get a shadow of an opaque body?" },
  { text: "How can you explain that light travels in a straight line?" },
  { text: "Explain what happens if the size of the hole in a pinhole camera is as big as the size of a green gram? Increase the size of the hole in pinhole camera and look at any object with that camera. What do you find? Write reasons for that." },
  { text: "Observe the light source and mark the place where the screens should be kept to get the shadows of the objects given below.\n\n(See three boxes containing Sun & eggplant, torch & chair, pitcher & brush)" },
];

const EXERCISES_R: ExerciseItem[] = [
  { text: "Draw the shadows in your notebook for the objects given below assuming that the light source is exactly above these objects." },
  { text: "Where do you find reflection of light in your daily life? Write few examples." },
  { text: "We would not be able to see any object around us if light does not get reflected. How do you appreciate this property of objects?" },
  { text: "Why do we get shadows of different shapes for the same object?" },
  { text: "What are the differences between a shadow and an image?" },
  { text: "Malati noticed changes in lengths of her shadows during the day time. She got some doubts about this. What could be those doubts?" },
  { text: "Make a pinhole camera." },
  { text: "Collect the objects whose shadow and image look similar and display in your classroom." },
];

export function C6ScienceCh15Page12() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ExerciseList title="" items={EXERCISES_L} start={6} />

          <div className="pt-2">
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[280px] mx-auto">
              <img
                src="/assets/images/C6-science/ch15_fig11_boxes.png"
                alt="Exercise 11 — Diagrams showing light source positions relative to objects for shadow screens"
                className="max-w-full h-auto rounded"
              />
              <p className="text-center font-body text-[10px] italic text-foreground/40 mt-1">
                Exercise 11 Diagrams
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <div className="pt-2">
            <h3 className="font-heading text-xs font-bold text-sky-900 mb-2">
              10. Shadow drawing exercises:
            </h3>
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[180px] mx-auto mb-4">
              <img
                src="/assets/images/C6-science/ch15_fig10_items.png"
                alt="Exercise 10 — Pencil, table, and water pot objects to draw shadows for"
                className="max-w-full h-auto rounded"
              />
              <p className="text-center font-body text-[10px] italic text-foreground/40 mt-1">
                Exercise 10 items
              </p>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES_R} start={10} />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Light travels with different speeds through different mediums such as glass, water and air.</TipBox>
      </div>
    </div>
  );
}
