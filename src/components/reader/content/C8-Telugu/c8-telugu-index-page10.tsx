"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function C8TeluguIndexPage10({
  indexData,
  classGrade,
  subject,
  totalPages,
  indexPageStart,
}: {
  indexData: any[];
  classGrade: number;
  subject: string;
  totalPages: number;
  indexPageStart: number;
}) {
  const router = useRouter();
  const [showOriginal, setShowOriginal] = useState(false);

  const handleRowClick = (pageNo: number) => {
    router.push(
      `/reader?class=${classGrade}&subject=${subject}&page=${pageNo}&total=${totalPages}&index=${indexPageStart}`
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-body text-sm text-[#1e1b4b]" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Toggle View Header */}
      <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-200">
        <h3 className="font-bold text-lg text-blue-900">విషయసూచిక (Index)</h3>
        <button
          onClick={() => setShowOriginal(!showOriginal)}
          className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          {showOriginal ? "✨ ఇంటరాక్టివ్ వ్యూ (Interactive)" : "🖼️ ఒరిజినల్ పేజీ (Original)"}
        </button>
      </div>

      {showOriginal ? (
        <div className="relative w-full aspect-[1/1.4] rounded-xl overflow-hidden border border-gray-300 shadow-md bg-white">
          <Image
            src="/c8-telugu-index.png"
            alt="Original Class 8 Telugu Index Page"
            fill
            className="object-contain"
            priority
          />
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Title */}
          <div className="flex justify-center mt-6">
        <h1 className="bg-[#1e1b4b] text-white text-xl sm:text-2xl font-bold py-2 px-8 rounded-sm shadow-md border-2 border-white ring-2 ring-[#1e1b4b]">
          8వ తరగతి - విషయసూచిక
        </h1>
      </div>

      {/* Subtitle - పాఠ్యాంశాలు */}
      <div className="relative flex justify-center items-center py-4">
        <div className="absolute w-full h-[3px] bg-[#1e1b4b]"></div>
        <div className="relative bg-white border-[3px] border-[#1e1b4b] px-6 py-1">
          <h2 className="text-[#db2777] text-lg font-bold">పాఠ్యాంశాలు</h2>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-[#1e1b4b]">
          <thead>
            <tr className="bg-[#1e1b4b] text-white text-center font-bold">
              <th className="border border-white/20 p-2 whitespace-nowrap">క్ర.సం.</th>
              <th className="border border-white/20 p-2 text-left">పాఠం పేరు</th>
              <th className="border border-white/20 p-2 text-left">కవి/రచయిత</th>
              <th className="border border-white/20 p-2">ఇతివృత్తం</th>
              <th className="border border-white/20 p-2">ప్రక్రియ</th>
              <th className="border border-white/20 p-2 whitespace-nowrap">మాసం</th>
              <th className="border border-white/20 p-2 whitespace-nowrap">పుట</th>
            </tr>
          </thead>
          <tbody>
            {indexData.map((item, idx) => (
              <tr
                key={idx}
                onClick={() => handleRowClick(item.pageNo)}
                className="cursor-pointer hover:bg-blue-50 transition-colors group"
              >
                <td className="border border-[#1e1b4b] p-2 text-center font-bold relative">
                  {item.isMemorization && (
                    <span className="text-[#db2777] absolute left-1 top-1/2 -translate-y-1/2 text-lg drop-shadow-sm group-hover:scale-110 transition-transform">★</span>
                  )}
                  {item.chapterNo}.
                </td>
                <td className="border border-[#1e1b4b] p-2 font-bold text-[#1e1b4b] whitespace-nowrap">
                  {item.title}
                </td>
                <td className="border border-[#1e1b4b] p-2">
                  {item.author}
                </td>
                <td className="border border-[#1e1b4b] p-2 text-center">
                  {item.theme}
                </td>
                <td className="border border-[#1e1b4b] p-2 text-center">
                  {item.genre}
                </td>
                <td className="border border-[#1e1b4b] p-2 text-center">
                  {item.month}
                </td>
                <td className="border border-[#1e1b4b] p-2 text-center font-bold">
                  {item.printedPage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upavachakam Header */}
      <div className="bg-[#1e1b4b] text-white text-center py-1 font-bold text-base mt-8 flex justify-between px-6 border-2 border-[#1e1b4b]">
        <span className="flex-1 text-center pl-8">ఉపవాచకం</span>
        <span>131</span>
      </div>

      {/* Upavachakam Content */}
      <div className="border-x-2 border-b-2 border-[#1e1b4b] p-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 text-sm font-bold">
          <div>1) చిత్రగ్రీవం (జూలై)</div>
          <div>3) చిందు ఎల్లమ్మ (సెప్టెంబరు)</div>
          <div>5) జానపద కళలు (నవంబరు)</div>
          <div>2) షోయబుల్లాఖాన్ (ఆగష్టు)</div>
          <div>4) ఇల్లు - ఆనందాలహరివిల్లు (అక్టోబరు)</div>
          <div>6) పి.వి.నరసింహారావు (డిసెంబరు)</div>
        </div>
      </div>

      {/* Padavignanam Header */}
      <div className="bg-[#1e1b4b] text-white text-center py-1 font-bold text-base mt-4 flex justify-between px-6 border-2 border-[#1e1b4b]">
        <span className="flex-1 text-center pl-8">పదవిజ్ఞానం</span>
        <span>162</span>
      </div>

      {/* Note Section */}
      <div className="border border-[#1e1b4b] p-4 bg-white flex gap-4 mt-4 shadow-sm">
        <div className="font-bold text-[#1e1b4b] shrink-0">గమనిక :</div>
        <div className="flex flex-col gap-1 text-sm font-semibold text-[#1e1b4b]/90">
          <p>
            1. పాఠంలో <span className="text-[#db2777]">🌸</span> పువ్వు గుర్తులుగల పద్యాలు కంఠస్థం చేయాలి.
          </p>
          <p>
            2. విషయసూచికలో <span className="text-[#db2777] text-lg">★</span> గుర్తుగల పాఠాలను కాంపోజిట్ కోర్సువారు చదువాల్సిన అవసరంలేదు.
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="flex items-center pt-8 pb-4">
        <div className="text-sm font-bold pr-2 whitespace-nowrap">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="h-4 bg-[#1e1b4b] flex-1"></div>
        <div className="bg-[#1e1b4b] text-white font-bold px-4 py-1.5 mx-2 shadow-sm border border-white ring-1 ring-[#1e1b4b]">
          1
        </div>
        <div className="h-4 bg-[#1e1b4b] flex-1"></div>
      </div>
        </div>
      )}
    </div>
  );
}
