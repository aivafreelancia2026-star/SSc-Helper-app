"use client";

import { useState } from "react";

export function C6HindiCh5Page4() {
  // Matra Grid State
  const matras = [
    { sign: "ा", name: "aa" },
    { sign: "ि", name: "i" },
    { sign: "ी", name: "ee" },
    { sign: "ु", name: "u" },
    { sign: "ू", name: "oo" },
    { sign: "ृ", name: "ri" },
    { sign: "े", name: "e" },
    { sign: "ै", name: "ai" }
  ];
  const consonants = ["क", "च", "त", "द", "म", "स"];
  const [gridState, setGridState] = useState<Record<string, string>>({
    "0-0": "का", "1-0": "कि", "2-0": "की", "3-0": "कु", "4-0": "कू", "5-0": "कृ", "6-0": "के", "7-0": "कै"
  });

  const handleGridChange = (row: number, col: number, value: string) => {
    setGridState(prev => ({ ...prev, [`${row}-${col}`]: value }));
  };

  // Radial Words State
  const radialPrefixes = ["खे", "जे", "रे", "वे", "ते", "मे"];
  const [radialWords, setRadialWords] = useState<string[]>(Array(6).fill(""));

  // Self Assessment State
  const assessmentQuestions = [
    "मैं बालगीत अभिनय के साथ गा सकता/सकती हूँ।",
    "मैं ‘ग, त, थ, ध, प, ए, ऐ’ वर्ण पढ़ और लिख सकता/सकती हूँ।",
    "मैं इन वर्णों से बने शब्द व वाक्य बिना देखे लिख सकता/सकती हूँ।",
    "मैं संकेत के आधार पर चित्र बनाकर उसके बारे में बता सकता/सकती हूँ।"
  ];
  const [assessment, setAssessment] = useState<Record<number, boolean | null>>({});

  const handleAssessment = (idx: number, value: boolean) => {
    setAssessment(prev => ({ ...prev, [idx]: value }));
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12">
      
      {/* लिखो Section */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-4 bg-[#e8efd8] w-fit pr-8 rounded-full shadow-sm mb-8">
          <div className="bg-white rounded-full p-2 border-2 border-[#e8efd8]">
            <span className="text-3xl">✍️</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>लिखो</h2>
        </div>
        
        {/* (अ) Trace Writing */}
        <div className="mb-12">
          <p className="font-bold text-slate-800 text-xl mb-6">(अ) सुंदर अक्षरों में लिखिए।</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {["एड़ी", "ऐनक", "थैली", "पेड़", "धागा", "तितली"].map((word, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4">
                <span className="text-3xl font-medium text-slate-800">{word}</span>
                <input 
                  type="text" 
                  className="w-full border-b-2 border-pink-400 border-dashed text-center text-2xl py-2 outline-none focus:border-blue-500 focus:border-solid bg-transparent transition-colors text-blue-800"
                  placeholder="लिखें"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* (आ) Matra Grid */}
          <div className="w-full md:w-1/2">
            <p className="font-bold text-slate-800 text-xl mb-6">(आ) मात्रा लगाकर लिखिए।</p>
            <div className="overflow-x-auto bg-amber-50/30 p-2 rounded-xl border border-amber-200 shadow-sm">
              <table className="w-full border-collapse text-center table-fixed">
                <thead>
                  <tr>
                    <th className="border-2 border-amber-500 bg-amber-100 py-3 w-16"></th>
                    {consonants.map((c, i) => (
                      <th key={i} className="border-2 border-amber-500 bg-amber-100 py-3 text-xl font-bold">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matras.map((matra, rowIdx) => (
                    <tr key={rowIdx}>
                      <td className="border-2 border-amber-500 py-3 text-3xl font-extrabold text-pink-600 bg-amber-50">
                        {matra.sign}
                      </td>
                      {consonants.map((_, colIdx) => (
                        <td key={colIdx} className="border-2 border-amber-500 p-0">
                          <input 
                            type="text"
                            value={gridState[`${rowIdx}-${colIdx}`] || ""}
                            onChange={(e) => handleGridChange(rowIdx, colIdx, e.target.value)}
                            className="w-full h-full py-3 text-center text-2xl outline-none focus:bg-blue-50 focus:ring-inset focus:ring-2 focus:ring-blue-400 bg-transparent text-blue-800 transition-colors"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* (इ) Radial Diagram */}
          <div className="w-full md:w-1/2">
            <p className="font-bold text-slate-800 text-xl mb-8 leading-relaxed">
              (इ) 'ए - <span className="text-pink-600 font-extrabold">े</span>' मात्रा वाले वर्णों को 'ल' के साथ जोड़कर पढ़िए और लिखिए।
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-12">
              
              {/* Diagram */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Center Circle */}
                <div className="w-16 h-16 bg-white border-2 border-slate-800 rounded-full flex items-center justify-center text-3xl font-bold shadow-md z-10">
                  ल
                </div>
                
                {/* Radial Nodes */}
                {radialPrefixes.map((prefix, i) => {
                  const angle = (i * 60) - 90; // Start from top (-90deg)
                  const radius = 90;
                  const x = radius * Math.cos(angle * Math.PI / 180);
                  const y = radius * Math.sin(angle * Math.PI / 180);
                  
                  return (
                    <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {/* Arrow Line */}
                      <div className="absolute w-[40px] h-[2px] bg-slate-400"
                           style={{ 
                             transform: `rotate(${angle}deg) translateX(${radius/2 + 5}px)`,
                             transformOrigin: 'center'
                           }}>
                         {/* Arrow head */}
                         <div className="absolute right-0 top-1/2 -translate-y-1/2 border-y-[4px] border-y-transparent border-l-[6px] border-l-slate-400"></div>
                      </div>
                      
                      {/* Node Circle */}
                      <div 
                        className="absolute w-14 h-14 bg-white border-2 border-[#a5af33] rounded-full flex items-center justify-center text-2xl font-bold text-slate-700 shadow-sm pointer-events-auto hover:bg-lime-50 transition-colors"
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                      >
                        {prefix}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inputs */}
              <div className="flex flex-col gap-4 w-full sm:w-48">
                {radialPrefixes.map((prefix, i) => (
                  <div key={i} className="flex items-center">
                    {i === 0 ? (
                      <div className="w-full border-b-2 border-pink-400 border-dashed text-center text-2xl py-2 text-slate-800">
                        {prefix}ल
                      </div>
                    ) : (
                      <input 
                        type="text"
                        value={radialWords[i]}
                        onChange={(e) => {
                          const newWords = [...radialWords];
                          newWords[i] = e.target.value;
                          setRadialWords(newWords);
                        }}
                        className="w-full border-b-2 border-pink-400 border-dashed text-center text-2xl py-2 outline-none focus:border-blue-500 focus:border-solid bg-transparent transition-colors text-blue-800"
                        placeholder="_____"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* (ई) पढ़ो - लिखो */}
        <div className="mt-12">
          <p className="font-bold text-slate-800 text-xl mb-6">(ई) पढ़ो - लिखो</p>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 space-y-4">
              <p className="text-2xl font-medium text-slate-800">1. पेड़ पर मैना थी।</p>
              <input type="text" className="w-full border-b-2 border-slate-400 border-dashed text-2xl py-2 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <p className="text-2xl font-medium text-slate-800">2. ऋषभ कृषक का साथी।</p>
              <input type="text" className="w-full border-b-2 border-slate-400 border-dashed text-2xl py-2 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Self Assessment Section */}
      <div className="p-8 pt-4">
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
      <div className="w-full flex items-center justify-between px-8 pt-4 pb-8 text-sm text-slate-500 font-medium mt-8 border-t border-slate-200">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">27</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मेरा परिवार</span>
      </div>
    </div>
  );
}
