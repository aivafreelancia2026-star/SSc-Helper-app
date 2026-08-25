"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const MATRA_TABLE = [
  { matra: "आ", sign: "ा", rowId: "aa" },
  { matra: "इ", sign: "ि", rowId: "i" },
  { matra: "ई", sign: "ी", rowId: "ii" },
];

const LETTERS = ["ख", "न", "म", "र", "स", "ल"]; // "क" is already done as example

const CORRECT_MATRAS: Record<string, string> = {
  "aa-ख": "खा", "aa-न": "ना", "aa-म": "मा", "aa-र": "रा", "aa-स": "सा", "aa-ल": "ला",
  "i-ख": "खि", "i-न": "नि", "i-म": "मि", "i-र": "रि", "i-स": "सि", "i-ल": "लि",
  "ii-ख": "खी", "ii-न": "नी", "ii-म": "मी", "ii-र": "री", "ii-स": "सी", "ii-ल": "ली",
};

const MAZE_ITEMS = ["माला", "नल", "ईख", "इमली"]; // 'कील' is given as example

const SELF_ASSESSMENT = [
  "1. मैं बालगीत अभिनय के साथ गा सकता/सकती हूँ।",
  "2. मैं क, ख, ल, स, इ, ई वर्ण पढ़ और लिख सकता/सकती हूँ।",
  "3. मैं इन वर्णों से बने शब्द बिना देखे लिख सकता/सकती हूँ।",
  "4. मैं संकेत के आधार पर चित्र बनाकर उसके बारे में बता सकता/सकती हूँ।",
];

export function C6HindiCh2Page4() {
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const { addPoints } = useScore();

  const [showReveal, setShowReveal] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number; label?: string } | null>(null);

  // States for interactive sections
  const [matraInputs, setMatraInputs] = useState<Record<string, string>>({});
  const [writingInputs, setWritingInputs] = useState<string[]>(["", "", "", ""]);
  const [mazeInputs, setMazeInputs] = useState<string[]>(["", "", "", ""]);
  const [drawingName, setDrawingName] = useState("");
  const [assessment, setAssessment] = useState<Record<number, "yes" | "no" | null>>({});
  const [garlandColor, setGarlandColor] = useState("#ffffff");

  const isGlobalReveal = isUrlRevealed || showReveal;

  useEffect(() => {
    try {
      const savedMatras = localStorage.getItem("c6-hindi-ch2-p4-matras");
      const savedWriting = localStorage.getItem("c6-hindi-ch2-p4-writing");
      const savedMaze = localStorage.getItem("c6-hindi-ch2-p4-maze");
      const savedDrawing = localStorage.getItem("c6-hindi-ch2-p4-drawing");
      const savedAssessment = localStorage.getItem("c6-hindi-ch2-p4-assessment");
      const savedColor = localStorage.getItem("c6-hindi-ch2-p4-color");
      
      if (savedMatras) setMatraInputs(JSON.parse(savedMatras));
      if (savedWriting) setWritingInputs(JSON.parse(savedWriting));
      if (savedMaze) setMazeInputs(JSON.parse(savedMaze));
      if (savedDrawing) setDrawingName(savedDrawing);
      if (savedAssessment) setAssessment(JSON.parse(savedAssessment));
      if (savedColor) setGarlandColor(savedColor);
    } catch {}
  }, []);

  const handleMatraChange = (key: string, value: string) => {
    const newInputs = { ...matraInputs, [key]: value.trim() };
    setMatraInputs(newInputs);
    try { localStorage.setItem("c6-hindi-ch2-p4-matras", JSON.stringify(newInputs)); } catch {}
  };

  const checkMatras = () => {
    let correctCount = 0;
    let totalCount = Object.keys(CORRECT_MATRAS).length;
    
    for (const [key, correctVal] of Object.entries(CORRECT_MATRAS)) {
      if (matraInputs[key] === correctVal) correctCount++;
    }

    if (correctCount === totalCount) {
      setFeedback({ correct: true, id: Date.now(), label: "बहुत बढ़िया! सभी मात्राएँ सही हैं। ⭐" });
      addPoints(1);
    } else {
      setFeedback({ correct: false, id: Date.now(), label: `कुछ गलतियाँ हैं। ${correctCount}/${totalCount} सही हैं।` });
    }
  };

  const checkMaze = () => {
    const filled = mazeInputs.filter(val => val.trim() !== "");
    const correct = filled.filter(val => MAZE_ITEMS.includes(val.trim()));
    
    if (correct.length === MAZE_ITEMS.length) {
      setFeedback({ correct: true, id: Date.now(), label: "शाबाश! आपने सभी चीज़ें ढूँढ लीं! ⭐" });
      addPoints(1);
    } else {
      setFeedback({ correct: false, id: Date.now(), label: "कुछ चीज़ें छूट गई हैं या गलत हैं। फिर से देखें!" });
    }
  };

  const handleAssessment = (idx: number, val: "yes" | "no") => {
    const newAssessment = { ...assessment, [idx]: val };
    setAssessment(newAssessment);
    try { localStorage.setItem("c6-hindi-ch2-p4-assessment", JSON.stringify(newAssessment)); } catch {}
  };

  const handleColorClick = () => {
    const colors = ["#ff9999", "#ffcc99", "#ffff99", "#99ff99", "#99ccff", "#cc99ff", "#ff99cc"];
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    setGarlandColor(nextColor);
    try { localStorage.setItem("c6-hindi-ch2-p4-color", nextColor); } catch {}
  };

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
            <p className="text-xs font-semibold text-green-700">लिखो / मूल्यांकन</p>
          </div>
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

      {/* Section: लिखो (Write) */}
      <div className="space-y-6 rounded-2xl border border-green-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3 border-b border-green-200 pb-3">
          <span className="text-2xl">✍️</span>
          <h2
            className="text-lg font-bold text-green-900"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            लिखो
          </h2>
        </div>

        {/* (अ) मात्राएँ जोड़कर लिखिए */}
        <div className="space-y-3">
          <p className="text-gray-800 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            (अ) मात्राएँ जोड़कर लिखिए और पढ़िए।
          </p>
          
          <div className="overflow-x-auto rounded-xl border border-yellow-700 bg-yellow-50/30">
            <table className="w-full text-center border-collapse text-base" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              <thead>
                <tr className="bg-yellow-100">
                  <th className="border border-yellow-700 p-2 w-10"></th>
                  <th className="border border-yellow-700 p-2 w-10"></th>
                  <th className="border border-yellow-700 p-2 font-bold text-lg text-blue-900">क</th>
                  {LETTERS.map(l => (
                    <th key={l} className="border border-yellow-700 p-2 font-bold text-lg">{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRA_TABLE.map((row) => (
                  <tr key={row.rowId} className="bg-white hover:bg-yellow-50 transition-colors">
                    <td className="border border-yellow-700 p-2 font-bold text-lg">{row.matra}</td>
                    <td className="border border-yellow-700 p-2 font-bold text-lg text-red-600">{row.sign}</td>
                    
                    {/* Example column 'क' */}
                    <td className="border border-yellow-700 p-2 font-bold text-blue-900">
                      {row.rowId === 'aa' ? 'का' : row.rowId === 'i' ? 'कि' : 'की'}
                    </td>
                    
                    {/* Input columns */}
                    {LETTERS.map(l => {
                      const key = `${row.rowId}-${l}`;
                      const isCorrect = matraInputs[key] === CORRECT_MATRAS[key];
                      const isRevealed = isGlobalReveal && !matraInputs[key];
                      
                      return (
                        <td key={l} className="border border-yellow-700 p-1">
                          <input
                            type="text"
                            value={isRevealed ? CORRECT_MATRAS[key] : (matraInputs[key] || "")}
                            onChange={(e) => handleMatraChange(key, e.target.value)}
                            className={`w-12 h-10 text-center rounded-md border-b-2 font-medium text-lg outline-none transition-all ${
                              isRevealed 
                                ? "border-amber-300 text-amber-700 bg-amber-50" 
                                : isCorrect 
                                  ? "border-green-500 text-green-700 bg-green-50" 
                                  : "border-gray-300 focus:border-primary focus:bg-primary/5"
                            }`}
                            maxLength={3}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <button
              onClick={checkMatras}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              उत्तर जाँचें
            </button>
          </div>
        </div>

        <hr className="border-green-100" />

        {/* (आ) शब्द पढ़िए और लिखिए */}
        <div className="space-y-3">
          <p className="text-gray-800 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            (आ) शब्द पढ़िए और लिखिए।
          </p>
          <div className="bg-[#f8f9fa] p-4 rounded-xl border border-gray-200">
            <div className="flex gap-6 mb-4 text-2xl font-bold text-blue-900 justify-evenly border-b-2 border-red-300 pb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              <span>इमली</span>
              <span>ईख</span>
              <span>किसान</span>
              <span>कील</span>
            </div>
            <div className="space-y-4 px-2">
              {[0, 1, 2, 3].map((lineIndex) => (
                <div key={lineIndex} className="relative w-full h-8 border-b-2 border-dashed border-red-300 flex items-end justify-evenly pb-1">
                  {[0, 1, 2, 3].map((wordIndex) => (
                    <input
                      key={`${lineIndex}-${wordIndex}`}
                      type="text"
                      className="w-20 text-center bg-transparent outline-none font-medium text-lg text-gray-800"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                      placeholder={lineIndex === 0 ? "लिखें..." : ""}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid for Maze and Coloring */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* (इ) Maze - रानी को आम तक पहुँचाइए */}
        <div className="space-y-4 rounded-2xl border border-purple-200 bg-white p-5 shadow-sm">
          <p className="text-gray-800 font-medium leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            (इ) रानी को आम तक पहुँचाइए। रास्ते में मिलने वाली चीज़ों के नाम लिखिए।
          </p>
          
          {/* Maze Representation */}
          <div className="relative w-full aspect-square max-w-[280px] mx-auto bg-white border-4 border-gray-800 p-2 flex flex-col justify-between">
            {/* Inner maze walls (simplified visual representation) */}
            <div className="absolute inset-4 border-4 border-gray-800 border-l-0 border-b-0" />
            <div className="absolute inset-10 border-4 border-gray-800 border-r-0 border-t-0" />
            <div className="absolute inset-16 border-4 border-gray-800 border-b-0" />
            
            {/* Emojis for items in maze */}
            <div className="absolute bottom-2 left-[-10px] text-4xl" title="रानी">👧🏽</div>
            <div className="absolute bottom-12 right-6 text-2xl" title="कील">📍</div>
            <div className="absolute top-1/2 left-20 text-2xl" title="माला">📿</div>
            <div className="absolute top-10 left-6 text-3xl" title="ईख">🎋</div>
            <div className="absolute top-6 right-10 text-3xl" title="नल">🚰</div>
            <div className="absolute top-24 left-1/3 text-2xl" title="इमली">🫘</div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl animate-bounce" title="आम">🥭</div>
            
            <div className="absolute bottom-[-10px] left-10 text-red-500 text-3xl font-bold">⬆️</div>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-4 text-base" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              <span className="w-16">जैसे :-</span>
              <span className="font-bold border-b border-gray-400 pb-1 flex-1">कील</span>
            </div>
            
            {mazeInputs.map((val, idx) => (
              <div key={idx} className="flex items-center gap-4 text-base" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                <span className="w-16"></span>
                <input
                  type="text"
                  value={isGlobalReveal && !val ? MAZE_ITEMS[idx] : val}
                  onChange={(e) => {
                    const newInputs = [...mazeInputs];
                    newInputs[idx] = e.target.value;
                    setMazeInputs(newInputs);
                    try { localStorage.setItem("c6-hindi-ch2-p4-maze", JSON.stringify(newInputs)); } catch {}
                  }}
                  className="flex-1 bg-transparent border-b-2 border-dotted border-gray-500 outline-none focus:border-purple-500 font-medium text-purple-900 px-1"
                />
              </div>
            ))}
            
            <button
              onClick={checkMaze}
              className="mt-2 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm transition-colors w-full"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              चेक करें
            </button>
          </div>
        </div>

        {/* (ई) Coloring - चित्र में रंग भरिए */}
        <div className="space-y-4 rounded-2xl border border-pink-200 bg-white p-5 shadow-sm">
          <p className="text-gray-800 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            (ई) चित्र में रंग भरिए। नाम लिखिए।
          </p>
          
          <div className="border border-yellow-600 bg-yellow-50/30 p-6 rounded-xl flex flex-col items-center gap-6">
            <button 
              onClick={handleColorClick}
              className="relative w-48 h-48 rounded-full border-4 border-dashed border-gray-400 flex items-center justify-center transition-colors cursor-pointer group"
              style={{ backgroundColor: garlandColor }}
              title="रंग बदलने के लिए क्लिक करें!"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-30 text-[100px] pointer-events-none">
                🌸
              </div>
              <div className="absolute inset-0 flex flex-wrap content-between justify-between p-2 pointer-events-none text-2xl">
                <span>🌺</span><span>🌼</span><span>🌺</span>
                <span>🌼</span><span></span><span>🌼</span>
                <span>🌺</span><span>🌼</span><span>🌺</span>
              </div>
              
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity font-bold text-white text-sm" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                क्लिक करें!
              </div>
            </button>
            
            <div className="flex items-center gap-2 text-lg w-full max-w-xs" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              <span className="font-bold">नाम :</span>
              <input
                type="text"
                value={isGlobalReveal && !drawingName ? "माला" : drawingName}
                onChange={(e) => {
                  setDrawingName(e.target.value);
                  try { localStorage.setItem("c6-hindi-ch2-p4-drawing", e.target.value); } catch {}
                }}
                className="flex-1 bg-transparent border-b-2 border-dotted border-gray-600 outline-none text-center focus:border-pink-500 font-bold text-pink-700 px-2"
                placeholder="यहाँ लिखें..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section: क्या मैं ये कर सकता/सकती हूँ? (Self Assessment) */}
      <div className="space-y-4 rounded-2xl border border-yellow-400 bg-white shadow-sm overflow-hidden mt-6">
        <div className="bg-yellow-50 p-4 border-b border-yellow-300 flex items-center gap-3">
          <div className="text-3xl">👦🏽</div>
          <h2
            className="text-lg font-bold text-yellow-900"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            क्या मैं ये कर सकता/सकती हूँ?
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            <thead>
              <tr className="border-b border-yellow-200">
                <th className="p-3 font-semibold text-gray-700">कथन</th>
                <th className="p-3 font-bold text-green-600 text-center w-24 border-l border-yellow-200 bg-green-50/50">हाँ (✓)</th>
                <th className="p-3 font-bold text-red-500 text-center w-24 border-l border-yellow-200 bg-red-50/50">नहीं (✗)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-100">
              {SELF_ASSESSMENT.map((text, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-gray-800">{text}</td>
                  <td className="p-3 border-l border-yellow-200 text-center bg-green-50/20">
                    <input
                      type="radio"
                      name={`assessment-${idx}`}
                      checked={assessment[idx] === "yes"}
                      onChange={() => handleAssessment(idx, "yes")}
                      className="w-5 h-5 accent-green-600 cursor-pointer"
                    />
                  </td>
                  <td className="p-3 border-l border-yellow-200 text-center bg-red-50/20">
                    <input
                      type="radio"
                      name={`assessment-${idx}`}
                      checked={assessment[idx] === "no"}
                      onChange={() => handleAssessment(idx, "no")}
                      className="w-5 h-5 accent-red-500 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/40 pt-4 border-t border-border/30">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          छात्रों की प्रगति हेतु सरकार का उपहार
        </span>
        <span className="font-bold text-foreground/60">11</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          हमारा गाँव
        </span>
      </div>
    </div>
  );
}
