'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { SectionLabel } from '@/components/ui/section-label';
import { editorialSkillCategories } from '@/data/skills';
import { easings } from '@/lib/animations';

export const SkillsSection: React.FC = () => {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.08,
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
      id="skills"
      aria-label="Capabilities and Technical Skills"
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
          {/* Section Intro Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <motion.div variants={itemVariants} className="space-y-3">
              <SectionLabel
                number="04"
                label="Capabilities &bull; Stack"
                withDot
                withLine
                className="mb-1"
              />
              <h2 className="type-display text-white">
                Technical <br />
                Competencies.
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="type-body-lg text-muted max-w-md leading-relaxed font-mono text-xs uppercase tracking-wider"
            >
              Full-stack architecture, relational and document databases, AI integrations, and cinematic visual craft.
            </motion.p>
          </div>

          {/* Minimalist Technical Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {editorialSkillCategories.map((cat) => (
              <motion.div
                key={cat.number}
                variants={itemVariants}
                className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08] rounded-[2px] space-y-6 transition-colors hover:border-white/20 hover:bg-white/[0.03]"
              >
                <div className="space-y-2 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center justify-between font-mono text-xs text-muted uppercase tracking-widest">
                    <span>Category</span>
                    <span className="text-[#00f59b] font-bold">{cat.number}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white uppercase">
                    {cat.category}
                  </h3>
                  <p className="type-body-sm text-muted">
                    {cat.description}
                  </p>
                </div>

                {/* Primary Skills List */}
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#00f59b] block">
                    Core Technologies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.primarySkills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs font-medium px-2.5 py-1 bg-white/[0.04] border border-white/10 rounded-[2px] text-white/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Supporting Skills List */}
                {cat.supportingSkills && cat.supportingSkills.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted block">
                      Supporting Tools
                    </span>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-muted">
                      {cat.supportingSkills.map((subSkill) => (
                        <span key={subSkill} className="text-white/60">
                          {subSkill} &bull;
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom Footer Strip */}
          <motion.div
            variants={itemVariants}
            className="p-5 sm:p-6 bg-white/[0.02] border border-white/[0.08] rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-muted"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b]" aria-hidden="true" />
              <span className="uppercase tracking-widest text-white font-medium">
                Production Verified
              </span>
            </div>
            <span className="tracking-wider text-muted sm:text-right">
              Demonstrated through deployed codebases, active projects &amp; visual media.
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
