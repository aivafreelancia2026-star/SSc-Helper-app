import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh2Page8() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <FigureNote emoji="🔩" caption="Fig. 9 — Stroking a bar magnet along an iron nail, always in one direction" />

      <p>Now remove the bar magnet and bring some iron filings or alpins close to the nail. What do you notice?</p>
      <p>
        The iron filings or alpins get attracted by the nail. Thus you have succeeded in making
        your own magnet by magnetizing the nail. What will happen if the nail is now suspended
        freely?
      </p>

      <h2 className="font-heading text-base font-bold text-primary">
        Activity-10: Make your own magnetic compass
      </h2>
      <p>
        Take a magnetized needle. Tape the needle to a light cork. Float the cork in a glass of
        water as shown in Fig.10. Add a little detergent to water to help the cork float freely.
      </p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>In what direction does your magnetized needle point?</li>
      </ul>
      <p>If it points in North-South direction, Then your magnetic compass is ready.</p>

      <FigureNote emoji="🥤" caption="Fig. 10 — A magnetized needle taped to a cork, floating in a glass of water" />

      <h2 className="font-heading text-base font-bold text-primary">Activity-11: Magnetic induction</h2>
      <p>Take a safety pin and bring it close to an alpin. Does it attract the alpin? Why?</p>
      <p>
        Bring the safety pin close to one pole of a bar magnet and see how it gets attached to the
        magnet. Now bring an alpin and touch it to the safety pin as shown in Fig. 11(a). Does
        safety pin attract the alpin? Why?
      </p>

      <FigureNote emoji="🧷" caption="Fig. 11 (a) — A safety pin held to a bar magnet, with an alpin touching the pin" />

      <p>
        In the above two cases, we notice that the safety pin acts as a magnet when it is in
        contact with another magnet. Magnetic property is induced in safety pin due to the bar
        magnet.
      </p>

      <ul className="list-disc space-y-1.5 pl-5">
        <li>If the safety pin is not in contact with the bar magnet, can it attract the alpin?</li>
        <li>What happens if we place the bar magnet very close to the safety pin but not touching it?</li>
      </ul>

      <p>Let us find out.</p>
      <p>
        Take a bar magnet in one hand and a safety pin in the other hand, hold them in such a way
        that they are close to each other but not in contact as shown in Fig. 11 (b).
      </p>

      <TipBox>The earth&apos;s magnetic field is like a bar magnet at the center of the earth.</TipBox>
    </div>
  );
}
