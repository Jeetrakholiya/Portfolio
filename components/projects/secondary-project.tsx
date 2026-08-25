'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Project } from '@/types/project';
import { Tag } from '@/components/ui/tag';
import { TransitionLink } from '@/components/providers/page-transition-provider';
import { easings } from '@/lib/animations';
import { ArrowUpRight } from 'lucide-react';

export interface SecondaryProjectProps {
  project: Project;
  index: number;
}

export const SecondaryProject: React.FC<SecondaryProjectProps> = ({
  project,
  index,
}) => {
  const shouldReduce = useReducedMotion();
  const formattedIndex = String(index + 1).padStart(2, '0');

  const cardVariants = {
    hidden: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduce
        ? { duration: 0.01 }
        : {
            duration: 0.6,
            ease: easings.editorial,
            delay: (index % 3) * 0.08,
          },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={cardVariants}
      className="group p-6 sm:p-7 bg-white/[0.02] border border-white/[0.08] rounded-[2px] flex flex-col justify-between space-y-6 transition-all duration-fast hover:border-white/20 hover:bg-white/[0.04]"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 font-mono text-xs text-muted">
          <div className="flex items-center gap-2 uppercase tracking-widest">
            <span className="text-[#00f59b] font-bold">{formattedIndex}</span>
            <span className="text-white/20">/</span>
            <span>{project.year}</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-muted">
            {project.category}
          </span>
        </div>

        <h4 className="type-h2 font-bold tracking-tight text-white transition-transform duration-fast ease-cinematic group-hover:translate-x-1">
          <TransitionLink
            href={`/projects/${project.slug}`}
            className="hover:underline focus:outline-none"
          >
            {project.title}
          </TransitionLink>
        </h4>

        <p className="type-body-sm text-muted leading-relaxed">
          {project.shortDescription}
        </p>

        {project.features && project.features.length > 0 && (
          <ul className="pt-2 border-t border-white/[0.06] space-y-1 text-xs font-mono text-white/70">
            {project.features.slice(0, 2).map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#00f59b]" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t border-white/[0.06]">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Tag key={tech} variant="muted" size="sm">
              {tech}
            </Tag>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1 font-mono text-xs uppercase tracking-widest">
          <TransitionLink
            href={`/projects/${project.slug}`}
            data-cursor="view"
            className="inline-flex items-center gap-1 text-white hover:text-[#00f59b] transition-colors"
            aria-label={`View ${project.title} case study`}
          >
            <span>Case Study</span>
            <ArrowUpRight className="w-3 h-3" />
          </TransitionLink>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open"
              className="inline-flex items-center gap-1 text-muted hover:text-white transition-colors"
              aria-label={`Visit live demo for ${project.title}`}
            >
              <span>Demo</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
