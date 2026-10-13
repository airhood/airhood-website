import { IconType } from 'react-icons';

export interface SocialLink {
  platform: string;
  url: string;
  icon?: IconType;
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
  pdf?: string | string[];
  highlights?: { value: string; label: string }[]; // 상세 상단 핵심 수치
  sections?: { title: string; body: string[] }[];  // 상세 본문 (동기/내용/결과 등)
  poster?: { image: string; pdf: string }; // 상세 상단에 이미지로 노출, 클릭하면 PDF
  demo?: { title: string; description: string; image: string; url: string }; // 상세 하단 '직접 해보기' 카드
  image?: string;      // 홈 카드 대표 이미지 (public 기준 경로)
  featured?: boolean;  // 홈 Projects에 크게 노출
}

export interface Goal {
  icon: IconType;
  title: string;
  description: string;
}
