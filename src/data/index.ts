import { FaGithub, FaDiscord } from 'react-icons/fa';
// import { SiTistory, SiCsharp, SiJavascript, SiPython, SiJava, SiAndroid, SiC, SiCplusplus, SiGo, SiUnity } from 'react-icons/si';
import { SiTistory, SiCsharp, SiJavascript, SiPython, SiAndroid, SiC, SiCplusplus, SiGo, SiUnity } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { SocialLink, Interest, TechStack } from '../types';


// 소셜 링크 데이터
export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/airhood',
    icon: FaGithub  // 문자열이 아니라 컴포넌트 직접 할당
  },
  {
    platform: 'Discord',
    url: 'https://discord.com/users/airhood',
    icon: FaDiscord
  },
  {
    platform: 'solved.ac',
    url: 'https://solved.ac/profile/airhood2009',
    emoji: '🏆'  // 이모지는 emoji 필드로 분리
  },
  {
    platform: 'Tistory',
    url: 'https://shinningcoding.tistory.com/',
    icon: SiTistory
  },
  {
    platform: 'litt.ly',
    url: 'https://litt.ly/airhood',
    emoji: '🔗'
  }
];

// 관심 분야 데이터
export const interests: Interest[] = [
  { name: 'Compiler' },
  { name: 'Game Engine' },
  { name: 'Backend' },
  { name: 'PS' },
  { name: 'AI' }
];

// 기술 스택 데이터
export const techStacks: TechStack[] = [
  {
    name: 'C#',
    icon: SiCsharp
  },
  {
    name: 'JavaScript',
    icon: SiJavascript
  },
  {
    name: 'Python',
    icon: SiPython
  },
  {
    name: 'Java',
    icon: FaJava
  },
  {
    name: 'Android',
    icon: SiAndroid
  },
  {
    name: 'C',
    icon: SiC
  },
  {
    name: 'C++',
    icon: SiCplusplus
  },
  {
    name: 'Go',
    icon: SiGo
  },
  {
    name: 'Unity',
    icon: SiUnity
  }
];
