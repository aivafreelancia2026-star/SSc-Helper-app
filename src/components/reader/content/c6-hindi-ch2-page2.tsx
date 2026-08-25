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
    question: "कविता के अनुसार बच्चे कहाँ नहाते हैं?",
    options: ["तालाब में", "नल के पास", "नदी में", "कुएँ पर"],
    correctIndex: 1,
    hint: "'नल के पास हम नहाते' - कविता की यह पंक्ति देखें।",
  },
  {
    id: "q2",
    question: "बच्चे क्या खा रहे हैं?",
    options: ["आम और सेब", "ईख और इमली", "केला और अंगूर", "अमरूद"],
    correctIndex: 1,
    hint: "'ईख और इमली हैं खाते' - कविता में बताया गया है।",
  },
  {
    id: "q3",
    question: "खेत में अन्न कौन उगाता है?",
    options: ["दूधवाला", "किसान", "दर्जी", "लोहार"],
    correctIndex: 1,
    hint: "'किसान खेत में हल चलाते, तरह-तरह के अन्न उगाते।' - किसान अन्न उगाता है।",
  },
  {
    id: "q4",
    question: "चित्र में कौन सा वाहन (vehicle) दिखाई दे रहा है?",
    options: ["बस", "ट्रैक्टर", "रेलगाड़ी", "हवाई जहाज़"],
    correctIndex: 1,
    hint: "चित्र के बीच में लाल रंग का ट्रैक्टर है।",
  },
];

export function C6HindiCh2Page2() {
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
      const savedAnswers = localStorage.getItem("c6-hindi-ch2-p2-quiz");
      const savedScored = localStorage.getItem("c6-hindi-ch2-p2-scored");
      if (savedAnswers) setQuizAnswers(JSON.parse(savedAnswers));
      if (savedScored) setQuizScored(JSON.parse(savedScored));
    } catch {}
  }, []);

  function handleQuizOption(qId: string, optIndex: number, correctIndex: number) {
    const nextAnswers = { ...quizAnswers, [qId]: optIndex };
    setQuizAnswers(nextAnswers);
    try {
      localStorage.setItem("c6-hindi-ch2-p2-quiz", JSON.stringify(nextAnswers));
    } catch {}

    if (optIndex === correctIndex) {
      if (!quizScored[qId]) {
        addPoints(1);
        const nextScored = { ...quizScored, [qId]: true };
        setQuizScored(nextScored);
        try {
          localStorage.setItem("c6-hindi-ch2-p2-scored", JSON.stringify(nextScored));
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
            <p className="text-xs font-semibold text-green-700">कविता / चित्रपठन</p>
          </div>
        </div>

        {/* QR & Reveal Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-green-300 bg-white/80 px-2.5 py-1 text-[11px] font-bold text-gray-700 shadow-xs">
            <span>📱 QR:</span>
            <span className="font-mono text-primary">N8Y4Z9</span>
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

      {/* Key Letters Banner */}
      <div className="rounded-2xl border border-green-200 bg-green-50/80 p-3 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">✍️</span>
          <p
            className="text-xs font-bold text-green-900"
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

      {/* Main Content Layout: Interactive Illustration & Poem */}
      <div className="space-y-2">
        <div
          className="relative h-[480px] w-full overflow-hidden rounded-2xl border-2 border-green-300 shadow-md bg-sky-100"
        >
          {/* Background Layers */}
          <div className="absolute top-1/3 left-0 right-0 bottom-0 bg-green-200" style={{ clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0% 100%)" }} />
          <div className="absolute top-1/2 left-0 right-0 bottom-0 bg-amber-700/20" style={{ clipPath: "polygon(0 30%, 100% 10%, 100% 100%, 0% 100%)" }} />
          
          {/* River / Water body */}
          <div className="absolute top-24 right-0 w-1/2 h-32 bg-blue-300/40 rounded-l-full" />
          
          {/* Big Tree on the right (इमली का पेड़) */}
          <div className="absolute top-4 right-0 w-48 h-full">
            <div className="absolute top-0 right-[-20px] w-48 h-48 bg-green-600/80 rounded-full blur-md" />
            <div className="absolute top-12 right-10 w-40 h-40 bg-green-700/80 rounded-full blur-md" />
            <div className="absolute top-32 right-8 w-16 h-80 bg-amber-900 rounded-lg" style={{ clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0% 100%)" }} />
          </div>

          {/* Poem Overlay (Top Left Circle) */}
          <div className="absolute top-8 left-8 z-30 w-72 h-72 rounded-full bg-white/95 shadow-xl border-4 border-green-100 flex flex-col items-center justify-center p-6 text-center animate-fade-in hover:scale-105 transition-transform">
            <div 
              className="text-base sm:text-lg font-bold text-green-900 leading-loose space-y-2"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              <p>हरा-भरा है गाँव हमारा,</p>
              <p>लगता हमको प्यारा-प्यारा।</p>
              <p>नल के पास हम नहाते,</p>
              <p>ईख और इमली हैं खाते।</p>
              <p>किसान खेत में हल चलाते,</p>
              <p>तरह-तरह के अन्न उगाते।</p>
            </div>
          </div>

          {/* Handpump & Bathing Boy */}
          <button
            type="button"
            onClick={() => setSceneTooltip("नल के पास हम नहाते - लड़का नल के पानी से नहा रहा है।")}
            className="absolute top-1/2 right-1/3 z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            title="नल और नहाता बच्चा"
          >
            <div className="relative">
              <span className="text-4xl">🚰</span>
              <span className="absolute bottom-[-10px] left-[-20px] text-3xl">👦</span>
              <span className="absolute top-4 left-[-15px] text-xl text-blue-500">💦</span>
            </div>
          </button>

          {/* Woman with Pot */}
          <button
            type="button"
            onClick={() => setSceneTooltip("महिला: सिर पर मटका लेकर पानी भर कर ले जा रही है।")}
            className="absolute top-[45%] left-10 z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer scale-x-[-1]"
            title="पानी लाती महिला"
          >
            <div className="relative">
              <span className="text-5xl">👩</span>
              <span className="absolute top-[-25px] left-[5px] text-2xl">🏺</span>
            </div>
          </button>

          {/* Tractor */}
          <button
            type="button"
            onClick={() => setSceneTooltip("ट्रैक्टर: लाल रंग का ट्रैक्टर खेत में काम आ रहा है।")}
            className="absolute bottom-28 left-20 z-20 flex items-center hover:scale-110 transition-transform cursor-pointer"
            title="ट्रैक्टर"
          >
            <span className="text-6xl text-red-500">🚜</span>
          </button>

          {/* Boy reading under tree */}
          <button
            type="button"
            onClick={() => setSceneTooltip("बच्चा: इमली के पेड़ के नीचे बैठकर किताब पढ़ रहा है।")}
            className="absolute bottom-16 right-10 z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            title="किताब पढ़ता बच्चा"
          >
            <div className="relative">
              <span className="text-4xl">👦</span>
              <span className="absolute bottom-2 left-[-15px] text-xl">📖</span>
            </div>
          </button>

          {/* Girl eating sugarcane */}
          <button
            type="button"
            onClick={() => setSceneTooltip("लड़की: ईख (गन्ना) मजे से खा रही है।")}
            className="absolute bottom-24 right-1/3 z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            title="ईख खाती लड़की"
          >
            <div className="relative">
              <span className="text-4xl">👧</span>
              <span className="absolute bottom-1 left-[-15px] text-2xl rotate-12">🎋</span>
            </div>
          </button>

          {/* Farmer harvesting crops */}
          <button
            type="button"
            onClick={() => setSceneTooltip("किसान खेत में हल चलाते, तरह-तरह के अन्न उगाते - किसान फसल काट रहा है।")}
            className="absolute bottom-4 left-32 z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            title="अन्न उगाता किसान"
          >
            <div className="relative">
              <span className="text-5xl">👨‍🌾</span>
              <span className="absolute bottom-0 right-[-25px] text-3xl">🌾</span>
            </div>
          </button>

          {/* Dog */}
          <button
            type="button"
            onClick={() => setSceneTooltip("कुत्ता: गाँव में घूमता हुआ एक कुत्ता।")}
            className="absolute bottom-10 left-6 z-20 flex items-center hover:scale-110 transition-transform cursor-pointer"
            title="कुत्ता"
          >
            <span className="text-3xl">🐕‍🦺</span>
          </button>

          {/* Interactive Scene Tooltip */}
          {sceneTooltip && (
            <div className="absolute top-4 right-4 z-40 max-w-sm rounded-xl bg-gray-900/90 p-3 text-sm text-white shadow-lg animate-fade-in flex items-center justify-between">
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
          👆 चित्र में दी गई कविता पढ़ें और गाँव के दृश्यों (ट्रैक्टर, नल, किसान) पर क्लिक करें!
        </p>
      </div>

      {/* Teacher Instruction Callout */}
      <div className="flex items-center gap-3 rounded-2xl border border-yellow-300 bg-yellow-50 p-4 shadow-sm mt-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-xl shadow-xs">
          👩‍🏫
        </div>
        <p
          className="text-sm font-semibold text-yellow-900"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          अध्यापक कविता का सस्वर वाचन करेंगे। बच्चे दोहराएँगे और गाँव के बारे में बातचीत करेंगे।
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
        <span className="font-bold text-foreground/60">9</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          हमारा गाँव
        </span>
      </div>
    </div>
  );
}
