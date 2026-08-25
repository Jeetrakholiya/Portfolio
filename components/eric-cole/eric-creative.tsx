'use client';

import React, { useState } from 'react';
import { CreativeWork } from '@/types/creative';
import { creativeWorksData } from '@/data/creative';
import { siteConfig } from '@/data/site';
import { ArrowUpRight, Instagram, Film } from 'lucide-react';

export interface EricCreativeProps {
  creativeWorks?: CreativeWork[];
}

export const EricCreative: React.FC<EricCreativeProps> = ({ creativeWorks }) => {
  const works = creativeWorks || creativeWorksData;
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  return (
    <section
      id="creative"
      aria-label="Eric Cole Visual Storytelling Studio"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-12 lg:px-20 bg-[#0a0a0c] text-[#ececeb] border-t border-white/10 select-none font-sans"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10 font-mono text-xs">
          <div>
            <span className="text-white/50 uppercase tracking-widest block mb-1">Index &bull; 02</span>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              Visual Narrative ({siteConfig.creativeName})
            </h2>
          </div>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white uppercase tracking-wider text-[11px] inline-flex items-center gap-1 transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@j.gaze_ on Instagram ↗</span>
          </a>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {works.slice(0, 2).map((item, idx) => (
            <div
              key={item.id}
              className={`${idx === 0 ? 'md:col-span-5' : 'md:col-span-7'} space-y-3`}
            >
              {/* Video Player */}
              <div
                className={`relative w-full bg-black rounded-[2px] overflow-hidden border border-white/15 cursor-pointer ${
                  item.orientation === 'vertical' ? 'aspect-[9/16] max-h-[460px] mx-auto' : 'aspect-[16/9]'
                }`}
                onMouseEnter={() => setPlayingVideoId(item.id)}
                onMouseLeave={() => setPlayingVideoId(null)}
              >
                {item.video && (
                  <video
                    src={item.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    ref={(el) => {
                      if (el) {
                        if (playingVideoId === item.id) el.play().catch(() => {});
                        else el.pause();
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Viewfinder HUD */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-sm border border-white/20 rounded font-mono text-[9px] text-white uppercase tracking-widest flex items-center gap-1.5 pointer-events-none">
                  <span className={`w-1 h-1 rounded-full ${playingVideoId === item.id ? 'bg-white animate-ping' : 'bg-white/40'}`} />
                  <span>{playingVideoId === item.id ? 'ACTIVE' : 'HOVER TO PREVIEW'}</span>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between font-mono text-xs text-muted">
                  <span className="text-white font-bold uppercase">{item.title}</span>
                  <span>{item.year}</span>
                </div>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
