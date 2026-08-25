import fs from 'fs';
import path from 'path';
import { AppContent, defaultTemplatesConfig } from '@/types/content';

export * from '@/types/content';

const contentFilePath = path.join(process.cwd(), 'data', 'content.json');

export async function getContent(): Promise<AppContent> {
  try {
    if (fs.existsSync(contentFilePath)) {
      const fileData = await fs.promises.readFile(contentFilePath, 'utf-8');
      const parsed = JSON.parse(fileData) as AppContent;
      if (!parsed.templates) {
        parsed.templates = defaultTemplatesConfig;
      }
      return parsed;
    }
  } catch (error) {
    console.error('Failed to read content.json, using fallback:', error);
  }

  // Fallback if file doesn't exist
  return {
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
      portraitImage: '/images/jeet-syntax.png',
    },
    templates: defaultTemplatesConfig,
    projects: [],
    creative: [],
    skills: [],
    education: [],
    certifications: [],
  };
}

export async function saveContent(content: AppContent): Promise<boolean> {
  try {
    const dir = path.dirname(contentFilePath);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }
    await fs.promises.writeFile(contentFilePath, JSON.stringify(content, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Failed to write content.json:', error);
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
