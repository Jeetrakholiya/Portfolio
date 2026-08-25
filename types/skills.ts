export type SkillCategory =
  | 'Programming'
  | 'Frameworks & Libraries'
  | 'Databases'
  | 'Tools'
  | 'Other'
  | 'Areas of Interest'
  | 'Creative Skills';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  highlight?: boolean;
}

export interface SkillGroup {
  category: SkillCategory;
  items: string[];
}
