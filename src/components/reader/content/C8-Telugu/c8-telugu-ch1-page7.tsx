"use client";

import { useState, useEffect } from "react";

export function C8TeluguCh1Page7() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch1-p17-answers");
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
      localStorage.setItem("c8-telugu-ch1-p17-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Section III */}
      <div className="space-y-6">
        <div className="flex">
          <div className="bg-[#2f2b66] text-white px-4 py-1.5 font-bold text-xl mr-0.5">III</div>
          <div className="bg-[#2f2b66] text-white px-6 py-1.5 font-bold text-lg flex-1">
            స్వీయరచన
          </div>
        </div>
        
        <div className="space-y-8 px-4">
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="font-bold text-[#e6007e]">1.</span>
              <p className="font-bold text-[#e6007e]">కింది ప్రశ్నలకు ఐదేసి వాక్యాల్లో జవాబులు రాయండి.</p>
            </div>
            
            <div className="space-y-6 ml-6">
              {[
                { id: "p17-sec3-q1-a", label: "అ) ఇతరులు ఆహారం తినేటప్పుడు ఎందుకు విఘ్నం కలిగించకూడదో రాయండి." },
                { id: "p17-sec3-q1-b", label: "ఆ) 'అందరూ ధర్మాన్ని ఆచరించాలి' అనే విషయాన్ని సమర్థిస్తూ రాయండి." },
                { id: "p17-sec3-q1-c", label: "ఇ) ఇతరుల కొరకు మనం ఎట్లాంటి త్యాగాలను చేయవచ్చో రాయండి." },
                { id: "p17-sec3-q1-d", label: "ఈ) 'త్యాగనిరతి' అనే శీర్షిక పాఠానికి ఏవిధంగా తగినదో రాయండి." }
              ].map((q) => (
                <div key={q.id} className="space-y-2">
                  <p className="font-medium">{q.label}</p>
                  <textarea
                    className="w-full h-24 border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#e6007e] shadow-inner resize-none bg-yellow-50/50"
                    placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="font-bold text-[#e6007e]">2.</span>
              <p className="font-bold text-[#e6007e]">కింది ప్రశ్నకు పది వాక్యాల్లో జవాబు రాయండి.</p>
            </div>
            <div className="space-y-2 ml-6">
              <p className="font-medium">అ) త్యాగం చేయటంలో ఉన్న గొప్పతనాన్ని, అనుభూతిని వివరించండి.</p>
              <textarea
                className="w-full h-32 border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#e6007e] shadow-inner resize-none bg-yellow-50/50"
                placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                value={answers["p17-sec3-q2-a"] || ""}
                onChange={(e) => handleAnswerChange("p17-sec3-q2-a", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section IV */}
      <div className="space-y-6 pt-4">
        <div className="flex">
          <div className="bg-[#2f2b66] text-white px-4 py-1.5 font-bold text-xl mr-0.5">IV</div>
          <div className="bg-[#2f2b66] text-white px-6 py-1.5 font-bold text-lg flex-1">
            సృజనాత్మకత / ప్రశంస
          </div>
        </div>

        <div className="space-y-4 px-4">
          <div className="flex gap-4 items-start">
            <span className="font-bold text-[#e6007e]">1.</span>
            <p className="font-bold text-[#e6007e]">కింది ప్రశ్నకు జవాబును సృజనాత్మకంగా రాయండి.</p>
          </div>
          <div className="space-y-2 ml-6">
            <p className="font-medium text-justify">అ) అన్ని దానాల్లోకెల్ల అన్నదానం గొప్పది. శరీరంలోని అవయవదానం ఇంకా గొప్పది. అవయవదానంపై ప్రజలకు చైతన్యం కలిగించుమని వార్తా పత్రికలకు లేఖ రాయండి.</p>
            <textarea
              className="w-full h-40 border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#e6007e] shadow-inner resize-none bg-yellow-50/50"
              placeholder="మీ జవాబు ఇక్కడ రాయండి..."
              value={answers["p17-sec4-q1-a"] || ""}
              onChange={(e) => handleAnswerChange("p17-sec4-q1-a", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section V */}
      <div className="space-y-6 pt-4">
        <div className="flex">
          <div className="bg-[#2f2b66] text-white px-4 py-1.5 font-bold text-xl mr-0.5">V</div>
          <div className="bg-[#2f2b66] text-white px-6 py-1.5 font-bold text-lg flex-1">
            పదజాల వినియోగం
          </div>
        </div>

        <div className="space-y-8 px-4">
          {/* V.1 */}
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="font-bold text-[#e6007e]">1.</span>
              <p className="font-bold text-[#e6007e]">గీత గీసిన పదాలకు అర్థాలను రాయండి.</p>
            </div>
            
            <div className="ml-8 space-y-4 font-medium">
              <div className="text-gray-700 italic border-l-2 border-gray-300 pl-4 py-1 mb-4">
                ఉదా: <span className="underline decoration-gray-400 underline-offset-4">కపోతములు</span> శాంతికి చిహ్నలని భావిస్తారు.<br/>
                కపోతములు = పావురములు
              </div>

              {[
                { id: "p17-sec5-q1-a", prefix: "అ) ", word: "ఆశ్రితులను", suffix: " వదలి వేయుట ధర్మవు కాదు." },
                { id: "p17-sec5-q1-b", prefix: "ఆ) ఉత్తముడు ", word: "పరుల", suffix: " హితమునే కోరతాడు." },
                { id: "p17-sec5-q1-c", prefix: "ఇ) ఎందరో మహానుభావుల ", word: "పరిత్యాగం", suffix: " వల్లనే తెలంగాణా రాష్ట్రం సిద్ధించింది." },
                { id: "p17-sec5-q1-d", prefix: "ఈ) దేశంలో సుఖశాంతులు ", word: "వర్ధిల్లుగాక", suffix: "!" },
                { id: "p17-sec5-q1-e", prefix: "ఉ) ", word: "బుభుక్షితుడు", suffix: " రుచిని పట్టించుకోకుండా ఆరగిస్తాడు." }
              ].map((q) => (
                <div key={q.id} className="space-y-2">
                  <p>
                    {q.prefix}<span className="underline decoration-[#e6007e] underline-offset-4 decoration-2">{q.word}</span>{q.suffix}
                  </p>
                  <div className="flex items-center gap-2 pl-4">
                    <span className="text-gray-600 font-bold">{q.word} = </span>
                    <input
                      type="text"
                      className="flex-1 max-w-xs border-b border-gray-400 bg-transparent px-2 py-1 focus:outline-none focus:border-[#2f2b66] focus:border-b-2 text-[#2f2b66]"
                      value={answers[q.id] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      placeholder="అర్థం..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* V.2 */}
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="font-bold text-[#e6007e]">2.</span>
              <p className="font-bold text-[#e6007e]">కింది వాక్యాలలోని నానార్థాలను గుర్తించి రాయండి.</p>
            </div>
            
            <div className="ml-8 space-y-6 font-medium">
              <div className="text-gray-700 italic border-l-2 border-gray-300 pl-4 py-1 mb-4">
                ఉదా: ఈ సంవత్సరం వానలు తక్కువగా ఉన్నాయి.<br/>
                వర్షం = సంవత్సరం, వాన
              </div>

              <div className="space-y-2">
                <p>అ) న్యాయంగా ఆలోచిస్తే పాలల్లో నీళ్ళు కలపడం ధర్మం కాదు.</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 pl-4">
                  <span className="text-gray-600 font-bold">పాడి :</span>
                  <div className="flex items-center gap-2 flex-1 max-w-md">
                    <input
                      type="text"
                      className="flex-1 border-b border-gray-400 bg-transparent px-2 py-1 focus:outline-none focus:border-[#2f2b66] focus:border-b-2 text-[#2f2b66]"
                      value={answers["p17-sec5-q2-a-1"] || ""}
                      onChange={(e) => handleAnswerChange("p17-sec5-q2-a-1", e.target.value)}
                    />
                    <span className="font-bold text-gray-500">;</span>
                    <input
                      type="text"
                      className="flex-1 border-b border-gray-400 bg-transparent px-2 py-1 focus:outline-none focus:border-[#2f2b66] focus:border-b-2 text-[#2f2b66]"
                      value={answers["p17-sec5-q2-a-2"] || ""}
                      onChange={(e) => handleAnswerChange("p17-sec5-q2-a-2", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p>ఆ) అడవిలోని జంతువులకు నీరు కరువవుతున్నది.</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 pl-4">
                  <span className="text-gray-600 font-bold">వనం :</span>
                  <div className="flex items-center gap-2 flex-1 max-w-md">
                    <input
                      type="text"
                      className="flex-1 border-b border-gray-400 bg-transparent px-2 py-1 focus:outline-none focus:border-[#2f2b66] focus:border-b-2 text-[#2f2b66]"
                      value={answers["p17-sec5-q2-b-1"] || ""}
                      onChange={(e) => handleAnswerChange("p17-sec5-q2-b-1", e.target.value)}
                    />
                    <span className="font-bold text-gray-500">;</span>
                    <input
                      type="text"
                      className="flex-1 border-b border-gray-400 bg-transparent px-2 py-1 focus:outline-none focus:border-[#2f2b66] focus:border-b-2 text-[#2f2b66]"
                      value={answers["p17-sec5-q2-b-2"] || ""}
                      onChange={(e) => handleAnswerChange("p17-sec5-q2-b-2", e.target.value)}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          8
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
