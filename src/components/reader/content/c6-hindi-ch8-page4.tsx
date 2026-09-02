"use client";

import { useState } from "react";

export function C6HindiCh8Page4() {
  const readWords = ["कक्षा", "पक्षी", "यज्ञ", "छात्र", "पत्र", "विज्ञान", "ज्ञानी", "पुत्र", "शत्रु", "पक्ष", "मित्र", "साक्षी"];
  const writeWords = ["कक्षा", "पत्र", "ज्ञानी", "श्रमिक", "नक्षत्र", "यज्ञ"];

  const assessmentQuestions = [
    "मैं चित्र के बारे में बातचीत कर सकता/सकती हूँ।",
    "मैं ‘क्ष, त्र, ज्ञ, श्र’ वर्ण पढ़ और लिख सकता/सकती हूँ।",
    "मैं इन वर्णों से बने शब्द व वाक्य बिना देखे लिख सकता/सकती हूँ।",
    "मैं संकेत के आधार पर चित्र बनाकर उसके बारे में बता सकता/सकती हूँ।"
  ];
  const [assessment, setAssessment] = useState<Record<number, boolean | null>>({});

  const handleAssessment = (idx: number, value: boolean) => {
    setAssessment(prev => ({ ...prev, [idx]: value }));
  };

  // Flag coloring state
  const [flagColors, setFlagColors] = useState({ top: false, middle: false, bottom: false, chakra: false });

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-8 pb-4">
        
        {/* (ई) Read Words */}
        <div className="mb-12">
          <p className="font-bold text-slate-800 text-xl mb-4">(ई) नीचे दिए गए शब्द पढ़िए।</p>
          <div className="border border-[#b5a371] p-4 flex flex-wrap gap-x-8 gap-y-4 justify-center bg-[#faf9f5]">
            {readWords.map((w, i) => (
              <span key={i} className="text-2xl text-slate-800 font-medium hover:text-blue-600 cursor-pointer transition-colors" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* लिखो Section Header */}
        <div className="flex items-center gap-4 bg-[#e8efd8] w-fit pr-8 rounded-full shadow-sm mb-8 mt-12">
          <div className="bg-white rounded-full p-2 border-2 border-[#e8efd8]">
            <span className="text-3xl">✍️</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>लिखो</h2>
        </div>

        {/* (अ) Write Words */}
        <div className="mb-12">
          <p className="font-bold text-slate-800 text-xl mb-8">(अ) सुंदर अक्षरों में लिखिए।</p>
          
          <div className="grid grid-cols-6 gap-4 mb-4 text-center text-4xl font-medium text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            {writeWords.map((word, idx) => (
              <div key={idx}>{word}</div>
            ))}
          </div>

          <div className="space-y-12 px-4">
            {Array.from({length: 4}).map((_, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-6 gap-8">
                {writeWords.map((_, colIdx) => (
                  <input 
                    key={`${rowIdx}-${colIdx}`}
                    type="text" 
                    className="w-full border-b-2 border-pink-400 border-dotted text-center text-3xl pb-1 outline-none focus:border-blue-500 bg-transparent transition-colors text-blue-800"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* (आ) Question Answer */}
        <div className="mb-12">
          <p className="font-bold text-slate-800 text-xl mb-4">(आ) बाल दिवस कब मनाते हैं?</p>
          <div className="flex items-center gap-4 text-2xl font-medium text-slate-800">
            <span>उत्तर:</span>
            <input 
              type="text" 
              className="flex-1 border-b-2 border-pink-400 border-dotted pb-1 outline-none focus:border-blue-500 bg-transparent transition-colors text-blue-800"
            />
          </div>
        </div>

        {/* (इ) Fill in the blanks with pictures */}
        <div className="mb-12">
          <p className="font-bold text-slate-800 text-xl mb-8">(इ) चित्र देखकर वाक्य पूरा कीजिए।</p>
          
          <div className="flex flex-col md:flex-row gap-12 justify-around text-2xl text-slate-800 font-medium items-center">
            
            {/* Box 1 */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4">
                <span>1.</span>
                <span>छात्र</span>
                <span className="text-5xl drop-shadow-sm bg-blue-50 p-2 rounded-xl border border-blue-100">👩‍🏫</span>
                <span>में पढ़ते हैं।</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="opacity-0">1.</span>
                <span>छात्र</span>
                <input 
                  type="text" 
                  className="w-32 border-b-2 border-slate-400 border-dotted text-center pb-1 outline-none focus:border-blue-500 bg-transparent transition-colors text-blue-800"
                />
                <span>में पढ़ते हैं।</span>
              </div>
            </div>

            {/* Box 2 */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4">
                <span>2.</span>
                <span>ऋषि</span>
                <span className="text-5xl drop-shadow-sm bg-orange-50 p-2 rounded-xl border border-orange-100">🔥</span>
                <span>करता है।</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="opacity-0">2.</span>
                <span>ऋषि</span>
                <input 
                  type="text" 
                  className="w-32 border-b-2 border-slate-400 border-dotted text-center pb-1 outline-none focus:border-blue-500 bg-transparent transition-colors text-blue-800"
                />
                <span>करता है।</span>
              </div>
            </div>

          </div>
        </div>

        {/* (ई) Color Flag & Write */}
        <div className="mb-12">
          <p className="font-bold text-slate-800 text-xl mb-6">(ई) तिरंगे में केसरिया, सफेद और हरा रंग भरिए। इसके बारे में लिखिए।</p>
          
          <div className="border-2 border-[#b5a371] bg-white p-6 flex flex-col md:flex-row gap-8 items-center shadow-sm">
            
            {/* Interactive Flag SVG */}
            <div className="flex-1 max-w-sm cursor-pointer select-none relative" title="रंग भरने के लिए क्लिक करें!">
              <svg viewBox="0 0 300 200" className="w-full h-auto filter drop-shadow-md border border-slate-300">
                {/* Top Band - Saffron */}
                <rect 
                  x="0" y="0" width="300" height="66.6" 
                  fill={flagColors.top ? "#FF9933" : "#f1f5f9"} 
                  stroke="#cbd5e1" strokeWidth="1"
                  onClick={() => setFlagColors(prev => ({...prev, top: true}))}
                  className="transition-colors duration-500 hover:opacity-80"
                />
                {/* Middle Band - White */}
                <rect 
                  x="0" y="66.6" width="300" height="66.6" 
                  fill={flagColors.middle ? "#FFFFFF" : "#f8fafc"} 
                  stroke="#cbd5e1" strokeWidth="1"
                  onClick={() => setFlagColors(prev => ({...prev, middle: true}))}
                  className="transition-colors duration-500 hover:bg-white"
                />
                {/* Bottom Band - Green */}
                <rect 
                  x="0" y="133.2" width="300" height="66.8" 
                  fill={flagColors.bottom ? "#138808" : "#f1f5f9"} 
                  stroke="#cbd5e1" strokeWidth="1"
                  onClick={() => setFlagColors(prev => ({...prev, bottom: true}))}
                  className="transition-colors duration-500 hover:opacity-80"
                />
                
                {/* Ashoka Chakra */}
                <g 
                  transform="translate(150, 100)" 
                  onClick={() => setFlagColors(prev => ({...prev, chakra: true}))}
                  className={`transition-colors duration-500 cursor-pointer ${flagColors.chakra ? 'text-[#000080]' : 'text-slate-400'}`}
                >
                  <circle r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
                  {Array.from({length: 24}).map((_, i) => (
                    <line key={i} x1="0" y1="0" x2="0" y2="-25" stroke="currentColor" strokeWidth="1" transform={`rotate(${i * 15})`}/>
                  ))}
                </g>
              </svg>
              {!flagColors.top && <div className="absolute top-2 left-2 text-xs font-bold text-orange-500 pointer-events-none animate-pulse">क्लिक करें</div>}
            </div>

            {/* Dotted Lines to Write */}
            <div className="flex-1 w-full space-y-6 pt-4">
              <input type="text" className="w-full border-b-2 border-slate-400 border-dotted text-xl pb-1 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
              <input type="text" className="w-full border-b-2 border-slate-400 border-dotted text-xl pb-1 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
              <input type="text" className="w-full border-b-2 border-slate-400 border-dotted text-xl pb-1 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
            </div>

          </div>
        </div>

      </div>

      {/* Self Assessment Section */}
      <div className="p-8 pt-0">
        <div className="flex flex-col md:flex-row gap-6 items-start">
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
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">43</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>बाल दिवस</span>
      </div>
    </div>
  );
}
