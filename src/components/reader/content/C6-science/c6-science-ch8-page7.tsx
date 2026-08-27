import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh8Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            In the same way fibre is also made from Red sorrel (Gongura) and Bamboo. Hemp and flax are
            also plant fibres which are used in making clothes but in smaller quantities as compared to
            cotton.
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">8.6.2. Yarn to fabric</h2>
          <p>
            The yarn that is prepared from fibre is used to make fabric.
          </p>
          <p>
            With the help of Takli, Charka, Strands of yarn are arranged in vertical (<em>padugu</em>)
            and horizontal (<em>peka</em>) rows in a loom to weave fabric. Two sets of yarn arranged
            together to make fabric is called weaving. Weaving is done on looms.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch8_fig8.png"
              alt="Fig. 8 — Weaving on a handloom setup"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 8
            </p>
          </div>

          <p className="pt-2">
            Spinning of yarn on large scale is now done by using machines. Power looms are run by
            electricity. The machines used by humans to weave at home are called handlooms (Fig. 8).
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch8_fig9.png"
              alt="Fig. 9 — Loom weaving machinery"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 9
            </p>
          </div>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            Activity-7: Knitting of mats
          </h2>
          <p>
            Take coconut leaves or two different colour paper strips. Cut and remove middle vein of the
            coconut leaf to get two halves. Now put these strips parallel to each other (Fig. 10). Take
            one more strip and insert horizontally and alternately between the vertical strips. Finally
            you will get a sheet like structure. This is the way a mat is prepared.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch8_fig10.png"
              alt="Fig. 10 — Paper strip knitting pattern"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 10
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Polyester, the most commonly used manufactured fiber, is made from petroleum.</TipBox>
      </div>
    </div>
  );
}
