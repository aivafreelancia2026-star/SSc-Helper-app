"use client";

import { useState, useEffect } from "react";

export function C8TeluguCh1Page8() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch1-p18-answers");
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
      localStorage.setItem("c8-telugu-ch1-p18-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Section VI */}
      <div className="space-y-6">
        <div className="flex">
          <div className="bg-[#2f2b66] text-white px-4 py-1.5 font-bold text-xl mr-0.5">VI</div>
          <div className="bg-[#2f2b66] text-white px-6 py-1.5 font-bold text-lg flex-1">
            భాషను గురించి తెలుసుకుందాం
          </div>
        </div>

        <div className="space-y-8 px-4">
          
          {/* Question 1: Matching */}
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="font-bold text-[#e6007e]">1.</span>
              <p className="font-bold text-[#e6007e]">కింది వాక్యాలను చదువండి. అవి ఎటువంటి వాక్యాలో గుర్తించి జతపరచండి.</p>
            </div>
            
            <div className="ml-8 space-y-4 font-medium">
              <div className="text-gray-700 italic">
                ఉదా: లోపలికి రావచ్చు - అనుమత్యర్థక వాక్యం
              </div>

              <div className="grid grid-cols-1 gap-3 max-w-2xl text-[15px]">
                {[
                  { id: "p18-match-a", left: "అ) దయచేసి వినండి", right: "1. ఆశ్చర్యార్థక వాక్యం" },
                  { id: "p18-match-b", left: "ఆ) రమ చక్కగా రాయగలదు", right: "2. ప్రశ్నార్థక వాక్యం" },
                  { id: "p18-match-c", left: "ఇ) ఆహా! ఎంత బాగుందో", right: "3. సామర్థ్యార్థక వాక్యం" },
                  { id: "p18-match-d", left: "ఈ) అల్లరి చేయవద్దు", right: "4. ప్రార్థనార్థక వాక్యం" },
                  { id: "p18-match-e", left: "ఉ) గిరి! ఎక్కడున్నావు?", right: "5. నిషేధార్థక వాక్యం" },
                ].map((item, index) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-4 w-[250px]">
                      <span>{item.left}</span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-gray-500 font-bold">(</span>
                      <select 
                        className="w-12 text-center text-[#e6007e] font-bold bg-transparent border-b border-dashed border-gray-400 focus:outline-none focus:border-[#2f2b66] cursor-pointer"
                        value={answers[item.id] || ""}
                        onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                      >
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <span className="text-gray-500 font-bold">)</span>
                    </div>
                    <div className="w-[200px] text-gray-700 sm:text-right text-left">
                      {item.right}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question 2: Sandhi Splitting */}
          <div className="space-y-4 pt-4">
            <div className="flex gap-4 items-start">
              <span className="font-bold text-[#e6007e]">2.</span>
              <p className="font-bold text-[#e6007e]">కింది పదాలను విడదీసి సంధి పేరు రాయండి.</p>
            </div>

            <div className="ml-8 space-y-4 font-medium max-w-3xl">
              {[
                { id: "p18-sandhi-a", word: "అ) ఇంద్రాగ్నులు" },
                { id: "p18-sandhi-b", word: "ఆ) త్యాగమిది" },
                { id: "p18-sandhi-c", word: "ఇ) ఆహారార్థం" },
                { id: "p18-sandhi-d", word: "ఈ) నేనెట్లు" },
                { id: "p18-sandhi-e", word: "ఉ) శౌర్యాది" },
              ].map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="w-32 flex-shrink-0">{item.word}</span>
                  <span className="hidden sm:inline font-bold text-gray-500">=</span>
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      className="w-24 sm:flex-1 border-b border-gray-400 bg-transparent px-2 py-1 text-center focus:outline-none focus:border-[#2f2b66] focus:border-b-2 text-[#2f2b66]"
                      value={answers[`${item.id}-1`] || ""}
                      onChange={(e) => handleAnswerChange(`${item.id}-1`, e.target.value)}
                    />
                    <span className="font-bold text-gray-500">+</span>
                    <input
                      type="text"
                      className="w-24 sm:flex-1 border-b border-gray-400 bg-transparent px-2 py-1 text-center focus:outline-none focus:border-[#2f2b66] focus:border-b-2 text-[#2f2b66]"
                      value={answers[`${item.id}-2`] || ""}
                      onChange={(e) => handleAnswerChange(`${item.id}-2`, e.target.value)}
                    />
                    <span className="font-bold text-gray-500">=</span>
                    <input
                      type="text"
                      className="w-32 sm:flex-1 border-b border-gray-400 bg-transparent px-2 py-1 text-center focus:outline-none focus:border-[#2f2b66] focus:border-b-2 text-[#2f2b66]"
                      value={answers[`${item.id}-3`] || ""}
                      onChange={(e) => handleAnswerChange(`${item.id}-3`, e.target.value)}
                      placeholder="సంధి పేరు"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Box 1: ప్రాజెక్టు పని */}
      <div className="relative pt-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-8 py-1.5 rounded-full font-bold text-[15px] z-10 shadow-md whitespace-nowrap">
          భాషాకార్యకలాపాలు / ప్రాజెక్టు పని
        </div>
        <div className="border-[3px] border-[#2f2b66] rounded-[24px] p-8 pt-10 bg-[#f8f8fb] shadow-[4px_4px_0px_rgba(47,43,102,0.2)]">
          <div className="flex gap-4 items-start">
            <span className="text-[#e6007e] text-xl leading-none mt-1">❖</span>
            <p className="font-medium text-justify">
              త్యాగబుద్ధి కలిగిన ఇద్దరు మహానీయుల వివరాలను లేదా కథలను లేదా సంఘటనలను సేకరించండి. నివేదిక రాసి తరగతిలో ప్రదర్శించండి.
            </p>
          </div>
        </div>
      </div>

      {/* Box 2: నేనివి చేయగలనా? */}
      <div className="relative pt-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-8 py-1.5 rounded-full font-bold text-[15px] z-10 shadow-md whitespace-nowrap">
          నేనివి చేయగలనా?
        </div>
        <div className="border-[3px] border-[#2f2b66] rounded-[24px] p-6 pt-10 bg-[#f8f8fb] shadow-[4px_4px_0px_rgba(47,43,102,0.2)]">
          <div className="space-y-4 font-medium">
            {[
              { id: "p18-can-do-1", text: "1. త్యాగంలోని గొప్పదనాన్ని సొంతమాటల్లో చెప్పగలను." },
              { id: "p18-can-do-2", text: "2. అపరిచిత పద్యాన్ని చదివి అర్థం చేసుకోగలను. సరైన జవాబులు గుర్తించగలను." },
              { id: "p18-can-do-3", text: "3. నిత్యజీవితంలో జరిగిన ఒక సంఘటనలోని త్యాగభావాన్ని గుర్తించగలను." },
              { id: "p18-can-do-4", text: "4. అవయవదానంపై ప్రజలకు చైతన్యం కలిగించుమని వార్తా పత్రికకు లేఖ రాయగలను." }
            ].map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                <p className="flex-1 pr-4">{item.text}</p>
                <div className="flex items-center bg-white rounded-full border border-[#2f2b66] overflow-hidden shrink-0 shadow-inner">
                  <button
                    className={`px-4 py-1.5 text-sm font-bold transition-colors ${answers[item.id] === 'yes' ? 'bg-[#2f2b66] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                    onClick={() => handleAnswerChange(item.id, 'yes')}
                  >
                    అవును
                  </button>
                  <div className="w-px h-full bg-[#2f2b66]"></div>
                  <button
                    className={`px-4 py-1.5 text-sm font-bold transition-colors ${answers[item.id] === 'no' ? 'bg-[#e6007e] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                    onClick={() => handleAnswerChange(item.id, 'no')}
                  >
                    కాదు
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Box 3: సూక్తి */}
      <div className="flex justify-center pt-8">
        <div className="border-[3px] border-[#2f2b66] rounded-xl flex overflow-hidden max-w-lg shadow-[4px_4px_0px_rgba(47,43,102,0.2)]">
          <div className="bg-[#2f2b66] text-white font-bold text-xl px-6 py-6 flex items-center justify-center">
            సూక్తి
          </div>
          <div className="bg-[#f8f8fb] px-8 py-6 font-bold text-lg text-center flex items-center justify-center text-[#1e1b4b]">
            త్యాగం వల్ల సదాచారం,<br/>
            సత్ప్రవర్తన వల్ల మానవజన్మ<br/>
            సార్థకమవుతాయి.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-12 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          9
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
