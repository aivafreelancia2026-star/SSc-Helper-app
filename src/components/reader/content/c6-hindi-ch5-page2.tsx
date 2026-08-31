"use client";

import { useState } from "react";
import Image from "next/image";

export function C6HindiCh5Page2() {
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const poemLines = [
    "मैं और भैया दोनों पढ़ते,",
    "आपस में मिलजुलकर रहते।",
    "मुझको अपने घर से प्यार,",
    "यह है मेरा घर परिवार।"
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-slate-50 min-h-screen font-sans shadow-lg pb-12">
      
      {/* Top Image Section */}
      <div className="w-full relative bg-white border-b-4 border-slate-200">
        <div className="relative w-full aspect-[3/4] max-h-[70vh] overflow-hidden">
          <Image 
            src="/assets/images/C6-hindi/ch5-p2-full.png" 
            alt="मेरा परिवार" 
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Interactive Poem Underneath */}
      <div className="w-full flex flex-col items-center justify-center p-8 md:p-12 relative z-10">
        <div className="space-y-6 text-center">
          {poemLines.map((line, idx) => (
            <p 
              key={idx}
              onMouseEnter={() => setActiveLine(idx)}
              onMouseLeave={() => setActiveLine(null)}
              className={`text-3xl md:text-4xl cursor-pointer transition-all duration-300 transform
                ${activeLine === idx 
                  ? "text-pink-600 scale-110 font-bold drop-shadow-sm" 
                  : "text-slate-700 hover:text-blue-600 font-medium"
                }
              `}
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: "1.6" }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Tip for interaction */}
      <div className="w-full flex justify-center mt-6">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm opacity-90 animate-pulse">
          <p className="text-sm text-blue-800 font-bold flex items-center gap-2">
            <span>💡</span>
            कविता की पंक्तियों पर माउस ले जाएँ!
          </p>
        </div>
      </div>

      {/* Bottom Page Number */}
      <div className="w-full flex items-center justify-between px-8 pt-12 pb-4 text-sm text-slate-500 font-medium">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">25</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मेरा परिवार</span>
      </div>
    </div>
  );
}
