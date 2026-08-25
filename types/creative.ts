export type CreativeCategory =
  | 'Cinematography'
  | 'Color Grading'
  | 'Motion Graphics'
  | 'Photography'
  | 'Visual Storytelling'
  | 'Videography'
  | 'Video Editing';

export interface CreativeWork {
  id: string;
  title: string;
  category: CreativeCategory | string;
  description: string;
  thumbnail?: string | null;
  video?: string | null;
  videoSrc?: string | null;
  posterImage?: string | null;
  year: string;
  role?: string | string[];
  instagramUrl?: string | null;
  featured: boolean;
  order: number;
  orientation?: 'vertical' | 'landscape' | 'square';
  aspectRatio?: '9:16' | '16:9' | string;
  tier?: 'featured' | 'primary' | 'supporting';
  client?: string;
  duration?: string;
}
