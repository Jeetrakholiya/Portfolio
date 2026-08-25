'use client';

import React, { useState } from 'react';
import { Tv, Power, Volume2, VolumeX, Shuffle, Eye, ChevronUp, ChevronDown, Sliders, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RetroTVRemote: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tvPoweredOff, setTvPoweredOff] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(4);
  const [isMonochrome, setIsMonochrome] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showStaticGlitch, setShowStaticGlitch] = useState(false);

  // Synthesize realistic retro tactile click sound using Web Audio API
  const playClickAudio = (freq = 800, type: OscillatorType = 'sine') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  };

  const triggerChannelChange = (delta: number) => {
    playClickAudio(600, 'square');
    setShowStaticGlitch(true);
    setTimeout(() => setShowStaticGlitch(false), 350);
    setCurrentChannel((prev) => {
      let next = prev + delta;
      if (next > 8) next = 1;
      if (next < 1) next = 8;
      return next;
    });
  };

  const handlePowerToggle = () => {
    playClickAudio(400, 'triangle');
    setTvPoweredOff((prev) => !prev);
  };

  const handleMonochromeToggle = () => {
    playClickAudio(900, 'sine');
    setIsMonochrome((prev) => !prev);
  };

  return (
    <>
      {/* Static Burst Glitch Overlay when changing channels */}
      {showStaticGlitch && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:3px_3px] opacity-70 animate-ping" />
      )}

      {/* Monochrome Filter Class application */}
      {isMonochrome && (
        <style dangerouslySetInnerHTML={{ __html: `
          #eric-root, main, section {
            filter: grayscale(100%) contrast(115%) !important;
          }
        `}} />
      )}

      {/* CRT Beam Collapse Power-Off Animation Screen Overlay */}
      {tvPoweredOff && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-auto">
          {/* Collapse horizontal line to center dot */}
          <motion.div
            initial={{ scaleX: 1, scaleY: 1, opacity: 1 }}
            animate={{ scaleX: 0, scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-1 bg-white shadow-[0_0_50px_#fff]"
          />
          
          <div className="absolute top-12 left-1/2 -translate-x-1/2 font-mono text-xs text-white/50 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>CRT TV POWERED OFF // STANDBY MODE</span>
            <button
              onClick={handlePowerToggle}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded font-bold uppercase tracking-wider"
            >
              Turn On
            </button>
          </div>
        </div>
      )}

      {/* Floating Remote Trigger Tab on Right Side */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#16161a] hover:bg-[#222228] border-l-2 border-y-2 border-white/20 rounded-l-2xl p-2.5 shadow-2xl flex flex-col items-center gap-2 font-mono text-[10px] text-white/80 transition-all hover:pr-4"
        title="Tactile 90s TV Remote Control"
      >
        <Tv className="w-4 h-4 text-white" />
        <span className="[writing-mode:vertical-lr] rotate-180 uppercase tracking-widest font-bold text-white/60">
          TV REMOTE
        </span>
      </button>

      {/* Vintage 90s TV Remote Control Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.95 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-56 bg-gradient-to-b from-[#222228] via-[#1a1a1f] to-[#121216] border-2 border-white/25 rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9)] font-mono select-none space-y-4 text-white"
          >
            {/* Top Infrared Transmitter LED & Close Button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_#f00] animate-pulse" />
                <span className="text-[10px] font-bold tracking-wider text-white/80 uppercase">
                  RC-901 REMOTE
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white text-xs font-bold"
              >
                &times;
              </button>
            </div>

            {/* Power Button */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePowerToggle}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xs transition-all shadow-md active:scale-90 ${
                  tvPoweredOff
                    ? 'bg-green-600 text-white shadow-[0_0_15px_#22c55e]'
                    : 'bg-red-600 text-white shadow-[0_0_15px_#ef4444]'
                }`}
                title="CRT TV Power On / Off"
              >
                <Power className="w-5 h-5" />
              </button>

              {/* Current Channel Display */}
              <div className="text-right">
                <span className="text-[10px] text-white/40 block">CHANNEL</span>
                <span className="text-xl font-black text-green-400 font-mono tracking-widest drop-shadow-[0_0_8px_#4ade80]">
                  CH 0{currentChannel}
                </span>
              </div>
            </div>

            {/* Channel Up / Down Keypad */}
            <div className="p-3 bg-black/60 border border-white/10 rounded-2xl space-y-2">
              <span className="text-[9px] text-white/40 uppercase block text-center font-bold tracking-wider">
                TUNER CONTROLS
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => triggerChannelChange(1)}
                  className="py-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all"
                >
                  <ChevronUp className="w-4 h-4 text-green-400" />
                  <span>CH ▲</span>
                </button>

                <button
                  onClick={() => triggerChannelChange(-1)}
                  className="py-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all"
                >
                  <ChevronDown className="w-4 h-4 text-green-400" />
                  <span>CH ▼</span>
                </button>
              </div>
            </div>

            {/* Picture & Audio Mode Toggles */}
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <button
                onClick={handleMonochromeToggle}
                className={`py-2.5 px-2 rounded-xl border font-bold flex flex-col items-center gap-1 transition-all ${
                  isMonochrome
                    ? 'border-green-400 bg-green-400/20 text-white'
                    : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isMonochrome ? 'B&W (ON)' : 'COLOR'}</span>
              </button>

              <button
                onClick={() => {
                  playClickAudio(500, 'sine');
                  setIsMuted((prev) => !prev);
                }}
                className={`py-2.5 px-2 rounded-xl border font-bold flex flex-col items-center gap-1 transition-all ${
                  !isMuted
                    ? 'border-green-400 bg-green-400/20 text-white'
                    : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
                }`}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-green-400" />}
                <span>{isMuted ? 'MUTED' : 'AUDIO ON'}</span>
              </button>
            </div>

            <div className="text-center pt-1 border-t border-white/10">
              <span className="text-[8px] text-white/30 uppercase tracking-widest">
                &bull; ERIC COLE STUDIO BROADCAST &bull;
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
