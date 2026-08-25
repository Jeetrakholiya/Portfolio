import { Project } from '@/types/project';
import { CreativeWork } from '@/types/creative';
import { SkillItem } from '@/types/skills';
import { Education } from '@/types/education';
import { Certification } from '@/types/certifications';

export interface SiteContent {
  name: string;
  creativeName: string;
  title: string;
  primaryRole: string;
  secondaryRoles: string[];
  description: string;
  url: string;
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  location: string;
  availability: string;
  heroQuote: string;
  heroTimeline: string;
  heroAcademic: string;
  heroSubtitle: string;
  portraitImage: string;
}

export interface SyntaxTemplateConfig {
  name: string;
  badge: string;
  accentColor: string;
  heroHeadline: string;
  heroSubtitle: string;
  marqueeText: string;
  showScanlines: boolean;
  customCursor: boolean;
}

export interface SpiderTechTemplateConfig {
  name: string;
  badge: string;
  suitColor: string;
  heroTitle: string;
  heroTagline: string;
  heroMission: string;
  manifesto: string;
  hangingSpiderman: boolean;
  interactiveWebs: boolean;
  backgroundWebNets: boolean;
}

export interface EricColeTemplateConfig {
  name: string;
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  videoSrc: string;
  tvChannel: string;
  soundEnabled: boolean;
  aboutHeadline: string;
}

export interface TemplatesConfig {
  activeTemplate: 'syntax' | 'fuel' | 'eric-cole';
  syntax: SyntaxTemplateConfig;
  spiderTech: SpiderTechTemplateConfig;
  ericCole: EricColeTemplateConfig;
}

export interface AppContent {
  site: SiteContent;
  templates?: TemplatesConfig;
  projects: Project[];
  creative: CreativeWork[];
  skills: SkillItem[];
  education: Education[];
  certifications: Certification[];
}

export const defaultTemplatesConfig: TemplatesConfig = {
  activeTemplate: 'syntax',
  syntax: {
    name: 'Syntax (Terminal)',
    badge: 'HACKER / CYBER MONOSPACE',
    accentColor: '#00f59b',
    heroHeadline: 'I BUILD SYSTEMS. I FRAME STORIES.',
    heroSubtitle: 'Full-Stack Developer & Visual Creator (@j.gaze_)',
    marqueeText: 'REACT 19 • NEXT.JS 14 • FASTAPI • PYTHON • AI INTEGRATION • TAILWIND CSS',
    showScanlines: true,
    customCursor: true,
  },
  spiderTech: {
    name: 'Spider-Tech',
    badge: 'SPIDER-MAN UNIVERSE',
    suitColor: '#c40c24',
    heroTitle: 'JEET RAKHOLIYA',
    heroTagline: 'WHO ARE YOU UNDER THE MASK?',
    heroMission:
      'Every Spider-Man carries something different. Engineering high-speed web architectures, intelligent AI systems, and living digital experiences across the entire web.',
    manifesto:
      'WITH GREAT CODE COMES GREAT COMPUTATION. ANYONE CAN WEAR THE MASK — BUT CRAFTING RESILIENT ARCHITECTURES REQUIRES RELENTLESS MASTERY.',
    hangingSpiderman: true,
    interactiveWebs: true,
    backgroundWebNets: true,
  },
  ericCole: {
    name: 'Eric Cole',
    badge: '90s VINTAGE CRT TV & EDITORIAL',
    heroTitle: 'ERIC COLE',
    heroSubtitle: 'Editorial Portfolio of Jeet Rakholiya',
    videoSrc: '/images/IMG_1935.MOV',
    tvChannel: 'CH 04 • J.GAZE_ EDITORIAL',
    soundEnabled: true,
    aboutHeadline: 'A Visual Storyteller in Code and Cinematography',
  },
};
