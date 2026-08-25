import fs from 'fs';
import path from 'path';
import { AppContent, defaultTemplatesConfig, ThemeProfilesMap, ThemeProfileData } from '@/types/content';

export * from '@/types/content';

const contentFilePath = path.join(process.cwd(), 'data', 'content.json');

export function createDefaultThemeProfiles(baseContent: Partial<AppContent>): ThemeProfilesMap {
  const baseSite = baseContent.site || {
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

export async function getContent(): Promise<AppContent> {
  try {
    if (fs.existsSync(contentFilePath)) {
      const fileData = await fs.promises.readFile(contentFilePath, 'utf-8');
      const parsed = JSON.parse(fileData) as AppContent;

      if (!parsed.templates) {
        parsed.templates = defaultTemplatesConfig;
      }

      if (!parsed.themeProfiles || !parsed.themeProfiles.syntax || !parsed.themeProfiles.spiderTech || !parsed.themeProfiles.ericCole) {
        parsed.themeProfiles = createDefaultThemeProfiles(parsed);
      }

      return parsed;
    }
  } catch (error) {
    console.error('Failed to read content.json, using fallback:', error);
  }

  // Fallback if file doesn't exist
  const emptyBase: AppContent = {
    site: {
      name: 'Jeet Rakholiya',
      creativeName: 'J.GAZE_',
      title: 'Jeet Rakholiya — Full-Stack Developer & Visual Creator',
      primaryRole: 'Full-Stack Developer',
      secondaryRoles: ['AI/ML Enthusiast', 'Videographer', 'Video Editor', 'Visual Storyteller'],
      description: 'Personal portfolio of Jeet Rakholiya.',
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
    },
    templates: defaultTemplatesConfig,
    projects: [],
    creative: [],
    skills: [],
    education: [],
    certifications: [],
  };

  emptyBase.themeProfiles = createDefaultThemeProfiles(emptyBase);
  return emptyBase;
}

export async function saveContent(content: AppContent): Promise<boolean> {
  try {
    const dir = path.dirname(contentFilePath);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }

    if (!content.themeProfiles) {
      content.themeProfiles = createDefaultThemeProfiles(content);
    }

    await fs.promises.writeFile(contentFilePath, JSON.stringify(content, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Failed to write content.json:', error);
    return false;
  }
}

export async function updateThemeProfile(
  themeKey: 'syntax' | 'spiderTech' | 'ericCole',
  profileData: ThemeProfileData
): Promise<boolean> {
  try {
    const current = await getContent();
    if (!current.themeProfiles) {
      current.themeProfiles = createDefaultThemeProfiles(current);
    }
    current.themeProfiles[themeKey] = profileData;
    return await saveContent(current);
  } catch (error) {
    console.error(`Failed to update theme profile ${themeKey}:`, error);
    return false;
  }
}

export async function updateSection<K extends keyof AppContent>(
  section: K,
  data: AppContent[K]
): Promise<boolean> {
  try {
    const current = await getContent();
    current[section] = data;
    return await saveContent(current);
  } catch (error) {
    console.error(`Failed to update section ${String(section)}:`, error);
    return false;
  }
}

