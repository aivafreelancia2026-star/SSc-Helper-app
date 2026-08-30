import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh16Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 16 Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-emerald-400/60 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-emerald-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-800 uppercase">
              Chapter 16
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-emerald-950 sm:text-3xl">
              Living and Non-Living
            </h1>
          </div>
          <div className="flex flex-col items-center border border-emerald-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-emerald-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 font-mono select-none">
              ABE6T7
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Venkatesh likes his blue shirt which he bought in the previous year. Now it does not fit him.
            He wants to alter it to suit him. He went to a nearby tailor shop along with his friend Tanvir.
            The tailor refused to alter the shirt because he said that it is not possible to increase the
            size of a shirt. On the way back, the friends saw a dog lying on the roadside as if it was fast
            asleep. Venkatesh wondered whether the dog was alive or not. &quot;It is quite obvious that the
            dog is alive, its stomach is telling us that it is alive. Look at it carefully,&quot; said
            Tanvir.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Venkatesh&apos;s favourite blue shirt does not fit him now? Think why?</li>
            <li>How will you decide whether the dog is alive or not?</li>
            <li>Can you decide whether a plant is alive or not by using the same reason?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">
            16.1. Living and Non-Living
          </h2>
          <p className="text-xs">
            There are many things around us; different types of plants, table, chair, soil, rock, clothes,
            animals, insects, birds. We can categorize them in various groups.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig1.png"
              alt="Fig. 1 — Venkatesh and Tanvir observing a sleeping dog by the roadside"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 1
            </p>
          </div>

          <p className="text-xs pt-2">
            Members of a common group share some common characteristics. In the previous chapter, we
            categorized materials as solids, liquids and gases. Another type of category is that of living
            things and non living things.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium text-xs">
            <li>Do all living things share some common characteristics?</li>
            <li>What are those common characteristics?</li>
            <li>To be a part of living group is it necessary to bear all the characteristics of living things?</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-emerald-805 pt-2">
            Activity-1: Living things - Non living things.
          </h3>
          <p className="text-xs">
            Make a list of living things you know.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The seeds of an Indian Lotus plant remain viable for 300 to 400 years.</TipBox>
      </div>
    </div>
  );
}
