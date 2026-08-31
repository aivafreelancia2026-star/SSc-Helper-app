"use client";

import { useState } from "react";

export function C6HindiCh6Page5() {
  // Matra Grid Data
  const vowels = [
    { v: "आ", m: "ा" }, { v: "इ", m: "ि" }, { v: "ई", m: "ी" },
    { v: "उ", m: "ु" }, { v: "ऊ", m: "ू" }, { v: "ऋ", m: "ृ" },
    { v: "ए", m: "े" }, { v: "ऐ", m: "ै" }, { v: "ओ", m: "ो" }, { v: "औ", m: "ौ" }
  ];
  const consonants = ["क", "ग", "च", "झ", "त", "य", "द", "ध", "श", "ष", "स"];
  
  // Create state for the grid
  const initialGrid: Record<string, string> = { "0-0": "का", "1-0": "कि", "2-0": "की", "3-0": "कु", "4-0": "कू", "5-0": "कृ", "6-0": "के", "7-0": "कै", "8-0": "को", "9-0": "कौ" };
  const [gridState, setGridState] = useState<Record<string, string>>(initialGrid);

  const handleGridChange = (row: number, col: number, value: string) => {
    setGridState(prev => ({ ...prev, [`${row}-${col}`]: value }));
  };

  // Self Assessment State
  const assessmentQuestions = [
    "मैं चित्र के नाम बता सकता/सकती हूँ।",
    "मैं ‘झ, श, ह, ण, य, ओ, औ’ वर्ण पढ़ और लिख सकता/सकती हूँ।",
    "मैं इन वर्णों से बने शब्द व वाक्य बिना देखे लिख सकता/सकती हूँ।",
    "मैं संकेत के आधार पर चित्र बनाकर उसके बारे में बता सकता/सकती हूँ।"
  ];
  const [assessment, setAssessment] = useState<Record<number, boolean | null>>({});

  const handleAssessment = (idx: number, value: boolean) => {
    setAssessment(prev => ({ ...prev, [idx]: value }));
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12">
      
      <div className="p-8 pb-4">
        
        {/* (आ) मात्रा जोड़िए और लिखिए */}
        <div className="mb-12">
          <p className="font-bold text-slate-800 text-xl mb-6">(आ) मात्रा जोड़िए और लिखिए।</p>
          
          <div className="overflow-x-auto bg-amber-50/30 p-2 rounded-xl border border-amber-200 shadow-sm">
            <table className="w-full border-collapse text-center table-fixed min-w-[800px]">
              <thead>
                <tr>
                  <th className="border-2 border-[#a89d70] bg-[#faf9f5] py-3 text-lg font-bold text-slate-700 w-16">अक्षर</th>
                  <th className="border-2 border-[#a89d70] bg-[#faf9f5] py-3 text-lg font-bold text-slate-700 w-16">मात्रा</th>
                  {consonants.map((c, i) => (
                    <th key={i} className="border-2 border-[#a89d70] bg-white py-3 text-xl font-bold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vowels.map((vowel, rowIdx) => (
                  <tr key={rowIdx}>
                    <td className="border-2 border-[#a89d70] bg-white py-3 text-2xl font-medium">
                      {vowel.v}
                    </td>
                    <td className="border-2 border-[#a89d70] bg-white py-3 text-3xl font-bold text-pink-600">
                      {vowel.m}
                    </td>
                    {consonants.map((_, colIdx) => (
                      <td key={colIdx} className="border-2 border-[#a89d70] p-0 bg-white">
                        <input 
                          type="text"
                          value={gridState[`${rowIdx}-${colIdx}`] || ""}
                          onChange={(e) => handleGridChange(rowIdx, colIdx, e.target.value)}
                          className="w-full h-full py-4 text-center text-2xl outline-none focus:bg-blue-50 focus:ring-inset focus:ring-2 focus:ring-blue-400 bg-transparent text-blue-800 transition-colors"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* (इ) पढ़िए और लिखिए */}
        <div className="mb-12">
          <p className="font-bold text-slate-800 text-xl mb-6">(इ) पढ़िए और लिखिए।</p>
          
          <div className="bg-[#fcfcfb] border border-[#d8d5c4] rounded-lg p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-12 justify-around">
              <div className="flex flex-col gap-6 w-full max-w-sm">
                <span className="text-2xl text-slate-800 text-center font-medium">चौराहे पर पुलिस है।</span>
                <input 
                  type="text" 
                  className="w-full border-b-2 border-slate-400 border-dotted text-center text-2xl py-2 outline-none focus:border-blue-500 bg-transparent text-blue-800"
                />
              </div>
              
              <div className="flex flex-col gap-6 w-full max-w-sm">
                <span className="text-2xl text-slate-800 text-center font-medium">औरत खाना बना रही है।</span>
                <input 
                  type="text" 
                  className="w-full border-b-2 border-slate-400 border-dotted text-center text-2xl py-2 outline-none focus:border-blue-500 bg-transparent text-blue-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* (ई) पशु-पक्षियों के नाम */}
        <div className="mb-12">
          <p className="font-bold text-slate-800 text-xl mb-6">(ई) आप अपने मनपसंद पशु-पक्षियों के नाम लिखिए।</p>
          <div className="flex flex-wrap gap-8 justify-center mt-8">
            <input type="text" className="w-48 border-b-2 border-pink-400 border-dotted text-center text-2xl py-2 outline-none focus:border-blue-500 bg-transparent text-blue-800" placeholder="१. ___________" />
            <input type="text" className="w-48 border-b-2 border-pink-400 border-dotted text-center text-2xl py-2 outline-none focus:border-blue-500 bg-transparent text-blue-800" placeholder="२. ___________" />
            <input type="text" className="w-48 border-b-2 border-pink-400 border-dotted text-center text-2xl py-2 outline-none focus:border-blue-500 bg-transparent text-blue-800" placeholder="३. ___________" />
            <input type="text" className="w-48 border-b-2 border-pink-400 border-dotted text-center text-2xl py-2 outline-none focus:border-blue-500 bg-transparent text-blue-800" placeholder="४. ___________" />
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
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">32</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>चिड़ियाघर</span>
      </div>
    </div>
  );
}
