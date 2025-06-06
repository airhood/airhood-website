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
}

export interface Interest {
  name: string;
}
