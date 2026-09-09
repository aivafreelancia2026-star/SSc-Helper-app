"use client";

import { useState, useEffect } from "react";

export function C8TeluguCh3Page8() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checklist, setChecklist] = useState<Record<string, "yes" | "no" | null>>({});

  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem("c8-telugu-ch3-p38-answers");
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
      
      const savedChecklist = localStorage.getItem("c8-telugu-ch3-p38-checklist");
      if (savedChecklist) setChecklist(JSON.parse(savedChecklist));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAnswerChange = (id: string, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    try {
      localStorage.setItem("c8-telugu-ch3-p38-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  const handleChecklistChange = (id: string, value: "yes" | "no") => {
    const newChecklist = { ...checklist, [id]: value };
    setChecklist(newChecklist);
    try {
      localStorage.setItem("c8-telugu-ch3-p38-checklist", JSON.stringify(newChecklist));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Gunasandhi Rules Continuation */}
      <div className="space-y-6 pl-4 md:pl-12 text-[#4a4a4a]">
        
        <div className="flex flex-col md:flex-row gap-8 relative">
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-[#1e1b4b]">♦</span>
              <p>'అ' కారానికి 'ఇ/ఈ' - పరమైనప్పుడు 'ఏ' ( ే )</p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1e1b4b]">♦</span>
              <p>'అ' కారానికి 'ఉ' - పరమైనప్పుడు 'ఓ' ( ో )</p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1e1b4b]">♦</span>
              <p>'అ' కారానికి 'ఋ' - పరమైనప్పుడు 'అర్'</p>
            </div>
          </div>

          <div className="space-y-3 md:ml-auto md:mr-12">
            <div className="bg-[#d1c4e0] px-6 py-2 rounded-full text-[#1e1b4b] text-sm text-center">
              అకారము అంటే 'అ' లేదా 'ఆ'.
            </div>
            <div className="bg-[#d1c4e0] px-6 py-2 rounded-full text-[#1e1b4b] text-sm text-center">
              ఏ, ఓ, అర్ లను గుణాలు అంటారు.
            </div>
          </div>
        </div>

        <p className="text-[#2a87b8] pl-6 py-2">
          'అ' కారం స్థానంలో ఏ, ఓ, అర్ లు ఆదేశంగా వచ్చాయి. ఇట్లా ఏర్పడిన సంధిని <span className="font-bold">గుణసంధి</span> అంటారు.
        </p>

        <div className="flex justify-center">
          <div className="bg-[#d1c4e0] px-6 py-2 rounded-full text-[#1e1b4b] font-bold text-center">
            'అ' కారానికి ఇ, ఉ, ఋ లు పరమైనపుడు క్రమంగా ఏ, ఓ, అర్ లు ఆదేశంగా వస్తాయి.
          </div>
        </div>

        {/* Question 3 */}
        <div className="flex gap-4 items-start pt-6">
          <span className="font-bold text-[#e6007e] pt-1">3.</span>
          <div className="flex-1 space-y-6">
            <p className="font-bold text-[#e6007e]">
              కింది పదాలను కలిపి, సంధి ఏర్పడిన విధానాన్ని తెలుపండి.
            </p>

            <div className="space-y-5 overflow-x-auto pb-4">
              <div className="min-w-[600px]">
                {/* Example */}
                <div className="flex items-center gap-2 font-bold mb-4">
                  <div className="w-[140px]">ఉదా: మహా + ఇంద్రుడు</div>
                  <div>=</div>
                  <div className="w-[120px] text-center border-b border-[#4a4a4a] px-2">మహేంద్రుడు</div>
                  <div className="mx-2">,</div>
                  <div className="w-8 text-center border-b border-[#4a4a4a]">ఆ</div>
                  <div>+</div>
                  <div className="w-8 text-center border-b border-[#4a4a4a]">ఇ</div>
                  <div>=</div>
                  <div className="w-8 text-center border-b border-[#4a4a4a]">ఏ</div>
                  <div className="ml-4">(</div>
                  <div className="w-6 text-center border-b border-[#4a4a4a]">ే</div>
                  <div>)</div>
                </div>

                {/* Items */}
                {[
                  { id: "a", prefix: "అ)", term: "దేవ + ఇంద్రుడు" },
                  { id: "b", prefix: "ఆ)", term: "గుణ + ఈశుడు" },
                  { id: "c", prefix: "ఇ)", term: "నర + ఉత్తముడు" },
                  { id: "d", prefix: "ఈ)", term: "నవ + ఉదయం" },
                  { id: "e", prefix: "ఉ)", term: "బ్రహ్మ + ఋషి" }
                ].map((item) => (
                  <div key={item.id} className="flex items-center gap-2 mb-4">
                    <div className="w-[140px] font-bold">{item.prefix} {item.term}</div>
                    <div>=</div>
                    <div className="w-[120px]">
                      <input type="text" className="w-full text-center border-b border-dashed border-[#2f2b66] bg-transparent focus:outline-none" value={answers[`q-3-${item.id}-1`] || ""} onChange={(e) => handleAnswerChange(`q-3-${item.id}-1`, e.target.value)} />
                    </div>
                    <div className="mx-2">,</div>
                    <div className="w-8">
                      <input type="text" className="w-full text-center border-b border-dashed border-[#2f2b66] bg-transparent focus:outline-none" value={answers[`q-3-${item.id}-2`] || ""} onChange={(e) => handleAnswerChange(`q-3-${item.id}-2`, e.target.value)} />
                    </div>
                    <div>+</div>
                    <div className="w-8">
                      <input type="text" className="w-full text-center border-b border-dashed border-[#2f2b66] bg-transparent focus:outline-none" value={answers[`q-3-${item.id}-3`] || ""} onChange={(e) => handleAnswerChange(`q-3-${item.id}-3`, e.target.value)} />
                    </div>
                    <div>=</div>
                    <div className="w-8">
                      <input type="text" className="w-full text-center border-b border-dashed border-[#2f2b66] bg-transparent focus:outline-none" value={answers[`q-3-${item.id}-4`] || ""} onChange={(e) => handleAnswerChange(`q-3-${item.id}-4`, e.target.value)} />
                    </div>
                    <div className="ml-4">(</div>
                    <div className="w-6">
                      <input type="text" className="w-full text-center border-b border-dashed border-[#2f2b66] bg-transparent focus:outline-none" value={answers[`q-3-${item.id}-5`] || ""} onChange={(e) => handleAnswerChange(`q-3-${item.id}-5`, e.target.value)} />
                    </div>
                    <div>)</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* భాషాకార్యకలాపాలు / ప్రాజెక్టు పని */}
      <div className="relative border-2 border-[#2f2b66] rounded-xl p-6 pt-10 mt-12 mb-12">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-8 py-2 rounded-full whitespace-nowrap">
          <h2 className="font-bold text-lg text-center">భాషాకార్యకలాపాలు / ప్రాజెక్టు పని</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="text-[#1e1b4b] pt-1">♦</span>
            <p className="text-[#1e1b4b] font-bold">
              బసవని వంటి పరమ భక్తులలో ఒకరి కథను సేకరించి, మీ సొంతమాటల్లో రాసి దాన్ని తరగతిలో చెప్పండి.
            </p>
          </div>
          <textarea
            className="w-full h-32 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#2f2b66] shadow-inner resize-none bg-[#f8f5fb] text-[15px]"
            placeholder="ప్రాజెక్టు పని వివరాలు ఇక్కడ రాయండి..."
            value={answers["project-work"] || ""}
            onChange={(e) => handleAnswerChange("project-work", e.target.value)}
          />
        </div>
      </div>

      {/* నేనివి చేయగలనా? */}
      <div className="relative border-2 border-[#2f2b66] rounded-xl p-6 pt-10 mt-12 bg-[#f8f5fb]">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-8 py-2 rounded-full whitespace-nowrap">
          <h2 className="font-bold text-lg text-center">నేనివి చేయగలనా?</h2>
        </div>
        
        <div className="space-y-6">
          {[
            { id: "self-assess-1", num: "1.", text: "భక్తులకు ధనాశ ఉండదనే అంశంపై అభిప్రాయం చెప్పగలను." },
            { id: "self-assess-2", num: "2.", text: "అపరిచిత పద్యం చదివి ఖాళీలను పూరించగలను." },
            { id: "self-assess-3", num: "3.", text: "భక్తుడి లక్షణాలను సొంతమాటల్లో రాయగలను." },
            { id: "self-assess-4", num: "4.", text: "పాఠం ఆధారంగా సంభాషణలు రాయగలను." }
          ].map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d1c4e0] pb-4 last:border-0 last:pb-0">
              <div className="flex gap-4">
                <span className="font-bold text-[#4a4a4a]">{item.num}</span>
                <p className="text-[#4a4a4a]">{item.text}</p>
              </div>
              <div className="flex gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => handleChecklistChange(item.id, "yes")}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                    checklist[item.id] === "yes"
                      ? "bg-[#2f2b66] text-white"
                      : "bg-white text-[#2f2b66] border border-[#2f2b66]"
                  }`}
                >
                  అవును
                </button>
                <button
                  onClick={() => handleChecklistChange(item.id, "no")}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                    checklist[item.id] === "no"
                      ? "bg-[#e6007e] text-white"
                      : "bg-white text-[#e6007e] border border-[#e6007e]"
                  }`}
                >
                  కాదు
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* సూక్తి */}
      <div className="flex justify-center mt-12 mb-8">
        <div className="flex bg-[#2f2b66] rounded-xl shadow-md overflow-hidden max-w-lg w-full">
          <div className="bg-[#1e1b4b] text-white font-bold p-4 flex items-center justify-center writing-vertical-rl rotate-180">
            సూక్తి
          </div>
          <div className="p-6 bg-white flex flex-col justify-center flex-1">
            <p className="text-[#1e1b4b] font-bold text-center text-lg leading-relaxed">
              "పవిత్రులు, మంచివారైన వ్యక్తుల దగ్గరకు...<br/>దుఃఖం ఎన్నటికీ చేరదు"
            </p>
            <p className="text-right text-[#4a4a4a] font-bold italic mt-4">
              - స్వామి వివేకానంద
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          29
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
