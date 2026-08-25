'use client';

import React from 'react';
import Image from 'next/image';
import { AppContent } from '@/lib/content-service';
import { SpiderWebCanvas } from './spider-web-canvas';
import { SpiderCursor } from './spider-cursor';
import { HangingSpiderman } from './hanging-spiderman';
import { SpiderHero } from './spider-hero';
import { SpiderMultiverseProjects } from './spider-multiverse-projects';
import { SpiderAbilities } from './spider-abilities';
import { SpiderMultiverseStory } from './spider-multiverse-story';
import { SpiderContact } from './spider-contact';

export interface SpiderViewProps {
  content: AppContent;
}

export const SpiderView: React.FC<SpiderViewProps> = ({ content }) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col text-[#ffffff] selection:bg-[#c40c24] selection:text-white font-sans overflow-x-hidden">
      {/* =================================================================
          USER-PROVIDED SPIDER-MAN BACKGROUND (FULL NATURAL CLARITY - NO BLACKOUT)
          ================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/images/spiderman-bg.jpg"
          alt="Spider-Man Sketch Artwork Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* 1. Spider-Man Hardware-Accelerated Native Pointer */}
      <SpiderCursor />

      {/* 2. Interactive Spider-Web Physics Canvas (Cursor-Only Emitting Particles & Shootable Webs) */}
      <SpiderWebCanvas />

      {/* 3. Hanging Spider-Man from the Navbar/Header with 360° Omnidirectional Stretch */}
      <HangingSpiderman />

      {/* 4. Spider-Man Content Sections */}
      <div className="relative z-10">
        <SpiderHero siteContent={content.site} />
        <SpiderMultiverseProjects projects={content.projects} />
        <SpiderAbilities />
        <SpiderMultiverseStory siteContent={content.site} />
        <SpiderContact siteContent={content.site} />
      </div>
    </div>
  );
};
