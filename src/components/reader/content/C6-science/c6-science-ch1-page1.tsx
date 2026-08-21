"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { TipBox } from "@/components/reader/tip-box";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

type FoodItemQuiz = {
  id: string;
  emoji: string;
  placeholder: string;
  correctAnswers: string[];
  displayLabel: string;
};

const QUIZ_ITEMS: FoodItemQuiz[] = [
  { id: "dosa", emoji: "🥞", placeholder: "Type here...", correctAnswers: ["dosa", "dhosa", "dose"], displayLabel: "Dosa" },
  { id: "idly", emoji: "🍚", placeholder: "Type here...", correctAnswers: ["idly", "idli", "idly with chutney", "idli with chutney"], displayLabel: "Idly" },
  { id: "samosa", emoji: "🥟", placeholder: "Type here...", correctAnswers: ["samosa", "samosas"], displayLabel: "Samosa" },
  { id: "rice", emoji: "🍛", placeholder: "Type here...", correctAnswers: ["rice", "dal rice", "rice & dal", "rice and dal", "meals", "meal"], displayLabel: "Rice & Dal" },
  { id: "vada", emoji: "🥯", placeholder: "Type here...", correctAnswers: ["vada", "vadalu", "vadas", "medu vada", "wada"], displayLabel: "Vada" },
  { id: "roti", emoji: "🫓", placeholder: "Type here...", correctAnswers: ["roti", "chapati", "paratha", "paratha with curry", "roti with curry", "chapati with curry"], displayLabel: "Chapati / Roti" },
  { id: "laddu", emoji: "🟡", placeholder: "Type here...", correctAnswers: ["laddu", "ladoo", "laddu sweet", "sweet", "sweets"], displayLabel: "Laddu" },
  { id: "kheer", emoji: "🥣", placeholder: "Type here...", correctAnswers: ["kheer", "payasam", "sweet"], displayLabel: "Kheer / Payasam" },
  { id: "icecream", emoji: "🍨", placeholder: "Type here...", correctAnswers: ["ice cream", "icecream", "ice cream sundae", "sundae"], displayLabel: "Ice cream" },
];

export function C6ScienceCh1Page1() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);

  const storageKeyPrefix = "c6-science-ch1-page1-quiz";

  // Load saved state
  useEffect(() => {
    const savedAnswers: Record<string, string> = {};
    const savedGraded: Record<string, { value: string; correct: boolean }> = {};
    
    QUIZ_ITEMS.forEach((item) => {
      const ans = localStorage.getItem(`${storageKeyPrefix}-${item.id}-answer`);
      if (ans) savedAnswers[item.id] = ans;

      const gr = localStorage.getItem(`${storageKeyPrefix}-${item.id}-graded`);
      if (gr) {
        try {
          savedGraded[item.id] = JSON.parse(gr);
        } catch {}
      }
    });

    setAnswers(savedAnswers);
    setGraded(savedGraded);
  }, []);

  // Handle reset event
  useEffect(() => {
    function handleReset() {
      const resetAnswers: Record<string, string> = {};
      QUIZ_ITEMS.forEach((item) => {
        localStorage.removeItem(`${storageKeyPrefix}-${item.id}-answer`);
        resetAnswers[item.id] = "";
      });
      setAnswers(resetAnswers);
    }
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, []);

  const handleChange = (id: string, value: string) => {
    const updatedAnswers = { ...answers, [id]: value };
    setAnswers(updatedAnswers);
    localStorage.setItem(`${storageKeyPrefix}-${id}-answer`, value);
  };

  const handleBlur = (item: FoodItemQuiz) => {
    if (isRevealed) return;

    const typedValue = (answers[item.id] ?? "").trim().toLowerCase();
    if (!typedValue) return;

    const previous = graded[item.id];
    if (previous && previous.value === typedValue) return;

    const correct = item.correctAnswers.some((ans) => ans.toLowerCase() === typedValue);
    addPoints(correct ? 1 : -1);
    setFeedback({ correct, id: Date.now() });

    const newGraded = {
      ...graded,
      [item.id]: { value: typedValue, correct },
    };
    setGraded(newGraded);
    localStorage.setItem(`${storageKeyPrefix}-${item.id}-graded`, JSON.stringify({ value: typedValue, correct }));
  };

  return (
    <div className="w-full space-y-5 font-body text-sm leading-relaxed text-foreground/90">
      {feedback !== null && (
        <AnswerFeedback key={feedback.id} correct={feedback.correct} onDone={() => setFeedback(null)} />
      )}

      {/* Header Banner matching Page 1 screenshot */}
      <div className="rounded-[16px] border border-sky-300 bg-sky-100/50 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-sky-600 text-white rounded-lg px-4 py-2 text-xl font-bold font-heading">
            1
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-sky-900 leading-tight">
              Our Food
            </h1>
          </div>
        </div>
        {/* Simulating the textbook QR code block */}
        <div className="border border-sky-300 bg-white rounded p-1 flex flex-col items-center">
          <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center text-[5px] text-white font-mono text-center leading-none">
            QR CODE
          </div>
          <span className="text-[7px] font-bold text-sky-800 tracking-widest mt-0.5">RSHSX8</span>
        </div>
      </div>

      <p>
        If any one asks you about your favourite food item, what will you answer? The list may
        include several things like laddu, biryani, idly-sambar, pulihora, cheese, butter,
        biscuits, dal, brinjal curry and so on.
      </p>
      <p>
        But if you are asked about the food ingredients needed and how they have been cooked,
        then, it may be difficult for you to answer.
      </p>
      <p>
        Generally we take interest in eating variety of food and don&apos;t bother about other
        things, like what ingredients are needed to prepare brinjal curry or biryani and how idly
        can be made soft?
      </p>

      <h2 className="font-heading text-base font-bold text-primary">1.1. Our Food</h2>
      <p>
        We take food for energy and health. Not only eating food but also knowing the information
        about the ingredients needed for preparing food and their sources is also important. In
        this chapter, we will discuss about the ingredients needed, cooking methods and food
        sources.
      </p>
      <p className="font-semibold text-primary/90">Observe the following food items and name them.</p>

      {/* Textbook Image Container */}
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
        <img
          src="/assets/images/C6-science/fig1.png"
          alt="Fig 1 : Variety of food"
          className="max-w-full h-auto rounded-lg shadow-sm max-h-[220px]"
        />
        <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
          Fig 1 : Variety of food
        </p>
      </div>

      {/* Interactive Food Quiz Section */}
      <div className="grid grid-cols-3 gap-3">
        {QUIZ_ITEMS.map((item, index) => {
          const typedVal = answers[item.id] ?? "";
          const isCorrect = graded[item.id]?.value === typedVal.trim().toLowerCase() ? graded[item.id]?.correct : null;

          return (
            <div
              key={item.id}
              className="rounded-[12px] border border-border/40 bg-white/60 p-2.5 flex flex-col items-center gap-1 shadow-sm relative group hover:border-primary/40 hover:bg-white/80 transition-all"
            >
              <span className="text-xs font-bold text-sky-800">Item {index + 1}</span>
              <div className="w-full relative">
                <input
                  type="text"
                  value={typedVal}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  onBlur={() => handleBlur(item)}
                  placeholder={item.placeholder}
                  className={`w-full text-center rounded-[8px] border bg-white/80 px-2 py-1 text-xs text-foreground placeholder:text-foreground/30 focus:outline-none transition-all ${
                    isRevealed ? "border-primary bg-primary/5" :
                    isCorrect === true ? "border-green-500 bg-green-50 text-green-700" :
                    isCorrect === false ? "border-destructive bg-destructive/5 text-destructive" :
                    "border-border/60 focus:border-primary"
                  }`}
                />
                {isRevealed && (
                  <span className="absolute -bottom-4 left-0 right-0 text-[8px] text-center font-bold text-primary">
                    {item.displayLabel}
                  </span>
                )}
              </div>
              
              {/* Correctness indicators */}
              {isCorrect === true && !isRevealed && (
                <span className="absolute top-1.5 right-1.5 text-green-600 font-bold text-[10px] bg-green-100 rounded-full w-4 h-4 flex items-center justify-center">✓</span>
              )}
              {isCorrect === false && !isRevealed && (
                <span className="absolute top-1.5 right-1.5 text-destructive font-bold text-[10px] bg-destructive/10 rounded-full w-4 h-4 flex items-center justify-center">✗</span>
              )}
            </div>
          );
        })}
      </div>

      <TipBox>Banana contains potassium which is useful for us.</TipBox>
    </div>
  );
}
