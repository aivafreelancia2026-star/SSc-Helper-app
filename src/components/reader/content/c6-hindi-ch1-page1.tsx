"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const POEM_LINES = [
  "एक छोटी सी लड़की",
  "देख रही थी टोकरी",
  "टोकरी में क्या हैं?",
  "अनार हैं या आम?",
  "दिखने में हैं पीले-पीले,",
  "नाम इसका ..... है।",
];

const TARGET_LETTERS = [
  { letter: "न", example: "नल, नाम, नदी", emoji: "🚰" },
  { letter: "म", example: "मटर, मछली, मकान", emoji: "🐟" },
  { letter: "र", example: "रथ, रात, राजा", emoji: "👑" },
  { letter: "अ", example: "अनार, अमर, अदरक", emoji: "🍎" },
  { letter: "आ (ा)", example: "आम, आग, आसमान", emoji: "🥭" },
];

const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "छोटी सी लड़की क्या देख रही थी?",
    options: ["किताब", "टोकरी", "खिलौना", "पेड़"],
    correctIndex: 1,
    hint: "कविता की दूसरी पंक्ति पढ़ें: 'देख रही थी टोकरी'",
  },
  {
    id: "q2",
    question: "टोकरी में कौन-सा फल है?",
    options: ["अनार", "सेब", "आम", "केला"],
    correctIndex: 2,
    hint: "कविता का शीर्षक है: 'आम ले लो आम!'",
  },
  {
    id: "q3",
    question: "आम दिखने में कैसे रंग के हैं?",
    options: ["लाल-लाल", "पीले-पीले", "हरे-हरे", "नीले-नीले"],
    correctIndex: 1,
    hint: "कविता में आया है: 'दिखने में हैं पीले-पीले'",
  },
  {
    id: "q4",
    question: "रिक्त स्थान पूरा करें: 'नाम इसका ..... है।'",
    options: ["अमरूद", "संतरा", "आम", "अंगूर"],
    correctIndex: 2,
    hint: "सही फल का नाम 'आम' है।",
  },
];

export function C6HindiCh1Page1() {
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const { addPoints } = useScore();

  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedRiddleWord, setSelectedRiddleWord] = useState<string>("");
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
      const savedAnswers = localStorage.getItem("c6-hindi-p13-quiz");
      const savedScored = localStorage.getItem("c6-hindi-p13-scored");
      const savedRiddle = localStorage.getItem("c6-hindi-p13-riddle");
      if (savedAnswers) setQuizAnswers(JSON.parse(savedAnswers));
      if (savedScored) setQuizScored(JSON.parse(savedScored));
      if (savedRiddle) setSelectedRiddleWord(savedRiddle);
    } catch {}
  }, []);

  // Karaoke poem singing simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveLine((prev) => {
          if (prev === null || prev >= POEM_LINES.length - 1) {
            setIsPlaying(false);
            return null;
          }
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  function startSingAlong() {
    setActiveLine(0);
    setIsPlaying(true);
  }

  function handleRiddleSelect(word: string) {
    setSelectedRiddleWord(word);
    try {
      localStorage.setItem("c6-hindi-p13-riddle", word);
    } catch {}

    if (word === "आम") {
      const alreadyScored = quizScored["riddle"];
      if (!alreadyScored) {
        addPoints(1);
        const nextScored = { ...quizScored, riddle: true };
        setQuizScored(nextScored);
        try {
          localStorage.setItem("c6-hindi-p13-scored", JSON.stringify(nextScored));
        } catch {}
      }
      setFeedback({ correct: true, id: Date.now(), label: "शाबाश! सही नाम 'आम' है! +1 ⭐" });
    } else {
      setFeedback({ correct: false, id: Date.now() });
    }
  }

  function handleQuizOption(qId: string, optIndex: number, correctIndex: number) {
    const nextAnswers = { ...quizAnswers, [qId]: optIndex };
    setQuizAnswers(nextAnswers);
    try {
      localStorage.setItem("c6-hindi-p13-quiz", JSON.stringify(nextAnswers));
    } catch {}

    if (optIndex === correctIndex) {
      if (!quizScored[qId]) {
        addPoints(1);
        const nextScored = { ...quizScored, [qId]: true };
        setQuizScored(nextScored);
        try {
          localStorage.setItem("c6-hindi-p13-scored", JSON.stringify(nextScored));
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
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 p-4 border border-amber-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-xl text-white shadow-md">
            🥭
          </span>
          <div>
            <h1
              className="font-heading text-xl font-bold text-orange-800 sm:text-2xl"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              1. आम ले लो आम!
            </h1>
            <p className="text-xs font-semibold text-orange-700">बालगीत (कविता)</p>
          </div>
        </div>

        {/* QR & Reveal Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white/80 px-2.5 py-1 text-[11px] font-bold text-gray-700 shadow-xs">
            <span>📱 QR:</span>
            <span className="font-mono text-primary">V9S9A7</span>
          </div>

          <button
            type="button"
            onClick={() => setShowReveal(!showReveal)}
            className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all shadow-sm ${
              isGlobalReveal
                ? "border-amber-400 bg-amber-200 text-amber-900"
                : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
            }`}
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            {isGlobalReveal ? "🙈 उत्तर छुपाओ" : "💡 उत्तर दिखाओ"}
          </button>
        </div>
      </div>

      {/* Key Letters Banner (न म र अ 'आ - ा') */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-3 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">✍️</span>
          <p
            className="text-xs font-bold text-amber-900"
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
                    ? "border-orange-500 bg-orange-500 text-white scale-105"
                    : "border-amber-300 bg-white text-orange-800 hover:border-orange-400"
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
          <div className="mt-2 rounded-xl bg-white p-2.5 text-xs text-orange-900 border border-orange-200 animate-fade-in flex items-center justify-between">
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              <strong>{TARGET_LETTERS[activeLetter].letter}</strong> से शब्द:{" "}
              {TARGET_LETTERS[activeLetter].example}
            </span>
            <span className="text-lg">{TARGET_LETTERS[activeLetter].emoji}</span>
          </div>
        )}
      </div>

      {/* Main Content Layout: Illustration + Interactive Poem */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Side: Rich Interactive Scene (Village house, tree, girl, mango seller) */}
        <div className="space-y-2">
          <div
            className="relative h-[360px] w-full overflow-hidden rounded-2xl border-2 border-amber-300 shadow-md"
            style={{
              background: "linear-gradient(180deg, #bae6fd 0%, #e0f2fe 35%, #fef3c7 70%, #fed7aa 100%)",
            }}
          >
            {/* Big Green Tree */}
            <div className="absolute -top-6 left-4 z-0">
              <div className="relative">
                {/* Tree foliage clouds */}
                <div className="h-32 w-48 rounded-full bg-emerald-600 shadow-inner" />
                <div className="absolute -top-2 left-6 h-28 w-36 rounded-full bg-emerald-500" />
                <div className="absolute top-6 left-24 h-24 w-28 rounded-full bg-green-600" />
                {/* Mangoes on tree */}
                <span className="absolute top-10 left-12 text-sm animate-bounce">🥭</span>
                <span className="absolute top-16 left-28 text-sm">🥭</span>
                {/* Tree Trunk */}
                <div className="absolute top-24 left-20 h-24 w-8 rounded-b-md bg-amber-900 shadow-md" />
              </div>
            </div>

            {/* Village House */}
            <div className="absolute bottom-6 left-2 z-10 w-60">
              {/* Roof (slanted tile roof) */}
              <div
                className="h-14 w-full rounded-t-sm shadow-md"
                style={{
                  background: "repeating-linear-gradient(45deg, #b91c1c, #b91c1c 8px, #991b1b 8px, #991b1b 16px)",
                  clipPath: "polygon(0% 100%, 15% 0%, 85% 0%, 100% 100%)",
                }}
              />
              {/* House Front Wall */}
              <div className="relative h-32 w-full border-2 border-amber-800 bg-amber-50 p-2 shadow-inner">
                {/* Window */}
                <div className="absolute top-3 left-4 h-12 w-12 rounded border-2 border-amber-900 bg-sky-200">
                  <div className="h-full w-0.5 mx-auto bg-amber-900" />
                  <div className="w-full h-0.5 -mt-6 bg-amber-900" />
                </div>

                {/* Door */}
                <div className="absolute top-2 right-6 h-24 w-12 rounded-t border-2 border-amber-900 bg-amber-700">
                  <div className="absolute top-10 right-1 h-2 w-2 rounded-full bg-yellow-400" />
                </div>

                {/* Veranda Floor & Pillars */}
                <div className="absolute -bottom-2 -left-2 -right-2 h-6 rounded-b bg-stone-300 border-t border-stone-400" />
                <div className="absolute top-0 left-1 h-32 w-1.5 bg-blue-600" />
                <div className="absolute top-0 right-1 h-32 w-1.5 bg-blue-600" />

                {/* Sitting Girl studying */}
                <button
                  type="button"
                  onClick={() => setSceneTooltip("छोटी लड़की: बरामदे में बैठकर टोकरी देख रही है।")}
                  className="absolute bottom-2 left-6 z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
                  title="छोटी लड़की"
                >
                  <span className="text-3xl">👧</span>
                  <div className="rounded bg-white px-1 text-[8px] font-bold text-gray-700 shadow-xs">
                    📖 किताब
                  </div>
                </button>
              </div>
            </div>

            {/* Mango Seller Lady with Basket on head */}
            <button
              type="button"
              onClick={() => setSceneTooltip("आम वाली: सिर पर पीले-पीले आमों की टोकरी लिए जा रही है!")}
              className="absolute bottom-4 right-6 z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
              title="आम बेचने वाली औरत"
            >
              {/* Basket of Mangoes on head */}
              <div className="relative -mb-2 z-10 flex items-center justify-center rounded-t-lg bg-amber-800 px-2 py-0.5 border border-amber-950 shadow-md">
                <span className="text-xs">🥭🥭🥭</span>
                <span className="absolute -top-2 text-[10px] font-bold text-yellow-300">टोकरी</span>
              </div>
              {/* Woman Emoji / Saree Avatar */}
              <span className="text-4xl">👩‍🌾</span>
              <div className="rounded bg-purple-700 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-xs">
                आम ले लो आम!
              </div>
            </button>

            {/* Interactive Scene Tooltip */}
            {sceneTooltip && (
              <div className="absolute top-4 right-4 left-4 z-30 rounded-xl bg-gray-900/90 p-2.5 text-xs text-white shadow-lg animate-fade-in flex items-center justify-between">
                <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{sceneTooltip}</span>
                <button
                  type="button"
                  onClick={() => setSceneTooltip(null)}
                  className="ml-2 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <p className="text-center text-[11px] text-foreground/50">
            👆 चित्र के पात्रों (लड़की या आम वाली) पर क्लिक करके देखें!
          </p>
        </div>

        {/* Right Side: The Poem (बालगीत) + Sing Along Mode */}
        <div className="space-y-4 rounded-2xl border border-orange-200 bg-orange-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-orange-200 pb-3">
            <h2
              className="font-heading text-lg font-bold text-orange-900"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              📜 बालगीत (कविता)
            </h2>

            <button
              type="button"
              onClick={startSingAlong}
              disabled={isPlaying}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all shadow-sm ${
                isPlaying
                  ? "bg-amber-400 text-amber-950 animate-pulse"
                  : "bg-orange-500 text-white hover:bg-orange-600 active:scale-95"
              }`}
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              <span>{isPlaying ? "🎵 गायन चालू है..." : "▶️ गाकर सुनो (Sing Along)"}</span>
            </button>
          </div>

          {/* Poem Lines with highlight */}
          <div className="space-y-2 text-base leading-loose font-medium text-foreground/90">
            {POEM_LINES.slice(0, 5).map((line, idx) => (
              <div
                key={idx}
                className={`rounded-xl px-3 py-1.5 transition-all ${
                  activeLine === idx
                    ? "bg-orange-200 text-orange-950 font-bold scale-102 shadow-xs"
                    : "hover:bg-orange-100/60"
                }`}
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                {line}
              </div>
            ))}

            {/* Last Line with Interactive Fill-in Blank */}
            <div
              className={`rounded-xl px-3 py-2 transition-all ${
                activeLine === 5 ? "bg-orange-200 font-bold" : "bg-white/80 border border-orange-200"
              }`}
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              <span>नाम इसका </span>
              <span className="inline-flex items-center gap-1">
                {selectedRiddleWord ? (
                  <span className="rounded-lg bg-orange-500 px-2 py-0.5 text-white font-bold animate-pop-in">
                    {selectedRiddleWord} 🥭
                  </span>
                ) : (
                  <span className="rounded-lg border border-dashed border-orange-400 px-3 py-0.5 text-orange-600 bg-orange-50 font-bold">
                    ( ..... )
                  </span>
                )}
              </span>
              <span> है।</span>
            </div>
          </div>

          {/* Interactive Riddle Choices */}
          <div className="rounded-xl border border-amber-200 bg-white p-3 space-y-2">
            <p
              className="text-xs font-bold text-amber-900"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              🤔 सोचो और बताओ: खाली जगह में कौन-सा फल आएगा?
            </p>

            <div className="flex flex-wrap gap-2">
              {["अनार", "आम", "अंगूर", "केला"].map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => handleRiddleSelect(word)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold border transition-all ${
                    selectedRiddleWord === word
                      ? word === "आम"
                        ? "border-green-500 bg-green-500 text-white shadow-sm"
                        : "border-red-400 bg-red-100 text-red-700"
                      : "border-gray-200 bg-gray-50 text-gray-800 hover:border-orange-300"
                  }`}
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  {word} {word === "आम" && "🥭"}
                </button>
              ))}
            </div>

            {quizScored["riddle"] && (
              <p className="text-xs font-semibold text-green-700 mt-1">
                ✓ बिल्कुल सही! फल का नाम &apos;आम&apos; है। (+1 Point ⭐)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Teacher Instruction Callout (अध्यापक बाल गीत गाएँगे...) */}
      <div className="flex items-center gap-3 rounded-2xl border border-yellow-300 bg-yellow-50 p-4 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-xl shadow-xs">
          👩‍🏫
        </div>
        <p
          className="text-sm font-semibold text-yellow-900"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          अध्यापक बाल गीत गाएँगे। बच्चे ध्यान से सुनेंगे और अभिनय के साथ दोहराएँगे।
        </p>
      </div>

      {/* Interactive Quiz & Scoring Section */}
      <div className="space-y-4 rounded-2xl border border-border/60 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
          <div>
            <h3
              className="font-heading text-base font-bold text-primary"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              📝 अभ्यास और अंक (Quiz & Scoring)
            </h3>
            <p className="text-xs text-foreground/60" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              सही विकल्प चुनें और अंक प्राप्त करें:
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
            <span>⭐ अर्जित अंक:</span>
            <span className="text-sm font-extrabold">{totalPoints} / {QUIZ_QUESTIONS.length + 1}</span>
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
      <div className="flex justify-between items-center text-xs text-foreground/40 pt-2 border-t border-border/30">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          छात्रों की प्रगति हेतु सरकार का उपहार
        </span>
        <span className="font-bold text-foreground/60">4</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          आम ले लो आम!
        </span>
      </div>
    </div>
  );
}
