"use client";

import React, { useState, useEffect } from "react";

export function C8TeluguCh4Page12() {
  const [q1, setQ1] = useState<Record<string, string>>({});
  const [q3, setQ3] = useState<Record<string, string>>({});
  const [q4, setQ4] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedQ1 = localStorage.getItem("c8-telugu-ch4-p12-q1");
    if (savedQ1) setQ1(JSON.parse(savedQ1));

    const savedQ3 = localStorage.getItem("c8-telugu-ch4-p12-q3");
    if (savedQ3) setQ3(JSON.parse(savedQ3));

    const savedQ4 = localStorage.getItem("c8-telugu-ch4-p12-q4");
    if (savedQ4) setQ4(JSON.parse(savedQ4));
  }, []);

  const handleQ1Change = (id: string, value: string) => {
    const newAnswers = { ...q1, [id]: value };
    setQ1(newAnswers);
    localStorage.setItem("c8-telugu-ch4-p12-q1", JSON.stringify(newAnswers));
  };

  const handleQ3Change = (id: string, value: string) => {
    const newAnswers = { ...q3, [id]: value };
    setQ3(newAnswers);
    localStorage.setItem("c8-telugu-ch4-p12-q3", JSON.stringify(newAnswers));
  };

  const handleQ4Change = (id: string, value: string) => {
    const newAnswers = { ...q4, [id]: value };
    setQ4(newAnswers);
    localStorage.setItem("c8-telugu-ch4-p12-q4", JSON.stringify(newAnswers));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Continuation of previous page */}
      <div className="space-y-6 pl-4 md:pl-12 pt-4">
        <div className="pl-6 space-y-4">
          <p>ఆ) అమ్మ నిద్ర లేచింది. అమ్మ ముఖం కడుక్కుంది.</p>
          <div className="border-b-2 border-black/50 max-w-2xl">
            <input
              type="text"
              className="w-full bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50"
              value={q1["b"] || ""}
              onChange={(e) => handleQ1Change("b", e.target.value)}
              placeholder="కలిపి రాసిన వాక్యం..."
            />
          </div>
          
          <p className="pt-2">ఇ) రవి ఊరికి వెళ్ళాడు. రవి మామిడి పండ్లు తెచ్చాడు.</p>
          <div className="border-b-2 border-black/50 max-w-2xl">
            <input
              type="text"
              className="w-full bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50"
              value={q1["c"] || ""}
              onChange={(e) => handleQ1Change("c", e.target.value)}
              placeholder="కలిపి రాసిన వాక్యం..."
            />
          </div>
        </div>

        <div className="space-y-4 text-justify pt-4 text-[14.5px]">
          <p>పై వాక్యాలను కలిపి రాసినప్పుడు ఏం జరిగిందో చెప్పండి.</p>
          <p>మొదటి వాక్యంలోని సమాపక క్రియ అసమాపక క్రియగా మారింది. కర్త పునరుక్తం కాలేదు.</p>
          <p>ఇట్లా రెండు లేక మూడు వాక్యాలు కలిపి రాసేటప్పుడు చివరి వాక్యంలోని సమాపక క్రియ అలాగే ఉంటుంది. 
          ముందు వాక్యాల్లోని సమాపక క్రియలు, అసమాపక క్రియలుగా మారుతాయి. కర్త పునరుక్తం కాదు. దీనినే 
          <strong>&apos;సంశ్లిష్ట వాక్యం&apos;</strong> అంటారు.</p>
        </div>

        {/* Q3 */}
        <div className="space-y-4 pt-4">
          <p className="text-[#e6007e] font-bold">3. కింది వాక్యాలను సంశ్లిష్ట వాక్యాలుగా రాయండి.</p>
          <div className="pl-6 space-y-5">
            <div className="space-y-2">
              <p>అ) రచిత అన్నం తిన్నది. రచిత బడికి వెళ్ళింది.</p>
              <div className="border-b-2 border-black/50 max-w-2xl">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q3["a"] || ""} onChange={(e) => handleQ3Change("a", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <p>ఆ) వాళ్ళు రైలు దిగారు. వాళ్ళు ఆటో ఎక్కారు.</p>
              <div className="border-b-2 border-black/50 max-w-2xl">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q3["b"] || ""} onChange={(e) => handleQ3Change("b", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <p>ఇ) రాజన్న లడ్డూలు తెచ్చాడు. రాజన్న అందరికీ పంచాడు.</p>
              <div className="border-b-2 border-black/50 max-w-2xl">
                <input type="text" className="w-full bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q3["c"] || ""} onChange={(e) => handleQ3Change("c", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Samyukta Vakyam Section */}
      <div className="pt-6">
        <div className="flex justify-center my-6">
          <div className="border border-[#2f2b66] rounded-full px-6 py-2 bg-blue-50/50">
            <span className="text-[#2f2b66] font-bold text-lg">సంయుక్త వాక్యం</span>
          </div>
        </div>

        <div className="space-y-6 pl-4 md:pl-12">
          <div className="space-y-4">
            <div className="flex items-start gap-2 text-[#e6007e] font-bold">
              <span>*</span>
              <p>కింది వాక్యాలు చదువండి. కలిపి రాసిన విధానం పరిశీలించండి.</p>
            </div>
            <div className="pl-6 space-y-2">
              <p>ఉదా: రైలు వచ్చింది. చుట్టాలు రాలేదు.</p>
              <p className="pl-8 text-[#2f2b66]">రైలు వచ్చింది కానీ చుట్టాలు రాలేదు.</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <p className="text-[#e6007e] font-bold">4. కింది వాక్యాలను కలిపి రాయండి.</p>
            <div className="pl-6 space-y-5">
              <div className="space-y-2">
                <p>అ) వర్షాలు కురిసాయి. పంటలు బాగా పండాయి.</p>
                <div className="border-b-2 border-black/50 max-w-2xl">
                  <input type="text" className="w-full bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q4["a"] || ""} onChange={(e) => handleQ4Change("a", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <p>ఆ) అతనికి కనిపించదు. అతడు చదువలేడు.</p>
                <div className="border-b-2 border-black/50 max-w-2xl">
                  <input type="text" className="w-full bg-transparent outline-none px-2 py-1 focus:bg-blue-50/50" value={q4["b"] || ""} onChange={(e) => handleQ4Change("b", e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-justify pt-6 text-[14.5px]">
            <p>పై వాక్యాలను కలిపి రాసినప్పుడు ఏం జరిగిందో చెప్పండి.</p>
            <p>పై వాక్యాలను కలిపి రాసేటప్పుడు క్రియలలో మార్పురాలేదు. వాక్యాలమధ్య కొన్ని అనుసంధాన పదాలు వచ్చాయి. 
            ఇట్లా రెండు వాక్యాలను కలిపి రాసేటప్పుడు క్రియలలో మార్పు లేకుండా మధ్యలో అనుసంధాన పదాలు రాస్తే అవి 
            <strong>&apos;సంయుక్త వాక్యాలు&apos;</strong> అవుతాయి. అనుసంధాన పదాలు అంటే <strong>కావున, కానీ, మరియు, అందువల్ల</strong> మొదలైనవి.</p>
          </div>

          <div className="space-y-4 pt-6">
            <div className="flex items-start gap-2 text-[#e6007e] font-bold">
              <span>*</span>
              <p>సంయుక్తవాక్యంగా మారేటప్పుడు వాక్యాల్లో వచ్చే మరికొన్ని మార్పులు ఎట్లా ఉంటాయో గమనించండి.</p>
            </div>
            <div className="pl-6 space-y-2">
              <p>అ) వనజ చురుకైనది. వనజ అందమైనది.</p>
              <p className="pl-6 text-[#2f2b66]">వనజ చురుకైనది, అందమైనది. రెండు నామ పదాల్లో ఒకటి లోపించడం.</p>
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
          41
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
