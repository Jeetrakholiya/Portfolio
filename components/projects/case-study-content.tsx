import React from 'react';
import { Project } from '@/types/project';
import { Container } from '@/components/layout/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Tag } from '@/components/ui/tag';
import { ProjectMedia } from '@/components/projects/project-media';
import { ArrowUpRight } from 'lucide-react';

export interface CaseStudyContentProps {
  project: Project;
}

export const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ project }) => {
  const caseStudy = project.caseStudy;

  return (
    <div className="w-full bg-[#09090b] text-[#f2f2f0] divide-y divide-white/[0.08]">
      {/* 1. Large Hero Media Visual */}
      <section aria-label="Project Preview" className="py-12 sm:py-16">
        <Container size="wide">
          <div className="border border-white/10 rounded-[2px] overflow-hidden">
            <ProjectMedia
              title={project.title}
              category={project.category}
              imageSrc={project.image}
              aspectRatio="16:10"
              liveUrl={project.liveUrl}
            />
          </div>
        </Container>
      </section>

      {/* 2. Overview & Context */}
      <section aria-label="Project Overview" className="section-padding">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-2">
              <SectionLabel number="01" label="Overview" withDot withLine className="mb-2" />
              <h2 className="type-h1 font-bold text-white">
                Architecture &amp; Purpose
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <p className="type-body-lg text-white/90 leading-relaxed font-normal">
                {caseStudy?.overview || project.description}
              </p>
              <p className="type-body text-muted leading-relaxed">
                {project.shortDescription}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Problem & Solution */}
      {caseStudy?.problem && caseStudy?.solution && (
        <section aria-label="Problem and Solution" className="section-padding">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Problem Column */}
              <div className="lg:col-span-6 p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08] rounded-[2px] space-y-4">
                <SectionLabel number="02" label="Challenge" withDot withLine className="mb-2 text-muted" />
                <h3 className="type-h2 font-bold text-white">
                  The Problem
                </h3>
                <p className="type-body text-muted leading-relaxed">
                  {caseStudy.problem}
                </p>
              </div>

              {/* Solution Column */}
              <div className="lg:col-span-6 p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08] rounded-[2px] space-y-4">
                <SectionLabel number="03" label="Engineering" withDot withLine className="mb-2 text-muted" />
                <h3 className="type-h2 font-bold text-white">
                  The Solution
                </h3>
                <p className="type-body text-muted leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 4. Key Capabilities & Features */}
      {project.features && project.features.length > 0 && (
        <section aria-label="Key Features" className="section-padding">
          <Container size="wide">
            <div className="mb-12">
              <SectionLabel number="04" label="Capabilities" withDot withLine className="mb-2" />
              <h2 className="type-display text-white">
                Core System Features
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white/[0.02] border border-white/[0.08] rounded-[2px] space-y-3"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-muted border-b border-white/[0.06] pb-2">
                    <span>CAPABILITY</span>
                    <span className="font-bold text-[#00f59b]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="type-body-lg font-bold text-white">
                    {feature}
                  </h3>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 5. Technical Architecture Breakdown */}
      {caseStudy?.architecture && caseStudy.architecture.length > 0 && (
        <section aria-label="Technical Architecture" className="section-padding">
          <Container size="wide">
            <div className="mb-12">
              <SectionLabel number="05" label="System Architecture" withDot withLine className="mb-2" />
              <h2 className="type-display text-white">
                Technical Pipeline
              </h2>
            </div>

            <div className="space-y-4">
              {caseStudy.architecture.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 bg-white/[0.02] border border-white/[0.08] rounded-[2px] flex flex-col sm:flex-row sm:items-baseline gap-4"
                >
                  <span className="font-mono text-xs text-[#00f59b] uppercase tracking-widest sm:w-36 shrink-0">
                    Layer {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="type-body text-white font-medium leading-relaxed">
                    {arch}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 6. Technology Stack & Actions */}
      <section aria-label="Technology Stack and Links" className="section-padding">
        <Container size="wide">
          <div className="p-8 sm:p-12 bg-white/[0.02] border border-white/[0.08] rounded-[2px] space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs text-muted uppercase tracking-widest block">
                Applied Technologies &amp; Libraries
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Tag key={tech} variant="default" size="md">
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>

            {(project.liveUrl || project.githubUrl) && (
              <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-widest">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-white hover:text-[#00f59b] transition-colors pb-0.5 border-b border-white/20 hover:border-[#00f59b]"
                  >
                    <span>Open Live Site</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-muted hover:text-white transition-colors"
                  >
                    <span>Source Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};
