import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh10Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 10 Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-indigo-400/60 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-indigo-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-800 uppercase">
              Chapter 10
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-indigo-950 sm:text-3xl">
              Changes Around Us
            </h1>
          </div>
          <div className="flex flex-col items-center border border-indigo-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-indigo-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 font-mono select-none">
              R3E3J2
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Priya wanted to write an article about colours for school magazine. She started observing her
            mother while preparing tea. Suddenly her brother Teja rushed into the kitchen shouting &ldquo;See
            my white shirt is spoilt. It has colour stains. Yesterday it was fine. Why has it become like this?
            Who spoilt my shirt?&rdquo;
          </p>
          <p>
            Mother saw the shirt and said that it might have got this red stain when it was soaked in soap water
            along with a new red shirt.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[280px] mx-auto">
            <img
              src="/assets/images/C6-science/ch10_fig1.png"
              alt="Fig. 1 — Family in the kitchen preparing tea"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 1
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>
            Priya who was listening to all this began thinking about all the changes she had seen. She
            had noticed the change in the colour of the tea after milk was added to it. There was a change
            in the colour of the shirt. She started wondering.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Why does the colour of the tea has changed?</li>
            <li>How did the red stain get on her brother&apos;s shirt?</li>
            <li>How does an object change colour?</li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>The change of state from liquid to gas is called evaporation.</TipBox>
      </div>
    </div>
  );
}
