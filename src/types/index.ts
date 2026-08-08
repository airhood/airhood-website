import { IconType } from 'react-icons';

export interface SocialLink {
  platform: string;
  url: string;
  icon?: IconType;
  emoji?: string;
}

export interface TechStack {
  name: string;
  icon: IconType | (() => JSX.Element);
  description?: string;
  category?: 'language' | 'framework' | 'tool';
}

export interface Interest {
  name: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date?: string;
  organization?: string;
  type?: 'competition' | 'research';
  githubUrl?: string;
  liveUrl?: string;
  pdf?: string;
}

export interface Goal {
  emoji: string;
  title: string;
  description: string;
}
