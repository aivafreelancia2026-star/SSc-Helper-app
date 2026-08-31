"use client";

import { useState } from "react";

export function C6HindiCh7Page6() {
  // Letter Grid Data
  const letterGrid = [
    ["ढ", "ठ", "द", "व"],
    ["स", "ग", "म", "न"],
    ["अं", "ब", "र", "दा"],
    ["ढो", "ल", "दा", "मै"]
  ];

  // Self Assessment State
  const assessmentQuestions = [
    "मैं चित्र के बारे में बातचीत कर सकता/सकती हूँ।",
    "मैं ‘द, ठ, ढ, व, अं, अः’ वर्ण पढ़ और लिख सकता/सकती हूँ।",
    "मैं इन वर्णों से बने शब्द व वाक्य बिना देखे लिख सकता/सकती हूँ।",
    "मैं संकेत के आधार पर चित्र बनाकर उसके बारे में बता सकता/सकती हूँ।"
  ];
  const [assessment, setAssessment] = useState<Record<number, boolean | null>>({});

  const handleAssessment = (idx: number, value: boolean) => {
    setAssessment(prev => ({ ...prev, [idx]: value }));
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-8 pb-4">
        
        {/* (इ) Word Creation Activity */}
        <div className="mb-12">
          <p className="font-bold text-slate-800 text-xl mb-6 leading-relaxed">
            (इ) तालिका में से वर्ण चुनकर शब्द बनाइए। उन शब्दों को नीचे दी गई तालिका के सही डिब्बों में लिखिए।
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-10">
            {/* 4x4 Grid */}
            <div className="border border-[#b5a371] p-2 bg-[#faf9f5] shadow-sm">
              <table className="border-collapse bg-white">
                <tbody>
                  {letterGrid.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((letter, cIdx) => (
                        <td key={cIdx} className="border-2 border-[#b5a371] w-16 h-16 text-center text-3xl font-medium text-slate-800 hover:bg-amber-100 transition-colors cursor-pointer">
                          {letter}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cloud Image Representation */}
            <div className="text-[10rem] text-blue-200 drop-shadow-md animate-pulse">
              ☁️
            </div>
          </div>

          {/* Categorization Table */}
          <div className="overflow-x-auto w-full max-w-4xl mx-auto shadow-sm">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr>
                  {["द", "ठ", "ढ", "व", "म", "अं"].map((h, i) => (
                    <th key={i} className="border-2 border-[#b5a371] bg-white py-3 px-4 text-3xl text-slate-800 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-2 border-[#b5a371] bg-[#faf9f5] p-0 h-16 relative">
                    <input type="text" className="w-full h-full text-center text-2xl font-medium bg-transparent outline-none focus:bg-blue-50" defaultValue="दस" />
                  </td>
                  <td className="border-2 border-[#b5a371] bg-[#faf9f5] p-0 h-16 relative">
                    <input type="text" className="w-full h-full text-center text-2xl font-medium bg-transparent outline-none focus:bg-blue-50" />
                  </td>
                  <td className="border-2 border-[#b5a371] bg-[#faf9f5] p-0 h-16 relative">
                    <input type="text" className="w-full h-full text-center text-2xl font-medium bg-transparent outline-none focus:bg-blue-50" />
                  </td>
                  <td className="border-2 border-[#b5a371] bg-[#faf9f5] p-0 h-16 relative">
                    <input type="text" className="w-full h-full text-center text-2xl font-medium bg-transparent outline-none focus:bg-blue-50" />
                  </td>
                  <td className="border-2 border-[#b5a371] bg-[#faf9f5] p-0 h-16 relative">
                    <input type="text" className="w-full h-full text-center text-2xl font-medium bg-transparent outline-none focus:bg-blue-50" />
                  </td>
                  <td className="border-2 border-[#b5a371] bg-[#faf9f5] p-0 h-16 relative">
                    <input type="text" className="w-full h-full text-center text-2xl font-medium bg-transparent outline-none focus:bg-blue-50" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* (ई) Draw Activity */}
        <div className="mb-12">
          <p className="font-bold text-slate-800 text-xl mb-6 leading-relaxed">
            (ई) तुम्हें कौन-सा खेल पसंद है? उस खेल की सामग्री के चित्र बनाइए।
          </p>

          <div className="w-full max-w-4xl mx-auto shadow-sm rounded-lg overflow-hidden border-2 border-[#b5a371]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 border-r-2 border-[#b5a371] bg-[#faf9f5] py-4 text-xl text-slate-700 font-medium w-1/2">
                    तुम्हारे द्वारा खेले जाने वाला खेल
                  </th>
                  <th className="border-b-2 border-[#b5a371] bg-[#faf9f5] py-4 text-xl text-slate-700 font-medium w-1/2">
                    खेल की सामग्री के चित्र
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-r-2 border-[#b5a371] p-8 align-top h-64 bg-white relative">
                    <input 
                      type="text" 
                      className="w-full border-b-2 border-slate-400 border-dotted text-center text-2xl py-2 outline-none focus:border-blue-500 bg-transparent text-blue-800 mt-16"
                    />
                  </td>
                  <td className="p-8 align-center justify-center text-center h-64 bg-slate-50 border-4 border-white border-dashed relative">
                    {/* Placeholder for drawing */}
                    <div className="flex flex-col items-center justify-center h-full opacity-50">
                      <span className="text-6xl mb-4">🖍️</span>
                      <span className="text-lg font-bold text-slate-400 uppercase tracking-widest">चित्र बनाएँ</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Self Assessment Section */}
      <div className="p-8 pt-0">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar Placeholder */}
          <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-2xl border-2 border-amber-400 shadow-sm flex items-center justify-center shrink-0">
            <span className="text-5xl">👦</span>
          </div>
          
          <div className="w-full overflow-x-auto shadow-md rounded-xl border border-slate-200">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-2 border-[#a5af33] bg-[#f8f9e9] py-3 px-4 text-left text-xl text-[#6b7316]">
                    क्या मैं ये कर सकता/सकती हूँ?
                  </th>
                  <th className="border-2 border-[#a5af33] bg-[#f8f9e9] py-3 w-24 text-center text-xl text-pink-600 font-bold">
                    हाँ (✓)
                  </th>
                  <th className="border-2 border-[#a5af33] bg-[#f8f9e9] py-3 w-24 text-center text-xl text-pink-600 font-bold">
                    नहीं (✗)
                  </th>
                </tr>
              </thead>
              <tbody>
                {assessmentQuestions.map((q, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="border-2 border-[#a5af33] py-4 px-4 text-lg font-medium text-slate-800">
                      <span className="font-bold mr-2">{idx + 1}.</span> {q}
                    </td>
                    <td className="border-2 border-[#a5af33] py-4 text-center cursor-pointer hover:bg-green-50"
                        onClick={() => handleAssessment(idx, true)}>
                      {assessment[idx] === true ? (
                        <span className="text-3xl text-green-600 font-bold">✓</span>
                      ) : (
                        <div className="w-6 h-6 mx-auto rounded-full border-2 border-slate-300"></div>
                      )}
                    </td>
                    <td className="border-2 border-[#a5af33] py-4 text-center cursor-pointer hover:bg-red-50"
                        onClick={() => handleAssessment(idx, false)}>
                      {assessment[idx] === false ? (
                        <span className="text-3xl text-red-600 font-bold">✗</span>
                      ) : (
                        <div className="w-6 h-6 mx-auto rounded-full border-2 border-slate-300"></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-auto border-t border-slate-200">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">39</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मैदान</span>
      </div>
    </div>
  );
}
