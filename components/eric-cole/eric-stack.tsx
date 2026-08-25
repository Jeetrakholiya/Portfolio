'use client';

import React from 'react';
import { SkillItem } from '@/types/skills';
import { skillsData } from '@/data/skills';

export interface EricStackProps {
  skills?: SkillItem[];
}

export const EricStack: React.FC<EricStackProps> = () => {
  const groups = [
    {
      category: 'Languages & Core',
      items: ['Python', 'JavaScript', 'C#', 'Java', 'HTML5', 'CSS3', 'SQL'],
    },
    {
      category: 'Frameworks & Libraries',
      items: ['React.js', 'Next.js 14', 'FastAPI', 'Django', 'Node.js', 'ASP.NET', 'Tailwind CSS'],
    },
    {
      category: 'Databases & Storage',
      items: ['MongoDB Atlas', 'PostgreSQL', 'MySQL', 'Microsoft SQL Server', 'Data Modeling'],
    },
    {
      category: 'AI & Systems',
      items: ['Google Gemini API', 'Machine Learning', 'Data Structures & Algorithms', 'OOP', 'Web Scraping'],
    },
    {
      category: 'Development Tools',
      items: ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'Jupyter Notebook', 'pgAdmin', 'CLI'],
    },
    {
      category: 'Creative Domain (J.GAZE_)',
      items: ['Videography', 'Video Editing', 'Cinematography', 'Color Grading', 'Sound Synchronization'],
    },
  ];

  return (
    <section
      id="stack"
      aria-label="Eric Cole Technical Stack and Capabilities"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-12 lg:px-20 bg-[#0a0a0c] text-[#ececeb] border-t border-white/10 select-none font-sans"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10 font-mono text-xs">
          <div>
            <span className="text-white/50 uppercase tracking-widest block mb-1">Index &bull; 04</span>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              Capabilities &bull; Stack
            </h2>
          </div>
          <span className="text-muted uppercase tracking-widest text-[11px]">
            Production Toolchain
          </span>
        </div>

        {/* Tabular Matrix */}
        <div className="divide-y divide-white/10 border-b border-white/10 font-mono text-xs">
          {groups.map((group) => (
            <div
              key={group.category}
              className="py-5 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-baseline hover:bg-white/[0.01] transition-colors"
            >
              <span className="md:col-span-4 text-white font-bold uppercase tracking-wider text-[11px]">
                {group.category}
              </span>

              <div className="md:col-span-8 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 bg-white/[0.03] border border-white/10 rounded-[2px] text-white/80 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
