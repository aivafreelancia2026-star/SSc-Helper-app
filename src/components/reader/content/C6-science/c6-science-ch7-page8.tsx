import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh7Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>Now observe the colour patterns that form on the piece of chalk after some time.</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Does chalk absorb water?</li>
            <li>What other changes you observe?</li>
            <li>Can you find any change in ink mark on the chalk?</li>
            <li>Which colours are seen?</li>
          </ul>

          <p>
            Remove the chalk before the water reaches its top. Which colours do you see on the chalk
            from the bottom to top? Draw a picture of the chalk in your notebook and the colours you
            have seen on the chalk. From where did these colours come?
          </p>
          <p>
            The ink appears to be made of a single colour but it is actually a mixture of many colours
            hidden in it. This method of seperating colours is called <strong>chromatography.</strong>
          </p>
          <p className="italic text-foreground/75 text-xs">
            Try to do chromatography with different inks and find out which colours they contain.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Where do we use the chromatography method?</li>
          </ul>
          <p>
            We know that a leaf is green in colour. Extract the juice from the leaf. Try to find
            whether the leaf juice consists of only one colour or more than one colour?
          </p>

          <h3 className="font-heading text-sm font-bold text-indigo-800 pt-2">
            7.3.9. Separation using more than one method
          </h3>
          <p>
            We have studied some methods for separation of substances from their mixtures.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>
            Often one method is not sufficient to separate the different substances present in the
            mixture. In such situations, we need to use more than one of these methods.
          </p>

          <h3 className="font-heading text-sm font-bold text-indigo-800 pt-1">
            Activity-8: Separation of diffrent materials from the mixture
          </h3>
          <p>
            Take a mixture of sand, saw dust and salt in a beaker half-filled with water. Stir the
            mixture well. Keep it undisturbed for 10 minutes.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What do you observe?</li>
            <li>Which substance floats on the water?</li>
            <li>How can you collect it?</li>
            <li>Which substance settles at the bottom of the beaker?</li>
            <li>How can you collect it back?</li>
            <li>Which substance is dissolved in the water?</li>
            <li>How can you get it back?</li>
          </ul>

          <p className="pt-2">
            Separation of substances is a very important scientific activity and is also important in
            our daily life.
          </p>

          <div className="rounded-[16px] border border-indigo-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-indigo-800">Keywords</p>
            <p className="mt-1 font-body text-xs text-foreground/80 leading-relaxed">
              Mixture, sedimentation, crystallization, separation, decantation, distillation,
              handpicking, sieving, sublimation, winnowing, filtration, chromatography.
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Consuming distilled water for longer period hampers metabolic processes as it lacks salts.</TipBox>
      </div>
    </div>
  );
}
