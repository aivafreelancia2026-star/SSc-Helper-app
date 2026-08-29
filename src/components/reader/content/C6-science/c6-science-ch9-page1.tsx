import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh9Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 9 Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-emerald-400/60 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-emerald-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-800 uppercase">
              Chapter 9
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-emerald-950 sm:text-3xl">
              Plants : Parts and Functions
            </h1>
          </div>
          <div className="flex flex-col items-center border border-emerald-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-emerald-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 font-mono select-none">
              V1S5K1
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            You must have observed a variety of plants at home and surroundings. Some are big and some
            are small. We can find plants near our home, in the school campus, on the way to school, in
            the parks and almost everywhere.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Are all plants similar?</li>
            <li>What are the similarities among them?</li>
          </ul>

          <p>Let us get to know more about plants, their parts and functions.</p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">9.1. Parts of plant :</h2>
          <p>
            We know that we have different parts in our body. In the same way plants also have
            different parts. Do you know about them? See fig. 1. Try to name it&apos;s parts. Which
            plant is this?
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch9_fig1.png"
              alt="Fig. 1 — Brinjal plant diagram with pointer lines"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 1
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p>
            In this chapter, Let us try to understand about different parts of plants through
            activities. For this, all the students in the class should form into groups. Each group
            should have 4-5 students. Each group will collect 5 to 6 different types of plants along
            with their roots. You can collect different small plants from your garden or surroundings
            but take care not to damage other plants.
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-805 pt-2">
            Activity-1: Identification of plant parts
          </h2>
          <p>
            Observe the collected plants and try to identify their parts. With the help of Fig.1 write
            your observations in Table 1 given on the next page. If you don&apos;t know the name of
            any of the plants you can give them a number. You can take the help of your teacher, a
            gardener or some one else to find the name of the plant.
          </p>
          <p>
            Based on the observations in the Table 1, let us discuss the following questions.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Did you find any plant which does not have roots?</li>
            <li>Are the leaves of all the plants similar in size?</li>
            <li>Are there any plants without flowers?</li>
            <li>What are the parts that are common in all plants?</li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The roots of a tree will remain the same distance from the ground as the tree grows.</TipBox>
      </div>
    </div>
  );
}
