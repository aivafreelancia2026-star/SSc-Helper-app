"use client";

import { useState } from "react";

export function C6HindiCh9Page5() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [filledColors, setFilledColors] = useState<{ [key: string]: string }>({
    bird: "transparent",
    leaf: "transparent",
    mango: "transparent",
    tomato: "transparent",
  });

  const colors = [
    { id: "#22c55e", name: "हरा", label: "Green" }, // green-500
    { id: "#ef4444", name: "लाल", label: "Red" }, // red-500
    { id: "#171717", name: "काला", label: "Black" }, // neutral-900
    { id: "#eab308", name: "पीला", label: "Yellow" }, // yellow-500
  ];

  const shapes = [
    {
      id: "bird",
      correctColor: "#171717",
      svg: (fill: string) => (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" overflow="visible">
          <path
            d="M 20 60 Q 15 80 10 90 Q 25 85 30 70 C 40 80 60 80 80 60 C 90 50 95 30 90 20 C 85 10 70 15 60 25 C 50 20 30 30 20 60 Z"
            fill={fill}
            stroke="#333"
            strokeWidth="2"
            className="transition-colors duration-300"
          />
          {/* Beak */}
          <path d="M 90 20 L 100 25 L 90 30 Z" fill={fill === "transparent" ? "transparent" : "#333"} stroke="#333" strokeWidth="2" />
          {/* Eye */}
          <circle cx="80" cy="25" r="3" fill="#fff" stroke="#333" strokeWidth="1" />
          <circle cx="81" cy="25" r="1.5" fill="#333" />
        </svg>
      ),
    },
    {
      id: "leaf",
      correctColor: "#22c55e",
      svg: (fill: string) => (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" overflow="visible">
          <path
            d="M 10 90 Q 20 60 50 50 Q 80 40 90 10 Q 70 20 50 40 Q 20 60 10 90 Z"
            fill={fill}
            stroke="#333"
            strokeWidth="2"
            className="transition-colors duration-300"
          />
          <path d="M 10 90 L 90 10" stroke="#333" strokeWidth="2" strokeDasharray="4 2" />
        </svg>
      ),
    },
    {
      id: "mango",
      correctColor: "#eab308",
      svg: (fill: string) => (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" overflow="visible">
          <path
            d="M 50 20 C 80 20 90 50 80 70 C 70 90 40 90 30 70 C 20 50 20 20 50 20 Z"
            fill={fill}
            stroke="#333"
            strokeWidth="2"
            className="transition-colors duration-300"
          />
          {/* Stem */}
          <path d="M 50 20 Q 45 10 55 5" fill="transparent" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
          <path d="M 50 15 Q 65 15 75 5 Q 65 25 50 15 Z" fill="#22c55e" stroke="#333" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: "tomato",
      correctColor: "#ef4444",
      svg: (fill: string) => (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" overflow="visible">
          <path
            d="M 20 40 C 20 10 50 10 50 30 C 50 10 80 10 80 40 C 90 70 70 90 50 90 C 30 90 10 70 20 40 Z"
            fill={fill}
            stroke="#333"
            strokeWidth="2"
            className="transition-colors duration-300"
          />
          {/* Leaves/Stem */}
          <path d="M 40 30 L 50 20 L 60 30 L 50 25 Z" fill="#22c55e" stroke="#333" strokeWidth="1.5" />
          <path d="M 50 25 L 35 20 M 50 25 L 65 20 M 50 25 L 50 10" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const handleShapeClick = (shapeId: string) => {
    if (selectedColor) {
      setFilledColors((prev) => ({
        ...prev,
        [shapeId]: selectedColor,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 pt-8 px-4 md:px-12 font-sans selection:bg-blue-200">
      
      {/* Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#8B7300] drop-shadow-sm mb-6" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          रंग ही रंग
        </h1>
        <div className="inline-block bg-[#f8f6f0] border border-[#d4d4d8] rounded-full px-6 py-2 shadow-sm">
          <p className="text-lg md:text-xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            चित्रों में उचित रंग भरिए।
          </p>
        </div>
      </div>

      {/* Main Interactive Section */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16 relative">
        
        {/* Left Column: Outlined Images to Color */}
        <div className="flex flex-col items-center gap-12 md:gap-16 relative z-10">
          {shapes.map((shape) => (
            <div 
              key={shape.id}
              className="w-32 h-32 md:w-40 md:h-40 cursor-pointer relative transform transition-transform duration-200 hover:scale-105 active:scale-95"
              onClick={() => handleShapeClick(shape.id)}
            >
              {shape.svg(filledColors[shape.id])}
              
              {/* Feedback particles/glow could go here */}
              {filledColors[shape.id] === shape.correctColor && (
                 <div 
                   className="absolute -right-4 -top-4 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg animate-bounce"
                 >
                   ✓
                 </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column: Color Palette */}
        <div className="flex flex-col items-center justify-center gap-8 md:gap-12 relative z-20">
          <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
            <h2 className="text-center text-slate-600 mb-6 font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              रंग चुनें (Choose a color)
            </h2>
            <div className="flex flex-col gap-6">
              {colors.map((color) => (
                <div key={color.id} className="flex flex-col items-center gap-2">
                  <button
                    className={`w-24 h-24 rounded-xl shadow-md border-4 transform transition-all duration-200 active:scale-95 ${selectedColor === color.id ? 'border-blue-500 scale-110 shadow-xl' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: color.id }}
                    onClick={() => setSelectedColor(color.id)}
                    aria-label={`Select ${color.name}`}
                  />
                  <span className="text-lg font-bold text-slate-700" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-3xl mx-auto mt-20 p-6 bg-blue-50/50 rounded-xl border border-blue-100/50 text-center text-slate-700 text-base md:text-lg italic" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        सूचना : आप अपने अध्यापक से अन्य रंगों के बारे में पता लगाइए। उन रंगों की वस्तुओं के चित्र दीवार पत्रिका पर चिपकाइए।
      </div>

      {/* Page Number */}
      <div className="flex items-center justify-center mt-12 mb-6 gap-4 text-slate-500 text-sm">
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-3 py-1 rounded">48</div>
        <span>खुशियों की दुनिया</span>
      </div>

    </div>
  );
}
