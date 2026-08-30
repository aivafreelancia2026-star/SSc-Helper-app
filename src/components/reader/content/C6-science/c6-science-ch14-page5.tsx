import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh14Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-emerald-800">
            14.4. Bones
          </h2>
          <p className="text-xs">
            In our body all the different types of bones in different body parts combine together to form
            a single structure. This structure is called a <strong>skeleton.</strong> It is very interesting
            to observe the skeletal system, and it is funny to think, how we would be, if we didn&apos;t have
            skeleton and how we would do our activities.
          </p>

          <p className="text-xs">
            The skeleton provides shape and support to our body. It protects internal delicate organs
            like the brain, heart, lungs etc.
          </p>
          <p className="text-xs">
            Can you name the key bones labeled in Fig. 5? Let us identify Skull, Clavicle, upper arm bone, ribs, pelvic girdle, finger bones, thigh bone (femur), knee bone, calf bones, and toe bones.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[280px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig5.png"
              alt="Fig. 5 — Labeled human skeleton diagram showing Skull, Clavicle, Ribs, Femur"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 5: Skeleton
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The average adult male ostrich, the world&apos;s largest living bird, weighs up to 345 pounds (or) 156 kgs.</TipBox>
      </div>
    </div>
  );
}
