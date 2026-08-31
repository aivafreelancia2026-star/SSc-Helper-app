"use client";

import { useState } from "react";
import Image from "next/image";

// Reusable component for the interactive picture word
const PicWord = ({ emoji, word }: { emoji: string; word: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span 
      className="inline-flex relative mx-2 cursor-pointer transition-transform hover:scale-125 align-middle"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="text-4xl drop-shadow-md">{emoji}</span>
      {showTooltip && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg z-10 whitespace-nowrap" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          {word}
        </span>
      )}
    </span>
  );
};

export function C6HindiChRead3Page1() {
  const [title, setTitle] = useState("");

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 relative overflow-hidden">
      
      {/* Top Badge */}
      <div className="absolute right-8 top-8 z-10">
        <div className="flex flex-col items-center">
          <span className="text-6xl mb-2">👧👦</span>
          <div className="bg-[#fcf8e3] border-2 border-[#a89d70] text-[#706429] px-6 py-2 rounded-full font-bold text-lg shadow-sm" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            पढ़ो-आनंद लो
          </div>
        </div>
      </div>

      <div className="p-8 pt-32 flex flex-col items-center flex-grow">
        
        {/* Title Input */}
        <div className="w-full max-w-2xl mb-4">
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b-4 border-slate-800 border-dotted text-center text-4xl py-2 outline-none focus:border-blue-500 focus:border-solid bg-transparent transition-colors text-blue-800 font-bold"
            placeholder="यहाँ कहानी का नाम लिखिए..."
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          />
        </div>
        
        <p className="text-xl text-slate-600 mb-12" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          (चित्र कहानी पढ़िए और नाम दीजिए।)
        </p>

        {/* Story Text */}
        <div className="text-3xl md:text-4xl text-slate-800 leading-[3rem] md:leading-[4.5rem] font-medium text-justify px-4 md:px-12" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          
          <p className="mb-6">
            एक दिन एक <PicWord emoji="🦩" word="सारस" /> ने एक <PicWord emoji="🐟" word="मछली" /> पकड़ ली। 
            <PicWord emoji="🦩" word="सारस" /> के मुँह से <PicWord emoji="🐟" word="मछली" /> फिसल गई। 
            <PicWord emoji="🐟" word="मछली" /> कहाँ है?
          </p>
          
          <p className="mb-6">
            <PicWord emoji="🦩" word="सारस" /> ने <PicWord emoji="🐢" word="कछुआ" /> से पूछा। 
            <PicWord emoji="🐢" word="कछुआ" /> ने कहा - ‘मुझे नहीं पता।’
          </p>

          <p className="mb-6">
            <PicWord emoji="🐇" word="खरगोश" /> से पूछो। <PicWord emoji="🐇" word="खरगोश" /> ने कहा - ‘मुझे नहीं पता।’
          </p>

          <p className="mb-6">
            <PicWord emoji="🦁" word="शेर" /> से पूछो। <PicWord emoji="🦁" word="शेर" /> ने कहा मुझे नहीं पता।
          </p>

          <p className="mb-12">
            <PicWord emoji="🐘" word="हाथी" /> से पूछो। <PicWord emoji="🐘" word="हाथी" /> से पूछने पर उसने कहा - ‘तुम्हारे पेट में होगी देख लो जाओ।’
          </p>
        </div>

        {/* Big Fish Image at the bottom */}
        <div className="mt-8 hover:scale-110 transition-transform duration-500 cursor-pointer">
          <span className="text-[12rem] drop-shadow-xl inline-block" style={{ transform: "rotate(-15deg)" }}>
            🐟
          </span>
        </div>

      </div>

      {/* Tip */}
      <div className="w-full flex justify-center mt-auto px-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm opacity-90 animate-pulse">
          <p className="text-sm text-blue-800 font-bold flex items-center gap-2">
            <span>💡</span>
            चित्रों पर माउस ले जाकर जानवरों के नाम पढ़ें!
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex items-center justify-between px-8 pt-4 text-sm text-slate-500 font-medium border-t border-slate-200">
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>छात्रों की प्रगति हेतु सरकार का उपहार</span>
        <span className="font-bold text-lg bg-[#dbe8d8] px-4 py-1 rounded text-green-900 border border-[#b8c9b4] shadow-inner">33</span>
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>चिड़ियाघर</span>
      </div>
    </div>
  );
}
