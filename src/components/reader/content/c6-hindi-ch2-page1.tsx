"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const TARGET_LETTERS = [
  { letter: "क", example: "कबूतर, कमल, कान", emoji: "🪷" },
  { letter: "ख", example: "खरगोश, खेत, खत", emoji: "🐇" },
  { letter: "ल", example: "लड़का, लाल, लट्टू", emoji: "👦" },
  { letter: "स", example: "सड़क, सेब, साइकिल", emoji: "🚲" },
  { letter: "इ (ि)", example: "किताब, चिड़िया, किसान", emoji: "📖" },
  { letter: "ई (ी)", example: "तीर, हाथी, चीनी", emoji: "🐘" },
];

const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "चित्र में खेत कौन जोत रहा है?",
    options: ["दूधवाला", "किसान", "बच्चा", "अध्यापक"],
    correctIndex: 1,
    hint: "खेत जोतने का काम किसान करता है।",
  },
  {
    id: "q2",
    question: "साइकिल पर कौन जा रहा है?",
    options: ["डाकिया", "किसान", "दूधवाला", "बच्चा"],
    correctIndex: 2,
    hint: "साइकिल पर दूध के डिब्बे टंगे हैं।",
  },
  {
    id: "q3",
    question: "बच्चे के हाथ में क्या है?",
    options: ["किताब", "गन्ना", "बल्ला", "खिलौना"],
    correctIndex: 1,
    hint: "खेत में गन्ना (ईख) उगा है, बच्चा वही खा रहा है।",
  },
  {
    id: "q4",
    question: "खेत में पक्षियों को डराने के लिए क्या लगाया गया है?",
    options: ["कुत्ता", "पुतला (Scarecrow)", "मशीन", "झंडा"],
    correctIndex: 1,
    hint: "खेत के बीच में एक पुतला खड़ा है।",
  },
];

export function C6HindiCh2Page1() {
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const { addPoints } = useScore();

  const [activeLetter, setActiveLetter] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizScored, setQuizScored] = useState<Record<string, boolean>>({});
  const [showReveal, setShowReveal] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number; label?: string } | null>(null);
  const [sceneTooltip, setSceneTooltip] = useState<string | null>(null);

  const isGlobalReveal = isUrlRevealed || showReveal;

  // Load state from localStorage
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem("c6-hindi-p17-quiz");
      const savedScored = localStorage.getItem("c6-hindi-p17-scored");
      if (savedAnswers) setQuizAnswers(JSON.parse(savedAnswers));
      if (savedScored) setQuizScored(JSON.parse(savedScored));
    } catch {}
  }, []);

  function handleQuizOption(qId: string, optIndex: number, correctIndex: number) {
    const nextAnswers = { ...quizAnswers, [qId]: optIndex };
    setQuizAnswers(nextAnswers);
    try {
      localStorage.setItem("c6-hindi-p17-quiz", JSON.stringify(nextAnswers));
    } catch {}

    if (optIndex === correctIndex) {
      if (!quizScored[qId]) {
        addPoints(1);
        const nextScored = { ...quizScored, [qId]: true };
        setQuizScored(nextScored);
        try {
          localStorage.setItem("c6-hindi-p17-scored", JSON.stringify(nextScored));
        } catch {}
      }
      setFeedback({ correct: true, id: Date.now(), label: "सही उत्तर! +1 ⭐" });
    } else {
      setFeedback({ correct: false, id: Date.now() });
    }
  }

  const totalPoints = Object.values(quizScored).filter(Boolean).length;

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          label={feedback.label}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* Chapter Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-emerald-100 via-green-100 to-lime-100 p-4 border border-green-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-xl text-white shadow-md">
            🏡
          </span>
          <div>
            <h1
              className="font-heading text-xl font-bold text-green-800 sm:text-2xl"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              2. हमारा गाँव
            </h1>
            <p className="text-xs font-semibold text-green-700">चित्रपठन / बालगीत</p>
          </div>
        </div>

        {/* QR & Reveal Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-green-300 bg-white/80 px-2.5 py-1 text-[11px] font-bold text-gray-700 shadow-xs">
            <span>📱 QR:</span>
            <span className="font-mono text-primary">M7W3X8</span>
          </div>

          <button
            type="button"
            onClick={() => setShowReveal(!showReveal)}
            className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all shadow-sm ${
              isGlobalReveal
                ? "border-green-400 bg-green-200 text-green-900"
                : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
            }`}
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            {isGlobalReveal ? "🙈 उत्तर छुपाओ" : "💡 उत्तर दिखाओ"}
          </button>
        </div>
      </div>

      {/* Key Letters Banner (क ख ल स 'इ - ि' 'ई - ी') */}
      <div className="rounded-2xl border border-green-200 bg-green-50/80 p-3 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">✍️</span>
          <p
            className="text-xs font-bold text-green-900"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            वर्णमाला सीखो (वर्ण एवं मात्रा):
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {TARGET_LETTERS.map((item, idx) => {
            const isActive = activeLetter === idx;
            return (
              <button
                key={item.letter}
                type="button"
                onClick={() => setActiveLetter(isActive ? null : idx)}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all shadow-xs ${
                  isActive
                    ? "border-green-600 bg-green-600 text-white scale-105"
                    : "border-green-300 bg-white text-green-800 hover:border-green-400"
                }`}
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                <span>{item.emoji}</span>
                <span className="text-sm font-bold">{item.letter}</span>
              </button>
            );
          })}
        </div>

        {activeLetter !== null && (
          <div className="mt-2 rounded-xl bg-white p-2.5 text-xs text-green-900 border border-green-200 animate-fade-in flex items-center justify-between">
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              <strong>{TARGET_LETTERS[activeLetter].letter}</strong> से शब्द:{" "}
              {TARGET_LETTERS[activeLetter].example}
            </span>
            <span className="text-lg">{TARGET_LETTERS[activeLetter].emoji}</span>
          </div>
        )}
      </div>

      {/* Main Content Layout: Interactive Illustration */}
      <div className="space-y-2">
        <div
          className="relative h-[400px] w-full overflow-hidden rounded-2xl border-2 border-green-300 shadow-md"
          style={{
            background: "linear-gradient(180deg, #bae6fd 0%, #e0f2fe 30%, #dcfce7 60%, #bbf7d0 100%)",
          }}
        >
          {/* Farm Fields Background */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-amber-700/20" style={{ clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0% 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-green-600/30" style={{ clipPath: "polygon(0 0, 100% 40%, 100% 100%, 0% 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-orange-800/30" style={{ clipPath: "polygon(0 20%, 100% 10%, 100% 100%, 0% 100%)" }} />

          {/* Sugarcane Field (Left) */}
          <div className="absolute bottom-10 left-4 w-32 h-40 flex flex-wrap gap-1 content-start">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="h-24 w-1.5 bg-green-600 rounded-t-sm rotate-[-5deg] ml-1 shadow-sm relative">
                <div className="absolute top-2 -left-1 w-3 h-1 bg-green-500 rotate-45 rounded-full" />
                <div className="absolute top-6 -right-1 w-3 h-1 bg-green-500 -rotate-45 rounded-full" />
              </div>
            ))}
          </div>

          {/* Scarecrow */}
          <button
            type="button"
            onClick={() => setSceneTooltip("पुतला (Scarecrow): खेत में पक्षियों को डराने के लिए खड़ा है।")}
            className="absolute top-32 left-10 z-10 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            title="पुतला"
          >
            <span className="text-3xl">🎃</span>
            <div className="w-16 h-2 bg-amber-900 rounded-full mt-[-10px] -z-10" />
            <div className="w-2 h-16 bg-amber-800 -mt-2 -z-20" />
          </button>

          {/* Farmer with Oxen */}
          <button
            type="button"
            onClick={() => setSceneTooltip("किसान: बैलों के साथ खेत जोत रहा है।")}
            className="absolute top-24 right-32 z-10 flex items-end hover:scale-110 transition-transform cursor-pointer"
            title="किसान और बैल"
          >
            <span className="text-4xl">👨‍🌾</span>
            <span className="text-5xl -ml-2">🐂</span>
            <span className="text-5xl -ml-4">🐂</span>
          </button>

          {/* Milkman on Bicycle */}
          <button
            type="button"
            onClick={() => setSceneTooltip("दूधवाला: साइकिल पर दूध के डिब्बे लेकर जा रहा है।")}
            className="absolute top-36 right-4 z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            title="दूधवाला"
          >
            <span className="text-5xl">🚴‍♂️</span>
            <span className="absolute top-4 -left-2 text-xl">🥛</span>
          </button>

          {/* Boy with spade */}
          <button
            type="button"
            onClick={() => setSceneTooltip("लड़का: कंधे पर फावड़ा रखकर जा रहा है।")}
            className="absolute bottom-8 left-32 z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            title="लड़का"
          >
            <span className="text-4xl scale-x-[-1]">👦</span>
            <span className="absolute top-2 -right-4 text-2xl rotate-45">⛏️</span>
          </button>

          {/* Boy eating sugarcane */}
          <button
            type="button"
            onClick={() => setSceneTooltip("बच्चा: खेत से गन्ना तोड़कर मजे से खा रहा है।")}
            className="absolute bottom-4 right-24 z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            title="गन्ना खाता बच्चा"
          >
            <span className="text-4xl">👦</span>
            <span className="absolute top-2 -left-2 text-2xl -rotate-12">🎋</span>
          </button>

          {/* Interactive Scene Tooltip */}
          {sceneTooltip && (
            <div className="absolute top-4 right-4 left-4 z-30 rounded-xl bg-gray-900/90 p-3 text-sm text-white shadow-lg animate-fade-in flex items-center justify-between">
              <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{sceneTooltip}</span>
              <button
                type="button"
                onClick={() => setSceneTooltip(null)}
                className="ml-2 rounded-full bg-white/20 px-2 py-1 text-xs"
              >
                ✕
              </button>
            </div>
          )}
        </div>
        <p className="text-center text-xs text-foreground/60 font-medium">
          👆 चित्र में किसान, दूधवाले और बच्चों पर क्लिक करके उनके बारे में जानें!
        </p>
      </div>

      {/* Teacher Instruction Callout (अध्यापक बाल गीत गाएँगे...) */}
      <div className="flex items-center gap-3 rounded-2xl border border-yellow-300 bg-yellow-50 p-4 shadow-sm mt-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-xl shadow-xs">
          👩‍🏫
        </div>
        <p
          className="text-sm font-semibold text-yellow-900"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          अध्यापक बाल गीत गाएँगे। बच्चे ध्यान से सुनेंगे।
        </p>
      </div>

      {/* Interactive Quiz & Scoring Section */}
      <div className="space-y-4 rounded-2xl border border-border/60 bg-white p-5 shadow-sm mt-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
          <div>
            <h3
              className="font-heading text-base font-bold text-primary"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              📝 चित्र देखकर बताओ (Quiz)
            </h3>
            <p className="text-xs text-foreground/60" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              सही विकल्प चुनें और अंक प्राप्त करें:
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
            <span>⭐ अर्जित अंक:</span>
            <span className="text-sm font-extrabold">{totalPoints} / {QUIZ_QUESTIONS.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const isAnswered = quizAnswers[q.id] !== undefined;
            const isCorrect = quizAnswers[q.id] === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`rounded-xl border p-4 transition-all ${
                  isAnswered
                    ? isCorrect
                      ? "border-green-300 bg-green-50/50"
                      : "border-red-200 bg-red-50/30"
                    : "border-border/60 bg-gray-50/50 hover:bg-white"
                }`}
              >
                <p
                  className="font-medium text-sm text-foreground/90 mb-2.5"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  <span className="font-bold text-primary mr-1.5">{idx + 1}.</span>
                  {q.question}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = quizAnswers[q.id] === optIdx;
                    const isRightOption = optIdx === q.correctIndex;

                    let btnClass = "border-gray-200 bg-white text-gray-800 hover:border-primary/40";
                    if (isSelected) {
                      btnClass = isCorrect
                        ? "border-green-500 bg-green-500 text-white font-bold shadow-xs"
                        : "border-red-500 bg-red-500 text-white font-bold shadow-xs";
                    } else if (isGlobalReveal && isRightOption) {
                      btnClass = "border-amber-400 bg-amber-100 text-amber-900 font-bold";
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleQuizOption(q.id, optIdx, q.correctIndex)}
                        className={`rounded-lg border px-3 py-1.5 text-xs text-center transition-all ${btnClass}`}
                        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isGlobalReveal && (
                  <p
                    className="mt-2 text-[11px] text-amber-800 font-medium bg-amber-50 rounded-lg p-1.5 border border-amber-200"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    💡 {q.hint}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer info matching the book */}
      <div className="flex justify-between items-center text-xs text-foreground/40 pt-4 border-t border-border/30">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          छात्रों की प्रगति हेतु सरकार का उपहार
        </span>
        <span className="font-bold text-foreground/60">8</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          हमारा गाँव
        </span>
      </div>
    </div>
  );
}
