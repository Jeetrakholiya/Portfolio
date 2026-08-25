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
  heroHeadline?: string;
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

export interface ThemeProfileData {
  site: SiteContent;
  projects: Project[];
  creative: CreativeWork[];
  skills: SkillItem[];
  education?: Education[];
  certifications?: Certification[];
  settings?: Record<string, any>;
}

export interface ThemeProfilesMap {
  syntax: ThemeProfileData;
  spiderTech: ThemeProfileData;
  ericCole: ThemeProfileData;
}

export interface AppContent {
  site: SiteContent;
  templates?: TemplatesConfig;
  themeProfiles?: ThemeProfilesMap;
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
    videoSrc: '/videos/j-gaze-reel.mp4',
    tvChannel: 'CH 04 • J.GAZE_ EDITORIAL',
    soundEnabled: true,
    aboutHeadline: 'A Visual Storyteller in Code and Cinematography',
  },
};

export function createDefaultThemeProfiles(baseContent: Partial<AppContent>): ThemeProfilesMap {
  const baseSite: SiteContent = baseContent.site || {
    name: 'Jeet Rakholiya',
    creativeName: 'J.GAZE_',
    title: 'Jeet Rakholiya — Full-Stack Developer & Visual Creator',
    primaryRole: 'Full-Stack Developer',
    secondaryRoles: ['AI/ML Enthusiast', 'Videographer', 'Video Editor', 'Visual Storyteller'],
    description: 'Personal portfolio of Jeet Rakholiya — Full-Stack Developer building modern digital products and Visual Creator (J.GAZE_) crafting cinematic visual experiences.',
    url: 'https://jeetrakholiya.dev',
    email: 'jeetrakholiya02@gmail.com',
    github: 'https://github.com/Jeetrakholiya',
    linkedin: 'https://linkedin.com/in/jeet-rakholiya-48a662358',
    instagram: 'https://www.instagram.com/j.gaze_/',
    location: 'Gujarat, India',
    availability: 'Available for work',
    heroQuote: "WHETHER IT'S WRITING CODE OR STRUCTURING A VISUAL STORY, I AIM FOR CLARITY, DISCIPLINE AND LONG-TERM IMPACT.",
    heroTimeline: '2022 → 2026',
    heroAcademic: 'Final-Year B.E. CS & IT',
    heroSubtitle: 'Full-Stack Developer & Visual Creator (@j.gaze_), based in Gujarat, India',
    portraitImage: '/images/img_2166_1787568234145.png',
  };

  const baseProjects = baseContent.projects || [];
  const baseCreative = baseContent.creative || [];
  const baseSkills = baseContent.skills || [];
  const baseEducation = baseContent.education || [];
  const baseCertifications = baseContent.certifications || [];

  return {
    syntax: {
      site: {
        ...baseSite,
        name: baseSite.name || 'Jeet Rakholiya',
        primaryRole: 'Full-Stack Developer',
        title: `${baseSite.name || 'Jeet Rakholiya'} — Full-Stack Developer & Terminal Engineer`,
        heroSubtitle: 'Full-Stack Developer & Visual Creator (@j.gaze_), based in Gujarat, India',
        heroHeadline: 'I BUILD SYSTEMS. I FRAME STORIES.',
      },
      projects: [...baseProjects],
      creative: [...baseCreative],
      skills: [...baseSkills],
      education: [...baseEducation],
      certifications: [...baseCertifications],
      settings: { ...defaultTemplatesConfig.syntax },
    },
    spiderTech: {
      site: {
        ...baseSite,
        name: baseSite.name || 'Jeet Rakholiya',
        creativeName: baseSite.creativeName || 'J.GAZE_',
        primaryRole: 'Multiverse Web Engineer',
        title: `${baseSite.name || 'Jeet Rakholiya'} — Multiverse Web Architecture & AI Systems`,
        heroSubtitle: 'Engineering high-speed web architectures, intelligent AI systems, and living digital experiences across the web.',
        heroHeadline: 'WITH GREAT CODE COMES GREAT COMPUTATION.',
        heroQuote: 'BUILDING RESILIENT ARCHITECTURES REQUIRES RELENTLESS MASTERY AND INTENTIONAL DESIGN.',
      },
      projects: [...baseProjects],
      creative: [...baseCreative],
      skills: [...baseSkills],
      settings: { ...defaultTemplatesConfig.spiderTech },
    },
    ericCole: {
      site: {
        ...baseSite,
        name: 'Eric Cole',
        creativeName: 'J.GAZE_ STUDIO',
        primaryRole: 'Creative Director & Filmmaker',
        title: 'Eric Cole — Editorial Design & Visual Direction',
        heroSubtitle: 'Editorial Portfolio of Jeet Rakholiya • Video Direction & High-End Visuals',
        heroHeadline: 'CINEMATIC VISION. EDITORIAL PRECISION.',
        heroQuote: 'FRAME BY FRAME, LINE BY LINE. CRAFTING TIMELESS DIGITAL EXPERIENCES.',
      },
      projects: [...baseProjects],
      creative: [...baseCreative],
      skills: [...baseSkills],
      settings: { ...defaultTemplatesConfig.ericCole },
    },
  };
}
