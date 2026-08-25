"use client";

import { useState } from "react";

// Vocab words shown on the yellow chart in the textbook image
const VOCAB_WORDS = [
  { hindi: "कलम",  emoji: "🖊️",  english: "pen",      hint: "लिखने का साधन" },
  { hindi: "मटर",  emoji: "🫛",  english: "peas",     hint: "हरी सब्ज़ी" },
  { hindi: "ऐनक",  emoji: "👓",  english: "glasses",  hint: "आँखों पर पहनते हैं" },
  { hindi: "फल",   emoji: "🍍",  english: "fruit",    hint: "मीठा खाना" },
];

// Match-the-word game — shuffle emojis, student drags/taps to pair
const SHUFFLED_EMOJIS = ["🍍", "🖊️", "👓", "🫛"];

export function C6HindiChRead1Page2() {
  // ---- Vocabulary card flip state ----
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  // ---- Word-match game state ----
  const [selected, setSelected] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});   // word → emoji
  const [wrong,   setWrong]   = useState<string | null>(null);

  // ---- Slate writing practice ----
  const [slateText, setSlateText] = useState("");

  function handleWordClick(word: string) {
    if (matches[word]) return; // already matched
    setSelected(word === selected ? null : word);
    setWrong(null);
  }

  function handleEmojiClick(emoji: string) {
    if (!selected) return;
    if (Object.values(matches).includes(emoji)) return; // already used
    const correctEmoji = VOCAB_WORDS.find((v) => v.hindi === selected)?.emoji;
    if (correctEmoji === emoji) {
      setMatches((m) => ({ ...m, [selected]: emoji }));
      setSelected(null);
      setWrong(null);
    } else {
      setWrong(selected);
      setTimeout(() => setWrong(null), 900);
    }
  }

  const allMatched = Object.keys(matches).length === VOCAB_WORDS.length;

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">

      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <span className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
          इकाई - I
        </span>
        <h2
          className="font-heading text-xl font-bold text-orange-600"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          पाठशाला
        </h2>
      </div>

      {/* ── Classroom Scene ── */}
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-orange-200 shadow-inner"
        style={{
          minHeight: "280px",
          background: "linear-gradient(160deg, #f9fafb 0%, #fef9f0 60%, #fed7aa33 100%)",
        }}
      >
        {/* Light-grey wall */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: "60%", background: "linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)" }}
        />

        {/* Window (top-left) */}
        <div
          className="absolute top-3 left-4 rounded-sm border-4 border-amber-800 overflow-hidden shadow-md"
          style={{ width: "64px", height: "72px" }}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #7dd3fc 0%, #86efac 100%)" }} />
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-amber-900/50" />
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-amber-900/50" />
        </div>

        {/* Yellow word-picture chart (right side of wall) */}
        <div
          className="absolute top-3 right-4 rounded border-2 border-yellow-600 flex flex-col justify-center gap-1 px-3 py-2 shadow-md"
          style={{ width: "190px", background: "#fde047" }}
        >
          {VOCAB_WORDS.map((v) => (
            <div key={v.hindi} className="flex items-center justify-between">
              <span
                className="font-bold text-gray-800"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: "13px" }}
              >
                {v.hindi}
              </span>
              <span className="text-lg">{v.emoji}</span>
            </div>
          ))}
        </div>

        {/* Floor */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "40%", background: "linear-gradient(180deg, #fca5a533 0%, #ef444422 100%)" }}
        />
        <div className="absolute left-0 right-0 h-px bg-gray-300" style={{ bottom: "40%" }} />

        {/* ── Students (CSS figures) ── */}

        {/* Student 1 – standing left, reading Hindi book */}
        <div className="absolute flex flex-col items-center" style={{ left: "76px", bottom: "90px" }}>
          <div className="w-5 h-2 rounded-t-full bg-gray-900" style={{ marginBottom: "-1px" }} />
          <div className="w-5 h-5 rounded-full bg-amber-500 border border-amber-600" />
          <div className="relative w-5 h-12 mt-0.5 rounded-sm" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
            <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: "#2563eb" }} />
          </div>
          {/* book in arms */}
          <div className="absolute rounded border border-green-500 flex items-center justify-center shadow-sm"
            style={{ width: "30px", height: "22px", background: "#dcfce7", left: "18px", top: "24px" }}>
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: "7px", fontWeight: "bold", color: "#166534" }}>हिंदी</span>
          </div>
        </div>

        {/* Student 2 – standing near window */}
        <div className="absolute flex flex-col items-center" style={{ left: "36px", bottom: "100px" }}>
          <div className="w-5 h-2 rounded-t-full bg-gray-900" style={{ marginBottom: "-1px" }} />
          <div className="w-5 h-5 rounded-full bg-amber-400 border border-amber-500" />
          <div className="w-4 h-11 mt-0.5 rounded-sm" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          </div>
          <div className="absolute h-4 w-1.5 rounded" style={{ background: "#3b82f6", bottom: "0", left: "12px" }} />
        </div>

        {/* Student 3 – standing, pointing at chart */}
        <div className="absolute flex flex-col items-center" style={{ right: "56px", bottom: "76px" }}>
          <div className="w-6 h-2.5 rounded-t-full bg-gray-900" style={{ marginBottom: "-1px" }} />
          <div className="w-6 h-6 rounded-full bg-amber-600 border border-amber-700" />
          {/* arm pointing right */}
          <div className="absolute bg-amber-600 rounded-full"
            style={{ width: "20px", height: "5px", top: "20px", right: "-12px", transform: "rotate(-20deg)", transformOrigin: "left center" }} />
          <div className="w-5 h-11 mt-0.5 rounded-sm" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
            <div className="w-full h-full rounded-sm" style={{ background: "transparent", borderBottom: "24px solid #2563eb" }} />
          </div>
        </div>

        {/* Student 4 – sitting cross-legged, writing on slate */}
        <div className="absolute flex flex-col items-center" style={{ left: "130px", bottom: "50px" }}>
          <div className="w-6 h-2.5 rounded-t-full bg-gray-900" style={{ marginBottom: "-1px" }} />
          <div className="w-6 h-6 rounded-full bg-amber-400 border border-amber-500" />
          <div className="w-12 h-6 mt-0.5 rounded-t-lg" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }} />
          {/* slate on lap */}
          <div className="rounded border-2 border-gray-700 shadow-md"
            style={{ width: "44px", height: "28px", background: "#1f2937", marginTop: "2px" }}>
            <div className="flex flex-wrap gap-px p-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-white/60" />
              ))}
            </div>
          </div>
        </div>

        {/* Student 5 – sitting, writing on floor */}
        <div className="absolute flex flex-col items-center" style={{ right: "80px", bottom: "40px" }}>
          <div className="w-5 h-2 rounded-t-full bg-gray-900" style={{ marginBottom: "-1px" }} />
          <div className="w-2 h-2 rounded-full bg-blue-400 absolute" style={{ marginLeft: "18px", marginTop: "-2px" }} />
          <div className="w-5 h-5 rounded-full bg-amber-500 border border-amber-600" />
          <div className="w-10 h-5 mt-0.5 rounded-t-lg" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }} />
          {/* Hindi book on floor */}
          <div className="rounded border border-green-500 flex items-center justify-center shadow-sm mt-1"
            style={{ width: "36px", height: "22px", background: "#dcfce7" }}>
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: "7px", fontWeight: "bold", color: "#166534" }}>हिंदी</span>
          </div>
        </div>

        {/* Page number */}
        <div className="absolute bottom-1 left-0 right-0 flex justify-center">
          <span className="text-xs text-gray-400/70 font-semibold">3</span>
        </div>
      </div>

      {/* ── Section: Vocabulary Cards ── */}
      <div className="space-y-3">
        <h3
          className="font-heading text-base font-bold text-primary text-center"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          📋 शब्द सीखो (Vocabulary)
        </h3>
        <p className="text-xs text-foreground/50 text-center">
          कार्ड पर क्लिक करो और शब्द का अर्थ देखो —
        </p>

        <div className="grid grid-cols-2 gap-3">
          {VOCAB_WORDS.map((v, i) => (
            <button
              key={v.hindi}
              onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
              className="rounded-2xl border border-border/60 bg-white/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
              style={{ minHeight: "100px" }}
            >
              {!flipped[i] ? (
                /* Front – Hindi word */
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                  <span className="text-3xl">{v.emoji}</span>
                  <p
                    className="text-lg font-bold text-foreground"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    {v.hindi}
                  </p>
                  <p className="text-xs text-foreground/40">क्लिक करो ▼</p>
                </div>
              ) : (
                /* Back – meaning */
                <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-4 bg-primary/5">
                  <p
                    className="text-sm font-bold text-primary"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    {v.hindi} = {v.english}
                  </p>
                  <p
                    className="text-xs text-foreground/60 text-center"
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    {v.hint}
                  </p>
                  <p className="text-xs text-foreground/30 mt-1">वापस ▲</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Section: Word-Picture Matching Game ── */}
      <div className="space-y-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
        <h3
          className="font-heading text-base font-bold text-yellow-700 text-center"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          🎯 मिलाओ — शब्द और चित्र
        </h3>
        <p className="text-xs text-foreground/50 text-center">
          पहले शब्द चुनो, फिर सही चित्र पर क्लिक करो —
        </p>

        {allMatched ? (
          <div className="text-center py-4 space-y-2">
            <p className="text-2xl">🎉</p>
            <p
              className="font-bold text-green-700"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              शाबाश! सभी सही मिलाए!
            </p>
            <button
              onClick={() => { setMatches({}); setSelected(null); }}
              className="mt-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
            >
              फिर खेलो
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Words column */}
            <div className="flex flex-wrap justify-center gap-2">
              {VOCAB_WORDS.map((v) => (
                <button
                  key={v.hindi}
                  onClick={() => handleWordClick(v.hindi)}
                  disabled={!!matches[v.hindi]}
                  className={[
                    "rounded-xl px-4 py-2 text-sm font-bold border transition-all duration-150",
                    matches[v.hindi]
                      ? "border-green-400 bg-green-50 text-green-700 line-through opacity-50 cursor-default"
                      : selected === v.hindi
                      ? "border-primary bg-primary text-white scale-105 shadow-md"
                      : wrong === v.hindi
                      ? "border-red-400 bg-red-50 text-red-700 scale-95"
                      : "border-border/60 bg-white/80 text-foreground hover:border-primary/50",
                  ].join(" ")}
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  {v.hindi}
                </button>
              ))}
            </div>

            {/* Emojis column */}
            <div className="flex flex-wrap justify-center gap-4">
              {SHUFFLED_EMOJIS.map((emoji) => {
                const used = Object.values(matches).includes(emoji);
                return (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiClick(emoji)}
                    disabled={used || !selected}
                    className={[
                      "text-3xl rounded-2xl p-3 border-2 transition-all duration-150",
                      used
                        ? "border-green-300 bg-green-50 opacity-40 cursor-default"
                        : selected
                        ? "border-primary/40 bg-white hover:bg-primary/10 hover:scale-110 cursor-pointer"
                        : "border-gray-200 bg-white/60 cursor-default opacity-60",
                    ].join(" ")}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>

            {selected && (
              <p
                className="text-center text-xs text-primary font-medium animate-pulse"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                &quot;{selected}&quot; के लिए सही चित्र चुनो ☝️
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Section: Slate Writing Practice ── */}
      <div className="space-y-3">
        <h3
          className="font-heading text-base font-bold text-primary text-center"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          ✏️ स्लेट पर लिखो
        </h3>
        <p
          className="text-xs text-foreground/50 text-center"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          नीचे दिए गए शब्दों को अपनी स्लेट पर लिखो — कलम, मटर, ऐनक, फल
        </p>

        {/* Slate UI */}
        <div
          className="relative w-full rounded-2xl border-4 border-gray-700 shadow-lg overflow-hidden"
          style={{ background: "#1f2937", minHeight: "120px" }}
        >
          {/* Ruled lines on slate */}
          <div className="absolute inset-0 flex flex-col justify-around px-4 py-3 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-px bg-white/10" />
            ))}
          </div>
          <textarea
            value={slateText}
            onChange={(e) => setSlateText(e.target.value)}
            placeholder="यहाँ लिखो…"
            rows={4}
            className="relative w-full bg-transparent px-4 py-3 text-white placeholder:text-white/20 focus:outline-none resize-none"
            style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: "16px",
              lineHeight: "1.8",
              zIndex: 1,
            }}
          />
        </div>

        {slateText.trim() && (
          <div className="flex items-center justify-between">
            <p
              className="text-xs text-green-600 font-medium"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              ✓ बहुत अच्छा!
            </p>
            <button
              onClick={() => setSlateText("")}
              className="text-xs text-foreground/40 hover:text-red-500 transition-colors"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              मिटाओ ✕
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/30 pt-2 border-t border-border/20">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          छठी की प्रगति हेतु सरकार का उपहार
        </span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>पाठशाला</span>
      </div>
    </div>
  );
}
