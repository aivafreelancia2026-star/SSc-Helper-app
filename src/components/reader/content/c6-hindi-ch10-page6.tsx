"use client";

import { useState } from "react";
import Image from "next/image";

export function C6HindiCh10Page6() {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswerInput = (lineIdx: number, value: string) => {
    setAnswers(prev => ({ ...prev, [lineIdx]: value }));
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Content Area */}
        <div className="w-full bg-[#f8f9fa] rounded-2xl shadow-xl border-4 border-white mt-4 p-6 md:p-10 flex flex-col gap-10">
          
          {/* Header */}
          <div className="flex flex-col gap-2 items-center text-center">
             <div className="inline-flex items-center gap-3 bg-[#e4eed4] px-8 py-3 rounded-full shadow-sm border-2 border-white mb-2">
               <span className="text-3xl">🧩</span>
               <h2 className="text-2xl md:text-3xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                 चित्र पहेली
               </h2>
             </div>
             <p className="text-lg md:text-xl text-slate-700 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
               इन के आधार पर ऊपर दिए गए वाक्य पढ़िए।
             </p>
          </div>

          {/* Puzzle Image */}
          <div className="w-full max-w-3xl mx-auto relative rounded-2xl overflow-hidden shadow-lg border-4 border-slate-200 bg-white">
             {/* We use a specific aspect ratio container to ensure the puzzle scales beautifully */}
             <div className="relative w-full pb-[130%] md:pb-[100%]">
               <Image 
                 src="/original_page_55.png" 
                 alt="Stick figure puzzle" 
                 fill 
                 className="object-contain p-2 md:p-4"
                 priority
               />
             </div>
          </div>

          {/* Decoder Inputs */}
          <section className="flex flex-col gap-6 max-w-3xl mx-auto w-full mt-4">
            <div className="bg-blue-50/60 p-6 md:p-8 rounded-2xl border border-blue-100 shadow-sm flex flex-col gap-6">
              
              <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-2 border-b-2 border-blue-200 pb-3" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                पहेली को सुलझाकर यहाँ वाक्य लिखिए:
              </h3>

              {[1, 2, 3, 4].map((lineIdx) => (
                <div key={`line-${lineIdx}`} className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                    {lineIdx}
                  </div>
                  <input
                    type="text"
                    value={answers[lineIdx] || ""}
                    onChange={(e) => handleAnswerInput(lineIdx, e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 rounded-xl p-4 text-xl md:text-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-slate-800 shadow-inner"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    placeholder={`वाक्य ${lineIdx} यहाँ लिखें...`}
                  />
                </div>
              ))}

            </div>
          </section>
          
        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">55</div>
        <span>चुक्की और जब्बार</span>
      </div>

    </div>
  );
}
