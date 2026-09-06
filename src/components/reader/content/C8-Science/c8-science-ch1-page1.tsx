import React from "react";
import Image from "next/image";

export function C8ScienceCh1Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Chapter 1 Header Banner */}
      <div className="rounded-[18px] border-2 border-fuchsia-300 bg-gradient-to-r from-fuchsia-900 via-fuchsia-800 to-fuchsia-900 p-4 text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-xl bg-white/20 border border-white/30 px-3 py-1.5 backdrop-blur-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-fuchsia-200 mr-2 writing-mode-vertical">
              Chapter
            </span>
            <span className="font-heading text-2xl font-extrabold text-white">1</span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-wide text-white">
            Force
          </h1>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center rounded-lg bg-white p-1.5 shadow-sm">
          <img
            src="/assets/images/C8-Science/ch1_qr.png"
            alt="QR Code CTP6KX"
            className="h-10 w-10 object-contain"
          />
          <span className="font-mono text-[9px] font-bold tracking-widest text-fuchsia-950 mt-0.5">
            CTP6KX
          </span>
        </div>
      </div>

      {/* Two-Column Textbook Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-4 text-justify">
          <p>
            We can observe many changes around us. For example changes in seasons, change during sunrise and sunset, changes in tides of sea etc. Have you ever thought about the cause behind these changes? In ancient days, people thought that an invisible force was responsible for the changes occurring in nature. Even now many people believe that an invisible force exists that causes whatever is happening in the world.
          </p>

          <p>
            Later, the concept of force was developed, but it was limited to explaining our efforts and actions. The words force, effort, strength and power had almost the same meaning at that time. Have you ever wondered what forces are? What are the different types of forces and how do they act? Let&apos;s find out the answers to such questions in this chapter.
          </p>

          <p>
            For instance, when you ride a bicycle, most of the time your legs are pushing down on the pedals. To push you have to make an effort. When you pick up your school bag you have to make an effort in order to lift or pull the bag upwards and off the ground. When you open a door you make an effort on the door knob with your hands either to push the door forward or pull it backward.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 text-justify">
          <div>
            <h2 className="font-heading text-base font-bold text-fuchsia-900 mb-2">
              1.1 What is force?
            </h2>
            <p>
              Have you ever picked a heavy stone? How does a paper boy throw a newspaper? Have you ever wondered about this action? Actions like stretching a rubber band, pulling a rickshaw, rowing a boat etc., are some more examples where our efforts help to change the position or shape of the object. Such actions like picking, squeezing, twisting, stretching, lowering and lifting etc., cause a change in the state of an object. Now let us try to group these tasks as a pull or a push.
            </p>
          </div>

          {/* Activity-1 Box */}
          <div className="rounded-[18px] border border-fuchsia-200 bg-fuchsia-50/50 p-4 shadow-sm space-y-2">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-1
            </div>
            <h3 className="font-heading text-sm font-bold text-fuchsia-950">
              Identifying push or pull
            </h3>
            <p className="text-xs leading-relaxed text-foreground/85">
              Table-1 gives some examples involving the actions like digging, sucking, erasing, falling, attracting, raising etc. Classify these actions in terms of a push or a pull or both. Write pull or push in the blank boxes. If you feel that the action involves both push and pull, write &ldquo;both&rdquo; in the box.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">1</span>
      </div>
    </div>
  );
}
