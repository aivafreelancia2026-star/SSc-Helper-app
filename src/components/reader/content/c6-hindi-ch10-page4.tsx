"use client";

import { useState } from "react";
import Image from "next/image";

export function C6HindiCh10Page4() {
  const [copyInputs, setCopyInputs] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const wordList = [
    ["नुक्कड़", "कच्चा", "चौकन्ना"],
    ["सुग्गा", "पत्ता", "चम्मच"],
    ["पक्का", "छप्पर", "रस्सी"],
    ["गुब्बारा", "सज्जन", "अड्डा"],
    ["छत्ता", "लट्टू", "कव्वाली"],
    ["गद्दी", "भद्दी", "उल्लू"],
  ]; // Note: using भद्दी instead of unclear word

  const copyWords = ["कच्चा", "सुग्गा", "बच्चा", "सज्जा", "रस्सी", "लट्टू"];

  const handleCopyInput = (word: string, value: string) => {
    setCopyInputs(prev => ({ ...prev, [word]: value }));
  };

  const handleAnswerInput = (questionNum: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionNum]: value }));
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Content Area */}
        <div className="w-full bg-[#f8f9fa] rounded-2xl shadow-xl border-4 border-white mt-4 p-6 md:p-10 flex flex-col gap-10">
          
          {/* Section 1: (इ) नीचे दिए गए शब्द पढ़िए */}
          <section className="flex flex-col gap-6">
            <div className="flex gap-3 items-start">
              <span className="text-lg md:text-xl font-bold text-slate-700">(इ)</span>
              <p className="text-lg md:text-xl text-slate-800 font-bold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                नीचे दिए गए शब्द पढ़िए।
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center ml-0 md:ml-12">
              
              {/* Word Box */}
              <div className="w-full md:w-1/2 border-2 border-[#b0b875] rounded-xl bg-white p-6 md:p-8 shadow-sm">
                <table className="w-full text-center">
                  <tbody>
                    {wordList.map((row, idx) => (
                      <tr key={`word-row-${idx}`}>
                        {row.map((word, wordIdx) => (
                          <td key={`word-${idx}-${wordIdx}`} className="py-3 px-2 text-xl font-medium text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                            {word}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Parrot Callout */}
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="relative bg-white border-2 border-[#b0b875] rounded-[50px] p-6 shadow-md text-center">
                  <h3 className="text-2xl font-bold text-pink-600 mb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>जानते हो!</h3>
                  <p className="text-lg text-slate-700 leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    ये सारे शब्द एक जैसे दो वर्णों के मेल से बने हैं। इन्हें <span className="font-bold text-slate-900">द्वित्वाक्षर</span> कहते हैं।
                  </p>
                  
                  {/* Thought bubbles pointing down */}
                  <div className="absolute -bottom-8 left-1/4 w-6 h-6 border-2 border-[#b0b875] bg-white rounded-full"></div>
                  <div className="absolute -bottom-14 left-1/3 w-4 h-4 border-2 border-[#b0b875] bg-white rounded-full"></div>
                </div>
                
                <div className="mt-16 text-[100px] hover:animate-bounce">
                  🦜
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: (ई) वाक्य पढ़िए */}
          <section className="flex flex-col gap-4 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <div className="flex gap-3 items-start">
              <span className="text-lg md:text-xl font-bold text-slate-700">(ई)</span>
              <p className="text-lg md:text-xl text-slate-800 font-bold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                वाक्य पढ़िए। कक्षा में सुनाइए।
              </p>
            </div>
            
            <div className="ml-0 md:ml-12 mt-2">
              <p className="text-2xl md:text-3xl font-bold text-blue-900 leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                बच्चे दिल के सच्चे। दिल के सच्चे बच्चे। सच्चे दिल के बच्चे।
              </p>
            </div>
          </section>

          <hr className="border-t-2 border-slate-200" />

          {/* Section 3: लिखो */}
          <section className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-3 bg-[#d5e8db] px-6 py-2 rounded-full shadow-sm w-max border-2 border-white">
              <span className="text-2xl">✍️</span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                लिखो
              </h2>
            </div>
            
            {/* (अ) */}
            <div className="flex flex-col gap-6 ml-0 md:ml-4">
              <div className="flex gap-3 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-700">(अ)</span>
                <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  सुंदर अक्षरों में लिखिए।
                </p>
              </div>
              
              {/* Practice Writing area */}
              <div className="flex flex-wrap gap-x-8 gap-y-6 ml-0 md:ml-12">
                {copyWords.map((word, idx) => (
                  <div key={`copy-${idx}`} className="flex flex-col gap-3 min-w-[120px]">
                    <span className="text-2xl md:text-3xl font-bold text-slate-800 text-center tracking-widest" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      {word}
                    </span>
                    <input
                      type="text"
                      value={copyInputs[word] || ""}
                      onChange={(e) => handleCopyInput(word, e.target.value)}
                      className="border-b-2 border-pink-400 border-dashed bg-transparent text-center text-xl md:text-2xl p-2 focus:outline-none focus:border-pink-600 focus:border-solid transition-colors text-slate-700"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      placeholder="यहाँ लिखें"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* (आ) */}
            <div className="flex flex-col gap-6 ml-0 md:ml-4 mt-6">
              <div className="flex gap-3 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-700">(आ)</span>
                <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  इन प्रश्नों के उत्तर लिखिए।
                </p>
              </div>
              
              <div className="flex flex-col gap-8 ml-0 md:ml-12">
                <div className="flex flex-col gap-4">
                  <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    1) रामू काका ने क्या किया?
                  </p>
                  <textarea
                    value={answers[1] || ""}
                    onChange={(e) => handleAnswerInput(1, e.target.value)}
                    className="w-full border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-2 focus:outline-none focus:border-slate-500 focus:border-solid transition-colors text-slate-700 resize-none overflow-hidden"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    rows={2}
                  ></textarea>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    2) जब्बार ने चुक्की को क्या समझाया?
                  </p>
                  <textarea
                    value={answers[2] || ""}
                    onChange={(e) => handleAnswerInput(2, e.target.value)}
                    className="w-full border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-2 focus:outline-none focus:border-slate-500 focus:border-solid transition-colors text-slate-700 resize-none overflow-hidden"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    rows={2}
                  ></textarea>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    3) यदि आपको कोई सहायता चाहिए तो आप किसके पास जाएँगे?
                  </p>
                  <textarea
                    value={answers[3] || ""}
                    onChange={(e) => handleAnswerInput(3, e.target.value)}
                    className="w-full border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-2 focus:outline-none focus:border-slate-500 focus:border-solid transition-colors text-slate-700 resize-none overflow-hidden"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    rows={2}
                  ></textarea>
                </div>
              </div>

            </div>
          </section>
          
        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">53</div>
        <span>चुक्की और जब्बार</span>
      </div>

    </div>
  );
}
