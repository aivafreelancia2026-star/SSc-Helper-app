"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const DISCUSSION_QUESTIONS = [
  {
    id: "q1",
    question: "1. चित्र में क्या-क्या हैं?",
    modelAnswer: "चित्र में आम, पेड़, अनार, और बच्चे हैं।",
    keywords: ["आम", "पेड़", "अनार", "बच्चे", "लड़की", "औरत"],
  },
  {
    id: "q2",
    question: "2. तुम्हें कौन-सा फल पसंद है? क्यों?",
    modelAnswer: "मुझे आम पसंद है क्योंकि यह बहुत मीठा होता है।",
    keywords: [],
    isPersonal: true,
  },
];

// Words from the poem for the "Find and circle" activity
const POEM_WORDS = [
  { word: "एक", type: "other" },
  { word: "छोटी", type: "other" },
  { word: "सी", type: "other" },
  { word: "लड़की", type: "other" },
  { word: "देख", type: "other" },
  { word: "रही", type: "other" },
  { word: "थी", type: "other" },
  { word: "टोकरी", type: "other" },
  { word: "टोकरी", type: "other" },
  { word: "में", type: "other" },
  { word: "क्या", type: "aa-matra" }, // 'या' has aa matra
  { word: "हैं?", type: "other" },
  { word: "अनार", type: "anar" }, // 'ना' has aa matra, but specific word "अनार"
  { word: "हैं", type: "other" },
  { word: "या", type: "aa-matra" }, // aa matra
  { word: "आम?", type: "aam" }, // 'आ' has aa matra, but specific word "आम"
  { word: "दिखने", type: "other" },
  { word: "में", type: "other" },
  { word: "हैं", type: "other" },
  { word: "पीले-पीले,", type: "other" },
  { word: "नाम", type: "aa-matra" }, // 'ना' has aa matra
  { word: "इसका", type: "aa-matra" }, // 'का' has aa matra
  { word: "आम", type: "aam" },
  { word: "है।", type: "other" },
];

export function C6HindiCh1Page2() {
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const { addPoints } = useScore();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [evaluated, setEvaluated] = useState<Record<string, boolean>>({});
  const [activeQuestion, setActiveQuestion] = useState<string | null>("q1");
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number; label?: string } | null>(null);
  
  // Interactive reading states
  const [foundWords, setFoundWords] = useState<Set<number>>(new Set());
  const [tableClicks, setTableClicks] = useState<Set<string>>(new Set());

  // Load answers from localStorage on mount
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem("c6-hindi-ch1-p2-answers");
      const savedEvaluated = localStorage.getItem("c6-hindi-ch1-p2-evaluated");
      const savedWords = localStorage.getItem("c6-hindi-ch1-p2-words");
      const savedTable = localStorage.getItem("c6-hindi-ch1-p2-table");
      
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
      if (savedEvaluated) setEvaluated(JSON.parse(savedEvaluated));
      if (savedWords) setFoundWords(new Set(JSON.parse(savedWords)));
      if (savedTable) setTableClicks(new Set(JSON.parse(savedTable)));
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  function handleAnswerSubmit(q: typeof DISCUSSION_QUESTIONS[0]) {
    const text = answers[q.id] || "";
    const trimmed = text.trim();
    if (!trimmed) {
      setFeedback({ correct: false, id: Date.now() });
      return;
    }

    let correct = false;
    if (q.isPersonal && trimmed.length >= 3) {
      correct = true;
    } else {
      const lower = trimmed.toLowerCase();
      correct = q.keywords.some((kw) => lower.includes(kw.toLowerCase())) || trimmed.length >= 4;
    }

    if (correct) {
      const alreadyScored = evaluated[q.id];
      if (!alreadyScored) {
        addPoints(1);
        const nextEvaluated = { ...evaluated, [q.id]: true };
        setEvaluated(nextEvaluated);
        try {
          localStorage.setItem("c6-hindi-ch1-p2-evaluated", JSON.stringify(nextEvaluated));
        } catch {}
      }
      setFeedback({ correct: true, id: Date.now(), label: "सही उत्तर! +1 ⭐" });
    } else {
      setFeedback({ correct: false, id: Date.now() });
    }
  }

  function handleTextChange(id: string, text: string) {
    const nextAnswers = { ...answers, [id]: text };
    setAnswers(nextAnswers);
    try {
      localStorage.setItem("c6-hindi-ch1-p2-answers", JSON.stringify(nextAnswers));
    } catch {}
  }

  function toggleWord(index: number, type: string) {
    const newFound = new Set(foundWords);
    if (newFound.has(index)) {
      newFound.delete(index);
    } else {
      newFound.add(index);
      // Give a point if they found a valid target word
      if (type !== "other") {
        setFeedback({ correct: true, id: Date.now(), label: "सही पहचाना! 👏" });
      } else {
        setFeedback({ correct: false, id: Date.now() });
      }
    }
    setFoundWords(newFound);
    try {
      localStorage.setItem("c6-hindi-ch1-p2-words", JSON.stringify(Array.from(newFound)));
    } catch {}
  }

  function toggleTableCell(id: string) {
    const newTableClicks = new Set(tableClicks);
    if (newTableClicks.has(id)) {
      newTableClicks.delete(id);
    } else {
      newTableClicks.add(id);
    }
    setTableClicks(newTableClicks);
    try {
      localStorage.setItem("c6-hindi-ch1-p2-table", JSON.stringify(Array.from(newTableClicks)));
    } catch {}
  }

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          label={feedback.label}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* Header with QR */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-1.5 rounded-xl border-2 border-gray-300 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm">
          <span>📱 QR:</span>
          <span className="font-mono text-lg tracking-wider text-black">R6A5Y7</span>
        </div>
      </div>

      {/* Section: सुनो-बोलो */}
      <div className="rounded-3xl border border-green-200 bg-green-50/50 p-5 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-200 text-2xl shadow-inner">
            🗣️
          </div>
          <h2
            className="font-heading text-2xl font-bold text-green-900 bg-green-200/50 px-4 py-1 rounded-xl"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            सुनो-बोलो
          </h2>
          <div className="ml-auto text-4xl animate-bounce">
            🥭
          </div>
        </div>

        <div className="space-y-4">
          {DISCUSSION_QUESTIONS.map((q, i) => {
            const isScored = evaluated[q.id];
            const currentAnswer = answers[q.id] || "";
            const isExpanded = activeQuestion === q.id;

            return (
              <div
                key={q.id}
                className={`rounded-2xl border overflow-hidden shadow-sm transition-all duration-200 ${
                  isScored
                    ? "border-green-300 bg-green-100/50"
                    : "border-green-200 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveQuestion(isExpanded ? null : q.id)}
                  className="w-full px-4 py-3 flex items-start gap-3 text-left hover:bg-green-50 transition-colors"
                >
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5 ${
                      isScored ? "bg-green-500 text-white" : "bg-green-200 text-green-800"
                    }`}
                  >
                    {isScored ? "✓" : i + 1}
                  </span>
                  <div className="flex-1">
                    <p
                      className="text-base font-semibold text-green-950"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      {q.question}
                    </p>
                  </div>
                  <span className="text-green-800/50 text-xs mt-1">
                    {isExpanded ? "▲" : "▼"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-green-100 space-y-3 pt-3">
                    <textarea
                      value={currentAnswer}
                      onChange={(e) => handleTextChange(q.id, e.target.value)}
                      placeholder="अपना उत्तर यहाँ हिंदी में लिखें…"
                      rows={2}
                      className="w-full rounded-xl border border-green-200 bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-green-500 focus:outline-none resize-none shadow-sm"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAnswerSubmit(q)}
                        disabled={!currentAnswer.trim()}
                        className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all shadow-sm ${
                          currentAnswer.trim()
                            ? "bg-green-600 text-white hover:opacity-90 active:scale-95"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      >
                        ✓ जाँचें
                      </button>
                    </div>
                    {isUrlRevealed && (
                      <div className="mt-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-900 border border-amber-200">
                        <span className="font-bold">💡 आदर्श उत्तर: </span>
                        {q.modelAnswer}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section: पढ़ो */}
      <div className="rounded-3xl border border-orange-200 bg-orange-50/30 p-5 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-200 text-2xl shadow-inner">
            📖
          </div>
          <h2
            className="font-heading text-2xl font-bold text-orange-900 bg-orange-200/50 px-4 py-1 rounded-xl"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            पढ़ो
          </h2>
        </div>

        {/* Activity A & B combined in interactive format */}
        <div className="rounded-2xl bg-white border border-orange-100 p-4 shadow-sm space-y-4">
          <div className="space-y-2 text-orange-900 font-medium text-base" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            <p>(अ) गीत में ‘आ - ा’ मात्रा वाले शब्दों पर <span className="inline-block border-2 border-red-500 rounded-full w-5 h-5 align-middle"></span> लगाइए।</p>
            <p>(आ) ‘<span className="text-red-600 font-bold">अनार</span>’ शब्द पर <span className="inline-block border-2 border-blue-500 rounded-full w-5 h-5 align-middle"></span> और ‘<span className="text-pink-600 font-bold">आम</span>’ शब्द पर <span className="inline-block border-2 border-green-500 w-5 h-5 align-middle"></span> लगाइए।</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 text-center leading-loose">
            <p className="text-xs text-orange-600 mb-3 font-semibold text-left">👆 शब्दों पर क्लिक करके उन्हें पहचानें:</p>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-3" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: "1.1rem" }}>
              {POEM_WORDS.map((w, idx) => {
                let decorationClass = "";
                if (foundWords.has(idx)) {
                  if (w.type === "aa-matra") decorationClass = "border-2 border-red-500 rounded-full px-1 bg-red-50";
                  else if (w.type === "anar") decorationClass = "border-2 border-blue-500 rounded-full px-1 text-red-700 bg-blue-50";
                  else if (w.type === "aam") decorationClass = "border-2 border-green-500 px-1 text-pink-700 bg-green-50";
                  else decorationClass = "bg-gray-200 opacity-50 px-1 rounded"; // Wrong guess
                }

                // Auto-reveal
                if (isUrlRevealed && !foundWords.has(idx) && w.type !== "other") {
                  if (w.type === "aa-matra") decorationClass = "border-2 border-red-500 border-dashed rounded-full px-1";
                  else if (w.type === "anar") decorationClass = "border-2 border-blue-500 border-dashed rounded-full px-1 text-red-700";
                  else if (w.type === "aam") decorationClass = "border-2 border-green-500 border-dashed px-1 text-pink-700";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => toggleWord(idx, w.type)}
                    className={`transition-all hover:bg-orange-100 py-1 ${decorationClass}`}
                  >
                    {w.word}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sentences with images */}
        <div className="grid grid-cols-2 gap-6 pt-4">
          {/* Box 1: Anar */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-6xl shadow-inner border border-red-100">
              🍎
            </div>
            <p className="text-2xl font-medium text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              यह अनार है।
            </p>
          </div>

          {/* Box 2: Aam */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center text-6xl shadow-inner border border-yellow-100">
              🥭
            </div>
            <p className="text-2xl font-medium text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              यह आम है।
            </p>
          </div>

          {/* Box 3: Mango Tree */}
          <div className="flex flex-col items-center gap-3 mt-4">
            <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center text-7xl shadow-inner border border-green-100">
              🌳
            </div>
            <p className="text-2xl font-medium text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              यह आम का पेड़ है।
            </p>
          </div>

          {/* Box 4: Pomegranate seeds */}
          <div className="flex flex-col items-center gap-3 mt-4">
            <div className="w-28 h-28 bg-red-50 rounded-full flex items-center justify-center text-6xl shadow-inner border border-red-100">
              <span className="relative">
                🍎
                <span className="absolute -bottom-2 -right-2 text-2xl">🔴</span>
                <span className="absolute -bottom-1 -left-1 text-xl">🔴</span>
              </span>
            </div>
            <p className="text-2xl font-medium text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              अनार के दाने लाल हैं।
            </p>
          </div>
        </div>

        {/* Activity E: Character table */}
        <div className="pt-8 space-y-4">
          <p className="text-base text-orange-900 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            (इ) चित्र देखिए। शब्द पढ़िए। इन्हें वर्णमाला चार्ट में पहचानकर &apos;<span className="inline-block border-2 border-gray-600 rounded-full w-4 h-4 align-middle"></span>&apos; लगाइए।
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
            <div className="text-6xl">🍎</div>
            
            <div className="border-2 border-amber-700 rounded-lg overflow-hidden flex-1 max-w-md">
              {/* Header row */}
              <div className="flex text-center border-b-2 border-amber-700 bg-amber-50">
                <div className="flex-1 py-2 text-2xl border-r-2 border-amber-700 font-bold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>अनार</div>
                <div className="flex-1 py-2 text-2xl font-bold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>आम</div>
              </div>
              
              {/* Row 1: Syllables */}
              <div className="flex text-center border-b-2 border-amber-700">
                <div className="flex-[0.5] py-3 text-2xl border-r-2 border-amber-700 cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => toggleTableCell("r1-1")}>
                  <span className={tableClicks.has("r1-1") ? "border-2 border-blue-500 rounded-full px-2" : ""}>अ</span>
                </div>
                <div className="flex-[0.5] py-3 text-2xl border-r-2 border-amber-700 cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => toggleTableCell("r1-2")}>
                  <span className={tableClicks.has("r1-2") ? "border-2 border-blue-500 rounded-full px-2" : ""}>ना</span>
                </div>
                <div className="flex-[0.5] py-3 text-2xl border-r-2 border-amber-700 cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => toggleTableCell("r1-3")}>
                  <span className={tableClicks.has("r1-3") ? "border-2 border-blue-500 rounded-full px-2" : ""}>र</span>
                </div>
                <div className="flex-[0.75] py-3 text-2xl border-r-2 border-amber-700 cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => toggleTableCell("r1-4")}>
                  <span className={tableClicks.has("r1-4") ? "border-2 border-blue-500 rounded-full px-2" : ""}>आ</span>
                </div>
                <div className="flex-[0.75] py-3 text-2xl cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => toggleTableCell("r1-5")}>
                  <span className={tableClicks.has("r1-5") ? "border-2 border-blue-500 rounded-full px-2" : ""}>म</span>
                </div>
              </div>

              {/* Row 2: Letters & Matra */}
              <div className="flex text-center">
                <div className="flex-[0.5] py-3 text-2xl border-r-2 border-amber-700 cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => toggleTableCell("r2-1")}>
                  <span className={tableClicks.has("r2-1") ? "border-2 border-blue-500 rounded-full px-2" : ""}>अ</span>
                </div>
                <div className="flex-[0.5] py-3 text-2xl border-r-2 border-amber-700 cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => toggleTableCell("r2-2")}>
                  <span className={tableClicks.has("r2-2") ? "border-2 border-blue-500 rounded-full px-2" : ""}>न</span>
                </div>
                <div className="flex-[0.5] py-3 text-2xl border-r-2 border-amber-700 text-red-600 font-bold cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => toggleTableCell("r2-3")}>
                  <span className={tableClicks.has("r2-3") ? "border-2 border-blue-500 rounded-full px-2" : ""}>ा</span>
                </div>
                <div className="flex-[0.5] py-3 text-2xl border-r-2 border-amber-700 cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => toggleTableCell("r2-4")}>
                  <span className={tableClicks.has("r2-4") ? "border-2 border-blue-500 rounded-full px-2" : ""}>र</span>
                </div>
                <div className="flex-[0.75] py-3 text-2xl border-r-2 border-amber-700 cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => toggleTableCell("r2-5")}>
                  <span className={tableClicks.has("r2-5") ? "border-2 border-blue-500 rounded-full px-2" : ""}>आ</span>
                </div>
                <div className="flex-[0.75] py-3 text-2xl cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => toggleTableCell("r2-6")}>
                  <span className={tableClicks.has("r2-6") ? "border-2 border-blue-500 rounded-full px-2" : ""}>म</span>
                </div>
              </div>
            </div>

            <div className="text-6xl animate-bounce">🥭</div>
          </div>
        </div>

      </div>

      {/* Footer info matching the book */}
      <div className="flex justify-between items-center text-xs text-foreground/40 pt-4 border-t border-border/30">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          छात्रों की प्रगति हेतु सरकार का उपहार
        </span>
        <span className="font-bold text-foreground/60 bg-gray-200 px-3 py-1 rounded">5</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          आम ले लो आम!
        </span>
      </div>
    </div>
  );
}
