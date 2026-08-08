import { FaGithub, FaDiscord, FaTrophy, FaLink, FaJava } from 'react-icons/fa';
import { SiTistory, SiCsharp, SiJavascript, SiPython, SiAndroid, SiC, SiCplusplus, SiGo, SiUnity, SiReact, SiDart, SiFlutter, SiPytorch } from 'react-icons/si';
import { SocialLink, Interest, TechStack, Project, Goal } from '../types';

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

// Projects + Studies 통합 — 소프트웨어 프로젝트와 대회/연구 출품작을 하나로 관리
export const projects: Project[] = [
  {
    slug: 'vla-disaster-response',
    title: 'VLA 분산 추론 기반 재난대응 로봇팔-드론 시스템',
    organization: 'R&E',
    date: '2026',
    type: 'research',
    description: 'VLA(Vision-Language-Action) 모델을 로봇팔과 드론에 분산 추론시켜 재난 현장에서 협업 대응이 가능한 로봇팔-드론 시스템 연구',
    tags: ['VLA', 'Robotics', 'Drone', 'Distributed Inference'],
    pdf: '/reports/vla-disaster-response.pdf',
  },
  {
    slug: 'molecule-structure-prediction',
    title: '물성 기반 3D 분자 구조 예측 딥러닝 모델 개발',
    organization: '전국과학전람회',
    date: '2026',
    description: '원하는 물성을 가진 분자의 3D 구조를 생성하는 그래프 기반 생성모델(CVAE, Diffusion)을 개발해 신약·신소재 후보물질 탐색 과정을 가속화',
    tags: ['Deep Learning', 'Graph Model', 'Chemistry'],
    pdf: '/reports/molecule-structure-prediction.pdf',
  },
  {
    slug: 'pullobot',
    title: 'PulloBot',
    organization: '코리아로봇챔피언십 | 팀명: PMW',
    date: '2025 ~ 2026',
    description: 'DECODE',
    tags: ['Robotics', 'Competition'],
    pdf: '/reports/pullobot.pdf',
  },
  {
    slug: 'delibot',
    title: 'Delibot',
    description: 'STM32(LL/HAL 혼합)와 라즈베리파이 기반의 실내 라스트마일 배달 로봇. BNO080 IMU와 엔코더 기반 위치추정을 활용하며 엘리베이터 연동으로 다층 배달을 지원',
    tags: ['STM32', 'Raspberry Pi', 'Robotics'],
    githubUrl: 'https://github.com/delibot-lab',
  },
  {
    slug: 'cansat',
    title: 'CanSat',
    description: 'ExpressLRS와 LoRa TDMA 스케줄링을 활용해 이중화되고 지연이 짧은 원격측정 링크를 구현한 캔위성(CanSat) 플랫폼',
    tags: ['CanSat', 'ELRS', 'LoRa'],
  },
  {
    slug: 'water-leak-detection',
    title: '음향 주파수 분석을 활용한 배관 누수 탐지',
    organization: '코리아 주니어 워터프라이즈 / 한국물포럼',
    date: '2025',
    description: '상수도 배관 시설에서 발생할 수 있는 미세 누수를 소리 분석 AI 모델을 기반으로 감지하고 예상 누수 지점을 예측하는 누수 대응 시스템',
    tags: ['AI', 'Signal Processing'],
    pdf: '/reports/water-leak-detection.pdf',
  },
  {
    slug: 'water-purifier-cock',
    title: '물 튐을 방지하는 정수기 코크',
    organization: '전국학생발명품경진대회',
    date: '2025',
    description: '정수기 뜨거운 물 취수 중 발생할 수 있는 물 튐으로 인한 사고를 예방하기 위한 안전 정수기 코크',
    tags: ['Invention'],
  },
  {
    slug: 'slent',
    title: 'Slent',
    description: '새롭게 설계한 언어 Slent와 이를 바이트코드로 컴파일하는 Slent Compiler, 그리고 이를 실행하는 Slent VM',
    tags: ['Slent', 'C', 'C++'],
    githubUrl: 'https://github.com/airhood/Slent',
  },
  {
    slug: 'cubic-engine',
    title: 'Cubic Engine',
    description: 'OpenGL을 기반으로 한 C++ 3D 게임 엔진',
    tags: ['C++', 'OpenGL'],
    githubUrl: 'https://github.com/airhood/CubicEngine',
  },
  {
    slug: 'dimo',
    title: 'Dimo',
    description: '주식/선물/옵션/대출/예적금/펀드/ETF/부동산/도박/뉴스/거래예약/자동매매/전략백테스팅 등 다양한 기능을 가진 투자 시뮬레이션 디스코드 봇',
    tags: ['Javascript', 'DiscordJS'],
    githubUrl: 'https://github.com/airhood/Dimo',
  },
  {
    slug: 'wind-turbine-maekyung',
    title: '인체 혈관 구조를 벤치마킹하여 불규칙적인 바람에도 지속발전이 가능한 마이크로 풍력발전',
    organization: '매일경제 창의발명대회',
    date: '2023',
    description: '',
    tags: ['Invention'],
  },
  {
    slug: 'polar-climate-essay',
    title: '극지에서의 기후변화 현상이 우리나라에 미치는 영향',
    organization: '극지논술공모전',
    date: '2023',
    description: '',
    tags: ['Essay'],
  },
  {
    slug: 'wind-turbine-invention-fair',
    title: '인체 혈관 구조를 벤치마킹하여 불규칙적인 바람에도 지속발전이 가능한 마이크로 풍력발전',
    organization: '전국학생발명품경진대회',
    date: '2023',
    description: '',
    tags: ['Invention'],
  },
  {
    slug: 'wind-turbine-idea-contest',
    title: '인체 혈관 구조를 벤치마킹하여 불규칙적인 바람에도 지속발전이 가능한 마이크로 풍력발전',
    organization: '발명 아이디어 경진대회',
    date: '2023',
    description: '',
    tags: ['Invention'],
  },
  {
    slug: 'wind-turbine-writing-contest',
    title: '기후변화대응 불규칙적인 바람에도 지속적 발전 가능한 마이크로 풍력 발전기',
    organization: '발명 글짓기 경진대회',
    date: '2023',
    description: '',
    tags: ['Essay'],
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
