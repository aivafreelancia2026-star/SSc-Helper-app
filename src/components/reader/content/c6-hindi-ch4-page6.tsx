"use client";

import { useState } from "react";
import Image from "next/image";

export function C6HindiCh4Page6() {
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [fruitName, setFruitName] = useState("");
  
  // State for the self-assessment table
  const [assessment, setAssessment] = useState<Record<number, "yes" | "no" | null>>({
    1: null,
    2: null,
    3: null,
    4: null
  });

  const handleAssessment = (id: number, value: "yes" | "no") => {
    setAssessment(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4 md:p-8 space-y-12 bg-white min-h-screen text-slate-800 font-sans pb-20">
      
      {/* Section (इ) - Join letters and write */}
      <div className="space-y-8">
        <p className="text-lg font-bold flex gap-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          <span>(इ)</span>
          <span>अक्षरों को मिलाकर पढ़िए और लिखिए।</span>
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 bg-pink-50/50 p-8 rounded-2xl border border-pink-100 shadow-sm relative">
          
          {/* A cute student reading character (placeholder emoji) */}
          <div className="text-8xl drop-shadow-md hidden md:block">
            👧🏽📖
          </div>

          {/* The diagram */}
          <div className="relative flex items-center justify-center w-full max-w-md h-48">
            {/* Center Node */}
            <div className="absolute left-0 z-10 w-20 h-20 bg-pink-200 border-2 border-slate-700 rounded-full flex items-center justify-center text-4xl font-bold shadow-md" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              ऋ
            </div>
            
            {/* Top Branch */}
            <div className="absolute left-16 top-10 w-32 border-t-4 border-slate-700 transform rotate-[-25deg] origin-left">
              <div className="absolute right-[-10px] top-[-8px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-slate-700"></div>
            </div>
            
            <div className="absolute right-20 top-0 z-10 w-16 h-16 bg-pink-200 border-2 border-slate-700 rounded-full flex items-center justify-center text-3xl font-bold shadow-md" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              षि
            </div>

            {/* Bottom Branch */}
            <div className="absolute left-16 bottom-10 w-32 border-t-4 border-slate-700 transform rotate-[25deg] origin-left">
              <div className="absolute right-[-10px] top-[-8px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-slate-700"></div>
            </div>

            <div className="absolute right-20 bottom-0 z-10 w-16 h-16 bg-pink-200 border-2 border-slate-700 rounded-full flex items-center justify-center text-3xl font-bold shadow-md" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              षभ
            </div>
          </div>

          {/* Inputs for answers */}
          <div className="flex flex-col gap-12 justify-center w-full max-w-[200px]">
            <input
              type="text"
              value={word1}
              onChange={(e) => setWord1(e.target.value)}
              className={`w-full text-center text-3xl py-2 bg-transparent outline-none border-b-2 border-dotted transition-colors ${
                word1 === "ऋषि" ? "border-green-400 text-green-700" : "border-pink-400 text-slate-700"
              }`}
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            />
            <input
              type="text"
              value={word2}
              onChange={(e) => setWord2(e.target.value)}
              className={`w-full text-center text-3xl py-2 bg-transparent outline-none border-b-2 border-dotted transition-colors ${
                word2 === "ऋषभ" ? "border-green-400 text-green-700" : "border-pink-400 text-slate-700"
              }`}
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            />
          </div>
        </div>
      </div>

      {/* Section (ई) - Color and write name */}
      <div className="space-y-6">
        <p className="text-lg font-bold flex gap-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          <span>(ई)</span>
          <span>चित्र में रंग भरिए और नाम लिखिए।</span>
        </p>

        <div className="w-full max-w-2xl mx-auto border-2 border-[#b59e54] p-4 flex flex-col items-center gap-6 bg-white shadow-sm rounded-xl">
          {/* Fruit basket placeholder - we use emojis inside an SVG for a scalable "coloring" vibe, 
              since implementing a full canvas flood-fill here is too complex for a single component */}
          <div className="relative w-full aspect-video max-h-[300px] border border-gray-200 bg-gray-50 flex items-center justify-center rounded overflow-hidden">
            <span className="text-[150px] drop-shadow-md grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer" title="रंग भरने के लिए क्लिक करें!">
              🧺
            </span>
            <span className="absolute text-[80px] drop-shadow-md grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer top-10 left-1/3" title="रंग भरें">
              🍎
            </span>
            <span className="absolute text-[80px] drop-shadow-md grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer top-8 right-1/3" title="रंग भरें">
              🍌
            </span>
            <span className="absolute text-[60px] drop-shadow-md grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer top-14 left-1/4" title="रंग भरें">
              🍇
            </span>
            
            <div className="absolute top-2 left-2 text-xs font-bold text-gray-400">
              रंग भरने के लिए फलों पर होवर करें!
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xl w-full max-w-sm" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            <span className="font-bold">नाम:</span>
            <input
              type="text"
              value={fruitName}
              onChange={(e) => setFruitName(e.target.value)}
              className="flex-1 border-b-2 border-dotted border-gray-400 outline-none text-center text-blue-700 px-2 py-1 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Self Assessment Table */}
      <div className="space-y-4 pt-8">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 shrink-0 bg-yellow-100 rounded-xl border border-yellow-300 flex items-center justify-center text-4xl shadow-sm">
            👦🏻
          </div>
          
          <div className="w-full overflow-x-auto border-2 border-[#b59e54] rounded-lg shadow-sm">
            <table className="w-full text-left border-collapse" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              <thead>
                <tr>
                  <th className="p-3 border-b-2 border-r-2 border-[#b59e54] text-pink-600 font-bold text-lg">क्या मैं ये कर सकता/सकती हूँ?</th>
                  <th className="p-3 border-b-2 border-r-2 border-[#b59e54] text-pink-600 font-bold text-center w-24">हाँ ( ✓ )</th>
                  <th className="p-3 border-b-2 border-[#b59e54] text-pink-600 font-bold text-center w-24">नहीं ( ✗ )</th>
                </tr>
              </thead>
              <tbody className="text-base text-gray-800 font-medium">
                {[
                  "1. मैं बालगीत अभिनय के साथ गा सकता/सकती हूँ।",
                  "2. मैं 'ज, फ, ब, भ, ष, ऋ' वर्ण पढ़ और लिख सकता/सकती हूँ।",
                  "3. मैं इन वर्णों से बने शब्द व वाक्य बिना देखे लिख सकता/सकती हूँ।",
                  "4. मैं संकेत के आधार पर चित्र बनाकर उसके बारे में बता सकता/सकती हूँ।"
                ].map((text, idx) => {
                  const id = idx + 1;
                  return (
                    <tr key={id} className="hover:bg-yellow-50/50 transition-colors">
                      <td className="p-3 border-b border-r-2 border-[#b59e54]">{text}</td>
                      <td className="p-3 border-b border-r-2 border-[#b59e54] text-center cursor-pointer hover:bg-green-100 transition-colors" onClick={() => handleAssessment(id, "yes")}>
                        {assessment[id] === "yes" && <span className="text-green-600 text-2xl font-bold">✓</span>}
                      </td>
                      <td className="p-3 border-b border-[#b59e54] text-center cursor-pointer hover:bg-red-100 transition-colors" onClick={() => handleAssessment(id, "no")}>
                        {assessment[id] === "no" && <span className="text-red-600 text-2xl font-bold">✗</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer from the image */}
      <div className="w-full flex items-center justify-between pt-12 pb-4 text-sm text-slate-500 font-medium border-t border-slate-200 mt-auto">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-green-100 px-4 py-1 rounded text-green-800 border border-green-200 shadow-sm">23</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>बाज़ार</span>
      </div>
    </div>
  );
}
