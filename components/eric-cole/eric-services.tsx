'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollRevealText } from '@/components/ui/scroll-reveal-text';

export const EricServices: React.FC = () => {
  const serviceRows = [
    {
      num: '001',
      title: 'PRODUCT ENGINEERING',
      desc: 'BUILDING RELIABLE, SCALABLE APPLICATIONS FROM IDEA TO PRODUCTION. FOCUSED ON PERFORMANCE, STRUCTURE, AND LONG-TERM MAINTAINABILITY.',
    },
    {
      num: '002',
      title: 'FRONTEND DEVELOPMENT',
      desc: 'CLEAN, RESPONSIVE INTERFACES BUILT WITH ATTENTION TO DETAIL. DESIGNED TO FEEL FAST, INTUITIVE, AND CONSISTENT ACROSS DEVICES.',
    },
    {
      num: '003',
      title: 'DESIGN & CINEMATIC STORYTELLING',
      desc: 'BRIDGING MODERN WEB ENGINEERING WITH SHORT-FORM VIDEO PRODUCTION, MATCH CUTS, AND VISUAL CADENCE UNDER J.GAZE_.',
    },
    {
      num: '004',
      title: 'SYSTEM & AI ARCHITECTURE',
      desc: 'STRUCTURING CODEBASES AND FASTAPI / GEMINI AI BACKENDS THAT GROW WITHOUT BECOMING FRAGILE. MAKING FUTURE SYSTEMS SCALABLE.',
    },
  ];

  return (
    <section
      id="services"
      aria-label="Eric Cole Services and Offerings"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-transparent select-none font-sans"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Top Wireframe Target Graphic & Header */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Wireframe CRT Target Grid (Exact Video Match) */}
          <div className="relative w-28 h-28 border border-white/20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 border border-white/30 grid grid-cols-4 grid-rows-4" />
            <div className="absolute inset-x-0 h-px bg-white/30" />
            <div className="absolute inset-y-0 w-px bg-white/30" />
          </div>

          <div className="font-mono text-xs text-white/50 uppercase tracking-widest">
            [ HOW I HELP ]
          </div>

          <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-[-0.03em] text-white">
            SERVIC<span className="font-flourish text-5xl sm:text-8xl lowercase text-white">e</span>S
          </h2>

          <div className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-snug max-w-4xl pt-2 flex justify-center text-center">
            <ScrollRevealText
              text="I TAKE ON A LIMITED NUMBER OF PROJECTS EACH YEAR. MOSTLY FOCUSED ON BUILDING AND IMPROVING DIGITAL PRODUCTS THAT NEED CLARITY, STRUCTURE, AND THOUGHTFUL EXECUTION."
              colorScheme="dark"
              className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-snug text-center justify-center"
            />
          </div>
        </div>

        {/* Numbered Service Rows */}
        <div className="border-t border-white/15 divide-y divide-white/10 font-mono text-xs">
          {serviceRows.map((s) => (
            <div
              key={s.num}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group hover:bg-white/[0.02] px-2 sm:px-4 transition-colors"
            >
              <div className="md:col-span-2 text-white/50 font-bold text-sm">
                {s.num}
              </div>

              <div className="md:col-span-4 text-white font-bold text-sm uppercase tracking-wider">
                {s.title}
              </div>

              <div className="md:col-span-6 text-white/70 text-xs leading-relaxed font-sans">
                {s.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="pt-6 border-t border-white/15 flex items-center justify-between font-mono text-xs">
          <span className="text-white/50 uppercase tracking-widest text-[11px]">
            HAVE A PROJECT?
          </span>
          <a
            href="#contact"
            className="text-white font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:underline text-sm"
          >
            <span>LET&apos;S CHAT</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
