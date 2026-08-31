"use client";

import { useState } from "react";

export function C6HindiCh6Page4() {
  const [activeMatraRow, setActiveMatraRow] = useState<number | null>(null);
  
  // Word List Data
  const practiceWords = [
    ["ओला", "ओस", "औज़ार", "औरत"],
    ["औषध", "गोली", "चीन", "नौ"],
    ["पौधा", "बाण", "यश", "शरबत"],
    ["शहर", "सात", "सोना", "झूला"],
    ["हाथी", "हिरण", "हल", "जगत"]
  ];

  // Matra Grid Data
  const consonants = ["क", "घ", "च", "ज", "न", "फ", "ब", "भ", "म", "ल", "स"];
  const matraRows = [
    { vowel: "ो", results: ["को", "घो", "चो", "जो", "नो", "फो", "बो", "भो", "मो", "लो", "सो"] },
    { vowel: "ौ", results: ["कौ", "घौ", "चौ", "जौ", "नौ", "फौ", "बौ", "भौ", "मौ", "लौ", "सौ"] }
  ];

  // Writing Words
  const writeWords = ["ओस", "औरत", "कोयल", "शरबत", "हिरण", "झूला"];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12">
      
      <div className="p-8 pb-4">
        <p className="font-bold text-slate-800 text-xl mb-6">(ई) इन्हें पढ़िए।</p>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Notebook / Varnamala Chart */}
          <div className="w-full md:w-1/2 relative bg-white border border-slate-300 shadow-md rounded-r-xl overflow-hidden min-h-[350px]">
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
              
              <div className="text-slate-800 text-[1.1rem] leading-[32px] tracking-widest text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                <div>अ आ इ ई उ ऊ ऋ</div>
                <div>ए ऐ ओ औ अं अः</div>
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

          {/* Practice Words Box */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h3 className="text-3xl font-medium tracking-widest text-slate-800 text-center mb-4" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              श ह ण य ओ औ
            </h3>
            
            <div className="border border-[#8f824d] p-6 bg-[#faf9f5]">
              <div className="grid grid-cols-4 gap-y-6 gap-x-2 text-center text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                {practiceWords.map((row, rIdx) => (
                  row.map((word, wIdx) => (
                    <div key={`${rIdx}-${wIdx}`} className="hover:text-amber-600 hover:scale-110 transition-transform cursor-pointer">
                      {word}
                    </div>
                  ))
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* (उ) Matra Grid */}
        <div className="mt-12">
          <p className="font-bold text-slate-800 text-xl mb-6 flex items-center flex-wrap gap-2">
            (उ) नीचे दिए गए बक्से के अक्षरों में <span className="text-pink-600 font-extrabold text-2xl mx-1">ो</span> और <span className="text-pink-600 font-extrabold text-2xl mx-1">ौ</span> की मात्रा का अंतर समझते हुए पढ़िए।
          </p>

          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-amber-600">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr>
                  <th className="border border-amber-600 py-4 px-2 bg-amber-50"></th>
                  {consonants.map((c, i) => (
                    <th key={i} className="border border-amber-600 bg-amber-50 py-4 px-4 text-xl text-slate-800 font-bold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matraRows.map((row, rowIdx) => (
                  <tr key={rowIdx} 
                      className={`transition-colors duration-300 ${activeMatraRow === rowIdx ? 'bg-amber-100/50' : 'bg-[#faf9f5]'}`}
                      onMouseEnter={() => setActiveMatraRow(rowIdx)}
                      onMouseLeave={() => setActiveMatraRow(null)}
                  >
                    <td className="border border-amber-600 py-4 text-4xl font-extrabold text-pink-600">{row.vowel}</td>
                    {row.results.map((res, i) => (
                      <td key={i} className="border border-amber-600 py-4 text-2xl font-medium cursor-pointer hover:bg-white hover:text-blue-700 hover:scale-110 transition-all">
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

      {/* 3. लिखो Section */}
      <div className="p-8 pt-4">
        <div className="flex items-center gap-4 bg-[#e8efd8] w-fit pr-8 rounded-full shadow-sm mb-6">
          <div className="bg-white rounded-full p-2 border-2 border-[#e8efd8]">
            <span className="text-3xl">✍️</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>लिखो</h2>
        </div>
        
        {/* (अ) Trace Writing */}
        <div className="mb-8">
          <p className="font-bold text-slate-800 text-xl mb-6">(अ) शब्द पढ़िए। लिखिए।</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-8">
            {writeWords.map((word, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl font-medium text-slate-800 mb-2">{word}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {Array.from({length: 4}).map((_, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-3 md:grid-cols-6 gap-6">
                {writeWords.map((_, colIdx) => (
                  <input 
                    key={`${rowIdx}-${colIdx}`}
                    type="text" 
                    className="w-full border-b-2 border-pink-400 border-dashed text-center text-2xl pb-1 outline-none focus:border-blue-500 focus:border-solid bg-transparent transition-colors text-blue-800"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-auto border-t border-slate-200">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">31</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>चिड़ियाघर</span>
      </div>
    </div>
  );
}
