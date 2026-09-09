"use client";

import { useState, useEffect } from "react";

export function C8TeluguCh2Page10() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch2-p28-answers");
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
      localStorage.setItem("c8-telugu-ch2-p28-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Top Section: Idioms (Continued) */}
      <div className="space-y-8 pl-12 md:pl-16 pt-4">
        {[
          { id: "sec5-q2-aa", prefix: "ఆ)", text: "దేవునిపై భారం వేయు" },
          { id: "sec5-q2-i", prefix: "ఇ)", text: "గుండెజల్లుమను" },
          { id: "sec5-q2-ii", prefix: "ఈ)", text: "చెమటలుపట్టు" }
        ].map((q) => (
          <div key={q.id} className="space-y-4 w-full max-w-[600px]">
            <div className="flex gap-4">
              <span className="font-bold">{q.prefix}</span>
              <p className="font-bold text-[#4a4a4a]">{q.text}</p>
            </div>
            <div className="pl-8">
              <input
                type="text"
                className="w-full border-b-2 border-gray-400 p-2 focus:outline-none focus:border-[#e6007e] bg-transparent text-[15px] italic text-[#3e3470]"
                placeholder="సొంతవాక్యం రాయండి..."
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Section VI */}
      <div className="space-y-8 pt-8">
        <div className="flex items-center gap-4 bg-[#1e1b4b] text-white w-fit pr-6 py-1">
          <div className="px-4 font-serif font-bold text-lg">VI</div>
          <h2 className="font-bold text-lg">భాషను గురించి తెలుసుకుందాం</h2>
        </div>

        <div className="space-y-12 pl-4 md:pl-8">
          
          {/* Question 1: Samasam */}
          <div className="flex gap-4">
            <span className="text-[#e6007e] font-bold">1.</span>
            <div className="flex-1 space-y-6">
              <p className="text-[#e6007e] font-bold">కింది వాక్యాలలో గీత గీసిన పదాలు ఏ సమాసాలో గుర్తించి, వాటి పేర్లు రాయండి.</p>
              
              <div className="space-y-5">
                {[
                  { id: "sec6-q1-a", prefix: "అ)", pre: "ఆదిశేషునికి ", word: "వేయితలలు", post: "." },
                  { id: "sec6-q1-aa", prefix: "ఆ)", pre: "", word: "కృష్ణార్జునులు", post: " సిద్ధమైనారు." },
                  { id: "sec6-q1-i", prefix: "ఇ)", pre: "రవి, రాము ", word: "అన్నదమ్ములు", post: "." },
                  { id: "sec6-q1-ii", prefix: "ఈ)", pre: "వారానికి ", word: "ఏడురోజులు", post: "." },
                  { id: "sec6-q1-u", prefix: "ఉ)", pre: "", word: "నూరేండ్లు", post: " జీవించు." }
                ].map((q) => (
                  <div key={q.id} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 w-full max-w-[700px]">
                    <div className="flex gap-3 md:w-[300px] shrink-0 text-[#4a4a4a]">
                      <span className="font-bold">{q.prefix}</span>
                      <p>
                        {q.pre}
                        <span className="underline decoration-[#1e1b4b] underline-offset-4">{q.word}</span>
                        {q.post}
                      </p>
                    </div>
                    <div className="flex-1 ml-8 md:ml-0">
                      <input
                        type="text"
                        className="w-full border-b border-gray-400 p-1 focus:outline-none focus:border-[#e6007e] bg-transparent text-[15px] italic text-[#3e3470]"
                        placeholder="సమాసం పేరు..."
                        value={answers[q.id] || ""}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question 2: Sandhi Splitting */}
          <div className="flex gap-4">
            <span className="text-[#e6007e] font-bold">2.</span>
            <div className="flex-1 space-y-6">
              <p className="text-[#e6007e] font-bold">కింది పదాలను విడదీసి సంధిపేరు రాయండి.</p>
              
              <div className="space-y-5">
                {[
                  { id: "sec6-q2-a", prefix: "అ)", word: "విద్యాభ్యాసం" },
                  { id: "sec6-q2-aa", prefix: "ఆ)", word: "మొదలయింది" },
                  { id: "sec6-q2-i", prefix: "ఇ)", word: "విద్యార్థులు" },
                  { id: "sec6-q2-ii", prefix: "ఈ)", word: "ఏదైనా" },
                  { id: "sec6-q2-u", prefix: "ఉ)", word: "వారందరు" }
                ].map((q) => (
                  <div key={q.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 w-full max-w-[800px] text-[#4a4a4a] font-bold">
                    <div className="flex gap-3 w-[140px] shrink-0">
                      <span>{q.prefix}</span>
                      <p>{q.word}</p>
                    </div>
                    <span>=</span>
                    <input
                      type="text"
                      className="w-[100px] border-b border-gray-400 p-1 focus:outline-none focus:border-[#e6007e] bg-transparent text-center font-normal italic text-[#3e3470]"
                      value={answers[`${q.id}-part1`] || ""}
                      onChange={(e) => handleAnswerChange(`${q.id}-part1`, e.target.value)}
                    />
                    <span>+</span>
                    <input
                      type="text"
                      className="w-[100px] border-b border-gray-400 p-1 focus:outline-none focus:border-[#e6007e] bg-transparent text-center font-normal italic text-[#3e3470]"
                      value={answers[`${q.id}-part2`] || ""}
                      onChange={(e) => handleAnswerChange(`${q.id}-part2`, e.target.value)}
                    />
                    <span>=</span>
                    <input
                      type="text"
                      className="flex-1 min-w-[150px] max-w-[200px] border-b border-gray-400 p-1 focus:outline-none focus:border-[#e6007e] bg-transparent text-center font-normal italic text-[#3e3470]"
                      placeholder="సంధి పేరు"
                      value={answers[`${q.id}-sandhi`] || ""}
                      onChange={(e) => handleAnswerChange(`${q.id}-sandhi`, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Atva Sandhi Badge */}
          <div className="flex justify-center pt-4 pr-16 md:pr-48">
            <div className="border border-[#1e1b4b] rounded-full px-6 py-1 bg-[#f2eef6]">
              <span className="font-bold text-[#1e1b4b] text-lg">అత్వసంధి</span>
            </div>
          </div>

          {/* Final Section: Examples */}
          <div className="flex gap-4 pb-4">
            <span className="text-[#e6007e] text-xl font-bold leading-none pt-1">*</span>
            <div className="flex-1 space-y-4">
              <p className="text-[#e6007e] font-bold">కింది పదాలను పరిశీలించండి.</p>
              
              <div className="space-y-4 text-[#4a4a4a]">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-3 w-[150px]">
                    <span className="font-bold">అ)</span>
                    <p>రామయ్య</p>
                  </div>
                  <span>=</span>
                  <p>రామ + అయ్య</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex gap-3 w-[150px]">
                    <span className="font-bold">ఆ)</span>
                    <p>మేనత్త / మేనయత్త</p>
                  </div>
                  <span>=</span>
                  <p>మేన + అత్త</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex gap-3 w-[150px]">
                    <span className="font-bold">ఇ)</span>
                    <p>సెలయేరు</p>
                  </div>
                  <span>=</span>
                  <p>సెల + ఏరు</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex gap-3 w-[150px]">
                    <span className="font-bold">ఈ)</span>
                    <p>ఒకానొక</p>
                  </div>
                  <span>=</span>
                  <p>ఒక + ఒక</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          19
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
