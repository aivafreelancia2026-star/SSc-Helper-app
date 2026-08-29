"use client";

import { useState } from "react";
import Image from "next/image";

type Hotspot = {
  id: string;
  top: string;
  left: string;
  label: string;
  hindiName: string;
  description: string;
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "book-store",
    top: "30%",
    left: "25%",
    label: "पुस्तक घर",
    hindiName: "पुस्तक घर (Pustak Ghar)",
    description: "यहाँ किताबें और पढ़ाई का सामान मिलता है।",
  },
  {
    id: "toy-store",
    top: "70%",
    left: "60%",
    label: "खिलौने",
    hindiName: "खिलौने की दुकान (Khilone ki Dukaan)",
    description: "यहाँ बच्चों के लिए तरह-तरह के खिलौने मिलते हैं।",
  },
  {
    id: "bullocks",
    top: "35%",
    left: "65%",
    label: "बैल",
    hindiName: "बैल (Bail)",
    description: "बाज़ार में सामान ढोने या खेती के काम आने वाले बैल।",
  },
  {
    id: "fruit-vendor",
    top: "50%",
    left: "10%",
    label: "सब्ज़ी वाला",
    hindiName: "फल और सब्ज़ी (Phal aur Sabzi)",
    description: "ताज़े फल और सब्ज़ियाँ यहाँ बेची जा रही हैं।",
  },
];

export function C6HindiCh4Page2() {
  const [activeSpot, setActiveSpot] = useState<Hotspot | null>(null);

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-4 md:p-8 space-y-6 bg-white min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-indigo-800">बाज़ार (Market)</h1>
        <p className="text-lg text-slate-600">
          चित्र में दी गई चीज़ों को पहचानने के लिए उन पर क्लिक करें। (Click on the items in the image to identify them.)
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden shadow-2xl border-4 border-indigo-100">
        {/* Make sure to place the user's uploaded image at this path: /public/assets/images/C6-hindi/ch4-bazaar.png */}
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400 p-4 text-center">
          <p>Please upload the image to <code>/public/assets/images/C6-hindi/ch4-bazaar.png</code> to see it here.</p>
        </div>

        {/* 
          // Uncomment this Image tag once the image file is placed in the correct location
          <Image 
            src="/assets/images/C6-hindi/ch4-bazaar.png" 
            alt="बाज़ार" 
            fill
            className="object-cover"
          /> 
        */}

        {HOTSPOTS.map((spot) => (
          <button
            key={spot.id}
            onClick={() => setActiveSpot(spot)}
            className={`absolute w-10 h-10 md:w-14 md:h-14 -ml-5 -mt-5 md:-ml-7 md:-mt-7 rounded-full flex items-center justify-center text-xl md:text-2xl transition-transform duration-300 ease-out z-10
              ${activeSpot?.id === spot.id
                ? "bg-amber-400 scale-125 shadow-[0_0_15px_rgba(251,191,36,0.8)]"
                : "bg-white/80 hover:bg-amber-200 hover:scale-110 shadow-lg backdrop-blur-sm border-2 border-amber-500 text-amber-700 animate-pulse"
              }
            `}
            style={{ top: spot.top, left: spot.left }}
            aria-label={spot.label}
          >
            🔍
          </button>
        ))}
      </div>

      {activeSpot ? (
        <div className="w-full max-w-3xl bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl shadow-md animate-fade-in-up">
          <h2 className="text-2xl font-bold text-indigo-900 mb-2">{activeSpot.hindiName}</h2>
          <p className="text-xl text-indigo-700">{activeSpot.description}</p>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-slate-50 border border-slate-200 p-6 rounded-xl text-center text-slate-500 shadow-sm">
          चित्र में किसी बिंदु (🔍) पर क्लिक करें।
        </div>
      )}

      <div className="mt-8 text-center bg-green-50 px-6 py-3 rounded-full border border-green-200 shadow-sm text-green-800 font-medium">
        छात्रों की प्रगति हेतु सरकार का उपहार 19 बाज़ार
      </div>
    </div>
  );
}
