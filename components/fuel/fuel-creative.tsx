'use client';

import React, { useRef, useState } from 'react';
import { CreativeWork } from '@/types/creative';
import { creativeWorksData } from '@/data/creative';
import { Flame, Play, Pause, ArrowUpRight, Volume2, Instagram } from 'lucide-react';

export interface FuelCreativeProps {
  creativeWorks?: CreativeWork[];
}

export const FuelCreative: React.FC<FuelCreativeProps> = ({ creativeWorks }) => {
  const works = creativeWorks || creativeWorksData;
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const verticalReels = works.filter((w) => w.orientation === 'vertical');
  const landscapeFilms = works.filter((w) => w.orientation === 'landscape');

  return (
    <section
      id="creative"
      aria-label="Fuel J.GAZE Creative Media Studio"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#08080c] text-[#f8fafc] border-t border-white/10"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 font-mono text-xs text-[#ff5500] uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            <span>J.GAZE_ Visual Studio</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white">
            Cinematic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] via-[#ff8800] to-[#a855f7]">
              Media Lab.
            </span>
          </h2>
        </div>

        <div className="space-y-2 max-w-md font-mono text-xs text-muted">
          <p className="uppercase tracking-wider leading-relaxed">
            Videography &bull; Video Editing &bull; Visual Storytelling. Dynamic pacing, match cuts, and color harmonization.
          </p>
          <a
            href="https://www.instagram.com/j.gaze_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white hover:text-[#ff5500] uppercase tracking-widest font-bold pt-1 transition-colors"
          >
            <Instagram className="w-4 h-4 text-[#ff5500]" />
            <span>@j.gaze_ on Instagram ↗</span>
          </a>
        </div>
      </div>

      {/* Media Grid: Vertical Reels + Landscape Studio Screen */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: 9:16 Vertical Reel Showcase */}
        {verticalReels.slice(0, 2).map((reel) => (
          <div
            key={reel.id}
            className="lg:col-span-4 relative group p-4 bg-[#0e0e14] border border-white/15 rounded-[4px] shadow-2xl hover:border-[#ff5500]/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-white/10">
                <span className="text-[#ff5500] font-black text-[11px] uppercase tracking-widest">
                  9:16 REEL &bull; {reel.category}
                </span>
                <span className="text-white/60">{reel.year}</span>
              </div>

              {/* Video Player */}
              <div
                className="relative aspect-[9/16] w-full max-h-[480px] bg-black rounded-[2px] overflow-hidden border border-white/10 cursor-pointer"
                onMouseEnter={() => setPlayingVideoId(reel.id)}
                onMouseLeave={() => setPlayingVideoId(null)}
              >
                {reel.video && (
                  <video
                    src={reel.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    ref={(el) => {
                      if (el) {
                        if (playingVideoId === reel.id) el.play().catch(() => {});
                        else el.pause();
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* HUD Overlay */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 rounded font-mono text-[9px] text-[#ff5500] uppercase tracking-widest flex items-center gap-1.5 pointer-events-none">
                  <span className={`w-1.5 h-1.5 rounded-full ${playingVideoId === reel.id ? 'bg-[#ff5500] animate-ping' : 'bg-white/40'}`} />
                  <span>{playingVideoId === reel.id ? 'PLAYING' : 'HOVER TO PLAY'}</span>
                </div>
              </div>

              <h4 className="text-xl font-bold uppercase text-white tracking-tight">{reel.title}</h4>
              <p className="font-mono text-xs text-muted line-clamp-2">{reel.description}</p>
            </div>

            <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between font-mono text-xs">
              <span className="text-white/50">{Array.isArray(reel.role) ? reel.role.join(' &bull; ') : reel.role}</span>
              {reel.instagramUrl && (
                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff5500] hover:text-white uppercase font-bold text-[11px] inline-flex items-center gap-1"
                >
                  <span>Reel ↗</span>
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Right Column: 16:9 Landscape Cinematic Study */}
        {landscapeFilms.slice(0, 1).map((film) => (
          <div
            key={film.id}
            className="lg:col-span-8 relative group p-6 sm:p-8 bg-[#0e0e14] border border-white/15 rounded-[4px] shadow-2xl hover:border-[#ff5500]/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-white/10">
                <span className="text-[#ff5500] font-black uppercase tracking-widest">
                  16:9 CINEMATIC &bull; {film.category}
                </span>
                <span className="text-white/60">{film.year}</span>
              </div>

              {/* Video Player */}
              <div
                className="relative aspect-[16/9] w-full bg-black rounded-[2px] overflow-hidden border border-white/10 cursor-pointer"
                onMouseEnter={() => setPlayingVideoId(film.id)}
                onMouseLeave={() => setPlayingVideoId(null)}
              >
                {film.video && (
                  <video
                    src={film.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    ref={(el) => {
                      if (el) {
                        if (playingVideoId === film.id) el.play().catch(() => {});
                        else el.pause();
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* HUD Overlay */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/20 rounded font-mono text-[10px] text-[#ff5500] uppercase tracking-widest flex items-center gap-2 pointer-events-none">
                  <span className={`w-2 h-2 rounded-full ${playingVideoId === film.id ? 'bg-[#ff5500] animate-ping' : 'bg-white/40'}`} />
                  <span>{playingVideoId === film.id ? 'ACTIVE STREAM' : 'HOVER TO PLAY'}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  {film.title}
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                  {film.description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 mt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted">Disciplines:</span>
                <span className="text-white font-bold">
                  {Array.isArray(film.role) ? film.role.join(', ') : film.role}
                </span>
              </div>

              {film.instagramUrl && (
                <a
                  href={film.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#ff5500] text-black font-black uppercase text-[11px] rounded-[2px] hover:bg-[#ff7722] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>View on Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
