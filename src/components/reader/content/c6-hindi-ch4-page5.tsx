"use client";

import { useState } from "react";
import Image from "next/image";

const CONSONANTS = ["क", "च", "छ", "ड", "व", "ज", "फ", "प", "भ"];
const MATRAS = [
  { symbol: "ा", name: "aa" },
  { symbol: "ि", name: "i" },
  { symbol: "ी", name: "ee" },
  { symbol: "ु", name: "u" },
  { symbol: "ू", name: "oo" },
  { symbol: "ृ", name: "ri" },
];

const WORDS = ["ऋषभ", "कृषक", "बाघ", "जल", "फल"];

export function C6HindiCh4Page5() {
  const [revealedCells, setRevealedCells] = useState<Record<string, boolean>>({});
  const [typedWords, setTypedWords] = useState<Record<number, string>>({});

  const handleRevealCell = (colIdx: number, rowIdx: number) => {
    const key = `${colIdx}-${rowIdx}`;
    if (!revealedCells[key]) {
      setRevealedCells(prev => ({ ...prev, [key]: true }));
    }
  };

  const handleWordTyping = (index: number, value: string) => {
    setTypedWords(prev => ({ ...prev, [index]: value }));
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8 bg-white min-h-screen text-slate-800 font-sans">
      
      {/* Header section */}
      <div className="flex items-center gap-4 bg-green-100 w-fit px-6 py-3 rounded-xl shadow-sm border border-green-200">
        <div className="bg-white p-2 rounded-lg shadow-sm border border-green-300">
          <span className="text-3xl">✍️</span>
        </div>
        <h2 className="text-2xl font-bold text-green-900" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          लिखो
        </h2>
      </div>

      {/* (अ) Section - Matra Grid */}
      <div className="space-y-6">
        <p className="text-lg font-bold flex gap-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          <span>(अ)</span>
          <span>सुंदर अक्षरों में लिखिए।</span>
        </p>

        <div className="text-sm text-blue-600 font-bold bg-blue-50 p-3 rounded-lg border border-blue-200 inline-block mb-2 shadow-sm animate-pulse">
          💡 खाली डिब्बों पर क्लिक करके सही उत्तर देखें!
        </div>

        <div className="overflow-x-auto rounded-xl border-2 border-[#b59e54] shadow-md bg-white">
          <table className="w-full text-center border-collapse min-w-[600px]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            <thead>
              <tr className="bg-[#f9f8f3] border-b-2 border-[#b59e54]">
                <th className="p-3 border-r-2 border-[#b59e54] w-16"></th>
                {CONSONANTS.map((col, i) => (
                  <th key={i} className="p-3 border-r border-[#b59e54] font-bold text-2xl text-gray-800 w-16">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRAS.map((row, rIdx) => (
                <tr key={rIdx} className="bg-white border-b border-[#b59e54] last:border-0">
                  <td className="p-2 border-r-2 border-[#b59e54] text-3xl font-bold text-red-700 bg-[#f9f8f3]">
                    {row.symbol}
                  </td>
                  {CONSONANTS.map((col, cIdx) => {
                    const isRevealed = revealedCells[`${cIdx}-${rIdx}`];
                    // Correctly combining consonant and matra
                    const answer = col + row.symbol;
                    
                    return (
                      <td 
                        key={cIdx} 
                        className="p-1 border-r last:border-0 border-[#b59e54] h-16"
                      >
                        <button
                          onClick={() => handleRevealCell(cIdx, rIdx)}
                          className={`w-full h-full rounded transition-all flex items-center justify-center text-3xl font-medium ${
                            isRevealed 
                              ? 'bg-blue-50 text-blue-900 border border-blue-200 shadow-inner' 
                              : 'bg-white hover:bg-yellow-50 text-transparent cursor-pointer'
                          }`}
                        >
                          {isRevealed ? answer : "?"}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* (आ) Section - Read and Write Words */}
      <div className="space-y-6 pt-8">
        <p className="text-lg font-bold flex gap-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          <span>(आ)</span>
          <span>शब्द पढ़िए और लिखिए।</span>
        </p>

        <div className="w-full bg-white border border-pink-200 rounded-2xl shadow-sm overflow-hidden p-6">
          <div className="grid grid-cols-5 gap-4 mb-6">
            {WORDS.map((word, i) => (
              <div key={i} className="text-center text-3xl font-medium text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                {word}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {/* Create multiple dotted lines for writing practice */}
            {[0, 1, 2, 3, 4, 5].map((lineIdx) => (
              <div key={lineIdx} className="grid grid-cols-5 gap-4">
                {WORDS.map((word, wordIdx) => {
                  const inputId = lineIdx * WORDS.length + wordIdx;
                  const val = typedWords[inputId] || "";
                  const isMatch = val === word;
                  
                  return (
                    <div key={wordIdx} className="relative group">
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleWordTyping(inputId, e.target.value)}
                        placeholder="लिखें..."
                        className={`w-full text-center text-2xl py-2 bg-transparent outline-none border-b-2 border-dotted transition-colors ${
                          val.length > 0 
                            ? isMatch 
                              ? "border-green-400 text-green-700" 
                              : "border-amber-400 text-amber-700"
                            : "border-pink-400 text-slate-700 focus:border-blue-500 placeholder:text-pink-200"
                        }`}
                        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      />
                      {/* Four line writing practice effect */}
                      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10 flex flex-col justify-between py-[10px]">
                        <div className="border-t border-pink-500 w-full h-[1px]"></div>
                        <div className="border-t border-dotted border-blue-500 w-full h-[1px]"></div>
                        <div className="border-t border-pink-500 w-full h-[1px]"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer from the image */}
      <div className="w-full flex items-center justify-between pt-12 pb-4 text-sm text-slate-500 font-medium border-t border-slate-200 mt-auto">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-green-100 px-4 py-1 rounded text-green-800 border border-green-200 shadow-sm">22</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>बाज़ार</span>
      </div>
    </div>
  );
}
