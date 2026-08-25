'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInterfaceMode } from '@/components/providers/interface-mode-provider';
import { AppContent } from '@/types/content';

// Syntax Interface Components
import { HeroSection } from '@/components/hero/hero-section';
import { InfiniteMarquee } from '@/components/ui/infinite-marquee';
import { SelectedWorkSection } from '@/components/projects/selected-work-section';
import { CreativeSection } from '@/components/creative/creative-section';
import { AboutSection } from '@/components/about/about-section';
import { SkillsSection } from '@/components/skills/skills-section';
import { BackgroundSection } from '@/components/experience/background-section';
import { CertificationsSection } from '@/components/certifications/certifications-section';
import { ContactSection } from '@/components/contact/contact-section';
import { Footer } from '@/components/layout/footer';
import { CustomCursor } from '@/components/ui/custom-cursor';

// Spider-Tech / Spider-Verse Sci-Fi Interface
import { SpiderView } from '@/components/spider-tech/spider-view';

// Eric Cole Interface Components (Exact Video Reference Recreation)
import { EricColeView } from '@/components/eric-cole/eric-cole-view';

// Interface Switcher Pill
import { InterfaceSwitcher } from '@/components/ui/interface-switcher';

export interface PortfolioViewContainerProps {
  content: AppContent;
}

export const PortfolioViewContainer: React.FC<PortfolioViewContainerProps> = ({ content }) => {
  const { mode } = useInterfaceMode();

  const syntaxProfile = content.themeProfiles?.syntax || {
    site: content.site,
    projects: content.projects,
    creative: content.creative,
    skills: content.skills,
    education: content.education,
    certifications: content.certifications,
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Floating 3-Way Interface Switcher Pill */}
      <InterfaceSwitcher />

      <AnimatePresence mode="wait">
        {mode === 'syntax' && (
          <motion.div
            key="syntax-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col bg-[#09090b] text-[#f2f2f0] selection:bg-[#00f59b] selection:text-[#09090b]"
          >
            <CustomCursor />
            <HeroSection siteContent={syntaxProfile.site} />
            <InfiniteMarquee />
            <SelectedWorkSection projects={syntaxProfile.projects} />
            <CreativeSection creativeWorks={syntaxProfile.creative} />
            <AboutSection siteContent={syntaxProfile.site} />
            <SkillsSection />
            <BackgroundSection />
            <CertificationsSection certifications={syntaxProfile.certifications} />
            <ContactSection />
            <Footer />
          </motion.div>
        )}

        {mode === 'fuel' && (
          <motion.div
            key="spider-tech-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col"
          >
            <SpiderView content={content} />
          </motion.div>
        )}

        {mode === 'eric-cole' && (
          <motion.div
            key="eric-cole-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col"
          >
            <EricColeView content={content} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
