'use client';

import React from 'react';
import Image from 'next/image';
import { FuelGridMarkers } from './fuel-grid-markers';

export const FuelServices: React.FC = () => {
  const serviceRows = [
    {
      number: '01',
      title: 'Full-Stack Architecture',
      subtitle: 'Creative Code & Systems',
      description: 'Building end-to-end web applications, reactive user interfaces with Next.js, and high-throughput backend APIs with FastAPI & Python.',
      image: '/images/projects/pdf-craft.svg',
      tags: ['React.js', 'Next.js', 'FastAPI', 'Python', 'Tailwind CSS'],
    },
    {
      number: '02',
      title: 'Videography & Storytelling',
      subtitle: 'J.GAZE_ Visual Domain',
      description: 'Cinematic visual production, dynamic pacing, precision match cuts, custom LUT color grading, and short-form storytelling under @j.gaze_.',
      image: '/images/projects/metro-times.svg',
      tags: ['Videography', 'Video Editing', 'Cinematography', 'Color Grading'],
    },
    {
      number: '03',
      title: 'AI & Intelligent Systems',
      subtitle: 'Modern AI Integration',
      description: 'Integrating Google Gemini API for intelligent code debugging, adaptive learning engines, data structures, and database persistence.',
      image: '/images/projects/learnwise.svg',
      tags: ['Google Gemini API', 'MongoDB', 'PostgreSQL', 'DSA', 'OOP'],
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-28 px-6 sm:px-12 lg:px-16 bg-[#070709] text-[#f8fafc] border-b border-white/10 select-none">
      <FuelGridMarkers />

      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20">
        {/* Header (Matching Video Exact Statement) */}
        <div className="space-y-4 max-w-4xl">
          <span className="font-mono text-xs text-[#ff5500] uppercase tracking-widest block">
            03/ Premium Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal leading-[1.15] text-white tracking-tight">
            Design-driven studio delivering the <strong className="font-bold">structured visuals</strong>, refined digital system, and high-impact brand experiences shaped by{' '}
            <span className="text-[#ff5500] font-bold">aesthetics &amp; Fuel&reg;</span>.
          </h2>
        </div>

        {/* Numbered Rows with In-Row Center Visual Previews */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {serviceRows.map((row) => (
            <div
              key={row.number}
              className="py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center group transition-colors hover:bg-white/[0.01] px-2 sm:px-4"
            >
              {/* Left Giant Number */}
              <div className="md:col-span-2">
                <span className="text-5xl sm:text-7xl font-black text-white/90 group-hover:text-[#ff5500] transition-colors">
                  {row.number}
                </span>
              </div>

              {/* Center Image Preview (Matching Video Exact Layout) */}
              <div className="md:col-span-4">
                <div className="relative aspect-[16/9] w-full rounded-[2px] overflow-hidden border border-white/15 bg-black shadow-lg group-hover:border-[#ff5500]/40 transition-all">
                  <Image
                    src={row.image}
                    alt={row.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover object-top transition-transform duration-cinematic group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Right Title & Role Detail */}
              <div className="md:col-span-6 space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  {row.title}
                </h3>
                <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
                  {row.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed pt-1">
                  {row.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[10px]">
                  {row.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/80 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
