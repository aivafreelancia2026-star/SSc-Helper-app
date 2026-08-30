"use client";

import { useState, useEffect } from "react";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const PANELS = [
  { 
    id: 1, 
    emoji: "☂️ ⚽ 📦", 
    desc: "तीनों मित्र एक साथ सैर पर निकले।",
    hint: "चित्र 1 में क्या हो रहा है?" 
  },
  { 
    id: 2, 
    emoji: "🌧️ ☂️ 🛡️ 📦 ⚽", 
    desc: "बारिश होने लगी तो छतरी ने सबको बचाया।",
    hint: "चित्र 2 में क्या हो रहा है?" 
  },
  { 
    id: 3, 
    emoji: "🌊 ⚽ ⬆️ 📦 ⬆️ ☂️", 
    desc: "नदी आई तो गेंद तैरने लगी और सब उस पर बैठ गए।",
    hint: "चित्र 3 में क्या हो रहा है?" 
  },
  { 
    id: 4, 
    emoji: "📦 🛶 ☂️ ⚽", 
    desc: "डिब्बे ने नाव का काम किया।",
    hint: "चित्र 4 में क्या हो रहा है?" 
  },
  { 
    id: 5, 
    emoji: "⛰️ 📦 ☂️ 🏃 ⚽", 
    desc: "पहाड़ पर चढ़ते समय गेंद लुढ़कने लगी।",
    hint: "चित्र 5 में क्या हो रहा है?" 
  },
];

export function C6HindiChRead2Page1() {
  const { addPoints } = useScore();
  const [stories, setStories] = useState<Record<number, string>>({});
  const [evaluated, setEvaluated] = useState<Record<number, boolean>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number; label?: string } | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem("c6-hindi-read2-p1-stories");
      const e = localStorage.getItem("c6-hindi-read2-p1-eval");
      if (s) setStories(JSON.parse(s));
      if (e) setEvaluated(JSON.parse(e));
    } catch {}
  }, []);

  const handleSave = (id: number) => {
    const text = (stories[id] || "").trim();
    if (text.length > 5) {
      setFeedback({ correct: true, id: Date.now(), label: "बहुत अच्छी कहानी! ⭐" });
      if (!evaluated[id]) {
        addPoints(1);
        const newEval = { ...evaluated, [id]: true };
        setEvaluated(newEval);
        try { localStorage.setItem("c6-hindi-read2-p1-eval", JSON.stringify(newEval)); } catch {}
      }
    } else {
      setFeedback({ correct: false, id: Date.now(), label: "कहानी थोड़ी और बड़ी लिखें!" });
    }
  };

  const handleChange = (id: number, val: string) => {
    const newStories = { ...stories, [id]: val };
    setStories(newStories);
    try { localStorage.setItem("c6-hindi-read2-p1-stories", JSON.stringify(newStories)); } catch {}
  };

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 p-4 sm:p-6 pb-20 bg-[#fdfbf7] min-h-screen">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          label={feedback.label}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#6b5820]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          तीन मित्र
        </h1>
        <div className="inline-block border-2 border-[#b59e54] rounded-full px-6 py-2 bg-[#f5ebd4]">
          <span className="text-xl font-bold text-[#6b5820]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            देखो-समझो-बोलो
          </span>
        </div>
        <p className="text-lg text-gray-700 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          चित्र देखिए और समझिए। अपनी कल्पना से कहानी बताइए।
        </p>
      </div>

      {/* Story Panels */}
      <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto mt-8">
        {PANELS.map((panel, idx) => (
          <div key={panel.id} className="bg-white rounded-3xl border-2 border-[#b59e54]/30 shadow-md overflow-hidden flex flex-col md:flex-row transition-transform hover:-translate-y-1 duration-300">
            
            {/* Image Placeholder */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-[#f9f6f0] to-[#f5ebd4] p-8 flex flex-col items-center justify-center relative min-h-[250px] border-b-2 md:border-b-0 md:border-r-2 border-[#b59e54]/30">
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white border-2 border-gray-800 flex items-center justify-center text-xl font-bold shadow-sm">
                {panel.id}
              </div>
              <div className="text-6xl flex gap-4 mt-4 filter drop-shadow-md">
                {panel.emoji.split(" ").map((em, i) => (
                  <span key={i} className="hover:scale-110 transition-transform cursor-default">{em}</span>
                ))}
              </div>
              <p className="mt-6 text-sm text-[#6b5820]/70 italic text-center max-w-[80%]">
                (यहाँ आप असली चित्र लगा सकते हैं)
              </p>
            </div>

            {/* Interactive Story Input */}
            <div className="w-full md:w-1/2 p-6 flex flex-col bg-white">
              <label className="text-lg font-bold text-gray-800 mb-3" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                {panel.hint}
              </label>
              <textarea
                value={stories[panel.id] || ""}
                onChange={(e) => handleChange(panel.id, e.target.value)}
                placeholder="यहाँ अपनी कहानी लिखें..."
                className="flex-grow w-full resize-none bg-[#fdfbf7] border-2 border-[#b59e54]/20 rounded-xl p-4 text-lg outline-none focus:border-[#b59e54] transition-colors min-h-[120px]"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleSave(panel.id)}
                  disabled={!stories[panel.id]}
                  className={`px-6 py-2 rounded-xl font-bold transition-all shadow-sm ${
                    evaluated[panel.id] 
                      ? "bg-green-100 text-green-700 border-2 border-green-200" 
                      : stories[panel.id]
                        ? "bg-[#b59e54] text-white hover:bg-[#8c7a3e] active:scale-95"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  {evaluated[panel.id] ? "✓ सहेजा गया" : "सहेजें"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer page number */}
      <div className="flex justify-between items-center text-xs text-foreground/40 mt-12 pt-4 border-t border-border max-w-4xl mx-auto">
        <span>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-foreground/60 bg-green-100 px-3 py-1 rounded text-green-900 border border-green-200">17</span>
        <span>रेलवे स्टेशन</span>
      </div>
    </div>
  );
}
