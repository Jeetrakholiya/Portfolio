'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types/project';
import { projectsData } from '@/data/projects';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export interface EricProjectsProps {
  projects?: Project[];
}

export const EricProjects: React.FC<EricProjectsProps> = ({ projects }) => {
  const projectList = projects || projectsData;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeProject = projectList[selectedIndex] || projectList[0];

  return (
    <section
      id="work"
      aria-label="Eric Cole Selected Works"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-12 lg:px-16 bg-transparent border-t border-current/10 select-none font-sans"
    >
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Title Header with Cursive Flourish */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#121214]/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#121214]/50">
              <span>+</span>
              <span>+</span>
              <span>+</span>
              <span className="uppercase tracking-widest pl-2">A FEW PROJECTS I&apos;VE WORKED ON RECENTLY.</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-[-0.03em] leading-none text-[#121214]">
              SEL<span className="font-flourish text-5xl sm:text-7xl lowercase text-black">e</span>CTED WORKS
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#121214]">
            <span className="px-3 py-1 bg-[#121214] text-white font-bold rounded-[2px]">[COLUMN]</span>
            <span className="text-muted hover:text-black cursor-pointer">[LIST]</span>
          </div>
        </div>

        {/* Project Selector (Left List + Right High-Res Dashboard Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Project Index */}
          <div className="lg:col-span-4 space-y-2 font-mono text-xs">
            {projectList.map((p, idx) => {
              const isSelected = selectedIndex === idx;

              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-full p-3.5 text-left rounded-[2px] transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#121214] text-white font-bold border-[#121214] shadow-md'
                      : 'bg-transparent text-[#121214]/70 border-transparent hover:bg-black/5 hover:text-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isSelected ? 'text-white/60' : 'text-black/30'}>
                      00{idx + 1}
                    </span>
                    <span className="uppercase tracking-wider font-semibold">
                      {p.title}
                    </span>
                  </div>

                  {isSelected && <ArrowUpRight className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Res Interactive Dashboard Preview Frame */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/10] w-full bg-[#0e0e12] border-2 border-[#121214] rounded-[4px] overflow-hidden shadow-2xl">
              {/* Active Project Mockup Graphic */}
              <Image
                src={activeProject.image || '/images/projects/pdf-craft.svg'}
                alt={activeProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 750px"
                className="object-cover object-top transition-opacity duration-300"
              />
            </div>

            {/* Active Project Meta & Links */}
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs pt-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold uppercase text-sm text-[#121214]">{activeProject.title}</span>
                  <span className="text-[#121214]/40">&bull;</span>
                  <span className="text-[#121214]/70">{activeProject.category}</span>
                </div>
                <p className="text-xs text-[#121214]/70 font-sans max-w-lg">
                  {activeProject.shortDescription || activeProject.description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#121214] text-white font-bold uppercase text-[11px] rounded-[2px] hover:bg-black transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Visit Product</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <Link
                  href={`/projects/${activeProject.slug}`}
                  className="text-[#121214] hover:underline uppercase text-[11px] font-bold"
                >
                  Case Study &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Callout Banner */}
        <div className="pt-10 border-t border-[#121214]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <span className="text-[#121214]/50 uppercase tracking-widest text-[11px]">
            AVAILABLE FOR COLLABORATION
          </span>
          <a
            href="mailto:jeetrakholiya02@gmail.com"
            className="text-lg sm:text-2xl font-black uppercase text-[#121214] tracking-tight hover:underline inline-flex items-center gap-1"
          >
            <span>JEETRAKHOLIYA02@GMAIL.COM</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
