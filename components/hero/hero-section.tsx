'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { siteConfig } from '@/data/site';
import { SiteContent } from '@/lib/content-service';
import { easings } from '@/lib/animations';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export interface HeroSectionProps {
  siteContent?: SiteContent;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ siteContent }) => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const data = siteContent || {
    name: siteConfig.name,
    creativeName: siteConfig.creativeName,
    title: siteConfig.title,
    primaryRole: siteConfig.primaryRole,
    secondaryRoles: siteConfig.secondaryRoles,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    github: siteConfig.github,
    linkedin: siteConfig.linkedin,
    instagram: siteConfig.instagram,
    location: siteConfig.location,
    availability: siteConfig.availability,
    heroQuote: "WHETHER IT'S WRITING CODE OR STRUCTURING A VISUAL STORY, I AIM FOR CLARITY, DISCIPLINE AND LONG-TERM IMPACT. I BELIEVE GOOD SYSTEMS ARE BUILT WITH INTENT AND CONSISTENCY.",
    heroTimeline: '2022 → 2026',
    heroAcademic: 'Final-Year B.E. CS & IT',
    heroSubtitle: 'Full-Stack Developer & Visual Creator (@j.gaze_), based in Gujarat, India',
    portraitImage: '/images/jeet-portrait.png',
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll Choreography: Photo smoothly shrinks in size & moves to the right side as a portrait
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.78, 0.55]);
  const photoX = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '16%', '30%']);
  const photoY = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '4%', '8%']);
  const photoBorderRadius = useTransform(scrollYProgress, [0, 0.4, 1], ['0px', '4px', '8px']);
  const photoBorderOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8], [0, 0.4, 1]);

  // Text exits towards the left with smooth fade
  const textX = useTransform(scrollYProgress, [0, 0.6], ['0%', '-10%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Entrance animations matching Syntax template
  const maskVariants = {
    hidden: shouldReduce ? { opacity: 1, y: 0 } : { y: '105%' },
    visible: (customDelay: number) => ({
      y: 0,
      opacity: 1,
      transition: shouldReduce
        ? { duration: 0.01 }
        : {
            duration: 0.95,
            ease: easings.cinematic,
            delay: customDelay,
          },
    }),
  };

  const fadeVariants = {
    hidden: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: shouldReduce
        ? { duration: 0.01 }
        : {
            duration: 0.7,
            ease: easings.editorial,
            delay: customDelay,
          },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="home"
      aria-label="Introduction"
      className="relative w-full min-h-[100dvh] sm:min-h-[680px] flex flex-col justify-between p-4 sm:p-10 lg:p-12 border-b border-white/[0.08] overflow-hidden bg-[#09090b] text-[#f2f2f0] select-none"
    >
      {/* =================================================================
          1. BRIGHT, CRISP HERO PORTRAIT (SHRINKS & SHIFTS RIGHT ON SCROLL)
          ================================================================= */}
      <motion.div
        style={
          shouldReduce
            ? {}
            : {
                scale: photoScale,
                x: photoX,
                y: photoY,
                borderRadius: photoBorderRadius,
              }
        }
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 will-change-transform origin-center lg:origin-right overflow-hidden"
      >
        {/* Bright, high-contrast portrait (clearly discoverable) */}
        <Image
          src={data.portraitImage || '/images/jeet-portrait.png'}
          alt={`${data.name} Portrait Background`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-[center_15%] grayscale contrast-[1.10] brightness-[1.08] transition-all"
        />

        {/* Ambient Subtle Vignette (Not over-darkened) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/35 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/60 via-transparent to-transparent opacity-80" />

        {/* Dynamic Border Frame on Scroll */}
        <motion.div
          style={{ opacity: shouldReduce ? 0 : photoBorderOpacity }}
          className="absolute inset-0 border border-white/25 rounded-[inherit] pointer-events-none shadow-2xl"
        />
      </motion.div>

      {/* =================================================================
          2. TOP PERIMETER BAR (Name ● Available | CV, Contact, UTC)
          ================================================================= */}
      <motion.div
        custom={0.1}
        initial="hidden"
        animate="visible"
        variants={fadeVariants}
        style={shouldReduce ? {} : { opacity: textOpacity }}
        className="relative z-10 w-full flex items-start justify-between gap-3 font-mono text-xs sm:text-sm pt-16 sm:pt-4"
      >
        {/* Top-Left: Name + Live Status */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          <span className="text-white font-bold tracking-tight text-xs sm:text-base">
            {data.name}
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00f59b] animate-pulse shadow-[0_0_10px_#00f59b]" aria-hidden="true" />
            <span className="text-[#00f59b] font-medium tracking-wide text-[11px] sm:text-sm font-semibold">
              {data.availability}
            </span>
          </div>
        </div>

        {/* Top-Right: Resume, Contact, Timezone */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 sm:gap-8 text-right drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden sm:inline-flex items-center gap-1 text-white hover:text-white transition-colors font-medium"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#00f59b]" />
          </a>

          <a
            href="#contact"
            className="group inline-flex items-center gap-1 text-white font-bold hover:text-[#00f59b] transition-colors text-xs sm:text-sm"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#00f59b]" />
          </a>

          <span className="text-white/80 font-mono text-[10px] sm:text-xs">
            (UTC+5:30)
          </span>
        </div>
      </motion.div>

      {/* =================================================================
          3. MIDDLE SECTION: TIMELINE TAG (LEFT) + PHILOSOPHY QUOTE (RIGHT)
          ================================================================= */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 my-2 sm:my-auto items-center">
        {/* Middle-Left: Electric Green Timeline Tag */}
        <motion.div
          custom={0.25}
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
          style={shouldReduce ? {} : { x: textX, opacity: textOpacity }}
          className="md:col-span-6 space-y-0.5 sm:space-y-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          <div className="text-[#00f59b] font-black text-xl sm:text-3xl lg:text-4xl tracking-tight leading-none drop-shadow-[0_0_12px_rgba(0,245,155,0.4)]">
            {data.heroTimeline}
          </div>
          <div className="text-[#00f59b] font-bold text-sm sm:text-xl tracking-tight font-mono">
            {data.heroAcademic}
          </div>
        </motion.div>

        {/* Middle-Right: Bold Statement Quote (Exact Reference Typography) */}
        <motion.div
          custom={0.35}
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
          style={shouldReduce ? {} : { opacity: textOpacity }}
          className="md:col-span-6 md:ml-auto max-w-md lg:max-w-lg text-left"
        >
          <div className="p-3 sm:p-6 bg-black/65 backdrop-blur-md border border-white/20 rounded-[2px] shadow-2xl">
            <p className="text-[10px] sm:text-xs lg:text-[13px] font-black tracking-wider uppercase leading-relaxed text-white font-mono">
              &ldquo; {data.heroQuote} &rdquo;
            </p>
          </div>
        </motion.div>
      </div>

      {/* =================================================================
          4. BOTTOM SECTION: FULL UNCLIPPED TYPOGRAPHY (JEET RAKHOLIYA)
          ================================================================= */}
      <motion.div
        style={shouldReduce ? {} : { x: textX, opacity: textOpacity }}
        className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-2"
      >
        {/* Full Unclipped Headline: JEET RAKHOLIYA */}
        <div className="space-y-1.5 sm:space-y-2 w-full max-w-full drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          <h1
            aria-label={data.name}
            className="text-[clamp(2.35rem,8.2vw,8.5rem)] font-black tracking-[-0.03em] leading-[0.85] uppercase text-white select-none flex flex-col w-full"
          >
            <span className="overflow-hidden block w-fit max-w-full pr-2 pb-0.5 sm:pb-1">
              <motion.span
                custom={0.2}
                initial="hidden"
                animate="visible"
                variants={maskVariants}
                className="block will-change-transform text-white"
              >
                {data.name.split(' ')[0] || 'Jeet'}
              </motion.span>
            </span>
            <span className="overflow-hidden block w-fit max-w-full pr-2 pt-0.5 sm:pt-1">
              <motion.span
                custom={0.32}
                initial="hidden"
                animate="visible"
                variants={maskVariants}
                className="block will-change-transform text-white tracking-[-0.03em]"
              >
                {data.name.split(' ').slice(1).join(' ') || 'Rakholiya'}
              </motion.span>
            </span>
          </h1>

          {/* Sub-headline: Senior Title / Location */}
          <motion.p
            custom={0.45}
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
            className="text-[11px] sm:text-sm font-mono text-white/90 font-semibold tracking-wide uppercase pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-2xl"
          >
            {data.heroSubtitle}
          </motion.p>
        </div>

        {/* Bottom Right: Scroll Cue */}
        <motion.div
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
          className="shrink-0 hidden sm:block"
        >
          <a
            href="#work"
            className="group font-mono text-xs uppercase tracking-widest text-white/90 hover:text-white transition-colors inline-flex items-center gap-2 pb-1 border-b border-white/30 hover:border-[#00f59b] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            aria-label="Scroll to explore selected work"
          >
            <span>Scroll</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#00f59b] transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
