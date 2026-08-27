import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh6Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <h2 className="font-heading text-base font-bold text-emerald-800">
        16. Pictures of different kinds of plants and animals which live in ponds and tanks
      </h2>
      <p>
        Pictures of different kinds of plants and animals which live in ponds and tanks in our surroundings
        are given below for you (Fig. 5). Try to know their names with the help of your teacher or library
        and write them.
      </p>

      {/* Fig 5 Spanning Full Width */}
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
        <img
          src="/assets/images/C6-science/ch6_fig5.png"
          alt="Fig. 5 — Different kinds of plants and animals living in ponds and tanks"
          className="max-w-[480px] w-full h-auto rounded-lg shadow-sm"
        />
        <p className="text-center font-body text-xs italic text-foreground/50 mt-3 font-semibold">
          Fig. 5
        </p>
      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The seas, oceans that stretch across the earth has 300 million cubic miles of water.</TipBox>
      </div>
    </div>
  );
}
