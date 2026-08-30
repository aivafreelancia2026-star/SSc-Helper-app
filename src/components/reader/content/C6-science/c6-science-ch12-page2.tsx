import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh12Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Have you seen (+) and (-) signs on a cell? These signs indicate the two terminals of a cell.
          </p>

          <CalloutBox title="Note">
            <p className="text-xs text-foreground/80 leading-relaxed font-bold">
              Do not connect the two terminals of a cell with a single wire.
            </p>
          </CalloutBox>

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            12.2. Bulb
          </h2>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch12_fig3.png"
              alt="Fig. 3 — Labeled diagram of a bulb showing glass chamber, filament, and terminals"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 3
            </p>
          </div>

          <p className="pt-2 text-xs">
            Observe a torch-bulb or an electric bulb carefully (Fig. 3).
          </p>
          <p className="text-xs">
            A torch bulb consists of a glass chamber fixed on a metal cap (metal base). Observe the two metal
            wires. How are they fixed? One wire is attached to the metal cap and the other is attached to
            the base at the centre of the metal cap. These wires act as two terminals. The two terminals
            do not touch each other.
          </p>
          <p className="text-xs">
            Electric bulbs have two protruded parts on the back side of the metal cap. Observe them. Break the
            glass chamber and check how the wires are arranged inside. (Take care not to pierce the pieces of
            glass). Identify the difference between torch bulb and electric bulb.
          </p>
          <p className="text-xs">
            The part of the bulb that glows is the <strong>filament</strong>, which is a thin spring like
            wire attached to the two metal wires inside the glass bulb.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Why do bulbs and cells have two terminals?</li>
            <li>How does a bulb glow with the help of a cell?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            12.3. Simple electric circuits
          </h2>
          <p className="font-semibold text-sky-805">Activity-2:</p>
          <p className="italic text-foreground/75 text-xs">
            Take four wires of different colours, say blue, green, red and yellow, each about 15 cm long.
            Electric wires are often covered with plastic. First, remove about two centimeters of the plastic
            covering from both ends of each wire. Now attach two wires (Blue and Green) to a bulb and two
            wires (Red and Yellow) to a cell with a cello tape or cell holder as shown in Fig. 4(a). We can
            use a cell holder to hold the cells and wires together tightly.
          </p>
          <p className="text-xs italic text-foreground/70">
            [Take an old tube of a bicycle and cut it into narrow bands. Each band should be wide enough
            to hold the two terminals of the cell firmly. This is your cell holder.]
          </p>
          <p className="text-xs">
            Now connect the wires in different forms as shown in Fig. 4(b) to 4(g). In each case, check
            whether the bulb glows or not. Record your observations in table 1.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch12_fig4_a.png"
              alt="Fig. 4(a) — Basic cell and bulb wiring setup"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4(a)
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>English scientist William Gilbert (1544-1603) was the first person to use the word &ldquo;electricity.&rdquo; He believed electricity was caused by a moving fluid called humor.</TipBox>
      </div>
    </div>
  );
}
