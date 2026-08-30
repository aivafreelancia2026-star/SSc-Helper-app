import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh14Page12() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h3 className="font-heading text-base font-bold text-emerald-800">
            14.7.1. Locomotion in fish :
          </h3>
          <p className="text-xs">
            Fish swim in water. Do they swim the same way as humans? Is there any difference? What features
            help fish in swimming and how?
          </p>

          <p className="font-bold text-emerald-850">Activity-12</p>
          <p className="text-xs">
            Make a paper boat. Put it in water and push it with narrow end pointing forward and observe (fig. 20.a).
            Now hold the boat sideways and push it into water from the broad side (fig. 20.b). What did you
            observe? In which process was it easy to move the boat?
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[160px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig20_a_b.png"
              alt="Fig. 20(a) and 20(b) — Pushing a paper boat in water from narrow vs broad sides"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 20(a) & 20(b)
            </p>
          </div>

          <p className="text-xs pt-2">
            The body of the fish is streamlined. The shape is such that it allows the fish to move in water
            easily. The skeleton of the fish is covered with strong muscles. While swimming, muscles make the
            front part of the body swing towards one side while the tail swings its body towards the opposite
            side (fig. 21).
          </p>
          <p className="text-xs">
            This creates a jerk and pushes the body forward. A series of such jerks help the fish swim
            forward. The tail fins also aid in this movement.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig21.png"
              alt="Fig. 21 — Wave swing sequence of a fish swimming in water"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 21
            </p>
          </div>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            14.7.2. Locomotion in birds :
          </h3>
          <p className="text-xs">
            Birds fly in the air and walk on the ground. Birds can fly because their bodies are well suited
            for flying. Their bones are hollow and light.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig22.png"
              alt="Fig. 22 — Bird skeleton drawing showing wing bone modifications"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 22
            </p>
          </div>

          <p className="text-xs pt-2">
            The bones of the hind limbs are typical for walking and perching. Bony parts of the fore limbs
            are modified to hold muscle of flight which is used to move the wings up and down. (Fig-22)
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>If sponges are squeezed into juice and kept still. They will turn into sponges again.</TipBox>
      </div>
    </div>
  );
}
