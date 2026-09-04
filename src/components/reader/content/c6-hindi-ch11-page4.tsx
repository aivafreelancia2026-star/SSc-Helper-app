"use client";

import { useState } from "react";

export function C6HindiCh11Page4() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [assessment, setAssessment] = useState<Record<number, boolean | null>>({
    1: null, 2: null, 3: null, 4: null
  });

  const handleAnswerInput = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleAssessment = (questionNum: number, value: boolean) => {
    setAssessment(prev => ({ ...prev, [questionNum]: value }));
  };

  const assessmentQuestions = [
    "मैं चित्र के बारे में बातचीत कर सकता/सकती हूँ।",
    "मैं संयुक्ताक्षर वाले शब्द पढ़ और लिख सकता हूँ।",
    "मैं इन वर्णों से बने शब्द व वाक्य बिना देखे लिख सकता/सकती हूँ।",
    "मैं संकेत के आधार पर चित्र बनाकर उसके बारे में बता सकता/सकती हूँ।"
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Content Area */}
        <div className="w-full bg-[#f8f9fa] rounded-2xl shadow-xl border-4 border-white mt-4 p-6 md:p-10 flex flex-col gap-10">
          
          {/* Section: लिखो */}
          <section className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-3 bg-[#d5e8db] px-6 py-2 rounded-full shadow-sm w-max border-2 border-white">
              <span className="text-2xl">✍️</span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                लिखो
              </h2>
            </div>
            
            {/* (अ) Correct underlined words */}
            <div className="flex flex-col gap-6 ml-0 md:ml-4">
              <div className="flex gap-3 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-700">(अ)</span>
                <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  नीचे दिए गए वाक्यों में रेखांकित शब्दों को सही करके लिखिए।
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-start ml-0 md:ml-12">
                <div className="flex flex-col gap-6 w-full md:w-2/3">
                  
                  {/* Sentence 1 */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between border-b border-slate-200 pb-2">
                    <p className="text-lg md:text-xl text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      - <span className="underline decoration-red-500 decoration-2 underline-offset-4">उदयान</span> हरा-भरा होता है।
                    </p>
                    <input
                      type="text"
                      value={answers["q1_1"] || ""}
                      onChange={(e) => handleAnswerInput("q1_1", e.target.value)}
                      className="w-full sm:w-48 border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-1 focus:outline-none focus:border-slate-500 transition-colors text-slate-800 text-center"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      placeholder="सही शब्द..."
                    />
                  </div>

                  {/* Sentence 2 */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between border-b border-slate-200 pb-2">
                    <p className="text-lg md:text-xl text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      - भारत महान <span className="underline decoration-red-500 decoration-2 underline-offset-4">राषटर</span> है।
                    </p>
                    <input
                      type="text"
                      value={answers["q1_2"] || ""}
                      onChange={(e) => handleAnswerInput("q1_2", e.target.value)}
                      className="w-full sm:w-48 border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-1 focus:outline-none focus:border-slate-500 transition-colors text-slate-800 text-center"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      placeholder="सही शब्द..."
                    />
                  </div>

                  {/* Sentence 3 */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between border-b border-slate-200 pb-2">
                    <p className="text-lg md:text-xl text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      - वह हवाई <span className="underline decoration-red-500 decoration-2 underline-offset-4">अडडा</span> है।
                    </p>
                    <input
                      type="text"
                      value={answers["q1_3"] || ""}
                      onChange={(e) => handleAnswerInput("q1_3", e.target.value)}
                      className="w-full sm:w-48 border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-1 focus:outline-none focus:border-slate-500 transition-colors text-slate-800 text-center"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      placeholder="सही शब्द..."
                    />
                  </div>

                </div>
                
                {/* Decorative Map */}
                <div className="w-full md:w-1/3 flex justify-center text-8xl opacity-90 hover:opacity-100 transition-opacity">
                  🇮🇳
                </div>
              </div>
            </div>

            {/* (आ) Create words from letters */}
            <div className="flex flex-col gap-6 ml-0 md:ml-4 mt-6">
              <div className="flex gap-3 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-700">(आ)</span>
                <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  नीचे दिए गए अक्षरों से बनने वाले संयुक्ताक्षर शब्द लिखिए।
                </p>
              </div>
              
              <div className="overflow-x-auto w-full ml-0 md:ml-12 pb-4">
                <div className="min-w-[600px] flex justify-between gap-4 pr-12">
                  
                  {/* Column 1: द */}
                  <div className="flex flex-col items-center gap-4 w-1/4">
                    <div className="w-12 h-12 rounded-full border-2 border-pink-400 bg-pink-50 flex items-center justify-center text-xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      द
                    </div>
                    <div className="flex items-center w-full">
                       <span className="text-lg mr-2 font-bold text-slate-500 shrink-0">उदा:</span>
                       <span className="text-xl font-bold text-slate-800 border-b border-transparent pb-1" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>उद्यान</span>
                    </div>
                    <input
                      type="text"
                      value={answers["q2_d2"] || ""}
                      onChange={(e) => handleAnswerInput("q2_d2", e.target.value)}
                      className="w-full border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-1 focus:outline-none focus:border-slate-500 text-slate-800 text-center"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    />
                  </div>

                  {/* Column 2: ट */}
                  <div className="flex flex-col items-center gap-4 w-1/4">
                    <div className="w-12 h-12 rounded-full border-2 border-green-500 bg-green-50 flex items-center justify-center text-xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      ट
                    </div>
                    <input
                      type="text"
                      value={answers["q2_t1"] || ""}
                      onChange={(e) => handleAnswerInput("q2_t1", e.target.value)}
                      className="w-full border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-1 focus:outline-none focus:border-slate-500 text-slate-800 text-center mt-[32px]"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    />
                    <input
                      type="text"
                      value={answers["q2_t2"] || ""}
                      onChange={(e) => handleAnswerInput("q2_t2", e.target.value)}
                      className="w-full border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-1 focus:outline-none focus:border-slate-500 text-slate-800 text-center"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    />
                  </div>

                  {/* Column 3: प */}
                  <div className="flex flex-col items-center gap-4 w-1/4">
                    <div className="w-12 h-12 rounded-full border-2 border-pink-400 bg-pink-50 flex items-center justify-center text-xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      प
                    </div>
                    <input
                      type="text"
                      value={answers["q2_p1"] || ""}
                      onChange={(e) => handleAnswerInput("q2_p1", e.target.value)}
                      className="w-full border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-1 focus:outline-none focus:border-slate-500 text-slate-800 text-center mt-[32px]"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    />
                    <input
                      type="text"
                      value={answers["q2_p2"] || ""}
                      onChange={(e) => handleAnswerInput("q2_p2", e.target.value)}
                      className="w-full border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-1 focus:outline-none focus:border-slate-500 text-slate-800 text-center"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    />
                  </div>

                  {/* Column 4: ड */}
                  <div className="flex flex-col items-center gap-4 w-1/4">
                    <div className="w-12 h-12 rounded-full border-2 border-green-500 bg-green-50 flex items-center justify-center text-xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      ड
                    </div>
                    <input
                      type="text"
                      value={answers["q2_d1"] || ""}
                      onChange={(e) => handleAnswerInput("q2_d1", e.target.value)}
                      className="w-full border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-1 focus:outline-none focus:border-slate-500 text-slate-800 text-center mt-[32px]"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    />
                    <input
                      type="text"
                      value={answers["q2_dd2"] || ""}
                      onChange={(e) => handleAnswerInput("q2_dd2", e.target.value)}
                      className="w-full border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-1 focus:outline-none focus:border-slate-500 text-slate-800 text-center"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    />
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Paragraph Writing Section */}
            <div className="flex flex-col md:flex-row gap-8 w-full mt-6">
              
              {/* (इ) */}
              <div className="flex flex-col gap-4 w-full md:w-1/2 ml-0 md:ml-4">
                <div className="flex gap-3 items-start">
                  <span className="text-lg md:text-xl font-bold text-slate-700">(इ)</span>
                  <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    अपने बारे में कुछ वाक्य लिखिए।
                  </p>
                </div>
                <div className="flex gap-2">
                   <span className="text-lg font-bold text-slate-600 shrink-0">उत्तर:</span>
                   <textarea
                     value={answers["essay_1"] || ""}
                     onChange={(e) => handleAnswerInput("essay_1", e.target.value)}
                     className="w-full min-h-[220px] border-0 bg-transparent text-lg md:text-xl p-1 focus:outline-none text-slate-700 resize-none leading-[2.5rem]"
                     style={{ 
                       fontFamily: "'Noto Sans Devanagari', sans-serif",
                       backgroundImage: "repeating-linear-gradient(transparent, transparent 38px, #cbd5e1 39px, #cbd5e1 40px)",
                       backgroundAttachment: "local",
                     }}
                   ></textarea>
                </div>
              </div>

              {/* (ई) */}
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <div className="flex gap-3 items-start">
                  <span className="text-lg md:text-xl font-bold text-slate-700">(ई)</span>
                  <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    अपनी पाठशाला के बारे में लिखिए।
                  </p>
                </div>
                <div className="flex gap-2">
                   <span className="text-lg font-bold text-slate-600 shrink-0">उत्तर:</span>
                   <textarea
                     value={answers["essay_2"] || ""}
                     onChange={(e) => handleAnswerInput("essay_2", e.target.value)}
                     className="w-full min-h-[220px] border-0 bg-transparent text-lg md:text-xl p-1 focus:outline-none text-slate-700 resize-none leading-[2.5rem]"
                     style={{ 
                       fontFamily: "'Noto Sans Devanagari', sans-serif",
                       backgroundImage: "repeating-linear-gradient(transparent, transparent 38px, #cbd5e1 39px, #cbd5e1 40px)",
                       backgroundAttachment: "local",
                     }}
                   ></textarea>
                </div>
              </div>

            </div>

          </section>

          {/* Section: Self Assessment */}
          <section className="flex flex-col gap-4 mt-8">
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
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">59</div>
        <span>उद्यान</span>
      </div>

    </div>
  );
}
