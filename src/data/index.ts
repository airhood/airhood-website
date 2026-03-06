import { FaGithub, FaDiscord, FaTrophy, FaLink, FaJava } from 'react-icons/fa';
import { SiTistory, SiCsharp, SiJavascript, SiPython, SiAndroid, SiC, SiCplusplus, SiGo, SiUnity, SiReact, SiDart, SiFlutter, SiPytorch } from 'react-icons/si';
import { SocialLink, Interest, TechStack, Project, Award, Goal } from '../types';

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/airhood', icon: FaGithub },
  { platform: 'Discord', url: 'https://discord.com/users/airhood', icon: FaDiscord },
  { platform: 'solved.ac', url: 'https://solved.ac/profile/airhood2009', icon: FaTrophy },
  { platform: 'Tistory', url: 'https://shinningcoding.tistory.com/', icon: SiTistory },
  { platform: 'litt.ly', url: 'https://litt.ly/airhood', icon: FaLink },
];

export const interests: Interest[] = [
  { name: 'AI' },
  { name: 'Physical AI' },
  { name: 'Robotics' },
  { name: 'Embedded System' },
  { name: 'Quantum Computing' },
  { name: 'Compiler' },
  { name: 'Game Engine' },
  { name: 'Backend' },
  { name: 'PS' },
];

export const techStacks: TechStack[] = [
  { name: 'C#', icon: SiCsharp, description: 'Unity 게임 개발', category: 'language' },
  { name: 'C++', icon: SiCplusplus, description: '시스템 프로그래밍, 컴파일러, 게임 엔진 개발', category: 'language' },
  { name: 'C', icon: SiC, description: '저수준 시스템 & 임베디드 개발 (Arduino)', category: 'language' },
  { name: 'Go', icon: SiGo, description: '백엔드 서비스 & CLI 도구 개발', category: 'language' },
  { name: 'Java', icon: FaJava, description: 'Android 개발', category: 'language' },
  { name: 'Python', icon: SiPython, description: 'Machine Learning, RPi', category: 'language' },
  { name: 'JavaScript', icon: SiJavascript, description: '웹 프론트엔드 & 디스코드 봇 개발', category: 'language' },
  { name: 'Dart', icon: SiDart, description: 'Flutter 앱 개발', category: 'language' },
  { name: 'React', icon: SiReact, description: '웹 개발', category: 'framework' },
  { name: 'Flutter', icon: SiFlutter, description: '크로스플랫폼 모바일 앱 개발', category: 'framework' },
  { name: 'Android', icon: SiAndroid, description: '안드로이드 네이티브 앱 개발', category: 'framework' },
  { name: 'Unity', icon: SiUnity, description: '게임 개발 & 시뮬레이션 구현', category: 'framework' },
  { name: 'PyTorch', icon: SiPytorch, description: 'Machine Learning / Deep Learning', category: 'framework' },
];

export const projects: Project[] = [
  {
    title: 'Slent',
    description: '새롭게 설계한 언어 Slent와 이를 바이트코드로 컴파일하는 Slent Compiler, 그리고 이를 실행하는 Slent VM',
    tags: ['Slent', 'C', 'C++'],
    githubUrl: 'https://github.com/airhood/Slent',
  },
  {
    title: 'Cubic Engine',
    description: 'OpenGL을 기반으로 한 C++ 3D 게임 엔진',
    tags: ['C++', 'OpenGL'],
    githubUrl: 'https://github.com/airhood/CubicEngine',
  },
  {
    title: 'Dimo',
    description: '주식/선물/옵션/대출/예적금/펀드/ETF/부동산/도박/뉴스/거래예약/자동매매/전략백테스팅 등 다양한 기능을 가진 투자 시뮬레이션 디스코드 봇',
    tags: ['Javascript', 'DiscordJS'],
    githubUrl: 'https://github.com/airhood/Dimo',
  },
];

export const awards: Award[] = [
  {
    title: 'PulloBot',
    organization: '코리아로봇챔피언십 | 팀명: PMW',
    date: '2025 ~ 2026',
    description: 'DECODE',
  },
  {
    title: '음향 주파수 분석을 활용한 배관 누수 탐지',
    organization: '코리아 주니어 워터프라이즈 / 한국물포럼',
    date: '2025',
    description: '상수도 배관 시설에서 발생할 수 있는 미세 누수를 소리 분석 AI 모델을 기반으로 감지하고 예상 누수 지점을 예측하는 누수 대응 시스템',
  },
  {
    title: '물 튐을 방지하는 정수기 코크',
    organization: '전국학생발명품경진대회',
    date: '2025',
    description: '정수기 뜨거운 물 취수 중 발생할 수 있는 물 튐으로 인한 사고를 예방하기 위한 안전 정수기 코크',
  },
  {
    title: '인체 혈관 구조를 벤치마킹하여 불규칙적인 바람에도 지속발전이 가능한 마이크로 풍력발전',
    organization: '매일경제 창의발명대회',
    date: '2023',
    description: '',
  },
  {
    title: '극지에서의 기후변화 현상이 우리나라에 미치는 영향',
    organization: '극지논술공모전',
    date: '2023',
    description: '',
  },
  {
    title: '인체 혈관 구조를 벤치마킹하여 불규칙적인 바람에도 지속발전이 가능한 마이크로 풍력발전',
    organization: '전국학생발명품경진대회',
    date: '2023',
    description: '',
  },
  {
    title: '인체 혈관 구조를 벤치마킹하여 불규칙적인 바람에도 지속발전이 가능한 마이크로 풍력발전',
    organization: '발명 아이디어 경진대회',
    date: '2023',
    description: '',
  },
  {
    title: '기후변화대응 불규칙적인 바람에도 지속적 발전 가능한 마이크로 풍력 발전기',
    organization: '발명 글짓기 경진대회',
    date: '2023',
    description: '',
  },
];

export const goals: Goal[] = [
  {
    emoji: '🤖',
    title: 'Physical AI',
    description: '로봇 제어를 위한 새로운 구조의 VLA 기반 End-to-End 모델 연구',
  },
  {
    emoji: '🔬',
    title: 'Compiler Theory',
    description: '컴파일러 이론 학습 및 자체 프로그래밍 언어 Slent, 컴파일러 개발',
  },
  {
    emoji: '🎮',
    title: 'Game Engine Dev',
    description: 'OpenGL 기반 C++ 3D 게임 엔진 CubicEngine 개발',
  },
  {
    emoji: '⚛️',
    title: 'Quantum Computing',
    description: '양자컴퓨팅을 활용한 알고리즘, 양자 머신러닝 등 기술 학습 및 연구',
  },
];
