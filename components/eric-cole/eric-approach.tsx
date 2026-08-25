'use client';

import React from 'react';

export const EricApproach: React.FC = () => {
  const cards = [
    {
      dots: '•',
      num: '001',
      title: 'CLEAR COMMUNICATION',
      desc: "I KEEP THINGS SIMPLE AND DIRECT, SO EVERYONE KNOWS WHAT'S BEING BUILT, WHAT'S DONE, AND WHAT COMES NEXT.",
    },
    {
      dots: '••',
      num: '002',
      title: 'CLEAN, MAINTAINABLE CODE',
      desc: 'I BUILD WITH STRUCTURE IN MIND, SO THE PRODUCT STAYS EASY TO IMPROVE AND SCALE.',
    },
    {
      dots: '•••',
      num: '003',
      title: 'BUILT FOR REAL USE',
      desc: 'I THINK BEYOND THE SCREEN AND FOCUS ON HOW THINGS BEHAVE IN REAL WORKFLOWS, REAL EDGE CASES, AND REAL PRODUCTS.',
    },
    {
      dots: '••••',
      num: '004',
      title: 'FAST, STEADY EXECUTION',
      desc: 'I VALUE MOMENTUM, BUT NOT AT THE COST OF QUALITY. THE GOAL IS TO SHIP WORK THAT FEELS POLISHED AND DEPENDABLE.',
    },
  ];

  return (
    <section
      id="approach"
      aria-label="Eric Cole Engineering Approach"
      className="relative w-full py-24 sm:py-36 px-6 sm:px-12 lg:px-16 bg-transparent border-t border-current/10 select-none font-sans"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
        
        {/* =================================================================
            LEFT COLUMN: STICKY "APPROACH" TITLE WITH SCRIPT FLOURISH
            ================================================================= */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 z-10 space-y-4">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-normal tracking-[-0.04em] text-[#121214] flex items-baseline select-none">
            <span>APPR</span>
            <span className="font-flourish text-6xl sm:text-8xl lg:text-9xl text-black -mx-1 italic font-normal">O</span>
            <span>A</span>
            <span className="font-flourish text-6xl sm:text-8xl lg:text-9xl text-black -mx-1 italic font-normal">C</span>
            <span>H</span>
          </h2>
        </div>

        {/* =================================================================
            CENTER COLUMN: SCROLLING CARDS STREAM (ONLY CARDS SCROLL PAST)
            ================================================================= */}
        <div className="lg:col-span-4 space-y-24 sm:space-y-36 py-6">
          {cards.map((card) => (
            <div
              key={card.num}
              className="w-full bg-[#f4f4f0] border border-[#121214]/30 rounded-[2px] shadow-sm overflow-hidden transition-all duration-cinematic hover:border-[#121214] hover:shadow-md"
            >
              {/* Card Header Bar with Dots (Exact Match to Screenshot) */}
              <div className="px-5 py-2.5 border-b border-[#121214]/20 flex items-center font-mono text-xs text-[#121214]/70">
                <span className="tracking-widest font-bold">{card.dots}</span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 space-y-6 font-mono text-xs">
                <span className="text-[#121214] font-semibold block text-sm">
                  {card.num}
                </span>

                <h3 className="text-sm font-bold uppercase text-[#121214] tracking-wider">
                  {card.title}
                </h3>

                <p className="text-xs text-[#121214]/70 leading-relaxed font-mono uppercase">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* =================================================================
            RIGHT COLUMN: STICKY PHILOSOPHY STATEMENT (EXACT SCREENSHOT MATCH)
            ================================================================= */}
        <div className="lg:col-span-4 lg:sticky lg:top-1/2 lg:-translate-y-1/2 z-10 flex items-center pt-8 lg:pt-0">
          <p className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-[#121214]/30 tracking-tight leading-[1.08] select-none">
            I CARE ABOUT BUILDING PRODUCTS THAT ARE RELIABLE, EASY TO USE, AND EASY TO MAINTAIN.
          </p>
        </div>

      </div>
    </section>
  );
};
