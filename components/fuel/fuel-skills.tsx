'use client';

import React from 'react';
import { SkillItem } from '@/types/skills';
import { skillsData } from '@/data/skills';
import { Flame, Code2, Database, Cpu, Wrench, Sparkles, Video } from 'lucide-react';

export interface FuelSkillsProps {
  skills?: SkillItem[];
}

export const FuelSkills: React.FC<FuelSkillsProps> = ({ skills }) => {
  const allSkills = skills || skillsData;

  const categories = [
    {
      title: 'Full-Stack & Languages',
      icon: Code2,
      skills: ['Python', 'JavaScript', 'React.js', 'FastAPI', 'Django', 'C#', '.NET', 'HTML5', 'CSS3'],
      accent: '#ff5500',
    },
    {
      title: 'Databases & Storage',
      icon: Database,
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQL Server', 'Data Modeling', 'Query Optimization'],
      accent: '#ff8800',
    },
    {
      title: 'AI & Computational Logic',
      icon: Cpu,
      skills: ['Google Gemini API', 'Machine Learning', 'DSA', 'OOP', 'Web Scraping', 'Prompt Engineering'],
      accent: '#a855f7',
    },
    {
      title: 'Tools & DevOps',
      icon: Wrench,
      skills: ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'Jupyter Notebook', 'pgAdmin', 'CLI'],
      accent: '#00f5ff',
    },
    {
      title: 'Creative Media (J.GAZE_)',
      icon: Video,
      skills: ['Videography', 'Video Editing', 'Visual Storytelling', 'Cinematography', 'Color Grading', 'Sound Sync'],
      accent: '#ff5500',
    },
  ];

  return (
    <section
      id="skills"
      aria-label="Fuel Capabilities and Technical Skills"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#060608] text-[#f8fafc] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto mb-16 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 font-mono text-xs text-[#ff5500] uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            <span>Core Capabilities &amp; Stack</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            Technical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] to-[#ffaa00]">
              Arsenal.
            </span>
          </h2>
        </div>

        <p className="font-mono text-xs sm:text-sm text-muted max-w-md uppercase tracking-wider leading-relaxed">
          Languages, backend microservices, database architectures, and cinematic visual post-production pipelines.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className={`p-6 sm:p-8 bg-[#0c0c12] border border-white/10 rounded-[4px] shadow-xl hover:border-[#ff5500]/40 transition-all group flex flex-col justify-between ${
                idx === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-5 h-5 text-[#ff5500]" />
                    <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-[#ff5500] font-bold">0{idx + 1}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-white/[0.03] border border-white/15 rounded-[2px] font-mono text-xs text-white/90 group-hover:border-white/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.06] font-mono text-[10px] text-muted uppercase tracking-widest flex items-center justify-between">
                <span>Verified Competency</span>
                <span className="text-[#ff5500]">&bull; Active</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
