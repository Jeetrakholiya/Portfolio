'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { SectionLabel } from '@/components/ui/section-label';
import { educationData } from '@/data/education';
import { easings } from '@/lib/animations';

export const BackgroundSection: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const primaryEducation = educationData[0];

  const containerVariants = {
    hidden: { opacity: shouldReduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduce
        ? { duration: 0.01 }
        : {
            duration: 0.6,
            ease: easings.editorial,
          },
    },
  };

  return (
    <section
      id="background"
      aria-label="Academic Background and Education"
      className="w-full section-padding border-b border-white/[0.08] bg-[#09090b] text-[#f2f2f0]"
    >
      <Container size="wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="space-y-12 sm:space-y-16"
        >
          {/* Section Intro Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <motion.div variants={itemVariants} className="space-y-3">
              <SectionLabel
                number="05"
                label="Background &bull; Education"
                withDot
                withLine
                className="mb-1"
              />
              <h2 className="type-display text-white">
                Academic <br />
                Foundations.
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="type-body-lg text-muted max-w-md leading-relaxed font-mono text-xs uppercase tracking-wider"
            >
              Formal computer science foundations, core systems engineering, and continuous learning.
            </motion.p>
          </div>

          {/* Primary Education Technical Feature */}
          {primaryEducation && (
            <motion.article
              variants={itemVariants}
              className="p-6 sm:p-10 bg-white/[0.02] border border-white/[0.08] rounded-[2px] space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Timeline & Standing */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-muted uppercase tracking-widest block">
                      Timeline
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono block">
                      2023 &mdash; Present
                    </span>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] space-y-1 font-mono text-xs">
                    <span className="text-muted uppercase tracking-wider block text-[10px]">
                      Academic Standing
                    </span>
                    <div className="flex items-center gap-2 text-[#00f59b] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-pulse" aria-hidden="true" />
                      <span>{primaryEducation.status} (B.E.)</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Degree & Institution */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-[#00f59b] uppercase tracking-widest block">
                      {primaryEducation.degree}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
                      {primaryEducation.field}
                    </h3>
                    <p className="type-body text-muted font-mono text-xs">
                      {primaryEducation.institution} &bull; {primaryEducation.location}
                    </p>
                  </div>

                  {/* Highlights / Coursework Focus */}
                  {primaryEducation.highlights && primaryEducation.highlights.length > 0 && (
                    <div className="pt-4 border-t border-white/[0.06] space-y-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted block">
                        Specialization &amp; Coursework:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-white/70">
                        {primaryEducation.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#00f59b] mt-0.5">&bull;</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          )}
        </motion.div>
      </Container>
    </section>
  );
};
