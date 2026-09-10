"use client";

import React, { useState, useEffect } from "react";

export function C8TeluguCh4Page10() {
  const [tableData, setTableData] = useState<Array<[string, string, string, string]>>([
    ["1", "", "", ""],
    ["2", "", "", ""],
    ["3", "", "", ""],
    ["4", "", "", ""]
  ]);

  const [q3_1, setQ3_1] = useState<Record<string, string>>({});
  const [q3_2, setQ3_2] = useState("");
  const [q4_1, setQ4_1] = useState<Record<string, string>>({});
  const [q5_1, setQ5_1] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedTable = localStorage.getItem("c8-telugu-ch4-p10-table");
    if (savedTable) {
      try {
        setTableData(JSON.parse(savedTable));
      } catch (e) {
        console.error("Error loading table", e);
      }
    }

    const savedQ3_1 = localStorage.getItem("c8-telugu-ch4-p10-q3_1");
    if (savedQ3_1) setQ3_1(JSON.parse(savedQ3_1));

    const savedQ3_2 = localStorage.getItem("c8-telugu-ch4-p10-q3_2");
    if (savedQ3_2) setQ3_2(savedQ3_2);

    const savedQ4_1 = localStorage.getItem("c8-telugu-ch4-p10-q4_1");
    if (savedQ4_1) setQ4_1(JSON.parse(savedQ4_1));

    const savedQ5_1 = localStorage.getItem("c8-telugu-ch4-p10-q5_1");
    if (savedQ5_1) setQ5_1(JSON.parse(savedQ5_1));
  }, []);

  const handleTableChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
    localStorage.setItem("c8-telugu-ch4-p10-table", JSON.stringify(newData));
  };

  const handleQ3_1Change = (id: string, value: string) => {
    const newAnswers = { ...q3_1, [id]: value };
    setQ3_1(newAnswers);
    localStorage.setItem("c8-telugu-ch4-p10-q3_1", JSON.stringify(newAnswers));
  };

  const handleQ3_2Change = (value: string) => {
    setQ3_2(value);
    localStorage.setItem("c8-telugu-ch4-p10-q3_2", value);
  };

  const handleQ4_1Change = (id: string, value: string) => {
    const newAnswers = { ...q4_1, [id]: value };
    setQ4_1(newAnswers);
    localStorage.setItem("c8-telugu-ch4-p10-q4_1", JSON.stringify(newAnswers));
  };

  const handleQ5_1Change = (id: string, value: string) => {
    const newAnswers = { ...q5_1, [id]: value };
    setQ5_1(newAnswers);
    localStorage.setItem("c8-telugu-ch4-p10-q5_1", JSON.stringify(newAnswers));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Table Section */}
      <div className="space-y-4 pl-4 md:pl-12">
        <p className="text-[#e6007e] font-bold">2. ఆయా వృత్తిపనులవారు తయారుచేసేవి, వాడే వస్తువుల పేర్లను పాఠం ఆధారంగా వివరాలను పట్టికలో రాయండి.</p>
        
        <div className="pt-2 overflow-x-auto pb-4">
          <table className="w-full border-collapse border border-[#6b5b95] rounded-lg overflow-hidden text-[14px]">
            <thead>
              <tr className="bg-[#d1c4e0] text-[#1e1b4b]">
                <th className="border border-[#6b5b95] p-2 w-[8%]">క్ర.సం</th>
                <th className="border border-[#6b5b95] p-2 w-[22%]">వృత్తులు</th>
                <th className="border border-[#6b5b95] p-2 w-[25%]">వాటికి సంబంధించిన పేరా సంఖ్య</th>
                <th className="border border-[#6b5b95] p-2 w-[45%]">పేరాలో ఇచ్చినవారు వాడే వస్తువులు లేదా తయారుచేసే వస్తువుల పేర్లు</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-white">
                  <td className="border border-[#6b5b95] p-0 relative h-[60px]">
                    <input
                      type="text"
                      className="w-full h-full p-2 text-center outline-none focus:bg-blue-50 transition-colors"
                      value={row[0]}
                      onChange={(e) => handleTableChange(rowIndex, 0, e.target.value)}
                    />
                  </td>
                  <td className="border border-[#6b5b95] p-0 relative h-[60px]">
                    <input
                      type="text"
                      className="w-full h-full p-2 outline-none focus:bg-blue-50 transition-colors"
                      value={row[1]}
                      onChange={(e) => handleTableChange(rowIndex, 1, e.target.value)}
                    />
                  </td>
                  <td className="border border-[#6b5b95] p-0 relative h-[60px]">
                    <input
                      type="text"
                      className="w-full h-full p-2 outline-none focus:bg-blue-50 transition-colors"
                      value={row[2]}
                      onChange={(e) => handleTableChange(rowIndex, 2, e.target.value)}
                    />
                  </td>
                  <td className="border border-[#6b5b95] p-0 relative h-[60px]">
                    <textarea
                      className="w-full h-full p-2 outline-none focus:bg-blue-50 transition-colors resize-none"
                      value={row[3]}
                      onChange={(e) => handleTableChange(rowIndex, 3, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section III */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#2f2b66] text-white font-serif font-bold text-lg px-3 py-1">III</div>
          <div className="bg-[#2f2b66] text-white font-bold text-lg px-4 py-1">స్వీయరచన</div>
        </div>
        
        <div className="space-y-6 pl-4 md:pl-12">
          <p className="text-[#e6007e] font-bold">1. కింది ప్రశ్నలకు ఐదేసి వాక్యాల్లో జవాబులు రాయండి.</p>
          
          <div className="space-y-4 pl-4">
            <div className="space-y-2">
              <p>అ) &apos;ఆదివాసులు మనందరికీ మార్గదర్శకులు&apos; - అని ఎట్లా చెప్పగలరు? రాయండి.</p>
              <textarea
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                value={q3_1["a"] || ""}
                onChange={(e) => handleQ3_1Change("a", e.target.value)}
                placeholder="మీ సమాధానం రాయండి..."
              />
            </div>
            
            <div className="space-y-2">
              <p>ఆ) కుమ్మరి గొప్పతనం గురించి మీరు ఏమనుకుంటున్నారో రాయండి.</p>
              <textarea
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                value={q3_1["b"] || ""}
                onChange={(e) => handleQ3_1Change("b", e.target.value)}
                placeholder="మీ సమాధానం రాయండి..."
              />
            </div>

            <div className="space-y-2">
              <p>ఇ) &apos;రైతులు మన అన్నదాతలు&apos; - సమర్థిస్తూ రాయండి.</p>
              <textarea
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                value={q3_1["c"] || ""}
                onChange={(e) => handleQ3_1Change("c", e.target.value)}
                placeholder="మీ సమాధానం రాయండి..."
              />
            </div>

            <div className="space-y-2">
              <p>ఈ) మీకు తెలిసిన లేదా మీరు చూసిన ఒక &apos;కష్టజీవి&apos; శ్రమను రాయండి.</p>
              <textarea
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                value={q3_1["d"] || ""}
                onChange={(e) => handleQ3_1Change("d", e.target.value)}
                placeholder="మీ సమాధానం రాయండి..."
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-[#e6007e] font-bold">2. కింది ప్రశ్నకు పది వాక్యాల్లో జవాబు రాయండి.</p>
            <div className="space-y-2 pl-4">
              <p>అ) &apos;దేహానికి అవయవాలు ఎంత ముఖ్యమో, సమాజానికి అన్ని వృత్తులవాళ్ళూ అంతే అవసరం&apos; - దీన్ని సమర్థిస్తూ, మీ సొంతమాటల్లో రాయండి.</p>
              <textarea
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[180px]"
                value={q3_2}
                onChange={(e) => handleQ3_2Change(e.target.value)}
                placeholder="మీ సమాధానం రాయండి..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section IV */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#2f2b66] text-white font-serif font-bold text-lg px-3 py-1">IV</div>
          <div className="bg-[#2f2b66] text-white font-bold text-lg px-4 py-1">సృజనాత్మకత / ప్రశంస</div>
        </div>
        
        <div className="space-y-4 pl-4 md:pl-12">
          <p className="text-[#e6007e] font-bold">1. కింది ప్రశ్నకు జవాబును సృజనాత్మకంగా రాయండి.</p>
          
          <div className="space-y-4 pl-4">
            <p>అ) మీ గ్రామంలోని ఒక వృత్తిపనివారి వివరాలను సేకరించడానికి ప్రశ్నావళిని తయారుచేయండి.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
              <div className="flex items-center">
                <span className="w-16 flex-shrink-0">ఉదా|| 1.</span>
                <span className="flex-1">నమస్కారం! మీ పేరేమిటి?</span>
              </div>
              <div className="flex items-center border-b-2 border-black/80">
                <span className="w-8 flex-shrink-0">2.</span>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none focus:bg-blue-50/50 p-1"
                  value={q4_1["q2"] || ""}
                  onChange={(e) => handleQ4_1Change("q2", e.target.value)}
                />
              </div>
              
              <div className="flex items-center border-b-2 border-black/80">
                <span className="w-16 flex-shrink-0 pl-8">3.</span>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none focus:bg-blue-50/50 p-1"
                  value={q4_1["q3"] || ""}
                  onChange={(e) => handleQ4_1Change("q3", e.target.value)}
                />
              </div>
              <div className="flex items-center border-b-2 border-black/80">
                <span className="w-8 flex-shrink-0">4.</span>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none focus:bg-blue-50/50 p-1"
                  value={q4_1["q4"] || ""}
                  onChange={(e) => handleQ4_1Change("q4", e.target.value)}
                />
              </div>
              
              <div className="flex items-center border-b-2 border-black/80">
                <span className="w-16 flex-shrink-0 pl-8">5.</span>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none focus:bg-blue-50/50 p-1"
                  value={q4_1["q5"] || ""}
                  onChange={(e) => handleQ4_1Change("q5", e.target.value)}
                />
              </div>
              <div className="flex items-center border-b-2 border-black/80">
                <span className="w-8 flex-shrink-0">6.</span>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none focus:bg-blue-50/50 p-1"
                  value={q4_1["q6"] || ""}
                  onChange={(e) => handleQ4_1Change("q6", e.target.value)}
                />
              </div>
              
              <div className="flex items-center border-b-2 border-black/80">
                <span className="w-16 flex-shrink-0 pl-8">7.</span>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none focus:bg-blue-50/50 p-1"
                  value={q4_1["q7"] || ""}
                  onChange={(e) => handleQ4_1Change("q7", e.target.value)}
                />
              </div>
              <div className="flex items-center border-b-2 border-black/80">
                <span className="w-8 flex-shrink-0">8.</span>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none focus:bg-blue-50/50 p-1"
                  value={q4_1["q8"] || ""}
                  onChange={(e) => handleQ4_1Change("q8", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section V */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#2f2b66] text-white font-serif font-bold text-lg px-3 py-1">V</div>
          <div className="bg-[#2f2b66] text-white font-bold text-lg px-4 py-1">పదజాల వినియోగం</div>
        </div>
        
        <div className="space-y-4 pl-4 md:pl-12">
          <p className="text-[#e6007e] font-bold">1. కింది పదాలకు సొంత వాక్యాలు రాయండి.</p>
          
          <div className="space-y-6 pl-4 pt-2">
            <div className="flex items-center">
              <span className="w-32 flex-shrink-0">అ) చేదోడు వాదోడు</span>
              <span className="px-2">:</span>
              <div className="flex-1 border-b-2 border-black/80">
                <input
                  type="text"
                  className="w-full bg-transparent outline-none focus:bg-blue-50/50 p-1"
                  value={q5_1["a"] || ""}
                  onChange={(e) => handleQ5_1Change("a", e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="w-32 flex-shrink-0">ఆ) చాకచక్యం</span>
              <span className="px-2">:</span>
              <div className="flex-1 border-b-2 border-black/80">
                <input
                  type="text"
                  className="w-full bg-transparent outline-none focus:bg-blue-50/50 p-1"
                  value={q5_1["b"] || ""}
                  onChange={(e) => handleQ5_1Change("b", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4 clear-both">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          39
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
