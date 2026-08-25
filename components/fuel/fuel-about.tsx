'use client';

import React from 'react';
import Image from 'next/image';
import { SiteContent } from '@/lib/content-service';
import { Flame, MapPin, GraduationCap, Code2, Film, Sparkles } from 'lucide-react';

export interface FuelAboutProps {
  siteContent?: SiteContent;
}

export const FuelAbout: React.FC<FuelAboutProps> = ({ siteContent }) => {
  const name = siteContent?.name || 'Jeet Rakholiya';
  const creativeName = siteContent?.creativeName || 'J.GAZE_';
  const location = siteContent?.location || 'Gujarat, India';
  const portraitImage = siteContent?.portraitImage || '/images/jeet-portrait.png';

  const pillars = [
    {
      icon: MapPin,
      label: 'Base Location',
      value: location,
      detail: 'Available for global high-impact software roles',
    },
    {
      icon: GraduationCap,
      label: 'Academic Standing',
      value: 'Final-Year B.E. in CS & IT',
      detail: 'L.J. Institute of Engineering & Technology',
    },
    {
      icon: Code2,
      label: 'Engineering Philosophy',
      value: 'Full-Stack & Intelligent Systems',
      detail: 'Clean architecture, performance, and scalability',
    },
    {
      icon: Film,
      label: 'Creative Domain',
      value: `${creativeName} Studio`,
      detail: 'Cinematic visual stories, reels, and video editing',
    },
  ];

  return (
    <section
      id="about"
      aria-label="Fuel Personal Story and Background"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#08080c] text-[#f8fafc] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 font-mono text-xs text-[#ff5500] uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5" />
              <span>Philosophy &bull; Story</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              The Dual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] to-[#ffaa00]">
                Discipline.
              </span>
            </h2>
          </div>

          <p className="font-mono text-xs sm:text-sm text-muted max-w-md uppercase tracking-wider leading-relaxed">
            Structuring robust backend systems and directing visual frames through the same standard of intent and discipline.
          </p>
        </div>

        {/* Dossier Card + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Hologram Portrait Card */}
          <div className="lg:col-span-5 relative group">
            <div className="relative p-3 bg-[#0c0c12] border border-white/20 rounded-[4px] shadow-2xl overflow-hidden group-hover:border-[#ff5500]/40 transition-all">
              <div className="relative aspect-[1024/612] w-full overflow-hidden rounded-[2px] bg-black">
                <Image
                  src={portraitImage}
                  alt={`${name} Profile`}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-center grayscale contrast-125 transition-transform duration-cinematic group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              <div className="flex items-center justify-between font-mono text-[10px] text-muted uppercase tracking-widest pt-3 border-t border-white/10 mt-2">
                <span>{name}</span>
                <span className="text-[#ff5500] font-bold">@{creativeName.toLowerCase().replace(/[^a-z0-9_]/g, '')}</span>
              </div>
            </div>
          </div>

          {/* Right: Bold Narrative Statement */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              &ldquo;I Build Software With Precision. I Frame Stories With Rhythm.&rdquo;
            </h3>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              My engineering journey is centered on building dependable software systems — connecting reactive user interfaces with robust backend APIs, relational &amp; document databases, and generative AI services.
            </p>
            <p className="text-sm sm:text-base text-muted leading-relaxed font-normal">
              Under <strong className="text-white font-semibold">{creativeName}</strong>, I translate that same focus into short-form visual storytelling, video editing, and cinematography. Both fields require harmony: one through clean code, and the other through cadence and light.
            </p>
          </div>
        </div>

        {/* 4 Pillars Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/10">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                className="p-6 bg-[#0c0c12] border border-white/10 rounded-[4px] space-y-3 hover:border-[#ff5500]/40 transition-colors"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <Icon className="w-4 h-4 text-[#ff5500]" />
                  <span className="font-mono text-[10px] text-[#ff5500] font-bold">0{idx + 1}</span>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-muted uppercase tracking-wider block">
                    {p.label}
                  </span>
                  <h4 className="text-base font-bold text-white uppercase tracking-tight">
                    {p.value}
                  </h4>
                  <p className="font-mono text-[11px] text-muted leading-tight pt-1">
                    {p.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
