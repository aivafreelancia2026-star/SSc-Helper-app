import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh13Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            Other countries in the world also made their own scales. Because each country had its own
            scale which differed from others, it led to a lot of problems in trade and commerce. There
            was always a chance of quarrels breaking out.
          </p>
          <p className="text-xs">
            Finally in France, it was decided that a certain length of rod made of a special material
            (Platinum-Iridium) would be called a metre. The metre was divided into 100 equal parts and
            these parts were called centimetre. Each centimetre was further divided into ten equal parts
            called millimetre.
          </p>
          <p className="text-xs font-semibold text-sky-900">
            The metre scale is internationally accepted instrument for measuring lengths.
          </p>
          <p className="text-xs">One metre is a standard unit of length.</p>
          <p className="text-xs">
            We use metre as a unit of length and subsequently, centimetres and millimetres as smaller units
            of length.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig6.png"
              alt="Fig. 6 — Standard ruler showing centimeter and millimeter markings"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 6
            </p>
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 font-mono text-xs text-sky-950 space-y-1">
            <p>1 metre = 100 centimetres</p>
            <p>1 centimetre = 10 millimetres</p>
            <p className="text-center font-body text-[10px] text-foreground/60 italic pt-1">or</p>
            <p>1 m = 100 cm</p>
            <p>1 cm = 10 mm</p>
          </div>

          <p className="text-xs">
            Now we are using this as a standard measurement for length throughout the world. This original
            scale is preserved in a museum in France.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>
              If you want to measure the thickness of an eraser, which of the instruments shown in Fig. 7 is
              more suitable and why?
            </li>
          </ul>
          <p className="text-xs">
            Sometimes we may need to measure long distances like length and breadth of school play ground
            or agricultural fields or distance between our house to school, distance between one town to
            another town, and even longer distances such as those between one country and another country.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig7.png"
              alt="Fig. 7 — Measuring tools: tape, rolling tape, and wood ruler"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 7
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Can we measure these lengths using the instruments shown in Fig. 7?</li>
            <li>If not, how are these distances measured?</li>
            <li>What instruments are used?</li>
            <li>Is there any other way to measure very large distances?</li>
          </ul>
          <p className="text-xs">
            Discuss with your friends, parents, and teachers to know the answer.
          </p>
          <p className="text-xs">
            Metre is not a convenient unit for measuring large distances. We need to define a larger unit
            to measure larger distances. We use kilometre as a larger unit of length.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The foot is divided into 12 inches</TipBox>
      </div>
    </div>
  );
}
