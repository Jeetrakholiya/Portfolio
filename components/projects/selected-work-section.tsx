import React from 'react';
import { Container } from '@/components/layout/container';
import { SectionLabel } from '@/components/ui/section-label';
import { FeaturedProject } from '@/components/projects/featured-project';
import { SecondaryProject } from '@/components/projects/secondary-project';
import { projectsData } from '@/data/projects';
import { Project } from '@/types/project';

export interface SelectedWorkSectionProps {
  projects?: Project[];
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ projects }) => {
  const dataList = projects || projectsData;
  const primaryFeatured = dataList.filter((p) => p.featured || p.order <= 3);
  const secondaryProjects = dataList.filter((p) => !p.featured && p.order > 3);

  return (
    <section
      id="work"
      aria-label="Selected Development Work"
      className="w-full section-padding border-b border-white/[0.08] bg-[#09090b]"
    >
      <Container size="wide">
        {/* Section Intro Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20 pb-8 border-b border-white/[0.08]">
          <div className="space-y-3">
            <SectionLabel number="01" label="Selected Work" withDot withLine className="mb-1" />
            <h2 className="type-display text-white">
              Engineering <br />
              Systems.
            </h2>
          </div>
          <p className="type-body-lg text-muted max-w-md leading-relaxed">
            Full-stack web applications, AI-powered systems, and modern digital tools engineered for performance and scalability.
          </p>
        </div>

        {/* Primary Featured Projects Content-Blocks */}
        <div className="space-y-24 sm:space-y-32">
          {primaryFeatured.map((project, index) => (
            <FeaturedProject
              key={project.id}
              project={project}
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>

        {/* Secondary Work Grid */}
        {secondaryProjects.length > 0 && (
          <div className="mt-24 sm:mt-32 pt-16 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/[0.06]">
              <div>
                <span className="font-mono text-xs text-[#00f59b] uppercase tracking-widest block mb-1">
                  Additional Systems
                </span>
                <h3 className="type-h2 font-bold tracking-tight text-white uppercase">
                  Other Implementations
                </h3>
              </div>
              <span className="font-mono text-xs text-muted">
                {secondaryProjects.length} Verified Systems
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryProjects.map((project, index) => (
                <SecondaryProject
                  key={project.id}
                  project={project}
                  index={index + primaryFeatured.length}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
