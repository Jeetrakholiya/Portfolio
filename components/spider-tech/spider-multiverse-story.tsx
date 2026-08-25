'use client';

import React from 'react';
import Image from 'next/image';
import { SiteContent } from '@/lib/content-service';
import { siteConfig } from '@/data/site';
import { MapPin, Award, Globe, Shield } from 'lucide-react';

export interface SpiderMultiverseStoryProps {
  siteContent?: SiteContent;
}

export const SpiderMultiverseStory: React.FC<SpiderMultiverseStoryProps> = ({
  siteContent,
}) => {
  const name = siteContent?.name || siteConfig.name;
  const portraitImage = siteContent?.portraitImage || '/images/jeet-about.jpg';

  return (
    <section
      id="spider-origin"
      aria-label="Spider-Man Identity & Origin"
      className="relative w-full py-24 sm:py-36 px-6 sm:px-12 lg:px-16 bg-transparent text-[#ffffff] select-none font-sans border-t border-white/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 relative z-10">
        
        {/* =================================================================
            1. SECTION HEADER
            ================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/15">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#c40c24]" />
              <span className="font-mono text-xs text-[#c40c24] uppercase tracking-[0.34em] font-bold">
                CLASSIFIED ARCHIVE &bull; DOSSIER
              </span>
              <span className="w-8 h-0.5 bg-gradient-to-r from-[#c40c24] to-transparent" />
            </div>

            <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-[-0.03em] text-white">
              ORIGIN <span className="text-[#c40c24] drop-shadow-[0_0_20px_rgba(196,12,36,0.6)]">&amp; MANIFESTO</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-white/60 space-y-1 uppercase tracking-widest text-left sm:text-right">
            <div>[ IDENTITY: VERIFIED ]</div>
            <div className="text-white font-bold">{name.toUpperCase()}</div>
          </div>
        </div>

        {/* =================================================================
            2. COMIC-BOOK SPLIT ORIGIN PANEL
            ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Halftone Spider Portrait with Dark Suit Red Border Frame */}
          <div className="lg:col-span-5 relative group">
            
            <div className="relative aspect-[4/5] w-full max-w-[420px] mx-auto rounded-[8px] overflow-hidden border-2 border-[#c40c24]/60 bg-black shadow-[0_0_35px_rgba(196,12,36,0.4)]">
              <Image
                src={portraitImage}
                alt={name}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/30 rounded font-mono text-[9px] text-white uppercase tracking-widest shadow-md">
                [ CODE: HERO // ACTIVE ]
              </div>

              {/* Dark Suit Red Tag at Bottom */}
              <div className="absolute bottom-4 inset-x-4 p-3 bg-black/85 backdrop-blur-md border border-[#c40c24]/60 rounded font-mono text-xs flex items-center justify-between shadow-lg">
                <span className="font-bold text-[#c40c24] tracking-widest">{name.toUpperCase()}</span>
                <span className="text-[10px] text-white/70">@J.GAZE_</span>
              </div>
            </div>

          </div>

          {/* Right Column: Origin Manifesto & Story */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Manifesto Quote Box */}
            <div className="p-6 sm:p-8 bg-[#0a0a0c] border-2 border-[#c40c24]/40 rounded-[8px] relative overflow-hidden shadow-xl space-y-4">
              <div className="font-mono text-xs text-[#c40c24] uppercase tracking-widest flex items-center gap-2 font-bold">
                <Shield className="w-3.5 h-3.5" />
                <span>CORE PROTOCOL // PHILOSOPHY</span>
              </div>

              <blockquote className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                &ldquo;WITH GREAT CODE COMES GREAT COMPUTATION. ANYONE CAN WEAR THE MASK &mdash; BUT CRAFTING RESILIENT ARCHITECTURES REQUIRES RELENTLESS MASTERY.&rdquo;
              </blockquote>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-4 font-mono text-xs sm:text-sm text-white/75 uppercase leading-relaxed">
              <p>
                BASED IN GUJARAT, INDIA, JEET RAKHOLIYA IS A FINAL-YEAR COMPUTER SCIENCE &amp; INFORMATION TECHNOLOGY ENGINEER WHO OPERATES AS A FULL-STACK SYSTEM BUILDER.
              </p>
              <p>
                FROM HIGH-SPEED REACT &amp; NEXT.JS TRAVERSAL TO HIGH-VOLTAGE BACKEND VENOM COMPUTE WITH FASTAPI AND PYTHON, HE BRIDGES THE CHASM BETWEEN METICULOUS DESIGN AND UNCOMPROMISING SOFTWARE RELIABILITY.
              </p>
            </div>

            {/* Origin Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#c40c24]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="font-bold uppercase">LOCATION</span>
                </div>
                <div className="text-white/70">GUJARAT, IN</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white">
                  <Award className="w-3.5 h-3.5" />
                  <span className="font-bold uppercase">EDUCATION</span>
                </div>
                <div className="text-white/70">B.E. CS &amp; IT</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#c40c24]">
                  <Globe className="w-3.5 h-3.5" />
                  <span className="font-bold uppercase">DOMAIN</span>
                </div>
                <div className="text-white/70">FULL-STACK &amp; AI</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
