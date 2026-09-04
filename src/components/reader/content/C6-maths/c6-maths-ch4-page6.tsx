"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input field IDs
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "q_point_y_location",
  "q_point_y_extend",
  "q_point_m_extend",
  
  "q_ex1_angle_ii",
  "q_ex1_angle_iii",
  "q_ex1_angle_iv",
  
  "q_ex1_vertex_ii",
  "q_ex1_vertex_iii",
  "q_ex1_vertex_iv",
  
  "q_ex1_arms_ii",
  "q_ex1_arms_iii",
  "q_ex1_arms_iv",
];

/* ─────────────────────────────────────────────
   Accepted correct answers
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  q_point_y_location: ["exterior", "outside", "exteriorpart", "intheexterior", "inexterior", "outsidetheangle"],
  q_point_y_extend: ["no", "itwillnot", "false"],
  q_point_m_extend: ["no", "notpossible", "false", "wecannot"],
  
  // Angle ii (accepting multiple forms and potentially different order if user ignores placeholders)
  q_ex1_angle_ii: ["boc", "cob", "angleboc", "anglecob", "bocangle", "cobangle"],
  q_ex1_vertex_ii: ["o", "pointo", "vertexo"],
  q_ex1_arms_ii: ["oboc", "ocob", "obandoc", "ocandob", "rayobrayoc", "rayocrayob", "ob,oc", "oc,ob"],
  
  // Angle iii
  q_ex1_angle_iii: ["cod", "doc", "anglecod", "angledoc", "codangle", "docangle"],
  q_ex1_vertex_iii: ["o", "pointo", "vertexo"],
  q_ex1_arms_iii: ["ocod", "odoc", "ocandod", "odandoc", "rayocrayod", "rayodrayoc", "oc,od", "od,oc"],
  
  // Angle iv
  q_ex1_angle_iv: ["doa", "aod", "angledoa", "angleaod", "doaangle", "aodangle"],
  q_ex1_vertex_iv: ["o", "pointo", "vertexo"],
  q_ex1_arms_iv: ["odoa", "oaod", "odandoa", "oaandod", "rayodrayoa", "rayoarayod", "od,oa", "oa,od"],
};

/* ─────────────────────────────────────────────
   Reveal text for teacher / answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_point_y_location: "Exterior",
  q_point_y_extend: "No",
  q_point_m_extend: "No",
  
  q_ex1_angle_ii: "∠BOC",
  q_ex1_vertex_ii: "O",
  q_ex1_arms_ii: "OB, OC",
  
  q_ex1_angle_iii: "∠COD",
  q_ex1_vertex_iii: "O",
  q_ex1_arms_iii: "OC, OD",
  
  q_ex1_angle_iv: "∠DOA",
  q_ex1_vertex_iv: "O",
  q_ex1_arms_iv: "OD, OA",
};

// Normalises and sorts characters for unordered checks if needed
const normalizeAndSort = (s: string) => 
  s.trim().toLowerCase().replace(/[^a-z0-9]/g, "").split('').sort().join('');

const normalize = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

function borderCls(
  id: string,
  answers: Record<string, string>,
  graded: Record<string, { value: string; correct: boolean }>,
  isRevealed: boolean
) {
  if (isRevealed)
    return "border-emerald-500 bg-emerald-50 font-bold text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300";
  const typed = (answers[id] ?? "").trim();
  if (!typed) return "border-slate-300 focus:border-teal-500 bg-background";
  const g = graded[id];
  if (g?.correct === true)
    return "border-green-500 bg-green-50 text-green-700 font-bold dark:bg-green-950/30 dark:text-green-300";
  if (g?.correct === false)
    return "border-red-400 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";
  return "border-slate-300 focus:border-teal-500 bg-background";
}

function StatusIcon({
  id,
  answers,
  graded,
  isRevealed,
}: {
  id: string;
  answers: Record<string, string>;
  graded: Record<string, { value: string; correct: boolean }>;
  isRevealed: boolean;
}) {
  if (isRevealed) return null;
  const typed = (answers[id] ?? "").trim();
  if (!typed) return null;
  const g = graded[id];
  if (g?.correct === true)
    return (
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 select-none text-xs font-bold text-green-600 dark:text-green-400">
        ✓
      </span>
    );
  if (g?.correct === false)
    return (
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 select-none text-xs font-bold text-red-500 dark:text-red-400">
        ✗
      </span>
    );
  return null;
}

export function C6MathsCh4Page6() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch4-page6";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);

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
    };
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, [storageKey]);

  const handleChange = (id: string, val: string) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
    localStorage.setItem(`${storageKey}-${id}-answer`, val);
  };

  const handleBlur = (id: string, correctAnswers: string[], isOpen = false, sortChars = false) => {
    if (isRevealed) return;
    const rawTyped = answers[id] ?? "";
    const typed = sortChars ? normalizeAndSort(rawTyped) : normalize(rawTyped);
    
    if (!typed && !isOpen) return;
    if (isOpen && !rawTyped.trim()) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return;

    let correct: boolean;
    if (isOpen) {
      correct =
        correctAnswers.some((ans) => typed.includes(sortChars ? normalizeAndSort(ans) : normalize(ans))) ||
        rawTyped.trim().length >= 4;
    } else {
      correct = correctAnswers.some((ans) => (sortChars ? normalizeAndSort(ans) : normalize(ans)) === typed);
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

  function Field({
    id,
    placeholder,
    correct,
    isOpen = false,
    sortChars = false,
    className = "",
  }: {
    id: string;
    placeholder: string;
    correct: string[];
    isOpen?: boolean;
    sortChars?: boolean;
    className?: string;
  }) {
    return (
      <div className={`relative w-full ${className}`}>
        <input
          type="text"
          id={`field-${id}`}
          placeholder={placeholder}
          value={isRevealed ? REVEAL_TEXT[id] ?? "" : answers[id] ?? ""}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id, correct, isOpen, sortChars)}
          disabled={isRevealed}
          className={`w-full rounded-xl border px-3 py-2 pr-7 text-xs sm:text-sm font-mono outline-none transition-all shadow-sm ${borderCls(
            id,
            answers,
            graded,
            isRevealed
          )}`}
        />
        <StatusIcon id={id} answers={answers} graded={graded} isRevealed={isRevealed} />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body max-w-5xl mx-auto pb-12">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ──────────────────────────────────────────────────────────
          4.7 ANGLE
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">4.7</span>
            <span>ANGLE</span>
          </div>
          <span className="text-xs bg-emerald-800/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
            Page 54 / Book P62
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-8">
          <p className="font-semibold text-foreground">Observe the pictures:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Figure 1 */}
            <div className="flex flex-col items-center gap-3 p-4 border rounded-xl bg-background/50">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <path d="M 10 70 L 50 30 L 90 70 Z" fill="none" stroke="#64748b" strokeWidth="2" />
                <path d="M 50 30 C 50 15 70 15 70 30" fill="none" stroke="#64748b" strokeWidth="2" />
                {/* Overlay angle rays */}
                <line x1="10" y1="70" x2="50" y2="30" stroke="#059669" strokeWidth="3" />
                <line x1="90" y1="70" x2="50" y2="30" stroke="#059669" strokeWidth="3" />
                <circle cx="50" cy="30" r="3" fill="#059669" />
                <text x="50" y="22" fontSize="12" fontWeight="bold" fill="#059669" textAnchor="middle">O</text>
                <text x="10" y="82" fontSize="12" fontWeight="bold" fill="#059669">A</text>
                <text x="85" y="82" fontSize="12" fontWeight="bold" fill="#059669">B</text>
              </svg>
              <span className="text-sm font-semibold">Figure - 1 (Hanger)</span>
            </div>
            
            {/* Figure 2 */}
            <div className="flex flex-col items-center gap-3 p-4 border rounded-xl bg-background/50">
              <div className="w-24 h-24 flex items-center justify-center text-4xl">📖</div>
              <span className="text-sm font-semibold">Figure - 2 (Book)</span>
            </div>
            
            {/* Figure 3 */}
            <div className="flex flex-col items-center gap-3 p-4 border rounded-xl bg-background/50">
              <div className="w-24 h-24 flex items-center justify-center text-4xl">🚪</div>
              <span className="text-sm font-semibold">Figure - 3 (Door)</span>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-foreground/90">
            <p>
              Angles are made when corners are formed. In the figure - 1 imagine two rays say OA and OB. These two rays have a common end point at O. The two rays here are said to form an angle.
            </p>
            <p>
              Look at the door in Figure-3. When it is closed it does not seem to make any angle with the threshold. As we start opening it there is an angle between the door and the threshold. It also changes as the position of the door changes. Here two rays can be imagined in the direction of the door and the threshold.
            </p>
            <div className="flex items-center gap-6 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
              <div className="w-16 h-16 shrink-0 rounded-full border-4 border-emerald-700 bg-white relative flex items-center justify-center">
                <span className="text-[10px] font-bold absolute top-1">12</span>
                <span className="text-[10px] font-bold absolute bottom-1">6</span>
                <span className="text-[10px] font-bold absolute left-1">9</span>
                <span className="text-[10px] font-bold absolute right-1">3</span>
                <line x1="32" y1="32" x2="32" y2="12" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                <line x1="32" y1="32" x2="48" y2="32" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
                <circle cx="32" cy="32" r="2" fill="#064e3b" />
              </div>
              <p>
                Observe how angles are formed between two hands of a clock at different time.
              </p>
            </div>
            
            <div className="p-4 bg-muted/50 border rounded-xl space-y-3">
              <p>
                The two rays forming an angle are called the <strong>arms</strong> or <strong>sides</strong> of the angle. The common end point is called the <strong>vertex</strong> of the angle.
              </p>
              <div className="flex items-center justify-center py-4">
                <svg className="w-48 h-32" viewBox="0 0 200 120">
                  <line x1="40" y1="80" x2="160" y2="80" stroke="#0f766e" strokeWidth="3" markerEnd="url(#arrow)" />
                  <line x1="40" y1="80" x2="140" y2="20" stroke="#0f766e" strokeWidth="3" markerEnd="url(#arrow)" />
                  <circle cx="40" cy="80" r="4" fill="#0f766e" />
                  <circle cx="120" cy="80" r="4" fill="#0f766e" />
                  <circle cx="106" cy="40" r="4" fill="#0f766e" />
                  
                  <text x="25" y="90" fontSize="14" fontWeight="bold" fill="#0f766e">O</text>
                  <text x="120" y="100" fontSize="14" fontWeight="bold" fill="#0f766e">A</text>
                  <text x="95" y="35" fontSize="14" fontWeight="bold" fill="#0f766e">B</text>
                  
                  <path d="M 65 80 A 25 25 0 0 0 62 67" fill="none" stroke="#0f766e" strokeWidth="2" />
                  
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f766e" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p>
                Here the two rays OA and OB are two <strong>arms</strong> or sides of the angle and O is the <strong>vertex</strong> of the angle. As the angle is formed at O, we read it as <strong>angle AOB or angle BOA</strong> and it is denoted by <strong>∠AOB or ∠BOA</strong> (sometimes ∠AOB or ∠BOA) or simply <strong>∠O</strong>.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-lg text-emerald-900 dark:text-emerald-100 border-b pb-2">
              Interior and Exterior of an Angle
            </h4>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full max-w-[250px] shrink-0 bg-white dark:bg-slate-900 rounded-xl border p-4">
                <svg className="w-full h-auto" viewBox="0 0 200 160">
                  {/* Rays */}
                  <line x1="40" y1="120" x2="160" y2="120" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arrow-blue)" />
                  <line x1="40" y1="120" x2="120" y2="40" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arrow-blue)" />
                  <circle cx="40" cy="120" r="4" fill="#0284c7" />
                  
                  {/* Points */}
                  <text x="25" y="130" fontSize="14" fontWeight="bold" fill="#0284c7">Q</text>
                  
                  <circle cx="120" cy="120" r="4" fill="#0284c7" />
                  <text x="120" y="140" fontSize="14" fontWeight="bold" fill="#0284c7">R</text>
                  
                  <circle cx="90" cy="70" r="4" fill="#0284c7" />
                  <text x="75" y="70" fontSize="14" fontWeight="bold" fill="#0284c7">P</text>
                  
                  <circle cx="100" cy="100" r="4" fill="#ef4444" />
                  <text x="110" y="100" fontSize="14" fontWeight="bold" fill="#b91c1c">X</text>
                  
                  <circle cx="140" cy="60" r="4" fill="#eab308" />
                  <text x="150" y="60" fontSize="14" fontWeight="bold" fill="#a16207">Z</text>
                  
                  <circle cx="65" cy="95" r="4" fill="#22c55e" />
                  <text x="50" y="90" fontSize="14" fontWeight="bold" fill="#15803d">S</text>
                  
                  <circle cx="150" cy="140" r="4" fill="#a855f7" />
                  <text x="160" y="145" fontSize="14" fontWeight="bold" fill="#7e22ce">Y</text>

                  <defs>
                    <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <div className="text-sm space-y-4">
                <p>
                  In the figure, point X is in the interior of the angle. Z is in the exterior part of the angle. Point S is on the arms of the angle ∠PQR.
                </p>
                <p>So angle divides the plane into three parts; interior (bounded by the two sides), angle and the exterior (which is outside the angle).</p>
                
                <div className="space-y-3 p-4 rounded-xl border bg-card">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">
                      Now think about point Y. Where does it lie?
                    </label>
                    <Field id="q_point_y_location" placeholder="e.g. Interior / Exterior" correct={CORRECT.q_point_y_location} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">
                      If you extend the rays QP and QR, will point Y fall in the interior of the angle?
                    </label>
                    <Field id="q_point_y_extend" placeholder="Yes / No" correct={CORRECT.q_point_y_extend} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">
                      Is it possible to mark a point "M" in the interior of the angle by extending the rays?
                    </label>
                    <Field id="q_point_m_extend" placeholder="Yes / No" correct={CORRECT.q_point_m_extend} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          EXERCISE 4.3
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-indigo-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-indigo-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 rounded-lg">✏️</span>
            <span>EXERCISE - 4.3</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            
            {/* Figure for Exercise 4.3 */}
            <div className="w-full max-w-[250px] shrink-0 bg-white dark:bg-slate-900 rounded-xl border p-4 flex flex-col items-center">
              <svg className="w-full h-auto" viewBox="0 0 200 200">
                <line x1="40" y1="160" x2="160" y2="40" stroke="#4f46e5" strokeWidth="3" markerEnd="url(#arrow-indigo)" markerStart="url(#arrow-indigo-rev)" />
                <line x1="40" y1="40" x2="160" y2="160" stroke="#4f46e5" strokeWidth="3" markerEnd="url(#arrow-indigo)" markerStart="url(#arrow-indigo-rev)" />
                <circle cx="100" cy="100" r="4" fill="#4f46e5" />
                <text x="90" y="115" fontSize="16" fontWeight="bold" fill="#3730a3">O</text>
                
                <text x="145" y="35" fontSize="14" fontWeight="bold" fill="#3730a3">A</text>
                <text x="165" y="150" fontSize="14" fontWeight="bold" fill="#3730a3">B</text>
                <text x="35" y="35" fontSize="14" fontWeight="bold" fill="#3730a3">C</text>
                <text x="35" y="165" fontSize="14" fontWeight="bold" fill="#3730a3">D</text>

                <defs>
                  <marker id="arrow-indigo" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#4f46e5" />
                  </marker>
                  <marker id="arrow-indigo-rev" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#4f46e5" />
                  </marker>
                </defs>
              </svg>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Four rays: OA, OB, OC, OD form four distinct angles around O.
              </p>
            </div>

            <div className="w-full space-y-4">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
                Name the angles, vertex and arms of the angles from the figure.
              </h4>
              
              <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse text-sm text-left">
                  <thead>
                    <tr className="bg-indigo-50 dark:bg-indigo-950/30">
                      <th className="border p-2 font-bold text-indigo-900 dark:text-indigo-200 w-24"></th>
                      <th className="border p-2 font-bold text-center">i</th>
                      <th className="border p-2 font-bold text-center">ii</th>
                      <th className="border p-2 font-bold text-center">iii</th>
                      <th className="border p-2 font-bold text-center">iv</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 font-bold bg-muted/30">Angle</td>
                      <td className="border p-2 text-center font-mono">∠AOB</td>
                      <td className="border p-2">
                        <Field id="q_ex1_angle_ii" placeholder="e.g. ∠BOC" correct={CORRECT.q_ex1_angle_ii} />
                      </td>
                      <td className="border p-2">
                        <Field id="q_ex1_angle_iii" placeholder="e.g. ∠COD" correct={CORRECT.q_ex1_angle_iii} />
                      </td>
                      <td className="border p-2">
                        <Field id="q_ex1_angle_iv" placeholder="e.g. ∠DOA" correct={CORRECT.q_ex1_angle_iv} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-bold bg-muted/30">Vertex</td>
                      <td className="border p-2 text-center font-mono">O</td>
                      <td className="border p-2">
                        <Field id="q_ex1_vertex_ii" placeholder="e.g. O" correct={CORRECT.q_ex1_vertex_ii} />
                      </td>
                      <td className="border p-2">
                        <Field id="q_ex1_vertex_iii" placeholder="e.g. O" correct={CORRECT.q_ex1_vertex_iii} />
                      </td>
                      <td className="border p-2">
                        <Field id="q_ex1_vertex_iv" placeholder="e.g. O" correct={CORRECT.q_ex1_vertex_iv} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-bold bg-muted/30">Arms</td>
                      <td className="border p-2 text-center font-mono text-xs">OA, OB</td>
                      <td className="border p-2">
                        <Field id="q_ex1_arms_ii" placeholder="OB, OC" correct={CORRECT.q_ex1_arms_ii} />
                      </td>
                      <td className="border p-2">
                        <Field id="q_ex1_arms_iii" placeholder="OC, OD" correct={CORRECT.q_ex1_arms_iii} />
                      </td>
                      <td className="border p-2">
                        <Field id="q_ex1_arms_iv" placeholder="OD, OA" correct={CORRECT.q_ex1_arms_iv} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
