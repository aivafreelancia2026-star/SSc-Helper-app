"use client";

import { useState } from "react";

export function C6HindiCh7Page5() {
  // Matra Grid Data
  const vowels = [
    { v: "आ", m: "ा" }, { v: "इ", m: "ि" }, { v: "ई", m: "ी" },
    { v: "उ", m: "ु" }, { v: "ऊ", m: "ू" }, { v: "ऋ", m: "ृ" },
    { v: "ए", m: "े" }, { v: "ऐ", m: "ै" }, { v: "ओ", m: "ो" }, { v: "औ", m: "ौ" },
    { v: "अं", m: "ं" }, { v: "अः", m: "ः" }
  ];
  const consonants = ["क", "ग", "च", "ज", "ठ", "ढ", "त", "द", "र", "ल", "स"];
  
  // Initialize grid with the examples given in the textbook
  const initialGrid: Record<string, string> = { 
    "0-0": "का", "1-0": "कि", "2-0": "की", "3-0": "कु", "4-0": "कू", "5-0": "कृ", 
    "6-0": "के", "7-0": "कै", "8-0": "को", "9-0": "कौ", "10-0": "कं", "11-0": "कः",
    "3-8": "रु", "4-8": "रू", "5-8": "..." // Exceptions for 'र'
  };
  const [gridState, setGridState] = useState<Record<string, string>>(initialGrid);

  const handleGridChange = (row: number, col: number, value: string) => {
    setGridState(prev => ({ ...prev, [`${row}-${col}`]: value }));
  };

  // Writing Words
  const writeWords = ["दादा", "ठठेरा", "ढोल", "वट", "अंबर"];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-8 pb-4">
        
        {/* 1. लिखो Section */}
        <div className="flex items-center gap-4 bg-[#e8efd8] w-fit pr-8 rounded-full shadow-sm mb-12">
          <div className="bg-white rounded-full p-2 border-2 border-[#e8efd8]">
            <span className="text-3xl">✍️</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>लिखो</h2>
        </div>

        {/* (अ) मात्रा जोड़कर लिखिए */}
        <div className="mb-16">
          <p className="font-bold text-slate-800 text-xl mb-6">(अ) मात्रा जोड़कर लिखिए।</p>
          
          <div className="overflow-x-auto bg-[#faf9f5] p-2 rounded-xl border border-[#b5a371] shadow-sm">
            <table className="w-full border-collapse text-center table-fixed min-w-[800px]">
              <thead>
                <tr>
                  <th className="border-2 border-[#8f824d] bg-white py-3 text-lg font-bold text-slate-700 w-16">अक्षर</th>
                  <th className="border-2 border-[#8f824d] bg-white py-3 text-lg font-bold text-slate-700 w-16">मात्रा</th>
                  {consonants.map((c, i) => (
                    <th key={i} className="border-2 border-[#8f824d] bg-white py-3 text-xl font-bold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vowels.map((vowel, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-amber-50 transition-colors">
                    <td className="border-2 border-[#8f824d] bg-white py-3 text-2xl font-medium">
                      {vowel.v}
                    </td>
                    <td className="border-2 border-[#8f824d] bg-white py-3 text-3xl font-bold text-pink-600">
                      {vowel.m}
                    </td>
                    {consonants.map((_, colIdx) => (
                      <td key={colIdx} className="border-2 border-[#8f824d] p-0 bg-transparent">
                        <input 
                          type="text"
                          value={gridState[`${rowIdx}-${colIdx}`] || ""}
                          onChange={(e) => handleGridChange(rowIdx, colIdx, e.target.value)}
                          className={`w-full h-full py-3 text-center text-2xl outline-none focus:bg-blue-100 transition-colors bg-transparent
                            ${(rowIdx === 5 && colIdx === 8) ? 'text-slate-400' : 'text-blue-800 font-medium'}
                          `}
                          disabled={rowIdx === 5 && colIdx === 8} // Disable the '...' cell for 'र' + 'ृ'
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* (आ) शब्द पढ़िए और लिखिए */}
        <div className="mb-16">
          <p className="font-bold text-slate-800 text-xl mb-12">(आ) शब्द पढ़िए और लिखिए।</p>
          
          <div className="grid grid-cols-5 gap-4 mb-8 text-center text-4xl font-medium text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            {writeWords.map((word, idx) => (
              <div key={idx}>{word}</div>
            ))}
          </div>

          <div className="space-y-8 px-4">
            {Array.from({length: 4}).map((_, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-5 gap-8">
                {writeWords.map((_, colIdx) => (
                  <input 
                    key={`${rowIdx}-${colIdx}`}
                    type="text" 
                    className="w-full border-b-2 border-pink-400 border-dotted text-center text-2xl pb-1 outline-none focus:border-blue-500 bg-transparent transition-colors text-blue-800"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* First Letter Activity */}
        <div className="mb-8">
          <p className="font-bold text-slate-800 text-xl mb-6">ऊपर के शब्दों में से पहले अक्षर पहचानकर नीचे लिखिए।</p>
          <div className="flex bg-[#faf9f5] border-2 border-[#b5a371] w-fit shadow-sm">
            <div className="w-20 h-20 border-r-2 border-[#b5a371] flex items-center justify-center text-4xl font-medium text-slate-800 bg-white">
              द
            </div>
            {Array.from({length: 4}).map((_, idx) => (
              <input 
                key={idx}
                type="text" 
                className="w-20 h-20 border-r-2 border-[#b5a371] last:border-r-0 text-center text-4xl outline-none focus:bg-blue-50 bg-transparent text-blue-800 transition-colors font-medium"
              />
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-auto border-t border-slate-200">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">38</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मैदान</span>
      </div>
    </div>
  );
}
