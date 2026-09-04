"use client";

import { useState } from "react";
import Image from "next/image";

interface OutcomeItem {
  id: number;
  category: string;
  icon: string;
  text: string;
}

const LEARNING_OUTCOMES_PAGE_74: OutcomeItem[] = [
  {
    id: 1,
    category: "ध्वनि व अभिव्यक्ति",
    icon: "👂",
    text: "विभिन्न प्रकार की ध्वनियों जैसे-बारिश, हवा, रेल, बस आदि को सुनने और किसी वस्तु के स्वाद आदि के अनुभव को अपने ढंग से मौखिक/सांकेतिक भाषा में प्रस्तुत करते हैं।",
  },
  {
    id: 2,
    category: "ध्वनि व अभिव्यक्ति",
    icon: "🎵",
    text: "भाषा में निहित ध्वनियों और शब्दों के साथ खेलने का आनंद लेते हैं। जैसे-इन्ना, बिन्ना, तिन्ना।",
  },
  {
    id: 3,
    category: "पठन व प्रिंट जागरूकता",
    icon: "📄",
    text: "प्रिंट (लिखा या छपा हुआ) और गैर-प्रिंट सामग्री (जैसे, चित्र या अन्य ग्राफ़िक्स) में अंतर करते हैं।",
  },
  {
    id: 4,
    category: "पठन व प्रिंट जागरूकता",
    icon: "🔍",
    text: "चित्र के सूक्ष्म और प्रत्यक्ष पहलुओं पर बारीक अवलोकन करते हैं।",
  },
  {
    id: 5,
    category: "मौखिक विमर्श",
    icon: "🗣️",
    text: "देखी, सुनी (अनुभव की) गई बातों, जैसे- स्थानीय सामाजिक घटनाओं, कार्यक्रमों और गतिविधियों पर बेझिझक बात करते हैं, प्रश्न करते हैं और बातचीत को अपने ढंग से आगे बढ़ाते हैं।",
  },
  {
    id: 6,
    category: "मौखिक विमर्श",
    icon: "📻",
    text: "रेडियो, टी.वी., अखबार, इंटरनेट में देखी/सुनी गई खबरों को अपने शब्दों में कहते हैं।",
  },
  {
    id: 7,
    category: "मौखिक विमर्श",
    icon: "💬",
    text: "विभिन्न अवसरों/संदर्भों में कही जा रही दूसरों की बातों को अपने ढंग से बताते हैं/लिखते हैं।",
  },
  {
    id: 8,
    category: "पठन व लिपि ज्ञान",
    icon: "📖",
    text: "पढ़ी कहानी, कविताओं आदि में लिपि चिह्नों/शब्दों/वाक्यों आदि को देखकर और उनकी ध्वनियों को सुनकर, समझकर उनकी पहचान करते हैं।",
  },
  {
    id: 9,
    category: "सामाजिक विविधता",
    icon: "🌍",
    text: "अपने से भिन्न भाषा, खान-पान, रहन-सहन संबंधी विविधताओं पर बातचीत करते हैं।",
  },
  {
    id: 10,
    category: "शब्द जिज्ञासा",
    icon: "✨",
    text: "नए शब्दों के प्रति जिज्ञासा व्यक्त करते हैं।",
  },
  {
    id: 11,
    category: "कला व साहित्य",
    icon: "🎨",
    text: "विविध कलाओं से जुड़ी सामग्री में प्रयुक्त भाषा के प्रति जिज्ञासा व्यक्त करते हुए उसकी सराहना करते हैं।",
  },
  {
    id: 12,
    category: "प्रिंट चेतना",
    icon: "🍬",
    text: "संदर्भ की मदद से आस-पास मौजूद प्रिंट के अर्थ और उद्देश्य का अनुमान लगाते हैं, जैसे- टॉफी के cover पर लिखे नाम को ‘टॉफी’ या ‘चॉकलेट’ बताना।",
  },
  {
    id: 13,
    category: "प्रिंट चेतना",
    icon: "👉",
    text: "प्रिंट (लिखा या छपा हुआ) मौजूद अक्षर, शब्द और वाक्य की इकाइयों को पहचानते हैं, जैसे- ‘मेरा नाम विमला है।’ बताओ, यह कहाँ लिखा हुआ है?/ इसमें नाम कहाँ लिखा हुआ है? / ‘नाम’ में ‘म’ पर अँगुली रखो।",
  },
  {
    id: 14,
    category: "पठन कौशल",
    icon: "📑",
    text: "परिचित/अपरिचित लिखित सामग्री (जैसे:- मिड-डे मील का चार्ट, अपना नाम, कक्षा का नाम, मनपसंद किताब का शीर्षक आदि) में रुचि दिखाते हैं, बातचीत करते हैं और अर्थ की खोज में विभिन्न प्रकार की युक्तियों का इस्तेमाल करते हैं, जैसे- केवल चित्रों या चित्रों और प्रिंट की मदद से अनुमान लगाना, अक्षर-ध्वनि संबंध का इस्तेमाल करना, शब्दों को पहचानना, पूर्व अनुभवों और जानकारी का इस्तेमाल करते हुए अनुमान लगाना आदि।",
  },
  {
    id: 15,
    category: "वर्णमाला ज्ञान",
    icon: "🔤",
    text: "हिंदी के वर्णमाला के अक्षरों की आकृति और ध्वनियाँ पहचानते हैं।",
  },
  {
    id: 16,
    category: "लेखन विकास",
    icon: "✏️",
    text: "लिखना सीखने की प्रक्रिया के दौरान अपने विकासात्मक स्तर के अनुसार चित्रों, आड़ी-तिरछी रेखाओं (कीरम-काटे) अक्षर-आकृतियों, स्व-वर्तनी (इनवेंटिड स्पैलिंग) और स्व-नियंत्रित लेखन (कनवेंशलोतो राइटिंग) के माध्यम से सुनी हुई और अपने मन की बातों को अपने तरीके से लिखने का प्रयास करते हैं।",
  },
];

export function C6HindiCh16Page2() {
  const [showOriginal, setShowOriginal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [achievedOutcomes, setAchievedOutcomes] = useState<Record<number, boolean>>({});

  const categories = ["all", ...new Set(LEARNING_OUTCOMES_PAGE_74.map((o) => o.category))];

  const filteredOutcomes = LEARNING_OUTCOMES_PAGE_74.filter((item) => {
    const matchesSearch = item.text.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleAchieved = (id: number) => {
    setAchievedOutcomes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const achievedCount = Object.values(achievedOutcomes).filter(Boolean).length;
  const progressPercent = Math.round(
    (achievedCount / LEARNING_OUTCOMES_PAGE_74.length) * 100,
  );

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      <div className="p-4 md:p-8 pb-4">
        {/* Main Card */}
        <div className="w-full bg-[#fdfdfc] rounded-2xl shadow-xl border-4 border-white mt-4 p-4 md:p-8 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b pb-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl">🎯</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#5ea83b] text-white text-xs md:text-sm font-bold px-3 py-0.5 rounded-md">
                    सीखने की प्रतिफल
                  </span>
                  <span className="bg-pink-100 text-pink-700 text-xs md:text-sm font-bold px-3 py-0.5 rounded-md">
                    हिंदी • कक्षा छठवीं
                  </span>
                </div>
                <h1
                  className="text-2xl md:text-4xl font-bold text-slate-800 tracking-wide"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  अधिगम प्रतिफल (Learning Outcomes)
                </h1>
                <p
                  className="text-sm md:text-base text-slate-600 font-medium"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  कक्षा 6 हिंदी के पठन-पाठन उपरांत विद्यार्थियों की अर्जित भाषाई क्षमताएँ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className="px-4 py-2 text-sm font-semibold rounded-xl border-2 border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition shadow-sm flex items-center gap-2"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                <span>{showOriginal ? "📝 प्रतिफल सूची" : "🖼️ मूल पाठ्यपुस्तक पृष्ठ"}</span>
              </button>
            </div>
          </div>

          {/* Original textbook scan view toggle */}
          {showOriginal ? (
            <div className="w-full relative rounded-2xl overflow-hidden shadow-inner border-2 border-emerald-200 bg-slate-50 min-h-[750px] flex items-center justify-center p-2">
              <div className="relative w-full h-[850px]">
                <Image
                  src="/original_page_74.png"
                  alt="Original textbook page 74 - सीखने की प्रतिफल"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Top Banner with Title */}
              <div className="flex items-center justify-between bg-[#f4faee] border border-[#a2d887] p-4 rounded-2xl">
                <div>
                  <h2
                    className="text-2xl md:text-3xl font-extrabold text-pink-600"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    बच्चे...
                  </h2>
                  <p
                    className="text-xs md:text-sm text-slate-600 font-medium mt-0.5"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    कक्षा 6 के स्तर पर बच्चे निम्नलिखित भाषाई व संज्ञानात्मक दक्षताओं का प्रदर्शन करते हैं:
                  </p>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-xs text-slate-500 font-bold block">दक्षता आकलन</span>
                  <span className="text-lg font-bold text-emerald-800">
                    {achievedCount} / {LEARNING_OUTCOMES_PAGE_74.length} अर्जित
                  </span>
                </div>
              </div>

              {/* Progress & Filter Bar */}
              <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="प्रतिफल खोजें..."
                      className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    />
                    <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
                  </div>

                  <div className="w-full sm:w-64 flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                      <span>अधिगम प्रगति</span>
                      <span className="text-emerald-700">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3 py-1 rounded-full font-semibold transition ${
                        selectedCategory === cat
                          ? "bg-emerald-700 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      {cat === "all" ? "सभी प्रतिफल" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes List */}
              <div className="space-y-3">
                {filteredOutcomes.map((item) => {
                  const isAchieved = !!achievedOutcomes[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                        isAchieved
                          ? "bg-emerald-50/70 border-emerald-300 shadow-sm"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <input
                          type="checkbox"
                          id={`outcome-${item.id}`}
                          checked={isAchieved}
                          onChange={() => toggleAchieved(item.id)}
                          className="mt-1 h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />

                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor={`outcome-${item.id}`}
                            className={`text-sm md:text-base leading-relaxed cursor-pointer select-none ${
                              isAchieved
                                ? "text-emerald-950 font-semibold"
                                : "text-slate-800 font-medium"
                            }`}
                            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                          >
                            <span className="inline-block mr-2 font-bold text-slate-400">
                              {item.id}.
                            </span>
                            {item.text}
                          </label>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                              <span>{item.icon}</span>
                              <span>{item.category}</span>
                            </span>
                            {isAchieved && (
                              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                                ✓ दक्षता प्राप्त
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => speakText(item.text)}
                        className="text-slate-400 hover:text-emerald-600 p-1.5 rounded-full hover:bg-slate-100 transition shrink-0"
                        title="सुनिए (Listen)"
                      >
                        🔊
                      </button>
                    </div>
                  );
                })}
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
          74
        </div>
        <span>सीखने की प्रतिफल</span>
      </div>
    </div>
  );
}
