'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface RetroTVMonitorProps {
  variant?: 'hero' | 'proof';
  className?: string;
}

export const RetroTVMonitor: React.FC<RetroTVMonitorProps> = ({
  variant = 'hero',
  className = '',
}) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const screens = [
    {
      src: '/images/projects/learnwise.svg',
      title: 'LEARNWISE AI // SYSTEM SCAN',
      ch: '01',
    },
    {
      src: '/images/projects/metro-times.svg',
      title: 'METRO TIMES // DIGITAL VAULT',
      ch: '02',
    },
    {
      src: '/images/projects/pdf-craft.svg',
      title: 'PDF CRAFT // FAST ENGINE',
      ch: '03',
    },
  ];

  // Authentic CRT Turn-On power sequence on mount
  useEffect(() => {
    const powerTimer = setTimeout(() => {
      setIsPoweredOn(true);
    }, 200);
    return () => clearTimeout(powerTimer);
  }, []);

  // Auto-cycle screen in hero mode
  useEffect(() => {
    if (variant !== 'hero') return;
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setActiveScreenIndex((prev) => (prev + 1) % screens.length);
        setIsGlitching(false);
      }, 150);
    }, 4500);
    return () => clearInterval(interval);
  }, [variant, screens.length]);

  const handleChannelSwitch = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setActiveScreenIndex((prev) => (prev + 1) % screens.length);
      setIsGlitching(false);
    }, 120);
  };

  return (
    <div
      onClick={handleChannelSwitch}
      className={`relative select-none flex items-center justify-center cursor-pointer group ${className}`}
      title="Click TV to Switch Channel"
    >
      {/* Outer TV Wrapper Matching Proportions of Vintage TV (377 / 258) */}
      <div className="relative aspect-[377/258] w-full max-w-[560px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.55)]">
        
        {/* =================================================================
            1. INNER SCREEN LAYER (Positioned precisely behind the CRT tube cutout)
            ================================================================= */}
        <div className="absolute left-[6.4%] top-[11.2%] w-[65.3%] h-[73.3%] bg-black rounded-[18px] sm:rounded-[24px] overflow-hidden z-0 flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.98)]">
          
          {/* CRT Horizontal Scanlines Overlay */}
          <div
            className="absolute inset-0 z-20 pointer-events-none opacity-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.65)_50%)] bg-[length:100%_3px]"
            aria-hidden="true"
          />

          {/* Curved CRT Glass Reflection Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] shadow-[inset_0_0_30px_rgba(255,255,255,0.09),inset_0_3px_10px_rgba(255,255,255,0.14)]" />

          {/* CRT SCREEN CONTENT: HERO DEMO vs CLIENT PROOF */}
          {variant === 'hero' ? (
            <div className="relative w-full h-full bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreenIndex}
                  initial={{ opacity: 0.7, filter: 'brightness(1.5)' }}
                  animate={{ opacity: 1, filter: 'brightness(1)' }}
                  exit={{ opacity: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={screens[activeScreenIndex].src}
                    alt={screens[activeScreenIndex].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover object-top"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* CRT Phosphor Glow / HUD Badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-30">
                <div className="px-2 py-0.5 bg-black/85 backdrop-blur-sm border border-white/20 rounded font-mono text-[8px] sm:text-[9px] text-[#00f59b] uppercase tracking-widest truncate max-w-[80%]">
                  {screens[activeScreenIndex].title}
                </div>
                <div className="px-1.5 py-0.5 bg-black/85 border border-[#00f59b]/40 rounded font-mono text-[8px] text-[#00f59b] font-bold">
                  CH {screens[activeScreenIndex].ch}
                </div>
              </div>
            </div>
          ) : (
            /* CLIENT PROOF CRT TERMINAL */
            <div className="relative w-full h-full bg-[#070b08] p-3.5 sm:p-5 font-mono text-xs flex flex-col justify-between text-[#80ffaa] shadow-[inset_0_0_25px_rgba(0,255,100,0.15)] z-10">
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-[#80ffaa]/20 pb-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-[#80ffaa]/80">
                <span className="font-bold flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#80ffaa] animate-pulse" />
                  <span>CLIENT PROOF</span>
                </span>
                <span>CH: 04 &bull; LIVE</span>
              </div>

              {/* Scrolling Testimonials inside TV */}
              <div className="space-y-2.5 my-auto py-1 text-[9px] sm:text-[10px] leading-relaxed">
                <div>
                  <div className="flex items-center justify-between text-[8px] text-[#80ffaa]/70">
                    <span className="font-bold text-[#80ffaa]">DANIEL KIM</span>
                    <span>PRODUCT MANAGER</span>
                  </div>
                  <p className="text-[#c8ffd8] italic">
                    &ldquo;He delivered everything faster than expected with great precision.&rdquo;
                  </p>
                </div>

                <div className="pt-1.5 border-t border-[#80ffaa]/10">
                  <div className="flex items-center justify-between text-[8px] text-[#80ffaa]/70">
                    <span className="font-bold text-[#80ffaa]">MICHAEL TURNER</span>
                    <span>STARTUP FOUNDER</span>
                  </div>
                  <p className="text-[#c8ffd8] italic">
                    &ldquo;Built a solid, reliable product with clean architecture.&rdquo;
                  </p>
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="flex items-center justify-between text-[8px] text-[#80ffaa]/50 uppercase tracking-widest pt-0.5 border-t border-[#80ffaa]/15">
                <span>SIGNAL: 100% OK</span>
                <span>SYS &bull; VERIFIED</span>
              </div>
            </div>
          )}

          {/* =================================================================
              CRT TURN-ON POWER BEAM ANIMATION (Cathode Ray Slit Expansion)
              ================================================================= */}
          {!isPoweredOn && (
            <motion.div
              initial={{ scaleX: 0, scaleY: 0.01, opacity: 1 }}
              animate={{
                scaleX: [0, 1, 1],
                scaleY: [0.01, 0.02, 1],
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 0.55, times: [0, 0.35, 1], ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-white z-40 pointer-events-none shadow-[0_0_40px_rgba(255,255,255,1)]"
            />
          )}

          {/* Channel Glitch Static Overlay */}
          {isGlitching && (
            <motion.div
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-white/40 mix-blend-overlay z-40 pointer-events-none"
            />
          )}
        </div>

        {/* =================================================================
            2. VINTAGE RETRO TV BEZEL (Overlay using isolated PNG)
            ================================================================= */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Image
            src="/images/retro-tv-isolated.png"
            alt="Vintage Retro TV Monitor"
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-contain"
            priority
          />
        </div>

      </div>
    </div>
  );
};
