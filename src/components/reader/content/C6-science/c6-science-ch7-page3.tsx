import { useState } from "react";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh7Page3() {
  const [ex1, setEx1] = useState("");
  const [ex2, setEx2] = useState("");
  const [examples, setExamples] = useState(["", "", ""]);

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              value={ex1}
              onChange={(e) => setEx1(e.target.value)}
              placeholder="Situation 1..."
              className="w-full rounded-[10px] border border-border/60 bg-white/70 px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-indigo-600 focus:outline-none"
            />
            <input
              type="text"
              value={ex2}
              onChange={(e) => setEx2(e.target.value)}
              placeholder="Situation 2..."
              className="w-full rounded-[10px] border border-border/60 bg-white/70 px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-indigo-600 focus:outline-none"
            />
          </div>

          <p className="pt-2 font-semibold text-indigo-800">What do you do to separate the components?</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Were you able to separate every substance from the mixture?</li>
            <li>Are the methods used to separate the substances the same in all these instances?</li>
            <li>What are the properties of the substances that are used, in separating them?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">7.3. Methods of Separation</h2>
          <p>
            We will discuss some simple methods of separating substances that are mixed together. You
            may come across some of these methods being used and seen in your day to day life.
          </p>

          <h3 className="font-heading text-sm font-bold text-indigo-800 pt-1">7.3.1. Hand Picking</h3>
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[120px] mx-auto">
            <img
              src="/assets/images/C6-science/ch7_fig4.png"
              alt="Fig. 4 — Hand picking stones from rice and pulses"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>How stones were separated from pulses and rice?</li>
          </ul>
          <p>
            Stones are separated by <strong>hand picking</strong> from rice and pulses (see fig. 4).
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Can you separate salt from sand in this manner?</li>
          </ul>
          <p>
            What differences in the properties of rice, pulses and stone help us in separating them
            by the above method?
          </p>
          <p>
            Sonu gave following examples for hand picking method of separation.
          </p>
          <ol className="list-decimal space-y-1 pl-5 text-foreground/80">
            <li>Rotten fruits are removed from fresh fruits.</li>
            <li>Separating oranges and apples.</li>
          </ol>

          <p className="pt-2 font-semibold text-indigo-800">
            Try to give some more examples where the hand-picking method is used.
          </p>
          <div className="space-y-2">
            {examples.map((value, i) => (
              <input
                key={i}
                type="text"
                value={value}
                onChange={(e) => {
                  const next = [...examples];
                  next[i] = e.target.value;
                  setExamples(next);
                }}
                placeholder={`Example ${i + 1}...`}
                className="w-full rounded-[10px] border border-border/60 bg-white/70 px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-indigo-600 focus:outline-none"
              />
            ))}
          </div>

          <h3 className="font-heading text-sm font-bold text-indigo-800 pt-3">7.3.2. Winnowing</h3>
          <p>
            When farmers thresh their crops, they get a mixture of husk and grain. How do farmers
            separate the husk from grains?
          </p>
          <p>
            On a windy day, a farmer stands on a high platform and allows the mixture of grain and
            husk to drop slowly from the flat pan. The wind carries the husk forward and the grains
            fall vertically downward. A separate heap of grain is formed (Fig. 5).
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Concrete is the combination of sand, stones, and cement, which is filled in Iron frames.</TipBox>
      </div>
    </div>
  );
}
