"use client";

import { useState } from "react";
import Image from "next/image";

export function C6HindiCh5Page1() {
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const poemLines = [
    "दादा पढ़ते हैं अख़बार,",
    "पापा जाते हैं बाज़ार।",
    "दादी मीठे गीत सुनातीं,",
    "माँ अच्छे पकवान बनातीं।"
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-slate-50 min-h-screen font-sans shadow-lg pb-12">
      
      {/* Headline / Title at the very top */}
      <div className="w-full flex flex-col items-center pt-8 pb-4 relative z-10 px-4">
        <div className="bg-[#dbe8d8] px-8 py-4 rounded-3xl shadow-md flex flex-col items-center border-2 border-white">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-wide text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            5. मेरा परिवार
          </h1>
        </div>

        {/* Letters box */}
        <div className="mt-4 mb-6 bg-white border border-amber-600 rounded-full px-8 py-2 shadow-sm">
          <span className="text-2xl font-medium tracking-widest text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            ग त थ ध प ‘ए - े’, ‘ऐ - ै’
          </span>
        </div>
      </div>

      {/* Image Section below the headline */}
      <div className="w-full relative bg-white border-y-4 border-slate-200">
        <div className="relative w-full aspect-[3/4] max-h-[60vh] overflow-hidden">
          <Image 
            src="/assets/images/C6-hindi/ch5-p1-full.png" 
            alt="मेरा परिवार" 
            fill
            className="object-contain"
            style={{ clipPath: "inset(18% 0 15% 0)" }}
          />
        </div>
      </div>

      {/* Poem Area */}
      <div className="w-full p-8 md:p-12 flex flex-col items-center justify-center mt-4">
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

        <div className="mt-12 bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm opacity-90 animate-pulse">
          <p className="text-sm text-blue-800 font-bold flex items-center gap-2">
            <span>💡</span>
            कविता की पंक्तियों पर माउस ले जाएँ!
          </p>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="w-full flex justify-center mt-8 px-4">
        <div className="flex items-center gap-4 bg-[#f8f9e9] border border-[#d2d9aa] px-6 py-3 rounded-2xl shadow-sm">
          <span className="text-2xl">👩‍🏫</span>
          <p className="text-lg font-medium text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            अध्यापक बाल गीत गाएँगे। बच्चे ध्यान से सुनेंगे।
          </p>
        </div>
      </div>

      {/* Bottom Page Number */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">24</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मेरा परिवार</span>
      </div>
    </div>
  );
}
