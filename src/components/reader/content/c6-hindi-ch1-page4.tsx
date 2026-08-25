"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const COPY_WORDS = ["अनार", "नाम", "मामा"];

const FILL_BLANKS = [
  { id: "fb1", prefix: "लड़का", suffix: "खाता है।", img: "🥭", answer: "आम" },
  { id: "fb2", prefix: "", suffix: "के दाने लाल-लाल हैं।", img: "🍎", answer: "अनार" },
];

const SELF_ASSESSMENT = [
  { id: "sa1", text: "1. मैं बालगीत अभिनय के साथ गा सकता/सकती हूँ।" },
  { id: "sa2", text: "2. मैं 'न, म, र, अ, आ' वर्ण पहचान और लिख सकता/सकती हूँ।" },
  { id: "sa3", text: "3. मैं इन वर्णों से बने शब्द बिना देखे लिख सकता/सकती हूँ।" },
  { id: "sa4", text: "4. मैं संकेत के आधार पर चित्र बनाकर उसके बारे में बता सकता/सकती हूँ।" },
];

export function C6HindiCh1Page4() {
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const { addPoints } = useScore();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // States
  const [copyAnswers, setCopyAnswers] = useState<Record<string, string>>({});
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string>>({});
  const [favFruit, setFavFruit] = useState("");
  const [assessment, setAssessment] = useState<Record<string, "yes" | "no" | null>>({});

  const [evaluatedBlanks, setEvaluatedBlanks] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number; label?: string } | null>(null);

  useEffect(() => {
    try {
      const sCopy = localStorage.getItem("c6-hindi-ch1-p4-copy");
      const sBlanks = localStorage.getItem("c6-hindi-ch1-p4-blanks");
      const sFruit = localStorage.getItem("c6-hindi-ch1-p4-fruit");
      const sEval = localStorage.getItem("c6-hindi-ch1-p4-eval");
      const sAsses = localStorage.getItem("c6-hindi-ch1-p4-asses");
      
      if (sCopy) setCopyAnswers(JSON.parse(sCopy));
      if (sBlanks) setBlankAnswers(JSON.parse(sBlanks));
      if (sFruit) setFavFruit(sFruit);
      if (sEval) setEvaluatedBlanks(JSON.parse(sEval));
      if (sAsses) setAssessment(JSON.parse(sAsses));

      // Load drawing if any
      const sDrawing = localStorage.getItem("c6-hindi-ch1-p4-drawing");
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
        localStorage.setItem("c6-hindi-ch1-p4-drawing", canvasRef.current.toDataURL());
      } catch {}
    }
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#fbbf24"; // Nice yellow/orange brush

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function clearDrawing() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      try { localStorage.removeItem("c6-hindi-ch1-p4-drawing"); } catch {}
    }
  }
  // ----------------------

  function handleBlankSubmit(id: string, expectedAnswer: string) {
    const userAnswer = (blankAnswers[id] || "").trim();
    if (!userAnswer) {
      setFeedback({ correct: false, id: Date.now() });
      return;
    }

    if (userAnswer === expectedAnswer) {
      if (!evaluatedBlanks[id]) {
        addPoints(1);
        const nextEval = { ...evaluatedBlanks, [id]: true };
        setEvaluatedBlanks(nextEval);
        try { localStorage.setItem("c6-hindi-ch1-p4-eval", JSON.stringify(nextEval)); } catch {}
      }
      setFeedback({ correct: true, id: Date.now(), label: "सही उत्तर! ⭐" });
    } else {
      setFeedback({ correct: false, id: Date.now() });
    }
  }

  function setVal(setter: any, key: string, val: string, storageKey: string, obj: any) {
    const nextObj = { ...obj, [key]: val };
    setter(nextObj);
    try { localStorage.setItem(storageKey, JSON.stringify(nextObj)); } catch {}
  }

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 pb-8">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          label={feedback.label}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* Activity: (आ) शब्द पढ़िए और लिखिए। */}
      <div className="rounded-3xl border border-pink-200 bg-pink-50/30 p-5 shadow-sm space-y-6">
        <p className="text-base text-pink-900 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          (आ) शब्द पढ़िए और लिखिए।
        </p>
        
        <div className="flex justify-around bg-white p-4 rounded-xl border border-pink-100 shadow-sm relative overflow-hidden">
          {/* Decorative ruling lines background */}
          <div className="absolute inset-0 pointer-events-none opacity-30" 
               style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 39px, #ec4899 39px, #ec4899 40px)", backgroundPositionY: "20px" }}>
          </div>

          {COPY_WORDS.map((word, wIdx) => (
            <div key={wIdx} className="flex flex-col items-center gap-1 z-10 w-1/3">
              <span className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{word}</span>
              {[0, 1, 2].map((lineIdx) => (
                <input
                  key={`${wIdx}-${lineIdx}`}
                  type="text"
                  placeholder=""
                  value={copyAnswers[`${wIdx}-${lineIdx}`] || ""}
                  onChange={(e) => setVal(setCopyAnswers, `${wIdx}-${lineIdx}`, e.target.value, "c6-hindi-ch1-p4-copy", copyAnswers)}
                  className="w-full h-10 bg-transparent text-center text-xl font-medium text-blue-700 outline-none border-b-2 border-transparent focus:border-pink-300 transition-colors"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  autoComplete="off"
                  spellCheck="false"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Activity: (इ) खाली स्थान में चित्र का नाम लिखिए। */}
      <div className="rounded-3xl border border-blue-200 bg-blue-50/30 p-5 shadow-sm space-y-6">
        <p className="text-base text-blue-900 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          (इ) खाली स्थान में चित्र का नाम लिखिए।
        </p>

        <div className="space-y-6 px-4">
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
                    onChange={(e) => setVal(setBlankAnswers, b.id, e.target.value, "c6-hindi-ch1-p4-blanks", blankAnswers)}
                    disabled={evaluatedBlanks[b.id]}
                    placeholder="....................."
                    className={`w-32 text-center bg-transparent border-b-2 border-dashed font-bold outline-none transition-colors ${
                      evaluatedBlanks[b.id] ? "border-green-400 text-green-700" : "border-blue-400 text-blue-700 focus:border-blue-600"
                    }`}
                  />
                  {!evaluatedBlanks[b.id] && (
                    <button
                      onClick={() => handleBlankSubmit(b.id, b.answer)}
                      disabled={!(blankAnswers[b.id] || "").trim()}
                      className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✓
                    </button>
                  )}
                  {isUrlRevealed && !evaluatedBlanks[b.id] && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-emerald-500 font-bold whitespace-nowrap">
                      {b.answer}
                    </span>
                  )}
                </div>
                <span>{b.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity: (ई) चित्र बनाइए और नाम लिखिए। */}
      <div className="rounded-3xl border border-amber-200 bg-amber-50/30 p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-base text-amber-900 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            (ई) आप अपने मनपसंद फल का चित्र बनाइए और नाम लिखिए।
          </p>
          <button onClick={clearDrawing} className="text-xs px-3 py-1 bg-white border border-amber-300 rounded hover:bg-amber-100 text-amber-800 transition-colors">
            Clear 🧹
          </button>
        </div>

        <div className="w-full max-w-lg mx-auto border-2 border-amber-700 bg-white shadow-sm flex flex-col">
          {/* Drawing Canvas */}
          <canvas
            ref={canvasRef}
            width={500}
            height={250}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="w-full h-[250px] cursor-crosshair touch-none"
          />
          
          {/* Name input */}
          <div className="border-t-2 border-amber-700 py-3 flex items-center justify-center gap-2 bg-amber-50">
            <span className="font-bold text-amber-900 text-lg" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>नाम :-</span>
            <input
              type="text"
              value={favFruit}
              onChange={(e) => {
                setFavFruit(e.target.value);
                try { localStorage.setItem("c6-hindi-ch1-p4-fruit", e.target.value); } catch {}
              }}
              placeholder="........................"
              className="bg-transparent border-none font-bold text-lg text-amber-700 outline-none w-48 text-center"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            />
          </div>
        </div>
      </div>

      {/* Self Assessment Table */}
      <div className="rounded-3xl border border-emerald-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center text-4xl shrink-0">
            🤔
          </div>
          <table className="w-full border-collapse border border-emerald-700">
            <thead>
              <tr className="bg-emerald-50">
                <th className="border border-emerald-700 p-2 text-left text-emerald-900 font-bold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  क्या मैं ये कर सकता/सकती हूँ?
                </th>
                <th className="border border-emerald-700 p-2 text-pink-600 font-bold w-20 text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  हाँ (✓)
                </th>
                <th className="border border-emerald-700 p-2 text-pink-600 font-bold w-20 text-center" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  नहीं (✗)
                </th>
              </tr>
            </thead>
            <tbody>
              {SELF_ASSESSMENT.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-emerald-700 p-3 text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    {item.text}
                  </td>
                  <td className="border border-emerald-700 p-0 text-center align-middle">
                    <label className="w-full h-full flex items-center justify-center cursor-pointer p-2">
                      <input 
                        type="radio" 
                        name={item.id} 
                        checked={assessment[item.id] === "yes"}
                        onChange={() => setVal(setAssessment, item.id, "yes", "c6-hindi-ch1-p4-asses", assessment)}
                        className="w-5 h-5 accent-emerald-500 cursor-pointer"
                      />
                    </label>
                  </td>
                  <td className="border border-emerald-700 p-0 text-center align-middle">
                    <label className="w-full h-full flex items-center justify-center cursor-pointer p-2">
                      <input 
                        type="radio" 
                        name={item.id} 
                        checked={assessment[item.id] === "no"}
                        onChange={() => setVal(setAssessment, item.id, "no", "c6-hindi-ch1-p4-asses", assessment)}
                        className="w-5 h-5 accent-red-500 cursor-pointer"
                      />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer info matching the book */}
      <div className="flex justify-between items-center text-xs text-foreground/40 pt-4 border-t border-border/30">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          छात्रों की प्रगति हेतु सरकार का उपहार
        </span>
        <span className="font-bold text-foreground/60 bg-gray-200 px-3 py-1 rounded">7</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          आम ले लो आम!
        </span>
      </div>
    </div>
  );
}
