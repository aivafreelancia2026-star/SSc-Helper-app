import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh3Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 3 Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-sky-400/60 bg-gradient-to-br from-sky-50 to-sky-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-sky-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-sky-800 uppercase">
              Chapter 3
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-sky-950 sm:text-3xl">
              Rain: Where Does It Come From?
            </h1>
          </div>
          <div className="flex flex-col items-center border border-sky-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-sky-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-sky-50 border border-sky-100 flex items-center justify-center text-[10px] font-bold text-sky-700 font-mono select-none">
              W3S3A8
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch3_fig1.png"
              alt="Fig. 1 — Getting ready for school"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 1
            </p>
          </div>

          <p className="pt-2">
            Ramya and Sowmya were getting ready to go to school. Their mother advised them to keep an
            umbrella with them. Ramya asked her mother why the umbrella was needed as it was not
            raining. Looking at the sky, mother told them that it was likely to rain as it was cloudy
            and windy weather.
          </p>
          <p>They started to school wondering about how their mother was able to predict when it could rain.</p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Why do we get rains?</li>
            <li>Where do these rains come from?</li>
            <li>How did mother know that it was likely to rain?</li>
            <li>Do all the clouds formed in the sky cause rain?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p>
            Rain is a common phenomenon like air and sunlight. We generally get more rains in rainy
            season. Our general observation is that if the sky is cloudy then there is a possibility of
            rain. But clouds do not lead to rains every time, some times we witness sudden rains.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Why do clouds cause rain?</li>
            <li>What is the relation between rains and clouds?</li>
            <li>Why don&apos;t all clouds cause rain?</li>
          </ul>

          <p className="pt-2">To understand about clouds and rains we need to first know about water.</p>

          <h2 className="font-heading text-base font-bold text-primary pt-2">3.1 Forms of Water</h2>
          <p>All of us know that water is available in nature in three forms.</p>

          <h3 className="font-heading text-sm font-bold text-primary pt-1">3.1.1. Solid Form</h3>
          <p>We call solid form of water as ice.</p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch3_fig2.png"
              alt="Fig. 2 : Ice"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 2 : Ice
            </p>
          </div>

          <p className="pt-2">Snow occurs naturally. Can we convert water into ice? Explain what we should do?</p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Rain drops travel at a speed of 7-18 miles/hr.</TipBox>
      </div>
    </div>
  );
}
