"use client";

import React, { useState } from "react";

export function C8ScienceCh2Page12() {
  const [activeTab, setActiveTab] = useState<"reflections" | "application">("reflections");

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* What we have learnt bullets (Contd) */}
      <div className="rounded-[22px] border-2 border-fuchsia-300 bg-fuchsia-50/40 p-4 shadow-sm space-y-2">
        <ul className="text-xs list-disc list-inside text-foreground/85 space-y-1.5 leading-relaxed">
          <li>Static friction comes into play when we try to move an object that is at rest on a plane surface.</li>
          <li>Sliding friction comes into play when an object is sliding over another.</li>
          <li>Friction depends on the nature of surface and the normal force with which the body presses the other surface.</li>
          <li>Friction can be reduced by using lubricants and ball bearings in many machines.</li>
          <li>When bodies move through fluids, fluids exert a frictional force called <strong>drag</strong>.</li>
        </ul>
      </div>

      {/* Improve your learning Box */}
      <div className="rounded-[22px] border border-sky-300 bg-white p-5 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-sky-200 pb-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-4 py-1.5 text-xs font-bold text-white shadow-2xs font-heading">
            <span>📝</span>
            <span>Improve your learning</span>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center rounded-lg bg-sky-50 p-1 shadow-2xs border border-sky-200">
            <img
              src="/assets/images/C8-Science/ch2_qr_learning.png"
              alt="QR Code 672TJZ"
              className="h-10 w-10 object-contain"
            />
            <span className="font-mono text-[9px] font-bold tracking-widest text-sky-950 mt-0.5">
              672TJZ
            </span>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex gap-2 border-b border-border/40 pb-2">
          <button
            onClick={() => setActiveTab("reflections")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "reflections"
                ? "bg-sky-600 text-white shadow-xs"
                : "bg-slate-100 text-foreground/75 hover:bg-slate-200"
            }`}
          >
            I. Reflections on concepts
          </button>
          <button
            onClick={() => setActiveTab("application")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "application"
                ? "bg-sky-600 text-white shadow-xs"
                : "bg-slate-100 text-foreground/75 hover:bg-slate-200"
            }`}
          >
            II. Application of concepts
          </button>
        </div>

        {/* Section I */}
        {activeTab === "reflections" && (
          <div className="space-y-3 text-xs animate-in fade-in">
            <h3 className="font-heading text-sm font-bold text-sky-950">
              I. Reflections on concepts
            </h3>
            <ol className="space-y-2.5 pl-4 list-decimal text-foreground/85 leading-relaxed">
              <li>
                Explain the types of friction with suitable examples. <span className="font-semibold text-fuchsia-900">(AS₁)</span>
              </li>
              <li>
                A book is placed on the surface of a table. The book is pushed in one direction. Draw the forces acting on the book and explain. <span className="font-semibold text-fuchsia-900">(AS₅)</span>
              </li>
              <li>
                Give a few examples for Sliding friction. <span className="font-semibold text-fuchsia-900">(AS₁)</span>
              </li>
              <li>
                Explain how lubrication reduces friction. <span className="font-semibold text-fuchsia-900">(AS₁)</span>
              </li>
              <li>
                Explain with one example that frictional force is proportional to the normal force. <span className="font-semibold text-fuchsia-900">(AS₁)</span>
              </li>
            </ol>
          </div>
        )}

        {/* Section II */}
        {activeTab === "application" && (
          <div className="space-y-3 text-xs animate-in fade-in">
            <h3 className="font-heading text-sm font-bold text-sky-950">
              II. Application of concepts
            </h3>
            <ol className="space-y-2.5 pl-4 list-decimal text-foreground/85 leading-relaxed">
              <li>
                Explain why sportsmen use shoes with spikes. <span className="font-semibold text-fuchsia-900">(AS₁)</span>
              </li>
              <li>
                Would it be easier or difficult for you to walk on a marble floor with soapy water? Why? <span className="font-semibold text-fuchsia-900">(AS₁)</span>
              </li>
              <li>
                What happens if we do not reduce friction in machines? <span className="font-semibold text-fuchsia-900">(AS₁)</span>
              </li>
              <li>
                What purposes are served by using ball bearings in machines? Explain with daily life examples. <span className="font-semibold text-fuchsia-900">(AS₁)</span>
              </li>
              <li>
                Draw a free body diagram (FBD) to show various forces acting on a body which is sliding on an inclined plane. <span className="font-semibold text-fuchsia-900">(AS₅)</span>
              </li>
            </ol>
          </div>
        )}
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">31</span>
      </div>
    </div>
  );
}
