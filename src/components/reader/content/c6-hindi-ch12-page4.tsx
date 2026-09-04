"use client";

import { useState } from "react";

export function C6HindiCh12Page4() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const handleAnswerInput = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const vocabData = [
    { eng: "बैटिंग", hindi: "बल्लेबाजी" },
    { eng: "बॉलिंग", hindi: "गेंदबाजी" },
    { eng: "टीम", hindi: "दल" },
    { eng: "कैप्टन", hindi: "कप्तान" },
    { eng: "ग्लॉव्ज", hindi: "दस्ताना" },
    { eng: "फील्डर", hindi: "क्षेत्ररक्षक" },
    { eng: "नॉट आउट", hindi: "नाबाद" }
  ];

  const qualities = [
    "बहादुर", "नियम पालन", "संवेदनशील", "मेहनती", 
    "चुस्त", "शांत", "सतर्क", "विनोदी"
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Content Area */}
        <div className="w-full bg-[#f8f9fa] rounded-2xl shadow-xl border-4 border-white mt-4 p-6 md:p-10 flex flex-col gap-10">
          
          {/* Section: अब बताइए */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              अब बताइए।
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between ml-0 md:ml-8">
              
              <div className="flex w-full md:w-2/3 justify-between">
                {/* Left Column - Play Outside */}
                <div className="flex flex-col gap-4 w-[45%] text-center">
                  <h3 className="text-lg md:text-xl font-bold text-slate-700 mb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>बाहर खेलते हैं।</h3>
                  <div className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>हॉकी</div>
                  <input type="text" value={answers["out1"] || ""} onChange={(e) => handleAnswerInput("out1", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-400 border-dotted text-center p-2 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} placeholder="..." />
                  <input type="text" value={answers["out2"] || ""} onChange={(e) => handleAnswerInput("out2", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-400 border-dotted text-center p-2 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} placeholder="..." />
                </div>

                {/* Right Column - Play Inside */}
                <div className="flex flex-col gap-4 w-[45%] text-center">
                  <h3 className="text-lg md:text-xl font-bold text-slate-700 mb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>अंदर खेलते हैं।</h3>
                  <div className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>टेबल टेनिस</div>
                  <input type="text" value={answers["in1"] || ""} onChange={(e) => handleAnswerInput("in1", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-400 border-dotted text-center p-2 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} placeholder="..." />
                  <input type="text" value={answers["in2"] || ""} onChange={(e) => handleAnswerInput("in2", e.target.value)} className="w-full bg-transparent border-b-2 border-slate-400 border-dotted text-center p-2 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} placeholder="..." />
                </div>
              </div>

              {/* Decorative Image/Emoji */}
              <div className="w-full md:w-1/3 flex justify-center text-[120px] drop-shadow-md hidden md:flex">
                📖
              </div>

            </div>
          </section>


          {/* Section (ई) इन्हें भी जानिए */}
          <section className="flex flex-col gap-6 mt-4">
            <div className="flex gap-3 items-center">
              <span className="text-lg md:text-xl font-bold text-slate-700">(ई)</span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                इन्हें भी जानिए।
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 justify-between ml-0 md:ml-12 mt-4">
              
              {/* Vocab List */}
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                {vocabData.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center w-full md:w-4/5 text-lg md:text-xl text-slate-700 font-medium hover:text-green-700 transition-colors cursor-default" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    <span className="w-[45%] text-right">{item.eng}</span>
                    <span className="text-slate-400">-</span>
                    <span className="w-[45%] text-left">{item.hindi}</span>
                  </div>
                ))}
              </div>

              {/* Qualities Box */}
              <div className="w-full md:w-1/2">
                <div className="border border-slate-600 rounded-lg p-6 bg-white shadow-sm inline-block w-full max-w-sm">
                  <h3 className="text-xl font-bold text-center text-slate-800 mb-4 border-b border-slate-200 pb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    खिलाड़ी के गुण
                  </h3>
                  <div className="flex flex-col gap-2">
                    {qualities.map((q, idx) => (
                      <div key={idx} className="flex gap-3 items-center text-lg md:text-xl text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                        <div className="w-2 h-2 rotate-45 bg-slate-800 shrink-0"></div>
                        <i>{q}</i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Section: लिखो */}
          <section className="flex flex-col gap-6 mt-8">
            <div className="inline-flex items-center gap-3 bg-[#e4eed4] px-6 py-2 rounded-full shadow-sm w-max border-2 border-white">
              <span className="text-2xl">✍️</span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                लिखो
              </h2>
            </div>

            <div className="flex gap-3 items-start ml-0 md:ml-4">
              <span className="text-lg md:text-xl font-bold text-slate-700">(अ)</span>
              <p className="text-lg md:text-xl text-slate-800 leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                खिलाड़ी में क्या-क्या गुण होने चाहिए। आप अपने में किन अच्छे गुणों का विकास करना चाहेंगे? लिखिए।
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center justify-between ml-0 md:ml-12 mt-4">
              
              {/* Two Column Table Input */}
              <div className="w-full md:w-3/4 border-2 border-[#c6d6a5] rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="flex border-b-2 border-[#c6d6a5] bg-slate-50">
                  <div className="w-1/2 p-4 text-center border-r border-[#c6d6a5]">
                    <span className="text-lg md:text-xl font-bold text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>खिलाड़ी के गुण</span>
                  </div>
                  <div className="w-1/2 p-4 text-center">
                    <span className="text-lg md:text-xl font-bold text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मेरे गुण</span>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-1/2 p-4 border-r border-[#c6d6a5] flex flex-col gap-4">
                    {[1, 2, 3].map(i => (
                      <input key={`k-${i}`} type="text" value={answers[`k${i}`] || ""} onChange={(e) => handleAnswerInput(`k${i}`, e.target.value)} className="w-full bg-transparent border-b-2 border-slate-300 border-dotted p-2 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} placeholder="" />
                    ))}
                  </div>
                  <div className="w-1/2 p-4 flex flex-col gap-4">
                    {[1, 2, 3].map(i => (
                      <input key={`m-${i}`} type="text" value={answers[`m${i}`] || ""} onChange={(e) => handleAnswerInput(`m${i}`, e.target.value)} className="w-full bg-transparent border-b-2 border-slate-300 border-dotted p-2 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} placeholder="" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Emoji */}
              <div className="w-full md:w-1/4 flex justify-center text-[100px] drop-shadow-md">
                🤔
              </div>

            </div>

          </section>

        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">63</div>
        <span>बच्चे चले क्रिकेट खेलने</span>
      </div>

    </div>
  );
}
