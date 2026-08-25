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
  posterImage?: string | null;
  year: string;
  role: string | string[];
  instagramUrl?: string | null;
  featured: boolean;
  order: number;
  orientation?: 'vertical' | 'landscape' | 'square';
  tier?: 'featured' | 'primary' | 'supporting';
}
