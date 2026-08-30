import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh13Page12() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What is the standard unit of measuring the volume of solids?</li>
            <li>Can you measure the volume of loose solids like sand, soil, cement etc.?</li>
            <li>How can you decide a standard unit of volume of a solid?</li>
          </ul>
          <p className="text-xs">
            Look at Fig. 18. There are certain number of identical cubes of length, breadth and height
            1 cm each, and a cardboard box of length 3 cm, breadth 2 cm, and height 2 cm.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig18.png"
              alt="Fig. 18 — Cardboard box with 1cm cubes scattered in front"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 18
            </p>
          </div>

          <p className="text-xs pt-2">
            As shown in Fig. 19, place three cubes in a line so as to cover the entire length. Along the
            side of this line, place another line of three cubes so as to completely cover the base of the
            box.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[140px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig19.png"
              alt="Fig. 19 — Placing identical cubes inside the cardboard box base"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 19
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>How many cubes have you used so far?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>How many cubes do you need to cover the entire empty space in the box?</li>
          </ul>
          <p className="text-xs">
            Place more cubes over this set of blocks; so that the total space is occupied by the blocks.
            Calculate the number of cubes occupying the rectangular box.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>How many cubes occupy the rectangular box?</li>
            <li>Can you guess volume of rectangular box?</li>
          </ul>
          <p className="text-xs">
            Since each cube has measurement of 1 cm length, 1 cm breadth, and 1 cm height, the volume of one
            cube is equal to 1cm x 1cm x 1cm = 1cm³ which is known as 1 cubic centimetre and written as
            1 cm³.
          </p>
          <p className="text-xs font-semibold text-sky-900">
            Cubic centimetre is a standard unit for measurement of volume of solids.
          </p>
          <p className="text-xs">
            Therefore the volume of the rectangular cardboard box is equal to the total number of cubes
            occupying it.
          </p>
          <p className="text-xs font-mono text-sky-950 bg-sky-50 border border-sky-100 rounded-xl p-3">
            Therefore volume of rectangular cardboard box = 12 × 1 cm³ = 12 cm³.
            <br />
            However, if we multiply length, breadth and height of a rectangular cardboard box it would be:
            <br />
            &nbsp;&nbsp;3 cm × 2 cm × 2 cm = 12 cm³
            <br />
            Therefore, we can say:
            <br />
            &nbsp;&nbsp;volume of a box = length × breadth × height
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Nanometre - A metric unit which equals to a 1/1,000,000,000 of a meter</TipBox>
      </div>
    </div>
  );
}
