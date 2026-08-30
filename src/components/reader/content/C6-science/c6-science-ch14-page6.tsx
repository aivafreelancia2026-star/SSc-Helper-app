import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh14Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            You saw earlier that muscles are joined to the bones to help them move. In the same way, two
            bones are joined together in a special way by fibres. These fibres are called
            <strong> ligaments</strong> (Fig. 6).
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[130px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig6.png"
              alt="Fig. 6 — Knee joint ligament diagram connecting Thigh bone and Calf bones"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 6
            </p>
          </div>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            14.4.1. Jaw bone
          </h3>
          <p className="font-semibold text-emerald-850">Activity-4:</p>
          <p className="text-xs">
            Ask your friend to open his mouth and move his lower jaw up and down as well as sideways. Observe
            his face carefully.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Did you notice any joint in the bones near his ear?</li>
          </ul>

          <div className="flex gap-4 items-center pt-2">
            <img
              src="/assets/images/C6-science/ch14_fig7.png"
              alt="Fig. 7 — Girl opening mouth demonstrating lower jaw bone joint"
              className="max-w-[50px] h-auto rounded shadow-xs"
            />
            <p className="text-xs">
              This is the place where the lower jaw bone is joined to the skull. Press your finger on both sides of
              your face and move the jaw. Notice the area where the jaw joins with the skull.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h3 className="font-heading text-base font-bold text-emerald-800">
            14.4.2. The clavicle
          </h3>
          <p className="font-semibold text-emerald-850">Activity-5:</p>
          <p className="text-xs">
            Fold one arm and rest it on your waist. Now slowly lift your arm and shoulder together (Fig. 8).
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[120px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig8.png"
              alt="Fig. 8 — Boy lifting shoulder with arm on waist"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 8
            </p>
          </div>

          <p className="text-xs pt-2">
            Run a finger of your other hand from just below your neck towards your shoulder. Try and locate a raised
            bone there and the one behind it. The raised bone is called <strong>clavicle</strong> and the
            bone behind it is the shoulder blade.
          </p>
          <p className="text-xs">
            There are two clavicles on either side of the chest that keep the shoulders apart.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The femur is the longest and strongest bone in the body. It is located in your thigh.</TipBox>
      </div>
    </div>
  );
}
