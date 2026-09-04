"use client";

import { useState } from "react";

export function C6HindiCh11Page3() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // For section (इ) - multiple choice (correct index)
  const [selectedWords, setSelectedWords] = useState<Record<number, number>>({});
  const multipleChoiceData = [
    { options: ["उधान", "उधायन", "उद्यान", "उदयान"], correct: 2 },
    { options: ["गडढा", "गढा", "गडडा", "गड्‌ढा"], correct: 3 },
    { options: ["द्वार", "द्वर", "दवार", "द्वरा"], correct: 0 },
    { options: ["सुंदर", "सुनदर", "सुन्द्र", "सुनदंर"], correct: 0 }
  ];

  // For section (ई) - cycle through circle (1) and box (2)
  const [wordShapes, setWordShapes] = useState<Record<number, number>>({});
  const lastSectionWords = ["द्वार", "पत्तियाँ", "लट्टू", "राष्ट्र", "प्यार", "गुब्बारा", "गड्‌ढा", "बच्चा"];

  const handleAnswerInput = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleWordSelect = (lineIdx: number, wordIdx: number) => {
    setSelectedWords(prev => ({ ...prev, [lineIdx]: wordIdx }));
  };

  const handleShapeCycle = (wordIdx: number) => {
    setWordShapes(prev => {
      const current = prev[wordIdx] || 0;
      return { ...prev, [wordIdx]: (current + 1) % 3 }; // 0: None, 1: Circle, 2: Box
    });
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Content Area */}
        <div className="w-full bg-[#f8f9fa] rounded-2xl shadow-xl border-4 border-white mt-4 p-6 md:p-10 flex flex-col gap-10">
          
          {/* Top Section: QR Code */}
          <div className="flex justify-end mb-[-40px]">
             <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow border border-slate-200">
               <div className="w-16 h-16 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=C2F7K8')] bg-cover bg-center rounded-sm"></div>
               <div className="font-mono text-xs font-bold text-slate-600 mt-1 tracking-widest">C2F7K8</div>
             </div>
          </div>

          {/* Section 1: सुनो-बोलो */}
          <section className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-3 bg-[#e4eed4] px-6 py-2 rounded-full shadow-sm w-max border-2 border-white">
              <span className="text-2xl">🗣️</span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                सुनो-बोलो
              </h2>
            </div>
            
            <div className="flex flex-col gap-6 ml-0 md:ml-12 relative">
              {/* Decorative tree */}
              <div className="absolute right-0 top-0 text-6xl hidden md:block opacity-80">🌳</div>
              
              <div className="flex flex-col gap-3">
                <p className="text-lg md:text-xl text-slate-800 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  1. पेड़-पौधों से हमें क्या-क्या मिलते हैं?
                </p>
                <textarea
                  value={answers["q1"] || ""}
                  onChange={(e) => handleAnswerInput("q1", e.target.value)}
                  className="w-full md:w-3/4 border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-2 focus:outline-none focus:border-slate-500 transition-colors text-slate-700 resize-none"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  rows={2}
                ></textarea>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-lg md:text-xl text-slate-800 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  2. आप अपने मनपसंद पेड़ के बारे में बताइए।
                </p>
                <textarea
                  value={answers["q2"] || ""}
                  onChange={(e) => handleAnswerInput("q2", e.target.value)}
                  className="w-full md:w-3/4 border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-2 focus:outline-none focus:border-slate-500 transition-colors text-slate-700 resize-none"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  rows={2}
                ></textarea>
              </div>
            </div>
          </section>

          {/* Section 2: पढ़ो */}
          <section className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-3 bg-[#e4eed4] px-6 py-2 rounded-full shadow-sm w-max border-2 border-white">
              <span className="text-2xl">📖</span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                पढ़ो
              </h2>
            </div>
            
            {/* (अ) */}
            <div className="flex flex-col gap-6 ml-0 md:ml-4">
              <div className="flex gap-3 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-700">(अ)</span>
                <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  पढ़िए और समझिए।
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-10 ml-0 md:ml-12">
                <div className="border-4 border-[#8ca948] p-6 rounded-xl bg-white shadow-sm w-full md:w-auto">
                  <table className="w-full text-xl md:text-2xl text-slate-800 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    <tbody>
                      <tr className="border-b border-slate-100 last:border-0">
                        <td className="py-3 px-4 w-24">क्रम</td>
                        <td className="py-3 px-4">क् + र + म</td>
                      </tr>
                      <tr className="border-b border-slate-100 last:border-0">
                        <td className="py-3 px-4">गर्म</td>
                        <td className="py-3 px-4">ग + र् + म</td>
                      </tr>
                      <tr className="border-b border-slate-100 last:border-0">
                        <td className="py-3 px-4">ट्रक</td>
                        <td className="py-3 px-4">ट् + र + क</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center gap-6 text-6xl">
                  🚚 <span className="text-pink-500 font-black text-8xl" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>र</span>
                </div>
              </div>
            </div>

            {/* (आ) */}
            <div className="flex flex-col gap-6 ml-0 md:ml-4 mt-4">
              <div className="flex gap-3 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-700">(आ)</span>
                <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  शब्दों का उच्चारण कीजिए।
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8 ml-0 md:ml-12">
                <div className="border-4 border-[#8ca948] p-6 rounded-xl bg-white shadow-sm w-full md:w-auto">
                  <table className="w-full text-center text-lg md:text-xl text-slate-800 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4">प्रकार</td>
                        <td className="py-3 px-4">क्रम</td>
                        <td className="py-3 px-4">ग्राम</td>
                        <td className="py-3 px-4">विनम्र</td>
                        <td className="py-3 px-4">चक्र</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">गर्म</td>
                        <td className="py-3 px-4">कुर्सी</td>
                        <td className="py-3 px-4">मिर्च</td>
                        <td className="py-3 px-4">सूर्य</td>
                        <td className="py-3 px-4">पर्वत</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">राष्ट्र</td>
                        <td className="py-3 px-4">ट्रक</td>
                        <td className="py-3 px-4">ड्रामा</td>
                        <td className="py-3 px-4">ट्रेन</td>
                        <td className="py-3 px-4">इंद्रधनुष</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 text-5xl opacity-90">
                  🌈 🇮🇳 ☀️ 🏔️
                </div>
              </div>
            </div>

            {/* (इ) */}
            <div className="flex flex-col gap-6 ml-0 md:ml-4 mt-4">
              <div className="flex gap-3 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-700">(इ)</span>
                <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  नीचे दिए गए शब्द पढ़िए और सही शब्द के नीचे रेखा खींचिए।
                </p>
              </div>
              
              <div className="flex flex-col gap-4 ml-0 md:ml-12 bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full md:w-3/4">
                {multipleChoiceData.map((item, lineIdx) => (
                  <div key={`mcq-${lineIdx}`} className="flex items-center gap-6">
                    <span className="text-lg font-bold text-slate-500 w-6">{lineIdx + 1}.</span>
                    <div className="flex flex-wrap gap-4 md:gap-8 w-full">
                      {item.options.map((option, optIdx) => {
                        const isSelected = selectedWords[lineIdx] === optIdx;
                        const isCorrect = item.correct === optIdx;
                        // Determine styling based on selection
                        let style = "border-b-2 border-transparent hover:border-slate-300 cursor-pointer transition-colors px-2 py-1";
                        if (isSelected) {
                          style = isCorrect 
                            ? "border-b-2 border-green-500 text-green-700 font-bold px-2 py-1 bg-green-50 rounded-t" 
                            : "border-b-2 border-red-500 text-red-600 font-bold px-2 py-1 bg-red-50 rounded-t line-through";
                        }
                        
                        return (
                          <span 
                            key={`opt-${lineIdx}-${optIdx}`}
                            onClick={() => handleWordSelect(lineIdx, optIdx)}
                            className={`text-lg md:text-xl ${style}`}
                            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                          >
                            {option}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* (ई) */}
            <div className="flex flex-col gap-6 ml-0 md:ml-4 mt-4">
              <div className="flex gap-3 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-700">(ई)</span>
                <p className="text-lg md:text-xl text-slate-800 leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  नीचे दिए गए शब्द पढ़िए। संयुक्ताक्षर वाले शब्दों पर <span className="inline-block w-8 h-8 rounded-full border-2 border-blue-500 align-middle"></span> लगाइए। द्वित्वाक्षर वाले शब्दों पर <span className="inline-block w-8 h-8 border-2 border-pink-500 align-middle"></span> लगाइए। <br/>
                  <span className="text-sm text-slate-500 mt-2 block">(शब्द पर क्लिक करके आकार बदलें)</span>
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 ml-0 md:ml-12 mt-4">
                {lastSectionWords.map((word, idx) => {
                  const shape = wordShapes[idx] || 0;
                  
                  let shapeClass = "border-2 border-transparent p-4 transition-all duration-300 cursor-pointer select-none text-xl md:text-2xl";
                  if (shape === 1) {
                    shapeClass = "border-2 border-blue-500 rounded-full p-4 scale-110 transition-all duration-300 cursor-pointer select-none text-xl md:text-2xl shadow-sm text-blue-800 bg-blue-50";
                  } else if (shape === 2) {
                    shapeClass = "border-2 border-pink-500 p-4 scale-110 transition-all duration-300 cursor-pointer select-none text-xl md:text-2xl shadow-sm text-pink-800 bg-pink-50";
                  }

                  return (
                    <div 
                      key={`shape-word-${idx}`} 
                      className={shapeClass}
                      onClick={() => handleShapeCycle(idx)}
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      {word}
                    </div>
                  );
                })}
              </div>
            </div>

          </section>
          
        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">58</div>
        <span>उद्यान</span>
      </div>

    </div>
  );
}
