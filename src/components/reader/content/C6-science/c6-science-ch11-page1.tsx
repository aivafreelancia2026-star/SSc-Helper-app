import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh11Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 11 Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-indigo-400/60 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-indigo-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-800 uppercase">
              Chapter 11
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-indigo-950 sm:text-3xl">
              Water in Our Life
            </h1>
          </div>
          <div className="flex flex-col items-center border border-indigo-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-indigo-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 font-mono select-none">
              E6S8U6
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            During the festival of Holi, Arvind was playing with his friends. They had gone to the
            market and bought different colours. They mixed each colour in a bucket of water and poured
            mugs full of water on each other. They sprayed colours on each other as well. Arvind and all
            his friends were completely drenched and enjoyed themselves a lot. Then they decided to go
            and have a wash.
          </p>
          <p>
            They went to a well and took bath with several buckets of water. They washed their clothes as
            well.
          </p>
          
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>If there was no water, what would happen to Arvind and his friends?</li>
            <li>For what purposes do we need water in our daily life?</li>
            <li>Do plants and animals also require water like us?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            11.1. Water in Our Life
          </h2>
          <p>
            We need water to perform several day to day activities like cooking food, washing clothes,
            cleaning utensils etc. We can&apos;t survive without water for even a single day.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[280px] mx-auto">
            <img
              src="/assets/images/C6-science/ch11_fig1.png"
              alt="Fig. 1 — Children playing Holi throwing coloured water"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 1
            </p>
          </div>

          <h2 className="font-heading text-base font-bold text-indigo-805 pt-2">
            Activity-1: Water and its uses
          </h2>
          <p>
            Make a group of five students and discuss the uses of water in their daily life. Write down
            the uses.
          </p>
          <p>
            Classify the above uses of water in three groups:
          </p>
          <ol className="list-decimal space-y-1 pl-5 text-foreground/85">
            <li>Uses in a house or family.</li>
            <li>For agricultural purposes.</li>
            <li>Others.</li>
          </ol>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>World wide over 1 billion people use less than 6 litres of water per day.</TipBox>
      </div>
    </div>
  );
}
