export interface Project {
  _id?: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  icon?: string;
  featured: boolean;
  createdAt?: string;
}

export interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  company: string;
  message: string;
  avatarUrl?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
}