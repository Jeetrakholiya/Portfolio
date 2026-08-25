'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { SectionLabel } from '@/components/ui/section-label';
import { siteConfig } from '@/data/site';
import { SiteContent } from '@/types/content';
import { easings } from '@/lib/animations';

export interface AboutSectionProps {
  siteContent?: SiteContent;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ siteContent }) => {
  const shouldReduce = useReducedMotion();
  const data = siteContent || siteConfig;

  const containerVariants = {
    hidden: { opacity: shouldReduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduce
        ? { duration: 0.01 }
        : {
            duration: 0.65,
            ease: easings.editorial,
          },
    },
  };

  const metadataPillars = [
    {
      number: '01',
      label: 'Location',
      value: data.location,
      subvalue: 'Available for global engineering roles',
    },
    {
      number: '02',
      label: 'Academic Standing',
      value: 'Final-Year B.E. in CS & IT',
      subvalue: 'L.J. Institute of Engineering & Technology',
    },
    {
      number: '03',
      label: 'Engineering Focus',
      value: 'Full-Stack & AI Systems',
      subvalue: 'React, Next.js, FastAPI, Python, DBs',
    },
    {
      number: '04',
      label: 'Creative Domain',
      value: `${data.creativeName} &bull; Visual Creator`,
      subvalue: 'Videography, Video Editing, Narrative',
    },
  ];

  return (
    <section
      id="about"
      aria-label={`About ${data.name}`}
      className="w-full section-padding border-b border-white/[0.08] bg-[#09090b] text-[#f2f2f0]"
    >
      <Container size="wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="space-y-16 sm:space-y-20"
        >
          {/* Section Label Header */}
          <motion.div variants={itemVariants}>
            <SectionLabel
              number="03"
              label="About &bull; Personal Story"
              withDot
              withLine
              className="mb-4"
            />
          </motion.div>

          {/* Dossier Grid: Portrait Frame + Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Creator Dossier Photographic Frame (Exact 1024:612 Natural Ratio) */}
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <div className="group relative p-2 bg-white/[0.02] border border-white/[0.12] rounded-[2px] overflow-hidden transition-all duration-normal hover:border-white/30">
                {/* Viewfinder Header */}
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.08] font-mono text-[10px] text-muted uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b]" />
                    <span>DOSSIER • PROFILE</span>
                  </div>
                  <span>{data.name}</span>
                </div>

                {/* Portrait */}
                <div className="relative aspect-[1024/612] w-full overflow-hidden bg-[#09090b] rounded-[2px]">
                  <Image
                    src="/images/jeet-syntax.png"
                    alt={`${data.name} Profile — Full-Stack Developer`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center transition-transform duration-cinematic group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#09090b]/60 via-transparent to-transparent" />
                </div>

                {/* Viewfinder Footer */}
                <div className="flex items-center justify-between px-3 py-2 border-t border-white/[0.08] font-mono text-[10px] text-muted uppercase tracking-widest">
                  <span>{data.location}</span>
                  <span className="text-[#00f59b]">@{data.creativeName.toLowerCase().replace(/[^a-z0-9_]/g, '')}</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Oversized Typographic Statement & Grounded Story */}
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#00f59b] uppercase tracking-widest block">
                  The Duality
                </span>
                <h2 className="type-display text-white">
                  I Build Systems. <br />
                  I Frame Stories.
                </h2>
                <p className="type-body-sm font-mono text-muted uppercase tracking-wider">
                  A developer who also creates.
                </p>
              </div>

              <div className="space-y-4 text-white/80 type-body-lg leading-relaxed font-normal pt-2 border-t border-white/[0.08]">
                <p>
                  I spend most of my time engineering web applications, learning how software systems operate under the hood, and building tools with clean architecture and modern AI capabilities.
                </p>
                <p className="text-muted">
                  Outside code, I work with a camera and editing timeline through{' '}
                  <strong className="text-white font-semibold">
                    {data.creativeName}
                  </strong>
                  . Whether writing backend microservices or pacing a visual sequence, both disciplines stem from the same curiosity: crafting experiences with deliberate structure, rhythm, and attention to detail.
                </p>
              </div>
            </motion.div>
          </div>

          {/* 4-Pillar Personal Metadata Matrix */}
          <motion.div
            variants={itemVariants}
            className="pt-10 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {metadataPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 bg-white/[0.02] border border-white/[0.08] rounded-[2px] space-y-3 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between font-mono text-xs text-muted border-b border-white/[0.06] pb-2">
                  <span className="uppercase tracking-wider">{pillar.label}</span>
                  <span className="text-[#00f59b] font-bold">
                    {pillar.number}
                  </span>
                </div>
                <div>
                  <h3
                    className="type-body-lg font-bold text-white uppercase tracking-tight"
                    dangerouslySetInnerHTML={{ __html: pillar.value }}
                  />
                  <p className="type-body-sm text-muted mt-1 font-mono text-[11px]">
                    {pillar.subvalue}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Currently Exploring Monospace Footer Bar */}
          <motion.div
            variants={itemVariants}
            className="p-5 sm:p-6 bg-white/[0.02] border border-white/[0.08] rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-muted"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b]" aria-hidden="true" />
              <span className="uppercase tracking-widest text-white font-medium">
                Current Focus:
              </span>
            </div>
            <span className="tracking-wider text-muted sm:text-right">
              Full-Stack Architecture &bull; AI Integrations &bull; Interactive Web Experiences
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
