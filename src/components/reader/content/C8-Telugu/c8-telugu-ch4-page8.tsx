"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh4Page8() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem("c8-telugu-ch4-p8-answers");
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading answers", e);
      }
    }
  }, []);

  const handleAnswerChange = (id: string, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    localStorage.setItem("c8-telugu-ch4-p8-answers", JSON.stringify(newAnswers));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Farmer Section */}
      <div className="relative text-justify leading-[2.2]">
        <div className="float-none md:float-right md:ml-6 mb-4 w-full md:w-[280px] h-[200px] relative bg-white overflow-hidden border border-gray-200 shadow-sm">
          <Image
            src="/c8-t-ch4-p8-farmer.png"
            alt="Farmer plowing field with oxen"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        
        <div className="text-[#1e1b4b] space-y-2 pl-4 md:pl-12 pt-2">
          <p className="leading-[2.2]">
            రైతే దేశానికి వెన్నెముక<br/>
            అతడలిగితే లేదు మనకు అన్నమిక
          </p>
          <p className="leading-[2.2] mt-4">
            కోటివిద్యలు అన్ని కూటికొరకన్నారు<br/>
            కూడుగోడును బాప రైతన్నలున్నారు.<br/>
            నడుమొంచి కష్టించి పాడిపంటలు పెంచి<br/>
            పొట్ట చల్లగుండంగ పోషించు అన్నదాత
          </p>
          <p className="leading-[2.2] mt-4">
            తానేమొ పస్తులుండి తిండిపెడుతున్నాడు<br/>
            సమాజ గమనానికి సాయపడుతున్నాడు<br/>
            రాత్రనక పగలనక ఆత్రంగ పనిచేస్తూ<br/>
            సోమరితనమొద్దని చాటిచెప్పే ధీరుడు
          </p>
          <p className="leading-[2.2] mt-4 flex justify-between items-end">
            <span>
              ఎండకు ఎండినా వానలో తడిసినా<br/>
              చలిలో వణకినా సమస్యలతో నలిగినా<br/>
              సడలని స్థైర్యంతో సస్యములనందిస్తూ<br/>
              జాతిసేవలో పునీతుడై నిలచిన
            </span>
            <span className="font-bold mr-12 md:mr-32">||రైతే||</span>
          </p>
        </div>
      </div>

      {/* Think & Say Box + Wrapped Text */}
      <div className="relative text-justify leading-[2.2] pt-6">
        <div className="float-none md:float-right md:ml-6 mb-6 w-full md:w-[320px] relative bg-[#f1ebf4] rounded-2xl p-4 pt-10 border border-[#d1c4e0] shadow-sm">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[180px] h-[55px]">
            <Image
              src="/c8-t-ch4-p4-think-badge.png"
              alt="ఆలోచించండి-చెప్పండి"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 bg-[#e6007e] rotate-45 shrink-0 mt-2.5"></div>
                <p className="text-sm font-semibold text-[#1e1b4b]">'మానవుని సౌందర్యం వెనుక క్షురకుని పాత్ర ఉన్నది.' దీన్ని సమర్థిస్తూ మాట్లాడండి.</p>
              </div>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px]"
                value={answers["q1"] || ""}
                onChange={(e) => handleAnswerChange("q1", e.target.value)}
                placeholder="మీ సమాధానం రాయండి..."
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 bg-[#e6007e] rotate-45 shrink-0 mt-2.5"></div>
                <p className="text-sm font-semibold text-[#1e1b4b]">అగ్గిపెట్టెలో పట్టేటంత చీరను నేసిన నేతపనివారి పనితనాన్ని ప్రశంసిస్తూ మాట్లాడండి.</p>
              </div>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px]"
                value={answers["q2"] || ""}
                onChange={(e) => handleAnswerChange("q2", e.target.value)}
                placeholder="మీ సమాధానం రాయండి..."
              />
            </div>

            <div className="space-y-2">
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 bg-[#e6007e] rotate-45 shrink-0 mt-2.5"></div>
                <p className="text-sm font-semibold text-[#1e1b4b]">దేశానికి అన్నంపెట్టే రైతు జీవనం దుర్భరంగా ఎందుకు మారిందో చర్చించండి.</p>
              </div>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px]"
                value={answers["q3"] || ""}
                onChange={(e) => handleAnswerChange("q3", e.target.value)}
                placeholder="మీ సమాధానం రాయండి..."
              />
            </div>
          </div>
        </div>
        
        <p className="indent-12">
          ఇట్లా చూస్తూ పోతే ప్రతి ఒక్క వృత్తిలోనూ ఎంతో కొంత 
          శ్రమ, నైపుణ్యం తొంగిచూస్తాయి. ప్రతి వృత్తీ పవిత్రమైందే. 
          దేన్నీ చిన్నచూపు చూడాల్సిన పనిలేదు. ఎవరి ఇంట్లో శుభకార్యం 
          జరగాల్నన్నా మంగళవాయిద్యాలు, కుండలు, ప్రమిదలు, 
          ఆభరణాలు, వస్త్రాలు మొదలయినవన్నీ కావాలి. అంటే ఇన్ని 
          వృత్తులవాళ్ళు సహకరిస్తేనే ఏ కార్యమైనా జరుగుతాయి. ఇట్లా అందరూ పరస్పరం సహకరించుకొంటేనే సమాజం నడుస్తుంది. 
          అంతేకానీ 'ఎవరికి వారే యమునా తీరే' అన్నట్లుగా ఉంటే సమాజ అభివృద్ధి కుంటుబడుతుంది. ఇందులో ఎక్కువ తక్కువ 
          భేదాలు మన మనస్సుల్లో ఉండగూడదు. శరీరంలో కళ్ళు, చెవి, ముక్కు కాళ్ళు, చేతులు... వీటిలో ఏవి గొప్ప అంటే? అన్నీ 
          కలసి ఉంటేనే శరీరం. అట్లాగే అందరూ కలసి ఉంటేనే సమాజం. ఒకప్పుడు గ్రామాలు స్వయంసమృద్ధింగా వెలిగినాయి. 
          గ్రామజీవనానికి అవసరమైన వస్తువులను అన్ని వృత్తులవారూ కలిసిమెలిసి తయారుచేసుకొనేవారు. ఒకరి అవసరాలకు 
          మరొకరు చేదోడువాదోడుగా నిలిచేవారు. కులాలను పక్కకు పెట్టి అక్క, బావ, మామ, అత్త అన్న అని పిలుచుకొనే 
          ఆత్మీయసంబంధం వాళ్ళది. మానవత్వాన్ని చాటిన మధురజీవనం వాళ్ళది. కలిసి ఉండడం, ఒకరిమీద ఒకరు ఆధారపడడం, 
          ఒకరికొకరు సహకరించుకోవడం, మన సంస్కృతిలోని గొప్ప విలువలు. వీటిని అలవరచుకోవడం, పాటించడం, కాపాడుకోవడం 
          మనందరి ధర్మం.
        </p>
      </div>

      <div className="text-justify leading-[2.2] clear-both pt-2">
        <p className="indent-12">
          మనిషిని మనిషిగా గౌరవిద్దాం. అతనిలో దాగున్న ప్రతిభను అభినందిద్దాం. ఆ గొప్పదనాన్ని మనం అందుకోవడానికి 
          ప్రయత్నిద్దాం. 'శ్రమ' పునాదిపైనే 'అభివృద్ధి' భవనం ఆధారపడి ఉంటుంది. శ్రమించడానికి ఎవరూ సిగ్గుపడగూడదు. 
          సోమరితనంతో శ్రమించకపోతేనే సిగ్గుపడాలి. శ్రమైక జీవన సౌందర్యాన్ని చూడగలగాలి. శ్రమను గౌరవంగా భావించడం 
          నేర్చుకోవాలి. శ్రమసంస్కృతితో జీవించడం నేర్చుకోవాలి.
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4 clear-both">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          37
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
