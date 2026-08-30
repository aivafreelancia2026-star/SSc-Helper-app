import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh14Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          {/* Do you know? Box */}
          <div className="rounded-[16px] border border-emerald-200 bg-emerald-50/40 p-4">
            <div className="flex items-center gap-2 text-emerald-800 mb-2">
              <span className="text-base font-bold">💡</span>
              <p className="font-heading text-sm font-bold tracking-tight">Do you know?</p>
            </div>
            <p className="font-body text-xs text-foreground/80 leading-relaxed">
              There are 33 separate vertebrae in the backbone of an infant. Later out of the last 9
              vertebrae, 5 vertebrae merge to form a single bone and last 4 merge to form another single
              bone. Can you say how many vertebrae you now have?
            </p>
          </div>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            14.4.5. Pelvic girdle
          </h3>
          <p className="font-semibold text-emerald-850">Activity-8:</p>
          <p className="text-xs">
            Press the area just below your waist with the fingers of both hands as shown in Fig. 12. You
            can notice feel similarly shaped bones on both sides of your body. This is called pelvic girdle.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig12.png"
              alt="Fig. 12 — Pelvic bones structure and girdle positioning on body"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 12
            </p>
          </div>

          <p className="text-xs">
            This structure is made of pelvis bones. They enclose the portion of your body below stomach.
            This is also the part you sit on.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-emerald-800">
            14.5. Skull
          </h2>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[120px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig13.png"
              alt="Fig. 13 — Human skull side view skeleton"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 13
            </p>
          </div>

          <p className="text-xs">
            The skull is made up of many bones joined together. It encloses and protects the brain. The
            joints between the skull bones are fused. They are also called fixed joints. (Fig-13)
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            Activity-9: Flexible bones-cartilage
          </h3>
          <p className="text-xs">
            Hold your ear with your fingers, press it and bend it as shown in the Fig. 14. Also touch
            and feel the tip of your nose.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig14.png"
              alt="Fig. 14 — Hand touching ear lobe and nose tip to feel cartilage flexible bone"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 14
            </p>
          </div>

          <p className="text-xs">
            Some parts of the ear and nose are soft and others are hard. The hard parts are made up of a
            structure called cartilage. This is also a bone but it is flexible. Do you find these flexible
            bones in any other part of your body? Cartilage is present in other parts of the skeleton as
            well, like, between the rib and sternum, between the vertebrae of the backbone (spinal cord)
            etc.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The volume of blood pumped by the heart can vary from five to 30 liters per minute.</TipBox>
      </div>
    </div>
  );
}
