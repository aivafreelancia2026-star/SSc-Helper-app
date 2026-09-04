"use client";

import { useState } from "react";
import Image from "next/image";

interface InstructionItem {
  id: number;
  icon: string;
  tag: string;
  text: string;
}

const INSTRUCTIONS_PAGE_73: InstructionItem[] = [
  {
    id: 1,
    icon: "🎯",
    tag: "पाठ्यपुस्तक का उद्देश्य",
    text: "यह पाठ्यपुस्तक आप के स्तर और रुचियों के अनुरूप बनाई गई है। इससे आप अपने भाषा कौशलों का विकास कर सकते हैं। इसके लिए आप अध्यापक का मार्गदर्शन व सहयोग ले सकते हैं।",
  },
  {
    id: 2,
    icon: "📖",
    tag: "शब्दकोश व अतिरिक्त पठन",
    text: "इनके अतिरिक्त ‘शब्दकोश’ का उपयोग करने से पाठ व अभ्यास आसानी से कर सकते हैं। इसके साथ-साथ समाचार पत्र, पुस्तकालय की पुस्तकें, बाल साहित्य आदि का पठन करना चाहिए, जिससे रचनात्मक व सारांशात्मक आकलन के उत्तर आसानी से लिख सकते हैं।",
  },
  {
    id: 3,
    icon: "🖼️",
    tag: "चित्र पठन व व्याकरण",
    text: "हर पाठ में दिए गए चित्र के माध्यम से आप सबसे पहले संज्ञा शब्दों की पहचान, तत्पश्चात क्रिया शब्दों की पहचान और सोच-विचार के वाक्य बनाने की पहचान करेंगे।",
  },
  {
    id: 4,
    icon: "🗣️",
    tag: "सुनो-बोलो अभ्यास",
    text: "हर पाठ में ‘सुनो-बोलो’ अभ्यास के प्रश्न दिए गए हैं। आपको इन प्रश्नों के उत्तर सोच-विचार के देने चाहिए। इन प्रश्नों के उत्तर विचारात्मक होने चाहिए। इससे आपकी बौद्धिक क्षमता का विकास होगा।",
  },
  {
    id: 5,
    icon: "📚",
    tag: "पढ़ो अभ्यास",
    text: "हर पाठ में ‘पढ़ो’ अभ्यास के प्रश्न दिए गए हैं। आपको इन प्रश्नों के उत्तर पाठ पढ़कर देने चाहिए। पढ़ो अभ्यास का उद्देश्य आप में पढ़ने व अर्थग्राह्यता की क्षमता का विकास करना है।",
  },
  {
    id: 6,
    icon: "✍️",
    tag: "लिखो अभ्यास",
    text: "हर पाठ में ‘लिखो’ अभ्यास के प्रश्न दिए गए हैं। आपको अपने विचार लिखित रूप में व्यक्त करने चाहिए।",
  },
  {
    id: 7,
    icon: "🎭",
    tag: "सृजनात्मक अभिव्यक्ति",
    text: "हर पाठ में ‘सृजनात्मक अभिव्यक्ति’ अभ्यास के प्रश्न दिए गए हैं। आपको इन प्रश्नों के उत्तर मौखिक, लिखित अथवा प्रदर्शन (अभिनय) के रूप में देने चाहिए जिससे आप में भाषा का सृजनशील विकास होता है।",
  },
  {
    id: 8,
    icon: "✅",
    tag: "स्वमूल्यांकन",
    text: "स्वमूल्यांकन के लिए ‘क्या मैं ये कर सकता हूँ?’ शीर्षक से एक तालिका दी गई है। आपको अपनी भाषाई क्षमता की जाँच स्वयं करनी चाहिए।",
  },
];

export function C6HindiCh16Page1() {
  const [showOriginal, setShowOriginal] = useState(false);
  const [understoodList, setUnderstoodList] = useState<Record<number, boolean>>({});

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleUnderstood = (id: number) => {
    setUnderstoodList((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(understoodList).filter(Boolean).length;

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      <div className="p-4 md:p-8 pb-4">
        {/* Main Card */}
        <div className="w-full bg-[#fcfbf9] rounded-2xl shadow-xl border-4 border-white mt-4 p-4 md:p-8 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b pb-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl">💡</span>
              <div>
                <h1
                  className="text-2xl md:text-4xl font-bold text-slate-800 tracking-wide"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  बच्चों के लिए महत्वपूर्ण सूचनाएँ
                </h1>
                <p
                  className="text-sm md:text-base text-slate-600 font-medium"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  पाठ्यपुस्तक के अध्ययन, कौशलों के विकास और सुरक्षा नियमों के दिशा-निर्देश
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className="px-4 py-2 text-sm font-semibold rounded-xl border-2 border-pink-300 bg-pink-50 text-pink-900 hover:bg-pink-100 transition shadow-sm flex items-center gap-2"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                <span>{showOriginal ? "📝 निर्देश सूची" : "🖼️ मूल पाठ्यपुस्तक पृष्ठ"}</span>
              </button>
            </div>
          </div>

          {/* Original textbook scan view toggle */}
          {showOriginal ? (
            <div className="w-full relative rounded-2xl overflow-hidden shadow-inner border-2 border-pink-200 bg-slate-50 min-h-[750px] flex items-center justify-center p-2">
              <div className="relative w-full h-[850px]">
                <Image
                  src="/original_page_73.png"
                  alt="Original textbook page 73 - बच्चों! इन सूचनाओं पर ध्यान दीजिए"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {/* Textbook Header Banner */}
              <div className="flex justify-center">
                <div
                  className="border-2 border-pink-400 bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 text-pink-600 font-extrabold text-xl md:text-3xl px-8 py-3 rounded-full shadow-sm text-center"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  बच्चों! इन सूचनाओं पर ध्यान दीजिए...
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                <span
                  className="text-sm md:text-base font-semibold text-slate-700"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  मार्गदर्शन बिंदु समझ: <strong>{completedCount}</strong> / {INSTRUCTIONS_PAGE_73.length} पूर्ण
                </span>
                <div className="w-full sm:w-48 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-pink-500 h-full rounded-full transition-all"
                    style={{
                      width: `${(completedCount / INSTRUCTIONS_PAGE_73.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Instructions List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INSTRUCTIONS_PAGE_73.map((item) => {
                  const isChecked = !!understoodList[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`border rounded-2xl p-5 transition-all flex flex-col justify-between ${
                        isChecked
                          ? "bg-emerald-50/50 border-emerald-300 shadow-sm"
                          : "bg-white border-slate-200 hover:border-pink-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 bg-pink-100/70 text-pink-900 text-xs font-bold px-3 py-1 rounded-full">
                            <span>{item.icon}</span>
                            <span>{item.tag}</span>
                          </span>

                          <button
                            onClick={() => speakText(item.text)}
                            className="text-slate-400 hover:text-pink-600 p-1"
                            title="सुनिए (Listen)"
                          >
                            🔊
                          </button>
                        </div>

                        <p
                          className="text-sm md:text-base text-slate-800 leading-relaxed font-medium mt-1"
                          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                        >
                          * {item.text}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-600">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleUnderstood(item.id)}
                            className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                          <span>मैंने यह निर्देश समझ लिया</span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Educational Safety Cards matching the illustrations */}
              <div className="border-2 border-amber-300 bg-amber-50/50 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-amber-200 pb-3">
                  <span className="text-3xl">🚸</span>
                  <h3
                    className="text-xl md:text-2xl font-bold text-amber-950"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    व्यक्तिगत शारीरिक सुरक्षा नियम (Safety Reminder)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1 */}
                  <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm flex flex-col gap-3">
                    <span className="text-sm font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-lg w-max">
                      👨‍🏫 शिक्षक का संदेश
                    </span>
                    <p
                      className="text-base text-slate-800 font-medium leading-relaxed"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      “व्यक्तिगत शारीरिक सुरक्षा नियम सुरक्षित रहने में हमारी सहायता करते हैं। हम दूसरों के सामने कुछ अंगों को ढककर रखते हैं।”
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-5 rounded-2xl border-2 border-rose-300 shadow-sm flex flex-col justify-between gap-4 text-center">
                    <div>
                      <span className="text-xs font-bold tracking-widest text-rose-600 uppercase block mb-1">
                        सीमा निर्धारण (Personal Boundaries)
                      </span>
                      <h4
                        className="text-xl font-black text-rose-900"
                        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      >
                        निजी अंगों को: “मत छुओ!”
                      </h4>
                    </div>

                    <div
                      className="bg-rose-600 text-white font-extrabold text-lg py-2 px-4 rounded-xl shadow"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      ‘नहीं’ कहो!! भाग जाओ!! बताओ!!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Page Number & Footer */}
      <div
        className="flex flex-col md:flex-row items-center justify-between mt-8 mb-6 px-4 md:px-16 text-slate-500 text-sm font-semibold"
        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
      >
        <span>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg shadow-sm">
          73
        </div>
        <span>बच्चों के लिए सूचनाएँ</span>
      </div>
    </div>
  );
}
