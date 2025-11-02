// Type definitions for the portfolio

export interface Experience {
  id: string;
  date: string;
  title: string;
  company: string;
  type: 'internship' | 'simulation' | 'job';
  grade?: string;
  description: string;
  achievements: string[];
  certificate?: Certificate;
  relatedWork?: RelatedWork;
}

export interface Certificate {
  title: string;
  description: string;
  provider: string;
  pdfPath: string;
  credentialId?: string;
}

export interface RelatedWork {
  title: string;
  description: string;
  link: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  githubLink: string;
  liveLink?: string;
  tags?: string[];
}

export interface Skill {
  id: string;
  category: 'data' | 'dev' | 'devops' | 'tools';
  title: string;
  icon: string;
  items: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export type Theme = 'light' | 'dark';

export interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
}
