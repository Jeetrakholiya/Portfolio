'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface EricCRTIntroLoaderProps {
  onComplete?: () => void;
  durationMs?: number;
}

export const EricCRTIntroLoader: React.FC<EricCRTIntroLoaderProps> = ({
  onComplete,
  durationMs = 2100,
}) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPoweringOn, setIsPoweringOn] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Handle manual skip on click or ESC
  const handleSkip = useCallback(() => {
    setIsPoweringOn(true);
    setIsExiting(true);
    setTimeout(() => {
      setIsLoaded(true);
      onComplete?.();
    }, 450);
  }, [onComplete]);

  // Stepped realistic percentage counter matching 017% Framer reference
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / durationMs) * 100));

      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(interval);
        // Stage 1: CRT Power-On Slit Flash
        setIsPoweringOn(true);
        setTimeout(() => {
          // Stage 2: TV Screen Zoom Into Page
          setIsExiting(true);
          setTimeout(() => {
            setIsLoaded(true);
            onComplete?.();
          }, 700);
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [durationMs, onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  if (isLoaded) return null;

  // Format 3-digit percentage e.g. "017%", "000%", "100%"
  const formattedProgress = `${String(progress).padStart(3, '0')}%`;

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={
            isExiting
              ? { opacity: 0, scale: 2.8, filter: 'blur(12px)' }
              : { opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#09090b] flex items-center justify-center select-none overflow-hidden"
          onClick={handleSkip}
        >
          {/* Outer Vignette Darkening */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,25,28,0.2)_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none" />

          {/* =================================================================
              1. RETRO CRT TV OUTER METALLIC FRAME & BEZEL
              ================================================================= */}
          <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] p-2 sm:p-6 md:p-10 lg:p-14 flex items-center justify-center">
            
            {/* Outer TV Shell / Silver & Dark Metallic Bezel Frame */}
            <div className="relative w-full h-full max-w-[1380px] aspect-[16/10] sm:aspect-[16/9] bg-[#222120] rounded-[24px] sm:rounded-[44px] md:rounded-[60px] p-3 sm:p-6 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.95),inset_0_4px_16px_rgba(255,255,255,0.3),inset_0_-10px_30px_rgba(0,0,0,0.9)] border-4 sm:border-8 border-[#383633] flex items-center justify-center">
              
              {/* Inner Metallic Bevel Gradient Layer */}
              <div className="relative w-full h-full bg-[#151413] rounded-[18px] sm:rounded-[34px] md:rounded-[48px] p-2 sm:p-4 md:p-6 shadow-[inset_0_15px_35px_rgba(0,0,0,0.98),inset_0_2px_6px_rgba(255,255,255,0.18)] border-2 sm:border-4 border-[#242321] flex items-center justify-center overflow-hidden">
                
                {/* Corner Metallic Accent Screws */}
                <div className="absolute top-3 left-4 w-2.5 h-2.5 rounded-full bg-[#111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] hidden sm:block" />
                <div className="absolute top-3 right-4 w-2.5 h-2.5 rounded-full bg-[#111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] hidden sm:block" />
                <div className="absolute bottom-3 left-4 w-2.5 h-2.5 rounded-full bg-[#111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] hidden sm:block" />
                <div className="absolute bottom-3 right-4 w-2.5 h-2.5 rounded-full bg-[#111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] hidden sm:block" />

                {/* =================================================================
                    2. CURVED DARK CRT GLASS SCREEN TUBE (Matches User Screenshot)
                    ================================================================= */}
                <div className="relative w-full h-full bg-[#040404] rounded-[16px] sm:rounded-[30px] md:rounded-[42px] overflow-hidden flex flex-col items-center justify-center shadow-[inset_0_0_90px_rgba(0,0,0,0.98),inset_0_0_35px_rgba(0,0,0,0.95)] border border-white/[0.08]">
                  
                  {/* CRT Horizontal Scanlines Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-45 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.75)_50%)] bg-[length:100%_4px]"
                    aria-hidden="true"
                  />

                  {/* CRT Curved Glass Reflection / Specular Highlight */}
                  <div className="absolute inset-0 pointer-events-none z-20 rounded-[inherit] shadow-[inset_0_0_70px_rgba(255,255,255,0.08),inset_0_4px_20px_rgba(255,255,255,0.12)]" />
                  
                  {/* CRT Tube Phosphor Ambient Glow */}
                  <motion.div
                    animate={{ opacity: [0.02, 0.06, 0.03, 0.07, 0.02] }}
                    transition={{ repeat: Infinity, duration: 0.2, ease: 'linear' }}
                    className="absolute inset-0 bg-white pointer-events-none z-10"
                  />

                  {/* Horizontal Rolling Beam Sweep */}
                  <motion.div
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
                    className="absolute inset-x-0 h-36 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent pointer-events-none z-20"
                  />

                  {/* =================================================================
                      3. CENTER PERCENTAGE COUNTER (Exact Match: 017%)
                      ================================================================= */}
                  <div className="relative z-30 flex flex-col items-center justify-center">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="font-mono text-2xl sm:text-4xl md:text-5xl font-medium tracking-[0.25em] text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.7)]"
                    >
                      {formattedProgress}
                    </motion.span>
                  </div>

                  {/* =================================================================
                      4. AUTHENTIC CRT POWER-ON PHOSPHOR FLASH & EXPANSION BEAM
                      ================================================================= */}
                  {isPoweringOn && (
                    <>
                      {/* Horizontal CRT Beam Slit opening vertically */}
                      <motion.div
                        initial={{ scaleY: 0.005, scaleX: 0, opacity: 0 }}
                        animate={{
                          scaleX: [0, 1, 1],
                          scaleY: [0.005, 0.015, 1],
                          opacity: [0, 1, 0.95],
                        }}
                        transition={{ duration: 0.45, times: [0, 0.3, 1], ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 bg-white z-40 pointer-events-none shadow-[0_0_60px_rgba(255,255,255,1)]"
                      />

                      {/* Screen Glitch Horizontal Flash Line */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0.6, 1, 0] }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-[#00f59b]/20 mix-blend-screen z-50 pointer-events-none"
                      />
                    </>
                  )}

                  {/* Bottom CRT Status Bar */}
                  <div className="absolute bottom-3 sm:bottom-6 inset-x-0 flex items-center justify-between px-5 sm:px-10 text-[9px] sm:text-[10px] font-mono text-white/30 uppercase tracking-widest pointer-events-none z-30">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-pulse" />
                      <span>SYS.BOOT // CRT-90</span>
                    </span>
                    <span className="hidden sm:inline">SIGNAL: 100% OK &bull; CH 04</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Right Skip Prompt */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSkip();
                }}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white/70 hover:text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-widest transition-all shadow-lg"
              >
                Skip [ESC]
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
