"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "कूड़ा (कचरा) कहाँ डालना चाहिए?",
    options: ["प्लेटफ़ॉर्म पर", "पटरी पर", "कूड़ादान में", "बाहर"],
    correctIndex: 2,
    hint: "चित्र में बाईं ओर 'कूड़ादान' रखा है।",
  },
  {
    id: "q2",
    question: "यात्री चाय कहाँ पी रहे हैं?",
    options: ["चाय घर पर", "ट्रेन में", "टिकट घर पर", "सड़क पर"],
    correctIndex: 0,
    hint: "चित्र में दाईं ओर 'चाय घर' का स्टाल है।",
  },
  {
    id: "q3",
    question: "स्टेशन पर यात्रियों का सामान कौन उठाता है?",
    options: ["टी.टी.ई.", "ड्राइवर", "कुली", "दुकानदार"],
    correctIndex: 2,
    hint: "चित्र में पीछे एक कुली सिर पर लाल सूटकेस ले जा रहा है।",
  },
  {
    id: "q4",
    question: "चित्र में छोटी बच्ची के हाथ में क्या है?",
    options: ["गुब्बारा", "किताब", "छाता", "खिलौना"],
    correctIndex: 2,
    hint: "आगे खड़ी बच्ची के हाथ में काले रंग का छाता है।",
  },
];

export function C6HindiCh3Page2() {
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const { addPoints } = useScore();

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizScored, setQuizScored] = useState<Record<string, boolean>>({});
  const [showReveal, setShowReveal] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number; label?: string } | null>(null);
  const [sceneTooltip, setSceneTooltip] = useState<string | null>(null);

  const isGlobalReveal = isUrlRevealed || showReveal;

  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem("c6-hindi-ch3-p2-quiz");
      const savedScored = localStorage.getItem("c6-hindi-ch3-p2-scored");
      if (savedAnswers) setQuizAnswers(JSON.parse(savedAnswers));
      if (savedScored) setQuizScored(JSON.parse(savedScored));
    } catch {}
  }, []);

  function handleQuizOption(qId: string, optIndex: number, correctIndex: number) {
    const nextAnswers = { ...quizAnswers, [qId]: optIndex };
    setQuizAnswers(nextAnswers);
    try {
      localStorage.setItem("c6-hindi-ch3-p2-quiz", JSON.stringify(nextAnswers));
    } catch {}

    if (optIndex === correctIndex) {
      if (!quizScored[qId]) {
        addPoints(1);
        const nextScored = { ...quizScored, [qId]: true };
        setQuizScored(nextScored);
        try {
          localStorage.setItem("c6-hindi-ch3-p2-scored", JSON.stringify(nextScored));
        } catch {}
      }
      setFeedback({ correct: true, id: Date.now(), label: "सही उत्तर! +1 ⭐" });
    } else {
      setFeedback({ correct: false, id: Date.now() });
    }
  }

  const totalPoints = Object.values(quizScored).filter(Boolean).length;

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90 pb-8">
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
            <p className="text-xs font-semibold text-blue-700">चित्रपठन (Picture Study)</p>
          </div>
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

      {/* Teacher Instruction Callout */}
      <div className="flex items-center gap-3 rounded-2xl border border-orange-300 bg-orange-50 p-4 shadow-sm mx-auto w-full md:w-4/5 text-center justify-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-400 text-xl shadow-xs">
          👨‍🏫
        </div>
        <p
          className="text-base font-bold text-orange-900"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          अध्यापक बाल गीत गाएँगे। बच्चे ध्यान से सुनेंगे।
        </p>
      </div>

      {/* Main Content Layout: Interactive Station Scene */}
      <div className="space-y-2">
        <div
          className="relative h-[550px] w-full overflow-hidden rounded-2xl border-2 border-blue-300 shadow-md bg-gray-200"
        >
          {/* Ceiling & Pipes */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gray-400 border-b-4 border-gray-600 shadow-lg">
            <div className="w-full h-6 bg-red-600 mt-12 border-y-2 border-red-800 shadow-md" />
            <div className="absolute top-8 left-10 w-48 h-8 bg-[#8B4513] rounded-full border-2 border-[#5C2E0B]" />
          </div>

          {/* Floor & Perspective */}
          <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gray-300 z-0">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 40px, #000 40px, #000 42px)" }} />
          </div>
          
          {/* Train Tracks (Left) */}
          <div className="absolute bottom-32 left-[-20px] w-48 h-full bg-gray-400 border-r-4 border-gray-500 transform skew-x-[25deg] shadow-inner z-0 flex justify-center pt-20">
            <div className="w-2 h-full bg-gray-600 mr-8" />
            <div className="w-2 h-full bg-gray-600" />
          </div>

          {/* Train */}
          <button
            type="button"
            onClick={() => setSceneTooltip("ट्रेन प्लेटफ़ॉर्म पर खड़ी है।")}
            className="absolute top-48 left-[-10px] w-32 h-24 bg-blue-500 border-2 border-blue-800 rounded-lg flex items-center justify-center z-10 hover:scale-110 cursor-pointer"
            title="ट्रेन"
          >
            <div className="flex gap-2">
              <div className="w-8 h-10 bg-yellow-200 border-2 border-gray-600 rounded" />
              <div className="w-8 h-10 bg-yellow-200 border-2 border-gray-600 rounded" />
            </div>
          </button>

          {/* Clock */}
          <button
            type="button"
            onClick={() => setSceneTooltip("स्टेशन की घड़ी में समय लगभग 3:15 हो रहा है।")}
            className="absolute top-16 left-[20%] w-32 h-32 bg-white rounded-full border-8 border-gray-800 z-20 shadow-xl flex items-center justify-center hover:scale-110 cursor-pointer"
            title="घड़ी"
          >
            <span className="absolute top-1 font-bold text-gray-800 text-sm">12</span>
            <span className="absolute right-2 font-bold text-gray-800 text-sm">3</span>
            <span className="absolute bottom-1 font-bold text-gray-800 text-sm">6</span>
            <span className="absolute left-2 font-bold text-gray-800 text-sm">9</span>
            <div className="absolute w-2 h-2 bg-black rounded-full" />
            {/* Hands */}
            <div className="absolute w-1 h-10 bg-black rounded-t origin-bottom bottom-1/2 left-[calc(50%-2px)] rotate-[90deg]" /> {/* Minute */}
            <div className="absolute w-1.5 h-6 bg-black rounded-t origin-bottom bottom-1/2 left-[calc(50%-3px)] rotate-[105deg]" /> {/* Hour */}
          </button>

          {/* 'प्रवेश' Board (Entry) */}
          <button
            type="button"
            onClick={() => setSceneTooltip("प्रवेश (Entry) द्वार - यहाँ से यात्री स्टेशन में आते हैं।")}
            className="absolute top-40 right-[40%] bg-blue-200 px-3 py-1 border border-blue-400 z-10 hover:scale-110 cursor-pointer"
            title="प्रवेश"
          >
            <span className="font-bold text-blue-900" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>प्रवेश</span>
          </button>

          {/* Tea Stall (चाय घर) */}
          <div className="absolute bottom-0 right-[-10px] w-[320px] h-[250px] z-30">
            {/* Stall Counter */}
            <div className="absolute bottom-0 w-full h-[120px] bg-yellow-200 border-t-8 border-yellow-400 shadow-md p-4">
              <span className="text-4xl font-extrabold text-blue-500/50 absolute left-4 bottom-4 transform -rotate-12" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                चाय घर
              </span>
              {/* Teacups & Jars */}
              <div className="absolute top-[-30px] right-20 flex gap-1">
                <span className="text-3xl">☕</span><span className="text-3xl">☕</span>
              </div>
              <div className="absolute top-2 right-4 flex gap-2">
                <span className="text-3xl">🫙</span><span className="text-3xl">🫙</span>
              </div>
            </div>
            
            {/* Tea Vendor */}
            <button
              type="button"
              onClick={() => setSceneTooltip("दुकानदार चाय बेच रहा है। 'चाय घर' पर गरमा-गरम चाय मिलती है।")}
              className="absolute top-10 right-4 flex flex-col items-center hover:scale-110 cursor-pointer"
              title="चाय वाला"
            >
              <span className="text-6xl scale-x-[-1]">👨🏽</span>
              <span className="absolute top-10 right-10 text-2xl">🫖</span>
            </button>
          </div>

          {/* Customer at Tea Stall */}
          <button
            type="button"
            onClick={() => setSceneTooltip("यात्री चाय खरीद रहा है और दुकानदार को पैसे (नोट) दे रहा है।")}
            className="absolute bottom-16 right-[250px] z-30 flex flex-col items-center hover:scale-110 cursor-pointer"
            title="यात्री"
          >
            <span className="text-7xl">👨🏻</span>
            <span className="absolute top-10 right-[-20px] text-2xl">💵</span>
            <span className="absolute top-10 left-[-20px] text-2xl">☕</span>
          </button>

          {/* Dustbin (कूड़ादान) */}
          <button
            type="button"
            onClick={() => setSceneTooltip("कूड़ादान (Dustbin): हमें हमेशा कचरा कूड़ेदान में ही डालना चाहिए।")}
            className="absolute bottom-32 left-4 z-20 hover:scale-110 cursor-pointer"
            title="कूड़ादान"
          >
            <div className="w-16 h-20 bg-yellow-600 rounded-t-lg border-2 border-yellow-800 flex items-center justify-center shadow-lg">
              <span className="text-xs font-bold text-yellow-950 font-heading tracking-tighter" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                कूड़ादान
              </span>
            </div>
          </button>

          {/* Boy near dustbin */}
          <button
            type="button"
            onClick={() => setSceneTooltip("बच्चा स्टेशन पर खड़ा है।")}
            className="absolute bottom-28 left-20 z-20 flex flex-col items-center hover:scale-110 cursor-pointer scale-x-[-1]"
            title="बच्चा"
          >
            <span className="text-5xl">👦🏻</span>
          </button>

          {/* TTE (Ticket Collector) and Passengers */}
          <button
            type="button"
            onClick={() => setSceneTooltip("टी.टी.ई. (TTE): टिकट चेकर यात्रियों के टिकट की जाँच कर रहे हैं।")}
            className="absolute bottom-32 left-32 z-20 flex flex-col items-center hover:scale-110 cursor-pointer"
            title="टी.टी.ई. (TTE)"
          >
            <span className="text-6xl">👨🏽‍✈️</span>
            <span className="absolute top-8 right-[-15px] text-xl">🎫</span>
          </button>
          <div className="absolute bottom-40 left-48 z-10 flex text-4xl">
            <span className="scale-x-[-1]">👩🏽</span>
            <span className="scale-x-[-1]">👨🏽</span>
          </div>

          {/* Coolie (Porter) */}
          <button
            type="button"
            onClick={() => setSceneTooltip("कुली: कुली यात्रियों का भारी सामान उठाता है।")}
            className="absolute top-48 left-[40%] z-10 flex flex-col items-center hover:scale-110 cursor-pointer"
            title="कुली"
          >
            <span className="text-4xl text-red-500 relative">
              <span className="absolute top-[-20px] left-[-5px] text-2xl z-10">🧳</span>
              👨🏽
            </span>
          </button>

          {/* Girl with Umbrella */}
          <button
            type="button"
            onClick={() => setSceneTooltip("बच्ची के हाथ में एक काला छाता है।")}
            className="absolute bottom-4 left-[20%] z-40 flex flex-col items-center hover:scale-110 cursor-pointer"
            title="बच्ची और छाता"
          >
            <span className="text-6xl">👧🏻</span>
            <span className="absolute top-[-40px] left-[-30px] text-6xl text-gray-800 transform -rotate-45">🌂</span>
          </button>

          {/* Woman knitting */}
          <button
            type="button"
            onClick={() => setSceneTooltip("महिला बेंच पर बैठकर बुनाई कर रही है।")}
            className="absolute bottom-4 left-[-10px] z-40 flex flex-col items-center hover:scale-110 cursor-pointer"
            title="बुनाई करती महिला"
          >
            <div className="relative">
              <span className="text-6xl">👩🏻</span>
              <span className="absolute top-10 right-[-15px] text-2xl">🧶</span>
              <div className="absolute bottom-[-10px] left-[-10px] w-24 h-8 bg-gray-600 rounded shadow-md z-[-1]" /> {/* Bench */}
            </div>
          </button>
          <div className="absolute bottom-2 left-10 z-40 text-4xl" title="सूटकेस">🧳</div>

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
          👆 चित्र का ध्यान से अवलोकन करें और लोगों (टी.टी.ई., कुली, चायवाला) पर क्लिक करें!
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
              📝 चित्र के आधार पर प्रश्न (Quiz)
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
        <span className="font-bold text-foreground/60">13</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          रेलवे स्टेशन
        </span>
      </div>
    </div>
  );
}
