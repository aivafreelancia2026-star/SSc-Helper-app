"use client";

import { useState } from "react";
import Image from "next/image";

export function C6HindiCh15Page1() {
  const [showOriginal, setShowOriginal] = useState(false);
  const [pledgeChecked, setPledgeChecked] = useState<Record<string, boolean>>({});
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const togglePledge = (key: string) => {
    setPledgeChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      <div className="p-4 md:p-8 pb-4">
        {/* Main Card */}
        <div className="w-full bg-[#fdfaf6] rounded-2xl shadow-xl border-4 border-white mt-4 p-4 md:p-8 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b pb-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl">🛡️</span>
              <div>
                <h1
                  className="text-2xl md:text-4xl font-bold text-rose-900 tracking-wide"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  व्यक्तिगत शारीरिक सुरक्षा नियम
                </h1>
                <p
                  className="text-sm md:text-base text-slate-600 font-medium"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  सुरक्षित रहने, सीमाओं को समझने और स्वयं की रक्षा करने के महत्वपूर्ण नियम
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className="px-4 py-2 text-sm font-semibold rounded-xl border-2 border-rose-300 bg-rose-50 text-rose-900 hover:bg-rose-100 transition shadow-sm flex items-center gap-2"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                <span>{showOriginal ? "📝 नियम पढ़ें" : "🖼️ मूल पाठ्यपुस्तक पृष्ठ"}</span>
              </button>
            </div>
          </div>

          {/* Original textbook scan view toggle */}
          {showOriginal ? (
            <div className="w-full relative rounded-2xl overflow-hidden shadow-inner border-2 border-rose-200 bg-slate-50 min-h-[750px] flex items-center justify-center p-2">
              <div className="relative w-full h-[850px]">
                <Image
                  src="/original_page_71.png"
                  alt="Original textbook page 71 - व्यक्तिगत शारीरिक सुरक्षा नियम"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {/* Rules Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Rule 1 */}
                <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b pb-2">
                      <h2
                        className="text-lg md:text-xl font-bold text-amber-900 flex items-center gap-2"
                        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      >
                        <span>👕</span>
                        <span>नियम - 1 (कपड़े पहनने का नियम)</span>
                      </h2>
                      <button
                        onClick={() =>
                          speakText(
                            "नियम 1, कपड़े पहनने का नियम. मैं निजी अंगों को दूसरों के सामने ढककर रखता या रखती हूँ. हम अपने मुँह को नहीं ढकते. हालांकि यह भी बहुत निजी होता है.",
                          )
                        }
                        className="p-1.5 rounded-full hover:bg-amber-100 text-amber-700"
                        title="सुनिए (Listen)"
                      >
                        🔊
                      </button>
                    </div>

                    <ul
                      className="space-y-3 text-sm md:text-base text-slate-700 font-medium leading-relaxed"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">■</span>
                        <span>
                          मैं निजी अंगों (प्राइवेट पार्ट्स) को दूसरों के सामने ढककर रखता/रखती हूँ।
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">■</span>
                        <span>
                          हम अपने मुँह को नहीं ढकते। हालांकि यह भी बहुत निजी होता है।
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pledge-1"
                      checked={!!pledgeChecked["p1"]}
                      onChange={() => togglePledge("p1")}
                      className="h-4 w-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                    <label
                      htmlFor="pledge-1"
                      className="text-xs font-semibold text-slate-600 cursor-pointer select-none"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      मैंने यह नियम समझा और स्वीकार किया
                    </label>
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b pb-2">
                      <h2
                        className="text-lg md:text-xl font-bold text-emerald-900 flex items-center gap-2"
                        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      >
                        <span>✋</span>
                        <span>नियम - 2 (छूने का नियम)</span>
                      </h2>
                      <button
                        onClick={() =>
                          speakText(
                            "नियम 2, छूने का नियम. मैं दूसरों के सामने अपने निजी अंगों को नहीं छूता या छूती हूँ.",
                          )
                        }
                        className="p-1.5 rounded-full hover:bg-emerald-100 text-emerald-700"
                        title="सुनिए (Listen)"
                      >
                        🔊
                      </button>
                    </div>

                    <ul
                      className="space-y-3 text-sm md:text-base text-slate-700 font-medium leading-relaxed"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">■</span>
                        <span>
                          मैं दूसरों के सामने अपने निजी अंगों को नहीं छूता/छूती हूँ।
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pledge-2"
                      checked={!!pledgeChecked["p2"]}
                      onChange={() => togglePledge("p2")}
                      className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label
                      htmlFor="pledge-2"
                      className="text-xs font-semibold text-slate-600 cursor-pointer select-none"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      मैंने यह नियम समझा और स्वीकार किया
                    </label>
                  </div>
                </div>

                {/* Rule 3 */}
                <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b pb-2">
                      <h2
                        className="text-lg md:text-xl font-bold text-sky-900 flex items-center gap-2"
                        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      >
                        <span>🗣️</span>
                        <span>नियम - 3 (बात करने के नियम)</span>
                      </h2>
                      <button
                        onClick={() =>
                          speakText(
                            "नियम 3, बात करने के नियम. मैं बड़े लोगों से निजी अंगों के बारे में बात करता या करती हूँ. इन अंगों से संबंधित समस्याओं के प्रश्न पूछता या पूछती हूँ. चर्चा करता या करती हूँ. इन नियमों का पालन कर हम सुरक्षित व्यक्ति बन सकते हैं.",
                          )
                        }
                        className="p-1.5 rounded-full hover:bg-sky-100 text-sky-700"
                        title="सुनिए (Listen)"
                      >
                        🔊
                      </button>
                    </div>

                    <ul
                      className="space-y-3 text-sm md:text-base text-slate-700 font-medium leading-relaxed"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      <li className="flex items-start gap-2">
                        <span className="text-sky-600 mt-1">■</span>
                        <span>
                          मैं बड़े लोगों से निजी अंगों के बारे में बात करता/करती हूँ। इन अंगों से संबंधित समस्याओं के प्रश्न पूछता/पूछती हूँ। चर्चा करता/करती हूँ। इन नियमों का पालन कर हम सुरक्षित व्यक्ति बन सकते हैं।
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pledge-3"
                      checked={!!pledgeChecked["p3"]}
                      onChange={() => togglePledge("p3")}
                      className="h-4 w-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                    <label
                      htmlFor="pledge-3"
                      className="text-xs font-semibold text-slate-600 cursor-pointer select-none"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      मैंने यह नियम समझा और स्वीकार किया
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Banner from Top Right illustration */}
              <div
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl p-5 md:p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🚨</span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">
                      अगर तुम्हें कोई कपड़ों पर भी गलत छूता है:
                    </h3>
                    <p className="text-sm md:text-base text-sky-100 font-medium mt-1">
                      वह शरीर के सुरक्षा नियमों को तोड़ता है।
                    </p>
                  </div>
                </div>

                <div className="bg-white text-rose-700 font-extrabold text-lg md:text-xl px-6 py-3 rounded-full shadow-md text-center">
                  ‘नहीं बोलो’ और उससे दूर भागो! 🏃💨
                </div>
              </div>

              {/* Section: नियम तोड़ने वाले */}
              <div className="bg-white border-2 border-rose-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between border-b pb-3">
                  <h2
                    className="text-xl md:text-3xl font-bold text-rose-950 flex items-center gap-3"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    <span>⚠️</span>
                    <span>नियम तोड़ने वाले (When Someone Breaks Rules)</span>
                  </h2>
                  <button
                    onClick={() =>
                      speakText(
                        "नियम तोड़ने वाले. यदि कोई व्यक्तिगत सुरक्षा के नियमों को तोड़ता है तो उस व्यक्ति से: एक, नहीं कह सकते हैं. दो, मौका मिलते ही उससे दूर जा सकते हैं. तीन, किसी भरोसेमंद बड़े व्यक्ति से उस असुरक्षित व्यक्ति के बारे में बता कर उसे रोका जाना चाहिए. यदि कोई जानबूझकर इन नियमों को तोड़कर हमें तंग करता है तो इसमें हमारी गलती नहीं है.",
                      )
                    }
                    className="p-2 rounded-full hover:bg-rose-100 text-rose-700"
                    title="सुनिए (Listen)"
                  >
                    🔊
                  </button>
                </div>

                <div
                  className="space-y-4 text-base md:text-lg text-slate-800 leading-relaxed font-medium"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  <p className="font-bold text-slate-900">
                    ■ यदि कोई व्यक्तिगत सुरक्षा के नियमों को तोड़ता है तो उस व्यक्ति से-
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-0 md:pl-6">
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col items-center text-center">
                      <span className="text-3xl mb-2">🛑</span>
                      <span className="font-bold text-rose-900 text-lg">1. “नहीं” कह सकते हैं।</span>
                      <span className="text-xs text-slate-600 mt-1">दृढ़ता से साफ़ मना करें।</span>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col items-center text-center">
                      <span className="text-3xl mb-2">🏃</span>
                      <span className="font-bold text-amber-900 text-lg">2. दूर जा सकते हैं।</span>
                      <span className="text-xs text-slate-600 mt-1">मौका मिलते ही सुरक्षित स्थान पर पहुँचें।</span>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col items-center text-center">
                      <span className="text-3xl mb-2">🗣️</span>
                      <span className="font-bold text-emerald-900 text-lg">3. तुरंत किसी बड़े को बताएँ।</span>
                      <span className="text-xs text-slate-600 mt-1">भरोसेमंद व्यक्ति से साझा कर उसे रोकें।</span>
                    </div>
                  </div>

                  <div className="bg-rose-100/60 rounded-xl p-4 border border-rose-300 mt-4 space-y-3">
                    <p className="flex items-start gap-2">
                      <span className="text-rose-700 mt-1">■</span>
                      <span>
                        <strong>यदि कोई जानबूझकर इन नियमों को तोड़कर हमें तंग करता है तो इसमें हमारी गलती नहीं है।</strong>
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-rose-700 mt-1">■</span>
                      <span>
                        शर्मिंदगी और सम्मान हमारे व्यवहार, शब्दों और कार्यों से मिलता है, न कि शारीरिक अंगों से। ऐसे असुरक्षित गलत काम करने वाले लोगों को अपने व्यवहार पर शर्मिंदा होना चाहिए।
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Callout (from bottom right illustration) */}
              <div
                className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-2xl p-5 md:p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">📢</span>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-amber-300">
                      या फिर ज़ोर से चिल्लाओ!
                    </h3>
                    <p className="text-sm md:text-base text-purple-100 font-medium mt-1">
                      अगर तुम किसी को नहीं बोल सकते या फिर दूर नहीं जा सकते तो शर्मिंदगी महसूस न करें। यह तुम्हारी गलती नहीं है!
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => speakText("या फिर चिल्लाओ! अगर तुम किसी को नहीं बोल सकते या फिर दूर नहीं जा सकते तो शर्मिंदगी महसूस न करें. यह तुम्हारी गलती नहीं है.")}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                  >
                    🔊 सुनिए
                  </button>
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
          71
        </div>
        <span>व्यक्तिगत शारीरिक सुरक्षा नियम</span>
      </div>
    </div>
  );
}
