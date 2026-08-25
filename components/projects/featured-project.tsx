'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Project } from '@/types/project';
import { Tag } from '@/components/ui/tag';
import { TransitionLink } from '@/components/providers/page-transition-provider';
import { ProjectMedia } from '@/components/projects/project-media';
import { easings } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

export interface FeaturedProjectProps {
  project: Project;
  index: number;
  isReversed?: boolean;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
  index,
  isReversed = false,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();
  const formattedIndex = String(index + 1).padStart(2, '0');

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ['-2%', '2%']);

  const cardVariants = {
    hidden: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduce
        ? { duration: 0.01 }
        : {
            duration: 0.75,
            ease: easings.cinematic,
          },
    },
  };

  return (
    <motion.article
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={cardVariants}
      aria-label={`Project: ${project.title}`}
      className="group relative w-full pt-8 pb-12 border-b border-white/[0.08] transition-colors"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Project Info Column */}
        <div
          className={cn(
            'lg:col-span-5 flex flex-col justify-between space-y-6',
            isReversed ? 'lg:order-2' : 'lg:order-1'
          )}
        >
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-muted uppercase tracking-widest">
                <span className="text-[#00f59b] font-bold">{formattedIndex}</span>
                <span className="text-white/20">/</span>
                <span className="text-white/80">{project.year}</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-muted">
                {project.category}
              </span>
            </div>

            {/* Massive Title with subtle hover shift */}
            <h3 className="type-h1 font-bold tracking-tight text-white group-hover:text-white transition-transform duration-fast ease-cinematic group-hover:translate-x-1">
              <TransitionLink
                href={`/projects/${project.slug}`}
                className="hover:underline focus:outline-none"
              >
                {project.title}
              </TransitionLink>
            </h3>

            {/* Short Description */}
            <p className="type-body text-muted leading-relaxed">
              {project.description}
            </p>

            {/* Key Capabilities List */}
            {project.features && project.features.length > 0 && (
              <div className="pt-3 border-t border-white/[0.06] space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted block">
                  Core Implementation:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-mono text-white/70">
                  {project.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#00f59b]" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tech stack & Actions */}
          <div className="pt-6 border-t border-white/[0.06] space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Tag key={tech} variant="default" size="sm">
                  {tech}
                </Tag>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-3 font-mono text-xs uppercase tracking-widest">
              <TransitionLink
                href={`/projects/${project.slug}`}
                data-cursor="view"
                className="group/link inline-flex items-center gap-1.5 text-white hover:text-[#00f59b] transition-colors pb-0.5 border-b border-white/20 hover:border-[#00f59b]"
                aria-label={`Read case study for ${project.title}`}
              >
                <span>Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </TransitionLink>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="group/link inline-flex items-center gap-1 text-muted hover:text-white transition-colors"
                  aria-label={`Visit live website for ${project.title}`}
                >
                  <span>Live Site</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="group/link inline-flex items-center gap-1 text-muted hover:text-white transition-colors"
                  aria-label={`View GitHub repository for ${project.title}`}
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Media Preview Column */}
        <motion.div
          style={shouldReduce ? {} : { y: mediaY }}
          className={cn(
            'lg:col-span-7 w-full will-change-transform',
            isReversed ? 'lg:order-1' : 'lg:order-2'
          )}
        >
          <TransitionLink
            href={`/projects/${project.slug}`}
            data-cursor="view"
            className="block focus-visible:outline-2 focus-visible:outline-offset-4 border border-white/10 rounded-[2px] overflow-hidden hover:border-white/25 transition-colors"
            aria-label={`View ${project.title} case study`}
          >
            <ProjectMedia
              title={project.title}
              category={project.category}
              imageSrc={project.image}
              aspectRatio="16:10"
              liveUrl={project.liveUrl}
            />
          </TransitionLink>
        </motion.div>
      </div>
    </motion.article>
  );
};
