"use client";

import { useState } from "react";

export function C6HindiCh12Page5() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({});

  const handleAnswerInput = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const toggleCheckbox = (id: string, value: boolean) => {
    setCheckboxes(prev => {
      // If we are clicking 'yes', turn off 'no' for the same question, and vice versa
      const isYes = id.endsWith('-yes');
      const baseId = isYes ? id.replace('-yes', '') : id.replace('-no', '');
      const otherId = isYes ? `${baseId}-no` : `${baseId}-yes`;
      
      return {
        ...prev,
        [id]: value,
        ...(value ? { [otherId]: false } : {})
      };
    });
  };

  const evaluationQuestions = [
    "मैं पाठ के बारे में बातचीत कर सकता/सकती हूँ।",
    "मैं पाठ अपने शब्दों में बता और लिख सकता/सकती हूँ।",
    "मैं अपने निजी अनुभव साथियों को सुना सकता/सकती हूँ।",
    "मैं इससे संबंधित प्रश्नों के उत्तर अपने शब्दों में लिख सकता हूँ।"
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Content Area */}
        <div className="w-full bg-[#f8f9fa] rounded-2xl shadow-xl border-4 border-white mt-4 p-6 md:p-10 flex flex-col gap-10">

          {/* Section (आ) */}
          <section className="flex flex-col gap-6">
            <div className="flex gap-3 items-start">
              <span className="text-lg md:text-xl font-bold text-slate-700">(आ)</span>
              <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                नीचे दिए संकेतों के आधार पर वाक्य बनाइए।
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between ml-0 md:ml-4 border-2 border-slate-700 bg-white rounded-xl overflow-hidden p-6">
              
              {/* Left Side: Mind Map / Word Diagram */}
              <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[300px]">
                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-slate-700 bg-white flex items-center justify-center z-10 shadow-sm">
                  <span className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>क्रिकेट</span>
                </div>

                {/* Surrounding Circles */}
                <div className="absolute top-[10%] left-[30%] transform -translate-x-1/2 w-20 h-20 rounded-full border-2 border-slate-700 bg-[#fce4ec] flex items-center justify-center text-lg shadow-sm font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मैच</div>
                
                <div className="absolute top-[25%] left-[75%] transform -translate-x-1/2 w-20 h-20 rounded-full border-2 border-slate-700 bg-[#fce4ec] flex items-center justify-center text-lg shadow-sm font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>टीम</div>
                
                <div className="absolute top-[75%] left-[80%] transform -translate-x-1/2 w-20 h-20 rounded-full border-2 border-slate-700 bg-[#fce4ec] flex items-center justify-center text-lg shadow-sm font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>कप्तान</div>
                
                <div className="absolute bottom-[5%] left-[50%] transform -translate-x-1/2 w-20 h-20 rounded-full border-2 border-slate-700 bg-[#fce4ec] flex items-center justify-center text-lg shadow-sm font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>खिलाड़ी</div>
                
                <div className="absolute top-[75%] left-[20%] transform -translate-x-1/2 w-20 h-20 rounded-full border-2 border-slate-700 bg-[#e4eed4] flex items-center justify-center text-lg shadow-sm font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>पुरस्कार</div>
                
                <div className="absolute top-[35%] left-[15%] transform -translate-x-1/2 w-20 h-20 rounded-full border-2 border-slate-700 bg-[#fce4ec] flex items-center justify-center text-lg shadow-sm font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>नियम</div>
                
                {/* Arrows pointing to center (approximate positions using simple CSS lines with arrows) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
                    </marker>
                  </defs>
                  <line x1="30%" y1="20%" x2="45%" y2="40%" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="70%" y1="35%" x2="58%" y2="45%" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="75%" y1="70%" x2="58%" y2="55%" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="50%" y1="85%" x2="50%" y2="62%" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="25%" y1="70%" x2="42%" y2="58%" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="20%" y1="45%" x2="40%" y2="50%" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow)" />
                </svg>
              </div>

              {/* Right Side: Input Lines */}
              <div className="w-full md:w-1/2 flex flex-col gap-6 pl-0 md:pl-6 border-t-2 md:border-t-0 md:border-l-2 border-slate-700 pt-6 md:pt-0 min-h-[300px]">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <input 
                    key={`aa-${i}`}
                    type="text" 
                    value={answers[`aa${i}`] || ""} 
                    onChange={(e) => handleAnswerInput(`aa${i}`, e.target.value)} 
                    className="w-full bg-transparent border-b-2 border-slate-400 border-dotted p-1 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" 
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} 
                  />
                ))}
              </div>

            </div>
          </section>

          {/* Section (इ) */}
          <section className="flex flex-col gap-6 mt-4">
            <div className="flex gap-3 items-start">
              <span className="text-lg md:text-xl font-bold text-slate-700">(इ)</span>
              <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                गेंद और बल्ला आपस में क्या बातचीत कर रहे हैं? सोचकर लिखिए।
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between ml-0 md:ml-12 mt-4">
              
              {/* Dialogue Inputs */}
              <div className="flex flex-col gap-6 w-full md:w-2/3">
                <div className="flex gap-4 items-center">
                  <span className="text-lg md:text-xl font-bold text-slate-700 w-16 shrink-0" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>गेंद :</span>
                  <span className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>बल्ला भैया, कैसे हो?</span>
                </div>
                
                <div className="flex gap-4 items-center">
                  <span className="text-lg md:text-xl font-bold text-slate-700 w-16 shrink-0" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>बल्ला :</span>
                  <span className="text-lg md:text-xl text-slate-800 shrink-0" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मैं ठीक हूँ। तुम कैसी हो?</span>
                  <input type="text" value={answers["d1"] || ""} onChange={(e) => handleAnswerInput("d1", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-300 border-dotted p-1 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800 ml-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} />
                </div>
                
                <div className="flex gap-4 items-center">
                  <span className="text-lg md:text-xl font-bold text-slate-700 w-16 shrink-0" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>गेंद :</span>
                  <input type="text" value={answers["d2"] || ""} onChange={(e) => handleAnswerInput("d2", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-400 border-dotted p-1 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} />
                </div>
                
                <div className="flex gap-4 items-center">
                  <span className="text-lg md:text-xl font-bold text-slate-700 w-16 shrink-0" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>बल्ला :</span>
                  <input type="text" value={answers["d3"] || ""} onChange={(e) => handleAnswerInput("d3", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-400 border-dotted p-1 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} />
                </div>
              </div>

              {/* Decorative Emojis for Bat and Ball */}
              <div className="w-full md:w-1/3 flex justify-center text-7xl md:text-8xl gap-4 drop-shadow-md pb-4 border-b-4 border-green-400/50">
                🏏 ⚾️
              </div>

            </div>
          </section>

          {/* Section (ई) */}
          <section className="flex flex-col gap-6 mt-4">
            <div className="flex gap-3 items-start">
              <span className="text-lg md:text-xl font-bold text-slate-700">(ई)</span>
              <p className="text-lg md:text-xl text-slate-800 leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                अपने दोस्त के बारे में लिखिए। उसके कौन-से गुण तुम्हें अच्छे लगते हैं?
              </p>
            </div>

            <div className="flex flex-col gap-6 ml-0 md:ml-12 w-full max-w-3xl">
              <input type="text" value={answers["f1"] || ""} onChange={(e) => handleAnswerInput("f1", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-400 border-dotted p-2 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} />
              <input type="text" value={answers["f2"] || ""} onChange={(e) => handleAnswerInput("f2", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-400 border-dotted p-2 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} />
            </div>
          </section>

          {/* Evaluation Table: क्या मैं ये कर सकता/सकती हूँ? */}
          <section className="flex flex-col gap-6 mt-8">
            <div className="flex items-center gap-6">
              <div className="text-6xl hidden sm:block">👦</div>
              <div className="w-full border-2 border-[#a3b18a] bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#e4eed4] border-b-2 border-[#a3b18a]">
                      <th className="p-4 text-xl font-bold text-[#6a8042]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                        क्या मैं ये कर सकता/सकती हूँ?
                      </th>
                      <th className="p-4 text-center text-xl font-bold text-pink-600 border-l-2 border-[#a3b18a] w-24">हाँ (✓)</th>
                      <th className="p-4 text-center text-xl font-bold text-pink-600 border-l-2 border-[#a3b18a] w-24">नहीं (×)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluationQuestions.map((q, idx) => (
                      <tr key={`eval-${idx}`} className="border-b border-[#a3b18a]/30 hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <div className="flex gap-3">
                            <span className="font-bold text-slate-700">{idx + 1}.</span>
                            <span className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{q}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center border-l-2 border-[#a3b18a]/30">
                          <label className="inline-flex items-center justify-center w-8 h-8 cursor-pointer relative group">
                            <input 
                              type="checkbox" 
                              className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                              checked={checkboxes[`q${idx}-yes`] || false}
                              onChange={(e) => toggleCheckbox(`q${idx}-yes`, e.target.checked)}
                            />
                            <div className={`w-8 h-8 rounded border-2 flex items-center justify-center transition-all ${checkboxes[`q${idx}-yes`] ? 'bg-green-500 border-green-600' : 'bg-slate-100 border-slate-300 group-hover:bg-green-100'}`}>
                              {checkboxes[`q${idx}-yes`] && <span className="text-white text-xl">✓</span>}
                            </div>
                          </label>
                        </td>
                        <td className="p-4 text-center border-l-2 border-[#a3b18a]/30">
                          <label className="inline-flex items-center justify-center w-8 h-8 cursor-pointer relative group">
                            <input 
                              type="checkbox" 
                              className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                              checked={checkboxes[`q${idx}-no`] || false}
                              onChange={(e) => toggleCheckbox(`q${idx}-no`, e.target.checked)}
                            />
                            <div className={`w-8 h-8 rounded border-2 flex items-center justify-center transition-all ${checkboxes[`q${idx}-no`] ? 'bg-red-500 border-red-600' : 'bg-slate-100 border-slate-300 group-hover:bg-red-100'}`}>
                              {checkboxes[`q${idx}-no`] && <span className="text-white text-xl">×</span>}
                            </div>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">64</div>
        <span>बच्चे चले क्रिकेट खेलने</span>
      </div>

    </div>
  );
}
