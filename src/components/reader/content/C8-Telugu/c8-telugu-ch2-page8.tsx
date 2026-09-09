"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh2Page8() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch2-p26-answers");
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
      localStorage.setItem("c8-telugu-ch2-p26-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Title Section with QR */}
      <div className="relative pt-6 pb-4">
        {/* Title Box */}
        <div className="flex justify-center">
          <div className="border border-[#1e1b4b] bg-white px-8 py-2 shadow-[4px_4px_0_#b2a1c7]">
            <h1 className="text-3xl font-bold text-[#e6007e]">ఇవి చేయండి</h1>
          </div>
        </div>

        {/* QR Code */}
        <div className="absolute top-0 right-0 w-[95px] h-[95px] md:w-[105px] md:h-[105px]">
          <Image
            src="/c8-t-ch2-p26-qr.png"
            alt="QR Code E8T7V1"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Section I */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-4 bg-[#1e1b4b] text-white w-fit pr-6 py-1">
          <div className="px-4 font-serif font-bold text-lg">I</div>
          <h2 className="font-bold text-lg">విని, అర్థంచేసుకొని, ఆలోచించి మాట్లాడడం</h2>
        </div>

        <div className="space-y-4 pl-4 md:pl-8">
          <div className="flex gap-4">
            <span className="text-[#e6007e] font-bold">1.</span>
            <div className="flex-1 space-y-3">
              <p className="text-[#e6007e] font-bold">ఏదైనా సాధించాలంటే పట్టుదల, దృఢ సంకల్పం అవసరం. దీన్ని సమర్థిస్తూ మాట్లాడండి.</p>
              <textarea
                className="w-full h-24 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-[#f8f5fb] text-[15px]"
                placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                value={answers["sec1-q1"] || ""}
                onChange={(e) => handleAnswerChange("sec1-q1", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section II */}
      <div className="space-y-8 pt-6">
        <div className="flex items-center gap-4 bg-[#1e1b4b] text-white w-fit pr-6 py-1">
          <div className="px-4 font-serif font-bold text-lg">II</div>
          <h2 className="font-bold text-lg">ధారాళంగా చదువడం - అర్థం చేసుకొని ప్రతిస్పందించడం</h2>
        </div>

        {/* Section II - Part 1: Table */}
        <div className="space-y-4 pl-4 md:pl-8">
          <div className="flex gap-4">
            <span className="text-[#e6007e] font-bold">1.</span>
            <div className="flex-1 space-y-4">
              <p className="text-[#e6007e] font-bold">కింది వాక్యాలు పాఠంలోని ఏ పేరాలో ఉన్నవో గుర్తించి, పేరాకు శీర్షికను పెట్టండి.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-[#b2a1c7] text-[15px]">
                  <thead>
                    <tr className="bg-[#e4ddec]">
                      <th className="border border-[#b2a1c7] p-3 text-center w-[50%]">వాక్యం</th>
                      <th className="border border-[#b2a1c7] p-3 text-center w-[20%]">పేరా సంఖ్య</th>
                      <th className="border border-[#b2a1c7] p-3 text-center w-[30%]">శీర్షిక</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "t1", text: "పడవలో రిసెప్షన్ రూం కూడా ఉంటుంది" },
                      { id: "t2", text: "నేను ధోవతి శేర్వాణీలో ఉంటిని" },
                      { id: "t3", text: "ఏవేళ ప్రాణం పోతుందో" },
                      { id: "t4", text: "మేము పడవ నుండి దిగేసరకు సూర్యాస్తమయం అయింది." }
                    ].map((row, idx) => (
                      <tr key={row.id} className="bg-[#f8f5fb]">
                        <td className="border border-[#b2a1c7] p-3 text-[#1e1b4b]">{row.text}</td>
                        <td className="border border-[#b2a1c7] p-0 align-top">
                          <input
                            type="text"
                            className="w-full h-full p-3 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-[#3e3470] text-center"
                            placeholder="..."
                            value={answers[`table-para-${idx}`] || ""}
                            onChange={(e) => handleAnswerChange(`table-para-${idx}`, e.target.value)}
                          />
                        </td>
                        <td className="border border-[#b2a1c7] p-0 align-top">
                          <input
                            type="text"
                            className="w-full h-full p-3 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-[#3e3470]"
                            placeholder="శీర్షిక"
                            value={answers[`table-title-${idx}`] || ""}
                            onChange={(e) => handleAnswerChange(`table-title-${idx}`, e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Section II - Part 2: Reading Comprehension */}
        <div className="space-y-4 pl-4 md:pl-8">
          <div className="flex gap-4">
            <span className="text-[#e6007e] font-bold">2.</span>
            <div className="flex-1 space-y-6">
              <p className="text-[#e6007e] font-bold">కింది పేరాను చదివి, ప్రశ్నలకు జవాబులు రాయండి.</p>
              
              <div className="space-y-4 text-justify text-[15px] leading-[1.8] text-[#4a4a4a] px-2">
                <p>
                  హైదరాబాద్ నుండి నేను రైలులో బాసర రైల్వే స్టేషన్‌కు చేరుకున్నాను. అక్కడి నుండి బాసరలోని శ్రీ జ్ఞాన
                  సరస్వతీదేవి ఆలయానికి చేరుకున్నాను. ఆధ్యాత్మికత విలసిల్లే ప్రశాంత సుందర ప్రదేశంలో, గోదావరినదీ
                  తీరాన ఈ సుందర ప్రసిద్ధ పుణ్యక్షేత్రం ఉన్నది.
                </p>
                <p>
                  ఇక్కడి సరస్వతీదేవి సైకతమూర్తిని వ్యాసమహర్షి మలిచాడని ప్రసిద్ధి. ఈ వాగ్దేవతా సమక్షంలో వసంతపంచమిరోజు
                  పిల్లలకు విద్యాభ్యాసం చేయిస్తే మంచి విద్యావంతులు అవుతారని ప్రతీతి. దసరా పండుగ రోజుల్లో అమ్మవారికి
                  నవరాత్రి ఉత్సవాలు జరుపుతారు. ఒక్కొక్కరోజు ఒక్కొక్క అవతార మూర్తిగా అమ్మవారిని అలంకరిస్తారు. ఈ
                  రోజుల్లో భక్తులు తండోపతండాలుగా వచ్చి అమ్మవారిని దర్శించుకుంటారు. ఈ పుణ్యక్షేత్రం నిర్మల్ జిల్లాలో
                  ఉన్నది.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                {[
                  { id: "q_a", prefix: "అ)", text: "బాసర పుణ్యక్షేత్రంలోని దేవత ఎవరు?" },
                  { id: "q_aa", prefix: "ఆ)", text: "సరస్వతీదేవి ఆలయం ఏ నది తీరాన ఉన్నది?" },
                  { id: "q_i", prefix: "ఇ)", text: "సరస్వతీదేవి సైకతమూర్తిని మలచిన వారు ఎవరు?" },
                  { id: "q_ii", prefix: "ఈ)", text: "నవరాత్రి ఉత్సవాలు ఎప్పుడు జరుగుతాయి?" },
                  { id: "q_u", prefix: "ఉ)", text: "పై పేరాకు శీర్షిక సూచించండి." }
                ].map((q) => (
                  <div key={q.id} className="flex gap-3">
                    <span className="font-bold">{q.prefix}</span>
                    <div className="flex-1 space-y-2">
                      <p>{q.text}</p>
                      <input
                        type="text"
                        className="w-full border-b border-gray-400 p-2 focus:outline-none focus:border-[#e6007e] bg-transparent text-[15px] italic text-[#3e3470]"
                        placeholder="జవాబు..."
                        value={answers[q.id] || ""}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center pt-12 pb-4">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          17
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
