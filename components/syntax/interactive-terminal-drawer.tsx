'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minus, Square, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInterfaceMode } from '@/components/providers/interface-mode-provider';
import { Project } from '@/types/project';
import { SiteContent } from '@/types/content';

export interface InteractiveTerminalDrawerProps {
  siteContent?: SiteContent;
  projects?: Project[];
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminalDrawer: React.FC<InteractiveTerminalDrawerProps> = ({
  siteContent,
  projects = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [matrixActive, setMatrixActive] = useState(false);
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-white/80">
          <p className="text-[#00f59b] font-bold">
            JEET RAKHOLIYA // SYNTAX TERMINAL INTERFACE v2.6.4 [ONLINE]
          </p>
          <p className="text-white/60 text-[11px]">
            Type <span className="text-[#00f59b] font-bold underline">help</span> to view available system commands.
          </p>
        </div>
      ),
      timestamp: '00:00:01',
    },
  ]);

  const { setMode } = useInterfaceMode();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Toggle on Ctrl+~ or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === '~' || e.key === 'k')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const now = new Date().toTimeString().split(' ')[0];
    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-white/80">
            <p className="text-[#00f59b] font-bold uppercase tracking-wider mb-1">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-[#00f59b] font-bold">projects</span> &mdash; List featured work</div>
              <div><span className="text-[#00f59b] font-bold">skills</span> &mdash; Display technical stack</div>
              <div><span className="text-[#00f59b] font-bold">whoami</span> &mdash; Creator profile dossier</div>
              <div><span className="text-[#00f59b] font-bold">contact</span> &mdash; Contact &amp; social links</div>
              <div><span className="text-[#00f59b] font-bold">matrix</span> &mdash; Toggle digital rain</div>
              <div><span className="text-[#00f59b] font-bold">theme &lt;name&gt;</span> &mdash; Switch active theme</div>
              <div><span className="text-[#00f59b] font-bold">clear</span> &mdash; Clear terminal screen</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-[#00f59b] font-bold uppercase">FEATURED PROJECTS CATALOG:</p>
            <div className="space-y-1.5 pl-2">
              {projects.length > 0 ? (
                projects.map((p, idx) => (
                  <div key={idx} className="flex items-baseline justify-between gap-2 border-b border-white/5 pb-1">
                    <div>
                      <span className="text-white font-bold">{p.title}</span>
                      <span className="text-white/40 text-[10px] ml-2">({p.category})</span>
                    </div>
                    <span className="text-white/60 text-[10px] font-mono">{p.year}</span>
                  </div>
                ))
              ) : (
                <p className="text-white/60">LearnWise (AI Python Platform) • Cinematic Video Productions</p>
              )}
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-xs">
            <p className="text-[#00f59b] font-bold uppercase">TECH STACK MATRIX:</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Next.js 14', 'React 19', 'TypeScript', 'FastAPI', 'Python', 'Google Gemini API', 'Tailwind CSS', 'Framer Motion', 'MongoDB Atlas'].map((s) => (
                <span key={s} className="px-2 py-0.5 bg-[#00f59b]/15 text-[#00f59b] border border-[#00f59b]/30 rounded text-[10px]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case 'whoami':
      case 'bio':
        output = (
          <div className="space-y-1 text-xs text-white/80">
            <p className="text-white font-bold">{siteContent?.name || 'Jeet Rakholiya'} (@j.gaze_)</p>
            <p className="text-white/60">{siteContent?.primaryRole || 'Full-Stack Developer & Visual Creator'}</p>
            <p className="text-[11px] text-white/70 pt-1 leading-relaxed">
              {siteContent?.description || 'Building modern digital architectures and crafting cinematic visual experiences.'}
            </p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-white/80">
            <p className="text-[#00f59b] font-bold">COMMUNICATION CHANNELS:</p>
            <p>Email: <a href="mailto:jeetrakholiya02@gmail.com" className="text-[#00f59b] underline">jeetrakholiya02@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/Jeetrakholiya" target="_blank" className="text-[#00f59b] underline">github.com/Jeetrakholiya</a></p>
            <p>Instagram: <a href="https://www.instagram.com/j.gaze_/" target="_blank" className="text-[#00f59b] underline">@j.gaze_</a></p>
          </div>
        );
        break;

      case 'matrix':
        setMatrixActive((prev) => !prev);
        output = (
          <p className="text-[#00f59b] font-bold animate-pulse">
            [MATRIX DIGITAL RAIN OVERLAY {matrixActive ? 'DEACTIVATED' : 'ACTIVATED'}]
          </p>
        );
        break;

      case 'theme':
        if (args[0] === 'syntax') {
          setMode('syntax');
          output = <p className="text-[#00f59b]">Switched to Syntax Terminal theme.</p>;
        } else if (args[0] === 'spider' || args[0] === 'fuel' || args[0] === 'spider-tech') {
          setMode('fuel');
          output = <p className="text-[#c40c24]">Switched to Spider-Tech Multiverse theme.</p>;
        } else if (args[0] === 'eric' || args[0] === 'eric-cole') {
          setMode('eric-cole');
          output = <p className="text-white">Switched to Eric Cole Retro CRT theme.</p>;
        } else {
          output = <p className="text-yellow-400">Usage: theme [syntax | spider | eric]</p>;
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-red-400">
            Command not recognized: &quot;{trimmed}&quot;. Type <span className="text-[#00f59b] font-bold">help</span> for commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: trimmed, output, timestamp: now }]);
    setInputVal('');
  };

  return (
    <>
      {/* Matrix Digital Rain Animation Overlay */}
      {matrixActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-35 bg-black/40 font-mono text-[#00f59b] text-xs select-none">
          <div className="grid grid-cols-12 h-full w-full animate-pulse">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 overflow-hidden">
                {Array.from({ length: 40 }).map((_, j) => (
                  <span key={j} className="opacity-80">
                    {String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Bottom-Left Trigger Pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-6 z-40 px-3.5 py-1.5 bg-[#09090b]/90 hover:bg-[#00f59b]/10 border border-[#00f59b]/40 rounded-full font-mono text-[11px] text-[#00f59b] font-bold shadow-[0_0_15px_rgba(0,245,155,0.25)] flex items-center gap-2 backdrop-blur-xl transition-all hover:scale-105 active:scale-95 hidden sm:flex"
        title="Open Terminal Emulator (Ctrl+~)"
      >
        <Terminal className="w-3.5 h-3.5" />
        <span>CLI TERMINAL [CTRL+~]</span>
      </button>

      {/* Terminal Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 bottom-16 sm:left-6 sm:right-auto sm:w-[540px] h-[360px] z-50 bg-[#09090b]/95 backdrop-blur-2xl border-2 border-[#00f59b]/50 rounded-xl shadow-[0_0_40px_rgba(0,245,155,0.3)] flex flex-col font-mono text-xs overflow-hidden select-none"
          >
            {/* Window Titlebar */}
            <div className="px-3.5 py-2.5 bg-[#111116] border-b border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-[10px] text-white/60 font-bold ml-1 uppercase">
                  jeet@syntax-core:~$ (Interactive CLI)
                </span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal History Log */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-white/10 text-white/90"
            >
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
                    <span className="text-[#00f59b]">jeet@portfolio:~$</span>
                    <span className="text-white font-bold">{item.command}</span>
                    <span className="ml-auto text-white/30">{item.timestamp}</span>
                  </div>
                  <div className="pl-3 border-l border-[#00f59b]/30">{item.output}</div>
                </div>
              ))}
            </div>

            {/* Prompt Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(inputVal);
              }}
              className="p-3 bg-black/60 border-t border-white/10 flex items-center gap-2"
            >
              <span className="text-[#00f59b] font-bold text-xs">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help', 'projects', 'skills', 'matrix'..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs focus:ring-0"
              />
              <button
                type="submit"
                className="p-1 rounded bg-[#00f59b]/20 hover:bg-[#00f59b]/30 text-[#00f59b] transition-colors"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
