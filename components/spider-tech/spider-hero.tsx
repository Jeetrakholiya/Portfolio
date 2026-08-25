'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SiteContent } from '@/lib/content-service';
import { siteConfig } from '@/data/site';
import { Zap, Shield, ArrowUpRight, Sparkles } from 'lucide-react';

export interface SpiderHeroProps {
  siteContent?: SiteContent;
}

export const SpiderHero: React.FC<SpiderHeroProps> = ({ siteContent }) => {
  const name = siteContent?.name || siteConfig.name;
  const [thwipActive, setThwipActive] = useState(false);

  const triggerThwip = () => {
    setThwipActive(true);
    setTimeout(() => setThwipActive(false), 900);
  };

  return (
    <section
      id="spider-hero"
      aria-label="Spider-Man Universe Hero"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between pt-8 pb-14 px-6 sm:px-12 lg:px-16 overflow-hidden select-none font-sans bg-transparent text-[#ffffff]"
    >

      {/* =================================================================
          2. TOP STATUS HUD (DARK SUIT RED & WHITE ON BLACK)
          ================================================================= */}
      <div className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-white/80 pb-4 border-b border-white/15 relative z-10">
        
        {/* Left Status Group */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c40c24] shadow-[0_0_10px_#c40c24] animate-pulse" />
            <span className="font-bold text-white tracking-wider">SPIDER-NETWORK // ACTIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-white/70">
            <Shield className="w-3.5 h-3.5 text-[#c40c24]" />
            <span>WEB INTEGRITY: 100% [ONLINE]</span>
          </div>
        </div>

        {/* Right Status Group */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5 text-[#c40c24]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-bold">SUIT ENGAGED</span>
          </div>
          <div className="text-white/80">
            &odot; GUJARAT, IN (UTC+5:30)
          </div>
        </div>

      </div>

      {/* =================================================================
          3. MAIN HERO TITLE (DARK SUIT RED, BLACK, WHITE)
          ================================================================= */}
      <div className="w-full max-w-7xl mx-auto my-auto py-12 space-y-8 relative z-10">
        
        {/* Dark Suit Red Intro Badge */}
        <div className="inline-flex items-center gap-3">
          <span className="w-10 h-0.5 bg-gradient-to-r from-transparent to-[#c40c24]" />
          <span className="font-mono text-xs text-[#c40c24] uppercase tracking-[0.34em] font-bold">
            YOUR STORY BEGINS HERE
          </span>
          <span className="w-10 h-0.5 bg-gradient-to-r from-[#c40c24] to-transparent" />
        </div>

        {/* Giant Pure White & Dark Suit Red Spider-Man Title */}
        <div className="relative space-y-2 group">
          <h1
            className="text-5xl sm:text-7xl lg:text-[7.5rem] font-black uppercase tracking-[-0.03em] leading-[0.92] text-white drop-shadow-[0_6px_35px_rgba(0,0,0,0.9)]"
          >
            {name}
          </h1>

          <div className="flex flex-wrap items-baseline gap-3 pt-2">
            <span className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#c40c24] drop-shadow-[0_0_15px_rgba(196,12,36,0.7)]">
              WHO ARE YOU UNDER THE MASK?
            </span>
          </div>
        </div>

        {/* Hero Mission Statement */}
        <p className="max-w-3xl text-sm sm:text-lg text-white/80 font-sans tracking-wide leading-relaxed pt-2">
          Every Spider-Man carries something different. Engineering high-speed web architectures, intelligent AI systems, and living digital experiences across the entire web.
        </p>

        {/* Action Controls & Dark Suit Red / White Chamfered Buttons */}
        <div className="flex flex-wrap items-center gap-5 pt-4 font-sans text-xs">
          
          {/* Primary Chamfered Dark Suit Red CTA */}
          <a
            href="#multiverse-work"
            data-web-hover="true"
            className="relative p-[2px] bg-gradient-to-b from-[#c40c24] to-[#60000e] [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)] shadow-[0_10px_30px_rgba(196,12,36,0.6)] active:scale-95 transition-transform inline-block"
          >
            <span className="px-7 py-3.5 bg-gradient-to-b from-[#c40c24] to-[#800010] [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] text-white font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              <span>EXPLORE THE WEB</span>
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>

          {/* Secondary White Chamfered CTA */}
          <a
            href="#spider-contact"
            data-web-hover="true"
            className="relative p-[2px] bg-gradient-to-b from-white to-white/40 [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)] shadow-[0_8px_25px_rgba(255,255,255,0.2)] active:scale-95 transition-transform inline-block"
          >
            <span className="px-7 py-3.5 bg-black [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] text-white hover:text-[#c40c24] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-colors">
              <span>SEND SPIDER-SIGNAL</span>
              <Zap className="w-4 h-4 text-[#c40c24]" />
            </span>
          </a>

          {/* Interactive "THWIP!" Web Trigger */}
          <button
            type="button"
            onClick={triggerThwip}
            data-web-hover="true"
            className={`px-5 py-3.5 rounded font-mono uppercase tracking-widest border transition-all flex items-center gap-2 ${
              thwipActive
                ? 'bg-[#c40c24] text-white border-[#c40c24] scale-105 shadow-[0_0_25px_#c40c24]'
                : 'bg-white/5 text-white/80 border-white/20 hover:border-[#c40c24] hover:text-[#c40c24]'
            }`}
          >
            <span>{thwipActive ? '⚡ THWIP! 🕸️' : 'TEST WEB-SHOOTER'}</span>
          </button>
        </div>

      </div>

      {/* =================================================================
          4. BOTTOM TELEMETRY BAR (DARK SUIT RED & WHITE)
          ================================================================= */}
      <div className="w-full max-w-7xl mx-auto pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs uppercase tracking-widest text-white/70 relative z-10">
        <div className="space-y-1">
          <span className="text-[#c40c24] font-bold block">[ 01 &bull; WEB FLUID ]</span>
          <span className="text-white">420 PSI // 100% OPTIMAL</span>
        </div>

        <div className="space-y-1">
          <span className="text-[#c40c24] font-bold block">[ 02 &bull; RADAR SWEEP ]</span>
          <span className="text-white">SPIDEY TRACKER ACTIVE</span>
        </div>

        <div className="space-y-1">
          <span className="text-white font-bold block">[ 03 &bull; FRAME RATE ]</span>
          <span className="text-white">60 FPS // HARDWARE ACCEL</span>
        </div>

        <div className="space-y-1">
          <span className="text-[#c40c24] font-bold block">[ 04 &bull; STATUS ]</span>
          <span className="text-[#c40c24] font-bold animate-pulse">PATROLLING THE CITY</span>
        </div>
      </div>
    </section>
  );
};
