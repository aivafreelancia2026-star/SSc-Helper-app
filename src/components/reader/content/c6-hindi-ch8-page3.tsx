"use client";

import { useState } from "react";
import Image from "next/image";

export function C6HindiCh8Page3() {
  // Game State for (अ)
  const wordsList = [
    "रक्षा", "श्रम", "ज्ञान", "संज्ञा", "त्रिकोण", "श्रवण", 
    "क्षमा", "भिक्षा", "विज्ञान", "आज्ञा", "पत्र", "श्राप", 
    "यज्ञ", "चित्र", "ज्ञानी"
  ];
  
  // Mapping of symbols for cycling
  const symbols = ["", "◯", "▢", "√", "( )"];
  const [wordSymbols, setWordSymbols] = useState<Record<number, number>>({});

  const handleWordClick = (idx: number) => {
    setWordSymbols(prev => ({
      ...prev,
      [idx]: ((prev[idx] || 0) + 1) % symbols.length
    }));
  };

  // Matra Table Data
  const matraTable = [
    {
      word: "छात्र",
      syllables: ["छा", "त्र"],
      letters: ["छ", "ा", "त्र"]
    },
    {
      word: "कक्षा",
      syllables: ["क", "क्षा"],
      letters: ["क", "क्ष", "ा"]
    },
    {
      word: "ज्ञान",
      syllables: ["ज्ञा", "न"],
      letters: ["ज्ञ", "ा", "न"]
    },
    {
      word: "श्रमिक",
      syllables: ["श्र", "मि", "क"],
      letters: ["श्र", "ि", "म", "क"]
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-8 pb-4 relative">
        
        {/* QR Code Placeholder */}
        <div className="absolute right-8 top-8 bg-white p-2 border-2 border-slate-800 flex flex-col items-center shadow-md z-10">
          <div className="w-16 h-16 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=T2J5L4')] bg-cover opacity-80 mix-blend-multiply"></div>
          <span className="text-xs font-bold mt-1 tracking-widest text-slate-800">T2J5L4</span>
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
            <p className="flex items-start gap-4">
              <span className="font-bold">1.</span>
              <span>विद्यालय में स्वतंत्रता दिवस, गणतंत्र दिवस, शिक्षक दिवस आदि मनाते हैं। आपको कौन-सा दिवस पसंद है? क्यों?</span>
            </p>
            <p className="flex items-start gap-4">
              <span className="font-bold">2.</span>
              <span>बाल दिवस के दिन आपके विद्यालय में क्या-क्या किया जाता है?</span>
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

          {/* (अ) Interactive Shape Tagging Game */}
          <div className="mb-12 pl-4">
            <p className="font-bold text-slate-800 text-xl mb-4 leading-relaxed flex flex-wrap gap-2 items-center">
              (अ) 'क्ष' वाले शब्दों पर '<span className="text-2xl text-blue-600 border rounded-full px-2">◯</span>', 
              'त्र' वाले शब्दों पर '<span className="text-2xl text-green-600 border px-2">▢</span>', <br/>
              'ज्ञ' वाले शब्दों पर '<span className="text-2xl text-orange-600 font-extrabold border px-2">√</span>' 
              और 'श्र' वाले शब्दों पर '<span className="text-xl text-purple-600 border px-2 font-mono">( )</span>' लगाइए।
            </p>
            <p className="text-sm text-slate-500 mb-6 italic animate-pulse">💡 शब्दों पर क्लिक करके सही चिह्न चुनें। (Click words to cycle through shapes)</p>

            <div className="border border-[#b5a371] bg-[#faf9f5] p-6 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 text-center">
                {wordsList.map((word, idx) => {
                  const symbolIdx = wordSymbols[idx] || 0;
                  const currentSymbol = symbols[symbolIdx];
                  
                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleWordClick(idx)}
                      className="relative p-4 cursor-pointer hover:bg-amber-50 rounded-lg transition-colors border border-transparent hover:border-amber-200 select-none group"
                    >
                      <span className="text-2xl text-slate-800 font-medium z-10 relative group-hover:scale-110 inline-block transition-transform">{word}</span>
                      {currentSymbol && (
                        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 font-bold text-5xl
                          ${currentSymbol === '◯' ? 'text-blue-600' : 
                            currentSymbol === '▢' ? 'text-green-600 text-6xl' : 
                            currentSymbol === '√' ? 'text-orange-600 -mt-2' : 'text-purple-600 font-mono tracking-[0.5em]'}
                        `}>
                          {currentSymbol}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* (आ) Matra Splitting Table */}
          <div className="mb-12 pl-4">
            <p className="font-bold text-slate-800 text-xl mb-6">
              (आ) शब्द पढ़िए। वर्ण पढ़िए। इन अक्षरों को वर्णमाला में पहचानकर '<span className="text-2xl text-blue-600 px-1">◯</span>' लगाइए।
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="overflow-x-auto bg-[#faf9f5] p-1 rounded-xl shadow-sm border border-[#b5a371]">
                <table className="w-full border-collapse text-center">
                  <tbody>
                    {/* Words Row */}
                    <tr>
                      {matraTable.map((item, idx) => (
                        <td key={`word-${idx}`} className="border-2 border-[#b5a371] py-4 px-2 text-3xl font-bold text-slate-800 bg-white">
                          {item.word}
                        </td>
                      ))}
                    </tr>
                    {/* Syllables Row */}
                    <tr>
                      {matraTable.map((item, colIdx) => (
                        <td key={`syll-${colIdx}`} className="border-2 border-[#b5a371] p-0 bg-white align-top">
                          <div className="flex w-full h-full min-h-[60px]">
                            {item.syllables.map((s, i) => (
                              <div key={i} className={`flex-1 py-3 text-2xl font-medium border-slate-300 flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer
                                ${i < item.syllables.length - 1 ? 'border-r-2 border-dotted' : ''}`}>
                                {s}
                              </div>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                    {/* Letters Row */}
                    <tr>
                      {matraTable.map((item, colIdx) => (
                        <td key={`let-${colIdx}`} className="border-2 border-[#b5a371] p-0 bg-white align-top">
                          <div className="flex w-full h-full min-h-[60px]">
                            {item.letters.map((l, i) => {
                              const isMatra = ['ा', 'ि'].includes(l);
                              return (
                                <div key={i} className={`flex-1 py-3 text-xl font-medium border-slate-300 flex items-center justify-center hover:bg-pink-50 transition-colors cursor-pointer
                                  ${i < item.letters.length - 1 ? 'border-r-2 border-dotted' : ''}`}>
                                  {isMatra ? <span className="text-pink-600 text-3xl font-bold">{l}</span> : l}
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Context Image Placeholder */}
              <div className="shrink-0 w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-md relative overflow-hidden">
                 <Image src="/assets/images/C6-hindi/ch8-p3-full.png" alt="Teacher chart" fill className="object-cover opacity-80" />
              </div>
            </div>
          </div>

          {/* (इ) Sanyuktakshar and Notebook */}
          <div className="mb-4 pl-4">
            <p className="font-bold text-slate-800 text-xl mb-6">(इ) पढ़िए-समझिए।</p>
            
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              
              {/* Left Box (Rules) */}
              <div className="flex-1 bg-[#e8f4d8] border border-[#a8c984] p-6 text-xl text-slate-800 rounded-lg shadow-inner flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl pointer-events-none">📖</div>
                
                <div className="grid grid-cols-2 gap-y-2 bg-white/60 p-4 rounded-lg font-bold">
                  <div>क् + ष = <span className="text-pink-700 text-2xl">क्ष</span></div>
                  <div>त् + र = <span className="text-pink-700 text-2xl">त्र</span></div>
                  <div>ज् + ञ = <span className="text-pink-700 text-2xl">ज्ञ</span></div>
                  <div>श् + र = <span className="text-pink-700 text-2xl">श्र</span></div>
                </div>

                <div className="bg-[#b3d493] p-4 rounded-lg shadow-sm border border-[#8fb56a] leading-relaxed">
                  ऊपर दिए गए वर्ण दो अलग वर्णों के मेल से बने हैं। ऐसे अक्षर <span className="font-bold text-blue-900">'संयुक्तक्षर'</span> कहलाते हैं।
                  <br/>
                  <span className="font-bold block mt-2">जैसे: क्षण, चित्र, यज्ञ, श्रम</span>
                </div>

                <p className="font-bold text-slate-800 mt-2">पढ़िए-समझिए।</p>
                
                <div className="grid grid-cols-2 gap-y-2 bg-white/60 p-4 rounded-lg font-bold">
                  <div>क् + य = <span className="text-blue-700">क्य</span></div>
                  <div>ग् + व = <span className="text-blue-700">ग्व</span></div>
                  <div>म् + य = <span className="text-blue-700">म्य</span></div>
                  <div>स् + व = <span className="text-blue-700">स्व</span></div>
                </div>
                
                <div className="font-bold bg-white/40 p-2 rounded px-4">
                  जैसे: क्या, म्यान, ग्वाला, स्वामी
                </div>
              </div>

              {/* Right Box (Notebook Varnamala) */}
              <div className="flex-1 relative bg-white border border-slate-300 shadow-md rounded-r-xl overflow-hidden min-h-[400px]">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-slate-100 border-r border-slate-300 flex flex-col justify-evenly items-center z-10">
                  {Array.from({length: 12}).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-slate-800 rounded-full shadow-inner relative">
                      <div className="absolute -left-2 top-1 w-6 h-2 bg-slate-600 rounded-full -rotate-12 opacity-50"></div>
                    </div>
                  ))}
                </div>
                <div className="pl-12 pt-6 pr-6 pb-6 h-full flex flex-col justify-center relative"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #93c5fd 31px, #93c5fd 32px)',
                        backgroundPosition: '0 8px'
                      }}>
                  <div className="text-slate-800 text-[1.1rem] leading-[32px] tracking-[0.4em] text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    <div>अ आ इ ई उ ऊ ऋ</div>
                    <div>ए ऐ ओ औ अं अः</div>
                    <div>क ख ग घ ङ</div>
                    <div>च छ ज झ ञ</div>
                    <div>ट ठ ड ढ ण (ड़ ढ़)</div>
                    <div>त थ द ध न</div>
                    <div>प फ ब भ म</div>
                    <div>य र ल व</div>
                    <div>श ष स ह</div>
                    <div className="text-pink-600 font-bold">क्ष त्र ज्ञ (श्र)</div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-auto border-t border-slate-200">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">42</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>बाल दिवस</span>
      </div>
    </div>
  );
}
