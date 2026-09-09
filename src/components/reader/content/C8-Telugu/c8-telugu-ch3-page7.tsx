"use client";

import { useState, useEffect } from "react";

export function C8TeluguCh3Page7() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch3-p37-answers");
      if (saved) {
        setAnswers(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAnswerChange = (id: string, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    try {
      localStorage.setItem("c8-telugu-ch3-p37-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Section V Continuation: Question 2 */}
      <div className="space-y-6 pl-4 md:pl-12 text-[#4a4a4a]">
        <div className="flex gap-4 items-start">
          <span className="font-bold text-[#e6007e] pt-1">2.</span>
          <div className="flex-1 space-y-6">
            <p className="font-bold text-[#e6007e]">
              కింది ప్రకృతి వికృతి పదాలను జతపరచండి.
            </p>
            
            <div className="flex justify-center md:justify-start max-w-md">
              <div className="flex gap-12">
                {/* Left Column */}
                <div className="space-y-4">
                  {[
                    { id: "q-v-2-a", num: "అ)", word: "ఆశ్చర్యం" },
                    { id: "q-v-2-b", num: "ఆ)", word: "భక్తి" },
                    { id: "q-v-2-c", num: "ఇ)", word: "దిశ" },
                    { id: "q-v-2-d", num: "ఈ)", word: "పృథ్వి" }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <span className="font-bold w-6">{item.num}</span>
                      <span className="w-20 text-[#1e1b4b]">{item.word}</span>
                      <span className="text-[#e6007e] font-bold text-lg">(</span>
                      <input
                        type="text"
                        className="w-10 border-b border-[#2f2b66] border-dashed bg-transparent p-1 focus:outline-none focus:border-solid text-center uppercase"
                        value={answers[item.id] || ""}
                        onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                        maxLength={1}
                      />
                      <span className="text-[#e6007e] font-bold text-lg">)</span>
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {[
                    { num: "ఎ)", word: "బత్తి" },
                    { num: "బి)", word: "దెస" },
                    { num: "సి)", word: "పుడమి" },
                    { num: "డి)", word: "అచ్చెరువు" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <span className="font-bold w-6">{item.num}</span>
                      <span className="text-[#1e1b4b]">{item.word}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Section VI: భాషను గురించి తెలుసుకుందాం */}
      <div className="space-y-6 pt-4 pl-4 md:pl-12">
        <div className="flex items-center gap-4 border-b-2 border-[#2f2b66] pb-2 max-w-[400px]">
          <div className="bg-[#2f2b66] text-white font-serif font-bold text-xl px-2 py-1">
            VI
          </div>
          <h2 className="bg-[#2f2b66] text-white font-bold text-lg px-4 py-1 flex-1 text-center">
            భాషను గురించి తెలుసుకుందాం
          </h2>
        </div>
        
        <div className="space-y-8 pl-4 md:pl-8 text-[#4a4a4a]">
          
          {/* Question 1: Table */}
          <div className="flex gap-4 items-start">
            <span className="font-bold text-[#e6007e] pt-1">1.</span>
            <div className="flex-1 space-y-6 overflow-x-auto">
              <p className="font-bold text-[#e6007e]">
                కింది పట్టికను పూరించండి.
              </p>
              
              <table className="w-full max-w-2xl border-collapse text-center mt-4">
                <thead>
                  <tr className="bg-[#d1c4e0] border border-[#2f2b66]">
                    <th className="p-3 border border-[#2f2b66] text-[#2f2b66] font-bold w-[30%]">సంధిపదం</th>
                    <th className="p-3 border border-[#2f2b66] text-[#2f2b66] font-bold w-[40%]">విడదీసి రాయండి</th>
                    <th className="p-3 border border-[#2f2b66] text-[#2f2b66] font-bold w-[30%]">సంధిపేరు</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-[#2f2b66] bg-[#f8f5fb]">
                    <td className="p-2 border border-[#2f2b66] font-bold">ఉదా: క్షీరాబ్ధి</td>
                    <td className="p-2 border border-[#2f2b66] font-bold">క్షీర + అబ్ధి</td>
                    <td className="p-2 border border-[#2f2b66] font-bold">సవర్ణదీర్ఘసంధి</td>
                  </tr>
                  {[
                    { id: 1, c1: "1. కనకాచలం", i1: "q-vi-1-r1-c1", c2: "", i2: "q-vi-1-r1-c2", c3: "", i3: "q-vi-1-r1-c3" },
                    { id: 2, c1: "2. క్షీరాబ్ధి", i1: "q-vi-1-r2-c1", c2: "", i2: "q-vi-1-r2-c2", c3: "", i3: "q-vi-1-r2-c3" },
                    { id: 3, c1: "3.", i1: "q-vi-1-r3-c1", c2: "నాకు + ఒక", i2: "q-vi-1-r3-c2", c3: "", i3: "q-vi-1-r3-c3" },
                    { id: 4, c1: "4.", i1: "q-vi-1-r4-c1", c2: "కాదు + ఏని", i2: "q-vi-1-r4-c2", c3: "", i3: "q-vi-1-r4-c3" },
                    { id: 5, c1: "5. అతనికిచ్చెను", i1: "q-vi-1-r5-c1", c2: "", i2: "q-vi-1-r5-c2", c3: "", i3: "q-vi-1-r5-c3" },
                    { id: 6, c1: "6. పుట్టినిల్లు", i1: "q-vi-1-r6-c1", c2: "", i2: "q-vi-1-r6-c2", c3: "", i3: "q-vi-1-r6-c3" },
                    { id: 7, c1: "7.", i1: "q-vi-1-r7-c1", c2: "ఏమిటి + ఇది", i2: "q-vi-1-r7-c2", c3: "", i3: "q-vi-1-r7-c3" },
                    { id: 8, c1: "8. నాయనమ్మ", i1: "q-vi-1-r8-c1", c2: "", i2: "q-vi-1-r8-c2", c3: "", i3: "q-vi-1-r8-c3" }
                  ].map((row) => (
                    <tr key={row.id} className="border border-[#2f2b66] hover:bg-gray-50">
                      <td className="p-2 border border-[#2f2b66]">
                        {row.c1.endsWith(".") ? (
                          <div className="flex items-center gap-2 px-2">
                            <span>{row.c1}</span>
                            <input
                              type="text"
                              className="w-full bg-transparent border-b border-dashed border-[#2f2b66] focus:outline-none text-center"
                              value={answers[row.i1] || ""}
                              onChange={(e) => handleAnswerChange(row.i1, e.target.value)}
                            />
                          </div>
                        ) : (
                          row.c1
                        )}
                      </td>
                      <td className="p-2 border border-[#2f2b66]">
                        {row.c2 ? row.c2 : (
                          <input
                            type="text"
                            className="w-full bg-transparent border-b border-dashed border-[#2f2b66] focus:outline-none text-center"
                            value={answers[row.i2] || ""}
                            onChange={(e) => handleAnswerChange(row.i2, e.target.value)}
                          />
                        )}
                      </td>
                      <td className="p-2 border border-[#2f2b66]">
                        <input
                          type="text"
                          className="w-full bg-transparent border-b border-dashed border-[#2f2b66] focus:outline-none text-center"
                          value={answers[row.i3] || ""}
                          onChange={(e) => handleAnswerChange(row.i3, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sub-section: గుణసంధి */}
          <div className="pt-6">
            <div className="flex justify-center">
              <div className="border border-[#2f2b66] rounded-full px-8 py-1.5 shadow-sm">
                <h3 className="text-[#2f2b66] font-bold text-lg">గుణసంధి</h3>
              </div>
            </div>

            <div className="flex gap-4 items-start pt-8">
              <span className="font-bold text-[#e6007e] pt-1">2.</span>
              <div className="flex-1 space-y-6">
                <p className="font-bold text-[#e6007e]">
                  కింది పదాలను విడదీయండి.
                </p>

                <div className="space-y-4 pl-0 md:pl-4 max-w-xl">
                  
                  {/* Item 1 */}
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
                    <div className="flex gap-2 w-[140px] font-bold">ఉదా: రాజేంద్రుడు</div>
                    <div className="font-bold w-4 text-center">=</div>
                    <div className="flex-1 font-bold">రాజ + ఇంద్రుడు</div>
                    <div className="font-bold text-sm text-[#4a4a4a] whitespace-nowrap">( అ + ఇ = ఏ )</div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
                    <div className="flex gap-2 w-[140px] font-bold">అ) గజేంద్రుడు</div>
                    <div className="font-bold w-4 text-center">=</div>
                    <div className="flex-1 flex items-center gap-2">
                      <input type="text" className="w-16 border-b border-dashed border-[#2f2b66] bg-transparent text-center focus:outline-none" value={answers["q-vi-2-a1"] || ""} onChange={(e) => handleAnswerChange("q-vi-2-a1", e.target.value)} />
                      <span>+</span>
                      <input type="text" className="flex-1 border-b border-dashed border-[#2f2b66] bg-transparent text-center focus:outline-none" value={answers["q-vi-2-a2"] || ""} onChange={(e) => handleAnswerChange("q-vi-2-a2", e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span>(</span>
                      <input type="text" className="w-16 border-b border-dashed border-[#2f2b66] bg-transparent text-center focus:outline-none" value={answers["q-vi-2-a3"] || ""} onChange={(e) => handleAnswerChange("q-vi-2-a3", e.target.value)} />
                      <span>)</span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center pt-4">
                    <div className="flex gap-2 w-[140px] font-bold">ఉదా: పరమేశ్వరుడు</div>
                    <div className="font-bold w-4 text-center">=</div>
                    <div className="flex-1 font-bold">పరమ + ఈశ్వరుడు</div>
                    <div className="font-bold text-sm text-[#4a4a4a] whitespace-nowrap">( అ + ఈ = ఏ )</div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
                    <div className="flex gap-2 w-[140px] font-bold">ఆ) సర్వేశ్వరుడు</div>
                    <div className="font-bold w-4 text-center">=</div>
                    <div className="flex-1 flex items-center gap-2">
                      <input type="text" className="w-16 border-b border-dashed border-[#2f2b66] bg-transparent text-center focus:outline-none" value={answers["q-vi-2-b1"] || ""} onChange={(e) => handleAnswerChange("q-vi-2-b1", e.target.value)} />
                      <span>+</span>
                      <input type="text" className="flex-1 border-b border-dashed border-[#2f2b66] bg-transparent text-center focus:outline-none" value={answers["q-vi-2-b2"] || ""} onChange={(e) => handleAnswerChange("q-vi-2-b2", e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span>(</span>
                      <input type="text" className="w-16 border-b border-dashed border-[#2f2b66] bg-transparent text-center focus:outline-none" value={answers["q-vi-2-b3"] || ""} onChange={(e) => handleAnswerChange("q-vi-2-b3", e.target.value)} />
                      <span>)</span>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center pt-4">
                    <div className="flex gap-2 w-[140px] font-bold">ఉదా: వసంతోత్సవం</div>
                    <div className="font-bold w-4 text-center">=</div>
                    <div className="flex-1 font-bold">వసంత + ఉత్సవం</div>
                    <div className="font-bold text-sm text-[#4a4a4a] whitespace-nowrap">( అ + ఉ = ఓ )</div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
                    <div className="flex gap-2 w-[140px] font-bold">ఇ) గంగోదకం</div>
                    <div className="font-bold w-4 text-center">=</div>
                    <div className="flex-1 flex items-center gap-2">
                      <input type="text" className="w-16 border-b border-dashed border-[#2f2b66] bg-transparent text-center focus:outline-none" value={answers["q-vi-2-c1"] || ""} onChange={(e) => handleAnswerChange("q-vi-2-c1", e.target.value)} />
                      <span>+</span>
                      <input type="text" className="flex-1 border-b border-dashed border-[#2f2b66] bg-transparent text-center focus:outline-none" value={answers["q-vi-2-c2"] || ""} onChange={(e) => handleAnswerChange("q-vi-2-c2", e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span>(</span>
                      <input type="text" className="w-16 border-b border-dashed border-[#2f2b66] bg-transparent text-center focus:outline-none" value={answers["q-vi-2-c3"] || ""} onChange={(e) => handleAnswerChange("q-vi-2-c3", e.target.value)} />
                      <span>)</span>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center pt-4">
                    <div className="flex gap-2 w-[140px] font-bold">ఉదా: దేవర్షి</div>
                    <div className="font-bold w-4 text-center">=</div>
                    <div className="flex-1 font-bold">దేవ + ఋషి</div>
                    <div className="font-bold text-sm text-[#4a4a4a] whitespace-nowrap">( అ + ఋ = అర్ )</div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
                    <div className="flex gap-2 w-[140px] font-bold">ఈ) మహర్షి</div>
                    <div className="font-bold w-4 text-center">=</div>
                    <div className="flex-1 flex items-center gap-2">
                      <input type="text" className="w-16 border-b border-dashed border-[#2f2b66] bg-transparent text-center focus:outline-none" value={answers["q-vi-2-d1"] || ""} onChange={(e) => handleAnswerChange("q-vi-2-d1", e.target.value)} />
                      <span>+</span>
                      <input type="text" className="flex-1 border-b border-dashed border-[#2f2b66] bg-transparent text-center focus:outline-none" value={answers["q-vi-2-d2"] || ""} onChange={(e) => handleAnswerChange("q-vi-2-d2", e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span>(</span>
                      <input type="text" className="w-16 border-b border-dashed border-[#2f2b66] bg-transparent text-center focus:outline-none" value={answers["q-vi-2-d3"] || ""} onChange={(e) => handleAnswerChange("q-vi-2-d3", e.target.value)} />
                      <span>)</span>
                    </div>
                  </div>

                </div>

                <div className="text-[#4a4a4a] pt-4 indent-12 text-justify pr-4">
                  పై పదాలను గమనించండి. వాటిని మూడు రకాలుగా విడదీయటం జరిగింది.
                  మూడు సందర్భాల్లోను పూర్వస్వరం 'అకారం' ఉన్నది. పరస్వరం స్థానంలో ఇ, ఈ, ఉ, ఋ లు ఉన్నాయి.
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-12 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          28
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
