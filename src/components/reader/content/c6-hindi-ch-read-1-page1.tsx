"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

interface QuestionItem {
  id: string;
  question: string;
  modelAnswer: string;
  keywords: string[];
  isPersonal?: boolean;
}

const QUESTIONS: QuestionItem[] = [
  {
    id: "q1",
    question: "यह कौन-सी कक्षा है?",
    modelAnswer: "यह छठी (6वीं) कक्षा है।",
    keywords: ["छठी", "6", "६", "छह", "कक्षा"],
  },
  {
    id: "q2",
    question: "कक्षा में क्या-क्या है?",
    modelAnswer: "कक्षा में श्यामपट्ट (ब्लैकबोर्ड), खिड़की, किताबें, अध्यापिका और बच्चे हैं।",
    keywords: ["श्यामपट्ट", "बोर्ड", "खिड़की", "किताब", "पुस्तक", "बच्चे", "छात्र", "अध्यापिका", "शिक्षिका", "दीवार"],
  },
  {
    id: "q3",
    question: "अध्यापिका क्या कर रही हैं?",
    modelAnswer: "अध्यापिका श्यामपट्ट पर लिख रही हैं और बच्चों को पढ़ा रही हैं।",
    keywords: ["लिख", "पढ़ा", "सिखा", "बता", "श्यामपट्ट"],
  },
  {
    id: "q4",
    question: "जो बच्चे खड़े हैं, वे क्या कर रहे हैं?",
    modelAnswer: "जो बच्चे खड़े हैं, वे श्यामपट्ट देख रहे हैं और ध्यान से पढ़ रहे हैं।",
    keywords: ["खड़े", "देख", "पढ़", "श्यामपट्ट", "सुन"],
  },
  {
    id: "q5",
    question: "जो बच्चे बैठे हैं, वे क्या कर रहे हैं?",
    modelAnswer: "जो बच्चे बैठे हैं, वे किताब पढ़ रहे हैं और चर्चा कर रहे हैं।",
    keywords: ["बैठे", "किताब", "पढ़", "देख", "सीख"],
  },
  {
    id: "q6",
    question: "तुम्हारी कक्षा में क्या-क्या है?",
    modelAnswer: "हमारी कक्षा में श्यामपट्ट, मेज़, कुर्सियाँ, खिड़कियाँ, पंखे, चार्ट और सहपाठी हैं।",
    keywords: [],
    isPersonal: true,
  },
  {
    id: "q7",
    question: "आप अपनी अध्यापिका से क्या बातचीत करते हैं?",
    modelAnswer: "हम अपनी अध्यापिका से पाठ, प्रश्नों, कहानियों और अपनी पढ़ाई के बारे में बातचीत करते हैं।",
    keywords: [],
    isPersonal: true,
  },
];

function checkAnswer(userAnswer: string, q: QuestionItem): { correct: boolean; scoreText: string } {
  const trimmed = userAnswer.trim();
  if (!trimmed) return { correct: false, scoreText: "कृपया उत्तर लिखें" };

  if (q.isPersonal) {
    return trimmed.length >= 3
      ? { correct: true, scoreText: "बहुत बढ़िया विचार! +1 ⭐" }
      : { correct: false, scoreText: "कृपया थोड़ा विस्तार से लिखें" };
  }

  const lower = trimmed.toLowerCase();
  const matched = q.keywords.some((kw) => lower.includes(kw.toLowerCase()));
  if (matched || trimmed.length >= 4) {
    return { correct: true, scoreText: "बिल्कुल सही! +1 ⭐" };
  }
  return { correct: false, scoreText: "उत्तर के मुख्य शब्दों को शामिल करें" };
}

export function C6HindiChRead1Page1() {
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const { addPoints } = useScore();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [evaluated, setEvaluated] = useState<Record<string, boolean>>({});
  const [showModelAnswers, setShowModelAnswers] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<string | null>("q1");
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number; label?: string } | null>(null);

  // Load answers from localStorage on mount
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem("c6-hindi-p11-answers");
      const savedEvaluated = localStorage.getItem("c6-hindi-p11-evaluated");
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
      if (savedEvaluated) setEvaluated(JSON.parse(savedEvaluated));
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  const isGlobalReveal = isUrlRevealed || showModelAnswers;

  const totalPointsScored = Object.values(evaluated).filter(Boolean).length;

  function handleAnswerSubmit(q: QuestionItem) {
    const text = answers[q.id] || "";
    const result = checkAnswer(text, q);

    if (result.correct) {
      const alreadyScored = evaluated[q.id];
      if (!alreadyScored) {
        addPoints(1);
        const nextEvaluated = { ...evaluated, [q.id]: true };
        setEvaluated(nextEvaluated);
        try {
          localStorage.setItem("c6-hindi-p11-evaluated", JSON.stringify(nextEvaluated));
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
      localStorage.setItem("c6-hindi-p11-answers", JSON.stringify(nextAnswers));
    } catch {}
  }

  function toggleLocalReveal() {
    setShowModelAnswers((prev) => !prev);
  }

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

      {/* Unit & Chapter Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
            इकाई - I
          </span>
          <h2
            className="font-heading text-xl font-bold text-orange-600"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            पाठशाला
          </h2>
        </div>

        {/* Action button to reveal/hide model answers */}
        <button
          type="button"
          onClick={toggleLocalReveal}
          className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all shadow-sm ${
            isGlobalReveal
              ? "border-amber-400 bg-amber-50 text-amber-800"
              : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
          }`}
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          <span>{isGlobalReveal ? "🙈 उत्तर छुपाओ" : "💡 उत्तर दिखाओ (Reveal Answers)"}</span>
        </button>
      </div>

      {/* Classroom Scene */}
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-orange-200 shadow-inner"
        style={{
          minHeight: "300px",
          background: "linear-gradient(160deg, #fdf6e3 0%, #fef3c7 60%, #fde68a 100%)",
        }}
      >
        {/* Sky-blue wall top */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: "55%", background: "linear-gradient(180deg, #bae6fd 0%, #e0f2fe 100%)" }}
        />

        {/* Window */}
        <div className="absolute top-3 right-6 w-14 h-18 rounded-sm border-4 border-amber-800 overflow-hidden shadow-md" style={{ height: "72px" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #7dd3fc 0%, #86efac 100%)" }} />
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-amber-900/60" />
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-amber-900/60" />
        </div>

        {/* Blackboard */}
        <div
          className="absolute top-3 left-3 rounded border-4 border-amber-900 flex flex-col justify-center px-3 shadow-lg"
          style={{ right: "90px", height: "120px", background: "#1f2937" }}
        >
          <div className="absolute inset-0 opacity-10" style={{ background: "linear-gradient(180deg, #6b7280 0%, transparent 100%)" }} />
          <p
            className="text-right text-white/80 mb-2"
            style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: "11px",
              textShadow: "0 0 6px rgba(255,255,255,0.4)",
            }}
          >
            कक्षा :६
          </p>
          <p
            className="text-white font-bold"
            style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: "28px",
              letterSpacing: "0.18em",
              textShadow: "0 0 14px rgba(255,255,255,0.5)",
            }}
          >
            क&nbsp;&nbsp;ल
          </p>
        </div>

        {/* Floor */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "42%", background: "linear-gradient(180deg, #fed7aa 0%, #fb923c22 100%)" }}
        />
        <div className="absolute left-0 right-0 h-px bg-amber-300/60" style={{ bottom: "42%" }} />

        {/* === TEACHER AT BOARD (standing) === */}
        <div className="absolute flex flex-col items-center" style={{ left: "112px", top: "24px" }}>
          <div className="w-5 h-2.5 rounded-t-full bg-gray-900 relative" style={{ marginBottom: "-2px" }} />
          <div className="w-5 h-5 rounded-full bg-amber-600 border border-amber-700" />
          <div
            className="absolute bg-amber-600 rounded-full"
            style={{ width: "22px", height: "5px", top: "18px", left: "-16px", transform: "rotate(-25deg)", transformOrigin: "right center" }}
          />
          <div className="w-5 h-12 rounded-sm mt-0.5 relative overflow-hidden" style={{ background: "#f97316" }}>
            <div className="absolute top-0 left-0 right-0 h-4 bg-amber-100" />
          </div>
          <div className="flex gap-0.5 mt-0.5">
            <div className="w-2 h-5 rounded-sm" style={{ background: "#ea580c" }} />
            <div className="w-2 h-5 rounded-sm" style={{ background: "#ea580c" }} />
          </div>
        </div>

        {/* === TEACHER SITTING WITH STUDENTS === */}
        <div className="absolute flex items-end gap-2" style={{ left: "16px", bottom: "80px" }}>
          <div className="flex flex-col items-center">
            <div className="w-5 h-2 rounded-t-full bg-gray-900" style={{ marginBottom: "-1px" }} />
            <div className="w-5 h-5 rounded-full bg-amber-600 border border-amber-700" />
            <div className="w-12 h-8 rounded-t-xl mt-0.5 relative overflow-hidden" style={{ background: "#eab308" }}>
              <div className="absolute top-0 left-0 right-0 h-4 bg-amber-200" />
            </div>
            <div className="flex gap-0.5">
              <div className="w-5 h-1.5 rounded-full" style={{ background: "#ca8a04", transform: "rotate(12deg)" }} />
              <div className="w-5 h-1.5 rounded-full" style={{ background: "#ca8a04", transform: "rotate(-12deg)" }} />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-5 h-2 rounded-t-full bg-gray-900" style={{ marginBottom: "-1px" }} />
            <div className="w-2 h-2 rounded-full bg-blue-400 absolute" style={{ marginLeft: "16px", marginTop: "-2px" }} />
            <div className="w-5 h-5 rounded-full bg-amber-500 border border-amber-600" />
            <div className="w-4 h-9 rounded-sm mt-0.5" style={{ background: "#ef4444" }} />
          </div>
          <div className="flex flex-col items-center" style={{ marginLeft: "-6px" }}>
            <div className="w-5 h-2 rounded-t-full bg-gray-900" style={{ marginBottom: "-1px" }} />
            <div className="w-5 h-5 rounded-full bg-amber-600 border border-amber-700" />
            <div className="w-4 h-9 rounded-sm mt-0.5" style={{ background: "#f9a8d4" }} />
          </div>
        </div>

        {/* Open book on floor */}
        <div
          className="absolute rounded-sm border border-gray-300 shadow-md"
          style={{
            bottom: "80px",
            left: "88px",
            width: "44px",
            height: "28px",
            background: "white",
            transform: "rotate(-4deg)",
          }}
        >
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300" />
        </div>

        {/* Standing student */}
        <div className="absolute flex flex-col items-center" style={{ left: "180px", bottom: "90px" }}>
          <div className="w-5 h-2 rounded-t-full bg-gray-900" style={{ marginBottom: "-1px" }} />
          <div className="w-5 h-5 rounded-full bg-amber-400 border border-amber-500" />
          <div className="w-4 h-10 rounded-sm mt-0.5 relative overflow-hidden border border-gray-200" style={{ background: "#f8fafc" }}>
            <div className="absolute bottom-0 left-0 right-0 h-5" style={{ background: "#475569" }} />
          </div>
          <div className="flex gap-0.5 mt-0.5">
            <div className="w-1.5 h-4 rounded-sm" style={{ background: "#475569" }} />
            <div className="w-1.5 h-4 rounded-sm" style={{ background: "#475569" }} />
          </div>
        </div>

        {/* Student with Hindi book */}
        <div className="absolute flex flex-col items-center" style={{ right: "16px", bottom: "84px" }}>
          <div className="w-6 h-2.5 rounded-t-full bg-gray-900" style={{ marginBottom: "-1px" }} />
          <div className="w-6 h-6 rounded-full bg-amber-400 border border-amber-500" />
          <div
            className="mt-1 rounded border border-blue-400 shadow-sm flex items-center justify-center"
            style={{ width: "36px", height: "44px", background: "#eff6ff" }}
          >
            <span
              className="font-bold text-blue-700 text-center leading-tight"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: "9px" }}
            >
              हिंदी
            </span>
          </div>
        </div>

        {/* Page number */}
        <div className="absolute bottom-1 left-0 right-0 flex justify-center">
          <span className="text-xs text-gray-400/70 font-semibold">2</span>
        </div>
      </div>

      {/* Score Tracker Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">⭐</span>
          <div>
            <p className="text-xs font-bold text-primary" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              कुल प्राप्त अंक (Your Points)
            </p>
            <p className="text-sm font-semibold text-foreground">
              {totalPointsScored} / {QUESTIONS.length} प्रश्न सही
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {QUESTIONS.map((q, idx) => (
            <span
              key={q.id}
              title={`प्रश्न ${idx + 1}`}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                evaluated[q.id]
                  ? "bg-green-500 text-white shadow-sm"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {evaluated[q.id] ? "✓" : idx + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Textbook discussion prompt */}
      <div className="flex gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4 shadow-sm items-start">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center text-2xl shadow-inner">
          👩‍🏫
        </div>
        <p
          className="font-body text-sm leading-relaxed text-foreground/90"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          यह कौन-सी कक्षा है? कक्षा में क्या-क्या है? अध्यापिका क्या कर रही हैं? जो बच्चे खड़े हैं, वे क्या कर रहे हैं? जो बच्चे बैठे हैं, वे क्या कर रहे हैं? तुम्हारी कक्षा में क्या-क्या है? आप अपनी अध्यापिका से क्या बातचीत करते हैं?
        </p>
      </div>

      {/* Interactive Questions with Scoring & Reveal */}
      <div className="space-y-3">
        <h3
          className="font-heading text-base font-bold text-primary text-center"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          🗣️ बातचीत करो (प्रश्नोत्तरी एवं अंक)
        </h3>
        <p className="text-xs text-foreground/50 text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          प्रश्नों के उत्तर लिखें, जाँचें और अंक प्राप्त करें —
        </p>

        <div className="space-y-3">
          {QUESTIONS.map((q, i) => {
            const isScored = evaluated[q.id];
            const currentAnswer = answers[q.id] || "";
            const isExpanded = activeQuestion === q.id;

            return (
              <div
                key={q.id}
                className={`rounded-2xl border overflow-hidden shadow-sm transition-all duration-200 ${
                  isScored
                    ? "border-green-300 bg-green-50/40"
                    : "border-border/60 bg-white/80"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveQuestion(isExpanded ? null : q.id)}
                  className="w-full px-4 py-3 flex items-start gap-3 text-left hover:bg-primary/5 transition-colors"
                >
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5 ${
                      isScored
                        ? "bg-green-500 text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {isScored ? "✓" : i + 1}
                  </span>
                  <div className="flex-1">
                    <p
                      className="text-sm font-medium text-foreground/90"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      {q.question}
                    </p>
                    {isScored && (
                      <span className="inline-block mt-0.5 text-xs font-semibold text-green-700">
                        +1 अंक अर्जित ⭐
                      </span>
                    )}
                  </div>
                  <span className="text-primary/50 text-xs mt-1">
                    {isExpanded ? "▲" : "▼"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-border/30 space-y-3 pt-3">
                    <textarea
                      value={currentAnswer}
                      onChange={(e) => handleTextChange(q.id, e.target.value)}
                      placeholder="अपना उत्तर यहाँ हिंदी में लिखें…"
                      rows={3}
                      className="w-full rounded-xl border border-border/60 bg-white/70 px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none resize-none shadow-sm"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    />

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAnswerSubmit(q)}
                        disabled={!currentAnswer.trim()}
                        className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all shadow-sm ${
                          currentAnswer.trim()
                            ? "bg-primary text-white hover:opacity-90 active:scale-95"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      >
                        ✓ उत्तर जाँचें और अंक पाएँ
                      </button>

                      {isScored && (
                        <span className="text-xs font-medium text-green-600">
                          ✓ उत्तर सुरक्षित हो चुका है (+1 Point)
                        </span>
                      )}
                    </div>

                    {/* Model Answer Display (When reveal is on or user clicks reveal) */}
                    {isGlobalReveal && (
                      <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 shadow-sm animate-fade-in">
                        <p className="font-bold text-amber-800 mb-1" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                          💡 आदर्श उत्तर (Model Answer):
                        </p>
                        <p style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                          {q.modelAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/30 pt-2 border-t border-border/20">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          छठी की प्रगति हेतु सरकार का उपहार
        </span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>पाठशाला</span>
      </div>
    </div>
  );
}

