"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const COPY_WORDS = ["उमा", "ऊन", "चार", "छड़ी", "घड़ी", "टिकट"];

const FILL_BLANKS = [
  { id: "fb1", prefix: "यह", suffix: "है।", img: "🧶", answers: ["ऊन"] },
  { id: "fb2", prefix: "यह", suffix: "है।", img: "🍘", answers: ["पूरी", "कचौड़ी", "रोटी", "आलू", "पापड़", "पूड़ी", "पकोड़ी"] }, // Accept a variety due to drawing ambiguity
];

const SELF_ASSESSMENT = [
  { id: "sa1", text: "1. मैं बालगीत अभिनय के साथ गा सकता/सकती हूँ।" },
  { id: "sa2", text: "2. मैं 'घ, च, छ, ट, ड, उ, ऊ' वर्ण पढ़ और लिख सकता/सकती हूँ।" },
  { id: "sa3", text: "3. मैं इन वर्णों से बने शब्द बिना देखे लिख सकता/सकती हूँ।" },
  { id: "sa4", text: "4. मैं संकेत के आधार पर चित्र बनाकर उसके बारे में बता सकता/सकती हूँ।" },
];

export function C6HindiCh3Page5() {
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const { addPoints } = useScore();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // States
  const [copyAnswers, setCopyAnswers] = useState<Record<string, string>>({});
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string>>({});
  const [drawingName, setDrawingName] = useState("");
  const [drawingEvaluated, setDrawingEvaluated] = useState(false);
  const [assessment, setAssessment] = useState<Record<string, "yes" | "no" | null>>({});

  const [evaluatedBlanks, setEvaluatedBlanks] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number; label?: string } | null>(null);

  useEffect(() => {
    try {
      const sCopy = localStorage.getItem("c6-hindi-ch3-p5-copy");
      const sBlanks = localStorage.getItem("c6-hindi-ch3-p5-blanks");
      const sName = localStorage.getItem("c6-hindi-ch3-p5-drawing-name");
      const sEval = localStorage.getItem("c6-hindi-ch3-p5-eval");
      const sDrawEval = localStorage.getItem("c6-hindi-ch3-p5-draw-eval");
      const sAsses = localStorage.getItem("c6-hindi-ch3-p5-asses");
      
      if (sCopy) setCopyAnswers(JSON.parse(sCopy));
      if (sBlanks) setBlankAnswers(JSON.parse(sBlanks));
      if (sName) setDrawingName(sName);
      if (sEval) setEvaluatedBlanks(JSON.parse(sEval));
      if (sDrawEval) setDrawingEvaluated(JSON.parse(sDrawEval));
      if (sAsses) setAssessment(JSON.parse(sAsses));

      // Load drawing if any
      const sDrawing = localStorage.getItem("c6-hindi-ch3-p5-drawing");
      if (sDrawing && canvasRef.current) {
        const img = new Image();
        img.src = sDrawing;
        img.onload = () => {
          const ctx = canvasRef.current?.getContext("2d");
          if (ctx) ctx.drawImage(img, 0, 0);
        };
      }
    } catch {}
  }, []);

  // --- Drawing logic ---
  function startDrawing(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    setIsDrawing(true);
    draw(e);
  }

  function stopDrawing() {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) ctx.beginPath();
    
    // Save drawing
    if (canvasRef.current) {
      try {
        localStorage.setItem("c6-hindi-ch3-p5-drawing", canvasRef.current.toDataURL());
      } catch {}
    }
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 15; // Thicker for coloring
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(59, 130, 246, 0.5)"; // Semi-transparent blue for coloring over

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function clearDrawing() {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      try {
        localStorage.removeItem("c6-hindi-ch3-p5-drawing");
      } catch {}
    }
  }

  // --- Helpers ---
  const setVal = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    key: string,
    val: string,
    storageKey: string,
    currentObj: any
  ) => {
    const newObj = { ...currentObj, [key]: val };
    setter(newObj);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newObj));
    } catch {}
  };

  const handleBlankSubmit = (id: string, validAnswers: string[]) => {
    const userAns = (blankAnswers[id] || "").trim();
    if (!userAns) return;

    // We allow any reasonable input for the second drawing due to ambiguity, but strict for the first
    const isCorrect = id === "fb1" 
      ? validAnswers.includes(userAns)
      : userAns.length > 0; // if it's the second one, any input is a good attempt

    if (isCorrect) {
      setFeedback({ correct: true, id: Date.now(), label: "बहुत बढ़िया! +1 ⭐" });
      addPoints(1);
      const newEval = { ...evaluatedBlanks, [id]: true };
      setEvaluatedBlanks(newEval);
      try {
        localStorage.setItem("c6-hindi-ch3-p5-eval", JSON.stringify(newEval));
      } catch {}
    } else {
      setFeedback({ correct: false, id: Date.now(), label: "फिर से प्रयास करें!" });
    }
  };

  const handleNameSubmit = () => {
    const userAns = drawingName.trim();
    if (userAns === "चार" || userAns === "4") {
      setFeedback({ correct: true, id: Date.now(), label: "सही! +1 ⭐" });
      addPoints(1);
      setDrawingEvaluated(true);
      try {
        localStorage.setItem("c6-hindi-ch3-p5-draw-eval", JSON.stringify(true));
      } catch {}
    } else {
      setFeedback({ correct: false, id: Date.now(), label: "ध्यान से देखें, यह कौन सा अंक है?" });
    }
  };

  const handleAssessment = (id: string, val: "yes" | "no") => {
    const newAsses = { ...assessment, [id]: val };
    setAssessment(newAsses);
    try {
      localStorage.setItem("c6-hindi-ch3-p5-asses", JSON.stringify(newAsses));
    } catch {}
  };

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 p-2 sm:p-4 pb-20">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          label={feedback.label}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* Activity: (आ) सुंदर अक्षरों में लिखिए। */}
      <div className="rounded-3xl border border-pink-200 bg-pink-50/30 p-5 shadow-sm space-y-6">
        <p className="text-base text-pink-900 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          (आ) सुंदर अक्षरों में लिखिए।
        </p>
        
        <div className="flex justify-around bg-white p-4 rounded-xl border border-pink-100 shadow-sm relative overflow-hidden flex-wrap gap-y-6">
          {/* Decorative ruling lines background */}
          <div className="absolute inset-0 pointer-events-none opacity-30" 
               style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 39px, #ec4899 39px, #ec4899 40px)", backgroundPositionY: "20px" }}>
          </div>

          {COPY_WORDS.map((word, wIdx) => (
            <div key={wIdx} className="flex flex-col items-center gap-1 z-10 w-[30%] min-w-[80px]">
              <span className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{word}</span>
              {[0, 1, 2, 3].map((lineIdx) => (
                <input
                  key={`${wIdx}-${lineIdx}`}
                  type="text"
                  placeholder=""
                  value={copyAnswers[`${wIdx}-${lineIdx}`] || ""}
                  onChange={(e) => setVal(setCopyAnswers, `${wIdx}-${lineIdx}`, e.target.value, "c6-hindi-ch3-p5-copy", copyAnswers)}
                  className="w-full h-10 bg-transparent text-center text-xl font-medium text-blue-700 outline-none border-b-2 border-dashed border-pink-200 focus:border-pink-400 transition-colors"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  autoComplete="off"
                  spellCheck="false"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activity: (इ) खाली स्थान में चित्र का नाम लिखिए। */}
        <div className="rounded-3xl border border-blue-200 bg-blue-50/30 p-5 shadow-sm space-y-6">
          <p className="text-base text-blue-900 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            (इ) खाली स्थान में चित्र का नाम लिखिए।
          </p>

          <div className="space-y-6 px-2 sm:px-4">
            {FILL_BLANKS.map((b, idx) => (
              <div key={b.id} className="flex flex-col gap-3 p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-center gap-3 text-lg font-medium text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  <span>{idx + 1}.</span>
                  {b.prefix && <span>{b.prefix}</span>}
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-4xl shadow-inner border border-blue-100">
                    {b.img}
                  </div>
                  <span>{b.suffix}</span>
                </div>
                
                <div className="flex items-center gap-3 text-lg font-medium text-gray-800 pl-6" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  {b.prefix && <span>{b.prefix}</span>}
                  <div className="relative group">
                    <input
                      type="text"
                      value={blankAnswers[b.id] || ""}
                      onChange={(e) => setVal(setBlankAnswers, b.id, e.target.value, "c6-hindi-ch3-p5-blanks", blankAnswers)}
                      disabled={evaluatedBlanks[b.id]}
                      placeholder="....................."
                      className={`w-32 text-center bg-transparent border-b-2 border-dashed font-bold outline-none transition-colors ${
                        evaluatedBlanks[b.id] ? "border-green-400 text-green-700" : "border-blue-400 text-blue-700 focus:border-blue-600"
                      }`}
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    />
                    {!evaluatedBlanks[b.id] && (
                      <button
                        onClick={() => handleBlankSubmit(b.id, b.answers)}
                        disabled={!(blankAnswers[b.id] || "").trim()}
                        className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✓
                      </button>
                    )}
                    {isUrlRevealed && !evaluatedBlanks[b.id] && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-emerald-500 font-bold whitespace-nowrap">
                        {b.answers[0]}
                      </span>
                    )}
                  </div>
                  <span>{b.suffix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity: (ई) चित्र में रंग भरिए। नाम लिखिए। */}
        <div className="rounded-3xl border border-amber-200 bg-amber-50/30 p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-base text-amber-900 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              (ई) चित्र में रंग भरिए। नाम लिखिए।
            </p>
            <button
              onClick={clearDrawing}
              className="px-3 py-1 text-xs font-medium bg-white border border-amber-200 text-amber-700 rounded-lg shadow-sm active:bg-amber-50 transition-colors"
            >
              साफ़ करें
            </button>
          </div>
          
          <div className="w-full aspect-square bg-white border-2 border-amber-200 rounded-2xl relative overflow-hidden flex items-center justify-center">
            {/* The outline image for number 4 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <span className="text-[15rem] font-bold" style={{ fontFamily: "'Comic Sans MS', sans-serif", WebkitTextStroke: "4px black", color: "transparent" }}>
                4
              </span>
            </div>
            
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="w-full h-full touch-none cursor-crosshair relative z-10"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>

          <div className="flex items-center gap-3 justify-center text-lg font-medium text-gray-800 bg-white p-4 rounded-xl border border-amber-100 shadow-sm" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            <span>नाम :</span>
            <div className="relative group">
              <input
                type="text"
                value={drawingName}
                onChange={(e) => {
                  setDrawingName(e.target.value);
                  try { localStorage.setItem("c6-hindi-ch3-p5-drawing-name", e.target.value); } catch {}
                }}
                disabled={drawingEvaluated}
                placeholder="....................."
                className={`w-32 text-center bg-transparent border-b-2 border-dashed font-bold outline-none transition-colors ${
                  drawingEvaluated ? "border-green-400 text-green-700" : "border-amber-400 text-amber-700 focus:border-amber-600"
                }`}
              />
              {!drawingEvaluated && (
                <button
                  onClick={handleNameSubmit}
                  disabled={!drawingName.trim()}
                  className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✓
                </button>
              )}
              {isUrlRevealed && !drawingEvaluated && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-emerald-500 font-bold whitespace-nowrap">
                  चार
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Self Assessment Table */}
      <div className="rounded-3xl border-2 border-[#b59e54] bg-[#fdfbf7] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse min-w-full" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          <thead>
            <tr className="bg-[#f5ebd4]">
              <th className="p-3 border-b-2 border-r-2 border-[#b59e54] font-bold text-[#6b5820] text-base w-[70%]">
                क्या मैं ये कर सकता/सकती हूँ?
              </th>
              <th className="p-3 border-b-2 border-r-2 border-[#b59e54] text-center font-bold text-green-600">हाँ (✓)</th>
              <th className="p-3 border-b-2 border-[#b59e54] text-center font-bold text-red-500">नहीं (✗)</th>
            </tr>
          </thead>
          <tbody>
            {SELF_ASSESSMENT.map((row) => (
              <tr key={row.id} className="border-b border-[#b59e54]/50 last:border-0 hover:bg-white/50 transition-colors">
                <td className="p-3 border-r-2 border-[#b59e54] text-[#4a3f1a] font-medium">
                  {row.text}
                </td>
                <td 
                  className="p-3 border-r-2 border-[#b59e54] text-center cursor-pointer hover:bg-green-50 transition-colors"
                  onClick={() => handleAssessment(row.id, "yes")}
                >
                  {assessment[row.id] === "yes" && <span className="text-xl text-green-600 font-bold">✓</span>}
                </td>
                <td 
                  className="p-3 text-center cursor-pointer hover:bg-red-50 transition-colors"
                  onClick={() => handleAssessment(row.id, "no")}
                >
                  {assessment[row.id] === "no" && <span className="text-xl text-red-500 font-bold">✗</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer page number */}
      <div className="flex justify-between items-center text-xs text-foreground/40 mt-8 pt-4 border-t border-border">
        <span>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-foreground/60 bg-green-100 px-3 py-1 rounded text-green-900 border border-green-200">16</span>
        <span>रेलवे स्टेशन</span>
      </div>
    </div>
  );
}
