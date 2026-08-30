"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const POEM_LINES = [
  "देखो-देखो यह बाज़ार,",
  "कितना प्यारा है बाज़ार।",
  "सब कुछ मिलता है यहाँ,",
  "सब लोगों का यह बाज़ार।।",
];

const TARGET_LETTERS = [
  { letter: "ज", example: "जग, जल, जानवर", emoji: "💧" },
  { letter: "फ", example: "फल, फूल, फसल", emoji: "🍎" },
  { letter: "ब", example: "बस, बिल्ली, बाज़ार", emoji: "🚌" },
  { letter: "भ", example: "भालू, भवन, भाई", emoji: "🐻" },
  { letter: "ष", example: "षट्कोण, वर्षा", emoji: "🛑" },
  { letter: "ऋ", example: "ऋषि, ऋतु", emoji: "🧘" },
];

const BAZAAR_ITEMS = [
  { id: "item1", name: "चाय घर", emoji: "🍵", desc: "लोग यहाँ चाय पी रहे हैं।" },
  { id: "item2", name: "चूड़ियों की दुकान", emoji: "📿", desc: "रंग-बिरंगी चूड़ियाँ मिल रही हैं।" },
  { id: "item3", name: "फल-सब्ज़ी", emoji: "🛒", desc: "ताज़े फल और सब्ज़ियाँ।" },
  { id: "item4", name: "भीड़", emoji: "👨‍👩‍👧‍👦", desc: "बाज़ार में बहुत से लोग हैं।" },
];

export function C6HindiCh4Page1() {
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const { addPoints } = useScore();

  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLetter, setActiveLetter] = useState<number | null>(null);
  
  const [foundItems, setFoundItems] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number; label?: string } | null>(null);

  // Load state from localStorage
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("c6-hindi-ch4-p1-items");
      if (savedItems) setFoundItems(JSON.parse(savedItems));
    } catch {}
  }, []);

  // Karaoke poem singing simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveLine((prev) => {
          if (prev === null || prev >= POEM_LINES.length - 1) {
            setIsPlaying(false);
            return null;
          }
          return prev + 1;
        });
      }, 1800); // slightly slower pacing for expression
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePlayPoem = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setActiveLine(null);
    } else {
      setActiveLine(0);
      setIsPlaying(true);
    }
  };

  const handleLetterClick = (index: number) => {
    setActiveLetter(activeLetter === index ? null : index);
  };

  const handleItemFound = (id: string) => {
    if (!foundItems[id]) {
      const newItems = { ...foundItems, [id]: true };
      setFoundItems(newItems);
      addPoints(1);
      setFeedback({ correct: true, id: Date.now(), label: "बहुत बढ़िया! +1 ⭐" });
      try { localStorage.setItem("c6-hindi-ch4-p1-items", JSON.stringify(newItems)); } catch {}
    }
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

      {/* Header and Title */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-[#e0f2fe] rounded-2xl p-4 shadow-sm border border-sky-200">
        <div className="bg-white px-4 py-1 rounded-full shadow-inner font-bold text-sky-800 border border-sky-300">
          इकाई - II
        </div>
        <h1 className="text-3xl font-bold text-sky-900 mt-2 sm:mt-0" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          4. बाज़ार
        </h1>
        <div className="mt-2 sm:mt-0 p-2 bg-white rounded-lg shadow-sm">
          {/* QR Code Placeholder */}
          <div className="w-16 h-16 border-2 border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400 font-mono text-center leading-tight bg-gray-50">
            W6X1R1<br/>QR
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: The Poem */}
        <div className="space-y-6">
          <div className="bg-white rounded-full p-8 shadow-md border-4 border-pink-100 flex flex-col items-center justify-center text-center relative aspect-square max-w-md mx-auto">
            <div className="absolute top-4 right-4 bg-pink-100 p-3 rounded-full cursor-pointer hover:scale-110 transition-transform hover:bg-pink-200 shadow-sm" onClick={handlePlayPoem}>
              {isPlaying ? "⏹️" : "▶️"}
            </div>
            <div className="space-y-4">
              {POEM_LINES.map((line, idx) => (
                <p
                  key={idx}
                  className={`text-2xl transition-all duration-300 ${
                    activeLine === idx 
                      ? "text-pink-600 font-bold scale-110 drop-shadow-sm" 
                      : isPlaying && activeLine !== null && activeLine > idx
                        ? "text-gray-400"
                        : "text-gray-700 font-medium"
                  }`}
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-center shadow-sm">
            <p className="text-yellow-800 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              अध्यापक बाल गीत गाएँगे। बच्चे ध्यान से सुनेंगे।
            </p>
          </div>
        </div>

        {/* Right Column: New Letters & Interactive Scene Exploration */}
        <div className="space-y-6 flex flex-col">
          
          {/* New Letters Box */}
          <div className="bg-white rounded-2xl border-2 border-amber-200 p-5 shadow-sm">
            <h3 className="text-amber-900 font-bold mb-4 text-center border-b border-amber-100 pb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              नए वर्ण पहचानें (New Letters)
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {TARGET_LETTERS.map((t, i) => (
                <div key={i} className="relative group">
                  <button
                    onClick={() => handleLetterClick(i)}
                    className={`w-12 h-12 rounded-lg text-2xl font-bold flex items-center justify-center transition-all shadow-sm ${
                      activeLetter === i
                        ? "bg-amber-400 text-white shadow-inner scale-95"
                        : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200"
                    }`}
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    {t.letter}
                  </button>
                  
                  {activeLetter === i && (
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10 animate-fade-in text-center flex flex-col gap-1">
                      <span className="text-2xl">{t.emoji}</span>
                      <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{t.example}</span>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-gray-800" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Special matra */}
              <div className="w-12 h-12 rounded-lg text-2xl font-bold flex items-center justify-center bg-gray-100 text-gray-500 border border-gray-200" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                ृ
              </div>
            </div>
          </div>

          {/* Interactive Bazaar Discovery */}
          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 shadow-sm flex-grow">
            <h3 className="text-emerald-900 font-bold mb-3 text-lg" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              बाज़ार में क्या-क्या है? ढूँढें!
            </h3>
            <p className="text-emerald-700 text-sm mb-4">
              चित्र में देखकर बाज़ार की चीज़ों पर क्लिक करें:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BAZAAR_ITEMS.map((item) => {
                const isFound = foundItems[item.id] || isUrlRevealed;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemFound(item.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      isFound 
                        ? "bg-white border-emerald-400 shadow-md" 
                        : "bg-emerald-100/50 border-emerald-200 hover:bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    <span className="text-3xl filter drop-shadow-sm">{item.emoji}</span>
                    <div className="flex flex-col">
                      <span className={`font-bold text-base ${isFound ? "text-emerald-700" : ""}`} style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                        {item.name}
                      </span>
                      {isFound && (
                        <span className="text-xs text-gray-500 mt-1 animate-fade-in" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                          {item.desc}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/40 mt-12 pt-4 border-t border-border max-w-5xl mx-auto">
        <span>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-foreground/60 bg-sky-100 px-3 py-1 rounded text-sky-900 border border-sky-200">18</span>
        <span>बाज़ार</span>
      </div>
    </div>
  );
}
