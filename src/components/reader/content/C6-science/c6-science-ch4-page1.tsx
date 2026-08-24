import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh4Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 4 Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-emerald-400/60 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-emerald-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-800 uppercase">
              Chapter 4
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-emerald-950 sm:text-3xl">
              What do Animals Eat?
            </h1>
          </div>
          <div className="flex flex-col items-center border border-emerald-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-emerald-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 font-mono select-none">
              X4KBF4
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Kartik loves playing with his pet dog by tossing it a ball or biscuits or even sometimes
            some small leaves and twigs. He observes that the dog sniffs and catches the biscuit in
            mid air and eats it up very quickly, while it just holds the ball in its mouth and only
            sniffs the leaves. If the dog is given milk it first sniffs it and then licks it up
            quickly.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Kartik often wonders what the dog is trying to find out by sniffing.</li>
            <li>Why do dogs first sniff food before they eat it?</li>
          </ul>

          <p className="pt-2">
            In the previous chapter we talked about our food. There are a wide variety of animals in
            the living world and they too eat a wide variety of food items.
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">4.1. Food intake</h2>
          <p>Let&apos;s see how animals eat their food.</p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">Activity-1:</h2>
          <p>
            You can see many animals in your surroundings. Discuss about them with your friends. Make a
            list of what they usually eat and what they usually do to find their food. Do not be in a
            hurry to complete this table.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch4_fig1a.png"
              alt="Fig. 1 (a) — Kartik playing with his pet dog"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 1 (a)
            </p>
          </div>

          <p className="pt-2">
            Keep adding to this list as you observe animals around you everyday. But don&apos;t forget to observe animals wherever you go.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch4_fig1b.png"
              alt="Fig. 1 (b) — A dog sniffing at a bone on the ground"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 1 (b)
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The first animals evolved about 600 million years ago during the late Precambrian.</TipBox>
      </div>
    </div>
  );
}
