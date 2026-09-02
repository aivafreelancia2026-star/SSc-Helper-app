"use client";

import { useState } from "react";

export function C6HindiCh8Page2() {
  const [lastInput, setLastInput] = useState("");

  const dialogue = [
    { speaker: "श्रावणी", text: "रजिता, क्या बात है? आज कोई भी किताबें नहीं लाया?" },
    { speaker: "रजिता", text: "लगता है तुम कल नहीं आई थी। आज बाल दिवस है।" },
    { speaker: "श्रावणी", text: "यह बाल दिवस क्या है?" },
    { speaker: "रजिता", text: "आज 14 नवंबर है। आज चाचा नेहरू का जन्मदिन है। इसलिए आज के दिन बाल दिवस मनाते हैं।" },
    { speaker: "श्रावणी", text: "सुना है वे बच्चों को बहुत चाहते थे। इसलिए बच्चे उन्हें चाचा कहते थे..." },
    { speaker: "रजिता", text: "हाँ, हाँ, तुमने सही कहा। इसीलिए उनके जन्मदिन पर बाल दिवस मनाया जाता है।" },
    { speaker: "श्रावणी", text: "इस दिन विद्यालय में क्या-क्या करते हैं?" },
    { speaker: "रजिता", text: "आज सब मिलकर अपनी-अपनी कक्षाएँ सजाते हैं। रंग-बिरंगे कागज़ लगाते हैं। शिक्षक ज्ञान की बातें बताते हैं। छात्र खेलों में भाग लेते हैं। गीत गाते हैं। पुरस्कार पाते हैं।" },
    { speaker: "श्रावणी", text: "अच्छा, मैं भी इन सब में भाग लूँगी।" },
    { speaker: "रजिता", text: "अच्छी बात है। तुम्हें बाल दिवस की शुभकामनाएँ।" }
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-slate-50 min-h-screen font-sans shadow-lg pb-12 relative overflow-hidden">
      
      <div className="relative z-10 px-8 pt-12 pb-8 flex flex-col h-full">
        
        {/* Context Text */}
        <div className="bg-white/80 backdrop-blur-sm border-l-4 border-slate-400 p-6 rounded-r-xl shadow-sm mb-12">
          <p className="text-xl text-slate-700 italic leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            (श्रावणी इसी साल पाठशाला आई है। वह छठवीं कक्षा में पढ़ती है। रजिता उसकी सहेली है। पाठशाला में बाल दिवस मनाया जा रहा है।)
          </p>
        </div>

        {/* Dialogue Section */}
        <div className="flex flex-col gap-6 mb-12">
          {dialogue.map((line, idx) => (
            <div 
              key={idx} 
              className={`flex w-full ${line.speaker === "श्रावणी" ? "justify-start" : "justify-end"}`}
            >
              <div 
                className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl shadow-sm flex flex-col gap-2 relative
                  ${line.speaker === "श्रावणी" 
                    ? "bg-blue-50 border border-blue-200 rounded-tl-none" 
                    : "bg-green-50 border border-green-200 rounded-tr-none"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl drop-shadow-sm">
                    {line.speaker === "श्रावणी" ? "👧🏽" : "👧🏻"}
                  </span>
                  <span className={`text-sm font-bold ${line.speaker === "श्रावणी" ? "text-blue-600" : "text-green-600"}`}>
                    {line.speaker}
                  </span>
                </div>
                <p className="text-xl text-slate-800 leading-relaxed font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  {line.text}
                </p>
              </div>
            </div>
          ))}

          {/* Interactive Last Line */}
          <div className="flex w-full justify-start mt-4">
            <div className="max-w-[80%] md:max-w-[70%] p-4 rounded-2xl shadow-sm flex flex-col gap-2 relative bg-blue-50 border border-blue-200 rounded-tl-none animate-pulse">
              <div className="flex items-center gap-2">
                <span className="text-2xl drop-shadow-sm">👧🏽</span>
                <span className="text-sm font-bold text-blue-600">श्रावणी</span>
              </div>
              <div className="text-xl text-slate-800 leading-relaxed font-medium flex items-center flex-wrap gap-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                <span>तुम्हें भी</span>
                <input 
                  type="text" 
                  value={lastInput}
                  onChange={(e) => setLastInput(e.target.value)}
                  placeholder="यहाँ लिखें..."
                  className="bg-white border-b-2 border-blue-400 border-dotted px-2 py-1 outline-none focus:border-blue-600 text-blue-800 w-48 transition-colors"
                />
                <span>!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Page Number */}
        <div className="w-full flex items-center justify-between pt-8 text-sm text-slate-500 font-medium mt-auto border-t border-slate-200">
          <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
          <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">41</span>
          <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>बाल दिवस</span>
        </div>

      </div>
    </div>
  );
}
