'use client';

import React, { useState, useEffect } from 'react';
import { AppContent } from '@/lib/content-service';
import { EricHero } from './eric-hero';
import { EricProjects } from './eric-projects';
import { EricApproach } from './eric-approach';
import { EricServices } from './eric-services';
import { EricAbout } from './eric-about';
import { EricJGazeReel } from './eric-jgaze-reel';
import { EricContact } from './eric-contact';
import { RetroTVOverlay } from '@/components/ui/retro-tv-overlay';
import { EricCRTIntroLoader } from './eric-crt-intro-loader';

export interface EricColeViewProps {
  content: AppContent;
}

export const EricColeView: React.FC<EricColeViewProps> = ({ content }) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const profile = content.themeProfiles?.ericCole || {
    site: content.site,
    projects: content.projects,
    creative: content.creative,
    skills: content.skills,
  };

  useEffect(() => {
    // Map section IDs to their intended themes
    const sectionThemes: Record<string, 'light' | 'dark'> = {
      home: 'light',
      work: 'light',
      approach: 'light',
      services: 'dark',
      about: 'light',
      jgaze: 'light',
      contact: 'dark',
    };

    const sectionElements = Object.keys(sectionThemes)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = sectionThemes[entry.target.id];
            if (theme) {
              setCurrentTheme(theme);
            }
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`relative w-full min-h-screen flex flex-col font-sans select-none transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        currentTheme === 'dark'
          ? 'bg-[#0e0e10] text-[#f4f4f0] selection:bg-white selection:text-black'
          : 'bg-[#f4f4f0] text-[#121214] selection:bg-black selection:text-white'
      }`}
    >
      {/* Authentic Retro CRT TV Intro Boot Loader */}
      <EricCRTIntroLoader />

      {/* 90's Retro CRT TV Full-Page Scanline & Signal Variance Overlay */}
      <RetroTVOverlay />

      <EricHero siteContent={profile.site} />
      <EricProjects projects={profile.projects} />
      <EricApproach />
      <EricServices />
      <EricAbout siteContent={profile.site} />
      <EricJGazeReel />
      <EricContact siteContent={profile.site} />
    </div>
  );
};
