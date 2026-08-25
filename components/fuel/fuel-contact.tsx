'use client';

import React, { useState } from 'react';
import { SiteContent } from '@/types/content';
import { siteConfig } from '@/data/site';
import { FuelGridMarkers } from './fuel-grid-markers';
import { ArrowUpRight, Copy, Check, Flame } from 'lucide-react';

export interface FuelContactProps {
  siteContent?: SiteContent;
}

export const FuelContact: React.FC<FuelContactProps> = ({ siteContent }) => {
  const email = siteContent?.email || siteConfig.email;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <footer
      id="contact"
      aria-label="Fuel Contact and Footer"
      className="relative w-full pt-20 sm:pt-32 pb-10 px-6 sm:px-12 lg:px-16 bg-[#070709] text-[#f8fafc] overflow-hidden select-none"
    >
      <FuelGridMarkers />

      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {/* =================================================================
            1. TOP: LET'S WORK TOGETHER & MASSIVE EMAIL
            ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Headline & Email */}
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-xs text-[#ff5500] uppercase tracking-widest block">
              Let&apos;s work together
            </span>
            <h2
              onClick={handleCopy}
              className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight hover:text-[#ff5500] cursor-pointer transition-colors break-all leading-[0.95]"
              title="Click to copy email"
            >
              {email}
            </h2>

            <div className="pt-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#ff5500] hover:text-white transition-all shadow-lg"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Contact Now'}</span>
              </button>
            </div>
          </div>

          {/* Right: Clean Navigation Links with Arrows */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="space-y-2 font-mono text-xs uppercase tracking-widest">
              <a href="#home" className="flex items-center justify-between gap-8 py-1 text-muted hover:text-white transition-colors border-b border-white/10">
                <span>Home</span>
                <span className="text-[#ff5500]">&rarr;</span>
              </a>
              <a href="#work" className="flex items-center justify-between gap-8 py-1 text-muted hover:text-white transition-colors border-b border-white/10">
                <span>Portfolio</span>
                <span className="text-[#ff5500]">&rarr;</span>
              </a>
              <a href="#creative" className="flex items-center justify-between gap-8 py-1 text-muted hover:text-white transition-colors border-b border-white/10">
                <span>About</span>
                <span className="text-[#ff5500]">&rarr;</span>
              </a>
              <a href="#contact" className="flex items-center justify-between gap-8 py-1 text-muted hover:text-white transition-colors border-b border-white/10">
                <span>Contact</span>
                <span className="text-[#ff5500]">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* =================================================================
            2. BOTTOM GIANT LOGO FINALE: FUEL X (EXACT VIDEO MATCH)
            ================================================================= */}
        <div className="pt-10 border-t border-white/10 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-[clamp(4.5rem,16vw,15rem)] font-black uppercase tracking-[-0.04em] leading-[0.8] text-white">
            <span className="tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
              FUEL
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] to-[#ffaa00] drop-shadow-[0_0_40px_rgba(255,85,0,0.4)]">
              X
            </span>
          </div>

          <div className="w-full flex items-center justify-between font-mono text-[11px] text-muted pt-3 uppercase tracking-widest">
            <div className="flex items-center gap-3">
              <span className="text-white/80 font-bold">&copy; 2026</span>
              <span className="text-white/20">/</span>
              <span className="text-[#ff5500]">10&apos;</span>
            </div>

            {/* Sound Bars Graphic */}
            <div className="flex items-center gap-1">
              <span className="w-0.5 h-3 bg-[#ff5500] animate-pulse" />
              <span className="w-0.5 h-5 bg-[#ff5500] animate-pulse delay-75" />
              <span className="w-0.5 h-2 bg-[#ff5500] animate-pulse delay-150" />
              <span className="w-0.5 h-4 bg-[#ff5500] animate-pulse delay-100" />
              <span className="w-0.5 h-1 bg-[#ff5500]" />
            </div>

            <span className="text-white/60">
              Jeet Rakholiya &bull; J.GAZE_
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
