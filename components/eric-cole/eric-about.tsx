'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SiteContent } from '@/types/content';
import { siteConfig } from '@/data/site';
import { ScrollRevealText } from '@/components/ui/scroll-reveal-text';

export interface EricAboutProps {
  siteContent?: SiteContent;
}

export const EricAbout: React.FC<EricAboutProps> = ({ siteContent }) => {
  const name = siteContent?.name || siteConfig.name;
  const portraitImage = '/images/jeet-about.jpg';

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle cinematic parallax drift on scroll
  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section
      id="about"
      aria-label="Eric Cole About Section"
      className="relative w-full py-20 sm:py-32 px-6 sm:px-12 lg:px-16 bg-transparent border-t border-current/10 select-none font-sans"
    >
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        
        {/* =================================================================
            1. TITLE WITH SIGNATURE CURSIVE FLOURISH (EXACT MATCH TO REFERENCE)
            ================================================================= */}
        <div className="text-center">
          <h2 className="text-6xl sm:text-9xl lg:text-[10rem] font-black uppercase tracking-[-0.04em] leading-none text-current flex items-center justify-center">
            A<span className="font-flourish text-7xl sm:text-[11rem] lg:text-[13rem] lowercase pr-1 text-current select-none">bou</span>T
          </h2>
        </div>

        {/* =================================================================
            2. PORTRAIT COMPOSITION WITH CINEMATIC SCROLL REVEAL (EXACT MATCH)
            ================================================================= */}
        <div ref={imageContainerRef} className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          
          {/* Left Text Badge: -- {"HELLO WORLD"} I'M JEET RAKHOLIYA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 font-mono text-xs uppercase tracking-widest space-y-2 pb-4 md:text-right"
          >
            <div className="opacity-60 text-[11px]">-- {`{"HELLO WORLD"}`}</div>
            <div className="text-base sm:text-lg font-black tracking-tight text-current">
              <span className="opacity-40 font-normal">I&apos;M </span>
              <span>{name.toUpperCase()}</span>
            </div>
          </motion.div>

          {/* Right Portrait Image with Smooth Curtain Mask Un-Clipping Reveal */}
          <div className="md:col-span-7 flex justify-center md:justify-start">
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full max-w-[360px] sm:max-w-[420px] rounded-[2px] overflow-hidden bg-black shadow-2xl border border-current/15 group"
            >
              {/* Inner Parallax Image Layer */}
              <motion.div style={{ y: imageY }} className="w-full h-[115%] -mt-[7.5%] relative">
                <Image
                  src={portraitImage}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-center grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </motion.div>

              {/* Fine CRT / Halftone Dither Scanline Texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_3px]"
                aria-hidden="true"
              />

              {/* Vignette Shadow */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />
            </motion.div>
          </div>

        </div>

        {/* =================================================================
            3. PHILOSOPHY STATEMENTS WITH SCROLL DARKENING SCRUB EFFECT
            ================================================================= */}
        <div className="max-w-4xl mx-auto space-y-12 text-left sm:text-center pt-8">
          <div className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.08] flex justify-center">
            <ScrollRevealText
              text="I'M A SOFTWARE ENGINEER WORKING ACROSS PRODUCT DEVELOPMENT AND SYSTEMS DESIGN."
              className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight"
            />
          </div>

          <div className="font-mono text-xs opacity-50 uppercase tracking-widest text-center">
            [ PHILOSOPHY ]
          </div>

          <div className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-snug flex justify-center">
            <ScrollRevealText
              text="I ENJOY SIMPLIFYING COMPLEX IDEAS AND TURNING THEM INTO TOOLS PEOPLE CAN ACTUALLY USE."
              className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight"
            />
          </div>

          <div className="text-lg sm:text-2xl font-bold uppercase tracking-tight leading-snug max-w-3xl mx-auto flex justify-center">
            <ScrollRevealText
              text="MY WORK SITS SOMEWHERE BETWEEN ENGINEERING AND DESIGN — WHERE STRUCTURE MATTERS JUST AS MUCH AS EXPERIENCE."
              className="text-lg sm:text-2xl font-bold uppercase tracking-tight"
            />
          </div>
        </div>

        {/* =================================================================
            4. CLIENT / TECH TOOL LOGOS STRIP
            ================================================================= */}
        <div className="pt-12 border-t border-current/10 flex flex-wrap items-center justify-center gap-8 sm:gap-14 font-mono text-xs opacity-60 uppercase tracking-widest">
          <span className="font-bold opacity-100 text-current">STACK &bull; TECH:</span>
          <span>NEXT.JS</span>
          <span>FASTAPI</span>
          <span>PYTHON</span>
          <span>REACT</span>
          <span>GEMINI AI</span>
          <span>MONGODB</span>
        </div>

      </div>
    </section>
  );
};
