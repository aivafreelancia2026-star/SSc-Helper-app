import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh2Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch2_fig9.png"
              alt="Fig. 9 — Stroking a bar magnet along an iron nail"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 9 — Stroking a bar magnet along an iron nail
            </p>
          </div>

          <p className="pt-2">Now remove the bar magnet and bring some iron filings or alpins close to the nail. What do you notice?</p>
          <p>
            The iron filings or alpins get attracted by the nail. Thus you have succeeded in making
            your own magnet by magnetizing the nail. What will happen if the nail is now suspended
            freely?
          </p>

          <h2 className="font-heading text-base font-bold text-primary pt-2">
            Activity-10: Make your own magnetic compass
          </h2>
          <p>
            Take a magnetized needle. Tape the needle to a light cork. Float the cork in a glass of
            water as shown in Fig.10. Add a little detergent to water to help the cork float freely.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>In what direction does your magnetized needle point?</li>
          </ul>
          <p>If it points in North-South direction, Then your magnetic compass is ready.</p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch2_fig10.png"
              alt="Fig. 10 — A magnetized needle taped to a cork"
              className="max-w-full h-auto rounded-lg shadow-sm max-h-[120px]"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 10 — A magnetized needle taped to a cork
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-primary">Activity-11: Magnetic induction</h2>
          <p>Take a safety pin and bring it close to an alpin. Does it attract the alpin? Why?</p>
          <p>
            Bring the safety pin close to one pole of a bar magnet and see how it gets attached to the
            magnet. Now bring an alpin and touch it to the safety pin as shown in Fig. 11(a). Does
            safety pin attract the alpin? Why?
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch2_fig11a.png"
              alt="Fig. 11 (a) — A safety pin held to a bar magnet"
              className="max-w-full h-auto rounded-lg shadow-sm max-h-[140px]"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 11 (a) — A safety pin held to a bar magnet
            </p>
          </div>

          <p className="pt-2">
            In the above two cases, we notice that the safety pin acts as a magnet when it is in
            contact with another magnet. Magnetic property is induced in safety pin due to the bar
            magnet.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>If the safety pin is not in contact with the bar magnet, can it attract the alpin?</li>
            <li>What happens if we place the bar magnet very close to the safety pin but not touching it?</li>
          </ul>

          <p className="pt-1">Let us find out.</p>
          <p>
            Take a bar magnet in one hand and a safety pin in the other hand, hold them in such a way
            that they are close to each other but not in contact as shown in Fig. 11 (b).
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The earth&apos;s magnetic field is like a bar magnet at the center of the earth.</TipBox>
      </div>
    </div>
  );
}
