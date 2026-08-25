'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from '@/types/project';
import { projectsData } from '@/data/projects';
import { FuelGridMarkers } from './fuel-grid-markers';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export interface FuelProjectsProps {
  projects?: Project[];
}

export const FuelProjects: React.FC<FuelProjectsProps> = ({ projects }) => {
  const projectList = projects || projectsData;

  return (
    <section
      id="work"
      aria-label="Fuel FX-25 Selected Work"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-12 lg:px-16 bg-[#070709] text-[#f8fafc] border-b border-white/10 select-none"
    >
      <FuelGridMarkers />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* =================================================================
            LEFT STICKY COLUMN (FX-25' MATCHING VIDEO EXACT REFERENCE)
            ================================================================= */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#ff5500] uppercase tracking-widest block">
                02/ Portfolio Stream
              </span>
              <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-tight text-white">
                FX-25&apos;
              </h2>
            </div>

            <p className="font-mono text-xs text-muted leading-relaxed">
              Curated software systems, full-stack microservices, and AI-powered interfaces built with precision.
            </p>

            <div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#ff5500] hover:text-white transition-all shadow-lg"
              >
                <span>Join Us Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* =================================================================
            RIGHT SCROLLING STREAM: HORIZONTAL CINEMATIC CARDS
            ================================================================= */}
        <div className="lg:col-span-8 space-y-12 sm:space-y-16">
          {/* Top Pill Counter: See all (06) */}
          <div className="flex items-center justify-end pb-4 border-b border-white/10 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white font-medium text-[11px] uppercase tracking-wider">
              See all (0{projectList.length})
            </span>
          </div>

          {/* Project Cards Stream */}
          {projectList.map((project, idx) => (
            <div
              key={project.id}
              className="group space-y-4 pb-12 border-b border-white/10 last:border-b-0"
            >
              {/* Card Interface Frame */}
              <div className="relative aspect-[16/10] w-full bg-[#0d0d12] border border-white/15 rounded-[4px] overflow-hidden shadow-2xl transition-all duration-cinematic group-hover:border-[#ff5500]/50 group-hover:shadow-[0_0_35px_rgba(255,85,0,0.2)]">
                <Image
                  src={project.image || '/images/projects/pdf-craft.svg'}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 750px"
                  className="object-cover object-top transition-transform duration-cinematic group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* Bottom Meta & Label Bar */}
              <div className="flex items-center justify-between font-mono text-xs pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-[#ff5500] font-bold">0{idx + 1}</span>
                  <span className="text-white font-bold uppercase tracking-wider">
                    {project.title}
                  </span>
                  <span className="text-white/30">&bull;</span>
                  <span className="text-muted">{project.category}</span>
                </div>

                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#ff5500] uppercase font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Live ↗</span>
                    </a>
                  )}

                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-muted hover:text-white uppercase text-[11px] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3 h-3 text-[#ff5500]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
