"use client";

import Image from "next/image";
import { useState } from "react";

export function C6HindiCh9Page1() {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const handleSoundClick = (sound: string) => {
    setActiveSound(sound);
    setTimeout(() => setActiveSound(null), 1500);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-slate-50 min-h-screen font-sans shadow-lg pb-12 relative">
      
      {/* Title & QR Bar */}
      <div className="w-full flex items-center justify-between px-8 py-6 bg-[#dbe8d8] border-b-4 border-[#b8c9b4] shadow-sm relative z-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-wide" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          9. खुशियों की दुनिया
        </h1>
        <div className="bg-white p-2 border-2 border-slate-800 flex flex-col items-center shadow-md">
          <div className="w-12 h-12 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=D6S3Q9')] bg-cover opacity-80 mix-blend-multiply"></div>
          <span className="text-[10px] font-bold mt-1 tracking-widest text-slate-800">D6S3Q9</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full relative bg-white flex flex-col md:flex-row h-full min-h-[70vh]">
        
        {/* Illustration Section */}
        <div className="relative w-full md:w-1/2 min-h-[500px] md:h-auto overflow-hidden bg-slate-100 flex items-center justify-center p-4">
          <Image 
            src="/assets/images/C6-hindi/ch9-p1-full.png" 
            alt="खुशियों की दुनिया" 
            fill
            className="object-contain"
            style={{ clipPath: "inset(5% 0 0 0)" }}
          />
        </div>

        {/* Poem Section (Right) */}
        <div className="relative w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/80 md:bg-gradient-to-l from-white via-white to-white/90 backdrop-blur-sm md:backdrop-blur-none z-10 -mt-20 md:mt-0">
          
          <div className="space-y-10 text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            
            <div className="space-y-3">
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'coo' ? 'text-blue-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-blue-500'}`} onClick={() => handleSoundClick('coo')}>कू कू कू कू</span> कोयल गाती,
              </p>
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'hee' ? 'text-amber-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-amber-500'}`} onClick={() => handleSoundClick('hee')}>खी खी खी खी</span> हँसता बंदर,
              </p>
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'gad' ? 'text-gray-700 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-gray-500'}`} onClick={() => handleSoundClick('gad')}>गड़ गड़ गड़ गड़</span> गाड़ी चलती,
              </p>
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'ghumad' ? 'text-indigo-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-indigo-500'}`} onClick={() => handleSoundClick('ghumad')}>घुमड़ घुमड़</span> कर गरजे मेघ।
              </p>
            </div>

            <div className="space-y-3">
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'cham' ? 'text-yellow-500 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-yellow-400'}`} onClick={() => handleSoundClick('cham')}>चम चम चम चम</span> चमके तारे,
              </p>
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'chuk' ? 'text-red-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-red-500'}`} onClick={() => handleSoundClick('chuk')}>छुक छुक छुक छुक</span> चलती रेल,
              </p>
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'jagmag' ? 'text-green-500 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-green-400'}`} onClick={() => handleSoundClick('jagmag')}>जगमग जगमग</span> करते जुगनू,
              </p>
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'jhar' ? 'text-cyan-500 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-cyan-400'}`} onClick={() => handleSoundClick('jhar')}>झर झर</span> झरता झरना देख।
              </p>
            </div>

            <div className="space-y-3">
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'tik' ? 'text-purple-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-purple-500'}`} onClick={() => handleSoundClick('tik')}>टिक टिक टिक टिक</span> चलती घड़ियाँ,
              </p>
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'thak' ? 'text-orange-700 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-orange-600'}`} onClick={() => handleSoundClick('thak')}>ठक ठक ठक</span> करता लोहार,
              </p>
            </div>

          </div>

          {/* Interactive Hint */}
          <div className="mt-12 bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm opacity-90 animate-pulse">
            <p className="text-sm text-blue-800 font-bold flex items-center gap-2">
              <span>💡</span>
              आवाज़ वाले शब्दों (जैसे 'कू कू', 'चम चम') पर क्लिक करें!
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Page Number */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-auto">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">44</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>खुशियों की दुनिया</span>
      </div>
    </div>
  );
}
