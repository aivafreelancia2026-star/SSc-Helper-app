"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh4Page9() {
  const [q1Notes, setQ1Notes] = useState("");
  const [tableData, setTableData] = useState<Array<[string, string, string]>>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("c8-telugu-ch4-p9-q1");
    if (savedNotes) {
      setQ1Notes(savedNotes);
    }
    
    const savedTable = localStorage.getItem("c8-telugu-ch4-p9-table");
    if (savedTable) {
      try {
        setTableData(JSON.parse(savedTable));
      } catch (e) {
        console.error("Error loading table data", e);
      }
    }
  }, []);

  const handleNotesChange = (value: string) => {
    setQ1Notes(value);
    localStorage.setItem("c8-telugu-ch4-p9-q1", value);
  };

  const handleTableChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
    localStorage.setItem("c8-telugu-ch4-p9-table", JSON.stringify(newData));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Header Section */}
      <div className="relative">
        <div className="flex justify-center mb-8">
          <div className="border border-[#2f2b66] shadow-[2px_2px_0px_0px_#2f2b66] bg-[#faedf3] px-10 py-3">
            <h1 className="text-2xl md:text-3xl font-bold text-[#e6007e]">ఇవి చేయండి</h1>
          </div>
        </div>
        
        <div className="absolute right-0 top-0 w-[70px] h-[75px] border-2 border-black flex items-center justify-center bg-white p-1">
          <Image
            src="/c8-t-ch4-p9-qr.png"
            alt="QR Code"
            fill
            className="object-contain p-1"
            unoptimized
          />
        </div>
      </div>

      {/* Section I */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#2f2b66] text-white font-serif font-bold text-lg px-3 py-1">I</div>
          <div className="bg-[#2f2b66] text-white font-bold text-lg px-4 py-1">విని, అర్థంచేసుకొని, ఆలోచించి మాట్లాడడం</div>
        </div>
        
        <div className="space-y-4 pl-4 md:pl-12">
          <p className="text-[#e6007e] font-bold">1. &apos;ఒక్కొక్క వృత్తి దేనికదే గొప్పది&apos; దీనిని సమర్థిస్తూ మాట్లాడండి.</p>
          
          <div className="w-full max-w-2xl bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-500 mb-2 italic">మాట్లాడటానికి ముందు మీ ఆలోచనలను ఇక్కడ రాసుకోండి:</p>
            <textarea
              className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px]"
              value={q1Notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="మీ సమాధానం / ముఖ్యాంశాలు రాయండి..."
            />
          </div>
        </div>
      </div>

      {/* Section II */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="bg-[#2f2b66] text-white font-serif font-bold text-lg px-3 py-1">II</div>
          <div className="bg-[#2f2b66] text-white font-bold text-lg px-4 py-1">ధారాళంగా చదువడం - అర్థం చేసుకొని ప్రతిస్పందించడం</div>
        </div>
        
        <div className="space-y-6 pl-4 md:pl-12">
          <p className="text-[#e6007e] font-bold">1. కింది పేరాను చదువండి. దాని ఆధారంగా కింద ఇచ్చిన పట్టికలో వివరాలు రాయండి.</p>
          
          <div className="text-justify leading-[2.2] space-y-4 text-[14.5px]">
            <p className="indent-12">
              లక్షతో తయారయ్యే గాజులకు హైదరాబాదు ప్రసిద్ధి. వాటికి అద్దంముక్కలు, పూసలు, విలువైన రంగురాళ్ళతో 
              అలంకరిస్తారు. హైదరాబాద్ సందర్శించేవారు వీటిని తప్పక కొనుక్కుంటారు. కళాత్మక కుట్టుపనులలో, వివిధ 
              ఆకారాలలో ఉన్న చిన్నచిన్న అద్దంముక్కలు, పూసలు అందంగా తీర్చిదిద్దుతారు. దుప్పట్లు, దిండ్లు, కుషన్ కవర్లు, 
              లంగాలు, జాకెట్లు వంటి దుస్తులకు అత్యంత గిరాకీ ఉన్నది. ఇక నిర్మల్ వర్ణచిత్రాలు ప్రపంచంలో తమకంటూ 
              ప్రత్యేక స్థానం ఏర్పరుచుకున్నవి. గృహోపకరణాలైన కొయ్యసామగ్రి, తేలికపాటి చెక్కబొమ్మలు ఎంతో సృజనాత్మకంగా 
              తయారు చేయబడతాయి.
            </p>
            <p className="indent-12">
              వెండి నగిషీ కళను &apos;ఫిలిగ్రీ&apos; అంటారు. కరీంనగర్ ఈ కళకు పెట్టిందిపేరు. ఇక్కడ సన్నని వెండి 
              దారాలతో, ఆకర్షణీయమైన వస్తువులు తయారుచేస్తారు. గంధపుగిన్నెలు, పళ్ళాలు, పెట్టెలు, గొలుసులు, పక్షుల, 
              జంతువుల బొమ్మలు వంటివి కళాకారులు కళాత్మకంగా తయారుచేస్తారు. జనగాం జిల్లాలోని &apos;పెంబర్తి&apos; గ్రామం 
              లోహపు పనివారలకు ప్రసిద్ధి. అపురూపమైన జ్ఞాపికలు, గోడకు తగిలించే చిత్రాలు, పూలకుండీలు, విగ్రహాలు, 
              స్టేషనరీ సామానులు, లోహపు రేకులతో వివిధ అంశాల తయారీ, ఇంకా అనేక రకాల అలంకరణ వస్తువులు వీరి 
              చేతిలో తయారవుతాయి.
            </p>
          </div>

          <div className="pt-4 overflow-x-auto">
            <table className="w-full max-w-3xl border-collapse border border-[#6b5b95] rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#d1c4e0] text-[#1e1b4b]">
                  <th className="border border-[#6b5b95] p-3 w-1/3">హస్తకళల పేర్లు</th>
                  <th className="border border-[#6b5b95] p-3 w-1/3">దొరికే ప్రాంతం</th>
                  <th className="border border-[#6b5b95] p-3 w-1/3">వాటి ప్రత్యేకతలు</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="bg-white">
                    {row.map((cellValue, colIndex) => (
                      <td key={colIndex} className="border border-[#6b5b95] p-0 relative h-[50px]">
                        <input
                          type="text"
                          className="w-full h-full p-2 outline-none focus:bg-blue-50 transition-colors"
                          value={cellValue}
                          onChange={(e) => handleTableChange(rowIndex, colIndex, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-12 pb-4 clear-both">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          38
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
