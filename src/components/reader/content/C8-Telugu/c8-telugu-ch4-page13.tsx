"use client";

import React, { useState, useEffect } from "react";

export function C8TeluguCh4Page13() {
  const [q5, setQ5] = useState<Record<string, string>>({});
  const [checklist, setChecklist] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedQ5 = localStorage.getItem("c8-telugu-ch4-p13-q5");
    if (savedQ5) setQ5(JSON.parse(savedQ5));

    const savedChecklist = localStorage.getItem("c8-telugu-ch4-p13-checklist");
    if (savedChecklist) setChecklist(JSON.parse(savedChecklist));
  }, []);

  const handleQ5Change = (id: string, value: string) => {
    const newAnswers = { ...q5, [id]: value };
    setQ5(newAnswers);
    localStorage.setItem("c8-telugu-ch4-p13-q5", JSON.stringify(newAnswers));
  };

  const handleChecklistChange = (id: string, value: string) => {
    const newAnswers = { ...checklist, [id]: value };
    setChecklist(newAnswers);
    localStorage.setItem("c8-telugu-ch4-p13-checklist", JSON.stringify(newAnswers));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Grammar Examples Continuation */}
      <div className="space-y-6 pl-4 md:pl-12 pt-4">
        <div className="pl-6 space-y-4">
          <div className="space-y-1">
            <p>ఆ) దివ్య అక్క. శైలజ చెల్లెలు.</p>
            <p className="pl-8 text-[#2f2b66]">దివ్య, శైలజ అక్కాచెల్లెళ్ళు - రెండు నామపదాలు ఒకేచోట చేరి చివర బహువచనం చేరడం.</p>
          </div>
          
          <div className="space-y-1 pt-2">
            <p>ఇ) రామయ్య వ్యవసాయదారుడా? రామయ్య ఉద్యోగస్థుడా?</p>
            <p className="pl-8 text-[#2f2b66]">రామయ్య వ్యవసాయదారుడా? ఉద్యోగస్థుడా? - రెండు నామవాచకాలలో ఒకటి లోపించడం.</p>
          </div>

          <div className="space-y-1 pt-2">
            <p>ఈ) ఆయన డాక్టరా? ఆయన ప్రొఫెసరా?</p>
            <p className="pl-8 text-[#2f2b66]">ఆయన డాక్టరా, ప్రొఫెసరా? - రెండు సర్వనామాలలో ఒకటి లోపించటం.</p>
          </div>
        </div>

        {/* Q5 */}
        <div className="space-y-4 pt-4">
          <p className="text-[#e6007e] font-bold">5. కింది సామాన్య వాక్యాలను సంయుక్త వాక్యాలుగా మార్చి రాయండి.</p>
          <div className="pl-6 space-y-5">
            <div className="space-y-2">
              <p>అ) వారు గొప్పవారు. వారు తెలివైనవారు.</p>
              <div className="border-b-2 border-black/50 max-w-2xl">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q5["a"] || ""} onChange={(e) => handleQ5Change("a", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <p>ఆ) సుధ మాట్లాడదు. సుధ చేసి చూపిస్తుంది.</p>
              <div className="border-b-2 border-black/50 max-w-2xl">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q5["b"] || ""} onChange={(e) => handleQ5Change("b", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <p>ఇ) మేము రాము. మేము తేలేము.</p>
              <div className="border-b-2 border-black/50 max-w-2xl">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q5["c"] || ""} onChange={(e) => handleQ5Change("c", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Work Box */}
      <div className="pt-8 relative">
        <div className="border-2 border-[#2f2b66] rounded-xl p-8 pt-10 shadow-[4px_4px_0px_0px_rgba(47,43,102,0.2)] bg-[#f8f9fc]">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-8 py-2 rounded-full font-bold shadow-md">
            భాషాకార్యకలాపాలు / ప్రాజెక్టు పని
          </div>
          
          <div className="space-y-4 text-justify mt-2">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-black rotate-45 shrink-0 mt-2.5"></div>
              <p>వివిధ వృత్తిపనులవారు పాడుకొనే పాటలను సేకరించండి. ఒక పాటపై మీ అభిప్రాయం ఆధారంగా నివేదిక రాయండి, ప్రదర్శించండి.</p>
            </div>
            <p className="text-center font-bold text-gray-500">(లేదా)</p>
            <p className="pl-4">మీకు తెలిసిన వృత్తిపనివారిని కలవండి. వారు ఎదుర్కొంటున్న కష్టాలు, సమస్యల గురించి నివేదిక రాయండి.</p>
          </div>
        </div>
      </div>

      {/* Can I do this Box */}
      <div className="pt-10 relative">
        <div className="border-2 border-[#2f2b66] rounded-xl p-8 pt-10 shadow-[4px_4px_0px_0px_rgba(47,43,102,0.2)] bg-white">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-8 py-2 rounded-full font-bold shadow-md">
            నేనివి చేయగలనా?
          </div>
          
          <div className="space-y-6 mt-2">
            {[
              { id: "1", text: "1. చేతి వృత్తుల గొప్పదనం గురించి మాట్లాడగలను." },
              { id: "2", text: "2. అపరిచిత పేరాను చదివి వివరాల ఆధారంగా పట్టిక నమోదు చేయగలను." },
              { id: "3", text: "3. ఇంటర్వ్యూ చేయడానికి ప్రశ్నావళిని తయారుచేయగలను." },
              { id: "4", text: "4. వృత్తి పనివారి కష్టనష్టాల గురించి నివేదిక రాయగలను." }
            ].map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="flex-1">{item.text}</p>
                <div className="flex bg-gray-100 rounded-full p-1 self-start sm:self-auto border border-gray-200">
                  <button
                    onClick={() => handleChecklistChange(item.id, "yes")}
                    className={`px-4 py-1 rounded-full transition-colors ${
                      checklist[item.id] === "yes" 
                        ? "bg-[#4CAF50] text-white font-bold shadow-sm" 
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    అవును
                  </button>
                  <button
                    onClick={() => handleChecklistChange(item.id, "no")}
                    className={`px-4 py-1 rounded-full transition-colors ${
                      checklist[item.id] === "no" 
                        ? "bg-[#F44336] text-white font-bold shadow-sm" 
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    కాదు
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Box */}
      <div className="pt-8 pb-4 flex justify-center">
        <div className="border border-[#2f2b66] rounded-xl flex max-w-xl shadow-[4px_4px_0px_0px_rgba(47,43,102,0.2)] bg-[#f8f9fc] overflow-hidden">
          <div className="bg-[#2f2b66] text-white flex items-center justify-center p-6 w-24">
            <span className="font-bold text-lg rotate-[-90deg] md:rotate-0 tracking-widest md:tracking-normal">సూక్తి</span>
          </div>
          <div className="p-6 flex flex-col justify-center flex-1">
            <p className="text-center font-bold text-lg text-[#1e1b4b]">&quot;నైపుణ్యానికి సహాయపడేవి నిరంతర శ్రమ మరియు సాధనే&quot;</p>
            <p className="text-right font-bold mt-4 text-gray-700">- ఋగ్వేదం</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4 clear-both">
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          42
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
