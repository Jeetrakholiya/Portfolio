import React from 'react';
import { Project } from '@/types/project';
import { Container } from '@/components/layout/container';
import { TransitionLink } from '@/components/providers/page-transition-provider';
import { ArrowRight } from 'lucide-react';

export interface CaseStudyNextProps {
  nextProject: Project;
  totalProjects: number;
}

export const CaseStudyNext: React.FC<CaseStudyNextProps> = ({
  nextProject,
  totalProjects,
}) => {
  const formattedIndex = String(nextProject.order).padStart(2, '0');
  const formattedTotal = String(totalProjects).padStart(2, '0');

  return (
    <nav
      aria-label="Next Project Navigation"
      className="w-full py-16 sm:py-24 bg-[#09090b] border-t border-white/[0.08]"
    >
      <Container size="wide">
        <TransitionLink
          href={`/projects/${nextProject.slug}`}
          className="group block p-8 sm:p-12 md:p-16 bg-white/[0.02] border border-white/[0.08] rounded-[2px] transition-all duration-normal hover:border-white/25 hover:bg-white/[0.04] select-none"
        >
          <div className="flex items-center justify-between font-mono text-xs text-muted uppercase tracking-widest pb-6 border-b border-white/[0.06]">
            <span className="text-[#00f59b] font-medium">
              Next Case Study
            </span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{formattedIndex}</span>
              <span className="text-white/20">/</span>
              <span>{formattedTotal}</span>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs text-muted uppercase tracking-wider block">
                {nextProject.category}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase group-hover:translate-x-2 transition-transform duration-fast ease-cinematic">
                {nextProject.title} ↗
              </h2>
              <p className="type-body text-muted max-w-xl">
                {nextProject.shortDescription}
              </p>
            </div>

            <div className="inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest text-[#00f59b] group-hover:text-white shrink-0 group-hover:translate-x-1 transition-all duration-fast">
              <span>View Case Study</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </TransitionLink>
      </Container>
    </nav>
  );
};
