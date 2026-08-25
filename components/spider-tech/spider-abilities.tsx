'use client';

import React from 'react';
import Image from 'next/image';
import { Zap, Layers, Cpu, Database } from 'lucide-react';

export const SpiderAbilities: React.FC = () => {
  const abilities = [
    {
      icon: Layers,
      code: 'WEB-01',
      title: 'WEB-SLINGING FRONTEND',
      subtitle: 'HIGH-SPEED TRAVERSAL & REACTIVITY',
      description:
        'Architecting fluid, responsive user interfaces powered by Next.js 14 App Router, React 19, TypeScript, and 60fps Framer Motion physics.',
      stack: ['NEXT.JS 14', 'REACT 19', 'TYPESCRIPT', 'TAILWIND CSS', 'FRAMER MOTION'],
      color: '#c40c24',
      power: '98%',
    },
    {
      icon: Zap,
      code: 'WEB-02',
      title: 'VENOM BLAST BACKEND',
      subtitle: 'HIGH-VOLTAGE SERVER COMPUTE',
      description:
        'Engineering high-throughput asynchronous microservices with Python, FastAPI, Node.js, and rock-solid REST & WebSocket backends.',
      stack: ['FASTAPI', 'PYTHON 3.12', 'NODE.JS', 'REST APIS', 'WEBSOCKETS'],
      color: '#c40c24',
      power: '96%',
    },
    {
      icon: Cpu,
      code: 'WEB-03',
      title: 'NEURAL SPIDER-AI',
      subtitle: 'COGNITIVE PROCESSING & MULTI-AGENTS',
      description:
        'Integrating advanced LLMs, Google Gemini AI, prompt pipelines, and autonomous coding subagents for intelligent web automation.',
      stack: ['GEMINI AI', 'LLM AGENTS', 'PROMPT PIPELINES', 'EMBEDDINGS', 'PYTORCH'],
      color: '#ffffff',
      power: '94%',
    },
    {
      icon: Database,
      code: 'WEB-04',
      title: 'SPIDER-ARMOR DATABASE',
      subtitle: 'PERSISTENT CLOUD RESILIENCE',
      description:
        'Designing scalable relational and document data schemas with MongoDB, PostgreSQL, Prisma ORM, and encrypted JWT authentication.',
      stack: ['MONGODB', 'POSTGRESQL', 'PRISMA ORM', 'JWT AUTH', 'REDIS'],
      color: '#c40c24',
      power: '95%',
    },
  ];

  return (
    <section
      id="spider-abilities"
      aria-label="Spider-Man Superpowers & Arsenal"
      className="relative w-full py-24 sm:py-36 px-6 sm:px-12 lg:px-16 bg-transparent text-[#ffffff] select-none font-sans border-t border-white/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 relative z-10">
        
        {/* =================================================================
            1. SECTION HEADER
            ================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/15">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#c40c24]" />
              <span className="font-mono text-xs text-[#c40c24] uppercase tracking-[0.34em] font-bold">
                ARSENAL // SUIT UPGRADES
              </span>
              <span className="w-8 h-0.5 bg-gradient-to-r from-[#c40c24] to-transparent" />
            </div>

            <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-[-0.03em] text-white">
              SUPERPOWERS <span className="text-[#c40c24] drop-shadow-[0_0_20px_rgba(196,12,36,0.6)]">&amp; STACK</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-white/60 space-y-1 uppercase tracking-widest text-left sm:text-right">
            <div>[ ARSENAL STATUS: ONLINE ]</div>
            <div className="text-[#c40c24] font-bold">VOLTAGE: 1.21 GW</div>
          </div>
        </div>

        {/* =================================================================
            2. SUPERPOWERS 4-CARD ARSENAL MATRIX (DARK SUIT RED, BLACK, WHITE)
            ================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {abilities.map((ability) => {
            const Icon = ability.icon;

            return (
              <div
                key={ability.code}
                data-web-hover="true"
                className="group relative bg-[#0a0a0c] border-2 border-white/15 hover:border-[#c40c24] rounded-[8px] p-8 sm:p-10 space-y-8 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(196,12,36,0.35)] flex flex-col justify-between"
              >
                {/* Top Row: Code & Output Meter */}
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: ability.color }}
                    />
                    <span className="font-bold text-white/90">{ability.code}</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/60">
                    <span>OUTPUT:</span>
                    <span className="font-bold text-white">{ability.power}</span>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="p-3 rounded-lg border shadow-lg"
                      style={{
                        backgroundColor: `${ability.color}15`,
                        borderColor: `${ability.color}50`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: ability.color }} />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#c40c24] transition-colors">
                        {ability.title}
                      </h3>
                      <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest pt-0.5">
                        {ability.subtitle}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/70 font-mono leading-relaxed uppercase pt-2">
                    {ability.description}
                  </p>
                </div>

                {/* Tech Chips List */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {ability.stack.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 bg-white/5 border border-white/15 rounded font-mono text-[10px] uppercase tracking-wider text-white/80 group-hover:border-[#c40c24]/40 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Power Meter Progress Bar */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 group-hover:animate-pulse"
                      style={{
                        width: ability.power,
                        backgroundColor: ability.color,
                        boxShadow: `0 0 10px ${ability.color}`,
                      }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
