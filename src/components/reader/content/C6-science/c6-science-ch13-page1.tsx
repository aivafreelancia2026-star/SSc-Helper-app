import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh13Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 13 Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-sky-400/60 bg-gradient-to-br from-sky-50 to-sky-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-sky-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-sky-800 uppercase">
              Chapter 13
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-sky-950 sm:text-3xl">
              Learning How to Measure
            </h1>
          </div>
          <div className="flex flex-col items-center border border-sky-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-sky-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-sky-50 border border-sky-100 flex items-center justify-center text-[10px] font-bold text-sky-700 font-mono select-none">
              V6W6V2
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Rasheed went to a cloth shop with his mother to buy clothes. The cloth merchant used a metal
            rod to measure the length of cloth. Rasheed asked his mother what that metal rod was and why
            did the merchant use it? Mother told him that the metal rod was a metre scale that was used to
            measure lengths. Later, both of them went to a flower market and purchased a string of jasmine
            flowers. While cutting the jasmine flower string, the woman selling the flowers measured its
            length with her cubit.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig1.png"
              alt="Fig. 1 — Cloth merchant measuring cloth using metal rod meter scale"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 1
            </p>
          </div>

          <p>Rasheed was confused and started thinking:</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Why was a metre scale used to measure the length of cloth?</li>
            <li>Why did the woman use her hand to measure the length of the jasmine flowers&apos; string?</li>
            <li>Which method is correct?</li>
            <li>How can we decide the correct method of measurement?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-sky-800">
            13.1. Measurement
          </h2>
          <p className="text-xs">
            You might have observed many situations of measurement of length as in the above examples,
            where sometimes we use instruments and sometimes hands, foot, palms etc.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig2.png"
              alt="Fig. 2 — Children measuring playfield with sticks and paces"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 2
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>
              Write some more examples where we use instruments to measure the lengths and some examples
              where we don&apos;t use instruments, but use foot, hand-span, palm etc. to measure the
              length. Discuss which method is correct with your friends.
            </li>
          </ul>

          <h2 className="font-heading text-base font-bold text-sky-805 pt-2">
            Activity-1: Measuring Lengths
          </h2>
          <p className="text-xs">
            Measure the length of one side of a table using your hand-span (Fig. 3). Ask your classmates to do the same. Record the length of the table in terms of number of hand-spans in table 1.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>We use metre as a unit of length and subsequently, centimetres and millimetres as smaller units of length.</TipBox>
      </div>
    </div>
  );
}
