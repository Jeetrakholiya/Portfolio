'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Tag } from '@/components/ui/tag';
import { certificationsData } from '@/data/certifications';
import { Certification } from '@/types/certifications';
import { easings } from '@/lib/animations';

export interface CertificationsSectionProps {
  certifications?: Certification[];
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  const shouldReduce = useReducedMotion();
  const dataList = certifications || certificationsData;

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
            duration: 0.55,
            ease: easings.editorial,
          },
    },
  };

  return (
    <section
      id="certifications"
      aria-label="Certifications and Continuous Learning"
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
                number="06"
                label="Accreditations &bull; Credentials"
                withDot
                withLine
                className="mb-1"
              />
              <h2 className="type-display text-white">
                Verified <br />
                Credentials.
              </h2>
            </motion.div>
            <motion.p variants={itemVariants} className="type-body-lg text-muted max-w-md leading-relaxed">
              Coursework, technical specializations, and hackathon participation validating continuous skill acquisition.
            </motion.p>
          </div>

          {/* Monospace Editorial Certifications List */}
          <div className="border-t border-white/[0.08] divide-y divide-white/[0.06]">
            {dataList.map((cert, index) => {
              const formattedIndex = String(index + 1).padStart(2, '0');
              return (
                <motion.article
                  key={cert.id}
                  variants={itemVariants}
                  className="group py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center transition-colors hover:bg-white/[0.02] px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-[2px]"
                >
                  {/* Left: Index & Issue Date */}
                  <div className="md:col-span-3 flex items-center gap-4 font-mono text-xs text-muted">
                    <span className="text-[#00f59b] font-bold">{formattedIndex}</span>
                    <span className="text-white/20">/</span>
                    <span className="text-white/90 font-medium">{cert.issueDate}</span>
                  </div>

                  {/* Center: Certification Title & Issuer */}
                  <div className="md:col-span-5 space-y-1">
                    <h3 className="type-body-lg font-bold text-white uppercase tracking-tight group-hover:text-white transition-colors">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-xs text-muted">
                      Issued by <span className="text-white/80">{cert.issuer}</span>
                    </p>
                  </div>

                  {/* Right: Associated Skills */}
                  <div className="md:col-span-4 flex flex-wrap gap-1.5 md:justify-end">
                    {cert.skills && cert.skills.map((skill) => (
                      <Tag key={skill} variant="default" size="sm">
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
