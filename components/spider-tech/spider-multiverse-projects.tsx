'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types/project';
import { projectsData } from '@/data/projects';
import { Github, ExternalLink, ShieldAlert, Sparkles, Terminal, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SpiderMultiverseProjectsProps {
  projects?: Project[];
}

export const SpiderMultiverseProjects: React.FC<SpiderMultiverseProjectsProps> = ({
  projects,
}) => {
  const projectList = projects || projectsData;
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const activeProject = projectList[selectedIdx] || projectList[0];

  const sectorCodes = [
    'SECTOR 01 // NEURAL',
    'SECTOR 02 // UTILITY',
    'SECTOR 03 // VISION',
    'SECTOR 04 // DATA-GRID',
    'SECTOR 05 // SYSTEM',
  ];

  return (
    <section
      id="multiverse-work"
      aria-label="Spider Multiverse Deployments"
      className="relative w-full py-20 sm:py-32 px-6 sm:px-12 lg:px-16 bg-transparent text-[#ffffff] select-none font-sans border-t border-white/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* =================================================================
            1. SECTION HEADER: SPIDER-VERSE DEPLOYMENTS
            ================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/15">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#c40c24]" />
              <span className="font-mono text-xs text-[#c40c24] uppercase tracking-[0.34em] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MULTIVERSE LABS // ARTIFACTS</span>
              </span>
              <span className="w-8 h-0.5 bg-gradient-to-r from-[#c40c24] to-transparent" />
            </div>

            <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-[-0.03em] text-white">
              FEATURED <span className="text-[#c40c24] drop-shadow-[0_0_25px_rgba(196,12,36,0.8)]">PROJECTS</span>
            </h2>
          </div>

          {/* Quick Stat Pill */}
          <div className="font-mono text-xs text-white/70 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#c40c24] animate-ping" />
            <span className="uppercase tracking-widest">{projectList.length} PROTOCOLS DEPLOYED</span>
          </div>
        </div>

        {/* =================================================================
            2. INTERACTIVE SECTOR SELECTOR TABS
            ================================================================= */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
          {projectList.map((p, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={p.id || idx}
                onClick={() => setSelectedIdx(idx)}
                data-web-hover="true"
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#c40c24] text-white border-[#c40c24] shadow-[0_0_20px_rgba(196,12,36,0.6)] scale-[1.02]'
                    : 'bg-black/35 backdrop-blur-md text-white/70 border-white/15 hover:border-[#c40c24]/60 hover:text-white'
                }`}
              >
                <span className="text-[10px] opacity-75">0{idx + 1}.</span>
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* =================================================================
            3. HERO SPOTLIGHT DISPLAY (GLASSMORPHIC WEB NEXUS)
            ================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id || selectedIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative rounded-2xl overflow-hidden bg-black/45 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] group"
          >
            {/* Authentic Spider Web Texture Watermark Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen overflow-hidden">
              <Image
                src="/images/spider-web-texture.jpg"
                alt=""
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Subtle Crimson Corner Flare */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(196,12,36,0.25)_0%,_transparent_70%)] blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-center relative z-10">
              
              {/* Left Column: Project Metadata & Copy */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  
                  {/* Top Sector Tag & Year */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c40c24]/20 border border-[#c40c24]/50 rounded text-[#c40c24] font-black uppercase tracking-widest text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c40c24] animate-pulse" />
                      <span>{sectorCodes[selectedIdx % sectorCodes.length]}</span>
                    </div>

                    <span className="text-white/60 uppercase font-bold tracking-widest">
                      {activeProject.year || '2024'} &bull; {activeProject.category}
                    </span>
                  </div>

                  {/* Title with Crimson Accent */}
                  <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white group-hover:text-white transition-colors">
                    {activeProject.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-white/80 font-mono leading-relaxed uppercase">
                    {activeProject.description}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div className="space-y-3 pt-4 border-t border-white/15">
                  <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest font-bold">
                    CONNECTED TECH STACK:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(activeProject.technologies || []).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 hover:bg-[#c40c24]/25 border border-white/20 hover:border-[#c40c24] rounded-md font-mono text-[11px] uppercase tracking-wider text-white font-bold transition-all shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4 font-sans text-xs">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-web-hover="true"
                      className="relative p-[1.5px] bg-gradient-to-b from-[#c40c24] to-[#60000e] [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] shadow-[0_8px_25px_rgba(196,12,36,0.5)] active:scale-95 transition-transform inline-block"
                    >
                      <span className="px-6 py-3.5 bg-gradient-to-b from-[#c40c24] to-[#800010] [clip-path:polygon(11px_0,100%_0,100%_calc(100%-11px),calc(100%-11px)_100%,0_100%,0_11px)] text-white font-black uppercase tracking-widest flex items-center gap-2">
                        <span>LAUNCH PROJECT</span>
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    </a>
                  )}

                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-web-hover="true"
                      className="px-5 py-3.5 bg-white/10 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-white/20 transition-all flex items-center gap-2 border border-white/25 font-mono text-xs hover:border-white shadow-md"
                    >
                      <Github className="w-4 h-4" />
                      <span>SOURCE REPO</span>
                    </a>
                  )}
                </div>

              </div>

              {/* Right Column: High-Res Glassmorphic Preview Frame */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border-2 border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)] group-hover:border-[#c40c24]/80 transition-all bg-black/60">
                  <Image
                    src={activeProject.image || activeProject.thumbnail || '/images/projects/learnwise.svg'}
                    alt={activeProject.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Interactive Sensory Badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-[#c40c24] text-white font-mono text-[10px] font-black uppercase tracking-widest rounded shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c40c24] animate-ping" />
                    <span>SPIDER-SENSE // VERIFIED</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* =================================================================
            4. COMPACT MULTIVERSE CARDS GRID
            ================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectList.map((project, idx) => {
            const isSelected = selectedIdx === idx;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={project.id || idx}
                onClick={() => setSelectedIdx(idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                data-web-hover="true"
                className={`relative rounded-xl overflow-hidden p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#c40c24]/15 border-[#c40c24] shadow-[0_0_25px_rgba(196,12,36,0.45)] scale-[1.01]'
                    : 'bg-black/35 backdrop-blur-lg border-white/15 hover:border-white/40 hover:bg-black/50'
                }`}
              >
                {/* Authentic Spider Web Texture Watermark */}
                <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-screen overflow-hidden">
                  <Image
                    src="/images/spider-web-texture.jpg"
                    alt=""
                    fill
                    className="object-cover object-center"
                  />
                </div>

                <div className="space-y-4 relative z-10">
                  {/* Card Thumbnail */}
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black/60">
                    <Image
                      src={project.image || project.thumbnail || '/images/projects/learnwise.svg'}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Header info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#c40c24] font-black uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-white/40">{project.year || '2024'}</span>
                    </div>

                    <h4 className="text-lg font-black uppercase text-white tracking-tight">
                      {project.title}
                    </h4>

                    <p className="text-xs text-white/70 font-mono line-clamp-2 uppercase">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Tech */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between relative z-10 font-mono text-[10px]">
                  <div className="text-white/50 truncate max-w-[180px]">
                    {(project.technologies || []).slice(0, 3).join(' • ')}
                  </div>

                  <div className="text-[#c40c24] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span>VIEW</span>
                    <ExternalLink className="w-3 h-3" />
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
