"use client";

import { useState } from "react";

export function C6HindiCh7Page3() {
  const [activeCircle, setActiveCircle] = useState<string | null>(null);

  // Table Data: Matra splitting (matching the textbook image exactly)
  const matraTable = [
    {
      word: "वट",
      parts: ["व", "ट"],
      letters: ["व", "ट"],
      icon: "🌳"
    },
    {
      word: "ढोल",
      parts: ["ढो", "ल"],
      letters: ["ढ", "ो", "ल"],
      icon: "🥁"
    },
    {
      word: "आठ",
      parts: ["आ", "ठ"],
      letters: ["आ", "ठ"],
      icon: "8️⃣"
    },
    {
      word: "अंगूर",
      parts: ["अं", "गू", "र"],
      letters: ["अं", "ग", "ू", "र"],
      icon: "🍇"
    },
    {
      word: "दाल",
      parts: ["दा", "ल"],
      letters: ["द", "ा", "ल"],
      icon: "🍲"
    }
  ];

  // Circle Quiz State
  const [selectedWords, setSelectedWords] = useState<Record<number, string>>({});
  
  const circleQuestions = [
    { id: 1, icon: "🌳", sentence: ["यह", "वट", "का", "पेड़", "है।"], target: "वट" },
    { id: 2, icon: "🥁", sentence: ["यह", "ढोल", "है।"], target: "ढोल" },
    { id: 3, icon: "🍇", sentence: ["अंगूर", "खट्टे-मीठे", "होते", "हैं।"], target: "अंगूर" },
    { id: 4, icon: "8️⃣", sentence: ["यह", "आठ", "है।"], target: "आठ" },
  ];

  const handleWordClick = (qId: number, word: string) => {
    setSelectedWords(prev => ({ ...prev, [qId]: word }));
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12">
      
      {/* 1. सुनो-बोलो Section */}
      <div className="p-8 pb-4 relative">
        {/* QR Code Placeholder (Top Right) */}
        <div className="absolute right-8 top-8 bg-white p-2 border-2 border-slate-800 flex flex-col items-center shadow-md">
          <div className="w-16 h-16 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=B8F1P6')] bg-cover opacity-80 mix-blend-multiply"></div>
          <span className="text-xs font-bold mt-1 tracking-widest text-slate-800">B8F1P6</span>
        </div>

        <div className="flex items-center gap-4 bg-[#e8efd8] w-fit pr-8 rounded-full shadow-sm mb-6">
          <div className="bg-white rounded-full p-2 border-2 border-[#e8efd8]">
            <span className="text-3xl">🗣️</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>सुनो-बोलो</h2>
        </div>
        
        <div className="flex items-start gap-8 px-4">
          <div className="space-y-4 text-xl text-slate-700 w-full" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            <p className="flex items-start gap-4 hover:text-blue-600 transition-colors cursor-pointer">
              <span className="font-bold">1.</span>
              <span>मैदान में क्या-क्या हैं?</span>
            </p>
            <p className="flex items-start gap-4 hover:text-blue-600 transition-colors cursor-pointer">
              <span className="font-bold">2.</span>
              <span>तुम्हें कौन-सा खेल पसंद है?</span>
            </p>
          </div>
          <div className="shrink-0 animate-pulse cursor-pointer">
            <span className="text-7xl drop-shadow-md">🏏</span>
          </div>
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

        <div className="space-y-10 px-4 text-xl text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          
          {/* (अ) Circle Words Quiz */}
          <div className="pt-2">
            <p className="font-bold text-slate-800 mb-8 flex items-center gap-2">
              (अ) चित्र से जुड़े शब्द पर 
              <span className="inline-block w-8 h-8 rounded-full border-2 border-slate-800 shadow-sm mx-1"></span> 
              लगाइए।
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {circleQuestions.map(q => (
                <div key={q.id} className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="text-8xl mb-6 drop-shadow-md group-hover:scale-110 transition-transform">{q.icon}</span>
                  <div className="flex flex-wrap justify-center gap-2 mt-4 text-2xl font-medium">
                    {q.sentence.map((word, wIdx) => {
                      const cleanWord = word.replace('।', '').replace('हैं', 'हैं'); // normal cleanup
                      const isTarget = cleanWord === q.target;
                      const isSelected = selectedWords[q.id] === cleanWord;
                      const showSuccess = isSelected && isTarget;
                      const showError = isSelected && !isTarget;
                      
                      return (
                        <span key={wIdx} className="flex items-center">
                          <span 
                            onClick={() => handleWordClick(q.id, cleanWord)}
                            className={`cursor-pointer px-3 py-1 rounded-full border-2 transition-all duration-300
                              ${showSuccess ? 'border-green-500 bg-green-50 text-green-700 shadow-md scale-110' : ''}
                              ${showError ? 'border-red-400 bg-red-50 text-red-600 line-through' : ''}
                              ${!isSelected ? 'border-transparent hover:border-slate-300 hover:bg-white' : ''}
                            `}
                          >
                            {cleanWord}
                          </span>
                          {word.includes('।') && <span className="ml-1">।</span>}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* (आ) Matra Table */}
          <div className="pt-8 border-t border-slate-200">
            <p className="font-bold text-slate-800 mb-8">
              (आ) दिए गए चित्र देखिए। शब्द पढ़िए। वर्ण पढ़िए। इन वर्णों को वर्णमाला चार्ट में पहचानिए।
            </p>
            
            <div className="overflow-x-auto rounded-xl shadow-sm border border-[#9ca3af] bg-[#f3f4f6]">
              <table className="w-full border-collapse text-center">
                <tbody>
                  {/* Row 1: Words */}
                  <tr>
                    {matraTable.map((item, idx) => (
                      <td key={`word-${idx}`} className="border-2 border-[#9ca3af] py-4 px-2 text-3xl font-bold text-slate-800 bg-[#fafafa]">
                        {item.word}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Row 2: Syllables */}
                  <tr>
                    {matraTable.map((item, colIdx) => (
                      <td key={`syllable-${colIdx}`} className="border-2 border-[#9ca3af] p-0 align-top bg-white">
                        <div className="flex w-full h-full min-h-[60px]">
                          {item.parts.map((part, partIdx) => (
                            <div 
                              key={`p-${partIdx}`} 
                              className={`flex-1 py-3 text-2xl font-medium border-slate-300 hover:bg-blue-100 transition-colors cursor-pointer flex items-center justify-center
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
                      <td key={`letters-${colIdx}`} className="border-2 border-[#9ca3af] p-0 align-top bg-white">
                        <div className="flex w-full h-full min-h-[60px]">
                          {item.letters.map((letter, letterIdx) => {
                            const isMatra = ['े', 'ै', 'ा', 'ी', 'ू', 'ु', 'ि', 'ो', 'ौ'].includes(letter);
                            return (
                              <div 
                                key={`l-${letterIdx}`} 
                                className={`flex-1 py-3 text-xl font-medium border-slate-300 hover:bg-pink-100 transition-colors cursor-pointer flex items-center justify-center
                                  ${letterIdx < item.letters.length - 1 ? 'border-r' : ''}`}
                              >
                                {isMatra ? <span className="text-pink-600 text-3xl font-bold">{letter}</span> : letter}
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

            {/* Emojis at the bottom of the table matching the textbook images */}
            <div className="flex justify-around mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
              {matraTable.map((item, idx) => (
                <div key={`icon-${idx}`} className="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer group">
                  <span className="text-7xl drop-shadow-md mb-2">{item.icon}</span>
                  <span className="text-lg font-medium text-slate-400 group-hover:text-blue-600">{item.word}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-8 border-t border-slate-200">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">36</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मैदान</span>
      </div>
    </div>
  );
}
