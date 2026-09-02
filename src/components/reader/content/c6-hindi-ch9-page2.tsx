"use client";

import Image from "next/image";
import { useState } from "react";

export function C6HindiCh9Page2() {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const handleSoundClick = (sound: string) => {
    setActiveSound(sound);
    setTimeout(() => setActiveSound(null), 1500);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-slate-50 min-h-screen font-sans shadow-lg pb-12 relative">
      
      {/* Main Content Area */}
      <div className="w-full relative bg-white flex flex-col md:flex-row-reverse h-full min-h-[85vh]">
        
        {/* Illustration Section */}
        <div className="relative w-full md:w-1/2 min-h-[500px] md:h-auto overflow-hidden bg-slate-100 flex items-center justify-center p-4">
          <Image 
            src="/assets/images/C6-hindi/ch9-p2-full.png" 
            alt="खुशियों की दुनिया चित्र २" 
            fill
            className="object-contain"
            style={{ clipPath: "inset(2% 0 2% 0)" }}
          />
        </div>

        {/* Poem Section (Left) */}
        <div className="relative w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/80 md:bg-gradient-to-r from-white via-white to-white/90 backdrop-blur-sm md:backdrop-blur-none z-10 -mt-20 md:mt-0">
          
          <div className="space-y-12 text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            
            <div className="space-y-4">
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'dam' ? 'text-orange-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-orange-500'}`} onClick={() => handleSoundClick('dam')}>डम डम डम डम</span> डमरू बाजे,
              </p>
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'dham' ? 'text-red-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-red-500'}`} onClick={() => handleSoundClick('dham')}>ढम ढम ढम</span> ढोलक की मार।
              </p>
            </div>

            <div className="space-y-4">
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'tur' ? 'text-yellow-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-yellow-500'}`} onClick={() => handleSoundClick('tur')}>तुर तुर तुर तुर</span> बजता बाजा,
              </p>
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'thirak' ? 'text-pink-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-pink-500'}`} onClick={() => handleSoundClick('thirak')}>थिरक थिरक</span> कर नाच दिखाना,
              </p>
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'dan' ? 'text-blue-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-blue-500'}`} onClick={() => handleSoundClick('dan')}>दन दना दन</span> दौड़ लगाना,
              </p>
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'dhoom' ? 'text-purple-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-purple-500'}`} onClick={() => handleSoundClick('dhoom')}>धूम धाम</span> से खुशी मनाना।
              </p>
            </div>

            <div className="space-y-4">
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'pal' ? 'text-teal-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-teal-500'}`} onClick={() => handleSoundClick('pal')}>पल-पल हर पल</span> बढ़ते जाना,
              </p>
              <p>
                फल-फूलों के पेड़ लगाना,
              </p>
              <p>
                <span className={`cursor-pointer transition-colors ${activeSound === 'badh' ? 'text-indigo-600 font-bold scale-110 inline-block' : 'text-slate-600 hover:text-indigo-500'}`} onClick={() => handleSoundClick('badh')}>बढ़-बढ़</span> कर ना बात बनाना,
              </p>
              <p>
                भले काम तुम करते जाना।
              </p>
            </div>

          </div>

          {/* Interactive Hint */}
          <div className="mt-12 bg-amber-50 border border-amber-200 p-4 rounded-xl shadow-sm opacity-90 animate-pulse w-fit">
            <p className="text-sm text-amber-800 font-bold flex items-center gap-2">
              <span>🎵</span>
              कविता को गाते हुए आवाज़ वाले शब्दों पर क्लिक करें!
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Page Number */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-auto">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">45</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>खुशियों की दुनिया</span>
      </div>
    </div>
  );
}
