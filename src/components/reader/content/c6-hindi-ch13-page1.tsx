"use client";

import { useState } from "react";
import Image from "next/image";

interface WordEntry {
  word: string;
  telugu: string;
  english: string;
  sentence: string;
  highlight: string;
}

const VOCABULARY_PAGE_66: WordEntry[] = [
  { word: "अंडा", telugu: "గుడ్డు", english: "Egg", sentence: "मुर्गी अंडा देती है।", highlight: "अंडा" },
  { word: "अख़बार", telugu: "వార్తా పత్రిక", english: "Newspaper", sentence: "हर दिन अख़बार पढ़ना चाहिए।", highlight: "अख़बार" },
  { word: "अच्छा", telugu: "మంచి", english: "Good", sentence: "रामू अच्छा लड़का है।", highlight: "अच्छा" },
  { word: "अध्यापक", telugu: "ఉపాధ్యాయుడు", english: "Teacher", sentence: "अध्यापक पढ़ाते हैं।", highlight: "अध्यापक" },
  { word: "अनार", telugu: "దానిమ్మ పండు", english: "Pomegranate", sentence: "यह अनार का पेड़ है।", highlight: "अनार" },
  { word: "आम", telugu: "మామిడిపండు", english: "Mango", sentence: "आम फलों का राजा है।", highlight: "आम" },
  { word: "आनंद", telugu: "ఆనందం", english: "Happy", sentence: "खेलने से आनंद मिलता है।", highlight: "आनंद" },
  { word: "आस-पास", telugu: "చుట్టుప్రక్కల", english: "Surrounding", sentence: "पाठशाला के आस-पास कई पेड़ हैं।", highlight: "आस-पास" },
  { word: "इमली", telugu: "చింతపండు", english: "Tamarind", sentence: "इमली खट्टी होती है।", highlight: "इमली" },
  { word: "ईख", telugu: "చెరకు", english: "Sugarcane", sentence: "ईख मीठी होती है।", highlight: "ईख" },
  { word: "उद्यान", telugu: "తోట", english: "Garden", sentence: "उद्यान में तरह-तरह के पेड़-पौधे होते हैं।", highlight: "उद्यान" },
  { word: "उषा", telugu: "ఉదయం", english: "Morning", sentence: "उषाकाल में उठना चाहिए।", highlight: "उषाकाल" },
  { word: "ऊन", telugu: "ఉన్ని", english: "Wool", sentence: "ऊन से स्वेटर बनता है।", highlight: "ऊन" },
  { word: "ऋतु", telugu: "ఋతువు", english: "Season", sentence: "ऋतुएँ छह होती हैं।", highlight: "ऋतुएँ" },
  { word: "ऋषभ", telugu: "వృషభం (ఎద్దు)", english: "Ox", sentence: "ऋषभ किसान का साथी है।", highlight: "ऋषभ" },
  { word: "ऋषि", telugu: "ఋషి", english: "Sage", sentence: "ऋषि तपस्या करता है।", highlight: "ऋषि" },
  { word: "एक", telugu: "ఒకటి", english: "One", sentence: "हम सब एक हैं।", highlight: "एक" },
  { word: "कई", telugu: "ఎన్ని", english: "Many", sentence: "आकाश में कई तारे हैं।", highlight: "कई" },
  { word: "कमीज़", telugu: "చొక్కా", english: "Shirt", sentence: "यह कमीज़ कीमती है।", highlight: "कमीज़" },
  { word: "किसान", telugu: "రైతు", english: "Farmer", sentence: "किसान खेत में काम करता है।", highlight: "किसान" },
  { word: "कुत्ता", telugu: "కుక్క", english: "Dog", sentence: "कुत्ता भौं-भौं करता है।", highlight: "कुत्ता" },
  { word: "कृषक", telugu: "రైతు", english: "Farmer", sentence: "कृषक मेहनत करते हैं।", highlight: "कृषक" },
  { word: "खुश", telugu: "సంతోషం", english: "Happy", sentence: "आज राकेश बहुत खुश है।", highlight: "खुश" },
  { word: "खेत", telugu: "పొలము", english: "Field", sentence: "खेत में अनाज उगाते हैं।", highlight: "खेत" },
  { word: "खेल", telugu: "ఆట", english: "Games", sentence: "मैदान में खेल खेलते हैं।", highlight: "खेल" },
  { word: "गाँव", telugu: "ఊరు", english: "Village", sentence: "हमारा गाँव बहुत बड़ा है।", highlight: "गाँव" },
  { word: "गलती", telugu: "తప్పు", english: "Mistake", sentence: "मुझसे गलती हो गई।", highlight: "गलती" },
  { word: "गड्ढा", telugu: "గుంత", english: "Pit", sentence: "रास्ते में गड्ढे हैं।", highlight: "गड्ढे" },
  { word: "गर्मी", telugu: "వేసవి కాలం", english: "Summer", sentence: "गर्मी के मौसम में आम मिलते हैं।", highlight: "गर्मी" },
  { word: "गाड़ी", telugu: "బండి", english: "Vehicle", sentence: "मेरे पास गाड़ी है।", highlight: "गाड़ी" },
  { word: "घड़ी", telugu: "గడియారం", english: "Watch", sentence: "घड़ी में एक बज रहा है।", highlight: "घड़ी" },
  { word: "घर", telugu: "ఇల్లు", english: "House", sentence: "यह मेरा घर है।", highlight: "घर" },
];

export function C6HindiCh13Page1() {
  const [search, setSearch] = useState("");
  const [showOriginal, setShowOriginal] = useState(false);
  const [customSentences, setCustomSentences] = useState<Record<string, string>>({});
  const [expandedWord, setExpandedWord] = useState<string | null>(null);

  const filteredWords = VOCABULARY_PAGE_66.filter(
    (item) =>
      item.word.toLowerCase().includes(search.toLowerCase()) ||
      item.english.toLowerCase().includes(search.toLowerCase()) ||
      item.telugu.includes(search) ||
      item.sentence.includes(search),
  );

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderHighlightedSentence = (sentence: string, highlight: string) => {
    if (!sentence.includes(highlight)) {
      return <span>{sentence}</span>;
    }
    const parts = sentence.split(highlight);
    return (
      <span>
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="font-bold text-amber-700 bg-amber-50 px-1 py-0.5 rounded border border-amber-200">
                {highlight}
              </span>
            )}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      <div className="p-4 md:p-8 pb-4">
        {/* Main Content Area */}
        <div className="w-full bg-[#fcfbf7] rounded-2xl shadow-xl border-4 border-white mt-4 p-4 md:p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b pb-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl">📖</span>
              <div>
                <h1
                  className="text-2xl md:text-4xl font-bold text-slate-800 tracking-wide"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  शब्दकोश (Glossary)
                </h1>
                <p
                  className="text-sm md:text-base text-slate-600 font-medium"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  शब्द, तेलुगु और अंग्रेज़ी अर्थ तथा वाक्य प्रयोग (अंडा – घर)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className="px-4 py-2 text-sm font-semibold rounded-xl border-2 border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 transition shadow-sm flex items-center gap-2"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                <span>{showOriginal ? "📝 शब्दकोश सूची" : "🖼️ मूल पाठ्यपुस्तक पृष्ठ"}</span>
              </button>
            </div>
          </div>

          {/* Original textbook scan view toggle */}
          {showOriginal ? (
            <div className="w-full relative rounded-2xl overflow-hidden shadow-inner border-2 border-amber-200 bg-slate-50 min-h-[750px] flex items-center justify-center p-2">
              <div className="relative w-full h-[850px]">
                <Image
                  src="/original_page_66.png"
                  alt="Original textbook page 66 - शब्दकोश"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          ) : (
            <>
              {/* Search & Stats Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="खोजें... (Search Hindi, English, Telugu)"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500 text-sm"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  />
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
                </div>
                <div
                  className="text-xs md:text-sm font-medium text-slate-500"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  कुल शब्द: <span className="font-bold text-slate-800">{filteredWords.length}</span> / {VOCABULARY_PAGE_66.length}
                </div>
              </div>

              {/* Table / List View */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr
                      className="bg-[#f0f4ea] text-slate-800 text-sm md:text-base font-bold border-b border-slate-300"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      <th className="py-3 px-3 md:px-4 w-12 text-center">क्र.</th>
                      <th className="py-3 px-3 md:px-4 w-32 md:w-36">शब्द (Word)</th>
                      <th className="py-3 px-3 md:px-4 w-52 md:w-64">अर्थ (Telugu & English)</th>
                      <th className="py-3 px-3 md:px-4">वाक्य प्रयोग (Sentence)</th>
                      <th className="py-3 px-2 md:px-3 w-16 text-center">ध्वनि</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm md:text-base">
                    {filteredWords.map((item, index) => {
                      const isExpanded = expandedWord === item.word;
                      return (
                        <tr
                          key={item.word}
                          className={`hover:bg-amber-50/50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                          }`}
                        >
                          {/* S.No */}
                          <td className="py-3 px-3 md:px-4 text-center text-slate-400 text-xs md:text-sm font-medium">
                            {index + 1}
                          </td>

                          {/* Hindi Word */}
                          <td className="py-3 px-3 md:px-4 font-bold text-slate-900">
                            <span
                              className="text-base md:text-lg text-emerald-800 font-bold hover:text-emerald-600 cursor-pointer"
                              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                              onClick={() => speakText(item.word)}
                              title="सुनने के लिए क्लिक करें"
                            >
                              {item.word}
                            </span>
                          </td>

                          {/* Meaning: Telugu & English */}
                          <td className="py-3 px-3 md:px-4">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-slate-800 font-semibold">{item.telugu}</span>
                              <span className="text-xs md:text-sm text-slate-500 italic">
                                = {item.english}
                              </span>
                            </div>
                          </td>

                          {/* Sentence */}
                          <td className="py-3 px-3 md:px-4 text-slate-700">
                            <div className="flex flex-col gap-1.5">
                              <div
                                className="cursor-pointer hover:text-slate-900 leading-relaxed"
                                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                                onClick={() => speakText(item.sentence)}
                                title="वाक्य सुनने के लिए क्लिक करें"
                              >
                                {renderHighlightedSentence(item.sentence, item.highlight)}
                              </div>

                              {/* Student Practice Accordion Toggle */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    setExpandedWord(isExpanded ? null : item.word)
                                  }
                                  className="text-xs text-amber-700 hover:text-amber-800 font-medium underline underline-offset-2 flex items-center gap-1"
                                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                                >
                                  <span>✍️ अपना वाक्य लिखें</span>
                                </button>
                                {customSentences[item.word] && (
                                  <span className="text-xs text-emerald-600 font-semibold">✓ लिखा हुआ</span>
                                )}
                              </div>

                              {isExpanded && (
                                <div className="mt-2 bg-amber-50/70 p-3 rounded-lg border border-amber-200">
                                  <label
                                    className="text-xs font-semibold text-slate-600 block mb-1"
                                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                                  >
                                    ‘{item.word}’ शब्द से अपना वाक्य बनाइए:
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={customSentences[item.word] || ""}
                                      onChange={(e) =>
                                        setCustomSentences((prev) => ({
                                          ...prev,
                                          [item.word]: e.target.value,
                                        }))
                                      }
                                      placeholder="यहाँ वाक्य टाइप करें..."
                                      className="flex-1 px-3 py-1 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-amber-500"
                                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Sound button */}
                          <td className="py-3 px-2 md:px-3 text-center">
                            <button
                              onClick={() => speakText(`${item.word}. ${item.sentence}`)}
                              className="p-1.5 rounded-full hover:bg-emerald-100 text-emerald-700 transition"
                              title="सुनिए (Listen)"
                            >
                              🔊
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
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
          66
        </div>
        <span>शब्दकोश</span>
      </div>
    </div>
  );
}
