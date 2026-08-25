import { SkillGroup, SkillItem } from '@/types/skills';

export interface EditorialSkillCategory {
  number: string;
  category: string;
  description: string;
  primarySkills: string[];
  supportingSkills: string[];
}

export const editorialSkillCategories: EditorialSkillCategory[] = [
  {
    number: '01',
    category: 'Development & Frameworks',
    description: 'Languages, backend APIs, frontend libraries, and full-stack frameworks.',
    primarySkills: ['Python', 'React.js', 'FastAPI', 'JavaScript', 'Django', 'C#'],
    supportingSkills: ['Java', 'Node.js', 'HTML5', 'CSS3', 'ASP.NET', '.NET Framework'],
  },
  {
    number: '02',
    category: 'Database & Storage',
    description: 'Document and relational database design, querying, and state persistence.',
    primarySkills: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQL Server'],
    supportingSkills: ['SQL', 'Data Modeling', 'Query Optimization'],
  },
  {
    number: '03',
    category: 'AI & Computer Science',
    description: 'Generative AI API integration, machine learning concepts, and algorithmic foundations.',
    primarySkills: ['Google Gemini API', 'Machine Learning', 'DSA', 'OOP'],
    supportingSkills: ['Web Scraping', 'Prompt Engineering', 'Algorithmic Logic'],
  },
  {
    number: '04',
    category: 'Tools & Workflow',
    description: 'Version control, development environments, database managers, and notebooks.',
    primarySkills: ['Git', 'GitHub', 'VS Code', 'Visual Studio'],
    supportingSkills: ['Jupyter Notebook', 'pgAdmin', 'CLI'],
  },
  {
    number: '05',
    category: 'Creative Domain (J.GAZE_)',
    description: 'Cinematic visual production, pacing, match cuts, and color harmonization.',
    primarySkills: ['Videography', 'Video Editing', 'Visual Storytelling'],
    supportingSkills: ['Cinematography', 'Color Grading', 'Sound Design'],
  },
];

export const technicalSkillGroups: SkillGroup[] = [
  {
    category: 'Programming',
    items: ['Python', 'Java', 'JavaScript', 'HTML', 'CSS', 'C#'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['React.js', 'Node.js', 'Django', 'FastAPI', 'ASP.NET', '.NET Framework'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQL Server'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'Jupyter Notebook', 'pgAdmin'],
  },
  {
    category: 'Other',
    items: ['Web Scraping', 'Google Gemini API', 'Windows Forms'],
  },
  {
    category: 'Areas of Interest',
    items: ['DSA', 'OOP', 'SQL', 'Machine Learning', 'Full-Stack Development'],
  },
  {
    category: 'Creative Skills',
    items: ['Videography', 'Video Editing', 'Visual Storytelling'],
  },
];

export const skillsData: SkillItem[] = [
  // Programming
  { name: 'Python', category: 'Programming', highlight: true },
  { name: 'Java', category: 'Programming' },
  { name: 'JavaScript', category: 'Programming', highlight: true },
  { name: 'HTML', category: 'Programming' },
  { name: 'CSS', category: 'Programming' },
  { name: 'C#', category: 'Programming' },

  // Frameworks & Libraries
  { name: 'React.js', category: 'Frameworks & Libraries', highlight: true },
  { name: 'Node.js', category: 'Frameworks & Libraries' },
  { name: 'Django', category: 'Frameworks & Libraries' },
  { name: 'FastAPI', category: 'Frameworks & Libraries', highlight: true },
  { name: 'ASP.NET', category: 'Frameworks & Libraries' },
  { name: '.NET Framework', category: 'Frameworks & Libraries' },

  // Databases
  { name: 'MongoDB', category: 'Databases', highlight: true },
  { name: 'MySQL', category: 'Databases' },
  { name: 'PostgreSQL', category: 'Databases' },
  { name: 'SQL Server', category: 'Databases' },

  // Tools
  { name: 'Git', category: 'Tools', highlight: true },
  { name: 'GitHub', category: 'Tools', highlight: true },
  { name: 'VS Code', category: 'Tools' },
  { name: 'Visual Studio', category: 'Tools' },
  { name: 'Jupyter Notebook', category: 'Tools' },
  { name: 'pgAdmin', category: 'Tools' },

  // Other
  { name: 'Web Scraping', category: 'Other' },
  { name: 'Google Gemini API', category: 'Other', highlight: true },
  { name: 'Windows Forms', category: 'Other' },

  // Areas of Interest
  { name: 'DSA', category: 'Areas of Interest' },
  { name: 'OOP', category: 'Areas of Interest' },
  { name: 'SQL', category: 'Areas of Interest' },
  { name: 'Machine Learning', category: 'Areas of Interest', highlight: true },
  { name: 'Full-Stack Development', category: 'Areas of Interest', highlight: true },

  // Creative Skills
  { name: 'Videography', category: 'Creative Skills', highlight: true },
  { name: 'Video Editing', category: 'Creative Skills', highlight: true },
  { name: 'Visual Storytelling', category: 'Creative Skills', highlight: true },
];
