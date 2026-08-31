"use client";

import { useState } from "react";
import Image from "next/image";

export function C6HindiCh5Page3() {
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [activeMatraRow, setActiveMatraRow] = useState<number | null>(null);

  // Table 1 Data: Matra splitting
  const matraTable = [
    {
      word: "तेल",
      parts: ["ते", "ल"],
      letters: ["त", "े", "ल"]
    },
    {
      word: "थैली",
      parts: ["थै", "ली"],
      letters: ["थ", "ै", "ल", "ी"]
    },
    {
      word: "पेड़",
      parts: ["पे", "ड़"],
      letters: ["प", "े", "ड़"]
    },
    {
      word: "धागा",
      parts: ["धा", "गा"],
      letters: ["ध", "ा", "ग", "ा"]
    },
    {
      word: "एक",
      parts: ["ए", "क"],
      letters: ["ए", "क"]
    },
    {
      word: "ऐनक",
      parts: ["ऐ", "न", "क"],
      letters: ["ऐ", "न", "क"]
    }
  ];

  // Table 2 Data: Matra Grid
  const consonants = ["क", "घ", "च", "ज", "न", "फ", "ग", "त", "थ", "ध", "प"];
  const matraRows = [
    { vowel: "ए", sign: "े", results: ["के", "घे", "चे", "जे", "ने", "फे", "गे", "ते", "थे", "धे", "पे"] },
    { vowel: "ऐ", sign: "ै", results: ["कै", "घै", "चै", "जै", "नै", "फै", "गै", "तै", "थै", "धै", "पै"] }
  ];

  // Word List
  const wordList = [
    ["तन", "धागा", "मेला", "एड़ी"],
    ["ऐनक", "पैसा", "तेल", "पैर"],
    ["नैना", "थरमस", "पटाका", "लड़का"],
    ["थैला", "धूल", "मैना", "बैल"]
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12">
      
      {/* 1. सुनो-बोलो Section */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-4 bg-[#e8efd8] w-fit pr-8 rounded-full shadow-sm mb-6">
          <div className="bg-white rounded-full p-2 border-2 border-[#e8efd8]">
            <span className="text-3xl">🗣️</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>सुनो-बोलो</h2>
        </div>
        
        <div className="space-y-4 px-4 text-xl text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          <p className="flex items-start gap-4 hover:text-blue-600 transition-colors cursor-pointer">
            <span className="font-bold">1.</span>
            <span>कविता में रेखांकित शब्दों के लिंग परिवर्तन कर सुनाइए।</span>
          </p>
          <p className="flex items-start gap-4 hover:text-blue-600 transition-colors cursor-pointer">
            <span className="font-bold">2.</span>
            <span>तुम्हारे घर में कौन क्या-क्या काम करते हैं?</span>
          </p>
        </div>
      </div>

      {/* 2. पढ़ो Section */}
      <div className="p-8 pt-0">
        <div className="flex items-center gap-4 bg-[#e8efd8] w-fit pr-8 rounded-full shadow-sm mb-6">
          <div className="bg-white rounded-full p-2 border-2 border-[#e8efd8]">
            <span className="text-3xl">📖</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>पढ़ो</h2>
        </div>

        <div className="space-y-6 px-4 text-xl text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <p className="font-bold mb-4 text-blue-800">(अ) प्रश्न के उत्तर बताइए।</p>
            <div className="space-y-3 pl-4">
              <p className="hover:text-amber-600 cursor-pointer transition-colors"><span className="font-bold mr-2">1.</span> दादाजी क्या कर रहे हैं?</p>
              <p className="hover:text-amber-600 cursor-pointer transition-colors"><span className="font-bold mr-2">2.</span> मीठे-मीठे गीत कौन सुनाती हैं?</p>
              <p className="hover:text-amber-600 cursor-pointer transition-colors"><span className="font-bold mr-2">3.</span> घर में कौन पढ़ते हैं?</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="font-bold text-slate-800 mb-6">(आ) शब्द पढ़िए। इनके वर्ण वर्णमाला चार्ट में पहचानकर 'O' लगाइए।</p>
            
            {/* Table 1: Matra Splitting */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center">
                <tbody>
                  {/* Row 1: Words */}
                  <tr>
                    {matraTable.map((item, idx) => (
                      <td key={`word-${idx}`} className="border-2 border-amber-600 py-3 px-2 text-2xl font-bold text-slate-800 bg-amber-50">
                        {item.word}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Row 2: Syllables */}
                  <tr>
                    {matraTable.map((item, colIdx) => (
                      <td key={`syllable-${colIdx}`} className="border-2 border-amber-600 p-0 align-top">
                        <div className="flex w-full h-full">
                          {item.parts.map((part, partIdx) => (
                            <div 
                              key={`p-${partIdx}`} 
                              className={`flex-1 py-3 text-xl font-medium border-slate-300 hover:bg-blue-100 transition-colors cursor-pointer
                                ${partIdx < item.parts.length - 1 ? 'border-r' : ''}`}
                            >
                              {part}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Row 3: Letters and Matras */}
                  <tr>
                    {matraTable.map((item, colIdx) => (
                      <td key={`letters-${colIdx}`} className="border-2 border-amber-600 p-0 align-top">
                        <div className="flex w-full h-full">
                          {item.letters.map((letter, letterIdx) => {
                            const isMatra = ['े', 'ै', 'ा', 'ी', 'ू', 'ु', 'ि'].includes(letter);
                            return (
                              <div 
                                key={`l-${letterIdx}`} 
                                className={`flex-1 py-3 text-lg font-medium border-slate-300 hover:bg-pink-100 transition-colors cursor-pointer flex items-center justify-center
                                  ${letterIdx < item.letters.length - 1 ? 'border-r' : ''}`}
                              >
                                {isMatra ? <span className="text-pink-600 text-2xl font-bold">{letter}</span> : letter}
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
          </div>

          <div className="mt-12 flex flex-col md:flex-row gap-8">
            {/* Word List */}
            <div className="md:w-1/2">
              <p className="font-bold text-slate-800 mb-6">(इ) इन्हें पढ़िए।</p>
              <div className="grid grid-cols-4 gap-4 md:gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                {wordList.map((row, rowIdx) => (
                  row.map((word, wordIdx) => (
                    <div 
                      key={`${rowIdx}-${wordIdx}`}
                      className="text-center text-xl font-medium text-slate-700 hover:text-blue-600 hover:scale-110 transition-all cursor-pointer"
                    >
                      {word}
                    </div>
                  ))
                ))}
              </div>
            </div>

            {/* Notebook / Varnamala Chart */}
            <div className="md:w-1/2 relative bg-white border border-slate-300 shadow-md rounded-r-xl overflow-hidden min-h-[300px]">
              {/* Spiral binding emulation */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-slate-100 border-r border-slate-300 flex flex-col justify-evenly items-center z-10">
                {Array.from({length: 12}).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-slate-800 rounded-full shadow-inner relative">
                    <div className="absolute -left-2 top-1 w-6 h-2 bg-slate-600 rounded-full -rotate-12 opacity-50"></div>
                  </div>
                ))}
              </div>
              
              {/* Notebook lines and content */}
              <div className="pl-12 pt-6 pr-6 pb-6 h-full flex flex-col relative"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
                     backgroundPosition: '0 6px'
                   }}>
                
                <div className="text-slate-800 text-lg leading-[32px] tracking-widest text-center">
                  <div className="text-blue-800 font-bold mb-4">
                    अ आ इ ई उ ऊ ऋ<br/>
                    ए ऐ ओ औ अं अः
                  </div>
                  <div>क ख ग घ ङ</div>
                  <div>च छ ज झ ञ</div>
                  <div>ट ठ ड ढ ण (ड़ ढ़)</div>
                  <div>त थ द ध न</div>
                  <div>प फ ब भ म</div>
                  <div>य र ल व</div>
                  <div>श ष स ह</div>
                  <div>क्ष त्र ज्ञ श्र</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              (ई) नीचे दिए गए बक्से के अक्षरों में <span className="text-pink-600 font-extrabold text-2xl mx-1">े</span> और <span className="text-pink-600 font-extrabold text-2xl mx-1">ै</span> मात्रा का अंतर समझते हुए पढ़िए।
            </p>

            {/* Table 2: Matra Grid */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200 p-2">
              <table className="w-full border-collapse text-center">
                <thead>
                  <tr>
                    <th className="border border-amber-600 bg-amber-50 py-3 text-lg text-slate-800 font-bold">अक्षर</th>
                    <th className="border border-amber-600 bg-amber-50 py-3 text-lg text-slate-800 font-bold">मात्रा</th>
                    {consonants.map((c, i) => (
                      <th key={i} className="border border-amber-600 bg-amber-50 py-3 text-xl text-slate-800 font-bold">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matraRows.map((row, rowIdx) => (
                    <tr key={rowIdx} 
                        className={`transition-colors duration-300 ${activeMatraRow === rowIdx ? 'bg-blue-50' : ''}`}
                        onMouseEnter={() => setActiveMatraRow(rowIdx)}
                        onMouseLeave={() => setActiveMatraRow(null)}
                    >
                      <td className="border border-amber-600 py-3 text-xl font-bold">{row.vowel}</td>
                      <td className="border border-amber-600 py-3 text-3xl font-extrabold text-pink-600">{row.sign}</td>
                      {row.results.map((res, i) => (
                        <td key={i} className="border border-amber-600 py-3 text-xl font-medium cursor-pointer hover:bg-white hover:text-blue-700 hover:scale-110 transition-transform">
                          {res}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-8 border-t border-slate-200">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">26</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मेरा परिवार</span>
      </div>
    </div>
  );
}
