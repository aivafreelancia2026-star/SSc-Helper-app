import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh2Page1() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>
        All of you would have seen a pin holder in your school office (see Fig. 1 (a)). You may
        have seen that in this pin holder, some pins are attached to the cap. See Fig.1(a).
      </p>

      <FigureNote emoji="📌" caption="Fig. 1 (a) — Pin holder with pins stuck to the cap" />

      <ul className="list-disc space-y-1.5 pl-5">
        <li>Why do the pins get attached to the cap of the pin holder?</li>
        <li>What could be there in that cap?</li>
        <li>Does it attract objects other than pins? What are they?</li>
      </ul>

      <h2 className="font-heading text-base font-bold text-primary">2.1 Magnets</h2>
      <p>
        You might have seen some metal stickers stuck to the door of an iron almirah or a
        refrigerator. See Fig.1 (b).
      </p>

      <FigureNote emoji="🧲" caption="Fig. 1 (b) — Metal sticker stuck to a refrigerator door" />

      <ul className="list-disc space-y-1.5 pl-5">
        <li>What is there in those stickers which makes them stick to the iron doors?</li>
        <li>Do they stick to wooden doors or plastic doors too?</li>
      </ul>

      <h2 className="font-heading text-base font-bold text-primary">
        Activity-1: Finding objects that get stuck to the cap of the pin holder.
      </h2>
      <p>
        Take a pin holder from your school office. Drop some pins, jump-clips, iron nails into it.
        What do you observe? Do the same with a piece of paper, a pencil and an eraser. What do you
        observe?
      </p>
      <p>
        You would notice that pins, jump-clips, nails get stuck to the top of the pin holder while
        paper, pencil, eraser fall into the pin holder. Why does this happen so?
      </p>
      <p>
        The cap of the pin holder contains a special material which attracts substances like iron
        pins, iron nails etc.
      </p>
      <p>
        Similarly, the metal stickers also have a special material at the back so that they can
        stick to iron doors. That special material is called <strong>magnet.</strong>
      </p>

      <ul className="list-disc space-y-1.5 pl-5">
        <li>What material is needed for making magnets?</li>
        <li>How were these magnets discovered?</li>
      </ul>

      <p>Let us try to find the answers to these questions.</p>

      <TipBox>Right now, the Neodymium is the strongest magnet currently known.</TipBox>
    </div>
  );
}
