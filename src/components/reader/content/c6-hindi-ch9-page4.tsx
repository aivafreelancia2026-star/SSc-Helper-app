"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export function C6HindiCh9Page4() {
  const assessmentQuestions = [
    "मैं अभिनय के साथ बाल गीत गा सकता/सकती हूँ।",
    "मैं ‘अल्पप्राण-महाप्राण’ वर्णों से बने शब्द पढ़ और लिख सकता/सकती हूँ।",
    "मैं इन वर्णों से बने शब्द व वाक्य बिना देखे लिख सकता/सकती हूँ।",
    "मैं संकेत के आधार पर चित्र बनाकर उसके बारे में बता सकता/सकती हूँ।"
  ];
  const [assessment, setAssessment] = useState<Record<number, boolean | null>>({});

  const handleAssessment = (idx: number, value: boolean) => {
    setAssessment(prev => ({ ...prev, [idx]: value }));
  };

  // Drawing Canvas Logic for (ई)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineWidth = 4;
        // Fill canvas with white initially
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath(); // Reset path
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.strokeStyle = currentColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
      }
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">

      <div className="p-8 pb-4">

        {/* लिखो Section Header */}
        <div className="flex items-center gap-4 bg-[#e8efd8] w-fit pr-8 rounded-full shadow-sm mb-8">
          <div className="bg-white rounded-full p-2 border-2 border-[#e8efd8]">
            <span className="text-3xl">✍️</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>लिखो</h2>
        </div>

        {/* (अ) अंकों की बात */}
        <div className="mb-12">
          <p className="font-bold text-slate-800 text-xl mb-6">(अ) अंकों की बात</p>

          <div className="flex flex-col md:flex-row items-center gap-8 pl-4">
            {/* Box with Rhyme */}
            <div className="border border-[#b5a371] p-6 rounded-xl bg-[#faf9f5] shadow-sm shrink-0 min-w-[280px]">
              <div className="space-y-2 text-xl text-slate-800 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                <p>एक दो तीन चार</p>
                <p>अच्छा करना तुम व्यवहार</p>
                <p>पाँच छह सात आठ</p>
                <p>पाओगे तुम सबका प्यार</p>
                <p>नौ के बाद दस है</p>
                <p>अब गिनती बस है</p>
              </div>
            </div>

            {/* Train CSS container - Fixed 2 Rows, Miniaturized for Mobile */}
            <div className="relative w-full max-w-[600px] rounded-xl shadow-sm border border-slate-200 bg-[#e0f7fa] flex flex-col items-center justify-center py-8 px-1 md:px-2 overflow-hidden">
              
              <div className="w-full flex flex-col items-center gap-8 md:gap-10">
                
                {/* Row 1: Engine + 1 to 5 */}
                <div className="flex items-end gap-0.5 md:gap-1 w-full justify-center relative">
                  {/* Train Engine */}
                  <div className="relative flex flex-col items-end shrink-0 z-20 mr-0.5 md:mr-1">
                    <div className="w-5 md:w-8 h-6 md:h-10 bg-red-600 rounded-t-lg relative border border-slate-800 flex items-center justify-center z-10">
                      <div className="w-2 md:w-3 h-2 md:h-3 bg-white rounded-full border border-slate-800"></div>
                    </div>
                    <div className="w-10 md:w-16 h-6 md:h-10 bg-blue-600 rounded-tr-xl border border-slate-800 relative z-10">
                      <div className="absolute top-0.5 md:top-1 right-0.5 md:right-1 w-2 md:w-3 h-2 md:h-3 bg-yellow-400 rounded-full border border-slate-800"></div>
                      <div className="absolute -left-1 md:-left-2 bottom-0.5 md:bottom-1 w-3 md:w-4 h-2 md:h-3 bg-slate-800 rounded-l-full"></div>
                    </div>
                    {/* Wheels */}
                    <div className="flex gap-0.5 absolute -bottom-1.5 md:-bottom-2 left-0.5 md:left-1 z-20">
                      <div className="w-3 md:w-5 h-3 md:h-5 rounded-full bg-slate-800 border border-slate-300 flex items-center justify-center animate-[spin_4s_linear_infinite]"><div className="w-0.5 md:w-1 h-0.5 md:h-1 bg-slate-300 rounded-full"></div></div>
                      <div className="w-3 md:w-5 h-3 md:h-5 rounded-full bg-slate-800 border border-slate-300 flex items-center justify-center animate-[spin_4s_linear_infinite]"><div className="w-0.5 md:w-1 h-0.5 md:h-1 bg-slate-300 rounded-full"></div></div>
                      <div className="w-3 md:w-5 h-3 md:h-5 rounded-full bg-slate-800 border border-slate-300 flex items-center justify-center animate-[spin_4s_linear_infinite]"><div className="w-0.5 md:w-1 h-0.5 md:h-1 bg-slate-300 rounded-full"></div></div>
                    </div>
                    <div className="absolute -top-2 md:-top-3 left-0.5 md:left-1 w-2 md:w-3 h-3 md:h-4 bg-slate-800 rounded-t-sm z-0"></div>
                    <div className="absolute -top-6 md:-top-8 left-0 text-sm md:text-lg opacity-60 animate-bounce">💨</div>
                  </div>

                  {/* Wagons 1 to 5 */}
                  {['१', '२', '३', '४', '५'].map((num, i) => {
                    const colors = ['bg-yellow-400', 'bg-green-400', 'bg-pink-400', 'bg-purple-400', 'bg-orange-400'];
                    return (
                      <div key={i} className="flex items-end shrink-0 z-20">
                        <div className="w-1 md:w-2 h-0.5 md:h-1 bg-slate-800 mb-1.5 md:mb-2 z-0"></div>
                        <div className="relative">
                          <div className="absolute -top-4 md:-top-5 w-full text-center text-[10px] md:text-sm font-bold text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{num}</div>
                          <div className={`w-6 h-5 md:w-10 md:h-8 ${colors[i]} rounded border border-slate-800 flex items-center justify-center shadow-inner relative z-10`}>
                             <span className="text-[10px] md:text-sm font-bold text-slate-800">{i + 1}</span>
                          </div>
                          {/* Wheels */}
                          <div className="flex gap-0.5 md:gap-1 absolute -bottom-1.5 md:-bottom-2 left-0.5 z-20">
                            <div className="w-2 md:w-4 h-2 md:h-4 rounded-full bg-slate-800 border border-slate-300 flex items-center justify-center animate-[spin_4s_linear_infinite]"><div className="w-0.5 h-0.5 bg-slate-300 rounded-full"></div></div>
                            <div className="w-2 md:w-4 h-2 md:h-4 rounded-full bg-slate-800 border border-slate-300 flex items-center justify-center animate-[spin_4s_linear_infinite]"><div className="w-0.5 h-0.5 bg-slate-300 rounded-full"></div></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* Track Row 1 */}
                  <div className="absolute -bottom-0.5 left-[-10%] w-[120%] h-0.5 md:h-1 bg-slate-600 border-t border-slate-400 z-10 border-dashed"></div>
                </div>

                {/* Row 2: 6 to 10 */}
                <div className="flex items-end gap-0.5 md:gap-1 w-full justify-center relative mt-2 md:mt-4">
                  {/* Visual Connector at front */}
                  <div className="flex items-end shrink-0 z-20 mb-1.5 md:mb-2 mr-0.5 md:mr-1">
                     <div className="w-4 md:w-6 border-b border-dotted border-slate-600"></div>
                  </div>

                  {/* Wagons 6 to 10 */}
                  {['६', '७', '८', '९', '१०'].map((num, i) => {
                    const colors = ['bg-teal-400', 'bg-indigo-400', 'bg-rose-400', 'bg-lime-400', 'bg-cyan-400'];
                    return (
                      <div key={i} className="flex items-end shrink-0 z-20">
                        <div className="w-1 md:w-2 h-0.5 md:h-1 bg-slate-800 mb-1.5 md:mb-2 z-0"></div>
                        <div className="relative">
                          <div className="absolute -top-4 md:-top-5 w-full text-center text-[10px] md:text-sm font-bold text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{num}</div>
                          <div className={`w-6 h-5 md:w-10 md:h-8 ${colors[i]} rounded border border-slate-800 flex items-center justify-center shadow-inner relative z-10`}>
                             <span className="text-[10px] md:text-sm font-bold text-slate-800">{i + 6}</span>
                          </div>
                          {/* Wheels */}
                          <div className="flex gap-0.5 md:gap-1 absolute -bottom-1.5 md:-bottom-2 left-0.5 z-20">
                            <div className="w-2 md:w-4 h-2 md:h-4 rounded-full bg-slate-800 border border-slate-300 flex items-center justify-center animate-[spin_4s_linear_infinite]"><div className="w-0.5 h-0.5 bg-slate-300 rounded-full"></div></div>
                            <div className="w-2 md:w-4 h-2 md:h-4 rounded-full bg-slate-800 border border-slate-300 flex items-center justify-center animate-[spin_4s_linear_infinite]"><div className="w-0.5 h-0.5 bg-slate-300 rounded-full"></div></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* Track Row 2 */}
                  <div className="absolute -bottom-0.5 left-[-10%] w-[120%] h-0.5 md:h-1 bg-slate-600 border-t border-slate-400 z-10 border-dashed"></div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (आ) & (इ) Questions */}
        <div className="mb-12 pl-4 flex flex-col md:flex-row gap-8 justify-between">

          {/* Question 1 */}
          <div className="flex-1">
            <p className="font-bold text-slate-800 text-xl mb-4">(आ) इस कविता में आपकी <br /> मनपसंद पंक्तियाँ कौनसी हैं?</p>
            <div className="space-y-6 pt-2">
              <input type="text" className="w-full border-b-2 border-slate-400 border-dotted text-xl pb-1 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
              <input type="text" className="w-full border-b-2 border-slate-400 border-dotted text-xl pb-1 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
              <input type="text" className="w-full border-b-2 border-slate-400 border-dotted text-xl pb-1 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
              <input type="text" className="w-full border-b-2 border-slate-400 border-dotted text-xl pb-1 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
            </div>
          </div>

          {/* Question 2 */}
          <div className="flex-1">
            <p className="font-bold text-slate-800 text-xl mb-4 md:mt-0 mt-8">(इ) घड़ी हमें क्या सिखाती है?</p>
            <div className="space-y-6 pt-2 md:pt-10">
              <input type="text" className="w-full border-b-2 border-slate-400 border-dotted text-xl pb-1 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
              <input type="text" className="w-full border-b-2 border-slate-400 border-dotted text-xl pb-1 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
              <input type="text" className="w-full border-b-2 border-slate-400 border-dotted text-xl pb-1 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
              <input type="text" className="w-full border-b-2 border-slate-400 border-dotted text-xl pb-1 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
            </div>
          </div>
        </div>

        {/* (ई) Interactive Drawing Box */}
        <div className="mb-12 pl-4">
          <p className="font-bold text-slate-800 text-xl mb-4">
            (ई) आपको कौन सा पशु या पक्षी पसंद है? उसका चित्र बनाइए।
          </p>

          <div className="bg-[#f8fafc] border-2 border-slate-300 rounded-xl p-4 shadow-inner">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between mb-4 gap-4 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-600">रंग चुनें (Color):</span>
                {['#000000', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'].map(color => (
                  <button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${currentColor === color ? 'border-slate-800 scale-110' : 'border-transparent shadow-sm'}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
              <button
                onClick={clearCanvas}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg transition-colors"
              >
                मिटाएँ (Clear)
              </button>
            </div>

            {/* Canvas */}
            <div className="w-full flex justify-center bg-white border-2 border-slate-300 rounded-lg overflow-hidden cursor-crosshair">
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="w-full max-w-[800px] h-auto touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <span className="text-xl font-bold text-slate-800">नाम:</span>
              <input type="text" className="w-64 border-b-2 border-slate-400 border-dotted text-center text-xl pb-1 outline-none focus:border-blue-500 bg-transparent text-blue-800" />
            </div>
          </div>
        </div>

      </div>

      {/* Self Assessment Section */}
      <div className="p-8 pt-0">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-2xl border-2 border-amber-400 shadow-sm flex items-center justify-center shrink-0">
            <span className="text-5xl">👦</span>
          </div>

          <div className="w-full overflow-x-auto shadow-md rounded-xl border border-slate-200">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-2 border-[#a5af33] bg-[#f8f9e9] py-3 px-4 text-left text-xl text-[#6b7316]">
                    क्या मैं ये कर सकता/सकती हूँ?
                  </th>
                  <th className="border-2 border-[#a5af33] bg-[#f8f9e9] py-3 w-24 text-center text-xl text-pink-600 font-bold">
                    हाँ (✓)
                  </th>
                  <th className="border-2 border-[#a5af33] bg-[#f8f9e9] py-3 w-24 text-center text-xl text-pink-600 font-bold">
                    नहीं (✗)
                  </th>
                </tr>
              </thead>
              <tbody>
                {assessmentQuestions.map((q, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="border-2 border-[#a5af33] py-4 px-4 text-lg font-medium text-slate-800">
                      <span className="font-bold mr-2">{idx + 1}.</span> {q}
                    </td>
                    <td className="border-2 border-[#a5af33] py-4 text-center cursor-pointer hover:bg-green-50"
                      onClick={() => handleAssessment(idx, true)}>
                      {assessment[idx] === true ? (
                        <span className="text-3xl text-green-600 font-bold">✓</span>
                      ) : (
                        <div className="w-6 h-6 mx-auto rounded-full border-2 border-slate-300"></div>
                      )}
                    </td>
                    <td className="border-2 border-[#a5af33] py-4 text-center cursor-pointer hover:bg-red-50"
                      onClick={() => handleAssessment(idx, false)}>
                      {assessment[idx] === false ? (
                        <span className="text-3xl text-red-600 font-bold">✗</span>
                      ) : (
                        <div className="w-6 h-6 mx-auto rounded-full border-2 border-slate-300"></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex items-center justify-between px-8 pt-8 text-sm text-slate-500 font-medium mt-auto border-t border-slate-200">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">47</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>खुशियों की दुनिया</span>
      </div>
    </div>
  );
}
