"use client";

import { useState, useEffect } from "react";

export function C8TeluguCh3Page6() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch3-p36-answers");
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
      localStorage.setItem("c8-telugu-ch3-p36-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Section II Continuation: Question 2 */}
      <div className="space-y-6 pl-4 md:pl-12 text-[#4a4a4a]">
        <div className="flex gap-4 items-start">
          <span className="font-bold text-[#e6007e] pt-1">2.</span>
          <div className="flex-1 space-y-6">
            <p className="font-bold text-[#e6007e]">
              కింది పద్యం చదువండి. ఖాళీలను పూరించండి.
            </p>
            
            <div className="pl-4 md:pl-12 text-[#2a87b8] font-bold leading-[2.2] text-[16px] space-y-1">
              <p>గంగిగోవు పాలు గరిటెడైనను చాలు</p>
              <p>కడివెడైన నేమి ఖరము పాలు</p>
              <p>భక్తిగలుగు కూడు పట్టెడైనను చాలు</p>
              <p>విశ్వదాభిరామ వినురవేమ!</p>
            </div>

            <div className="space-y-4 max-w-xl pl-2">
              <div className="flex items-center gap-3">
                <span className="font-bold">అ)</span>
                <p>ఖరము అంటే</p>
                <input
                  type="text"
                  className="flex-1 border-b border-[#2f2b66] border-dashed bg-transparent p-1 focus:outline-none focus:border-solid text-center"
                  value={answers["q-ii-2-a"] || ""}
                  onChange={(e) => handleAnswerChange("q-ii-2-a", e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">ఆ)</span>
                <p>కూడు అంటే</p>
                <input
                  type="text"
                  className="flex-1 border-b border-[#2f2b66] border-dashed bg-transparent p-1 focus:outline-none focus:border-solid text-center"
                  value={answers["q-ii-2-b"] || ""}
                  onChange={(e) => handleAnswerChange("q-ii-2-b", e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">ఇ)</span>
                <p>గంగిగోవు పాలను</p>
                <input
                  type="text"
                  className="flex-1 border-b border-[#2f2b66] border-dashed bg-transparent p-1 focus:outline-none focus:border-solid text-center"
                  value={answers["q-ii-2-c"] || ""}
                  onChange={(e) => handleAnswerChange("q-ii-2-c", e.target.value)}
                />
                <p>తో పోల్చాడు.</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">ఈ)</span>
                <p>ఈ పద్యాన్ని</p>
                <input
                  type="text"
                  className="flex-1 border-b border-[#2f2b66] border-dashed bg-transparent p-1 focus:outline-none focus:border-solid text-center"
                  value={answers["q-ii-2-d"] || ""}
                  onChange={(e) => handleAnswerChange("q-ii-2-d", e.target.value)}
                />
                <p>రాశాడు.</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">ఉ)</span>
                <p>ఈ పద్యం</p>
                <input
                  type="text"
                  className="flex-1 border-b border-[#2f2b66] border-dashed bg-transparent p-1 focus:outline-none focus:border-solid text-center"
                  value={answers["q-ii-2-e"] || ""}
                  onChange={(e) => handleAnswerChange("q-ii-2-e", e.target.value)}
                />
                <p>శతకంలోనిది.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Section III: స్వీయరచన */}
      <div className="space-y-6 pt-4 pl-4 md:pl-12">
        <div className="flex items-center gap-4 border-b-2 border-[#2f2b66] pb-2 max-w-[200px]">
          <div className="bg-[#2f2b66] text-white font-serif font-bold text-xl px-2 py-1">
            III
          </div>
          <h2 className="bg-[#2f2b66] text-white font-bold text-lg px-4 py-1 flex-1 text-center">
            స్వీయరచన
          </h2>
        </div>
        
        <div className="space-y-8 pl-4 md:pl-8 text-[#4a4a4a]">
          
          {/* Question 1 */}
          <div className="flex gap-4 items-start">
            <span className="font-bold text-[#e6007e] pt-1">1.</span>
            <div className="flex-1 space-y-6">
              <p className="font-bold text-[#e6007e]">
                కింది ప్రశ్నలకు ఐదేసి వాక్యాల్లో జవాబులు రాయండి.
              </p>
              
              <div className="space-y-8 pr-4">
                <div className="flex gap-3">
                  <span className="font-bold pt-1">అ)</span>
                  <div className="flex-1 space-y-2">
                    <p className="text-[#1e1b4b]">బండారి బసవన్న స్వభావాన్ని రాయండి.</p>
                    <textarea
                      className="w-full h-28 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#e6007e] shadow-inner resize-none bg-white text-[15px]"
                      placeholder="జవాబు..."
                      value={answers["q-iii-1-a"] || ""}
                      onChange={(e) => handleAnswerChange("q-iii-1-a", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="font-bold pt-1">ఆ)</span>
                  <div className="flex-1 space-y-2">
                    <p className="text-[#1e1b4b]">బండారి బసవన్న రాజుతో నిర్భయంగా మాట్లాడాడు కదా! ఇట్లా ఎప్పుడు నిర్భయంగా మాట్లాడగలుగుతారు?</p>
                    <textarea
                      className="w-full h-28 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#e6007e] shadow-inner resize-none bg-white text-[15px]"
                      placeholder="జవాబు..."
                      value={answers["q-iii-1-b"] || ""}
                      onChange={(e) => handleAnswerChange("q-iii-1-b", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="font-bold pt-1">ఇ)</span>
                  <div className="flex-1 space-y-2">
                    <p className="text-[#1e1b4b]">భక్తుడు పరధనాన్ని ఆశించడు. ఎందుకు?</p>
                    <textarea
                      className="w-full h-28 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#e6007e] shadow-inner resize-none bg-white text-[15px]"
                      placeholder="జవాబు..."
                      value={answers["q-iii-1-c"] || ""}
                      onChange={(e) => handleAnswerChange("q-iii-1-c", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="font-bold pt-1">ఈ)</span>
                  <div className="flex-1 space-y-2">
                    <p className="text-[#1e1b4b]">"క్షీరాబ్ధి లోపలఁ గ్రీడించు హంస గోరునే పడియల నీరు ద్రావంగ" అని బసవన్న అనడంలో గల ఉద్దేశం ఏమిటి?</p>
                    <textarea
                      className="w-full h-28 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#e6007e] shadow-inner resize-none bg-white text-[15px]"
                      placeholder="జవాబు..."
                      value={answers["q-iii-1-d"] || ""}
                      onChange={(e) => handleAnswerChange("q-iii-1-d", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="flex gap-4 items-start">
            <span className="font-bold text-[#e6007e] pt-1">2.</span>
            <div className="flex-1 space-y-6">
              <p className="font-bold text-[#e6007e]">
                కింది ప్రశ్నకు పది వాక్యాల్లో జవాబు రాయండి.
              </p>
              
              <div className="flex gap-3 pr-4">
                <span className="font-bold pt-1">అ)</span>
                <div className="flex-1 space-y-2">
                  <p className="text-[#1e1b4b]">బసవని గురించి తెలుసుకున్నారు కదా! భక్తుడికి ఉండవలసిన లక్షణాలు ఏమిటో రాయండి.</p>
                  <textarea
                    className="w-full h-48 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#e6007e] shadow-inner resize-none bg-white text-[15px]"
                    placeholder="10 వాక్యాల్లో జవాబు రాయండి..."
                    value={answers["q-iii-2-a"] || ""}
                    onChange={(e) => handleAnswerChange("q-iii-2-a", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Section IV: సృజనాత్మకత / ప్రశంస */}
      <div className="space-y-6 pt-6 pl-4 md:pl-12">
        <div className="flex items-center gap-4 border-b-2 border-[#2f2b66] pb-2 max-w-[320px]">
          <div className="bg-[#2f2b66] text-white font-serif font-bold text-xl px-2 py-1">
            IV
          </div>
          <h2 className="bg-[#2f2b66] text-white font-bold text-lg px-4 py-1 flex-1 text-center">
            సృజనాత్మకత / ప్రశంస
          </h2>
        </div>
        
        <div className="space-y-6 pl-4 md:pl-8 text-[#4a4a4a]">
          <div className="flex gap-4 items-start">
            <span className="font-bold text-[#e6007e] pt-1">1.</span>
            <div className="flex-1 space-y-4 pr-4">
              <p className="font-bold text-[#e6007e]">
                కింది ప్రశ్నకు జవాబును సృజనాత్మకంగా రాయండి.
              </p>
              
              <div className="flex gap-3">
                <span className="font-bold pt-1">అ)</span>
                <div className="flex-1 space-y-2">
                  <p className="text-[#1e1b4b]">ద్విపద రూపంలోనున్న ఈ పాఠ్యాంశ విషయాన్ని సంభాషణ రూపంలో రాయండి.</p>
                  <textarea
                    className="w-full h-48 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#e6007e] shadow-inner resize-none bg-white text-[15px]"
                    placeholder="సంభాషణ (Dialogue) రాయండి..."
                    value={answers["q-iv-1-a"] || ""}
                    onChange={(e) => handleAnswerChange("q-iv-1-a", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section V: పదజాల వినియోగం */}
      <div className="space-y-6 pt-6 pl-4 md:pl-12">
        <div className="flex items-center gap-4 border-b-2 border-[#2f2b66] pb-2 max-w-[250px]">
          <div className="bg-[#2f2b66] text-white font-serif font-bold text-xl px-3 py-1">
            V
          </div>
          <h2 className="bg-[#2f2b66] text-white font-bold text-lg px-4 py-1 flex-1 text-center">
            పదజాల వినియోగం
          </h2>
        </div>
        
        <div className="space-y-6 pl-4 md:pl-8 text-[#4a4a4a]">
          <div className="flex gap-4 items-start">
            <span className="font-bold text-[#e6007e] pt-1">1.</span>
            <div className="flex-1 space-y-6">
              <p className="font-bold text-[#e6007e]">
                గీత గీసిన పదానికి అర్థాన్ని రాయండి.
              </p>
              
              <div className="space-y-4 max-w-2xl pr-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <div className="flex gap-3 flex-1">
                    <span className="font-bold">అ)</span>
                    <p><u className="decoration-2 decoration-[#e6007e] underline-offset-4 font-bold">క్షీరాబ్ధి</u>ని మథించినప్పుడు అమృతం పుట్టింది.</p>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-[200px]">
                    <span className="font-bold">=</span>
                    <input
                      type="text"
                      className="flex-1 border-b border-[#2f2b66] border-dashed bg-transparent p-1 focus:outline-none focus:border-solid text-center"
                      value={answers["q-v-1-a"] || ""}
                      onChange={(e) => handleAnswerChange("q-v-1-a", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <div className="flex gap-3 flex-1">
                    <span className="font-bold">ఆ)</span>
                    <p>కొండ గుహలలో నివసించే <u className="decoration-2 decoration-[#e6007e] underline-offset-4 font-bold">మృగపతి</u> అడవికి రాజు.</p>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-[200px]">
                    <span className="font-bold">=</span>
                    <input
                      type="text"
                      className="flex-1 border-b border-[#2f2b66] border-dashed bg-transparent p-1 focus:outline-none focus:border-solid text-center"
                      value={answers["q-v-1-b"] || ""}
                      onChange={(e) => handleAnswerChange("q-v-1-b", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <div className="flex gap-3 flex-1">
                    <span className="font-bold">ఇ)</span>
                    <p><u className="decoration-2 decoration-[#e6007e] underline-offset-4 font-bold">పుడమీశులు</u> ప్రజలను చక్కగా పరిపాలించారు.</p>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-[200px]">
                    <span className="font-bold">=</span>
                    <input
                      type="text"
                      className="flex-1 border-b border-[#2f2b66] border-dashed bg-transparent p-1 focus:outline-none focus:border-solid text-center"
                      value={answers["q-v-1-c"] || ""}
                      onChange={(e) => handleAnswerChange("q-v-1-c", e.target.value)}
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
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          27
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
