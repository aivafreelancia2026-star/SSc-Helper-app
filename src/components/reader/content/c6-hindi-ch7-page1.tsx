"use client";

import Image from "next/image";

export function C6HindiCh7Page1() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-slate-50 min-h-screen font-sans shadow-lg pb-12 relative">
      
      {/* QR Code Placeholder (Top Right) */}
      <div className="absolute right-4 top-4 md:right-8 md:top-8 bg-white p-2 border-2 border-slate-800 flex flex-col items-center shadow-md z-20">
        <div className="w-16 h-16 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Q9E9J1')] bg-cover opacity-80 mix-blend-multiply"></div>
        <span className="text-xs font-bold mt-1 tracking-widest text-slate-800">Q9E9J1</span>
      </div>

      {/* Headline / Title at the very top */}
      <div className="w-full flex flex-col items-center pt-8 pb-4 relative z-10 px-4">
        <div className="bg-[#dbe8d8] px-12 py-4 rounded-3xl shadow-md flex flex-col items-center border-2 border-white">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-wide text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            7. मैदान
          </h1>
        </div>

        {/* Letters box */}
        <div className="mt-4 mb-6 bg-white border-2 border-amber-600 rounded-full px-8 py-2 shadow-sm">
          <span className="text-2xl font-medium tracking-widest text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            द ठ ढ व ‘अं - ं’ ‘अः - ः’
          </span>
        </div>
      </div>

      {/* Image Section below the headline */}
      <div className="w-full relative bg-white border-y-4 border-slate-200">
        <div className="relative w-full aspect-[3/4] max-h-[75vh] overflow-hidden group">
          <Image 
            src="/assets/images/C6-hindi/ch7-p1-full.png" 
            alt="मैदान" 
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ clipPath: "inset(20% 0 5% 0)" }}
          />
        </div>
      </div>

      {/* Suggestion for interaction */}
      <div className="w-full flex justify-center mt-8 px-4">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm opacity-90 animate-pulse cursor-pointer hover:bg-blue-100 transition-colors">
          <p className="text-sm text-blue-800 font-bold flex items-center gap-2">
            <span>💡</span>
            चित्र में बच्चे क्या-क्या खेल रहे हैं? अपने दोस्तों को बताएँ!
          </p>
        </div>
      </div>

      {/* Bottom Page Number */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-auto">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">34</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मैदान</span>
      </div>
    </div>
  );
}
