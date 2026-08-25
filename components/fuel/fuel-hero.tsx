'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/content-service';
import { siteConfig } from '@/data/site';
import { FuelGridMarkers } from './fuel-grid-markers';
import { Flame, ArrowUpRight, Sparkles } from 'lucide-react';

export interface FuelHeroProps {
  siteContent?: SiteContent;
}

export const FuelHero: React.FC<FuelHeroProps> = ({ siteContent }) => {
  const name = siteContent?.name || siteConfig.name;
  const creativeName = siteContent?.creativeName || siteConfig.creativeName;
  const portraitImage = siteContent?.portraitImage || '/images/jeet-portrait.png';

  return (
    <section
      id="home"
      aria-label="Fuel Studio Introduction"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between p-4 sm:p-8 lg:p-10 bg-[#070709] text-[#f8fafc] overflow-hidden select-none border-b border-white/10"
    >
      <FuelGridMarkers />

      {/* =================================================================
          1. TOP NAVIGATION & FLOATING ORANGE CALLOUT
          ================================================================= */}
      <div className="relative z-20 w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2">
        {/* Brand & Left Callout Pill */}
        <div className="md:col-span-4 flex items-center gap-4">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-white">
            <Flame className="w-5 h-5 text-[#ff5500] animate-pulse" />
            <span className="font-extrabold text-base">FUEL</span>
          </div>

          {/* Floating Orange Kick-off Card (Matching Video Exact Reference) */}
          <div className="hidden xl:flex flex-col p-3 bg-[#ff5500] text-black rounded-[4px] shadow-[0_4px_20px_rgba(255,85,0,0.4)] max-w-xs font-sans">
            <p className="text-[11px] font-semibold leading-tight">
              Pick a plan, submit a job request, and your visual is kick-off within 24-48 hours.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider mt-1.5 hover:underline"
            >
              <span>Explore Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="md:col-span-4 flex items-center justify-center">
          <nav className="inline-flex items-center gap-6 px-5 py-2 bg-white/[0.04] border border-white/10 rounded-full font-mono text-xs uppercase tracking-widest text-muted backdrop-blur-md">
            <a href="#home" className="text-white font-bold hover:text-[#ff5500] transition-colors">Home</a>
            <a href="#work" className="hover:text-white transition-colors flex items-center gap-0.5">
              <span>Portfolio</span>
              <ArrowUpRight className="w-3 h-3 text-[#ff5500]" />
            </a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>

        {/* Right Floating Badge: Meet the Creator */}
        <div className="md:col-span-4 flex items-center justify-end">
          <div className="flex items-center gap-3 p-1.5 pl-3 bg-white/[0.04] border border-white/10 rounded-full font-mono text-xs text-white">
            <div className="text-right">
              <span className="block text-[11px] font-bold leading-none">Meet the Creator</span>
              <span className="text-[10px] text-muted leading-none">{name}</span>
            </div>
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20 bg-black">
              <Image src={portraitImage} alt={name} fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================
          2. CENTERPIECE VISUAL & LEFT METADATA
          ================================================================= */}
      <div className="relative z-10 my-auto py-8 sm:py-12 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Meta Tags */}
        <div className="md:col-span-3 space-y-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[#ff5500] font-bold block text-[11px]">01/ Strategy</span>
            <span className="text-white font-semibold text-sm uppercase block">Videography</span>
            <span className="text-muted block text-xs">Full-Stack Architecture</span>
          </div>

          <div className="pt-4 border-t border-white/10">
            <span className="text-muted uppercase tracking-wider block text-[10px]">Creative Identity</span>
            <span className="text-white font-bold">{creativeName}</span>
          </div>
        </div>

        {/* Center Framed Portrait with Warm Amber Rim Light */}
        <div className="md:col-span-6 relative mx-auto w-full max-w-md">
          <div className="relative aspect-[3/4] w-full rounded-[4px] overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(255,85,0,0.2)] bg-black group">
            <Image
              src={portraitImage}
              alt={`${name} Portrait`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-cover object-center grayscale contrast-125 transition-transform duration-cinematic group-hover:scale-[1.03]"
            />
            {/* Ambient Red/Orange Fuel Gradient Aura */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,85,0,0.25)_0%,_transparent_60%)] mix-blend-screen pointer-events-none" />
          </div>
        </div>

        {/* Right Empty / Spacer for Grid Balance */}
        <div className="hidden md:block md:col-span-3 text-right font-mono text-xs text-muted space-y-2">
          <span className="text-[#ff5500] block uppercase tracking-widest text-[10px]">● Active Production</span>
          <p className="text-white/70 text-[11px] leading-relaxed">
            Crafting high-impact digital experiences and cinematic stories.
          </p>
        </div>
      </div>

      {/* =================================================================
          3. BOTTOM GIANT HEADLINE: FUEL X (EXACT VIDEO MATCH)
          ================================================================= */}
      <div className="relative z-10 w-full pt-4 border-t border-white/10 flex flex-col items-center">
        {/* Giant Condensed Headline */}
        <div className="w-full flex items-center justify-between text-[clamp(4.5rem,15vw,14rem)] font-black uppercase tracking-[-0.04em] leading-[0.8] text-white">
          <span className="tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            FUEL
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] to-[#ffaa00] drop-shadow-[0_0_40px_rgba(255,85,0,0.4)]">
            X
          </span>
        </div>

        {/* Bottom Coordinates & Sound Level Bars */}
        <div className="w-full flex items-center justify-between font-mono text-[11px] text-muted pt-2 uppercase tracking-widest">
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

          <a href="#work" className="text-white/80 hover:text-[#ff5500] transition-colors">
            Scroll Down &darr;
          </a>
        </div>
      </div>
    </section>
  );
};
