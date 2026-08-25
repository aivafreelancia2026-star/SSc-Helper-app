"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const TARGET_LETTERS = [
  { letter: "घ", example: "घर, घंटी, घड़ा", emoji: "🏠" },
  { letter: "च", example: "चम्मच, चरखा, चूहा", emoji: "🥄" },
  { letter: "छ", example: "छतरी, छत, छलनी", emoji: "☂️" },
  { letter: "ट", example: "टमाटर, टोकरी, टब", emoji: "🍅" },
  { letter: "ड", example: "डमरू, डंडा, डिब्बा", emoji: "🥁" },
  { letter: "उ (ु)", example: "पुल, सुन, कुत्ता", emoji: "🌉" },
  { letter: "ऊ (ू)", example: "फूल, सूरज, चूहा", emoji: "🌻" },
];

const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "रेल कैसे आती है?",
    options: ["घड़-घड़", "छुक-छुक", "टन-टन", "पॉम-पॉम"],
    correctIndex: 1,
    hint: "'छुक-छुक छुक-छुक आती रेल' - कविता की पहली पंक्ति देखें।",
  },
  {
    id: "q2",
    question: "रेल किसके ऊपर चलती है?",
    options: ["सड़क पर", "पानी में", "लोहे की पटरी पर", "हवा में"],
    correctIndex: 2,
    hint: "'लोहे की है पटरी इसकी, जिसके ऊपर चलती रेल।' - कविता में बताया गया है।",
  },
  {
    id: "q3",
    question: "स्टेशन का क्या नाम लिखा है?",
    options: ["हैदराबाद", "सिकंदराबाद", "विजयवाड़ा", "तिरुपति"],
    correctIndex: 1,
    hint: "चित्र में ऊपर शेड पर 'सिकंदराबाद' लिखा है।",
  },
  {
    id: "q4",
    question: "पीले बोर्ड पर क्या लिखा है?",
    options: ["सावधानी हटी, दुर्घटना घटी", "लड़की की पढ़ाई, देश की भलाई", "स्वच्छ भारत", "टिकट यहाँ से लें"],
    correctIndex: 1,
    hint: "चित्र में दायें तरफ पीले बोर्ड को ध्यान से पढ़ें।",
  },
];

export function C6HindiCh3Page1() {
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

  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem("c6-hindi-ch3-p1-quiz");
      const savedScored = localStorage.getItem("c6-hindi-ch3-p1-scored");
      if (savedAnswers) setQuizAnswers(JSON.parse(savedAnswers));
      if (savedScored) setQuizScored(JSON.parse(savedScored));
    } catch {}
  }, []);

  function handleQuizOption(qId: string, optIndex: number, correctIndex: number) {
    const nextAnswers = { ...quizAnswers, [qId]: optIndex };
    setQuizAnswers(nextAnswers);
    try {
      localStorage.setItem("c6-hindi-ch3-p1-quiz", JSON.stringify(nextAnswers));
    } catch {}

    if (optIndex === correctIndex) {
      if (!quizScored[qId]) {
        addPoints(1);
        const nextScored = { ...quizScored, [qId]: true };
        setQuizScored(nextScored);
        try {
          localStorage.setItem("c6-hindi-ch3-p1-scored", JSON.stringify(nextScored));
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
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-100 p-4 border border-blue-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-xl text-white shadow-md">
            🚉
          </span>
          <div>
            <h1
              className="font-heading text-xl font-bold text-blue-900 sm:text-2xl"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              3. रेलवे स्टेशन
            </h1>
            <p className="text-xs font-semibold text-blue-700">कविता / चित्रपठन</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-blue-300 bg-white/80 px-2.5 py-1 text-[11px] font-bold text-gray-700 shadow-xs">
            <span>📱 QR:</span>
            <span className="font-mono text-primary">W4K3B7</span>
          </div>

          <button
            type="button"
            onClick={() => setShowReveal(!showReveal)}
            className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all shadow-sm ${
              isGlobalReveal
                ? "border-blue-400 bg-blue-200 text-blue-900"
                : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
            }`}
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            {isGlobalReveal ? "🙈 उत्तर छुपाओ" : "💡 उत्तर दिखाओ"}
          </button>
        </div>
      </div>

      {/* Key Letters Banner */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-3 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">✍️</span>
          <p
            className="text-xs font-bold text-blue-900"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            वर्णमाला अभ्यास (वर्ण एवं मात्रा):
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
                    ? "border-blue-600 bg-blue-600 text-white scale-105"
                    : "border-blue-300 bg-white text-blue-800 hover:border-blue-400"
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
          <div className="mt-2 rounded-xl bg-white p-2.5 text-xs text-blue-900 border border-blue-200 animate-fade-in flex items-center justify-between">
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              <strong>{TARGET_LETTERS[activeLetter].letter}</strong> से शब्द:{" "}
              {TARGET_LETTERS[activeLetter].example}
            </span>
            <span className="text-lg">{TARGET_LETTERS[activeLetter].emoji}</span>
          </div>
        )}
      </div>

      {/* Main Content Layout: Interactive Illustration & Poem */}
      <div className="space-y-2">
        <div
          className="relative h-[480px] w-full overflow-hidden rounded-2xl border-2 border-blue-300 shadow-md bg-[#e6e9f0]"
        >
          {/* Station Roof */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gray-500 flex items-center justify-center border-b-8 border-gray-700" style={{ transform: "perspective(500px) rotateX(15deg) scale(1.1)", transformOrigin: "top" }}>
            {/* Station Name Board */}
            <div className="bg-white px-6 py-2 rounded shadow-md border border-gray-400 mt-10 z-10">
              <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                सिकंदराबाद
              </span>
            </div>
            {/* Pillars */}
            <div className="absolute bottom-[-150px] left-1/4 w-4 h-[150px] bg-red-600 border-l border-red-800 shadow-lg z-0" />
            <div className="absolute bottom-[-150px] right-1/4 w-4 h-[150px] bg-red-600 border-l border-red-800 shadow-lg z-0" />
            <div className="absolute bottom-[-150px] right-10 w-4 h-[150px] bg-red-600 border-l border-red-800 shadow-lg z-0" />
          </div>

          {/* Platform Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-[#d8b08d] border-t-8 border-[#c98e6b] z-20 shadow-[inset_0_5px_10px_rgba(0,0,0,0.1)]" />

          {/* Railway Tracks */}
          <div className="absolute bottom-28 left-0 right-0 h-24 bg-gray-400 z-10 flex flex-col justify-evenly p-2 shadow-inner">
            <div className="w-full h-2 bg-gray-600 shadow-sm" />
            <div className="w-full h-2 bg-gray-600 shadow-sm" />
            {/* Sleepers (wood/concrete) */}
            <div className="absolute inset-0 flex justify-between px-4 z-[-1]">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="w-4 h-full bg-gray-300 border border-gray-500 mx-2 skew-x-[-15deg]" />
              ))}
            </div>
          </div>

          {/* Train */}
          <button
            type="button"
            onClick={() => setSceneTooltip("रेलगाड़ी: यह ट्रेन 'द.म.रे.' (दक्षिण मध्य रेलवे) की है।")}
            className="absolute bottom-28 right-[-50px] h-36 w-[80%] bg-blue-500 z-10 rounded-l-3xl border-2 border-blue-700 flex items-center shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 cursor-pointer"
            title="रेलगाड़ी"
          >
            {/* Windows */}
            <div className="flex gap-4 ml-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-12 h-16 bg-yellow-100 border-4 border-gray-300 rounded shadow-inner grid grid-cols-2 grid-rows-2 gap-1 p-1">
                  <div className="bg-sky-200/50" />
                  <div className="bg-sky-200/50" />
                  <div className="bg-sky-200/50" />
                  <div className="bg-sky-200/50" />
                </div>
              ))}
            </div>
            {/* Train Text */}
            <div className="absolute right-20 text-red-600 font-extrabold text-3xl italic tracking-wider transform -skew-x-12" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              द.म.रे.
            </div>
            {/* Train Wheels */}
            <div className="absolute bottom-[-16px] left-16 w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 z-0" />
            <div className="absolute bottom-[-16px] left-28 w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 z-0" />
            <div className="absolute bottom-[-16px] right-32 w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 z-0" />
            <div className="absolute bottom-[-16px] right-16 w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 z-0" />
          </button>

          {/* Platform Number Boards */}
          <div className="absolute top-36 left-1/4 z-30">
            <div className="w-12 h-12 bg-red-600 text-white font-bold text-2xl flex items-center justify-center rounded-sm border-2 border-red-800 shadow-md">
              2
            </div>
            <div className="w-1 h-6 bg-gray-800 mx-auto" />
          </div>
          
          <div className="absolute top-28 right-8 z-30">
            <div className="w-10 h-10 bg-red-600 text-white font-bold text-xl flex items-center justify-center rounded-sm border-2 border-red-800 shadow-md">
              1
            </div>
            <div className="w-1 h-12 bg-gray-800 mx-auto" />
          </div>

          {/* Social Message Board (Yellow Board) */}
          <button
            type="button"
            onClick={() => setSceneTooltip("पीला बोर्ड: लड़की की पढ़ाई, देश की भलाई - यह संदेश लड़कियों की शिक्षा को बढ़ावा देता है।")}
            className="absolute top-24 right-[15%] z-30 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            title="संदेश बोर्ड"
          >
            <div className="bg-yellow-300 border-4 border-yellow-600 p-2 text-center shadow-lg rounded-sm text-green-900 font-bold leading-tight" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              <p>लड़की की</p>
              <p>पढ़ाई, देश</p>
              <p>की भलाई।</p>
            </div>
            <div className="w-2 h-12 bg-gray-600" />
          </button>

          {/* Poem Overlay (Left side oval) */}
          <div className="absolute top-10 left-[-20px] z-40 w-[350px] h-[400px] rounded-[50%] bg-white/95 shadow-2xl border-4 border-blue-100 flex flex-col items-center justify-center p-8 text-center animate-fade-in hover:scale-105 transition-transform transform rotate-[-2deg]">
            <div 
              className="text-[15px] sm:text-base font-bold text-blue-900 leading-loose space-y-1.5"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              <p>छुक-छुक छुक-छुक आती रेल,</p>
              <p>घड़-घड़ घड़-घड़ जाती रेल।</p>
              <p>टन-टन-टन-टन घंटी बजती,</p>
              <p>तब स्टेशन आती रेल।</p>
              <p>लोहे की है पटरी इसकी,</p>
              <p>जिसके ऊपर चलती रेल।</p>
              <p>इधर-उधर सबको ले जाती,</p>
              <p>सबकी सेवा करती रेल।</p>
            </div>
          </div>

          {/* Interactive Scene Tooltip */}
          {sceneTooltip && (
            <div className="absolute top-4 right-4 z-50 max-w-sm rounded-xl bg-gray-900/90 p-3 text-sm text-white shadow-lg animate-fade-in flex items-center justify-between">
              <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{sceneTooltip}</span>
              <button
                type="button"
                onClick={() => setSceneTooltip(null)}
                className="ml-2 rounded-full bg-white/20 px-2 py-1 text-xs hover:bg-white/40 transition-colors"
              >
                ✕
              </button>
            </div>
          )}
        </div>
        <p className="text-center text-xs text-foreground/60 font-medium">
          👆 कविता पढ़ें और चित्र में दी गई चीज़ों (रेलगाड़ी, बोर्ड) पर क्लिक करें!
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
              📝 कविता और चित्र से जुड़े प्रश्न (Quiz)
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
        <span className="font-bold text-foreground/60">12</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          रेलवे स्टेशन
        </span>
      </div>
    </div>
  );
}
