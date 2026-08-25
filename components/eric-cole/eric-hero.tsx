'use client';

import React, { useState, useEffect } from 'react';
import { SiteContent } from '@/lib/content-service';
import { siteConfig } from '@/data/site';
import { RetroTVMonitor } from './retro-tv-monitor';
import { ArrowUpRight } from 'lucide-react';
import { ScrollRevealText } from '@/components/ui/scroll-reveal-text';

export interface EricHeroProps {
  siteContent?: SiteContent;
}

export const EricHero: React.FC<EricHeroProps> = ({ siteContent }) => {
  const name = siteContent?.name || siteConfig.name;
  const creativeName = siteContent?.creativeName || siteConfig.creativeName;
  const [timeString, setTimeString] = useState('10:39 WAT');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTimeString(`${istTime} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      aria-label="Eric Cole Studio Introduction"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between pt-6 pb-12 px-6 sm:px-12 lg:px-16 bg-transparent select-none font-sans"
    >
      {/* =================================================================
          1. TOP MINIMALIST HEADER BAR (EXACT VIDEO MATCH)
          ================================================================= */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between font-mono text-xs text-[#121214]/70 border-b border-[#121214]/10 pb-4">
        {/* Left Stacked Brand with Cursive Flourish */}
        <a href="#home" className="flex flex-col leading-none font-black text-sm uppercase tracking-tight text-[#121214]">
          <span className="flex items-center">
            <span className="font-flourish text-2xl lowercase pr-0.5 text-black">j</span>eet
          </span>
          <span className="flex items-center tracking-tighter">
            rakholiy<span className="font-flourish text-2xl lowercase text-black">a</span>
          </span>
        </a>

        {/* Center Nav Links */}
        <div className="hidden sm:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-[#121214]/80">
          <a href="#work" className="hover:text-black font-semibold transition-colors">+ WORK</a>
          <a href="#about" className="hover:text-black font-semibold transition-colors">+ ABOUT</a>
          <a href="#services" className="hover:text-black font-semibold transition-colors">+ SERVICES</a>
        </div>

        {/* Right Contact Link */}
        <a
          href="#contact"
          className="font-mono text-xs uppercase tracking-widest text-[#121214] font-bold hover:underline inline-flex items-center gap-1"
        >
          <span>CONTACT</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Location / Clock Bar */}
      <div className="w-full max-w-6xl mx-auto pt-3 flex items-center justify-between font-mono text-[11px] text-[#121214]/60 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span>&odot; GUJARAT, IN</span>
          <span>&bull;</span>
          <span className="text-[#121214] font-bold">{timeString}</span>
        </div>
        <span className="hidden sm:inline">FINAL-YEAR B.E. CS &amp; IT</span>
      </div>

      {/* =================================================================
          2. GIANT HEADLINE + CENTERPIECE RETRO CRT TV (EXACT VIDEO MATCH)
          ================================================================= */}
      <div className="my-auto py-8 sm:py-12 max-w-6xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Giant Display Title: JEET RAKHOLIYA with Cursive Flourishes */}
        <h1 className="text-[clamp(3.5rem,11vw,8.5rem)] font-black uppercase tracking-[-0.03em] leading-[0.82] text-[#121214] flex flex-col items-center">
          <span className="flex items-center">
            <span className="font-flourish text-[clamp(4.5rem,14vw,10.5rem)] leading-none text-black pr-1 lowercase">j</span>EET
          </span>
          <span className="flex items-center tracking-[-0.04em]">
            RAKHOLIY<span className="font-flourish text-[clamp(4.5rem,14vw,10.5rem)] leading-none text-black lowercase">a</span>
          </span>
        </h1>

        {/* Center Vintage Retro CRT TV + Right Bio Description */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          {/* Left / Center TV Monitor */}
          <div className="md:col-span-8 mx-auto w-full max-w-lg">
            <RetroTVMonitor variant="hero" />
          </div>

          {/* Right Side Bio Text (Matching Video Exact Copy) */}
          <div className="md:col-span-4 text-left font-mono text-xs space-y-2 text-[#121214]/80">
            <span className="block text-[10px] text-[#121214]/50 uppercase tracking-widest">
              ROLE &bull; FOCUS
            </span>
            <p className="text-sm font-bold uppercase tracking-wider text-[#121214] leading-relaxed">
              SOFTWARE ENGINEER FOCUSED ON BUILDING CALM, USABLE PRODUCTS.
            </p>
            <p className="text-[11px] text-[#121214]/60 leading-normal pt-1 font-sans">
              Full-Stack development, reactive interfaces, and cinematic storytelling through {creativeName}.
            </p>
          </div>
        </div>
      </div>

      {/* =================================================================
          3. BOTTOM PHILOSOPHY MANIFESTO (EXACT VIDEO MATCH)
          ================================================================= */}
      <div className="w-full max-w-6xl mx-auto pt-8 border-t border-[#121214]/10 space-y-4">
        <div className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-snug max-w-5xl">
          <ScrollRevealText
            text="I DESIGN AND DEVELOP DIGITAL TOOLS WITH AN EMPHASIS ON CLARITY, PERFORMANCE, AND RESTRAINT. CURRENTLY WORKING ON PRODUCTS THAT VALUE LONG-TERM THINKING OVER QUICK WINS."
            className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-snug"
          />
        </div>

        <div className="font-mono text-xs text-[#121214]/60 uppercase tracking-widest">
          [ BASED IN GUJARAT // WORKING GLOBALLY ]
        </div>
      </div>
    </section>
  );
};
