"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const MATCHING_PAIRS = [
  { id: "1", word: "इमली", emoji: "🫘", hint: "खट्टी-मीठी इमली" },
  { id: "2", word: "किला", emoji: "🏰", hint: "बड़ा सा किला (Fort)" },
  { id: "3", word: "कील", emoji: "📍", hint: "दीवार में ठोकने वाली कील (Nail)" },
  { id: "4", word: "माला", emoji: "📿", hint: "गले में पहनने वाली माला" },
  { id: "5", word: "ईख", emoji: "🎋", hint: "मीठा गन्ना (Sugarcane)" },
  { id: "6", word: "नल", emoji: "🚰", hint: "पानी का नल" },
  { id: "7", word: "किसान", emoji: "👨‍🌾", hint: "खेत में काम करने वाले किसान" },
  { id: "8", word: "नाक", emoji: "👃", hint: "सूँघने के लिए नाक" },
];

export function C6HindiCh2Page3() {
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const { addPoints } = useScore();

  const [showReveal, setShowReveal] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number; label?: string } | null>(null);

  // Matching game state
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [shuffledEmojis, setShuffledEmojis] = useState<typeof MATCHING_PAIRS>([]);

  const isGlobalReveal = isUrlRevealed || showReveal;

  useEffect(() => {
    // Shuffle emojis for the right column once on mount
    const shuffled = [...MATCHING_PAIRS].sort(() => Math.random() - 0.5);
    setShuffledEmojis(shuffled);

    // Load saved matches
    try {
      const saved = localStorage.getItem("c6-hindi-ch2-p3-matches");
      if (saved) setMatchedPairs(JSON.parse(saved));
    } catch {}
  }, []);

  const handleWordClick = (id: string) => {
    if (matchedPairs[id]) return;
    if (selectedWord === id) {
      setSelectedWord(null); // Deselect
    } else {
      setSelectedWord(id);
    }
  };

  const handleEmojiClick = (emojiId: string) => {
    if (Object.values(matchedPairs).includes(emojiId)) return;
    
    if (selectedWord) {
      if (selectedWord === emojiId) {
        // Match!
        const newMatches = { ...matchedPairs, [selectedWord]: emojiId };
        setMatchedPairs(newMatches);
        setSelectedWord(null);
        addPoints(1);
        setFeedback({ correct: true, id: Date.now(), label: "सही जोड़ी! +1 ⭐" });
        try {
          localStorage.setItem("c6-hindi-ch2-p3-matches", JSON.stringify(newMatches));
        } catch {}
      } else {
        // Wrong match
        setFeedback({ correct: false, id: Date.now(), label: "गलत जोड़ी, फिर से प्रयास करें!" });
        setSelectedWord(null);
      }
    }
  };

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
            <p className="text-xs font-semibold text-green-700">सुनो-बोलो / पढ़ो</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-green-300 bg-white/80 px-2.5 py-1 text-[11px] font-bold text-gray-700 shadow-xs">
            <span>📱 QR:</span>
            <span className="font-mono text-primary">H9L6K8</span>
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
      </div>

      {/* Section 1: सुनो-बोलो (Listen & Speak) */}
      <div className="space-y-4 rounded-2xl border border-blue-200 bg-blue-50/50 p-5 shadow-sm">
        <div className="flex items-center gap-3 border-b border-blue-200 pb-3">
          <span className="text-2xl">🗣️</span>
          <h2
            className="text-lg font-bold text-blue-900"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            सुनो-बोलो
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 items-center">
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="font-medium text-blue-950" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                1. चित्र में क्या-क्या हैं?
              </p>
              {isGlobalReveal && (
                <p className="text-sm text-blue-800 animate-fade-in pl-4 border-l-2 border-blue-400" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  चित्र में खेत, किसान, ट्रैक्टर, बैल, बच्चे, नल, इमली का पेड़, कुत्ता और महिलाएँ हैं।
                </p>
              )}
            </div>
            <div className="space-y-1">
              <p className="font-medium text-blue-950" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                2. आप अपने गाँव के बारे में बताइए।
              </p>
              {isGlobalReveal && (
                <p className="text-sm text-blue-800 animate-fade-in pl-4 border-l-2 border-blue-400" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  (छात्र अपने गाँव के खेत, घर, जानवर और पेड़ों के बारे में कक्षा में बताएँगे।)
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative text-7xl hover:scale-110 transition-transform cursor-pointer" title="किसान और बैल">
              👨‍🌾🐂🐂
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: पढ़ो (Read) */}
      <div className="space-y-4 rounded-2xl border border-green-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3 border-b border-green-200 pb-3">
          <span className="text-2xl">📖</span>
          <h2
            className="text-lg font-bold text-green-900"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            पढ़ो
          </h2>
        </div>

        <div className="space-y-4">
          <p className="text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            (अ) गीत पढ़िए। 'इ - ि', 'ई - ी' मात्रा वाले शब्दों पर <span className="inline-block w-4 h-4 rounded-full border-2 border-blue-500 mx-1 align-middle"></span> लगाइए।
          </p>
          <p className="text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            (आ) गीत पढ़िए। 'इमली' शब्द पर <span className="inline-block w-4 h-4 rounded-full border-2 border-blue-500 mx-1 align-middle"></span> और 'ईख' शब्द पर <span className="inline-block w-4 h-4 border-2 border-black mx-1 align-middle"></span> लगाइए।
          </p>
          
          <div className="bg-green-50 p-4 rounded-xl border border-green-100 font-bold text-center leading-loose text-lg" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            <p>हरा-भरा है गाँव हमारा, लगता हमको प्यारा-प्यारा।</p>
            <p>नल के पास हम नहाते, <span className={isGlobalReveal ? "border-2 border-black px-1" : ""}>ईख</span> और <span className={isGlobalReveal ? "border-2 border-blue-500 rounded-full px-1" : ""}>इमली</span> हैं खाते।</p>
            <p><span className={isGlobalReveal ? "text-red-600 underline decoration-dotted" : ""}>कि</span>सान खेत में हल चलाते, तरह-तरह के अन्न उगाते।</p>
          </div>

          <p className="text-gray-800 pt-4" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            (इ) पाठ का चित्र देखिए। शब्द पढ़िए। इनके अक्षर वर्णमाला चार्ट में पहचानकर <span className="inline-block w-4 h-4 rounded-full border-2 border-black mx-1 align-middle"></span> लगाइए।
          </p>

          <div className="overflow-x-auto">
            <table className="w-full max-w-lg mx-auto border-collapse border-2 border-yellow-700 text-center text-lg" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              <tbody>
                <tr>
                  <td className="border-2 border-yellow-700 p-2 font-bold w-1/3">ईख</td>
                  <td className="border-2 border-yellow-700 p-2 font-bold w-1/3">इमली</td>
                  <td className="border-2 border-yellow-700 p-2 font-bold w-1/3">किसान</td>
                </tr>
                <tr>
                  <td className="border-2 border-yellow-700 p-0">
                    <div className="flex divide-x-2 divide-yellow-700">
                      <div className="flex-1 p-2">ई</div>
                      <div className="flex-1 p-2">ख</div>
                    </div>
                  </td>
                  <td className="border-2 border-yellow-700 p-0">
                    <div className="flex divide-x-2 divide-yellow-700">
                      <div className="flex-1 p-2">इ</div>
                      <div className="flex-1 p-2">म</div>
                      <div className="flex-1 p-2">ली</div>
                    </div>
                  </td>
                  <td className="border-2 border-yellow-700 p-0">
                    <div className="flex divide-x-2 divide-yellow-700">
                      <div className="flex-1 p-2">कि</div>
                      <div className="flex-1 p-2">सा</div>
                      <div className="flex-1 p-2">न</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-yellow-700 p-0 bg-yellow-50">
                    <div className="flex divide-x-2 divide-yellow-700 text-yellow-900">
                      <div className="flex-1 p-2">ई</div>
                      <div className="flex-1 p-2">ख</div>
                    </div>
                  </td>
                  <td className="border-2 border-yellow-700 p-0 bg-yellow-50">
                    <div className="flex divide-x-2 divide-yellow-700 text-yellow-900">
                      <div className="flex-1 p-2">इ</div>
                      <div className="flex-1 p-2">म</div>
                      <div className="flex-1 p-2">ल</div>
                      <div className="flex-1 p-2">ी</div>
                    </div>
                  </td>
                  <td className="border-2 border-yellow-700 p-0 bg-yellow-50">
                    <div className="flex divide-x-2 divide-yellow-700 text-yellow-900 text-base">
                      <div className="flex-1 p-2">ि</div>
                      <div className="flex-1 p-2">क</div>
                      <div className="flex-1 p-2">स</div>
                      <div className="flex-1 p-2">ा</div>
                      <div className="flex-1 p-2">न</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section 3 & 4: जोड़ी बनाइए & वर्णमाला */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Match the following */}
        <div className="space-y-4 rounded-2xl border border-purple-200 bg-white p-5 shadow-sm">
          <h2
            className="text-lg font-bold text-purple-900 border-b border-purple-200 pb-2"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            (ई) जोड़ी बनाइए। (Match)
          </h2>
          <p className="text-xs text-gray-500 mb-4">शब्द को चुनकर सही चित्र से मिलाएँ।</p>
          
          <div className="flex justify-between gap-4">
            {/* Words Column */}
            <div className="flex flex-col gap-3 w-1/2">
              {MATCHING_PAIRS.map((pair) => {
                const isMatched = !!matchedPairs[pair.id];
                const isSelected = selectedWord === pair.id;
                
                return (
                  <button
                    key={pair.id}
                    onClick={() => handleWordClick(pair.id)}
                    disabled={isMatched}
                    className={`p-3 rounded-xl border-2 text-left text-lg transition-all ${
                      isMatched 
                        ? "bg-green-100 border-green-300 text-green-700 opacity-70" 
                        : isSelected
                          ? "bg-purple-100 border-purple-500 text-purple-900 scale-105 shadow-md"
                          : "bg-gray-50 border-gray-200 hover:border-purple-300"
                    }`}
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    {pair.word} {isMatched && "✅"}
                  </button>
                );
              })}
            </div>
            
            {/* Emojis Column */}
            <div className="flex flex-col gap-3 w-1/2">
              {shuffledEmojis.map((pair) => {
                const isMatched = Object.values(matchedPairs).includes(pair.id);
                
                return (
                  <button
                    key={`emoji-${pair.id}`}
                    onClick={() => handleEmojiClick(pair.id)}
                    disabled={isMatched}
                    className={`p-3 rounded-xl border-2 text-center text-3xl transition-all h-[56px] flex items-center justify-center ${
                      isMatched 
                        ? "bg-green-100 border-green-300 opacity-70" 
                        : selectedWord
                          ? "bg-white border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50 cursor-pointer animate-pulse"
                          : "bg-gray-50 border-gray-200"
                    }`}
                    title={isGlobalReveal ? pair.hint : "चित्र"}
                  >
                    {pair.emoji}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Varnamala Chart */}
        <div className="space-y-4 rounded-2xl border border-orange-200 bg-[#f8f9fa] p-5 shadow-sm relative overflow-hidden">
          {/* Notebook binding effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gray-300 border-r border-gray-400 flex flex-col justify-evenly py-4 shadow-inner">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-6 h-4 bg-gray-800 rounded-r-md mx-auto shadow-sm" />
            ))}
          </div>

          <div className="pl-8">
            <h2
              className="text-center font-bold text-orange-900 mb-4 pb-2 border-b-2 border-orange-200"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              वर्णमाला (Varnamala)
            </h2>
            
            <div 
              className="space-y-3 text-center font-medium text-gray-800 tracking-widest text-lg leading-relaxed"
              style={{ 
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #d1d5db 31px, #d1d5db 32px)",
                backgroundAttachment: "local",
                lineHeight: "32px",
              }}
            >
              <div className="flex justify-evenly"><span>अ</span><span>आ</span><span>इ</span><span>ई</span><span>उ</span><span>ऊ</span><span>ऋ</span></div>
              <div className="flex justify-evenly"><span>ए</span><span>ऐ</span><span>ओ</span><span>औ</span><span>अं</span><span>अः</span></div>
              <div className="flex justify-evenly mt-2"><span>क</span><span>ख</span><span>ग</span><span>घ</span><span>ङ</span></div>
              <div className="flex justify-evenly"><span>च</span><span>छ</span><span>ज</span><span>झ</span><span>ञ</span></div>
              <div className="flex justify-evenly"><span>ट</span><span>ठ</span><span>ड</span><span>ढ</span><span>ण</span><span className="text-sm">(ड़ ढ̣)</span></div>
              <div className="flex justify-evenly"><span>त</span><span>थ</span><span>द</span><span>ध</span><span>न</span></div>
              <div className="flex justify-evenly"><span>प</span><span>फ</span><span>ब</span><span>भ</span><span>म</span></div>
              <div className="flex justify-evenly"><span>य</span><span>र</span><span>ल</span><span>व</span></div>
              <div className="flex justify-evenly"><span>श</span><span>ष</span><span>स</span><span>ह</span></div>
              <div className="flex justify-evenly"><span>क्ष</span><span>त्र</span><span>ज्ञ</span><span className="text-sm">(श्र)</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/40 pt-4 border-t border-border/30">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          छात्रों की प्रगति हेतु सरकार का उपहार
        </span>
        <span className="font-bold text-foreground/60">10</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          हमारा गाँव
        </span>
      </div>
    </div>
  );
}
