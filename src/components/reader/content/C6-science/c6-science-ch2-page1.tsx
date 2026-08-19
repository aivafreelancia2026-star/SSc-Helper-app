import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh2Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 2 Header Banner */}
      <div className="rounded-[16px] border border-sky-300 bg-sky-100/50 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-sky-600 text-white rounded-lg px-4 py-2 text-xl font-bold font-heading">
            2
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-sky-900 leading-tight">
              Playing with Magnets
            </h1>
          </div>
        </div>
        {/* Simulating the textbook QR code block */}
        <div className="border border-sky-300 bg-white rounded p-1 flex flex-col items-center shrink-0">
          <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center text-[5px] text-white font-mono text-center leading-none">
            QR CODE
          </div>
          <span className="text-[7px] font-bold text-sky-800 tracking-widest mt-0.5">Y8X4K5</span>
        </div>
      </div>

      {/* Split Columns Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            All of you would have seen a pin holder in your school office (see Fig. 1 (a)). You may
            have seen that in this pin holder, some pins are attached to the cap. See Fig.1(a).
          </p>

          <div className="flex justify-center py-1">
            <FigureNote emoji="📌" caption="Fig. 1 (a) — Pin holder with pins stuck to the cap" />
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Why do the pins get attached to the cap of the pin holder?</li>
            <li>What could be there in that cap?</li>
            <li>Does it attract objects other than pins? What are they?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-primary pt-2">2.1 Magnets</h2>
          <p>
            You might have seen some metal stickers stuck to the door of an iron almirah or a
            refrigerator. See Fig.1 (b).
          </p>

          <div className="flex justify-center py-1">
            <FigureNote emoji="🧲" caption="Fig. 1 (b) — Metal sticker stuck to a refrigerator door" />
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What is there in those stickers which makes them stick to the iron doors?</li>
            <li>Do they stick to wooden doors or plastic doors too?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
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

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-1">
            <li>What material is needed for making magnets?</li>
            <li>How were these magnets discovered?</li>
          </ul>

          <p className="pt-1">Let us try to find the answers to these questions.</p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Right now, the Neodymium is the strongest magnet currently known.</TipBox>
      </div>
    </div>
  );
}
