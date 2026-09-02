"use client";

import { useState } from "react";
import Image from "next/image";

export function C6HindiCh9Page3() {
  // (अ) Matching Game State
  const matchItemsA = [
    { text: "घुमड़ घुमड़ कर गरजे मेघ।", emoji: "☁️" },
    { text: "टिक टिक टिक टिक चलती घड़ियाँ।", emoji: "⏰" },
    { text: "छुक छुक छुक छुक चलती रेल।", emoji: "🚂" },
    { text: "तुर तुर तुर तुर बजता बाजा।", emoji: "🎺" },
    { text: "झर झर झरता झरना देख", emoji: "🌊" },
    { text: "खी खी खी खी हँसता बंदर", emoji: "🐒" }
  ];
  const [revealedA, setRevealedA] = useState<Record<number, boolean>>({});

  const toggleA = (idx: number) => {
    setRevealedA(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // (आ) Matching Game State
  const matchItemsB = [
    { left: "चम चम चम चम", right: "चमके तारे" },
    { left: "डम डम डम डम", right: "डमरू बाजे" },
    { left: "कू कू कू कू", right: "कोयल गाती" },
    { left: "गड़ गड़ गड़", right: "गाड़ी चलती" },
    { left: "तुर तुर तुर", right: "बजता बाजा" },
    { left: "ठक ठक ठक", right: "करता लोहार" }
  ];
  const [revealedB, setRevealedB] = useState<Record<number, boolean>>({});

  const toggleB = (idx: number) => {
    setRevealedB(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-8 pb-4 relative">
        
        {/* QR Code Placeholder */}
        <div className="absolute right-8 top-8 bg-white p-2 border-2 border-slate-800 flex flex-col items-center shadow-md z-10">
          <div className="w-16 h-16 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=V7P6W1')] bg-cover opacity-80 mix-blend-multiply"></div>
          <span className="text-xs font-bold mt-1 tracking-widest text-slate-800">V7P6W1</span>
        </div>

        {/* 1. सुनो-बोलो Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 bg-[#e8efd8] w-fit pr-8 rounded-full shadow-sm mb-6">
            <div className="bg-white rounded-full p-2 border-2 border-[#e8efd8]">
              <span className="text-3xl">🗣️</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>सुनो-बोलो</h2>
          </div>
          
          <div className="space-y-4 text-xl text-slate-700 max-w-3xl pl-4" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            <p className="flex items-center gap-4">
              <span className="font-bold shrink-0">1.</span>
              <span>कोयल की आवाज़ कैसी होती है?</span>
              <span className="text-3xl bg-blue-50 p-2 rounded-xl">🐦</span>
            </p>
            <p className="flex items-start gap-4">
              <span className="font-bold shrink-0">2.</span>
              <span>फल-फूलों के पेड़ लगाने से क्या लाभ है?</span>
            </p>
          </div>
        </div>

        {/* 2. पढ़ो Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 bg-[#e8efd8] w-fit pr-8 rounded-full shadow-sm mb-6">
            <div className="bg-white rounded-full p-2 border-2 border-[#e8efd8]">
              <span className="text-3xl">📖</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>पढ़ो</h2>
          </div>

          {/* (अ) जोड़ी बनाइए */}
          <div className="mb-12 pl-4">
            <p className="font-bold text-slate-800 text-xl mb-4">(अ) जोड़ी बनाइए।</p>
            <p className="text-sm text-slate-500 mb-6 italic animate-pulse">💡 वाक्यों पर क्लिक करके सही चित्र ढूँढें!</p>

            <div className="flex justify-center">
              <div className="border border-[#b5a371] bg-[#faf9f5] p-6 shadow-sm w-full max-w-2xl flex flex-col gap-4 relative">
                
                {matchItemsA.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => toggleA(idx)}
                    className="flex justify-between items-center bg-white p-4 rounded border border-slate-200 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all group"
                  >
                    <span className="text-xl md:text-2xl text-slate-700 group-hover:text-blue-700 transition-colors" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      {item.text}
                    </span>
                    <div className="w-16 h-16 flex items-center justify-center text-4xl bg-slate-100 rounded-full border border-dashed border-slate-300">
                      {revealedA[idx] ? (
                        <span className="animate-bounce">{item.emoji}</span>
                      ) : (
                        <span className="text-slate-300 text-2xl">?</span>
                      )}
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* (आ) पाठ के आधार पर जोड़िए */}
          <div className="mb-12 pl-4">
            <p className="font-bold text-slate-800 text-xl mb-6">(आ) पाठ के आधार पर जोड़िए।</p>
            <p className="text-sm text-slate-500 mb-6 italic animate-pulse">💡 शब्दों पर क्लिक करके सही जोड़ी बनाएँ!</p>
            
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-x-12 md:gap-x-24 gap-y-6">
                {matchItemsB.map((item, idx) => (
                  <div key={idx} className="col-span-2 grid grid-cols-2 gap-x-12 md:gap-x-24 items-center">
                    
                    {/* Left Column */}
                    <div 
                      className="text-right cursor-pointer"
                      onClick={() => toggleB(idx)}
                    >
                      <span className="text-xl md:text-2xl text-slate-800 hover:text-orange-600 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 inline-block" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                        {item.left}
                      </span>
                    </div>

                    {/* Right Column */}
                    <div className="text-left">
                      <div className={`transition-all duration-500 ${revealedB[idx] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        <span className="text-xl md:text-2xl text-green-700 border-b border-green-300 pb-1 inline-block" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                          {item.right}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* विचार-विमर्श Box */}
          <div className="mb-12 pl-4">
            <div className="bg-[#f8f9e9] border border-[#d6d9aa] p-8 rounded-xl shadow-sm relative w-full md:w-3/4 mx-auto">
              <div className="absolute -top-4 -left-4 text-6xl text-[#b5a371]">❝</div>
              <h3 className="text-center font-bold text-2xl text-slate-800 mb-4 border-b-2 border-slate-300 pb-2 w-fit mx-auto" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                विचार-विमर्श
              </h3>
              <p className="text-xl text-slate-700 leading-relaxed text-justify italic" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                हम सब में कोई न कोई हुनर, कला या कौशल होता है। हम सब किसी न किसी कला से सशक्त हैं। किसी को पढ़ना-लिखना, किसी को संगीत, किसी को नृत्य-खेल, किसी को पेड़-पौधे लगाना या चित्रकला पसंद होती है। ये सब अलग-अलग तरह की बुद्धिमत्ता हैं।
              </p>
            </div>
          </div>

          {/* (इ) पढ़ो। अंतर समझो। */}
          <div className="mb-12 pl-4">
            <p className="font-bold text-slate-800 text-xl mb-4">(इ) पढ़ो। अंतर समझो।</p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
              <div className="border-2 border-[#a5af33] p-6 bg-white text-2xl md:text-3xl text-slate-800 leading-[3rem] font-medium text-center shadow-sm" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                <div>गड़ गड़ गड़ गड़ - डम डम डम डम</div>
                <div>बढ़ बढ़ बढ़ बढ़ - ढम ढम ढम ढम</div>
              </div>
              <div className="w-32 h-32 bg-amber-50 rounded-2xl border-2 border-amber-200 flex items-center justify-center shadow-sm">
                <span className="text-6xl">🥁</span>
              </div>
            </div>
          </div>

          {/* (ई) गाओ। कक्षा में सुनाओ। */}
          <div className="mb-4 pl-4">
            <p className="font-bold text-slate-800 text-xl mb-4">(ई) गाओ। कक्षा में सुनाओ।</p>
            
            <div className="bg-[#f0f9ff] border-2 border-[#bae6fd] p-6 text-center shadow-sm">
              <p className="text-2xl md:text-3xl text-blue-800 font-bold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                सन-सन-सन-सन चली हवा। फर-फर-फर-फर उड़ी पतंग।
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-auto border-t border-slate-200">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">46</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>खुशियों की दुनिया</span>
      </div>
    </div>
  );
}
