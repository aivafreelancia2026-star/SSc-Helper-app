"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PracticeRow {
  sNo: number;
  chapterTitle: string;
  chapterNo: number;
  readerPage: number;
  sunoBolo: string[];
  padho: string[];
  likho: string[];
}

const PRACTICE_TABLE_PAGE_70: PracticeRow[] = [
  {
    sNo: 7,
    chapterTitle: "मैदान",
    chapterNo: 7,
    readerPage: 43,
    sunoBolo: ["बातचीत के प्रश्न"],
    padho: [
      "अलग-अलग चिह्नों से शब्द पहचानना",
      "चित्र देखकर शब्द पढ़ना",
      "जोड़ी बनाना",
      "शब्दों के अंतर पहचानना",
    ],
    likho: [
      "मात्रा जोड़कर लिखना",
      "जोड़ी बनाना",
      "रिक्त स्थान भरना",
      "अक्षरों व मात्राओं से शब्द बनाना",
      "चित्र बनाकर रंग भरना और नाम लिखना",
    ],
  },
  {
    sNo: 8,
    chapterTitle: "बाल दिवस",
    chapterNo: 8,
    readerPage: 49,
    sunoBolo: ["बातचीत के प्रश्न"],
    padho: [
      "अलग-अलग चिह्नों से शब्द पहचानना",
      "चित्र देखकर शब्द पढ़ना",
      "शब्द पढ़ना व समझना",
    ],
    likho: [
      "मात्रा जोड़कर लिखना",
      "रिक्त स्थान भरना",
      "चित्र बनाकर रंग भरना",
      "उसके बारे में लिखना",
    ],
  },
  {
    sNo: 9,
    chapterTitle: "चुक्की और जब्बार",
    chapterNo: 10,
    readerPage: 59,
    sunoBolo: ["बातचीत के प्रश्न"],
    padho: [
      "प्रश्न-उत्तर",
      "द्वित्वाक्षर शब्द ढूँढ़ना",
      "शब्द पढ़ना",
    ],
    likho: [
      "रिक्त स्थान भरना",
      "अक्षरों व मात्राओं से शब्द बनाना",
      "प्रश्न-उत्तर",
      "चित्र के बारे में लिखना",
    ],
  },
  {
    sNo: 10,
    chapterTitle: "खुशियों की दुनिया",
    chapterNo: 9,
    readerPage: 53,
    sunoBolo: ["बातचीत के प्रश्न"],
    padho: [
      "चित्र से संबंधित पंक्ति पहचानना",
      "जोड़ी बनाना",
    ],
    likho: [
      "अंकों की जानकारी",
      "प्रश्न-उत्तर",
    ],
  },
  {
    sNo: 11,
    chapterTitle: "उद्यान",
    chapterNo: 11,
    readerPage: 65,
    sunoBolo: ["बातचीत के प्रश्न"],
    padho: [
      "प्रश्न-उत्तर",
      "संयुक्ताक्षर पहचानना",
      "शब्दों के अंतर पहचानना",
      "सही शब्द के नीचे रेखा खींचना",
    ],
    likho: [
      "वर्तनी सुधारना",
      "संयुक्ताक्षर शब्द लिखना",
      "अपने बारे में लिखना",
    ],
  },
  {
    sNo: 12,
    chapterTitle: "बच्चे चले क्रिकेट खेलने",
    chapterNo: 12,
    readerPage: 69,
    sunoBolo: ["बातचीत के प्रश्न"],
    padho: [
      "प्रश्न-उत्तर",
      "शब्दों पर गोला लगाना",
      "शब्दों के अंतर समझना",
      "खेलों के पहचानना",
      "जोड़ी बनाना",
    ],
    likho: [
      "पता करना",
      "संकेतों के आधार पर वाक्य बनाना",
      "वार्तालाप आगे बढ़ाना",
    ],
  },
];

export function C6HindiCh14Page2() {
  const [showOriginal, setShowOriginal] = useState(false);
  const [completedSkills, setCompletedSkills] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [expandedNote, setExpandedNote] = useState<number | null>(null);

  // Compute total skills
  const totalSkills = PRACTICE_TABLE_PAGE_70.reduce(
    (acc, row) => acc + row.sunoBolo.length + row.padho.length + row.likho.length,
    0,
  );

  const completedCount = Object.values(completedSkills).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalSkills) * 100);

  const toggleSkill = (key: string) => {
    setCompletedSkills((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      <div className="p-4 md:p-8 pb-4">
        {/* Main Content Area */}
        <div className="w-full bg-[#fcfbf7] rounded-2xl shadow-xl border-4 border-white mt-4 p-4 md:p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b pb-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl">📊</span>
              <div>
                <h1
                  className="text-2xl md:text-4xl font-bold text-slate-800 tracking-wide"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  अभ्यास तालिका
                </h1>
                <p
                  className="text-sm md:text-base text-slate-600 font-medium"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  पाठ 7 से 12 की अभ्यास दक्षताओं की प्रगति तालिका
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className="px-4 py-2 text-sm font-semibold rounded-xl border-2 border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition shadow-sm flex items-center gap-2"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                <span>{showOriginal ? "📝 तालिका देखें" : "🖼️ मूल पाठ्यपुस्तक पृष्ठ"}</span>
              </button>
            </div>
          </div>

          {/* Original textbook scan view toggle */}
          {showOriginal ? (
            <div className="w-full relative rounded-2xl overflow-hidden shadow-inner border-2 border-emerald-200 bg-slate-50 min-h-[750px] flex items-center justify-center p-2">
              <div className="relative w-full h-[850px]">
                <Image
                  src="/original_page_70.png"
                  alt="Original textbook page 70 - अभ्यास तालिका"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          ) : (
            <>
              {/* Progress Tracker Card */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                  <span
                    className="text-base md:text-lg font-bold text-emerald-900"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    अभ्यास पूर्णता प्रगति (Practice Progress)
                  </span>
                  <span
                    className="text-xs md:text-sm text-slate-600"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    {totalSkills} में से {completedCount} अभ्यास दक्षताओं को पूर्ण किया गया ({progressPercent}%)
                  </span>
                </div>

                <div className="w-full sm:w-64 flex flex-col gap-1.5">
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs font-semibold text-emerald-800">
                    {progressPercent}% पूर्ण
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-300 shadow-sm bg-white">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr
                      className="bg-[#f2f7ec] text-slate-800 text-sm md:text-base font-bold border-b-2 border-slate-300"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      <th className="py-3 px-3 w-16 text-center border-r border-slate-300">
                        क्र. सं.
                      </th>
                      <th className="py-3 px-4 w-44 md:w-52 border-r border-slate-300">
                        पाठ का नाम
                      </th>
                      <th className="py-3 px-4 w-40 md:w-48 border-r border-slate-300">
                        <div className="flex items-center gap-1.5">
                          <span>🗣️</span>
                          <span>सुनो-बोलो</span>
                        </div>
                      </th>
                      <th className="py-3 px-4 w-60 md:w-72 border-r border-slate-300">
                        <div className="flex items-center gap-1.5">
                          <span>📖</span>
                          <span>पढ़ो</span>
                        </div>
                      </th>
                      <th className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span>✍️</span>
                          <span>लिखो</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300 text-sm md:text-base">
                    {PRACTICE_TABLE_PAGE_70.map((row) => {
                      const isNoteOpen = expandedNote === row.sNo;

                      return (
                        <tr
                          key={row.sNo}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          {/* S.No */}
                          <td className="py-4 px-3 text-center font-bold text-slate-700 border-r border-slate-300 align-top">
                            {row.sNo}.
                          </td>

                          {/* Lesson Name with reader link & note button */}
                          <td className="py-4 px-4 font-bold text-slate-900 border-r border-slate-300 align-top">
                            <div className="flex flex-col gap-2">
                              <Link
                                href={`/reader?class=6&subject=Hindi&page=${row.readerPage}`}
                                className="text-base md:text-lg text-emerald-800 hover:text-emerald-600 hover:underline transition-colors"
                                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                                title="पाठ खोलें (Open Lesson)"
                              >
                                {row.chapterTitle}
                              </Link>
                              <span className="text-xs font-normal text-slate-500">
                                पृष्ठ {row.readerPage}
                              </span>

                              <button
                                onClick={() => setExpandedNote(isNoteOpen ? null : row.sNo)}
                                className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 mt-1 underline"
                                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                              >
                                <span>📝 {notes[row.sNo] ? "टिप्पणी देखें" : "टिप्पणी जोड़ें"}</span>
                              </button>

                              {isNoteOpen && (
                                <div className="mt-1 bg-amber-50 p-2 rounded border border-amber-200">
                                  <textarea
                                    value={notes[row.sNo] || ""}
                                    onChange={(e) =>
                                      setNotes((prev) => ({
                                        ...prev,
                                        [row.sNo]: e.target.value,
                                      }))
                                    }
                                    placeholder="अध्यापक/छात्र टिप्पणी..."
                                    rows={2}
                                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded resize-none focus:outline-none focus:border-amber-500"
                                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                                  />
                                </div>
                              )}
                            </div>
                          </td>

                          {/* सुनो-बोलो */}
                          <td className="py-4 px-4 border-r border-slate-300 align-top">
                            <ul className="flex flex-col gap-2">
                              {row.sunoBolo.map((skill, i) => {
                                const key = `${row.sNo}-suno-${i}`;
                                const isChecked = !!completedSkills[key];
                                return (
                                  <li key={i} className="flex items-start gap-2">
                                    <input
                                      type="checkbox"
                                      id={key}
                                      checked={isChecked}
                                      onChange={() => toggleSkill(key)}
                                      className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                    />
                                    <label
                                      htmlFor={key}
                                      className={`text-xs md:text-sm leading-relaxed cursor-pointer select-none ${
                                        isChecked
                                          ? "line-through text-slate-400 font-normal"
                                          : "text-slate-800 font-medium"
                                      }`}
                                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                                    >
                                      {skill}
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                          </td>

                          {/* पढ़ो */}
                          <td className="py-4 px-4 border-r border-slate-300 align-top">
                            <ul className="flex flex-col gap-2">
                              {row.padho.map((skill, i) => {
                                const key = `${row.sNo}-padho-${i}`;
                                const isChecked = !!completedSkills[key];
                                return (
                                  <li key={i} className="flex items-start gap-2">
                                    <input
                                      type="checkbox"
                                      id={key}
                                      checked={isChecked}
                                      onChange={() => toggleSkill(key)}
                                      className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                    />
                                    <label
                                      htmlFor={key}
                                      className={`text-xs md:text-sm leading-relaxed cursor-pointer select-none ${
                                        isChecked
                                          ? "line-through text-slate-400 font-normal"
                                          : "text-slate-800 font-medium"
                                      }`}
                                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                                    >
                                      {skill}
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                          </td>

                          {/* लिखो */}
                          <td className="py-4 px-4 align-top">
                            <ul className="flex flex-col gap-2">
                              {row.likho.map((skill, i) => {
                                const key = `${row.sNo}-likho-${i}`;
                                const isChecked = !!completedSkills[key];
                                return (
                                  <li key={i} className="flex items-start gap-2">
                                    <input
                                      type="checkbox"
                                      id={key}
                                      checked={isChecked}
                                      onChange={() => toggleSkill(key)}
                                      className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                    />
                                    <label
                                      htmlFor={key}
                                      className={`text-xs md:text-sm leading-relaxed cursor-pointer select-none ${
                                        isChecked
                                          ? "line-through text-slate-400 font-normal"
                                          : "text-slate-800 font-medium"
                                      }`}
                                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                                    >
                                      {skill}
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
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
          70
        </div>
        <span>अभ्यास तालिका</span>
      </div>
    </div>
  );
}
