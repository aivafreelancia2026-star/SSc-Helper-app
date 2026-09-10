"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh4Page4() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem("c8-telugu-ch4-p4-answers");
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
    localStorage.setItem("c8-telugu-ch4-p4-answers", JSON.stringify(newAnswers));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Top Paragraph */}
      <div className="text-justify leading-[2.2]">
        <p className="indent-12">
          ఎండాకాలం వచ్చిందంటే చాలు కుండలకు, కూజాలకు మహా గిరాకీ. అటికెలు, గురుగులు మన అవసరాలను 
          తీరుస్తున్నాయి. భక్తిజీవితంలో భాగమైనవి ప్రమిదలు. ఇవన్నీ చకచకా ఎట్లా వచ్చేస్తున్నాయి? కుమ్మరి చక్రంనుంచి - 
          బంకమట్టినుంచే. బంకమట్టి ఊరికే తయారవుతుందా? మెత్తటి మట్టి, బూడిద లేదా రంపపు పొట్టు, సన్న ఇసుకను కలిపి 
          దీన్ని తయారు చేస్తారు. ఈ మూడింటిని కలిపి కాళ్ళతో బాగా తొక్కుతారు. చెమటోడ్చి సిద్ధంచేసిన ఈ బంకమట్టిని బండి 
          చక్రం వంటి సారెమీద పెడుతారు. చక్రం మాత్రం ఊరికే తయారైందా? కమ్మరి, వడ్రంగి వాళ్ళ నైపుణ్యం కలగలిసి 
          ఏర్పడింది. ఇందులో ఎంతో ఇంజనీరింగ్ నైపుణ్యం తొంగిచూస్తుంది. చక్రం తాను తిరగడం కాదు, సమాజ గతినే తిప్పేసింది. 
          ఇదొక అద్భుత ఆవిష్కరణ.
        </p>
      </div>

      {/* Paragraph + Think & Say Box */}
      <div className="relative text-justify leading-[2.2] pt-2">
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
                <p className="text-sm font-semibold text-[#1e1b4b]">నిజజీవితంలో మీకు ఆశ్చర్యం కలిగించే సంఘటనలు ఉన్నాయా? వాటి గురించి చర్చించండి?</p>
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
                <p className="text-sm font-semibold text-[#1e1b4b]">ప్రతి వృత్తి పవిత్రమైందే, అని అనడంలో ఆంతర్యం ఏమై ఉంటుంది?</p>
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
                <p className="text-sm font-semibold text-[#1e1b4b]">చక్రం సమాజగతిని మార్చినది అని ఎట్లా చెప్పగలవు?</p>
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
          చక్రం తిప్పుతూ చక్రంమీద పెట్టిన బంకమట్టిని చేతివేళ్ళ 
          కొనలతో చాకచక్యంగా నొక్కుతారు. అత్యంత ఆశ్చర్యకరంగా, 
          అనుకున్నరూపాలు అమాంతంగా వచ్చేస్తుంటాయి. ఆ చేతుల్లో 
          ఇంద్రజాల విద్య ఉన్నదా? అని అనిపించక మానదు. 
          తయారైన మట్టిపాత్రలను ఆరబెడతారు. తరువాత ‘కుమ్మరి 
          ఆవము’ లో పెట్టి బురదమట్టితో కప్పేస్తారు. దీనివల్ల కొలిమిని 
          మండిస్తే అన్ని పాత్రలకూ ఆ వేడి తగులుతుంది. పాత్రలన్నీ 
          బాగా కాలి గట్టిగా తయారవుతాయి. మనం ఉపయోగించుకొనే 
          మట్టిపాత్రలవెనుక ఇంత నైపుణ్యముంది.
        </p>
      </div>

      {/* Section II Marker */}
      <div className="flex justify-center pt-4 pb-2">
        <h3 className="font-serif font-bold text-2xl text-[#1e1b4b]">II</h3>
      </div>

      {/* Goldsmith Section */}
      <div className="text-justify leading-[2.2]">
        <p className="indent-12">
          నగలంటే ఇష్టాలేనివాళ్ళెవరైనా ఉంటారా? మెడలో హారాలు, చేతులకు కడియాలు, గాజులు, చెవికమ్మలు, ముక్కుపుల్ల, 
          సిగబిళ్ళ, నడుముకు వడ్డాణం, కాళ్ళకు కడియాలు, గజ్జెలు, వేళ్ళకు ఉంగరాలు.... ఇట్లా ఎన్నెన్నో ఆభరణాలు ఆపాదమస్తకం 
          ధరిస్తారు. ఒకప్పుడు ఏడు వారాల సొమ్ములు ధరించేవారట. ఆధునిక కాలంలో మరెన్నో రకాల వస్తువులు అందుబాటులోకి
        </p>
      </div>

      <div className="relative text-justify leading-[2.2]">
        <div className="float-none md:float-left md:mr-6 mb-4 w-full md:w-[260px] h-[230px] relative mt-2 md:-mt-2 bg-white overflow-hidden">
          <Image
            src="/c8-t-ch4-p4-goldsmith.png"
            alt="Goldsmith making jewelry"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        
        <p className="indent-12">
          వచ్చాయి. ఒక్కొక్క ఆభరణాన్ని ఎన్నో రకాలుగా 
          తీర్చిదిద్దుతారు. ముద్దగా ఉన్న బంగారాన్ని ముద్దులొలికే 
          నగలుగా తీర్చిదిద్దడంలో ఎంత శ్రమ దాగిఉన్నదో తెలిస్తే 
          ముక్కుమీద వేలువేసుకొంటాం. బంగారం అంత సులభంగా 
          కరుగదు. బంగారాన్ని మూసలో పెట్టి బొగ్గుల కొలిమిలో 
          ఉంచి కరిగిస్తారు. నిప్పు రాజేయడానికి, నిప్పులు 
          కణకణలాడేలా మండడానికి బాగా ఊదాలి. బంగారం 
          పనిచేసేవాళ్ళు (స్వర్ణకారులు) ఇట్లా ఊది ఊది అనారోగ్యపు 
          బారినపడిన సందర్భాలు ఎన్నో.
        </p>
        <p className="indent-12 mt-4">
          బంగారమేకాదు మనం నిత్యజీవితంలో వాడే 
          వెండివస్తువుల తయారీలో కూడా ఎంతో కళాదృష్టి, నైపుణ్యం 
          కనిపిస్తుంది. బంగారాన్ని వెండిని వివిధ ఆకృతులుగా 
          తీర్చిదిద్దడంలోగానీ, రత్నాలను పొదగడంలోగానీ
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4 clear-both">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          33
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
