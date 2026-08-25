'use client';

import React from 'react';
import Image from 'next/image';
import { FuelGridMarkers } from './fuel-grid-markers';
import { ArrowUpRight } from 'lucide-react';

export const FuelManifesto: React.FC = () => {
  return (
    <section className="relative w-full py-20 sm:py-28 px-6 sm:px-12 lg:px-16 bg-[#070709] text-[#f8fafc] border-b border-white/10 overflow-hidden select-none">
      <FuelGridMarkers />

      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {/* Large Swiss Typography Statement */}
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-white tracking-tight">
            Design-forward impressive developer crafting{' '}
            <strong className="font-bold text-white">bold visuals</strong>, structured layouts, and high-impact digital systems inspired by{' '}
            <span className="text-[#ff5500] font-bold">modern aesthetics&reg;</span>.
          </h2>
        </div>

        {/* 3-Column Structured Dossier (Exact Reference Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 border-t border-white/10">
          {/* Column 1: Dossier Visual Preview */}
          <div className="md:col-span-4">
            <div className="relative aspect-[3/4] w-full max-w-[280px] rounded-[4px] overflow-hidden border border-white/15 bg-black shadow-xl">
              <Image
                src="/images/jeet-portrait.png"
                alt="Creator Model"
                fill
                sizes="280px"
                className="object-cover object-center grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Column 2: Strategy Notes (• Post) */}
          <div className="md:col-span-4 space-y-6 font-mono text-xs">
            <div className="space-y-2">
              <span className="text-muted text-[11px] block">(&bull; Post)</span>
              <p className="text-white/80 leading-relaxed font-sans text-sm">
                Igniting ideas with precision and emotional depth. Pixel-level architecture translates into intuitive visual digital systems that build impact and elevates experiences.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <span className="text-muted text-[11px] block">(&bull; Execution)</span>
              <p className="text-white/80 leading-relaxed font-sans text-sm">
                Driven by bold aesthetics and functional simplicity. Fuel blends modern front-end with post-production storytelling, delivering refined systems that push brands forward.
              </p>
            </div>
          </div>

          {/* Column 3: Results & Metrics (• Results) */}
          <div className="md:col-span-4 space-y-6 font-mono text-xs">
            <div className="space-y-4">
              <span className="text-muted text-[11px] block">(&bull; Results)</span>

              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-muted">Verified Systems</span>
                <span className="text-white font-bold text-sm">06</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-muted">Success Rate</span>
                <span className="text-[#ff5500] font-bold text-sm">100%</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#work"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#ff5500] hover:text-white transition-colors"
              >
                <span>Explore Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Monospace City / Tech Marquee */}
        <div className="pt-10 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 font-mono text-xs uppercase tracking-widest text-muted">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#ff5500]" />
            <span className="text-white">BASEL</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#ff5500]" />
            <span className="text-white">MONACO</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#ff5500]" />
            <span className="text-white">OSLO</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#ff5500]" />
            <span className="text-white">SAVANNAH</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#ff5500]" />
            <span className="text-white">GUJARAT</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#ff5500]" />
            <span className="text-white">INDIA</span>
          </span>
        </div>
      </div>
    </section>
  );
};
