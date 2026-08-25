'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInterfaceMode } from '@/components/providers/interface-mode-provider';
import { Terminal, Eye, Sparkles } from 'lucide-react';

export const InterfaceSwitcher: React.FC = () => {
  const { mode, setMode } = useInterfaceMode();

  return (
    <aside
      aria-label="Theme & Interface Switcher"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 z-40 select-none max-w-[calc(100vw-1.5rem)]"
    >
      <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-[#09090b]/90 backdrop-blur-xl border border-white/15 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.85)] font-mono text-xs overflow-x-auto">
        {/* Syntax Option */}
        <button
          onClick={() => setMode('syntax')}
          className={`relative px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-fast ${
            mode === 'syntax'
              ? 'text-white font-bold'
              : 'text-muted hover:text-white'
          }`}
          aria-label="Switch to Syntax interface"
        >
          {mode === 'syntax' && (
            <motion.div
              layoutId="switcher-active-bg"
              className="absolute inset-0 bg-white/15 border border-[#00f59b]/50 rounded-full shadow-[0_0_12px_rgba(0,245,155,0.25)]"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <Terminal className={`w-3.5 h-3.5 relative z-10 ${mode === 'syntax' ? 'text-[#00f59b]' : 'text-muted'}`} />
          <span className="relative z-10 uppercase tracking-wider text-[10px] sm:text-[11px]">Syntax</span>
        </button>

        {/* Spider-Tech / Spider-Verse Option */}
        <button
          onClick={() => setMode('fuel')}
          className={`relative px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-fast ${
            mode === 'fuel'
              ? 'text-white font-bold'
              : 'text-muted hover:text-white'
          }`}
          aria-label="Switch to Spider-Tech interface"
        >
          {mode === 'fuel' && (
            <motion.div
              layoutId="switcher-active-bg"
              className="absolute inset-0 bg-[#c40c24]/25 border border-[#c40c24]/80 rounded-full shadow-[0_0_16px_rgba(196,12,36,0.6)]"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="text-xs relative z-10">{mode === 'fuel' ? '🕷️' : '🕷️'}</span>
          <span className={`relative z-10 uppercase tracking-wider text-[10px] sm:text-[11px] ${mode === 'fuel' ? 'text-[#c40c24]' : 'text-white/70'}`}>Spider-Tech</span>
        </button>

        {/* Eric Cole Option */}
        <button
          onClick={() => setMode('eric-cole')}
          className={`relative px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-fast ${
            mode === 'eric-cole'
              ? 'text-white font-bold'
              : 'text-muted hover:text-white'
          }`}
          aria-label="Switch to Eric Cole interface"
        >
          {mode === 'eric-cole' && (
            <motion.div
              layoutId="switcher-active-bg"
              className="absolute inset-0 bg-white/20 border border-white/60 rounded-full shadow-[0_0_16px_rgba(255,255,255,0.3)]"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <Eye className={`w-3.5 h-3.5 relative z-10 ${mode === 'eric-cole' ? 'text-white' : 'text-muted'}`} />
          <span className="relative z-10 uppercase tracking-wider text-[10px] sm:text-[11px]">Eric Cole</span>
        </button>

        {/* Divider & Buy Template Button */}
        <div className="w-[1px] h-4 bg-white/20 my-auto mx-0.5" />

        <Link
          href="/templates"
          className="relative px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white/90 hover:text-white bg-[#00f59b]/15 hover:bg-[#00f59b]/25 border border-[#00f59b]/40 transition-all shadow-[0_0_12px_rgba(0,245,155,0.2)]"
          title="Buy Portfolio Template"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00f59b]" />
          <span className="uppercase tracking-wider text-[10px] sm:text-[11px] font-bold text-[#00f59b] whitespace-nowrap">
            Buy Template
          </span>
        </Link>
      </div>
    </aside>
  );
};
