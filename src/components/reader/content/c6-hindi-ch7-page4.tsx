"use client";

import { useState } from "react";

export function C6HindiCh7Page4() {
  const [activeMatraRow, setActiveMatraRow] = useState<number | null>(null);

  // Matra Grid Data
  const consonants = ["व", "ट", "ढ", "ल", "ठ", "ग", "र", "द", "स", "न", "प"];
  const matraRows = [
    { vowel: "ं", results: ["वं", "टं", "ढं", "लं", "ठं", "गं", "रं", "दं", "सं", "नं", "पं"] },
    { vowel: "ः", results: ["वः", "टः", "ढः", "लः", "ठः", "गः", "रः", "दः", "सः", "नः", "पः"] }
  ];

  // Matching Game State
  const matchPairs = [
    { id: "tree", icon: "🌳", word: "वट" },
    { id: "eight", icon: "8️⃣", word: "आठ" },
    { id: "grapes", icon: "🍇", word: "अंगूर" },
    { id: "drum", icon: "🥁", word: "ढोल" },
  ];

  const leftItems = matchPairs.map(p => ({ id: p.id, content: p.icon }));
  // Shuffled right items for the game
  const rightItems = [
    { id: "grapes", content: "अंगूर" },
    { id: "tree", content: "वट" },
    { id: "drum", content: "ढोल" },
    { id: "eight", content: "आठ" },
  ];

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>(["tree"]); // "tree" matched by default as in book

  const handleLeftClick = (id: string) => {
    if (matched.includes(id)) return;
    setSelectedLeft(id);
    checkMatch(id, selectedRight);
  };

  const handleRightClick = (id: string) => {
    if (matched.includes(id)) return;
    setSelectedRight(id);
    checkMatch(selectedLeft, id);
  };

  const checkMatch = (left: string | null, right: string | null) => {
    if (left && right) {
      if (left === right) {
        setMatched(prev => [...prev, left]);
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        // Reset after a short delay if wrong
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 500);
      }
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12">
      
      <div className="p-8 pb-4">
        
        {/* Notebook / Varnamala Chart */}
        <div className="w-full max-w-3xl mx-auto mb-12 relative bg-white border border-slate-300 shadow-md rounded-r-xl overflow-hidden min-h-[450px]">
          {/* Spiral binding emulation */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-slate-100 border-r border-slate-300 flex flex-col justify-evenly items-center z-10">
            {Array.from({length: 16}).map((_, i) => (
              <div key={i} className="w-5 h-5 bg-slate-800 rounded-full shadow-inner relative">
                <div className="absolute -left-3 top-1.5 w-8 h-2.5 bg-slate-600 rounded-full -rotate-12 opacity-50"></div>
              </div>
            ))}
          </div>
          
          {/* Notebook lines and content */}
          <div className="pl-16 pt-8 pr-8 pb-8 h-full flex flex-col justify-center relative"
                style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, #93c5fd 39px, #93c5fd 40px)',
                  backgroundPosition: '0 8px'
                }}>
            
            <div className="text-slate-800 text-[1.4rem] leading-[40px] tracking-[0.5em] text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
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

        {/* (इ) Matra Grid */}
        <div className="mt-12">
          <p className="font-bold text-slate-800 text-xl mb-6 flex items-center flex-wrap gap-2">
            (इ) नीचे दिए गए बक्से के वर्णों में <span className="text-pink-600 font-extrabold text-2xl mx-1">ं</span> और <span className="text-pink-600 font-extrabold text-2xl mx-1">ः</span> मात्रा के अंतर को समझते हुए पढ़िए।
          </p>

          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-[#9ca3af]">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr>
                  <th className="border border-[#9ca3af] py-4 px-2 bg-[#f3f4f6] text-sm text-slate-600">अक्षर</th>
                  <th className="border border-[#9ca3af] py-4 px-2 bg-[#f3f4f6] text-sm text-slate-600">मात्रा</th>
                  {consonants.map((c, i) => (
                    <th key={i} className="border border-[#9ca3af] bg-[#f3f4f6] py-4 px-4 text-xl text-slate-800 font-bold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matraRows.map((row, rowIdx) => (
                  <tr key={rowIdx} 
                      className={`transition-colors duration-300 ${activeMatraRow === rowIdx ? 'bg-amber-50' : 'bg-white'}`}
                      onMouseEnter={() => setActiveMatraRow(rowIdx)}
                      onMouseLeave={() => setActiveMatraRow(null)}
                  >
                    <td className="border border-[#9ca3af] py-4 text-2xl font-bold text-slate-800 bg-[#f8fafc]">
                      {rowIdx === 0 ? 'अं' : 'अः'}
                    </td>
                    <td className="border border-[#9ca3af] py-4 text-4xl font-extrabold text-pink-600 bg-[#f8fafc]">
                      {row.vowel}
                    </td>
                    {row.results.map((res, i) => (
                      <td key={i} className="border border-[#9ca3af] py-4 text-2xl font-medium cursor-pointer hover:bg-blue-50 hover:text-blue-700 hover:scale-110 transition-all">
                        {res}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* (ई) Match the following */}
        <div className="mt-16">
          <p className="font-bold text-slate-800 text-xl mb-8">(ई) जोड़ी बनाइए।</p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 max-w-2xl mx-auto bg-slate-50 p-8 rounded-2xl border border-slate-200">
            
            {/* Left Column (Images) */}
            <div className="flex flex-col gap-6">
              {leftItems.map(item => {
                const isMatched = matched.includes(item.id);
                const isSelected = selectedLeft === item.id;
                
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleLeftClick(item.id)}
                    className={`text-6xl p-4 rounded-xl cursor-pointer transition-all duration-300 border-4 flex items-center justify-center
                      ${isMatched ? 'border-green-400 bg-green-50 opacity-50 cursor-default' : 
                        isSelected ? 'border-blue-500 bg-blue-100 scale-110 shadow-lg' : 
                        'border-transparent hover:border-slate-300 hover:bg-white hover:-translate-y-1'}`}
                  >
                    {item.content}
                    {isMatched && <span className="absolute text-green-500 text-3xl font-bold drop-shadow-md">✓</span>}
                  </div>
                );
              })}
            </div>

            {/* Middle Divider / Visual indicator */}
            <div className="hidden md:flex flex-col items-center justify-center">
              <div className="w-1 h-64 bg-slate-200 rounded-full relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 px-2 py-1 rounded-full text-xs text-slate-400 font-bold border border-slate-200">
                  MATCH
                </div>
              </div>
            </div>

            {/* Right Column (Words) */}
            <div className="flex flex-col gap-6">
              {rightItems.map(item => {
                const isMatched = matched.includes(item.id);
                const isSelected = selectedRight === item.id;
                
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleRightClick(item.id)}
                    className={`text-3xl font-bold p-4 rounded-xl cursor-pointer transition-all duration-300 border-4 w-40 text-center
                      ${isMatched ? 'border-green-400 bg-green-50 text-green-700 opacity-50 cursor-default' : 
                        isSelected ? 'border-blue-500 bg-blue-100 text-blue-800 scale-110 shadow-lg' : 
                        'border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:-translate-y-1'}`}
                  >
                    {item.content}
                    {isMatched && <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-green-500 text-2xl font-bold drop-shadow-md">✓</span>}
                  </div>
                );
              })}
            </div>

          </div>
          
          <div className="mt-8 text-center text-sm text-slate-500">
            {matched.length === 4 ? (
              <span className="text-green-600 font-bold text-xl animate-pulse">🎉 बहुत बढ़िया! आपने सभी जोड़ियों को मिला लिया! 🎉</span>
            ) : (
              <span>चित्र को सही शब्द से मिलाने के लिए उन पर क्लिक करें। (Click to match)</span>
            )}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-auto border-t border-slate-200">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">37</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मैदान</span>
      </div>
    </div>
  );
}
