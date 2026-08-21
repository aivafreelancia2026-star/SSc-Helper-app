"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

type TableRow = {
  id: string;
  number: string;
  digits: string[];
  readAs: string | string[];
  isExample: boolean;
};

const TABLE_DATA: TableRow[] = [
  {
    id: "r1",
    number: "41430495",
    digits: ["-", "4", "1", "4", "3", "0", "4", "9", "5"],
    readAs: "Four crore fourteen lakh thirty thousand four hundred ninety five",
    isExample: true,
  },
  {
    id: "r2",
    number: "304512031",
    digits: ["3", "0", "4", "5", "1", "2", "0", "3", "1"],
    readAs: [
      "Thirty crore forty five lakh twelve thousand thirty one",
      "Thirty crore forty-five lakh twelve thousand thirty-one",
      "Thirty crore forty five lakh twelve thousand and thirty one"
    ],
    isExample: false,
  },
  {
    id: "r3",
    number: "241800240",
    digits: ["2", "4", "1", "8", "0", "0", "2", "4", "0"],
    readAs: [
      "Twenty four crore eighteen lakh two hundred forty",
      "Twenty-four crore eighteen lakh two hundred forty",
      "Twenty four crore eighteen lakh two hundred and forty"
    ],
    isExample: false,
  },
  {
    id: "r4",
    number: "69097100",
    digits: ["-", "6", "9", "0", "9", "7", "1", "0", "0"],
    readAs: [
      "Six crore ninety lakh ninety seven thousand one hundred",
      "Six crore ninety lakh ninety-seven thousand one hundred"
    ],
    isExample: false,
  },
  {
    id: "r5",
    number: "100091409",
    digits: ["1", "0", "0", "0", "9", "1", "4", "0", "9"],
    readAs: [
      "Ten crore ninety one thousand four hundred nine",
      "Ten crore ninety-one thousand four hundred nine",
      "Ten crore ninety one thousand four hundred and nine"
    ],
    isExample: false,
  },
];

const DO_THIS_QUESTIONS = [
  {
    id: "dt1",
    q: "i. 999999999",
    ans: [
      "9 × 10,00,00,000 + 9 × 1,00,00,000 + 9 × 10,00,000 + 9 × 1,00,000 + 9 × 10,000 + 9 × 1,000 + 9 × 100 + 9 × 10 + 9 × 1",
      "9×10,00,00,000+9×1,00,00,000+9×10,00,000+9×1,00,000+9×10,000+9×1,000+9×100+9×10+9×1",
      "9×100000000+9×10000000+9×1000000+9×100000+9×10000+9×1000+9×100+9×10+9×1"
    ]
  },
  {
    id: "dt2",
    q: "ii. 34530678",
    ans: [
      "3 × 1,00,00,000 + 4 × 10,00,000 + 5 × 1,00,000 + 3 × 10,000 + 0 × 1,000 + 6 × 100 + 7 × 10 + 8 × 1",
      "3×1,00,00,000+4×10,00,000+5×1,00,000+3×10,000+0×1,000+6×100+7×10+8×1",
      "3 × 1,00,00,000 + 4 × 10,00,000 + 5 × 1,00,000 + 3 × 10,000 + 6 × 100 + 7 × 10 + 8 × 1"
    ]
  },
  {
    id: "dt3",
    q: "iii. 510010051",
    ans: [
      "5 × 10,00,00,000 + 1 × 1,00,00,000 + 0 × 10,00,000 + 0 × 1,00,000 + 1 × 10,000 + 0 × 1,000 + 0 × 100 + 5 × 10 + 1 × 1",
      "5×10,00,00,000+1×1,00,00,000+0×10,00,000+0×1,00,000+1×10,000+0×1,000+0×100+5×10+1×1",
      "5 × 10,00,00,000 + 1 × 1,00,00,000 + 1 × 10,000 + 5 × 10 + 1 × 1"
    ]
  }
];

export function C6MathsCh1Page9() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch1-page9";

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
    
    const allIds: string[] = [];
    TABLE_DATA.forEach((r, rIdx) => {
      if (!r.isExample) {
        if (rIdx >= 2) {
          for (let i = 0; i < 9; i++) {
            allIds.push(`${r.id}_d${i}`);
          }
        }
        allIds.push(`${r.id}_read`);
      }
    });
    DO_THIS_QUESTIONS.forEach(q => allIds.push(q.id));

    allIds.forEach((id) => {
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
  }, []);

  useEffect(() => {
    function handleReset() {
      const allIds: string[] = [];
      TABLE_DATA.forEach((r, rIdx) => {
        if (!r.isExample) {
          if (rIdx >= 2) {
            for (let i = 0; i < 9; i++) {
              allIds.push(`${r.id}_d${i}`);
            }
          }
          allIds.push(`${r.id}_read`);
        }
      });
      DO_THIS_QUESTIONS.forEach(q => allIds.push(q.id));

      allIds.forEach((id) => {
        localStorage.removeItem(`${storageKey}-${id}-answer`);
        localStorage.removeItem(`${storageKey}-${id}-graded`);
      });
      setAnswers({});
      setGraded({});
    }
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () =>
      window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, []);

  const handleChange = (id: string, v: string) => {
    setAnswers((prev) => ({ ...prev, [id]: v }));
    localStorage.setItem(`${storageKey}-${id}-answer`, v);
  };

  const handleBlur = (id: string, correctAnswers: string | string[]) => {
    if (isRevealed) return;
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/[\s,]+/g, "");
    if (!typed) return;
    const prev = graded[id];
    if (prev && prev.value === typed) return;

    const correctArray = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers];
    const correct = correctArray.some(
      (a) => a.trim().toLowerCase().replace(/[\s,]+/g, "") === typed
    );

    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }

    if (delta !== 0) {
      addPoints(delta);
    }
    
    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: typed, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: typed, correct })
    );
  };

  function inputClass(id: string): string {
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/[\s,]+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === typed ? g.correct : null;
    if (isRevealed) return "border-primary bg-primary/5 font-bold text-primary";
    if (isCorrect === true)
      return "border-green-500 bg-green-50 text-green-700 font-bold";
    if (isCorrect === false)
      return "border-destructive bg-destructive/5 text-destructive";
    return "border-border/60 focus:border-primary";
  }

  function badge(id: string, noAbsolute = false) {
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/[\s,]+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === typed ? g.correct : null;
    if (isRevealed) return null;
    if (isCorrect === true)
      return (
        <span className={noAbsolute ? "text-green-600 font-bold text-xs" : "absolute right-2 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs"}>
          ✓
        </span>
      );
    if (isCorrect === false)
      return (
        <span className={noAbsolute ? "text-destructive font-bold text-xs" : "absolute right-2 top-1/2 -translate-y-1/2 text-destructive font-bold text-xs"}>
          ✗
        </span>
      );
    return null;
  }

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {feedback !== null && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      <p className="text-foreground/90">
        Now let us write the large numbers using the place value chart and read the number as given below:
      </p>

      {/* ── Table ────────────────────────────── */}
      <div className="overflow-x-auto rounded-[12px] border border-emerald-200 shadow-sm mb-6">
        <table className="w-full border-collapse text-center text-[11px] md:text-xs">
          <thead>
            <tr className="bg-emerald-600 text-white">
              <th className="border border-emerald-700 px-2 py-2 font-semibold">Number</th>
              <th className="border border-emerald-700 px-2 py-2 font-semibold">T.Cr.</th>
              <th className="border border-emerald-700 px-2 py-2 font-semibold">Cr.</th>
              <th className="border border-emerald-700 px-2 py-2 font-semibold">T.La</th>
              <th className="border border-emerald-700 px-2 py-2 font-semibold">La</th>
              <th className="border border-emerald-700 px-2 py-2 font-semibold">T.Th.</th>
              <th className="border border-emerald-700 px-2 py-2 font-semibold">Th.</th>
              <th className="border border-emerald-700 px-2 py-2 font-semibold">H</th>
              <th className="border border-emerald-700 px-2 py-2 font-semibold">T</th>
              <th className="border border-emerald-700 px-2 py-2 font-semibold">O</th>
              <th className="border border-emerald-700 px-2 py-2 font-semibold text-left">Read as</th>
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, rIdx) => {
              const bgClass = rIdx % 2 === 0 ? "bg-emerald-50/30" : "bg-white";
              const readId = `${row.id}_read`;

              return (
                <tr key={row.id} className={bgClass}>
                  <td className="border border-emerald-100 px-2 py-3 font-semibold text-emerald-900 tabular-nums">
                    {row.number}
                  </td>
                  
                  {row.digits.map((digit, dIdx) => {
                    const dId = `${row.id}_d${dIdx}`;
                    // For rows index >= 2 (3rd row onwards), provide inputs for digits
                    const isInputDigit = !row.isExample && rIdx >= 2;
                    
                    return (
                      <td key={dIdx} className="border border-emerald-100 px-1 py-1">
                        {isInputDigit ? (
                          <div className="relative w-8 h-8 mx-auto">
                            <input
                              type="text"
                              value={
                                isRevealed
                                  ? digit
                                  : (answers[dId] ?? "")
                              }
                              disabled={isRevealed}
                              onChange={(e) => handleChange(dId, e.target.value)}
                              onBlur={() => handleBlur(dId, digit)}
                              className={`w-full h-full rounded text-center text-xs font-mono focus:outline-none transition-all ${inputClass(
                                dId
                              )}`}
                            />
                          </div>
                        ) : (
                          <span className="font-mono">{digit}</span>
                        )}
                      </td>
                    );
                  })}
                  
                  <td className="border border-emerald-100 px-2 py-2 text-left min-w-[200px]">
                    {row.isExample ? (
                      <span>{row.readAs}</span>
                    ) : (
                      <div className="relative w-full">
                        <textarea
                          value={
                            isRevealed
                              ? (Array.isArray(row.readAs) ? row.readAs[0] : row.readAs)
                              : (answers[readId] ?? "")
                          }
                          disabled={isRevealed}
                          onChange={(e) => handleChange(readId, e.target.value)}
                          onBlur={() => handleBlur(readId, row.readAs)}
                          placeholder="Read as..."
                          className={`w-full rounded-[6px] border bg-white px-2 py-1.5 text-xs focus:outline-none transition-all shadow-sm resize-none h-14 ${inputClass(
                            readId
                          )}`}
                        />
                        <div className="absolute right-2 top-2">
                          {badge(readId, true)}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p>Think of five more large numbers and write them. Can you write the expanded form of these numbers as shown below?</p>
      
      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm text-sm">
        <p className="font-semibold text-amber-900 mb-2">Expansion of 12735045</p>
        <p className="font-mono leading-loose break-words text-amber-950 bg-white p-3 rounded-lg">
          1,27,35,045 = 1 × 1,00,00,000 + 2 × 10,00,000 + 7 × 1,00,000 + 3 × 10,000 + 5 × 1,000 + 0 × 100 + 4 × 10 + 5 × 1
        </p>
      </div>

      {/* ── DO THIS ─────────────────────────── */}
      <div className="rounded-[16px] border-2 border-indigo-400 overflow-hidden shadow-sm mt-8">
        <div className="bg-indigo-600 px-4 py-2 flex items-center gap-2">
          <span className="text-white text-lg">📝</span>
          <h2 className="font-heading text-base font-bold text-white tracking-wider">
            DO THIS
          </h2>
        </div>
        <div className="bg-indigo-50/40 p-5 space-y-4">
          <p className="font-medium text-indigo-900">Expand the numbers using commas.</p>
          <div className="space-y-4">
            {DO_THIS_QUESTIONS.map(q => (
              <div key={q.id} className="flex flex-col gap-2">
                <span className="font-semibold text-foreground/80">{q.q}</span>
                <div className="relative w-full">
                  <textarea
                    value={
                      isRevealed
                        ? q.ans[0]
                        : (answers[q.id] ?? "")
                    }
                    disabled={isRevealed}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    onBlur={() => handleBlur(q.id, q.ans)}
                    placeholder="Write expanded form..."
                    className={`w-full rounded-[8px] border bg-white p-3 text-xs font-mono focus:outline-none transition-all shadow-sm resize-none h-20 ${inputClass(
                      q.id
                    )}`}
                  />
                  <div className="absolute right-3 top-3">
                    {badge(q.id, true)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 1.5.2 Usage of commas ─────────────── */}
      <div className="space-y-4 mt-8">
        <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <span className="font-bold">1.5.2</span>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Usage of commas
          </h2>
        </div>

        <p className="mt-4">
          In our Indian system of numeration we use ones, tens, hundreds, thousands, lakhs and crores. Commas are used to mark thousands, lakhs and crores. The first comma comes after hundred place (i.e. three digits from the right) and marks thousands 74517,500. The second comma comes two digits later (i.e. five digits from the right) 745,17,500. It comes after ten thousands place and marks lakh. The third comma comes after another two digits (i.e. seven digits from the right) 7,45,17,500. It comes after ten lakhs place and marks crore. Commas help us in reading and writing large numbers easily.
        </p>

        <p>
          For example, Seven crore forty five lakh seventeen thousand and five hundred can be written as,
        </p>
        <p className="font-mono font-bold text-center text-lg text-emerald-800 my-4">
          7, 45, 17, 500
        </p>

        <p>
          Similarly we can easily read this number which is separated by commas as 45,30,14,252 (Forty five crore thirty lakh fourteen thousand two hundred fifty two).
        </p>
      </div>

      {/* ── Footer banner ────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white mt-8"
        style={{
          background: "linear-gradient(90deg, #16a34a 0%, #22c55e 100%)",
        }}
      >
        <span className="tracking-wide flex-1 text-center">Government's Gift for Students' Progress</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-green-600 text-xs font-extrabold ml-3">
          9
        </span>
      </div>
    </div>
  );
}
