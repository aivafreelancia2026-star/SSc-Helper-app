import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh11Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Centered Image */}
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[400px] mx-auto">
        <img
          src="/assets/images/C6-science/ch11_fig2.png"
          alt="Fig. 2 — Daily life uses of water: washing, cooking, bathing, brushing, drinking"
          className="max-w-full h-auto rounded-lg shadow-sm"
        />
        <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
          Fig. 2: Uses of water in our daily life
        </p>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-indigo-800">
            11.2. Measuring the volume of water
          </h2>
          <p>
            Aravind used buckets of water to clean the colours from his body and his clothes. He said
            he used seven buckets of water. Is bucket a measure of the volume of water used?
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>How do we measure the volume of water?</li>
          </ul>
          <p>
            We can store water in different types of vessels. Often, we say, a glass of water,
            bucketful of water, bottle of water etc. Do you know any specific unit of measurement of
            volume?
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Almost 4 million people die each year world wide from water related diseases.</TipBox>
      </div>
    </div>
  );
}
