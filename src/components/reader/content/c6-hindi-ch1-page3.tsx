"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const VARNAMALA = [
  ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ"],
  ["ए", "ऐ", "ओ", "औ", "अं", "अः"],
  ["क", "ख", "ग", "घ", "ङ"],
  ["च", "छ", "ज", "झ", "ञ"],
  ["ट", "ठ", "ड", "ढ", "ण", "(ड़", "ढ़)"],
  ["त", "थ", "द", "ध", "न"],
  ["प", "फ", "ब", "भ", "म"],
  ["य", "र", "ल", "व"],
  ["श", "ष", "स", "ह"],
  ["क्ष", "त्र", "ज्ञ", "(श्र)"],
];

const LETTER_MATH_QUESTIONS = [
  { id: "lm1", label: "वर्ण 3 कौन-सा है?", answer: "र", hint: "3 नंबर के ऊपर वाला अक्षर देखें" },
  { id: "lm2", label: "वर्ण 5 कौन-सा है?", answer: "म", hint: "5 नंबर के ऊपर वाला अक्षर देखें" },
  { id: "lm3", label: "वर्ण 1 कौन-सा है?", answer: "अ", hint: "1 नंबर के ऊपर वाला अक्षर देखें" },
  { id: "lm4", label: "वर्ण 2, 5 कौन-से हैं? इन्हें मिलाकर पढ़ो।", answer: "नाम", hint: "ना + म = ?" },
  { id: "lm5", label: "वर्ण 4, 2 कौन-से हैं? इन्हें मिलाकर पढ़ो।", answer: "आना", hint: "आ + ना = ?" },
  { id: "lm6", label: "वर्ण 5, 2 कौन-से हैं? इन्हें मिलाकर पढ़ो।", answer: "मना", hint: "म + ना = ?" },
];

export function C6HindiCh1Page3() {
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const { addPoints } = useScore();

  const [letterMathAnswers, setLetterMathAnswers] = useState<Record<string, string>>({});
  const [tableAnswers, setTableAnswers] = useState<Record<string, string>>({});
  
  const [evaluatedLetterMath, setEvaluatedLetterMath] = useState<Record<string, boolean>>({});
  const [evaluatedTable, setEvaluatedTable] = useState<Record<string, boolean>>({});
  
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number; label?: string } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLMAnswers = localStorage.getItem("c6-hindi-ch1-p3-lm-answers");
      const savedLMEval = localStorage.getItem("c6-hindi-ch1-p3-lm-eval");
      const savedTblAnswers = localStorage.getItem("c6-hindi-ch1-p3-tbl-answers");
      const savedTblEval = localStorage.getItem("c6-hindi-ch1-p3-tbl-eval");
      
      if (savedLMAnswers) setLetterMathAnswers(JSON.parse(savedLMAnswers));
      if (savedLMEval) setEvaluatedLetterMath(JSON.parse(savedLMEval));
      if (savedTblAnswers) setTableAnswers(JSON.parse(savedTblAnswers));
      if (savedTblEval) setEvaluatedTable(JSON.parse(savedTblEval));
    } catch {
      // Ignore
    }
  }, []);

  function handleLetterMathSubmit(id: string, expectedAnswer: string) {
    const userAnswer = (letterMathAnswers[id] || "").trim();
    if (!userAnswer) {
      setFeedback({ correct: false, id: Date.now() });
      return;
    }

    if (userAnswer === expectedAnswer) {
      if (!evaluatedLetterMath[id]) {
        addPoints(1);
        const nextEval = { ...evaluatedLetterMath, [id]: true };
        setEvaluatedLetterMath(nextEval);
        try { localStorage.setItem("c6-hindi-ch1-p3-lm-eval", JSON.stringify(nextEval)); } catch {}
      }
      setFeedback({ correct: true, id: Date.now(), label: "सही उत्तर! ⭐" });
    } else {
      setFeedback({ correct: false, id: Date.now() });
    }
  }

  function handleTableSubmit(id: string, expectedAnswer: string) {
    const userAnswer = (tableAnswers[id] || "").trim();
    if (!userAnswer) {
      setFeedback({ correct: false, id: Date.now() });
      return;
    }

    if (userAnswer === expectedAnswer) {
      if (!evaluatedTable[id]) {
        addPoints(1);
        const nextEval = { ...evaluatedTable, [id]: true };
        setEvaluatedTable(nextEval);
        try { localStorage.setItem("c6-hindi-ch1-p3-tbl-eval", JSON.stringify(nextEval)); } catch {}
      }
      setFeedback({ correct: true, id: Date.now(), label: "सही मात्रा! 👏" });
    } else {
      setFeedback({ correct: false, id: Date.now() });
    }
  }

  function handleLMChange(id: string, value: string) {
    const nextAnswers = { ...letterMathAnswers, [id]: value };
    setLetterMathAnswers(nextAnswers);
    try { localStorage.setItem("c6-hindi-ch1-p3-lm-answers", JSON.stringify(nextAnswers)); } catch {}
  }

  function handleTblChange(id: string, value: string) {
    const nextAnswers = { ...tableAnswers, [id]: value };
    setTableAnswers(nextAnswers);
    try { localStorage.setItem("c6-hindi-ch1-p3-tbl-answers", JSON.stringify(nextAnswers)); } catch {}
  }

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 pb-8">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          label={feedback.label}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* Notebook full of alphabets */}
      <div className="w-full max-w-2xl mx-auto mt-4 rounded-xl overflow-hidden shadow-md flex bg-[#f8f9fa] border-r-2 border-y-2 border-[#e9ecef]">
        {/* Notebook binding styling */}
        <div className="w-12 bg-gradient-to-r from-[#d1d5db] to-[#f3f4f6] border-r border-[#9ca3af] flex flex-col justify-evenly py-4 shrink-0 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.1)]">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-2 w-full flex items-center justify-start pl-2">
              <div className="w-3 h-3 rounded-full bg-[#374151] shadow-sm"></div>
              <div className="h-1 w-6 bg-black/20 rounded-r-full transform -rotate-12 translate-y-1"></div>
            </div>
          ))}
        </div>
        
        {/* Notebook page */}
        <div className="flex-1 bg-white flex flex-col relative px-8 py-10" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)", lineHeight: "32px" }}>
          {/* Vertical red margin line */}
          <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-red-200"></div>
          
          <div className="relative z-10 pl-4 space-y-2 text-2xl font-medium text-center text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", letterSpacing: "0.2em" }}>
            {VARNAMALA.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-4 h-8 items-center">
                {row.map((char, cIdx) => (
                  <span key={cIdx} className="hover:text-blue-600 transition-colors cursor-default min-w-[1.5em] text-center">
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity: Numbered Letters */}
      <div className="rounded-3xl border border-blue-200 bg-blue-50/30 p-5 shadow-sm space-y-6">
        <p className="text-base text-blue-900 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          (ई) वर्ण बोलिए और संख्याओं के अनुसार जोड़कर शब्द बनाइए।
        </p>

        {/* The numbered circles graphic */}
        <div className="relative flex justify-center items-center gap-4 py-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full border-[3px] border-gray-400 flex items-center justify-center text-3xl font-bold text-blue-500 bg-white" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>अ</div>
            <div className="w-12 h-12 rounded-full border-[2px] border-red-500 flex items-center justify-center text-2xl font-bold text-red-500 bg-white shadow-sm">1</div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full border-[3px] border-gray-400 flex items-center justify-center text-3xl font-bold text-blue-500 bg-white" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>ना</div>
            <div className="w-12 h-12 rounded-full border-[2px] border-red-500 flex items-center justify-center text-2xl font-bold text-red-500 bg-white shadow-sm">2</div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full border-[3px] border-gray-400 flex items-center justify-center text-3xl font-bold text-blue-500 bg-white" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>र</div>
            <div className="w-12 h-12 rounded-full border-[2px] border-red-500 flex items-center justify-center text-2xl font-bold text-red-500 bg-white shadow-sm">3</div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full border-[3px] border-red-500 flex items-center justify-center text-3xl font-bold text-red-500 bg-white" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>आ</div>
            <div className="w-12 h-12 rounded-full border-[2px] border-gray-400 flex items-center justify-center text-2xl font-bold text-blue-500 bg-white shadow-sm">4</div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full border-[3px] border-red-500 flex items-center justify-center text-3xl font-bold text-red-500 bg-white" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>म</div>
            <div className="w-12 h-12 rounded-full border-[2px] border-gray-400 flex items-center justify-center text-2xl font-bold text-blue-500 bg-white shadow-sm">5</div>
          </div>

          {/* Example bubble */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 border-2 border-black rounded-full px-4 py-1 text-pink-600 font-bold bg-white text-lg rotate-[-5deg] shadow-md" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            जैसे :- नाम
          </div>
        </div>

        {/* The questions layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-4">
          {LETTER_MATH_QUESTIONS.map((q) => {
            const isEvaluated = evaluatedLetterMath[q.id];
            const value = letterMathAnswers[q.id] || "";
            return (
              <div key={q.id} className="flex items-center justify-between gap-2 p-3 bg-white rounded-xl border border-blue-100 shadow-sm">
                <span className="text-pink-600 font-medium text-base flex-1" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  {q.label}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleLMChange(q.id, e.target.value)}
                    disabled={isEvaluated}
                    className={`w-20 text-center rounded-lg border-2 px-2 py-1 font-bold text-lg outline-none transition-colors ${
                      isEvaluated 
                        ? "border-green-400 bg-green-50 text-green-700" 
                        : "border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white"
                    }`}
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  />
                  {!isEvaluated && (
                    <button
                      onClick={() => handleLetterMathSubmit(q.id, q.answer)}
                      disabled={!value.trim()}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="जाँचें"
                    >
                      ✓
                    </button>
                  )}
                </div>
                {isUrlRevealed && !isEvaluated && (
                  <span className="text-xs font-bold text-emerald-600 ml-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    {q.answer}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Section: लिखो */}
      <div className="rounded-3xl border border-green-200 bg-green-50/50 p-5 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-200 text-2xl shadow-inner">
            ✍️
          </div>
          <h2
            className="font-heading text-2xl font-bold text-green-900 bg-green-200/50 px-4 py-1 rounded-xl"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            लिखो
          </h2>
        </div>

        <p className="text-base text-green-900 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          (अ) मात्रा जोड़िए और लिखिए।
        </p>

        <div className="flex justify-center py-4">
          <div className="inline-block border-2 border-amber-700 rounded-lg overflow-hidden bg-white shadow-sm">
            {/* Header row */}
            <div className="flex text-center border-b-2 border-amber-700 bg-amber-50">
              <div className="w-16 py-3 text-3xl border-r-2 border-amber-700 font-bold text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>आ</div>
              <div className="w-24 py-3 text-lg border-r-2 border-amber-700 bg-gray-50 flex items-center justify-center text-gray-400"></div>
              <div className="w-20 py-3 text-3xl border-r-2 border-amber-700 font-bold text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>न</div>
              <div className="w-20 py-3 text-3xl border-r-2 border-amber-700 font-bold text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>म</div>
              <div className="w-20 py-3 text-3xl font-bold text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>र</div>
            </div>
            
            {/* Row 2: Add Matra */}
            <div className="flex text-center bg-white items-stretch">
              <div className="w-16 py-4 text-4xl border-r-2 border-amber-700 font-bold text-red-500 flex items-center justify-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>ा</div>
              <div className="w-24 py-4 text-xs border-r-2 border-amber-700 text-gray-500 flex items-center justify-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>उदाहरण :</div>
              <div className="w-20 py-4 text-3xl border-r-2 border-amber-700 font-bold text-gray-800 flex items-center justify-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>ना</div>
              
              {/* Input for म + ा */}
              <div className="w-20 p-2 border-r-2 border-amber-700 flex items-center justify-center relative group">
                <input
                  type="text"
                  value={tableAnswers["t1"] || ""}
                  onChange={(e) => handleTblChange("t1", e.target.value)}
                  disabled={evaluatedTable["t1"]}
                  className={`w-full h-full text-center text-3xl font-bold outline-none ${
                    evaluatedTable["t1"] ? "text-green-600 bg-transparent" : "bg-gray-50 hover:bg-gray-100 focus:bg-white rounded"
                  }`}
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                />
                {!evaluatedTable["t1"] && (
                  <button
                    onClick={() => handleTableSubmit("t1", "मा")}
                    disabled={!(tableAnswers["t1"] || "").trim()}
                    className="absolute -bottom-3 right-1 w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✓
                  </button>
                )}
                {isUrlRevealed && !evaluatedTable["t1"] && (
                  <span className="absolute top-0 right-1 text-xs text-emerald-500" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मा</span>
                )}
              </div>

              {/* Input for र + ा */}
              <div className="w-20 p-2 flex items-center justify-center relative group">
                <input
                  type="text"
                  value={tableAnswers["t2"] || ""}
                  onChange={(e) => handleTblChange("t2", e.target.value)}
                  disabled={evaluatedTable["t2"]}
                  className={`w-full h-full text-center text-3xl font-bold outline-none ${
                    evaluatedTable["t2"] ? "text-green-600 bg-transparent" : "bg-gray-50 hover:bg-gray-100 focus:bg-white rounded"
                  }`}
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                />
                {!evaluatedTable["t2"] && (
                  <button
                    onClick={() => handleTableSubmit("t2", "रा")}
                    disabled={!(tableAnswers["t2"] || "").trim()}
                    className="absolute -bottom-3 right-1 w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✓
                  </button>
                )}
                {isUrlRevealed && !evaluatedTable["t2"] && (
                  <span className="absolute top-0 right-1 text-xs text-emerald-500" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>रा</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info matching the book */}
      <div className="flex justify-between items-center text-xs text-foreground/40 pt-4 border-t border-border/30">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          छात्रों की प्रगति हेतु सरकार का उपहार
        </span>
        <span className="font-bold text-foreground/60 bg-gray-200 px-3 py-1 rounded">6</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          आम ले लो आम!
        </span>
      </div>
    </div>
  );
}
