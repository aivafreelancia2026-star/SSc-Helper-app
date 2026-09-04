"use client";

import { useState } from "react";
import Image from "next/image";

export function C6HindiCh15Page2() {
  const [showOriginal, setShowOriginal] = useState(false);
  const [trustedNames, setTrustedNames] = useState<string[]>(["", "", ""]);
  const [activeVerse, setActiveVerse] = useState<number | null>(null);

  const poemVerses = [
    {
      hindi: "किताबों में चिड़ियाँ चहचहाती हैं, किताबों में खेतियाँ लहलहाती हैं",
      meaning: "Books bring alive the chirping of birds and the lush green swaying fields.",
    },
    {
      hindi: "किताबों में झरने गुनगुनाते हैं, परियों के किस्से सुनाते हैं।",
      meaning: "Books hum like singing waterfalls and narrate wondrous fairy tales.",
    },
    {
      hindi: "किताबों में रॉकेट का राज़ है, किताबों में साइंस की आवाज़ है",
      meaning: "Books hold the secret mechanics of space rockets and the progressive voice of science.",
    },
    {
      hindi: "किताबों का कितना बड़ा संसार है, किताबों में ज्ञान की भरमार है।",
      meaning: "What a vast world books create, filled with an abundance of endless knowledge.",
    },
    {
      hindi: "क्या तुम इस संसार में, नहीं जाना चाहोगे?",
      meaning: "Wouldn't you love to step inside and explore this magical world?",
    },
    {
      hindi: "किताबें कुछ कहना चाहती हैं, तुम्हारे पास रहना चाहती हैं।",
      meaning: "Books have stories they yearn to tell you; they long to stay by your side.",
    },
  ];

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTrustedNameChange = (index: number, val: string) => {
    const updated = [...trustedNames];
    updated[index] = val;
    setTrustedNames(updated);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      <div className="p-4 md:p-8 pb-4">
        {/* Main Card */}
        <div className="w-full bg-[#fdfbf7] rounded-2xl shadow-xl border-4 border-white mt-4 p-4 md:p-8 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b pb-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl">⚖️</span>
              <div>
                <h1
                  className="text-2xl md:text-4xl font-bold text-amber-950 tracking-wide"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  बाल सुरक्षा कानून एवं कविता
                </h1>
                <p
                  className="text-sm md:text-base text-slate-600 font-medium"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  POCSO अधिनियम-2012, चाइल्डलाइन 1098 एवं सफ़दर हाशमी की कविता ‘किताबें कुछ कहना चाहती हैं...’
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className="px-4 py-2 text-sm font-semibold rounded-xl border-2 border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 transition shadow-sm flex items-center gap-2"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                <span>{showOriginal ? "📝 पाठ देखें" : "🖼️ मूल पाठ्यपुस्तक पृष्ठ"}</span>
              </button>
            </div>
          </div>

          {/* Original textbook scan view toggle */}
          {showOriginal ? (
            <div className="w-full relative rounded-2xl overflow-hidden shadow-inner border-2 border-amber-200 bg-slate-50 min-h-[750px] flex items-center justify-center p-2">
              <div className="relative w-full h-[850px]">
                <Image
                  src="/original_page_72.png"
                  alt="Original textbook page 72 - बाल सुरक्षा कानून व कविता"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {/* TOP SECTION: बाल सुरक्षा कानून */}
              <div className="bg-white border-2 border-[#b5832a] rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between border-b-2 border-amber-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🏛️</span>
                    <h2
                      className="text-2xl md:text-3xl font-bold text-[#7a4e0c]"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      बाल सुरक्षा कानून
                    </h2>
                  </div>
                  <button
                    onClick={() =>
                      speakText(
                        "बाल सुरक्षा कानून. मर्यादा और सुरक्षा भी आपके मौलिक अधिकार हैं. नियमों को तोड़ने वाले उस व्यक्ति के बारे में आप किसी भरोसेमंद वयस्क को बता सकते हैं.",
                      )
                    }
                    className="p-2 rounded-full hover:bg-amber-100 text-amber-800"
                    title="सुनिए (Listen)"
                  >
                    🔊
                  </button>
                </div>

                <div
                  className="space-y-4 text-base md:text-lg text-slate-800 leading-relaxed font-medium"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  <p>
                    <strong>मर्यादा और सुरक्षा भी आपके मौलिक अधिकार हैं।</strong> नियमों को तोड़ने वाले उस व्यक्ति के बारे में आप किसी भरोसेमंद वयस्क को इस तरह बता सकते हैं-
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
                    <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-center gap-2">
                      <span className="text-rose-600 font-bold">■</span>
                      <span className="text-rose-950 font-semibold">वह असुरक्षित ढंग से स्पर्श कर रहा/रही है।</span>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-2">
                      <span className="text-amber-600 font-bold">■</span>
                      <span className="text-amber-950 font-semibold">वह कुछ गलत दिखा रहा/रही है।</span>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl flex items-center gap-2">
                      <span className="text-purple-600 font-bold">■</span>
                      <span className="text-purple-950 font-semibold">अश्लील बातें कर रहा/रही है।</span>
                    </div>
                  </div>

                  <p className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-slate-800">
                    आप तब तक लोगों को बतायें, जब तक कि कोई आपकी बातें सुनकर नियम तोड़ने वाले व्यक्ति को रोकने के लिए कदम न उठाए। गलती उस उत्पीड़क असुरक्षित व्यक्ति की है, जिसने जानबूझकर समाज के नियम तोड़े। उसको उत्तरदायी ठहराया जाना चाहिए। हमारे कानून में ऐसे लोगों के लिए दंड का प्रावधान है।
                  </p>

                  <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl text-slate-900 space-y-2">
                    <p className="font-bold text-blue-900 flex items-center gap-2">
                      <span>📜</span>
                      <span>POCSO अधिनियम-2012 (POCSO Act 2012)</span>
                    </p>
                    <p className="text-sm md:text-base text-blue-950">
                      <strong>POCSO अधिनियम-2012</strong> के तहत सभी वयस्क व्यक्तियों को बच्चे के उत्पीड़न की रिपोर्ट दर्ज करानी चाहिए, ताकि पुलिस उत्पीड़कों के खिलाफ कार्रवाई कर सके। आरोपी को तब तक दोषी माना जाता है जब तक वह अपने आपको निर्दोष साबित नहीं करता/करती है। अधिकांश लोग बच्चों की देखभाल करते हैं और स्वयं वे दूसरों के साथ व्यक्तिगत शारीरिक सुरक्षा नियमों का पालन करते हैं। ऐसे भरोसेमंद ही सुरक्षित व्यक्ति हैं।
                    </p>
                  </div>

                  {/* Trusted People Form */}
                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 mt-4">
                    <h3 className="text-lg md:text-xl font-bold text-emerald-950 flex items-center gap-2 mb-3">
                      <span>🤝</span>
                      <span>मेरे भरोसेमंद व्यक्तियों के नाम (My Trusted Persons):</span>
                    </h3>
                    <p className="text-xs md:text-sm text-emerald-800 mb-3">
                      यहाँ उन वयस्कों के नाम लिखें जिन पर आपको पूरा भरोसा है (जैसे माता, पिता, शिक्षक, दादी, आदि):
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {trustedNames.map((name, i) => (
                        <input
                          key={i}
                          type="text"
                          value={name}
                          onChange={(e) => handleTrustedNameChange(i, e.target.value)}
                          placeholder={`भरोसेमंद व्यक्ति ${i + 1}`}
                          className="px-3 py-2 bg-white border-2 border-emerald-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 shadow-sm"
                          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Childline 1098 Alert Bar */}
                  <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">📞</span>
                      <div>
                        <span className="text-xs uppercase tracking-widest text-red-200 font-bold block">
                          Emergency Helpline for Children
                        </span>
                        <span className="text-xl md:text-2xl font-black">
                          CHILDLINE 1098 (टोल-फ्री नंबर)
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-red-100 text-center sm:text-right max-w-sm">
                      कोई भी बच्चा <strong>CHILDLINE 1098</strong> को फ़ोन करके नियम तोड़ने वाले के खिलाफ शिकायत दर्ज कर सकता है।
                    </p>
                  </div>
                </div>
              </div>

              {/* BOTTOM SECTION: सफ़दर हाशमी की कविता */}
              <div className="bg-white border-2 border-[#a86520] rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-2">
                  <div>
                    <h2
                      className="text-2xl md:text-4xl font-extrabold text-red-600 tracking-wide"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      किताबें कुछ कहना चाहती हैं...
                    </h2>
                    <span
                      className="text-lg md:text-xl font-bold text-pink-600 mt-1 block"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      -सफ़दर हाशमी
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      speakText(
                        poemVerses.map((v) => v.hindi).join(". ")
                      )
                    }
                    className="self-start sm:self-center px-4 py-2 bg-pink-50 text-pink-700 border-2 border-pink-200 rounded-xl font-bold hover:bg-pink-100 transition flex items-center gap-2"
                  >
                    <span>▶️ पूरी कविता सुनें</span>
                  </button>
                </div>

                {/* Poem Verses */}
                <div className="space-y-4">
                  {poemVerses.map((verse, index) => {
                    const isSelected = activeVerse === index;
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setActiveVerse(isSelected ? null : index);
                          speakText(verse.hindi);
                        }}
                        className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                          isSelected
                            ? "bg-pink-50/80 border-pink-300 shadow-md translate-x-1"
                            : "bg-slate-50/60 border-slate-200 hover:bg-amber-50/60"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p
                            className="text-lg md:text-2xl font-bold text-slate-800 leading-relaxed"
                            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                          >
                            {verse.hindi}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakText(verse.hindi);
                            }}
                            className="text-slate-400 hover:text-pink-600 p-1"
                            title="पंक्ति सुनें"
                          >
                            🔊
                          </button>
                        </div>

                        {isSelected && (
                          <p className="mt-2 text-xs md:text-sm text-pink-900 font-medium italic border-t border-pink-200 pt-2">
                            💡 {verse.meaning}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Interactive Reflection Card */}
                <div
                  className="bg-[#fcf3e8] border border-[#e8cb9e] rounded-2xl p-4 text-center"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  <p className="text-base md:text-lg font-bold text-[#8b4513]">
                    📚 “किताबें हमारा सच्चा मित्र हैं जो हमें दुनिया भर का ज्ञान और आनंद देती हैं।”
                  </p>
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
          72
        </div>
        <span>बाल सुरक्षा कानून व कविता</span>
      </div>
    </div>
  );
}
