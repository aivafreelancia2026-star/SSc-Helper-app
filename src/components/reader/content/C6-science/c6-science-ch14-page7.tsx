import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh14Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">These two bones are called shoulder bones.</p>
          
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[130px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig9.png"
              alt="Fig. 9 — Diagram showing where the clavicle joins the shoulder blade"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 9
            </p>
          </div>

          <p className="text-xs">
            Look at Fig. 9 showing where the clavicle joins the shoulder blade. Now try to locate the joint
            between the clavicle and shoulder blade.
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            14.4.3. The ribs
          </h3>
          <p className="font-semibold text-emerald-850">Activity-6:</p>
          <p className="text-xs">
            Take a deep breath and hold it for a little while. Feel your chest bones by gently pressing the
            middle of the chest. These bones are called ribs. Count as many ribs as possible. (Fig. 10)
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[130px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig10.png"
              alt="Fig. 10 — Chest rib cage layout illustrated on a boy's chest"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 10
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            Ribs are curiously bent and join the chest bone and the back bone together to form a box. This is
            called the rib cage. Some important internal parts of our body lie protected inside this cage. Try
            to guess those important parts.
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            14.4.4. Backbone
          </h3>
          <p className="font-semibold text-emerald-850">Activity-7:</p>
          <p className="text-xs">
            Ask your friend to bend forward at the waist and try to touch his toes with his palms. Run a finger
            along the centre of his back from below the neck. A long structure running down the middle of his back
            is called the backbone. The small bones that make up this backbone are called vertebrae.
          </p>
          <p className="text-xs">
            The spinal cord passes through the vertebrae of the backbone. (Fig. 11)
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig11.png"
              alt="Fig. 11 — Backbone run and vertebral column spine drawing"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 11
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The average adult heart beats 72 times a minute; 100,000 times a day; 3,600,000 times a year; and 2.5 billion times during a lifetime.</TipBox>
      </div>
    </div>
  );
}
