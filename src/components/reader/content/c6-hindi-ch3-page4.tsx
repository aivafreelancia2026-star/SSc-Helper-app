"use client";

import { useState } from "react";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";

const MATRA_TABLE = [
  { char: "क", u: "कु", oo: "कू" },
  { char: "ख", u: "खु", oo: "खू" },
  { char: "घ", u: "घु", oo: "घू" },
  { char: "च", u: "चु", oo: "चू" },
  { char: "छ", u: "छु", oo: "छू" },
  { char: "ट", u: "टु", oo: "टू" },
  { char: "न", u: "नु", oo: "नू" },
  { char: "म", u: "मु", oo: "मू" },
  { char: "र", u: "रु", oo: "रू" },
  { char: "ल", u: "लु", oo: "लू" },
  { char: "स", u: "सु", oo: "सू" },
];

const READ_WORDS = [
  ["उमा", "ऊन", "सुख", "मूली", "आलू", "कुल", "कुली"],
  ["रुई", "सुई", "डमरू", "खून", "कछुआ", "रुमाल", "चूड़ी"],
];

const MATCHING_LEFT = ["उमा", "ऊन", "घड़ी", "चार", "छड़ी", "टिकट"];
const MATCHING_RIGHT = ["टिकट", "छड़ी", "ऊन", "उमा", "घड़ी", "चार"];

const WRITE_GRID_COLS = ["क", "ख", "घ", "च", "छ", "ड", "न", "म", "र", "ल", "स"];
const WRITE_GRID_ROWS = [
  { matra: "ा", symbol: "ा" },
  { matra: "ि", symbol: "ि" },
  { matra: "ी", symbol: "ी" },
  { matra: "ु", symbol: "ु" },
  { matra: "ू", symbol: "ू" },
];

export function C6HindiCh3Page4() {
  const { addPoints } = useScore();
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number; label?: string } | null>(null);

  // Matching game state
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  
  // Write grid state
  const [revealedCells, setRevealedCells] = useState<Record<string, boolean>>({});

  const handleMatchClick = (side: "left" | "right", word: string) => {
    if (side === "left") {
      if (!Object.keys(matchedPairs).includes(word)) {
        setSelectedLeft(word === selectedLeft ? null : word);
      }
    } else if (side === "right" && selectedLeft) {
      if (word === selectedLeft) {
        setMatchedPairs(prev => ({ ...prev, [selectedLeft]: word }));
        setSelectedLeft(null);
        addPoints(1);
        setFeedback({ correct: true, id: Date.now(), label: "सही जोड़ी! ⭐" });
      } else {
        setFeedback({ correct: false, id: Date.now(), label: "गलत जोड़ी, फिर से प्रयास करें!" });
        setSelectedLeft(null);
      }
    }
  };

  const handleRevealCell = (colIdx: number, rowIdx: number) => {
    const key = `${colIdx}-${rowIdx}`;
    if (!revealedCells[key]) {
      setRevealedCells(prev => ({ ...prev, [key]: true }));
      addPoints(1);
    }
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

      {/* Section (आ): Matra Difference */}
      <div className="space-y-4">
        <p className="text-base font-bold text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          (आ) नीचे दिए गए बक्से में &apos;ु&apos; और &apos;ू&apos; की मात्रा के अंतर पहचानते हुए पढ़िए।
        </p>
        
        <div className="overflow-x-auto rounded-xl border-2 border-[#b59e54] shadow-md bg-white">
          <table className="w-full text-center border-collapse min-w-[600px]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            <thead>
              <tr className="bg-[#f5ebd4] border-b-2 border-[#b59e54]">
                <th className="p-2 border-r border-[#b59e54] font-bold text-[#6b5820]">स्वर</th>
                <th className="p-2 border-r border-[#b59e54] font-bold text-[#6b5820]">मात्रा</th>
                {MATRA_TABLE.map((col, i) => (
                  <th key={i} className="p-2 border-r last:border-0 border-[#b59e54] font-bold text-lg text-gray-800">{col.char}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-[#b59e54] hover:bg-blue-50 transition-colors">
                <td className="p-2 border-r border-[#b59e54] text-lg font-bold text-blue-700">उ</td>
                <td className="p-2 border-r border-[#b59e54] text-xl font-bold text-blue-700">ु</td>
                {MATRA_TABLE.map((col, i) => (
                  <td key={i} className="p-2 border-r last:border-0 border-[#b59e54] text-lg hover:bg-blue-200 transition-colors cursor-default rounded m-1">{col.u}</td>
                ))}
              </tr>
              <tr className="bg-[#f9f8f3] hover:bg-red-50 transition-colors">
                <td className="p-2 border-r border-[#b59e54] text-lg font-bold text-red-600">ऊ</td>
                <td className="p-2 border-r border-[#b59e54] text-xl font-bold text-red-600">ू</td>
                {MATRA_TABLE.map((col, i) => (
                  <td key={i} className="p-2 border-r last:border-0 border-[#b59e54] text-lg hover:bg-red-200 transition-colors cursor-default rounded m-1">{col.oo}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section (इ): Read Words */}
      <div className="space-y-4">
        <p className="text-base font-bold text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          (इ) इन्हें पढ़िए।
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex-1 p-6 border-4 border-[#b59e54] rounded-xl bg-[#fdfaf2] shadow-inner text-center">
            {READ_WORDS.map((row, rIdx) => (
              <div key={rIdx} className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-4 last:mb-0">
                {row.map((word, wIdx) => {
                  // highlight u and oo matras
                  const highlightedWord = word.split('').map((char, i) => {
                    if (char === 'ु') return <span key={i} className="text-blue-600 font-bold">{char}</span>;
                    if (char === 'ू') return <span key={i} className="text-red-600 font-bold">{char}</span>;
                    return <span key={i}>{char}</span>;
                  });

                  return (
                    <span 
                      key={wIdx} 
                      className="text-xl sm:text-2xl hover:scale-110 hover:text-green-700 transition-transform cursor-pointer"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      {highlightedWord}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
          
          <div className="text-9xl drop-shadow-xl hover:rotate-12 transition-transform">
            🥔
          </div>
        </div>
      </div>

      {/* Section (ई): Matching Pairs */}
      <div className="space-y-6">
        <p className="text-base font-bold text-gray-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          (ई) समान शब्दों की जोड़ी बनाइए।
        </p>
        
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start justify-center">
          
          <div className="flex items-center gap-16 sm:gap-32 bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-lg relative min-w-[300px] justify-between">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              {MATCHING_LEFT.map(word => {
                const isMatched = Object.keys(matchedPairs).includes(word);
                const isSelected = selectedLeft === word;
                return (
                  <button
                    key={`l-${word}`}
                    onClick={() => handleMatchClick("left", word)}
                    disabled={isMatched}
                    className={`text-lg sm:text-xl font-bold py-2 px-4 rounded-xl transition-all border-2 ${
                      isMatched 
                        ? 'bg-green-100 text-green-800 border-green-300 opacity-70' 
                        : isSelected
                          ? 'bg-blue-100 text-blue-800 border-blue-400 scale-110 shadow-md'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-gray-400 hover:bg-gray-100'
                    }`}
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    {word}
                  </button>
                )
              })}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {MATCHING_RIGHT.map(word => {
                const isMatched = Object.values(matchedPairs).includes(word);
                return (
                  <button
                    key={`r-${word}`}
                    onClick={() => handleMatchClick("right", word)}
                    disabled={isMatched}
                    className={`text-lg sm:text-xl font-bold py-2 px-4 rounded-xl transition-all border-2 ${
                      isMatched 
                        ? 'bg-green-100 text-green-800 border-green-300 opacity-70' 
                        : selectedLeft
                          ? 'bg-blue-50 text-gray-800 border-blue-300 hover:bg-blue-100 hover:border-blue-400 cursor-pointer animate-pulse'
                          : 'bg-gray-50 text-gray-800 border-gray-200 opacity-80 cursor-not-allowed'
                    }`}
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    {word}
                  </button>
                )
              })}
            </div>
            
            {/* Draw SVG lines for matched pairs (simplified approach: just rely on color coding, but we can add SVG if needed) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-[-1]">
               {/* Optional: Add actual lines here based on refs, but color coding is robust and responsive */}
            </svg>
          </div>

          <div className="text-[10rem] font-bold text-gray-100 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-none" style={{ WebkitTextStroke: "4px black" }}>
            4
          </div>
        </div>
      </div>

      {/* Section (लिखो): Write Grid */}
      <div className="space-y-6 pt-8 border-t border-gray-200">
        <div className="flex items-center gap-3 bg-green-200 w-fit px-4 py-2 rounded-full shadow-sm">
          <span className="text-2xl">✍️</span>
          <h2 className="font-heading text-lg font-bold text-green-900" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            लिखो
          </h2>
        </div>

        <p className="text-base font-bold text-gray-800 flex gap-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          <span>(अ)</span>
          <span>मात्रा जोड़िए और लिखिए।</span>
        </p>

        <div className="text-xs text-blue-600 font-bold bg-blue-50 p-2 rounded-lg border border-blue-200 inline-block mb-2">
          💡 खाली डिब्बों पर क्लिक करके सही उत्तर देखें!
        </div>

        <div className="overflow-x-auto rounded-xl border-2 border-[#b59e54] shadow-md bg-white">
          <table className="w-full text-center border-collapse min-w-[600px]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            <thead>
              <tr className="bg-[#f5ebd4] border-b-2 border-[#b59e54]">
                <th className="p-3 border-r border-[#b59e54]"></th>
                {WRITE_GRID_COLS.map((col, i) => (
                  <th key={i} className="p-3 border-r last:border-0 border-[#b59e54] font-bold text-xl text-gray-800 w-12">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WRITE_GRID_ROWS.map((row, rIdx) => (
                <tr key={rIdx} className="bg-white border-b last:border-0 border-[#b59e54]">
                  <td className="p-2 border-r border-[#b59e54] text-2xl font-bold text-red-700 bg-[#f9f8f3]">{row.matra}</td>
                  {WRITE_GRID_COLS.map((col, cIdx) => {
                    const isRevealed = revealedCells[`${cIdx}-${rIdx}`];
                    const answer = col + row.symbol;
                    
                    return (
                      <td 
                        key={cIdx} 
                        className="p-1 border-r last:border-0 border-[#b59e54] h-14"
                      >
                        <button
                          onClick={() => handleRevealCell(cIdx, rIdx)}
                          className={`w-full h-full rounded transition-all flex items-center justify-center text-xl ${
                            isRevealed 
                              ? 'bg-blue-50 text-blue-900 font-medium' 
                              : 'bg-gray-100/50 hover:bg-gray-200 text-transparent cursor-pointer'
                          }`}
                        >
                          {isRevealed ? answer : "?"}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer info matching the book */}
      <div className="flex justify-between items-center text-xs text-foreground/40 pt-12 border-t border-border/30">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          छात्रों की प्रगति हेतु सरकार का उपहार
        </span>
        <span className="font-bold text-foreground/60 bg-green-100 px-3 py-1 rounded text-green-900 border border-green-200">15</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          रेलवे स्टेशन
        </span>
      </div>
    </div>
  );
}
