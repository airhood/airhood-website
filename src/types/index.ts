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
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Award {
  title: string;
  organization: string;
  date: string;
  description?: string;
}

export interface Goal {
  emoji: string;
  title: string;
  description: string;
}
