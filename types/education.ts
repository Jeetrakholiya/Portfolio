export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  status: string; // e.g. "Final Year"
  highlights?: string[];
}
