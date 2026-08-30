"use client";

import { useState } from "react";
import Image from "next/image";

// Helper component for interactive letter circling
function InteractiveSentence({ sentence }: { sentence: string }) {
  const [circledIndices, setCircledIndices] = useState<Set<number>>(new Set());
  const [wrongIndices, setWrongIndices] = useState<Set<number>>(new Set());

  const handleLetterClick = (char: string, index: number) => {
    // Target is 'ऋ' or the matra 'ृ'
    if (char === "ऋ" || char === "ृ") {
      setCircledIndices((prev) => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });
    } else {
      setWrongIndices((prev) => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });
      setTimeout(() => {
        setWrongIndices((prev) => {
          const next = new Set(prev);
          next.delete(index);
          return next;
        });
      }, 500);
    }
  };

  return (
    <div className="flex flex-wrap gap-1 text-2xl mb-4">
      {sentence.split("").map((char, i) => (
        <span
          key={i}
          onClick={() => char !== " " && handleLetterClick(char, i)}
          className={`cursor-pointer select-none transition-all duration-200
            ${char === " " ? "w-2" : "px-1 rounded"}
            ${
              circledIndices.has(i)
                ? "border-2 border-blue-500 rounded-full text-blue-700 bg-blue-50"
                : wrongIndices.has(i)
                ? "text-red-500 animate-shake"
                : "hover:bg-slate-100"
            }
          `}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

// Helper component for interactive table cells
function InteractiveCell({ char, isTarget }: { char: string; isTarget: boolean }) {
  const [isCircled, setIsCircled] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const handleClick = () => {
    if (!char || char === " ") return;
    
    if (isTarget || char === "ऋ" || char === "ृ") {
      setIsCircled(true);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-2 w-10 h-10 flex items-center justify-center border-r border-slate-300 last:border-r-0 cursor-pointer select-none transition-all
        ${isCircled ? "ring-2 ring-blue-500 ring-inset rounded-full bg-blue-50 text-blue-700 font-bold" : ""}
        ${isWrong ? "text-red-500 animate-shake" : ""}
        ${!isCircled && !isWrong && char !== " " ? "hover:bg-slate-100" : ""}
      `}
    >
      {char}
    </div>
  );
}

export function C6HindiCh4Page3() {
  return (
    <div className="flex flex-col items-center w-full max-w-[800px] mx-auto bg-white min-h-screen relative p-8">
      
      {/* 1. सुनो-बोलो (Listen-Speak) */}
      <div className="w-full mb-8">
        <div className="flex items-center gap-4 bg-green-100 p-3 rounded-lg w-48 mb-4 shadow-sm border border-green-200">
          <div className="text-3xl">🗣️</div>
          <h2 className="text-xl font-bold text-green-800">सुनो-बोलो</h2>
        </div>
        <ol className="list-decimal pl-6 space-y-3 text-lg text-slate-800 font-medium">
          <li>बाज़ार में क्या-क्या मिलते हैं?</li>
          <li>बाज़ार से क्या लाभ है?</li>
        </ol>
      </div>

      {/* 2. पढ़ो (Read) */}
      <div className="w-full mb-8">
        <div className="flex items-center gap-4 bg-green-100 p-3 rounded-lg w-32 mb-6 shadow-sm border border-green-200">
          <div className="text-3xl">📖</div>
          <h2 className="text-xl font-bold text-green-800">पढ़ो</h2>
        </div>

        {/* Section (अ) */}
        <div className="mb-8">
          <p className="text-lg font-medium text-slate-800 mb-6">(अ) चित्र देखिए। शब्द पढ़िए।</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { name: "बस", emoji: "🚌", file: "bus.png" },
              { name: "बाघ", emoji: "🐅", file: "tiger.png" },
              { name: "ऋषभ", emoji: "🐂", file: "bull.png" },
              { name: "फल", emoji: "🍎", file: "fruit.png" },
              { name: "कृषक", emoji: "👨‍🌾", file: "farmer.png" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-24 h-24 flex items-center justify-center bg-slate-50 border-2 border-slate-200 rounded-xl mb-3 text-5xl shadow-sm">
                  {item.emoji}
                </div>
                <span className="text-xl font-medium text-slate-800">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section (आ) */}
        <div className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
          <p className="text-lg font-medium text-slate-800 mb-4">
            (आ) चित्र के आधार पर वाक्य पढ़िए। ऋ अक्षर पर &apos;<span className="text-blue-600 font-bold border-2 border-blue-500 rounded-full px-1">O</span>&apos; लगाइए।
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="text-5xl">🧘</div>
              <InteractiveSentence sentence="यह ऋषि है।" />
            </div>
            <div className="flex items-center gap-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="text-5xl">👨‍🌾🐂</div>
              <InteractiveSentence sentence="किसान के पास ऋषभ हैं।" />
            </div>
            <div className="flex items-center gap-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="text-5xl">🐅</div>
              <InteractiveSentence sentence="यह बाघ है।" />
            </div>
          </div>
        </div>

        {/* Section (इ) */}
        <div className="mb-8">
          <p className="text-lg font-medium text-slate-800 mb-4">
            (इ) चित्र देखिए। शब्द पढ़िए। इनके वर्ण वर्णमाला चार्ट में पहचानकर &apos;<span className="text-blue-600 font-bold border-2 border-blue-500 rounded-full px-1">O</span>&apos; लगाइए।
          </p>
          
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-300">
            <table className="w-full text-center text-xl border-collapse">
              <thead>
                <tr className="bg-yellow-50 border-b border-slate-300">
                  <th className="p-3 border-r border-slate-300 w-1/5 font-medium">ऋषभ</th>
                  <th className="p-3 border-r border-slate-300 w-1/5 font-medium">बालक</th>
                  <th className="p-3 border-r border-slate-300 w-1/5 font-medium">फल</th>
                  <th className="p-3 border-r border-slate-300 w-1/5 font-medium">जल</th>
                  <th className="p-3 w-1/5 font-medium">कृषक</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-0 border-r border-slate-300">
                    <div className="flex justify-between">
                      <InteractiveCell char="ऋ" isTarget={true} />
                      <InteractiveCell char="ष" isTarget={false} />
                      <InteractiveCell char="भ" isTarget={false} />
                    </div>
                  </td>
                  <td className="p-0 border-r border-slate-300">
                    <div className="flex justify-between">
                      <InteractiveCell char="बा" isTarget={false} />
                      <InteractiveCell char="ल" isTarget={false} />
                      <InteractiveCell char="क" isTarget={false} />
                    </div>
                  </td>
                  <td className="p-0 border-r border-slate-300">
                    <div className="flex justify-between">
                      <InteractiveCell char="फ" isTarget={false} />
                      <InteractiveCell char="ल" isTarget={false} />
                      <div className="w-10"></div>
                    </div>
                  </td>
                  <td className="p-0 border-r border-slate-300">
                    <div className="flex justify-between">
                      <InteractiveCell char="ज" isTarget={false} />
                      <InteractiveCell char="ल" isTarget={false} />
                      <div className="w-10"></div>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="flex justify-between">
                      <InteractiveCell char="कृ" isTarget={true} />
                      <InteractiveCell char="ष" isTarget={false} />
                      <InteractiveCell char="क" isTarget={false} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-0 border-r border-slate-300">
                    <div className="flex justify-between">
                      <InteractiveCell char="ऋ" isTarget={true} />
                      <InteractiveCell char="ष" isTarget={false} />
                      <InteractiveCell char="भ" isTarget={false} />
                    </div>
                  </td>
                  <td className="p-0 border-r border-slate-300">
                    <div className="flex justify-between">
                      <InteractiveCell char="ब" isTarget={false} />
                      <InteractiveCell char="ा" isTarget={false} />
                      <InteractiveCell char="ल" isTarget={false} />
                      <InteractiveCell char="क" isTarget={false} />
                    </div>
                  </td>
                  <td className="p-0 border-r border-slate-300">
                    <div className="flex justify-between">
                      <InteractiveCell char="फ" isTarget={false} />
                      <InteractiveCell char="ल" isTarget={false} />
                      <div className="w-10"></div>
                    </div>
                  </td>
                  <td className="p-0 border-r border-slate-300">
                    <div className="flex justify-between">
                      <InteractiveCell char="ज" isTarget={false} />
                      <InteractiveCell char="ल" isTarget={false} />
                      <div className="w-10"></div>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="flex justify-between">
                      <InteractiveCell char="क" isTarget={false} />
                      <InteractiveCell char="ृ" isTarget={true} />
                      <InteractiveCell char="ष" isTarget={false} />
                      <InteractiveCell char="क" isTarget={false} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Bottom Images for Section इ */}
          <div className="flex justify-around items-center mt-8 px-4">
             <div className="text-5xl">🐂</div>
             <div className="text-5xl">👦</div>
             <div className="text-5xl">🍎</div>
             <div className="text-5xl">💧</div>
             <div className="text-5xl">👨‍🌾🐂</div>
          </div>
        </div>
      </div>

      {/* Footer from the image */}
      <div className="w-full flex items-center justify-between pt-4 pb-2 text-sm text-slate-700 border-t-2 border-slate-200 mt-auto">
        <span>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-green-100 px-3 py-1 rounded">20</span>
        <span>बाज़ार</span>
      </div>
    </div>
  );
}
