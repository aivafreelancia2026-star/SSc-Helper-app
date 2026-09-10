"use client";

import React, { useState, useEffect } from "react";

export function C8TeluguCh4Page11() {
  // Q2 state
  const [q2Prakruti, setQ2Prakruti] = useState<Record<string, string>>({});
  const [q2Vikruti, setQ2Vikruti] = useState<Record<string, string>>({});

  // Q3 state
  const [q3Synonyms, setQ3Synonyms] = useState<Record<string, string[]>>({
    a: ["", "", ""],
    b: ["", "", ""],
    c: ["", "", ""]
  });

  // Section VI Q1 state
  const [grammarTable, setGrammarTable] = useState<Array<[string, string]>>([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""]
  ]);

  // Section VI Q2 state
  const [q6_2, setQ6_2] = useState("");

  useEffect(() => {
    const savedQ2P = localStorage.getItem("c8-telugu-ch4-p11-q2p");
    if (savedQ2P) setQ2Prakruti(JSON.parse(savedQ2P));

    const savedQ2V = localStorage.getItem("c8-telugu-ch4-p11-q2v");
    if (savedQ2V) setQ2Vikruti(JSON.parse(savedQ2V));

    const savedQ3 = localStorage.getItem("c8-telugu-ch4-p11-q3");
    if (savedQ3) setQ3Synonyms(JSON.parse(savedQ3));

    const savedGrammar = localStorage.getItem("c8-telugu-ch4-p11-grammar");
    if (savedGrammar) setGrammarTable(JSON.parse(savedGrammar));

    const savedQ6_2 = localStorage.getItem("c8-telugu-ch4-p11-q6_2");
    if (savedQ6_2) setQ6_2(savedQ6_2);
  }, []);

  const handleQ2PChange = (id: string, value: string) => {
    const newData = { ...q2Prakruti, [id]: value };
    setQ2Prakruti(newData);
    localStorage.setItem("c8-telugu-ch4-p11-q2p", JSON.stringify(newData));
  };

  const handleQ2VChange = (id: string, value: string) => {
    const newData = { ...q2Vikruti, [id]: value };
    setQ2Vikruti(newData);
    localStorage.setItem("c8-telugu-ch4-p11-q2v", JSON.stringify(newData));
  };

  const handleQ3Change = (rowId: string, colIdx: number, value: string) => {
    const newData = { ...q3Synonyms };
    newData[rowId][colIdx] = value;
    setQ3Synonyms(newData);
    localStorage.setItem("c8-telugu-ch4-p11-q3", JSON.stringify(newData));
  };

  const handleGrammarChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...grammarTable];
    newData[rowIndex][colIndex] = value;
    setGrammarTable(newData);
    localStorage.setItem("c8-telugu-ch4-p11-grammar", JSON.stringify(newData));
  };

  const handleQ6_2Change = (value: string) => {
    setQ6_2(value);
    localStorage.setItem("c8-telugu-ch4-p11-q6_2", value);
  };

  const gridLetters = [
    ["గౌ", "త్తి", "ఆ", "హా", "రం"],
    ["ర", "రి", "బ", "ర", "పం"],
    ["వం", "తి", "ద్య", "ర", "రం"],
    ["త్రి", "రా", "గా", "వి", "గి"],
    ["భ", "క్తి", "ద్దె", "మ", "ఓ"]
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Q2 Section */}
      <div className="space-y-4 pl-4 md:pl-8">
        <p className="text-[#e6007e] font-bold">2. కింది పట్టికలోని ప్రకృతి, వికృతి పదాలను గుర్తించి వేరుచేసి రాయండి.</p>
        
        <div className="flex flex-col md:flex-row gap-8 items-start pt-2 pl-4">
          {/* Letter Grid */}
          <div className="border border-[#6b5b95] rounded-md overflow-hidden bg-blue-50/30">
            {gridLetters.map((row, rIdx) => (
              <div key={rIdx} className="flex">
                {row.map((letter, cIdx) => (
                  <div key={cIdx} className="w-12 h-12 flex items-center justify-center border border-[#6b5b95]/50 text-lg">
                    {letter}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Prakruti Vikruti Form */}
          <div className="flex-1 max-w-sm">
            <div className="grid grid-cols-[auto_1fr_1fr] gap-x-4 gap-y-4 items-center">
              <div className="text-center font-bold"></div>
              <div className="text-center font-bold">ప్రకృతి</div>
              <div className="text-center font-bold">వికృతి</div>

              <div>ఉదా:</div>
              <div>విద్య</div>
              <div>విద్దె</div>

              <div>అ)</div>
              <div className="border-b-2 border-black/50">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 text-center" value={q2Prakruti["a"] || ""} onChange={(e) => handleQ2PChange("a", e.target.value)} />
              </div>
              <div className="border-b-2 border-black/50">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 text-center" value={q2Vikruti["a"] || ""} onChange={(e) => handleQ2VChange("a", e.target.value)} />
              </div>

              <div>ఆ)</div>
              <div className="border-b-2 border-black/50">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 text-center" value={q2Prakruti["b"] || ""} onChange={(e) => handleQ2PChange("b", e.target.value)} />
              </div>
              <div className="border-b-2 border-black/50">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 text-center" value={q2Vikruti["b"] || ""} onChange={(e) => handleQ2VChange("b", e.target.value)} />
              </div>

              <div>ఇ)</div>
              <div className="border-b-2 border-black/50">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 text-center" value={q2Prakruti["c"] || ""} onChange={(e) => handleQ2PChange("c", e.target.value)} />
              </div>
              <div className="border-b-2 border-black/50">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 text-center" value={q2Vikruti["c"] || ""} onChange={(e) => handleQ2VChange("c", e.target.value)} />
              </div>

              <div>ఈ)</div>
              <div className="border-b-2 border-black/50">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 text-center" value={q2Prakruti["d"] || ""} onChange={(e) => handleQ2PChange("d", e.target.value)} />
              </div>
              <div className="border-b-2 border-black/50">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 text-center" value={q2Vikruti["d"] || ""} onChange={(e) => handleQ2VChange("d", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Q3 Section */}
      <div className="space-y-4 pl-4 md:pl-8 pt-4">
        <p className="text-[#e6007e] font-bold">3. కింది వాటికి పర్యాయపదాలు రాయండి.</p>
        
        <div className="space-y-6 pl-8 pt-2 max-w-2xl">
          <div className="flex items-center gap-4">
            <span className="w-20">అ) చెట్టు</span>
            <span>:</span>
            <input type="text" className="flex-1 border-b-2 border-black/50 bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q3Synonyms["a"][0]} onChange={(e) => handleQ3Change("a", 0, e.target.value)} />
            <input type="text" className="flex-1 border-b-2 border-black/50 bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q3Synonyms["a"][1]} onChange={(e) => handleQ3Change("a", 1, e.target.value)} />
            <input type="text" className="flex-1 border-b-2 border-black/50 bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q3Synonyms["a"][2]} onChange={(e) => handleQ3Change("a", 2, e.target.value)} />
          </div>
          
          <div className="flex items-center gap-4">
            <span className="w-20">ఆ. పాదము</span>
            <span>:</span>
            <input type="text" className="flex-1 border-b-2 border-black/50 bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q3Synonyms["b"][0]} onChange={(e) => handleQ3Change("b", 0, e.target.value)} />
            <input type="text" className="flex-1 border-b-2 border-black/50 bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q3Synonyms["b"][1]} onChange={(e) => handleQ3Change("b", 1, e.target.value)} />
            <input type="text" className="flex-1 border-b-2 border-black/50 bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q3Synonyms["b"][2]} onChange={(e) => handleQ3Change("b", 2, e.target.value)} />
          </div>

          <div className="flex items-center gap-4">
            <span className="w-20">ఇ. శరీరం</span>
            <span>:</span>
            <input type="text" className="flex-1 border-b-2 border-black/50 bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q3Synonyms["c"][0]} onChange={(e) => handleQ3Change("c", 0, e.target.value)} />
            <input type="text" className="flex-1 border-b-2 border-black/50 bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q3Synonyms["c"][1]} onChange={(e) => handleQ3Change("c", 1, e.target.value)} />
            <input type="text" className="flex-1 border-b-2 border-black/50 bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q3Synonyms["c"][2]} onChange={(e) => handleQ3Change("c", 2, e.target.value)} />
          </div>
        </div>
      </div>

      {/* Section VI */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="bg-[#2f2b66] text-white font-serif font-bold text-lg px-3 py-1">VI</div>
          <div className="bg-[#2f2b66] text-white font-bold text-lg px-4 py-1">భాషను గురించి తెలుసుకుందాం</div>
        </div>
        
        <div className="space-y-6 pl-4 md:pl-8">
          <p className="text-[#e6007e] font-bold">1. కింది పట్టికలోని వాక్యాలలో క్రియాభేదాలను గుర్తించి రాయండి.</p>
          
          <div className="pt-2 overflow-x-auto pb-4">
            <table className="w-full max-w-3xl border-collapse border border-[#6b5b95] rounded-lg overflow-hidden text-[14.5px]">
              <thead>
                <tr className="bg-[#d1c4e0] text-[#1e1b4b]">
                  <th className="border border-[#6b5b95] p-3 text-center">వాక్యం</th>
                  <th className="border border-[#6b5b95] p-3 w-[20%] text-center">అసమాపక క్రియ</th>
                  <th className="border border-[#6b5b95] p-3 w-[20%] text-center">సమాపక క్రియ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-[#6b5b95] p-3">ఉదా: సీత బజారుకు వెళ్ళి, బొమ్మ కొన్నది.</td>
                  <td className="border border-[#6b5b95] p-3 text-center">వెళ్ళి</td>
                  <td className="border border-[#6b5b95] p-3 text-center">కొన్నది</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-[#6b5b95] p-3">1. రాజు పద్యం చదివి, భావం చెప్పాడు.</td>
                  <td className="border border-[#6b5b95] p-0 relative h-[50px]"><input type="text" className="w-full h-full p-2 text-center outline-none focus:bg-blue-50 transition-colors" value={grammarTable[0][0]} onChange={(e) => handleGrammarChange(0, 0, e.target.value)} /></td>
                  <td className="border border-[#6b5b95] p-0 relative h-[50px]"><input type="text" className="w-full h-full p-2 text-center outline-none focus:bg-blue-50 transition-colors" value={grammarTable[0][1]} onChange={(e) => handleGrammarChange(0, 1, e.target.value)} /></td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-[#6b5b95] p-3">2. వాణి బొమ్మ గీసి, రంగులు వేసింది.</td>
                  <td className="border border-[#6b5b95] p-0 relative h-[50px]"><input type="text" className="w-full h-full p-2 text-center outline-none focus:bg-blue-50 transition-colors" value={grammarTable[1][0]} onChange={(e) => handleGrammarChange(1, 0, e.target.value)} /></td>
                  <td className="border border-[#6b5b95] p-0 relative h-[50px]"><input type="text" className="w-full h-full p-2 text-center outline-none focus:bg-blue-50 transition-colors" value={grammarTable[1][1]} onChange={(e) => handleGrammarChange(1, 1, e.target.value)} /></td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-[#6b5b95] p-3">3. కావ్య మెట్లు ఎక్కి పైకి వెళ్ళింది.</td>
                  <td className="border border-[#6b5b95] p-0 relative h-[50px]"><input type="text" className="w-full h-full p-2 text-center outline-none focus:bg-blue-50 transition-colors" value={grammarTable[2][0]} onChange={(e) => handleGrammarChange(2, 0, e.target.value)} /></td>
                  <td className="border border-[#6b5b95] p-0 relative h-[50px]"><input type="text" className="w-full h-full p-2 text-center outline-none focus:bg-blue-50 transition-colors" value={grammarTable[2][1]} onChange={(e) => handleGrammarChange(2, 1, e.target.value)} /></td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-[#6b5b95] p-3">4. రంగయ్య వచ్చి, వెళ్ళాడు.</td>
                  <td className="border border-[#6b5b95] p-0 relative h-[50px]"><input type="text" className="w-full h-full p-2 text-center outline-none focus:bg-blue-50 transition-colors" value={grammarTable[3][0]} onChange={(e) => handleGrammarChange(3, 0, e.target.value)} /></td>
                  <td className="border border-[#6b5b95] p-0 relative h-[50px]"><input type="text" className="w-full h-full p-2 text-center outline-none focus:bg-blue-50 transition-colors" value={grammarTable[3][1]} onChange={(e) => handleGrammarChange(3, 1, e.target.value)} /></td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-[#6b5b95] p-3">5. వాళ్ళు అన్నం తిని, నీళ్ళు తాగారు.</td>
                  <td className="border border-[#6b5b95] p-0 relative h-[50px]"><input type="text" className="w-full h-full p-2 text-center outline-none focus:bg-blue-50 transition-colors" value={grammarTable[4][0]} onChange={(e) => handleGrammarChange(4, 0, e.target.value)} /></td>
                  <td className="border border-[#6b5b95] p-0 relative h-[50px]"><input type="text" className="w-full h-full p-2 text-center outline-none focus:bg-blue-50 transition-colors" value={grammarTable[4][1]} onChange={(e) => handleGrammarChange(4, 1, e.target.value)} /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center my-6">
            <div className="border border-[#2f2b66] rounded-full px-6 py-2 bg-blue-50/50">
              <span className="text-[#2f2b66] font-bold text-lg">సంశ్లిష్ట వాక్యం</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2 text-[#e6007e] font-bold">
              <span>*</span>
              <p>కింది వాక్యాలు చదువండి. కలిపి రాసిన విధానం పరిశీలించండి.</p>
            </div>
            
            <div className="pl-6 space-y-2">
              <p>ఉదా: గీత బజారుకు వెళ్ళింది. గీత కూరగాయలు కొన్నది.</p>
              <p className="pl-8 text-[#2f2b66]">గీత బజారుకు వెళ్ళి, కూరగాయలు కొన్నది.</p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-[#e6007e] font-bold">2. కింది వాక్యాలను కలిపి రాయండి.</p>
            <div className="pl-6 space-y-4">
              <p>అ) విమల వంట చేస్తుంది. విమల పాటలు వింటుంది.</p>
              <div className="border-b-2 border-black/50 max-w-lg">
                <input
                  type="text"
                  className="w-full bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50"
                  value={q6_2}
                  onChange={(e) => handleQ6_2Change(e.target.value)}
                  placeholder="కలిపి రాసిన వాక్యం..."
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4 clear-both">
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          40
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
