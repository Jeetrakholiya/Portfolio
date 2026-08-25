export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  type?: 'Full-time' | 'Part-time' | 'Internship' | 'Freelance' | 'Contract';
  startDate: string;
  endDate: string; // or 'Present'
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
}
