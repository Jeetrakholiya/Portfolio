export interface ProjectCaseStudy {
  overview?: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  keyFeatures?: string[];
  challenges?: string[];
  outcomes?: string[];
  screenshots?: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
}

export type ProjectCategory = 
  | 'AI / Machine Learning'
  | 'Full-Stack Development'
  | 'Web Application'
  | 'Enterprise Software'
  | 'Frontend Engineering';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory | string;
  shortDescription: string;
  description: string;
  year: string;
  role?: string;
  status?: string;
  timeline?: string;
  technologies: string[];
  image?: string | null;
  thumbnail?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  features?: string[];
  caseStudy?: ProjectCaseStudy | null;
  order: number;
}
