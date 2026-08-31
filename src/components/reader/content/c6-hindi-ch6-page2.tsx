"use client";

import Image from "next/image";

export function C6HindiCh6Page2() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-slate-50 min-h-screen font-sans shadow-lg pb-12 relative">
      
      {/* Top Image Section (Full image displayed naturally) */}
      <div className="w-full relative bg-white border-b-4 border-slate-200">
        <div className="relative w-full aspect-[3/4] max-h-[80vh] overflow-hidden group">
          <Image 
            src="/assets/images/C6-hindi/ch6-p2-full.png" 
            alt="चिड़ियाघर दृश्य २" 
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Teacher Instruction (placed neatly below the image instead of an overlay) */}
      <div className="w-full flex justify-center mt-12 px-4">
        <div className="flex items-center gap-4 bg-[#f8f9e9] border border-[#d2d9aa] px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="bg-white rounded-full p-2 border border-[#d2d9aa] shadow-sm">
            <span className="text-3xl">👩‍🏫</span>
          </div>
          <p className="text-xl font-bold text-slate-800 tracking-wide" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            अध्यापक चित्र के बारे में बातचीत करेंगे।
          </p>
        </div>
      </div>

      {/* Suggestion for interaction */}
      <div className="w-full flex justify-center mt-6 px-4">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm opacity-90 animate-pulse">
          <p className="text-sm text-blue-800 font-bold flex items-center gap-2">
            <span>💡</span>
            चित्र में कौन-कौन से जानवर हैं? पहचानें और उनके नाम बताएँ।
          </p>
        </div>
      </div>

      {/* Bottom Page Number */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-auto">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">29</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>चिड़ियाघर</span>
      </div>
    </div>
  );
}
