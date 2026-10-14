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
  blogUrl?: string;    // 개발 블로그 링크 ('Blog' 버튼)
  pdf?: string | string[];
  code?: { name: string; language: string; src: string }; // 소스코드 뷰어 (IDE 느낌)
  slides?: string[];   // pdf 중 PPT 자료인 파일 — 한 장씩 넘겨 보기 (나머지는 세로 연속 스크롤)
  highlights?: { value: string; label: string }[]; // 상세 상단 핵심 수치
  essay?: string[];   // 글(에세이) 본문 — 문단 배열, 상세 페이지에 본문으로 직접 노출
  sections?: { title: string; body: string[] }[];  // 상세 본문 (동기/내용/결과 등)
  videos?: { src: string; poster: string; caption: string }[]; // 상세 본문 아래 실험 영상
  gallery?: { src: string; caption: string; aspect: number; row: number }[]; // 상세 본문 아래 사진 (row = 같은 줄, aspect = 가로/세로 — 한 줄의 높이를 맞추는 데 씀)
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

export interface AppInfo {
  slug: string;
  name: string;
  description: string;
  icon: string;        // public 기준 경로 (정사각형)
  tags: string[];
  links: { label: string; url: string }[]; // 'Open' = 서비스 주소, 'Download' = 설치 파일, 'GitHub' = 저장소
}
