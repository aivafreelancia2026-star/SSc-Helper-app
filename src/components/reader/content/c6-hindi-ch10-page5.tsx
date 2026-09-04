"use client";

import { useState } from "react";
import Image from "next/image";

export function C6HindiCh10Page5() {
  const [wordInputs, setWordInputs] = useState<Record<string, string>>({});
  const [thoughts, setThoughts] = useState<string>("");
  const [assessment, setAssessment] = useState<Record<number, boolean | null>>({
    1: null, 2: null, 3: null, 4: null
  });

  const wordBuilderData = [
    { center: "क्का", prefixes: ["म", "प", "ध"] },
    { center: "च्चा", prefixes: ["क", "स", "ब"] },
    { center: "त्ता", prefixes: ["छ", "प", "भ"] }
  ];

  const assessmentQuestions = [
    "मैं चित्र के बारे में बातचीत कर सकता/सकती हूँ।",
    "मैं द्वित्वाक्षर वाले शब्द पढ़ और लिख सकता/सकती हूँ।",
    "मैं इन वर्णों से बने शब्द व वाक्य बिना देखे लिख सकता/सकती हूँ।",
    "मैं संकेत के आधार पर चित्र बनाकर उसके बारे में बता सकता/सकती हूँ।"
  ];

  const handleWordInput = (groupIndex: number, lineIndex: number, value: string) => {
    setWordInputs(prev => ({ ...prev, [`${groupIndex}-${lineIndex}`]: value }));
  };

  const handleAssessment = (questionNum: number, value: boolean) => {
    setAssessment(prev => ({ ...prev, [questionNum]: value }));
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Content Area */}
        <div className="w-full bg-[#f8f9fa] rounded-2xl shadow-xl border-4 border-white mt-4 p-6 md:p-10 flex flex-col gap-10">
          
          {/* Section 1: (इ) वर्ड बिल्डर */}
          <section className="flex flex-col gap-6">
            <div className="flex gap-3 items-start">
              <span className="text-lg md:text-xl font-bold text-slate-700">(इ)</span>
              <p className="text-lg md:text-xl text-slate-800 font-bold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                नीचे दिए गए वर्ण मिलाकर शब्द बनाइए और लिखिए।
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              {wordBuilderData.map((group, groupIdx) => (
                <div key={`builder-${groupIdx}`} className="flex flex-col items-center w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 last:border-0 pb-6 md:pb-0 px-4">
                  
                  {/* Visual Diagram */}
                  <div className="relative w-48 h-48 mb-6">
                    {/* Center Circle */}
                    <div className="absolute inset-0 m-auto w-16 h-16 bg-[#6a7516] rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md z-10" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      {group.center}
                    </div>
                    
                    {/* Prefix Circles & Lines */}
                    {group.prefixes.map((prefix, pIdx) => {
                      // Positions: Top (0), Bottom-Left (1), Bottom-Right (2)
                      const positions = [
                        { wrapper: "top-0 left-1/2 -translate-x-1/2", line: "top-10 left-1/2 w-0.5 h-10 bg-[#6a7516] -translate-x-1/2", arrow: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 border-r-2 border-b-2 border-[#6a7516] rotate-45" },
                        { wrapper: "bottom-4 left-0", line: "bottom-14 left-10 w-12 h-0.5 bg-[#6a7516] rotate-[30deg]", arrow: "top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-3 h-3 border-t-2 border-r-2 border-[#6a7516] rotate-[30deg]" },
                        { wrapper: "bottom-4 right-0", line: "bottom-14 right-10 w-12 h-0.5 bg-[#6a7516] -rotate-[30deg]", arrow: "top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-3 h-3 border-l-2 border-t-2 border-[#6a7516] -rotate-[30deg]" }
                      ];
                      
                      return (
                        <div key={`prefix-${groupIdx}-${pIdx}`} className={`absolute ${positions[pIdx].wrapper} flex flex-col items-center justify-center`}>
                          <div className="w-12 h-12 bg-white rounded-full border-2 border-[#6a7516] flex items-center justify-center text-[#6a7516] text-xl font-bold shadow-sm z-20" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                            {prefix}
                          </div>
                          {/* We omit complex CSS arrows here for clean digital aesthetic, the layout implies the connection, but we can add simple CSS lines if desired. Using minimal connecting lines: */}
                          <div className={`absolute ${positions[pIdx].line} -z-10 hidden`}></div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Input Fields */}
                  <div className="flex flex-col gap-3 w-full max-w-[200px]">
                    {[0, 1, 2].map((lineIdx) => (
                      <input
                        key={`input-${groupIdx}-${lineIdx}`}
                        type="text"
                        value={wordInputs[`${groupIdx}-${lineIdx}`] || ""}
                        onChange={(e) => handleWordInput(groupIdx, lineIdx, e.target.value)}
                        className="w-full border-b-2 border-pink-400 border-dashed bg-transparent text-center text-xl p-1 focus:outline-none focus:border-pink-600 focus:border-solid transition-colors text-slate-800"
                        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: (ई) चित्र देखकर अपने विचार लिखिए */}
          <section className="flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <span className="text-lg md:text-xl font-bold text-slate-700">(ई)</span>
              <p className="text-lg md:text-xl text-slate-800 font-bold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                चित्र देखकर अपने विचार लिखिए।
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 ml-0 md:ml-12 border-2 border-slate-300 rounded-xl overflow-hidden bg-white">
              {/* Image Extraction */}
              <div className="w-full md:w-1/2 relative h-[300px] border-b md:border-b-0 md:border-r border-slate-300 bg-[#eef6ff]">
                <div className="absolute inset-0 overflow-hidden flex justify-center items-center">
                   {/* We use a large emoji illustration here to ensure perfect cross-device scaling rather than a fragile crop, matching the clean digital style. */}
                   <div className="text-[140px] drop-shadow-xl animate-pulse">
                     🌅👦
                   </div>
                </div>
              </div>

              {/* Text Area for Thoughts */}
              <div className="w-full md:w-1/2 p-6 flex flex-col">
                <textarea
                  value={thoughts}
                  onChange={(e) => setThoughts(e.target.value)}
                  className="w-full h-full min-h-[250px] border-0 bg-transparent text-lg md:text-xl p-2 focus:outline-none text-slate-700 resize-none leading-[2.5rem]"
                  style={{ 
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 38px, #cbd5e1 39px, #cbd5e1 40px)",
                    backgroundAttachment: "local",
                  }}
                  placeholder="अपने विचार यहाँ लिखें..."
                ></textarea>
              </div>
            </div>
          </section>

          {/* Section 3: Self Assessment */}
          <section className="flex flex-col gap-4 mt-4">
            <div className="flex gap-3 items-center mb-2">
               <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center text-3xl shadow-sm">
                 🙋‍♂️
               </div>
               <h3 className="text-xl md:text-2xl font-bold text-[#86922a]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                 क्या मैं ये कर सकता/सकती हूँ?
               </h3>
            </div>
            
            <div className="overflow-x-auto rounded-xl border-2 border-[#86922a] bg-white">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#fcfdf7]">
                    <th className="p-4 text-lg font-bold text-[#86922a] border-b-2 border-r-2 border-[#86922a] w-3/4" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      विवरण
                    </th>
                    <th className="p-4 text-center text-lg font-bold text-pink-500 border-b-2 border-r-2 border-[#86922a] w-1/8" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      हाँ (✓)
                    </th>
                    <th className="p-4 text-center text-lg font-bold text-pink-500 border-b-2 border-[#86922a] w-1/8" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      नहीं (✗)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentQuestions.map((question, idx) => (
                    <tr key={`assess-${idx}`} className="border-b border-[#86922a] last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-lg text-slate-800 border-r-2 border-[#86922a]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                        <span className="font-bold mr-2">{idx + 1}.</span> {question}
                      </td>
                      <td 
                        className={`p-4 text-center border-r-2 border-[#86922a] cursor-pointer text-2xl transition-colors ${assessment[idx + 1] === true ? 'bg-green-100' : 'hover:bg-slate-100'}`}
                        onClick={() => handleAssessment(idx + 1, true)}
                      >
                        {assessment[idx + 1] === true ? '✓' : ''}
                      </td>
                      <td 
                        className={`p-4 text-center cursor-pointer text-2xl transition-colors ${assessment[idx + 1] === false ? 'bg-red-100 text-red-500' : 'hover:bg-slate-100 text-transparent hover:text-slate-300'}`}
                        onClick={() => handleAssessment(idx + 1, false)}
                      >
                        {assessment[idx + 1] === false ? '✗' : '✗'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          
        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">54</div>
        <span>चुक्की और जब्बार</span>
      </div>

    </div>
  );
}
