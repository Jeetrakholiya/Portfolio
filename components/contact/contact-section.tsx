'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { SectionLabel } from '@/components/ui/section-label';
import { siteConfig } from '@/data/site';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { easings } from '@/lib/animations';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const shouldReduce = useReducedMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

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

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
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
              number="07"
              label="Contact &bull; Connect"
              withDot
              withLine
              className="mb-4"
            />
          </motion.div>

          {/* Massive Closing Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-white/[0.08]">
            <motion.div variants={itemVariants} className="lg:col-span-8 space-y-3">
              <span className="font-mono text-xs text-[#00f59b] uppercase tracking-widest block">
                Start A Conversation
              </span>
              <h2 className="text-[clamp(3.25rem,9vw,9.5rem)] font-black tracking-tighter leading-[0.84] text-white uppercase select-none">
                Let&apos;s Build <br />
                Together.
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-4 space-y-2 lg:text-right font-mono text-xs text-muted">
              <span className="text-white uppercase tracking-widest block">
                Direct Inbox
              </span>
              <p className="type-body-sm text-white/70 leading-relaxed">
                Whether you have an engineering role, product build, or creative visual project, my inbox is open.
              </p>
            </motion.div>
          </div>

          {/* Primary Action: Direct Email & Copy Helper */}
          <motion.div
            variants={itemVariants}
            className="p-8 sm:p-12 bg-white/[0.02] border border-white/[0.08] rounded-[2px] space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 pb-6 border-b border-white/[0.06]">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-muted uppercase tracking-widest block">
                  Primary Direct Channel
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group inline-flex items-center gap-3 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white hover:text-[#00f59b] transition-colors"
                  aria-label={`Send email to ${siteConfig.email}`}
                >
                  <span className="break-all">{siteConfig.email}</span>
                  <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-fast group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
                </a>
              </div>

              {/* Interactive Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground bg-white/[0.04] border border-white/10 rounded-[2px] hover:bg-white/[0.08] hover:border-white/30 transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 shrink-0 select-none"
                aria-label="Copy email address to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00f59b]" aria-hidden="true" />
                    <span className="text-[#00f59b] font-semibold">Copied ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Duality Scope Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 font-mono text-xs">
              {/* Development Scope */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white uppercase tracking-wider font-semibold">
                  <span className="text-[#00f59b]">01 /</span>
                  <span>Software &amp; Engineering</span>
                </div>
                <p className="type-body-sm text-muted leading-relaxed font-sans">
                  Full-stack web applications, FastAPI &amp; asynchronous backends, AI/Gemini integrations, and responsive digital tools.
                </p>
              </div>

              {/* Creative Scope */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white uppercase tracking-wider font-semibold">
                  <span className="text-[#00f59b]">02 /</span>
                  <span>Visual &amp; Storytelling ({siteConfig.creativeName})</span>
                </div>
                <p className="type-body-sm text-muted leading-relaxed font-sans">
                  Videography, video editing, match cutting, sound pacing, and cinematic visual stories.
                </p>
              </div>
            </div>

            {/* Location & Social Links Strip */}
            <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-pulse" aria-hidden="true" />
                <span>{siteConfig.location} &bull; {siteConfig.availability}</span>
              </div>

              {/* Verified Editorial Social Links */}
              <div className="flex flex-wrap items-center gap-6 uppercase tracking-widest">
                {siteConfig.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-muted hover:text-white transition-colors"
                  >
                    <span>{social.label}</span>
                    <span className="transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
