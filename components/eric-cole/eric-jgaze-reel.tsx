'use client';

import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Film, Radio } from 'lucide-react';
import { ScrollRevealText } from '@/components/ui/scroll-reveal-text';

export interface EricJGazeReelProps {
  className?: string;
}

export const EricJGazeReel: React.FC<EricJGazeReelProps> = ({ className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    videoRef.current.volume = 1.0;
    setIsMuted(nextMuted);

    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section
      id="jgaze"
      aria-label="J.GAZE Creative Atelier & Horizontal Reel"
      className={`relative w-full py-24 sm:py-36 px-6 sm:px-12 lg:px-16 bg-transparent border-t border-current/10 select-none font-sans ${className}`}
    >
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        
        {/* =================================================================
            1. OLD MONEY EDITORIAL HEADER & BRAND MONOGRAM
            ================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-8 border-b border-current/10">
          <div className="space-y-3 max-w-2xl">
            {/* Atelier Crest / Heritage Tag */}
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] opacity-60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ATELIER DE CRÉATION &bull; EST. 2024</span>
            </div>

            {/* Old Money Serif & Cursive Title */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-[-0.03em] leading-none">
              J.GAZE<span className="font-flourish text-5xl sm:text-7xl lg:text-8xl lowercase text-current">_</span>
            </h2>

            <p className="font-mono text-xs uppercase tracking-widest opacity-70 pt-1">
              THE CINEMATIC &bull; EDITORIAL DIRECTION STUDIO BY JEET RAKHOLIYA
            </p>
          </div>

          {/* Right Archival Monogram Stamp */}
          <div className="text-left sm:text-right font-mono text-xs opacity-60 space-y-1 uppercase tracking-widest">
            <div>[ ARCHIVE NO. 01935 ]</div>
            <div>4K CINEMATOGRAPHY &bull; 16:9 AUDIO</div>
          </div>
        </div>

        {/* =================================================================
            2. VINTAGE RETRO TV WITH HORIZONTAL REEL IN 16:9 RATIO
            ================================================================= */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Outer Vintage TV Console Housing */}
          <div className="relative bg-[#16161a] border-4 border-[#282830] rounded-[24px] sm:rounded-[32px] p-3 sm:p-6 shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden">
            
            {/* TV Top Bar with Channel and Mode Indicators */}
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-white/50 pb-3 sm:pb-4 px-2 uppercase tracking-widest border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
                <span className="text-white font-bold">J.GAZE // CINEMATIC REEL</span>
              </div>
              <div className="flex items-center gap-4">
                <span>SIGNAL: 4K STEREO</span>
                <span className="hidden sm:inline">CH: 01 &bull; 16:9</span>
              </div>
            </div>

            {/* CRT TV Screen with Horizontal 16:9 Video */}
            <div
              onClick={toggleMute}
              className="relative aspect-video w-full bg-black rounded-[16px] sm:rounded-[20px] overflow-hidden my-3 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] group cursor-pointer"
            >
              {/* HTML5 Video Element with Full AAC Stereo Audio */}
              <video
                ref={videoRef}
                src="/videos/j-gaze-reel.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* CRT Phosphor Scanlines Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.7)_50%)] bg-[length:100%_4px]"
                aria-hidden="true"
              />

              {/* CRT Curved Glass Inner Bevel & Glow */}
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0_0_35px_rgba(255,255,255,0.08),inset_0_4px_12px_rgba(255,255,255,0.15)]" />

              {/* Floating Unmute Sound Indicator Badge */}
              {isMuted ? (
                <div className="absolute top-4 right-4 z-30 pointer-events-none">
                  <div className="px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/30 rounded-full font-mono text-[10px] sm:text-xs text-white uppercase tracking-widest flex items-center gap-2 shadow-lg animate-pulse">
                    <VolumeX className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>CLICK SCREEN TO UNMUTE SOUND</span>
                  </div>
                </div>
              ) : (
                <div className="absolute top-4 right-4 z-30 pointer-events-none">
                  <div className="px-3 py-1.5 bg-[#00f59b]/20 backdrop-blur-md border border-[#00f59b]/40 rounded-full font-mono text-[10px] sm:text-xs text-[#00f59b] uppercase tracking-widest flex items-center gap-2 shadow-lg">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>STEREO AUDIO ACTIVE (100%)</span>
                  </div>
                </div>
              )}

              {/* Bottom Interactive Video Controller Bar */}
              <div className="absolute bottom-3 inset-x-3 sm:inset-x-6 flex items-center justify-between p-2 sm:p-3 bg-black/80 backdrop-blur-md border border-white/20 rounded-[8px] font-mono text-xs text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className={`p-1.5 rounded transition-colors flex items-center gap-1.5 ${
                      isMuted ? 'bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/40' : 'bg-white/10 text-white'
                    }`}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span className="text-[10px] font-bold uppercase">{isMuted ? 'UNMUTE' : 'MUTE'}</span>
                  </button>

                  <span className="text-[11px] text-white/70 uppercase tracking-widest hidden sm:inline">
                    REEL // IMG_1935
                  </span>
                </div>

                <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest hidden sm:block">
                  [ J.GAZE_ DIRECTORS CUT ]
                </div>
              </div>
            </div>

            {/* Bottom TV Chassis Knobs & Speaker Grid */}
            <div className="flex items-center justify-between pt-2 px-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="w-4 h-4 rounded-full bg-[#2a2a32] border border-white/20 hover:border-white transition-colors cursor-pointer"
                  title="Audio Toggle Knob"
                />
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-4 h-4 rounded-full bg-[#2a2a32] border border-white/20 hover:border-white transition-colors cursor-pointer"
                  title="Play Toggle Knob"
                />
                <span>ANALOG CONTROLS</span>
              </div>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* =================================================================
            3. OLD MONEY PHILOSOPHY & THREE ATELIER PILLARS
            ================================================================= */}
        <div className="space-y-12">
          {/* Scroll Darkening Manifesto */}
          <div className="max-w-4xl mx-auto text-left sm:text-center space-y-6">
            <div className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-snug">
              <ScrollRevealText
                text="WE DON'T CHASE EPHEMERAL TRENDS. WE CRAFT TIMELESS DIGITAL IDENTITIES THROUGH CLASSICAL RESTRAINT, CINEMATIC COMPOSITION, AND MATHEMATICAL CODE DISCIPLINE."
                className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-snug"
              />
            </div>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-current/10 font-mono text-xs">
            {/* Pillar 01 */}
            <div className="space-y-3 p-6 rounded-[2px] border border-current/10 bg-current/[0.02]">
              <div className="flex items-center justify-between font-bold opacity-60">
                <span>01 // DIRECTION</span>
                <Film className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-current">
                CINEMATIC NARRATIVES
              </h3>
              <p className="opacity-70 leading-relaxed font-sans text-xs pt-1">
                Atmospheric pacing, film grain sensibilities, and high-fidelity video integration that transform standard portfolios into memorable cinema.
              </p>
            </div>

            {/* Pillar 02 */}
            <div className="space-y-3 p-6 rounded-[2px] border border-current/10 bg-current/[0.02]">
              <div className="flex items-center justify-between font-bold opacity-60">
                <span>02 // TYPOGRAPHY</span>
                <span className="font-flourish text-base lowercase">e</span>
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-current">
                OLD-MONEY EDITORIAL
              </h3>
              <p className="opacity-70 leading-relaxed font-sans text-xs pt-1">
                Restrained layout hierarchies, graceful cursive flourishes, and editorial archival typography inspired by timeless mid-century print.
              </p>
            </div>

            {/* Pillar 03 */}
            <div className="space-y-3 p-6 rounded-[2px] border border-current/10 bg-current/[0.02]">
              <div className="flex items-center justify-between font-bold opacity-60">
                <span>03 // ENGINEERING</span>
                <span>SYS &bull; 03</span>
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-current">
                ARCHITECTURAL PRECISION
              </h3>
              <p className="opacity-70 leading-relaxed font-sans text-xs pt-1">
                Clean Next.js architecture, reactive micro-interactions, and 60fps animations engineered to endure without technical fragility.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
