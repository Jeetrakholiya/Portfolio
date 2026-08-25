import React from 'react';
import { Project } from '@/types/project';
import { Container } from '@/components/layout/container';
import { Tag } from '@/components/ui/tag';
import { TransitionLink } from '@/components/providers/page-transition-provider';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export interface CaseStudyHeroProps {
  project: Project;
  totalProjects: number;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  project,
  totalProjects,
}) => {
  const formattedIndex = String(project.order).padStart(2, '0');
  const formattedTotal = String(totalProjects).padStart(2, '0');

  return (
    <header className="w-full pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-white/[0.08] bg-[#09090b] text-[#f2f2f0]">
      <Container size="wide">
        {/* Back Link & Index Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] font-mono text-xs text-muted uppercase tracking-widest">
          <TransitionLink
            href="/#work"
            className="group inline-flex items-center gap-2 text-muted hover:text-[#00f59b] transition-colors select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-fast group-hover:-translate-x-1" />
            <span>Back to Selected Work</span>
          </TransitionLink>

          <div className="flex items-center gap-2 font-mono">
            <span className="text-[#00f59b] font-bold">{formattedIndex}</span>
            <span className="text-white/20">/</span>
            <span>{formattedTotal}</span>
          </div>
        </div>

        {/* Title & Short Description */}
        <div className="py-10 sm:py-16 space-y-6 max-w-5xl">
          <div className="flex flex-wrap items-center gap-2">
            <Tag variant="green" size="sm">
              {project.category}
            </Tag>
            {project.status && (
              <Tag variant="outline" size="sm">
                {project.status}
              </Tag>
            )}
          </div>

          <h1 className="text-[clamp(3.25rem,9vw,8.5rem)] font-black tracking-tighter leading-[0.84] text-white uppercase select-none">
            {project.title}
          </h1>

          <p className="type-body-lg text-muted max-w-3xl leading-relaxed">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-6 pt-4 font-mono text-xs uppercase tracking-widest">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-white hover:text-[#00f59b] transition-colors pb-0.5 border-b border-white/20 hover:border-[#00f59b]"
              >
                <span>Live Website</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-muted hover:text-white transition-colors pb-0.5 border-b border-transparent hover:border-white"
              >
                <span>Source Code</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>

        {/* Project Metadata Matrix */}
        <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-muted uppercase tracking-widest block text-[10px]">Role</span>
            <span className="text-white font-medium">{project.role || 'Full-Stack Development'}</span>
          </div>
          <div className="space-y-1">
            <span className="text-muted uppercase tracking-widest block text-[10px]">Timeline</span>
            <span className="text-white font-medium">{project.timeline || project.year}</span>
          </div>
          <div className="space-y-1">
            <span className="text-muted uppercase tracking-widest block text-[10px]">Domain</span>
            <span className="text-white font-medium">{project.category}</span>
          </div>
          <div className="space-y-1">
            <span className="text-muted uppercase tracking-widest block text-[10px]">Technologies</span>
            <span className="text-white font-medium">{project.technologies.slice(0, 3).join(', ')}</span>
          </div>
        </div>
      </Container>
    </header>
  );
};
