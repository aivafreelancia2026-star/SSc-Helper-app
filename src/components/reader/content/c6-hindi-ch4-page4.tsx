"use client";

import { useState } from "react";
import Image from "next/image";

// Helper for the varnamala notebook grid
const VARNAMALA_ROWS = [
  ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ"],
  ["ए", "ऐ", "ओ", "औ", "अं", "अः", ""],
  ["क", "ख", "ग", "घ", "ङ", "", ""],
  ["च", "छ", "ज", "झ", "ञ", "", ""],
  ["ट", "ठ", "ड", "ढ", "ण", "(ड़", "ढ़)"],
  ["त", "थ", "द", "ध", "न", "", ""],
  ["प", "फ", "ब", "भ", "म", "", ""],
  ["य", "र", "ल", "व", "", "", ""],
  ["श", "ष", "स", "ह", "", "", ""],
  ["क्ष", "त्र", "ज्ञ", "(श्र)", "", "", ""],
];

const TARGET_LETTERS = ["ब", "फ", "ज", "ष", "भ", "ऋ"];
const WORDS = ["बस", "फल", "जल", "कृषक", "ऋषि", "फूल", "उषा", "ऋषभ", "बाज़ार", "ज़मीन", "कमीज़", "जग", "भूमि", "भालू"];

// Helper for the matra table
const MATRA_CONSONANTS = ["क", "घ", "च", "ज", "न", "फ", "ब", "भ", "म", "स"];
const MATRA_RESULTS = ["कृ", "घृ", "चृ", "जृ", "नृ", "फृ", "बृ", "भृ", "मृ", "सृ"];

export function C6HindiCh4Page4() {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [activeMatraIndex, setActiveMatraIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center w-full max-w-[800px] mx-auto bg-white min-h-screen relative p-8 font-sans">
      
      {/* 1. Varnamala Notebook Chart */}
      <div className="w-full flex justify-center mb-12 mt-4 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 hidden md:block text-8xl">
           👨‍🎓📝
        </div>
        
        <div className="relative bg-slate-50 w-full max-w-md border border-slate-300 rounded-r-xl shadow-lg flex pl-12 pr-6 py-8">
          {/* Notebook spiral binding effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-slate-200 border-r border-slate-300 flex flex-col justify-evenly items-center z-10">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-6 h-3 bg-slate-400 rounded-full shadow-inner border border-slate-500 -ml-4" style={{ transform: "rotate(-10deg)" }}></div>
            ))}
          </div>
          
          {/* Notebook lines and content */}
          <div className="w-full relative z-0 flex flex-col gap-2">
            {VARNAMALA_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-between items-end border-b-2 border-blue-200 pb-1 h-10">
                {row.map((char, charIndex) => (
                  <span 
                    key={charIndex} 
                    className="w-10 text-center text-2xl font-medium text-slate-800 hover:text-blue-600 hover:scale-125 transition-transform cursor-pointer select-none"
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. (ई) इन्हें पढ़िए */}
      <div className="w-full mb-12">
        <p className="text-lg font-medium text-slate-800 mb-4">(ई) इन्हें पढ़िए।</p>
        
        <div className="border border-yellow-600 bg-yellow-50 p-4 mb-6 rounded flex justify-around text-3xl font-bold text-slate-800 shadow-sm">
          {TARGET_LETTERS.map(letter => (
            <span key={letter} className="hover:text-blue-600 transition-colors cursor-pointer">{letter}</span>
          ))}
        </div>

        <div className="border border-yellow-600 bg-white p-6 rounded shadow-sm">
          <div className="grid grid-cols-4 md:grid-cols-7 gap-y-6 gap-x-2 text-center text-xl text-slate-800 font-medium">
            {WORDS.map(word => (
              <div 
                key={word}
                onMouseEnter={() => setActiveWord(word)}
                onMouseLeave={() => setActiveWord(null)}
                className={`cursor-pointer transition-all p-1 rounded
                  ${activeWord === word ? "bg-blue-100 ring-2 ring-blue-300" : "hover:bg-slate-100"}
                `}
              >
                {/* Highlight the target letters within the word if it's active */}
                {word.split("").map((char, i) => {
                  // A very simple heuristic for highlighting: if the character is one of our target letters
                  const isTarget = TARGET_LETTERS.includes(char);
                  return (
                    <span 
                      key={i} 
                      className={activeWord === word && isTarget ? "text-blue-600 font-bold" : ""}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. (उ) ऋ - 'ृ' की मात्रा जोड़ते हुए पढ़िए */}
      <div className="w-full mb-8">
        <p className="text-lg font-medium text-slate-800 mb-4">(उ) ऋ - &apos;ृ&apos; की मात्रा जोड़ते हुए पढ़िए।</p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-2 border-yellow-600 bg-white text-center shadow-sm">
            <thead>
              <tr>
                <th className="border border-yellow-600 p-3 text-lg font-normal text-slate-700">अक्षर</th>
                <th className="border border-yellow-600 p-3 text-lg font-normal text-slate-700">मात्रा</th>
                {MATRA_CONSONANTS.map(c => (
                  <th key={c} className="border border-yellow-600 p-3 text-2xl font-medium text-slate-800">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-yellow-600 p-3 text-2xl font-medium text-slate-800 bg-slate-50">ऋ</td>
                <td className="border border-yellow-600 p-3 text-3xl font-medium text-red-500 bg-slate-50">ृ</td>
                {MATRA_RESULTS.map((res, i) => (
                  <td 
                    key={res} 
                    className={`border border-yellow-600 p-3 text-2xl font-bold cursor-pointer transition-colors select-none
                      ${activeMatraIndex === i ? "bg-blue-100 text-blue-700" : "text-slate-800 hover:bg-slate-50"}
                    `}
                    onClick={() => setActiveMatraIndex(activeMatraIndex === i ? null : i)}
                  >
                    {activeMatraIndex === i ? (
                      <span className="flex flex-col items-center text-sm leading-tight text-blue-800">
                        <span>{MATRA_CONSONANTS[i]}</span>
                        <span>+</span>
                        <span className="text-red-500 font-bold text-lg">ृ</span>
                      </span>
                    ) : (
                      res
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer from the image */}
      <div className="w-full flex items-center justify-between pt-4 pb-2 text-sm text-slate-700 border-t-2 border-slate-200 mt-auto">
        <span>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-green-100 px-3 py-1 rounded">21</span>
        <span>बाज़ार</span>
      </div>
    </div>
  );
}
