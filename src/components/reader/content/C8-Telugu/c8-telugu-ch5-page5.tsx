"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh5Page5() {
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: "",
    q2: "",
    q3: ""
  });

  useEffect(() => {
    const savedAnswers = localStorage.getItem("c8-telugu-ch5-p5-answers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const handleChange = (id: string, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    localStorage.setItem("c8-telugu-ch5-p5-answers", JSON.stringify(newAnswers));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      <div className="space-y-12">
        {/* Poem 4 */}
        <div className="flex flex-col md:flex-row gap-6 items-start relative">
          <div className="relative w-28 h-32 shrink-0 mx-auto md:mx-0 mt-6 order-2 md:order-1">
            <Image
              src="/assets/images/c8-telugu/ch5/ch5_p5_poem4.png"
              alt="Lord Rama"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="flex flex-col flex-1 order-1 md:order-2">
            <div className="flex gap-4">
              <div className="font-bold w-4 shrink-0 pt-1">4.</div>
              <div className="flex-1 space-y-3 pt-1">
                <div className="flex gap-2">
                  <span className="text-[#e6007e] font-bold">✿ ఉ.</span>
                  <div className="space-y-2 font-medium text-[#2f2b66]">
                    <p>పెంపునదల్లివై, కలుషబృంద సమాగమ మొందకుండ ర</p>
                    <p>క్షింపను దండ్రివై, మెయి వసించు దశేంద్రియ రోగముల్ నివా</p>
                    <p>రింపను వెజ్జువై, కృపగుటించి పరంబు దిరంబుగాగ స</p>
                    <p>త్పంపద లీయ నీవెగతి దాశరథీ! కరుణా పయోనిధీ!</p>
                  </div>
                </div>
                <p className="text-right font-bold italic text-sm">దాశరథి శతకం - కంచెర్ల గోపన్న</p>
              </div>
            </div>
          </div>
        </div>

        {/* Poem 5 */}
        <div className="flex flex-col gap-4 relative">
          <div className="flex gap-4">
            <div className="font-bold w-4 shrink-0 pt-1 text-right">5.</div>
            <div className="flex-1">
              <div className="flex gap-2">
                <span className="text-[#e6007e] font-bold">✿ సీ.</span>
                <div className="space-y-2 font-medium text-[#2f2b66]">
                  <p>తల్లి గర్భము నుండి ధనము తేడెవ్వడు</p>
                  <p className="pl-16">వెళ్ళిపోయేడినాడు వెంటరాదు</p>
                  <p>లక్షాధికారైన లవణమన్నమే కాని</p>
                  <p className="pl-16">మెఱుగు బంగారంబు మ్రింగఁబోడు</p>
                  <p>విత్తమార్జన చేసి విఱ్ఱవీగుటె కాని,</p>
                  <p className="pl-16">కూడఁ బెట్టిన సొమ్ముఁ గుడువఁ బోడు</p>
                  <p>పొందుగా మఱుగైన భూమిలోపలపెట్టి</p>
                  <p className="pl-16">దానధర్మము లేక దాచి దాచి</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 pl-4 md:pl-8">
            <div className="font-bold shrink-0 pt-1 w-6 text-right">తే.</div>
            <div className="flex-1 space-y-2 font-medium text-[#2f2b66]">
              <p>తుదకు దొంగల కిత్తురో? దొరలకవున?</p>
              <p>తేనె జుంటీగలియ్యవా తెరువరులకు</p>
              <p>భూషణ వికాస! శ్రీ ధర్మపుర నివాస</p>
              <p>దుష్ట సంహార! నరసింహ! దురితదూర!</p>
              <p className="text-right font-bold italic text-sm pr-12 pt-2">నరసింహ శతకం - కాకుత్థ్సం శేషప్పకవి</p>
            </div>
          </div>
        </div>

        {/* Think and Tell Box */}
        <div className="pl-8 pr-12 pt-4 w-full md:w-[75%] ml-auto">
          <div className="bg-[#e6deea]/60 rounded-xl p-6 pt-8 relative">
            <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#2f2b66] text-white px-6 py-1.5 rounded-full font-bold shadow-sm flex items-center gap-2">
              <span>👦👧</span> ఆలోచించండి-చెప్పండి
            </div>
            
            <div className="space-y-6 pt-2">
              {[
                { id: "q1", text: "ఎట్లాంటి చదువు వ్యర్థమని మీరనుకొంటున్నారు. ఎందుకు?" },
                { id: "q2", text: "సత్సంపదలు అంటే ఏవి?" },
                { id: "q3", text: "డబ్బు కూడబెట్టి దానధర్మం చేయనివాడిని తేనెటీగతో ఎందుకు పోల్చారు?" }
              ].map((q) => (
                <div key={q.id} className="space-y-2 pl-2 relative">
                  <span className="absolute -left-4 top-1 text-[#e6007e]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="rotate-45">
                      <rect x="2" y="2" width="20" height="20" rx="4" />
                    </svg>
                  </span>
                  <p className="font-semibold">{q.text}</p>
                  <textarea
                    className="w-full min-h-[60px] p-3 border border-black/10 rounded-lg outline-none focus:ring-2 focus:ring-[#6b5b95] bg-white resize-y shadow-inner text-sm"
                    placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                    value={answers[q.id]}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  ></textarea>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section III */}
      <div className="text-center font-bold text-xl pt-8">III</div>
      
      {/* Poem 6 */}
      <div className="flex flex-col gap-4 relative pt-4">
        <div className="flex gap-4">
          <div className="font-bold w-4 shrink-0 pt-1 text-right">6.</div>
          <div className="flex-1">
            <div className="flex gap-2">
              <span className="text-[#e6007e] font-bold">✿ సీ.</span>
              <div className="space-y-2 font-medium text-[#2f2b66]">
                <p className="pl-6">మొదట కర్దమముంటె మొగిలిపుష్పముకేమి?</p>
                <p className="pl-16">పశువుల దోషముల్ పాలకేమి?</p>
                <p className="pl-6">అరయ వైద్యుని కులం బౌషధంబునకేమి?</p>
                <p className="pl-16">కప్పుదోషము మౌక్తికములకేమి?</p>
                <p className="pl-6">వృషభంబు లెట్లున్న కృషికర్మమునకేమి?</p>
                <p className="pl-16">వెలియైన వాని సద్విద్యకేమి?</p>
                <p className="pl-6">అపవిత్ర దోషంబు లగ్నిహోత్రునకేమి?</p>
                <p className="pl-16">గుణదోషములవల్ల కులముకేమి?</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 pl-4 md:pl-8">
          <div className="font-bold shrink-0 pt-1 w-6 text-right">తే.గీ.</div>
          <div className="flex-1 space-y-2 font-medium text-[#2f2b66]">
            <p>మలినమై చందనము పరిమళము జెడున</p>
            <p>రాతికంటు గుడము మధురంబు జెడున</p>
            <p>వినయములు జెడ మావృత్తి ఘనత జెడున</p>
            <p>విశ్వ పాలన ధర్మ! శ్రీ విశ్వ కర్మ!</p>
            <p className="text-right font-bold italic text-sm pr-12 pt-2">విశ్వకర్మ శతకం - పండిత రామసింహకవి</p>
          </div>
        </div>
      </div>

      {/* Poem 7 */}
      <div className="flex flex-col md:flex-row gap-6 items-start relative pt-8">
        <div className="flex flex-col flex-1">
          <div className="flex gap-4">
            <div className="font-bold w-4 shrink-0 pt-1">7.</div>
            <div className="flex-1 space-y-3 pt-1">
              <div className="flex gap-2">
                <span className="text-[#e6007e] font-bold">✿ ఉ.</span>
                <div className="space-y-2 font-medium text-[#2f2b66]">
                  <p>లెక్కకురాని కోరికల రీతులలో బడి మానవుండిటుల్</p>
                  <p>మక్కువలన్ సృజించుచు నమాయకుడై సుడులన్ పదేపదే</p>
                  <p>యుక్కిరి బిక్కిరై తిరుగుచుండునుగాని, విశిష్ట మార్గముల్</p>
                  <p>ద్రొక్కు తలంపులేశము కుదుర్కొననీయడె? వేంకటేశ్వరా!</p>
                </div>
              </div>
              <p className="text-right font-bold italic text-sm pr-12 pt-4">శ్రీ వేంకటేశ్వర శతకం - ఆసూరి మరింగంటి పురుషోత్తమాచార్యులు</p>
            </div>
          </div>
        </div>
        <div className="relative w-36 h-28 shrink-0 mx-auto md:mx-0 mt-6">
          <Image
            src="/assets/images/c8-telugu/ch5/ch5_p5_poem7.png"
            alt="Person surrounded by desires/snakes"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-12 pb-4 clear-both">
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          48
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
