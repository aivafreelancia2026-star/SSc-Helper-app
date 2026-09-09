"use client";

import { useState, useEffect } from "react";

export function C8TeluguCh2Page9() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch2-p27-answers");
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
      localStorage.setItem("c8-telugu-ch2-p27-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Section III */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 bg-[#1e1b4b] text-white w-fit pr-6 py-1">
          <div className="px-4 font-serif font-bold text-lg">III</div>
          <h2 className="font-bold text-lg">స్వీయరచన</h2>
        </div>

        <div className="space-y-8 pl-4 md:pl-8">
          
          {/* Question 1 */}
          <div className="flex gap-4">
            <span className="text-[#e6007e] font-bold">1.</span>
            <div className="flex-1 space-y-6">
              <p className="text-[#e6007e] font-bold">కింది ప్రశ్నలకు ఐదేసి వాక్యాల్లో జవాబులు రాయండి.</p>
              
              <div className="space-y-6">
                {[
                  { id: "sec3-q1-a", prefix: "అ)", text: "దూరప్రయాణాలకు పోయేటప్పుడు తీసుకోవలసిన జాగ్రత్తలు ఏమిటి?" },
                  { id: "sec3-q1-aa", prefix: "ఆ)", text: "రచయిత ఉన్నతవిద్య కోసం పట్టుదలతో ఇంగ్లాండు వెళ్ళాడు కదా! దీని ద్వారా మీరేం గ్రహించారు?" },
                  { id: "sec3-q1-i", prefix: "ఇ)", text: "ముద్దు రామకృష్ణయ్య విషయంలో సురేశ్‌బాబు స్పందించిన విధానంపై మీ అభిప్రాయమేమిటి?" },
                  { id: "sec3-q1-ii", prefix: "ఈ)", text: "ఒక కొత్త ప్రదేశాన్ని దర్శించినపుడు అక్కడ తెలియని విషయాలను తెల్సుకోవడానికి మీరేంచేస్తారు?" }
                ].map((q) => (
                  <div key={q.id} className="flex gap-3 items-start">
                    <span className="font-bold pt-1">{q.prefix}</span>
                    <div className="flex-1 space-y-2">
                      <p className="pt-1">{q.text}</p>
                      <textarea
                        className="w-full h-24 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-[#f8f5fb] text-[15px]"
                        placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                        value={answers[q.id] || ""}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="flex gap-4 pt-2">
            <span className="text-[#e6007e] font-bold">2.</span>
            <div className="flex-1 space-y-6">
              <p className="text-[#e6007e] font-bold">కింది ప్రశ్నకు పది వాక్యాల్లో జవాబు రాయండి.</p>
              
              <div className="flex gap-3 items-start">
                <span className="font-bold pt-1">అ)</span>
                <div className="flex-1 space-y-2">
                  <p className="pt-1">'అనుకున్నది సాధించటంలో కలిగే తృప్తి అనంతమైంది.' ముద్దు రామకృష్ణయ్య సముద్ర ప్రయాణం ఆధారంగా వివరించండి.</p>
                  <textarea
                    className="w-full h-40 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-[#f8f5fb] text-[15px]"
                    placeholder="మీ జవాబు ఇక్కడ రాయండి (10 వాక్యాలు)..."
                    value={answers["sec3-q2-a"] || ""}
                    onChange={(e) => handleAnswerChange("sec3-q2-a", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Section IV */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-4 bg-[#1e1b4b] text-white w-fit pr-6 py-1">
          <div className="px-4 font-serif font-bold text-lg">IV</div>
          <h2 className="font-bold text-lg">సృజనాత్మకత / ప్రశంస</h2>
        </div>

        <div className="space-y-4 pl-4 md:pl-8">
          <div className="flex gap-4">
            <span className="text-[#e6007e] font-bold">1.</span>
            <div className="flex-1 space-y-4">
              <p className="text-[#e6007e] font-bold">కింది వానిలో ఒకదానికి జవాబును సృజనాత్మకంగా రాయండి.</p>
              
              <div className="space-y-4 pt-2 text-[#1e1b4b]">
                <div className="flex gap-3">
                  <span className="font-bold">అ)</span>
                  <p>చదువును కష్టంగా భావించవద్దు. ఉన్నతలక్ష్యం పెట్టుకొని, ఇష్టంగా చదువుకుని, అనుకున్నది సాధించాలని తెలుపుతూ మిత్రునికి లేఖ రాయండి.</p>
                </div>
                
                <p className="text-center font-bold text-[#e6007e]">(లేదా)</p>
                
                <div className="flex gap-3">
                  <span className="font-bold">ఆ)</span>
                  <p>మీరు చేసిన ఒక ప్రయాణ అనుభవాన్ని వివరిస్తూ వ్యాసం రాయండి.</p>
                </div>
              </div>

              <div className="pt-2">
                <textarea
                  className="w-full h-64 border border-[#d1c4e0] rounded p-4 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-[#f8f5fb] text-[15px] leading-relaxed"
                  placeholder="మీ సృజనాత్మక జవాబు ఇక్కడ రాయండి..."
                  value={answers["sec4-q1"] || ""}
                  onChange={(e) => handleAnswerChange("sec4-q1", e.target.value)}
                />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Section V */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-4 bg-[#1e1b4b] text-white w-fit pr-6 py-1">
          <div className="px-4 font-serif font-bold text-lg">V</div>
          <h2 className="font-bold text-lg">పదజాల వినియోగం</h2>
        </div>

        <div className="space-y-8 pl-4 md:pl-8">
          
          {/* Question 1: Multiple Choice */}
          <div className="flex gap-4">
            <span className="text-[#e6007e] font-bold">1.</span>
            <div className="flex-1 space-y-6">
              <p className="text-[#e6007e] font-bold">కింది వాక్యాల్లో గీతగీసిన పదానికి తగిన అర్థాన్ని గుర్తించండి.</p>
              
              {/* Q1 a */}
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-3">
                    <span className="font-bold">అ)</span>
                    <p>పై చదువుకు సరిపడా <span className="underline decoration-[#1e1b4b] underline-offset-4">ద్రవ్యం</span> నావద్ద లేకుండె.</p>
                  </div>
                  <div className="flex items-center gap-1 font-bold">
                    (
                    <input
                      type="text"
                      maxLength={1}
                      className="w-6 text-center border-b border-[#b2a1c7] focus:outline-none focus:border-[#e6007e] bg-transparent text-[#e6007e]"
                      value={answers["sec5-q1-a"] || ""}
                      onChange={(e) => handleAnswerChange("sec5-q1-a", e.target.value)}
                    />
                    )
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-2 pl-8 text-[#4a4a4a]">
                  <span>అ) శక్తి</span>
                  <span>ఆ) సామర్థ్యం</span>
                  <span>ఇ) డబ్బు</span>
                  <span>ఈ) వస్తువు</span>
                </div>
              </div>

              {/* Q1 aa */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-3">
                    <span className="font-bold">ఆ)</span>
                    <p>నా మిత్రునికి సహాయపడతానని నేను <span className="underline decoration-[#1e1b4b] underline-offset-4">వాగ్దానం</span> చేశాను.</p>
                  </div>
                  <div className="flex items-center gap-1 font-bold">
                    (
                    <input
                      type="text"
                      maxLength={1}
                      className="w-6 text-center border-b border-[#b2a1c7] focus:outline-none focus:border-[#e6007e] bg-transparent text-[#e6007e]"
                      value={answers["sec5-q1-aa"] || ""}
                      onChange={(e) => handleAnswerChange("sec5-q1-aa", e.target.value)}
                    />
                    )
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-2 pl-8 text-[#4a4a4a]">
                  <span>అ) మాటతీసుకొను</span>
                  <span>ఆ) మాటయిచ్చు</span>
                  <span>ఇ) మాట మార్చు</span>
                  <span>ఈ) డబ్బు యిచ్చు</span>
                </div>
              </div>

            </div>
          </div>

          {/* Question 2: Idioms */}
          <div className="flex gap-4">
            <span className="text-[#e6007e] font-bold">2.</span>
            <div className="flex-1 space-y-4">
              <p className="text-[#e6007e] font-bold">కింది జాతీయాలను సొంతవాక్యాలలో రాయండి.</p>
              
              <div className="pl-4 space-y-6">
                <div className="space-y-1">
                  <p className="font-bold">ఉదా:- అందెవేసిన చేయి</p>
                  <p className="text-[#4a4a4a]">సీసపద్యాలు రాయడంలో శ్రీనాథుడిది అందెవేసిన చేయి.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="font-bold">అ)</span>
                    <p className="font-bold">పట్టరాని సంతోషం</p>
                  </div>
                  <div className="pl-8">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-400 p-2 focus:outline-none focus:border-[#e6007e] bg-transparent text-[15px] italic text-[#3e3470]"
                      placeholder="సొంతవాక్యం రాయండి..."
                      value={answers["sec5-q2-a"] || ""}
                      onChange={(e) => handleAnswerChange("sec5-q2-a", e.target.value)}
                    />
                  </div>
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
          18
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
