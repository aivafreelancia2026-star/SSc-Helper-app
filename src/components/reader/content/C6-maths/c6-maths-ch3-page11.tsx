"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

const ALL_INPUT_IDS = [
  // Example 2 Interactive Check
  "q_ex2_last_divisor",
  "q_ex2_hcf_56_64",
  // Example 3 Step 1 & Step 2 Checks
  "q_ex3_hcf_40_56",
  "q_ex3_hcf_8_60",
  "q_ex3_final_hcf",
  // Try it yourself practice
  "q_try_euclid_hcf_75_100",
];

const CORRECT: Record<string, string[]> = {
  q_ex2_last_divisor: ["8", "eight"],
  q_ex2_hcf_56_64: ["8", "eight", "hcf=8", "8."],
  q_ex3_hcf_40_56: ["8", "eight", "hcf=8"],
  q_ex3_hcf_8_60: ["4", "four", "hcf=4"],
  q_ex3_final_hcf: ["4", "four", "hcf=4", "4."],
  // HCF of 75 and 100 via Continued Division: 100 = 75 * 1 + 25; 75 = 25 * 3 + 0 -> HCF = 25
  q_try_euclid_hcf_75_100: ["25", "twentyfive", "25."],
};

const REVEAL_TEXT: Record<string, string> = {
  q_ex2_last_divisor: "8 (Last divisor when remainder became 0)",
  q_ex2_hcf_56_64: "8 (Therefore HCF(56, 64) = 8)",
  q_ex3_hcf_40_56: "8 (Step-1: HCF of 40 and 56 is 8)",
  q_ex3_hcf_8_60: "4 (Step-2: HCF of 8 and 60 is 4)",
  q_ex3_final_hcf: "4 (Step-3: Therefore HCF of 40, 56 and 60 is 4)",
  q_try_euclid_hcf_75_100: "25 (100 ÷ 75 = 1 R 25 → 75 ÷ 25 = 3 R 0 → Last divisor is 25)",
};

export function C6MathsCh3Page11() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page11";

  const [interactiveStep, setInteractiveStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    ALL_INPUT_IDS.forEach((id) => {
      const a = localStorage.getItem(`${storageKey}-${id}-answer`);
      if (a) saved[id] = a;
      const g = localStorage.getItem(`${storageKey}-${id}-graded`);
      if (g) {
        try {
          savedG[id] = JSON.parse(g);
        } catch {}
      }
    });
    setAnswers(saved);
    setGraded(savedG);
  }, [storageKey]);

  useEffect(() => {
    const handleReset = () => {
      ALL_INPUT_IDS.forEach((id) => {
        localStorage.removeItem(`${storageKey}-${id}-answer`);
        localStorage.removeItem(`${storageKey}-${id}-graded`);
      });
      setAnswers({});
      setGraded({});
      setFeedback(null);
      setInteractiveStep(0);
    };
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () =>
      window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, [storageKey]);

  const handleChange = (id: string, val: string) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
    localStorage.setItem(`${storageKey}-${id}-answer`, val);
  };

  const handleBlurText = (
    id: string,
    correctAnswers: string[],
    isOpenEnded = false
  ) => {
    if (isRevealed) return;
    const normalize = (s: string) =>
      s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

    const rawTyped = answers[id] ?? "";
    const typed = normalize(rawTyped);
    if (!typed && !isOpenEnded) return;
    if (isOpenEnded && !rawTyped.trim()) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return;

    let correct = false;
    if (isOpenEnded) {
      const lower = rawTyped.toLowerCase().replace(/[^a-z0-9]/g, "");
      correct =
        correctAnswers.some((ans) => lower.includes(normalize(ans))) ||
        rawTyped.trim().length >= 3;
    } else {
      correct = correctAnswers.some((ans) => normalize(ans) === typed);
    }

    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    if (delta !== 0) addPoints(delta);

    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: typed, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: typed, correct })
    );
  };

  function inputClass(id: string): string {
    const typed = (answers[id] ?? "").trim();
    if (isRevealed)
      return "border-emerald-500 bg-emerald-50 font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300";
    if (!typed) return "border-teal-200 focus:border-teal-500 bg-background";
    const g = graded[id];
    if (g?.correct === true)
      return "border-green-500 bg-green-50 text-green-700 font-bold dark:bg-green-950/30 dark:text-green-300";
    if (g?.correct === false)
      return "border-destructive bg-destructive/5 text-destructive";
    return "border-teal-200 focus:border-teal-500 bg-background";
  }

  function badge(id: string) {
    if (isRevealed) return null;
    const typed = (answers[id] ?? "").trim();
    if (!typed) return null;
    const g = graded[id];
    if (g?.correct === true)
      return (
        <span className="absolute right-2.5 top-2.5 text-green-600 font-bold text-xs select-none bg-white/80 dark:bg-black/80 rounded-full px-1.5 py-0.5">
          ✓
        </span>
      );
    if (g?.correct === false)
      return (
        <span className="absolute right-2.5 top-2.5 text-destructive font-bold text-xs select-none bg-white/80 dark:bg-black/80 rounded-full px-1.5 py-0.5">
          ✗
        </span>
      );
    return null;
  }

  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-primary/20 pb-4">
        <div className="inline-flex items-center justify-center bg-teal-600 text-white font-heading font-bold text-lg px-3.5 py-1.5 rounded-lg shadow-sm w-fit">
          2
        </div>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
          HCF by Continued Division Method (Euclidean Algorithm)
        </h2>
      </div>

      {/* Concept Box */}
      <div className="rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40 p-5 space-y-3">
        <p className="text-base sm:text-lg">
          This method of division was invented by the famous Greek mathematician <strong>Euclid</strong>.
        </p>
        <div className="p-4 bg-background/80 rounded-xl border border-teal-300 dark:border-teal-800 space-y-2">
          <p className="text-sm sm:text-base">
            <strong>Rule:</strong> Divide the larger number by the smaller and then divide the previous divisor by the remainder until the remainder is <strong>0</strong>.
          </p>
          <p className="text-base font-bold text-teal-800 dark:text-teal-300">
            The <span className="underline underline-offset-4 decoration-2 text-primary">last divisor</span> is the HCF of the numbers.
          </p>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground italic">
          * This method is especially useful to find the HCF of larger numbers quickly without listing all prime factors.
        </p>
      </div>

      {/* EXAMPLE 2: HCF of 56 and 64 */}
      <div className="rounded-2xl border-2 border-teal-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3 text-lg tracking-wide flex items-center justify-between">
          <span>📘 Example - 2</span>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-mono">
            HCF of 56 and 64
          </span>
        </div>

        <div className="p-5 space-y-5">
          <p className="text-sm sm:text-base font-semibold">
            <strong>Find the HCF of 56 and 64:</strong>
          </p>

          {/* Division Diagram Graphic */}
          <div className="flex flex-col md:flex-row items-center justify-around gap-6 p-5 bg-muted/20 rounded-xl border border-border">
            {/* Euclid Division Column Display */}
            <div className="font-mono text-base border-2 border-teal-600 rounded-xl p-5 bg-background shadow-xs space-y-1 min-w-[240px]">
              <div className="flex items-center justify-start gap-2 border-b border-border pb-1">
                <span className="text-muted-foreground font-semibold">56 )</span>
                <span className="font-bold">64</span>
                <span className="text-teal-700 dark:text-teal-300 font-bold">( 1</span>
              </div>
              <div className="text-muted-foreground pl-6">- 56</div>
              <div className="border-b border-border pt-1"></div>

              {/* Step 2 in continued division */}
              <div className="pt-2 flex items-center justify-start gap-2 border-b border-border pb-1">
                <span className="text-xs font-bold text-muted-foreground uppercase mr-1">Last Divisor &rarr;</span>
                <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-800 dark:text-teal-200 border border-teal-500 font-bold">8 )</span>
                <span className="font-bold">56</span>
                <span className="text-teal-700 dark:text-teal-300 font-bold">( 7</span>
              </div>
              <div className="text-muted-foreground pl-20">- 56</div>
              <div className="border-b border-border pt-1"></div>
              <div className="flex items-center justify-between pt-1 text-sm">
                <span className="text-muted-foreground font-bold">Remainder:</span>
                <span className="font-bold text-green-600 dark:text-green-400 text-base">0</span>
              </div>
            </div>

            {/* Explanation side */}
            <div className="space-y-3 max-w-sm text-sm sm:text-base">
              <p>
                1. Divide <span className="font-mono font-bold">64 ÷ 56 = 1</span> with remainder <strong>8</strong>.
              </p>
              <p>
                2. Divide previous divisor <span className="font-mono font-bold">56 ÷ 8 = 7</span> with remainder <strong>0</strong>.
              </p>
              <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-300 dark:border-teal-800 text-teal-900 dark:text-teal-200 font-semibold">
                Last divisor is <strong>8</strong> when remainder becomes 0.
                <br />
                <span className="text-base text-primary font-bold">Thus, HCF of 56 and 64 is 8.</span>
              </div>
            </div>
          </div>

          {/* Quick interactive check */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">What is the last divisor?</span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter number..."
                  value={
                    isRevealed
                      ? REVEAL_TEXT["q_ex2_last_divisor"]
                      : answers["q_ex2_last_divisor"] ?? ""
                  }
                  onChange={(e) => handleChange("q_ex2_last_divisor", e.target.value)}
                  onBlur={() =>
                    handleBlurText(
                      "q_ex2_last_divisor",
                      CORRECT["q_ex2_last_divisor"]
                    )
                  }
                  disabled={isRevealed}
                  className={`w-full rounded-xl border px-3 py-2 text-sm font-mono outline-none transition-colors ${inputClass(
                    "q_ex2_last_divisor"
                  )}`}
                />
                {badge("q_ex2_last_divisor")}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">HCF of 56 and 64:</span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter HCF..."
                  value={
                    isRevealed
                      ? REVEAL_TEXT["q_ex2_hcf_56_64"]
                      : answers["q_ex2_hcf_56_64"] ?? ""
                  }
                  onChange={(e) => handleChange("q_ex2_hcf_56_64", e.target.value)}
                  onBlur={() =>
                    handleBlurText(
                      "q_ex2_hcf_56_64",
                      CORRECT["q_ex2_hcf_56_64"]
                    )
                  }
                  disabled={isRevealed}
                  className={`w-full rounded-xl border px-3 py-2 text-sm font-mono outline-none transition-colors ${inputClass(
                    "q_ex2_hcf_56_64"
                  )}`}
                />
                {badge("q_ex2_hcf_56_64")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXAMPLE 3: HCF of 3 numbers (40, 56 and 60) */}
      <div className="rounded-2xl border-2 border-indigo-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-indigo-700 text-white font-heading font-bold px-5 py-3 text-lg tracking-wide flex items-center justify-between">
          <span>📘 Example - 3</span>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-mono">
            HCF of 3 numbers: 40, 56 and 60
          </span>
        </div>

        <div className="p-5 space-y-6">
          <p className="text-sm sm:text-base font-semibold">
            <strong>Find the HCF of 40, 56 and 60:</strong>
          </p>

          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-600 text-white rounded font-bold text-xs">Step - 1</span>
              <span className="font-heading font-bold text-sm sm:text-base">
                First find the HCF of any two numbers. Let us find the HCF of 40 and 56:
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-around gap-4">
              {/* Step 1 division visual */}
              <div className="font-mono text-xs sm:text-sm border-2 border-indigo-500/40 rounded-xl p-4 bg-background shadow-xs space-y-1">
                <div className="flex gap-2">
                  <span>40 )</span>
                  <span className="font-bold">56</span>
                  <span className="text-indigo-600 font-bold">( 1</span>
                </div>
                <div className="text-muted-foreground pl-4">- 40</div>
                <div className="border-b border-border my-1"></div>
                <div className="flex gap-2">
                  <span className="text-muted-foreground">Remainder</span>
                  <span className="font-bold">16 )</span>
                  <span className="font-bold">40</span>
                  <span className="text-indigo-600 font-bold">( 2</span>
                </div>
                <div className="text-muted-foreground pl-20">- 32</div>
                <div className="border-b border-border my-1"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Last Divisor &rarr;</span>
                  <span className="font-bold bg-teal-500/20 px-1 rounded border border-teal-500">8 )</span>
                  <span className="font-bold">16</span>
                  <span className="text-indigo-600 font-bold">( 2</span>
                </div>
                <div className="text-muted-foreground pl-20">- 16</div>
                <div className="border-b border-border my-1"></div>
                <div className="text-right font-bold text-green-600">Remainder = 0</div>
              </div>

              <div className="space-y-2 text-sm">
                <p>HCF of 40 and 56 is <strong className="text-primary text-base">8</strong>.</p>
                <div className="relative max-w-xs">
                  <input
                    type="text"
                    placeholder="Enter HCF of 40 & 56..."
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_ex3_hcf_40_56"]
                        : answers["q_ex3_hcf_40_56"] ?? ""
                    }
                    onChange={(e) =>
                      handleChange("q_ex3_hcf_40_56", e.target.value)
                    }
                    onBlur={() =>
                      handleBlurText(
                        "q_ex3_hcf_40_56",
                        CORRECT["q_ex3_hcf_40_56"]
                      )
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3 py-1.5 text-xs sm:text-sm font-mono outline-none transition-colors ${inputClass(
                      "q_ex3_hcf_40_56"
                    )}`}
                  />
                  {badge("q_ex3_hcf_40_56")}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-600 text-white rounded font-bold text-xs">Step - 2</span>
              <span className="font-heading font-bold text-sm sm:text-base">
                Then, find the HCF of the third number (60) and the HCF of first two numbers (8):
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-around gap-4">
              {/* Step 2 division visual */}
              <div className="font-mono text-xs sm:text-sm border-2 border-indigo-500/40 rounded-xl p-4 bg-background shadow-xs space-y-1">
                <div className="flex gap-2">
                  <span>8 )</span>
                  <span className="font-bold">60</span>
                  <span className="text-indigo-600 font-bold">( 7</span>
                </div>
                <div className="text-muted-foreground pl-4">- 56</div>
                <div className="border-b border-border my-1"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Last Divisor &rarr;</span>
                  <span className="font-bold bg-teal-500/20 px-1 rounded border border-teal-500">4 )</span>
                  <span className="font-bold">8</span>
                  <span className="text-indigo-600 font-bold">( 2</span>
                </div>
                <div className="text-muted-foreground pl-14">- 8</div>
                <div className="border-b border-border my-1"></div>
                <div className="text-right font-bold text-green-600">Remainder = 0</div>
              </div>

              <div className="space-y-2 text-sm">
                <p>HCF of 8 and 60 is <strong className="text-primary text-base">4</strong>.</p>
                <div className="relative max-w-xs">
                  <input
                    type="text"
                    placeholder="Enter HCF of 8 & 60..."
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_ex3_hcf_8_60"]
                        : answers["q_ex3_hcf_8_60"] ?? ""
                    }
                    onChange={(e) =>
                      handleChange("q_ex3_hcf_8_60", e.target.value)
                    }
                    onBlur={() =>
                      handleBlurText(
                        "q_ex3_hcf_8_60",
                        CORRECT["q_ex3_hcf_8_60"]
                      )
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3 py-1.5 text-xs sm:text-sm font-mono outline-none transition-colors ${inputClass(
                      "q_ex3_hcf_8_60"
                    )}`}
                  />
                  {badge("q_ex3_hcf_8_60")}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Final Conclusion */}
          <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-teal-600 text-white rounded font-bold text-xs">Step - 3</span>
              <span className="font-heading font-bold text-sm sm:text-base text-teal-950 dark:text-teal-100">
                This number is the HCF of the given three numbers.
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <span className="font-bold text-base text-teal-900 dark:text-teal-200">
                Thus HCF of 40, 56 and 60 is:
              </span>
              <div className="relative w-32">
                <input
                  type="text"
                  placeholder="Final HCF"
                  value={
                    isRevealed
                      ? REVEAL_TEXT["q_ex3_final_hcf"]
                      : answers["q_ex3_final_hcf"] ?? ""
                  }
                  onChange={(e) =>
                    handleChange("q_ex3_final_hcf", e.target.value)
                  }
                  onBlur={() =>
                    handleBlurText(
                      "q_ex3_final_hcf",
                      CORRECT["q_ex3_final_hcf"]
                    )
                  }
                  disabled={isRevealed}
                  className={`w-full rounded-xl border px-3 py-1.5 text-center font-mono font-bold text-sm outline-none transition-colors ${inputClass(
                    "q_ex3_final_hcf"
                  )}`}
                />
                {badge("q_ex3_final_hcf")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bonus Practice Checkpoint */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-card p-5 space-y-3 shadow-sm">
        <h4 className="font-heading font-bold text-base text-primary flex items-center gap-2">
          <span>🧠</span> Try it yourself via Continued Division:
        </h4>
        <label className="block text-sm sm:text-base font-semibold">
          Find the HCF of <strong>75 and 100</strong> by Euclid&apos;s continued division:
        </label>
        <div className="relative max-w-sm">
          <input
            type="text"
            placeholder="e.g. 25"
            value={
              isRevealed
                ? REVEAL_TEXT["q_try_euclid_hcf_75_100"]
                : answers["q_try_euclid_hcf_75_100"] ?? ""
            }
            onChange={(e) =>
              handleChange("q_try_euclid_hcf_75_100", e.target.value)
            }
            onBlur={() =>
              handleBlurText(
                "q_try_euclid_hcf_75_100",
                CORRECT["q_try_euclid_hcf_75_100"]
              )
            }
            disabled={isRevealed}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm font-mono outline-none transition-colors ${inputClass(
              "q_try_euclid_hcf_75_100"
            )}`}
          />
          {badge("q_try_euclid_hcf_75_100")}
        </div>
        {isRevealed && (
          <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
            <strong>Answer:</strong> {REVEAL_TEXT["q_try_euclid_hcf_75_100"]}
          </div>
        )}
      </div>
    </div>
  );
}
