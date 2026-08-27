"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function C6HindiCh3Page3() {
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const wordsData1 = [
    { word: "उमा", letters1: ["उ", "मा"], letters2: ["उ", "म", "ा"], emoji: "👧" },
    { word: "ऊन", letters1: ["ऊ", "न"], letters2: ["ऊ", "न"], emoji: "🧶" },
    { word: "घड़ी", letters1: ["घ", "ड़ी"], letters2: ["घ", "ड़", "ी"], emoji: "⏰" },
    { word: "चार", letters1: ["चा", "र"], letters2: ["च", "ा", "र"], emoji: "4️⃣" },
    { word: "छड़ी", letters1: ["छ", "ड़ी"], letters2: ["छ", "ड़", "ी"], emoji: "🦯" }
  ];

  const wordsData2 = [
    { word: "टिकट", letters1: ["टि", "क", "ट"], letters2: ["ट", "ि", "क", "ट"], emoji: "🎫" }
  ];

  const alphabetRows = [
    ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ"],
    ["ए", "ऐ", "ओ", "औ", "अं", "अः"],
    ["क", "ख", "ग", "घ", "ङ"],
    ["च", "छ", "ज", "झ", "ञ"],
    ["ट", "ठ", "ड", "ढ", "ण", "ड़", "ढ़"],
    ["त", "थ", "द", "ध", "न"],
    ["प", "फ", "ब", "भ", "म"],
    ["य", "र", "ल", "व"],
    ["श", "ष", "स", "ह"],
    ["क्ष", "त्र", "ज्ञ", "श्र"]
  ];

  const toggleLetter = (l: string) => {
    setActiveLetter(prev => prev === l ? null : l);
  };

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 p-2 sm:p-4">
      
      {/* Section 1 */}
      <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4 bg-green-200 w-fit px-4 py-2 rounded-full">
          <span className="text-2xl">🗣️</span>
          <h2 className="font-heading text-lg font-bold text-green-900" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            सुनो-बोलो
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-4" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            <p className="text-base font-medium flex gap-2">
              <span>1.</span>
              <span>चित्र में क्या-क्या हैं?</span>
            </p>
            <p className="text-base font-medium flex gap-2">
              <span>2.</span>
              <span>यातायात के साधनों के नाम बताइए।</span>
            </p>
          </div>
          
          <div className="flex gap-4 items-center bg-white p-4 rounded-xl shadow-md border border-gray-100">
            <div className="text-6xl animate-bounce">🚂</div>
            <div className="flex flex-col items-center p-2 border-2 border-gray-800 rounded-lg bg-gray-50">
              <span className="text-xs font-bold text-gray-500 mb-1">QR CODE</span>
              <div className="w-16 h-16 grid grid-cols-4 grid-rows-4 gap-1 p-1 bg-white border border-gray-300">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={`bg-gray-800 rounded-sm ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                ))}
              </div>
              <span className="text-xs font-bold mt-1 text-gray-700 tracking-widest">V5C8G7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 bg-green-200 w-fit px-4 py-2 rounded-full shadow-sm">
          <span className="text-2xl">🗣️</span>
          <h2 className="font-heading text-lg font-bold text-green-900" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            सुनो-बोलो
          </h2>
        </div>

        <p className="text-base font-medium text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          (अ) चित्र देखिए। शब्द पढ़िए। इनके वर्ण वर्णमाला चार्ट में पहचानकर &apos;◯&apos; लगाइए।
        </p>

        {/* Interactive Interactive Hint */}
        <div className="text-xs text-blue-600 font-bold bg-blue-50 p-2 rounded-lg border border-blue-200 text-center animate-pulse w-full max-w-md mx-auto">
          👇 वर्णों (अक्षरों) पर क्लिक करके उन्हें चार्ट में खोजें!
        </div>

        {/* Words Table 1 */}
        <div className="overflow-x-auto rounded-xl border-2 border-[#b59e54] shadow-md bg-white">
          <div className="flex flex-col min-w-[600px]">
            {/* Header / Words */}
            <div className="flex border-b-2 border-[#b59e54]">
              {wordsData1.map((w, i) => (
                <div key={i} className="flex-1 text-center py-3 text-lg font-bold border-r last:border-r-0 border-[#b59e54]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  {w.word}
                </div>
              ))}
            </div>
            {/* Letters 1 */}
            <div className="flex border-b-2 border-[#b59e54] bg-[#f9f8f3]">
              {wordsData1.map((w, wIdx) => (
                <div key={wIdx} className="flex-1 flex border-r last:border-r-0 border-[#b59e54]">
                  {w.letters1.map((l, lIdx) => (
                    <button 
                      key={lIdx} 
                      onClick={() => toggleLetter(l)}
                      className={`flex-1 text-center py-2 text-base font-medium border-r last:border-r-0 border-[#b59e54] transition-colors hover:bg-[#ebd58d] ${activeLetter === l ? 'bg-[#e0c466]' : ''}`} 
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            {/* Letters 2 */}
            <div className="flex bg-[#f9f8f3]">
              {wordsData1.map((w, wIdx) => (
                <div key={wIdx} className="flex-1 flex border-r last:border-r-0 border-[#b59e54]">
                  {w.letters2.map((l, lIdx) => (
                    <button 
                      key={lIdx}
                      onClick={() => toggleLetter(l)} 
                      className={`flex-1 text-center py-2 text-base font-medium border-r last:border-r-0 border-[#b59e54] transition-colors hover:bg-[#ebd58d] ${activeLetter === l ? 'bg-[#e0c466]' : ''}`} 
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emojis for Words Table 1 */}
        <div className="flex justify-around items-end py-4">
          {wordsData1.map((w, i) => (
            <div key={i} className="text-5xl drop-shadow-md hover:scale-110 transition-transform cursor-default" title={w.word}>
              {w.emoji}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start mt-8">
          {/* Words Table 2 (Ticket) */}
          <div className="w-full md:w-1/3 space-y-4">
            <div className="rounded-xl border-2 border-[#b59e54] shadow-md bg-white overflow-hidden">
              <div className="flex flex-col">
                <div className="text-center py-3 text-lg font-bold border-b-2 border-[#b59e54]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  {wordsData2[0].word}
                </div>
                <div className="flex border-b-2 border-[#b59e54] bg-[#f9f8f3]">
                  {wordsData2[0].letters1.map((l, lIdx) => (
                    <button 
                      key={lIdx} 
                      onClick={() => toggleLetter(l)}
                      className={`flex-1 text-center py-2 text-base font-medium border-r last:border-r-0 border-[#b59e54] transition-colors hover:bg-[#ebd58d] ${activeLetter === l ? 'bg-[#e0c466]' : ''}`} 
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <div className="flex bg-[#f9f8f3]">
                  {wordsData2[0].letters2.map((l, lIdx) => (
                    <button 
                      key={lIdx} 
                      onClick={() => toggleLetter(l)}
                      className={`flex-1 text-center py-2 text-base font-medium border-r last:border-r-0 border-[#b59e54] transition-colors hover:bg-[#ebd58d] ${activeLetter === l ? 'bg-[#e0c466]' : ''}`} 
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center text-8xl drop-shadow-lg rotate-[-15deg] hover:rotate-0 transition-transform cursor-default" title="टिकट">
              {wordsData2[0].emoji}
            </div>
          </div>

          {/* Alphabet Chart Notebook */}
          <div className="w-full md:w-2/3 relative">
            <div className="bg-[#b3d4f0] p-3 sm:p-6 rounded-r-3xl rounded-l-lg shadow-[8px_8px_0px_rgba(0,0,0,0.1)] relative border border-[#92bbde]">
              {/* Spiral binding rings */}
              <div className="absolute left-[-10px] top-4 bottom-4 w-6 flex flex-col justify-between py-2">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-8 h-3 bg-gray-300 rounded-full border border-gray-400 shadow-sm" style={{ backgroundImage: "linear-gradient(to right, #ddd, #fff, #bbb)" }} />
                ))}
              </div>
              
              <div className="bg-white ml-4 p-4 sm:p-8 rounded-xl shadow-inner min-h-[300px] flex flex-col gap-4 border border-gray-100" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)", backgroundAttachment: "local", lineHeight: "32px" }}>
                {alphabetRows.map((row, rIdx) => (
                  <div key={rIdx} className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 justify-start sm:pl-8">
                    {row.map((char, cIdx) => {
                      const isHighlighted = activeLetter === char || activeLetter?.includes(char);
                      return (
                        <span 
                          key={cIdx} 
                          className={`text-lg sm:text-xl md:text-2xl font-medium transition-all duration-300 relative ${isHighlighted ? 'text-red-600 scale-125 font-bold z-10' : 'text-gray-800'}`}
                          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                        >
                          {char}
                          {isHighlighted && (
                            <span className="absolute inset-[-4px] border-2 border-red-500 rounded-full animate-ping opacity-20"></span>
                          )}
                          {isHighlighted && (
                            <span className="absolute inset-[-4px] border-2 border-red-500 rounded-full"></span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info matching the book */}
      <div className="flex justify-between items-center text-xs text-foreground/40 pt-12 border-t border-border/30">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          छात्रों की प्रगति हेतु सरकार का उपहार
        </span>
        <span className="font-bold text-foreground/60 bg-green-100 px-3 py-1 rounded text-green-900 border border-green-200">14</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          रेलवे स्टेशन
        </span>
      </div>
    </div>
  );
}
