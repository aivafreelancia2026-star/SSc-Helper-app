"use client";

import { useState } from "react";

export function C6HindiCh12Page3() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // For section (आ) - cycle through circle (1)
  const [wordShapes, setWordShapes] = useState<Record<number, number>>({});
  
  const cricketWords = [
    "मैच", "बैटिंग", "रन", "बारिश", "बॉलिंग",
    "मुश्किल", "ओवर", "आउट", "कप्तान", "ग्लॉव्ज",
    "बैट", "क्रीज", "बाउंसर", "बल्ला", "बाउंड्री-लाइन"
  ];

  const handleAnswerInput = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleShapeCycle = (wordIdx: number) => {
    setWordShapes(prev => {
      const current = prev[wordIdx] || 0;
      return { ...prev, [wordIdx]: (current + 1) % 2 }; // 0: None, 1: Circle
    });
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Content Area */}
        <div className="w-full bg-[#f8f9fa] rounded-2xl shadow-xl border-4 border-white mt-4 p-6 md:p-10 flex flex-col gap-10">
          
          {/* Top Section: QR Code */}
          <div className="flex justify-end mb-[-40px]">
             <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow border border-slate-200 z-10">
               <div className="w-16 h-16 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=G8A9C2')] bg-cover bg-center rounded-sm"></div>
               <div className="font-mono text-xs font-bold text-slate-600 mt-1 tracking-widest">G8A9C2</div>
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
              {/* Decorative Smiley */}
              <div className="absolute right-0 md:right-32 top-0 text-7xl hidden md:block opacity-90 hover:scale-110 transition-transform cursor-default">😊</div>
              
              <div className="flex flex-col gap-3">
                <p className="text-lg md:text-xl text-slate-800 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  1. कहानी में आगे क्या हुआ होगा?
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
                  2. विजय रमेश को क्या समझा रहा था?
                </p>
                <textarea
                  value={answers["q2"] || ""}
                  onChange={(e) => handleAnswerInput("q2", e.target.value)}
                  className="w-full md:w-3/4 border-b-2 border-slate-300 border-dotted bg-transparent text-lg md:text-xl p-2 focus:outline-none focus:border-slate-500 transition-colors text-slate-700 resize-none"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  rows={2}
                ></textarea>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-lg md:text-xl text-slate-800 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  3. अगर तुम टीम के कप्तान होते तो क्या करते?
                </p>
                <textarea
                  value={answers["q3"] || ""}
                  onChange={(e) => handleAnswerInput("q3", e.target.value)}
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
            <div className="flex flex-col md:flex-row gap-6 ml-0 md:ml-4 items-center md:items-start">
              
              {/* Left Side: Decorative Batsman Emoji */}
              <div className="w-full md:w-1/4 flex justify-center text-[100px] drop-shadow-md">
                🏏
              </div>

              {/* Right Side: Questions */}
              <div className="w-full md:w-3/4 flex flex-col gap-4">
                <div className="flex gap-3 items-start">
                  <span className="text-lg md:text-xl font-bold text-slate-700">(अ)</span>
                  <p className="text-lg md:text-xl text-slate-800 font-bold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    पढ़िए-बताइए।
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 ml-0 md:ml-8 w-full md:w-5/6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-2">
                    <span className="text-lg md:text-xl text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>1. किसने चार विकेट लिए?</span>
                    <input type="text" value={answers["qa1"] || ""} onChange={(e) => handleAnswerInput("qa1", e.target.value)} className="w-full sm:w-48 bg-transparent border-b-2 border-slate-300 border-dotted text-center p-1 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} placeholder="उत्तर..." />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-2">
                    <span className="text-lg md:text-xl text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>2. किसने चार रन बनाए?</span>
                    <input type="text" value={answers["qa2"] || ""} onChange={(e) => handleAnswerInput("qa2", e.target.value)} className="w-full sm:w-48 bg-transparent border-b-2 border-slate-300 border-dotted text-center p-1 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} placeholder="उत्तर..." />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-2">
                    <span className="text-lg md:text-xl text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>3. रमेश की टीम का कप्तान कौन था?</span>
                    <input type="text" value={answers["qa3"] || ""} onChange={(e) => handleAnswerInput("qa3", e.target.value)} className="w-full sm:w-48 bg-transparent border-b-2 border-slate-300 border-dotted text-center p-1 focus:outline-none focus:border-green-500 text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }} placeholder="उत्तर..." />
                  </div>
                </div>
              </div>

            </div>

            {/* (आ) */}
            <div className="flex flex-col gap-6 ml-0 md:ml-4 mt-6">
              <div className="flex gap-3 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-700">(आ)</span>
                <p className="text-lg md:text-xl text-slate-800 leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  इसमें क्रिकेट से संबंधित शब्द कौन-से हैं? पहचानकर <span className="inline-block w-8 h-8 rounded-full border-2 border-slate-800 align-middle"></span> लगाइए।
                </p>
              </div>
              
              <div className="border border-[#c6d6a5] bg-white rounded-xl shadow-sm overflow-hidden p-6 mx-auto w-full max-w-4xl">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 place-items-center">
                  {cricketWords.map((word, idx) => {
                    const isCircled = wordShapes[idx] === 1;
                    
                    return (
                      <div 
                        key={`cricket-word-${idx}`} 
                        className={`
                          relative p-2 md:p-3 cursor-pointer select-none transition-all duration-300 flex items-center justify-center min-w-[80px]
                          ${isCircled ? 'text-blue-700 scale-110 font-bold' : 'text-slate-700 hover:bg-slate-50 rounded-lg'}
                        `}
                        onClick={() => handleShapeCycle(idx)}
                      >
                        <span className="text-lg md:text-xl relative z-10 text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{word}</span>
                        {isCircled && (
                          <div className="absolute inset-0 border-2 border-blue-500 rounded-[40%] md:rounded-full rotate-[-2deg] scale-110 shadow-sm animate-pulse" style={{ animationDuration: '3s' }}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* (इ) */}
            <div className="flex flex-col gap-6 ml-0 md:ml-4 mt-6">
              <div className="flex gap-3 items-start">
                <span className="text-lg md:text-xl font-bold text-slate-700">(इ)</span>
                <p className="text-lg md:text-xl text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  नीचे कुछ खेलों के चित्र दिए गए हैं।
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mt-4 max-w-4xl mx-auto w-full place-items-center">
                 
                 {/* Hockey */}
                 <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow w-full">
                    <div className="text-6xl md:text-7xl">🏑</div>
                    <span className="text-xl font-bold text-slate-700 mt-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>हॉकी</span>
                 </div>

                 {/* Tennis */}
                 <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow w-full">
                    <div className="text-6xl md:text-7xl">🎾</div>
                    <span className="text-xl font-bold text-slate-700 mt-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>टेनिस</span>
                 </div>

                 {/* Chess */}
                 <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow w-full">
                    <div className="text-6xl md:text-7xl">♟️</div>
                    <span className="text-xl font-bold text-slate-700 mt-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>शतरंज</span>
                 </div>

                 {/* Carrom */}
                 <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow w-full">
                    <div className="text-6xl md:text-7xl text-red-500">🎯</div>
                    <span className="text-xl font-bold text-slate-700 mt-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>कैरम</span>
                 </div>

                 {/* Kabaddi */}
                 <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow w-full">
                    <div className="text-6xl md:text-7xl">🤼‍♂️</div>
                    <span className="text-xl font-bold text-slate-700 mt-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>कबड्डी</span>
                 </div>

                 {/* Table Tennis */}
                 <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow w-full">
                    <div className="text-6xl md:text-7xl">🏓</div>
                    <span className="text-xl font-bold text-slate-700 mt-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>टेबल टेनिस</span>
                 </div>

              </div>
            </div>

          </section>
          
        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">62</div>
        <span>बच्चे चले क्रिकेट खेलने</span>
      </div>

    </div>
  );
}
