"use client";

import { useState, useEffect } from "react";

export function C8TeluguCh2Page12() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch2-p30-answers");
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
      localStorage.setItem("c8-telugu-ch2-p30-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Box 1: ప్రాజెక్టు పని */}
      <div className="relative border-2 border-[#2f2b66] rounded-xl p-6 pt-8 mt-6 bg-[#f8f5fb] shadow-[4px_4px_0_rgba(47,43,102,0.2)]">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-6 py-1.5 rounded-full whitespace-nowrap">
          <h2 className="font-bold text-[16px]">భాషాకార్యకలాపాలు / ప్రాజెక్టు పని</h2>
        </div>
        
        <div className="space-y-4 pt-2">
          <div className="flex gap-3">
            <span className="text-[#1e1b4b] font-bold mt-1">♦</span>
            <p className="text-[#e6007e]">వివిధ పత్రికలలో వచ్చే యాత్రారచనలను చదివి, వాటిలో ఒక దానికి నివేదిక రాయండి.</p>
          </div>
          <textarea
            className="w-full h-32 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-white text-[15px]"
            placeholder="మీ నివేదిక ఇక్కడ రాయండి..."
            value={answers["project-report"] || ""}
            onChange={(e) => handleAnswerChange("project-report", e.target.value)}
          />
        </div>
      </div>

      {/* Box 2: నేనివి చేయగలనా? */}
      <div className="relative border-2 border-[#2f2b66] rounded-xl p-6 pt-8 mt-8 bg-[#f8f5fb] shadow-[4px_4px_0_rgba(47,43,102,0.2)]">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-8 py-1.5 rounded-full whitespace-nowrap">
          <h2 className="font-bold text-[16px]">నేనివి చేయగలనా?</h2>
        </div>
        
        <div className="space-y-6 pt-4 px-2 md:px-8 text-[#4a4a4a]">
          {[
            { id: "checklist-1", num: "1.", text: "ఏదైనా సాధించాలంటే పట్టుదల, దృఢసంకల్పం అవసరమని సమర్థిస్తూ మాట్లాడగలను." },
            { id: "checklist-2", num: "2.", text: "అపరిచిత గద్యం చదివి ప్రశ్నలకు జవాబులు రాయగలను." },
            { id: "checklist-3", num: "3.", text: "అనుకున్నది సాధించడంలో ఉండే తృప్తిని గురించి సొంతమాటల్లో రాయగలను." },
            { id: "checklist-4", num: "4.", text: "చదువు కష్టంగా భావించక, ఇష్టంగా భావించాలని మిత్రునికి లేఖ రాయగలను." }
          ].map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#d1c4e0] border-dashed pb-4 last:border-0 last:pb-0">
              <div className="flex gap-4 max-w-[500px]">
                <span className="font-bold shrink-0">{item.num}</span>
                <p>{item.text}</p>
              </div>
              <div className="flex gap-2 shrink-0 ml-8 md:ml-0">
                <button
                  onClick={() => handleAnswerChange(item.id, "అవును")}
                  className={`px-4 py-1.5 rounded-full border text-sm font-bold transition-colors ${
                    answers[item.id] === "అవును"
                      ? "bg-[#2f2b66] text-white border-[#2f2b66]"
                      : "bg-white text-[#4a4a4a] border-[#b2a1c7] hover:border-[#2f2b66]"
                  }`}
                >
                  అవును
                </button>
                <button
                  onClick={() => handleAnswerChange(item.id, "కాదు")}
                  className={`px-4 py-1.5 rounded-full border text-sm font-bold transition-colors ${
                    answers[item.id] === "కాదు"
                      ? "bg-[#e6007e] text-white border-[#e6007e]"
                      : "bg-white text-[#4a4a4a] border-[#b2a1c7] hover:border-[#e6007e]"
                  }`}
                >
                  కాదు
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Box 3: మీకు తెలుసా? */}
      <div className="relative border-2 border-[#2f2b66] rounded-xl p-6 pt-10 mt-8 bg-[#f8f5fb] shadow-[4px_4px_0_rgba(47,43,102,0.2)]">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-8 py-1.5 rounded-full whitespace-nowrap">
          <h2 className="font-bold text-[16px]">మీకు తెలుసా?</h2>
        </div>
        
        <div className="space-y-4 pt-2 px-2 md:px-8 text-[#4a4a4a]">
          <div className="flex gap-4">
            <span className="font-bold text-[#1e1b4b]">1.</span>
            <p><span className="font-bold text-[#1e1b4b]">జిబ్రాల్టర్ రేవు :</span> యునైటెడ్ కింగ్‌డం (U.K.)లో ఉన్న ఒక ఓడరేవు.</p>
          </div>
          <div className="flex gap-4">
            <span className="font-bold text-[#1e1b4b]">2.</span>
            <p><span className="font-bold text-[#1e1b4b]">బే ఆఫ్ బిస్కే :</span> స్పెయిన్‌లోని లేసెస్ నగరానికి దగ్గరలో ఉన్నది. సముద్రకెరటాలు పర్వత సానువులను ఢీకొట్టడం వలన సారంగు ఏర్పడింది. ఇది పర్యాటక కేంద్రంగా విలసిల్లుతున్నది.</p>
          </div>
          <div className="flex gap-4">
            <span className="font-bold text-[#1e1b4b]">3.</span>
            <p><span className="font-bold text-[#1e1b4b]">స్టెర్లింగ్ పౌండ్ :</span> బ్రిటన్ దేశపు కరెన్సీ (ద్రవ్యం)</p>
          </div>
          <div className="flex gap-4">
            <span className="font-bold text-[#1e1b4b]">4.</span>
            <p><span className="font-bold text-[#1e1b4b]">పాస్‌పోర్ట్ :</span> విదేశాలకు వెళ్ళే వాళ్ళకు ప్రభుత్వం ఇచ్చే వ్యక్తి ధృవీకరణ పత్రం.</p>
          </div>
          <div className="flex gap-4">
            <span className="font-bold text-[#1e1b4b]">5.</span>
            <p><span className="font-bold text-[#1e1b4b]">గ్రేట్ బ్రిటన్ :</span> ఇంగ్లండ్, స్కాట్‌లాండ్, వేల్స్ దీవులు, ఉత్తర ఐర్లాండ్ల సముదాయం.</p>
          </div>
        </div>
      </div>

      {/* Box 4: సూక్తి */}
      <div className="flex justify-center pt-4 pb-4">
        <div className="flex border-2 border-[#2f2b66] rounded-xl overflow-hidden shadow-[4px_4px_0_rgba(47,43,102,0.2)] bg-[#f8f5fb] max-w-[500px]">
          <div className="bg-[#2f2b66] w-[80px] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-lg -rotate-90 origin-center whitespace-nowrap tracking-wider">సూక్తి</span>
          </div>
          <div className="p-6 text-center space-y-4">
            <p className="font-bold text-[#1e1b4b] text-[16px] leading-relaxed">
              అఖండమైన ఓర్పు, ధైర్యం, ప్రయత్నాలతోనే<br/>
              ఉత్తమోత్తమ ఫలితాలు సంప్రాప్తమౌతాయి.
            </p>
            <p className="text-[#1e1b4b] font-bold text-right pr-4">
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
          21
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
