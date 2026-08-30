import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh8Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[130px] mx-auto">
            <img
              src="/assets/images/C6-science/ch8_fig4.png"
              alt="Fig. 4 — Cotton balls on plant"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4
            </p>
          </div>

          <p>
            You will see small hairy structures. These are the fibres of cotton. After maturing,
            cotton balls burst and open. Then we can see white coloured thin strands of cotton fibre.
            The process of separating cotton wool from seeds is called <strong>ginning.</strong>
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            8.5. Making yarn from cotton fibre:
          </h2>
          <p>
            Cotton fibre is collected after removing the seeds from the cotton ball. This cotton fibre is
            cleaned, washed and combed. This fine cotton fibre is used to make cotton yarn, but these
            are delicate to make a fabric. Yarns are dyed and coated with chemicals. Then they become
            strong enough to make fabrics.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch8_fig5_a.png"
              alt="Fig. 5 (a) — Hand pulling and twisting cotton yarn"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 5 (a)
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-indigo-800">
            Activity-5: Spinning yarn
          </h2>
          <p className="italic text-foreground/75 text-xs">
            Take cotton ball and remove seeds from it. Take some of it in one hand and gently start
            pulling out cotton by using thumb and forefinger (Fig. 5(a)). Pull it by continuous twisting
            of the fiber that will make yarn. Is it strong or not?
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[80px] mx-auto">
            <img
              src="/assets/images/C6-science/ch8_fig5_b.png"
              alt="Fig. 5 (b) — Takli spindle"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 5 (b)
            </p>
          </div>

          <p className="pt-2">
            The yarn that we make from cotton wool is not strong enough to be used for weaving. To get
            strong yarn from fibre, Takli (Fig. 5 (b)) an instrument for spinning has been used since
            olden days before independence. Charka (Fig. 6) is also used to make yarn.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch8_fig6.png"
              alt="Fig. 6 — Spinning cotton yarn using a Charka"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 6
            </p>
          </div>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              In our State, cotton is widely grown. To pick up mature cotton balls from cotton plants,
              children work in field as child labour. Many voluntary organizations along with government
              are working to eradicate child labour. Think, why are children forced to work as labour?
              Give your own solutions to this problem.
            </p>
          </CalloutBox>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Waldo L. Semon invented polyvinyl chloride (PVC) used in preperation of Flexis</TipBox>
      </div>
    </div>
  );
}
