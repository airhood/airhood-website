import { FaGithub, FaDiscord, FaTrophy, FaLink, FaJava, FaRobot, FaCode, FaGamepad, FaAtom } from 'react-icons/fa';
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
    slug: 'vla-drone',
    title: 'VLA 분산 추론 기반 재난대응 로봇팔-드론 시스템',
    organization: 'R&E',
    date: '2026',
    type: 'research',
    description: 'VLA(Vision-Language-Action) 모델을 로봇팔과 드론에 분산 추론시켜 재난 현장에서 협업 대응이 가능한 로봇팔-드론 시스템 연구',
    tags: ['VLA', 'Robotics', 'Drone', 'Distributed Inference'],
    pdf: '/reports/vla-drone.pdf',
    slides: ['/reports/vla-drone.pdf'],
    image: '/images/projects/vla-drone.jpg',
    featured: true,
    githubUrl: 'https://github.com/airhood/openvla-ivm',
  },
  {
    slug: 'cansat',
    title: 'CanSat',
    date: '2026',
    description: 'ExpressLRS와 LoRa TDMA 스케줄링을 활용해 이중화되고 지연이 짧은 원격측정 링크를 구현한 캔위성(CanSat) 플랫폼',
    tags: ['CanSat', 'ELRS', 'LoRa'],
  },
  {
    slug: 'delibot',
    title: 'Delibot',
    date: '2026',
    description: '토폴로지 맵 기반으로 경로(Trajectory)를 생성하고, 엔드투엔드(E2E) 학습 모델이 이를 직접 제어하는 실내 라스트마일 배달 로봇. STM32 기반 구동부와 BNO080 IMU·엔코더 기반 위치추정을 결합했으며 엘리베이터 연동으로 다층 배달을 지원',
    tags: ['E2E Control', 'Topology Map', 'STM32', 'Robotics'],
    githubUrl: 'https://github.com/delibot-lab',
    featured: true,
  },
  {
    slug: 'molecule-ai',
    title: '물성 기반 3D 분자 구조 예측 딥러닝 모델 개발',
    organization: '전국과학전람회',
    date: '2026',
    type: 'research',
    description: '원하는 물성을 가진 분자의 3D 구조를 생성하는 그래프 기반 분자 생성모델을 개발해 신약·신소재 후보물질 탐색 과정을 가속화',
    tags: ['Deep Learning', 'Graph Model', 'Chemistry'],
    pdf: '/reports/molecule-ai.pdf',
    highlights: [
      { value: '15년', label: '기존 신약 및 신소재 개발에 길게 걸리는 기간' },
      { value: '0.4% → 78.5%', label: '첫 Diffusion 모델에서 최종 모델까지, 무작위 분자 생성 validity' },
      { value: '1.3 → 0.2', label: 'guidance를 0에서 2로 높였을 때 생성물 LUMO 오차' },
    ],
    sections: [
      {
        title: '연구 동기',
        body: [
          '기존 신약 및 신소재 개발 과정은 수많은 후보 화합물을 무작위 탐색하는 방식으로 합성하고 측정하기 때문에 길게는 15년 정도로 긴 시간이 걸립니다.',
          '현재 활발히 연구되고 있는 딥러닝 기반 분자 특성 예측 모델들은 완성된 분자 구조로부터 물성을 추적하는 순방향 탐색에 집중되어 있습니다. 이에 목표로 하는 물성을 바탕으로 최적의 분자 구조를 설계하는 모델이 필요하다고 느꼈습니다.',
        ],
      },
      {
        title: '데이터 전처리',
        body: [
          'QMugs 데이터셋에서 HOMO 에너지, LUMO 에너지, HOMO-LUMO 갭, 전체 에너지, 쌍극자 모멘트에 대한 물성 데이터를 추출했습니다. 서로 다른 단위나 범위를 가진 데이터는 z-score로 정규화하고, 분자를 그래프 형태로 만들어 학습에 사용했습니다.',
        ],
      },
      {
        title: '1차 모델: MoleculeCVAE',
        body: [
          'GINEConv 기반 인코더와 Transformer 기반 디코더를 결합한 MoleculeCVAE를 구현했습니다. 학습 중 잠재 공간 붕괴를 막기 위해 beta warm-up, cyclical cosine annealing, Free Bits KL을 적용했고, 잠재 정보가 디코더에서 희석되는 문제를 줄이기 위해 AdaLN을 도입했습니다.',
          '하지만 학습 결과 reconstruction loss는 수렴했는데도 validity는 개선되지 않았습니다. 원인은 모델 구조에 있었습니다. 인코더의 global_mean_pool이 분자 전체를 하나의 잠재 벡터로 압축하면서 원자 쌍 결합의 위치 정보가 사라졌고, BCE 기반 결합 예측은 각 원자 쌍을 독립적으로 취급해 화학적 원자가 제약을 손실에 반영하지 못했습니다. 이 문제는 손실 함수나 하이퍼파라미터 조정으로는 해결하기 어렵다고 판단해 Diffusion 모델로 전환했습니다.',
        ],
      },
      {
        title: '2차 모델: Discrete Graph Diffusion',
        body: [
          '1차 모델의 단점을 보완하기 위해 Discrete Graph Diffusion을 설계했습니다. 생성되는 분자의 수소는 후처리로 복원하도록 바꾸고 diffusion step을 줄였으며, Absorbing 방식과 데이터의 실제 분포를 반영하는 Marginal transition 방식을 비교했습니다.',
          '소분자 실험에서는 원자보다 결합 예측이 더 중요하다는 것을 확인했습니다. 원자 간 곱 상호작용을 추가해 validity를 20.8%에서 54.2%로 높였고, 최종 모델의 무작위 분자 생성 validity는 78.5%입니다.',
        ],
      },
      {
        title: '결과',
        body: [
          '분자의 물성 조건과 원자 조성 정보를 바탕으로 원하는 분자 구조를 생성하는 딥러닝 모델을 설계하고 구현했습니다. 기존 모델이 이미 존재하는 분자의 특성을 분석하는 데 집중했다면, 이 연구는 목표 물성을 만족하는 새로운 분자 구조를 역으로 생성하는 방향을 제시했다는 점에 의의가 있습니다.',
          '물성을 조건으로 준 생성에서도 큰 구조적 유효성 저하 없이 조건부 생성에 성공했습니다.',
        ],
      },
    ],
    poster: {
      image: '/images/projects/molecule-ai-poster.jpg',
      pdf: '/reports/molecule-ai-poster.pdf',
    },
    liveUrl: 'https://molecule-ai-viewer.vercel.app/',
    demo: {
      title: 'Molecule-AI Inference Viewer',
      description: '목표 LUMO와 HOMO, guidance 세기를 입력하면 조건에 맞는 분자를 생성하고, 3D 구조와 전자구름을 확인하며 목표값·GNN 추정값·DFT 계산값을 비교해 볼 수 있습니다.',
      image: '/images/projects/molecule-ai-viewer.jpg',
      url: 'https://molecule-ai-viewer.vercel.app/',
    },
    image: '/images/projects/molecule-ai.jpg',
    featured: true,
    githubUrl: 'https://github.com/airhood/molecule-ai',
  },
  {
    slug: 'ai-content-detection-survey',
    title: '사람들은 AI 콘텐츠를 구별할 수 있을까?',
    organization: '학생통계활용대회',
    date: '2026',
    description: 'AI가 만든 콘텐츠와 실제 콘텐츠를 사람들이 구별할 수 있는지 설문 조사를 진행하고, 그 결과를 통계적으로 분석하는 탐구',
    tags: ['Statistics', 'AI', 'Survey'],
    pdf: '/reports/ai-content-detection-survey.pdf',
    image: '/images/projects/ai-content-detection-survey.jpg',
    poster: {
      image: '/images/projects/ai-content-detection-survey-poster.jpg',
      pdf: '/reports/ai-content-detection-survey.pdf',
    },
  },
  {
    slug: 'quoridor-ai',
    title: 'Quoridor AI',
    date: '2026',
    type: 'research',
    description: '쿼리도를 완전정보·결정론적·순차적 제로섬 게임으로 분석하고, MCTS(Monte Carlo Tree Search) 기반 탐색 알고리즘을 설계·개선해 게임 AI를 구현하는 탐구',
    tags: ['Game AI', 'MCTS', 'Algorithm'],
    code: { name: 'quoridor_ai.py', language: 'python', src: '/code/quoridor_ai.py' },
    pdf: '/reports/quoridor-ai.pdf',
  },
  {
    slug: 'van-der-waals-equation',
    title: '반데르발스 상수 a, b의 함수화를 통한 상태방정식 개선과 분자간 상호작용의 관계',
    date: '2026',
    type: 'research',
    description: '반데르발스 방정식이 어떤 압력 조건에서 유효한지 분석하고, 오차의 원인이 a항과 b항 중 어디에 있는지 규명해 오차를 줄인 새로운 기체 상태방정식을 제안하는 탐구',
    tags: ['Chemistry', 'Physical Chemistry'],
    pdf: '/reports/van-der-waals-equation.pdf',
  },
  {
    slug: 'harris-corner-detection',
    title: '벡터 미분 기반 해리스 코너 감지 알고리즘',
    date: '2026',
    type: 'research',
    description: '그레이스케일 변환 과정에서 발생하는 색 정보 손실을 막기 위해 RGB 이미지를 벡터장으로 모델링하고, 벡터 미분을 활용해 해리스 코너 감지 알고리즘을 컬러 이미지로 확장하는 탐구',
    tags: ['Computer Vision', 'Mathematics', 'Image Processing'],
    pdf: '/reports/harris-corner-detection.pdf',
  },
  {
    slug: 'time-series-self-independence',
    title: '조건부 확률 분포를 통한 시계열 데이터에서의 자기독립성 분석',
    date: '2026',
    type: 'research',
    description: '조건부 확률과 상호정보량을 이용해 시계열 데이터의 사건들이 시간적으로 얼마나 독립적인지를 분석하고, 예측 가능성을 통계적 관점에서 규명하는 탐구',
    tags: ['Mathematics', 'Probability', 'Time Series'],
    pdf: '/reports/time-series-self-independence.pdf',
  },
  {
    slug: 'isomer-stability-algorithm',
    title: '구조 이성질체 탐색 및 안정성 평가 알고리즘 개발',
    date: '2025',
    type: 'research',
    description: '그래프 이론과 밀도범함수 이론(DFT) 양자화학 계산을 결합해, 주어진 분자식으로부터 가능한 모든 구조 이성질체를 체계적으로 생성하고 안정성을 정량적으로 평가하는 알고리즘 개발',
    tags: ['Chemistry', 'Graph Theory', 'DFT'],
    code: { name: 'SISA.py', language: 'python', src: '/code/sisa.py' },
    pdf: '/reports/isomer-stability-algorithm.pdf',
  },
  {
    slug: 'ambulance-routing-optimization',
    title: '병원 및 환자의 상태를 고려한 구급차 경로 최적화',
    organization: 'R&E',
    date: '2025',
    type: 'research',
    description: '병원 수용 거부와 이송 지연 문제를 해결하기 위해, 환자의 중증도·병원 가용성·거리를 함께 고려한 스케줄링 알고리즘으로 구급차 경로와 이송 병원을 최적화하는 연구',
    tags: ['Optimization', 'Scheduling', 'Healthcare'],
    pdf: ['/reports/ambulance-routing-report.pdf', '/reports/ambulance-routing-optimization.pdf'],
    slides: ['/reports/ambulance-routing-optimization.pdf'],
  },
  {
    slug: 'el-nino-la-nina-prediction',
    title: '다변수 모델을 통한 엘니뇨 라니냐 예측',
    date: '2025',
    type: 'research',
    description: 'ONI, MEI 등 다변량 기후 지표를 활용해 LSTM·Attention 기반 시계열 모델로 엘니뇨·라니냐 발생을 예측하는 탐구',
    tags: ['Deep Learning', 'LSTM', 'Climate', 'Time Series'],
    pdf: '/reports/el-nino-la-nina-prediction.pdf',
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
    tags: ['Invention', 'Fluid Dynamics', '3D Printing', 'Simulation'],
    image: '/images/projects/water-purifier-cock.jpg',
    poster: {
      image: '/images/projects/water-purifier-cock-poster.jpg',
      pdf: '/reports/water-purifier-cock-poster.pdf',
    },
    highlights: [
      { value: '100℃', label: '끓인 물이 나오는 정수기, 어린이에게 특히 위험한 온수 취수' },
      { value: '12 → 1', label: '12mL/sec에서 튄 물방울 수 (코크 없음 → 구멍 4개 코크)' },
      { value: '15 → 2', label: '24mL/sec에서 튄 물방울 수 (코크 없음 → 구멍 8개 코크)' },
    ],
    sections: [
      {
        title: '제작 동기 및 목적',
        body: [
          '정수기를 쓰다 보면 물이 많이 튑니다. 끓인 물이 나오는 정수기의 온수 취수는 어린이에게 특히 위험합니다.',
          '그래서 정수기에 코크를 달아 물 튐을 방지하고자 했습니다. 경사면으로 정수기에서 떨어지는 물의 초기 유량을 조절해 물 튐을 막는 정수기 코크이고, 정수기 내부 구조를 바꾸지 않고 출수구에 장착하는 것만으로 사용할 수 있습니다.',
        ],
      },
      {
        title: '물 튐 현상 분석',
        body: [
          '물이 튀는 것은 크라운 스플래시 현상 때문입니다. 영향 요인은 물의 밀도, 속도, 부피입니다. 밀도는 조작할 수 없고, 속도는 낙하 높이에 따라 달라져서 조작하기 어렵습니다. 반면 부피는 코크를 통해 조작할 수 있습니다.',
        ],
      },
      {
        title: '1차 작품',
        body: [
          '코크 구멍 개수에 따라 튄 물방울 수를 실험했습니다. 코크가 없을 때는 12mL/sec에서 12개, 24mL/sec에서 15개가 튀었습니다. 코크를 달면 12mL/sec에서는 구멍이 4개일 때 1개, 24mL/sec에서는 구멍이 8개일 때 2개까지 줄었습니다.',
          '다만 정수기의 유량에 따라 최적의 구멍 개수가 달라서, 정수기마다 필요한 구멍 개수가 다르다는 한계가 있었습니다.',
        ],
      },
      {
        title: '2차 작품',
        body: [
          '댐 구조를 적용해 유량을 조절했습니다. 댐에 작은 구멍을 배치해 취수를 중단할 때 유량을 조절하는 방식입니다.',
          '하지만 물이 댐 바닥에 고여서 위생 문제가 생겼습니다.',
        ],
      },
      {
        title: '3차 작품',
        body: [
          '경사면을 이용한 유량 조절 시스템입니다. 취수를 시작하면 경사면 때문에 일시적으로 작은 물줄기가 만들어지고, 취수 중에는 원래 물줄기와 같은 크기의 물줄기가 나옵니다. 취수를 중단하면 모여 있던 물이 일시적으로 작은 물줄기로 빠져나갑니다.',
        ],
      },
      {
        title: '연구 결과',
        body: [
          '코크를 장착하지 않았을 때는 튄 물방울 자국이 여러 개 남았지만, 코크를 장착하면 자국이 남지 않았습니다.',
        ],
      },
      {
        title: '효과 및 전망',
        body: [
          '안전성: 뜨거운 물이 튀어서 생기는 어린이들의 사고 위험이 줄어듭니다.',
          '경제성: 센서나 모터 등을 쓰는 방식과 달리 물리적 구조를 이용하므로 경제적입니다.',
          '창의성: 코크 내부에 창의적인 기하학 구조를 적용한 아이디어 모델입니다.',
        ],
      },
    ],
    videos: [
      {
        src: '/videos/water-purifier-cock/no-cock.mp4',
        poster: '/videos/water-purifier-cock/no-cock.jpg',
        caption: '코크 없음 — 물줄기가 떨어지며 물이 튀는 모습',
      },
      {
        src: '/videos/water-purifier-cock/simulation.mp4',
        poster: '/videos/water-purifier-cock/simulation.jpg',
        caption: '시뮬레이션 — 경사면을 따라 물이 흐르는 모습',
      },
    ],
    gallery: [
      { src: '/images/water-purifier-cock/first-drop-fixed.jpg', caption: '첫 방울 — 크라운 스플래시의 원인', aspect: 1.276, row: 0 },
      { src: '/images/water-purifier-cock/analysis.jpg', caption: '물 튐 분석 — 크라운 스플래시', aspect: 0.907, row: 0 },
      { src: '/images/water-purifier-cock/design-1.jpg', caption: '1차 작품 설계도', aspect: 1.328, row: 1 },
      { src: '/images/water-purifier-cock/proto-7-bottom.jpg', caption: '프로토타입 7 바닥면', aspect: 1.192, row: 1 },
      { src: '/images/water-purifier-cock/section.jpg', caption: '스플래시제로 프로 단면도', aspect: 1.155, row: 2 },
      { src: '/images/water-purifier-cock/proto-13a-section.jpg', caption: '프로토타입 13 (A) 단면 — 빗면 1개', aspect: 0.683, row: 2 },
      { src: '/images/water-purifier-cock/proto-13g.jpg', caption: '프로토타입 13 (G) 내부 구조 — 빗면 2개', aspect: 0.483, row: 2 },
    ],
  },
  {
    slug: 'nash-equilibrium-seat-simulation',
    title: '혼합 내쉬 균형 탐색과 최적화',
    date: '2025',
    type: 'research',
    description: '학교 자습 좌석 신청 문제를 게임이론으로 모델링해, 좌석 선호도와 주변 밀집도를 효용에 반영한 혼합 전략의 내쉬 균형을 탐색·시뮬레이션하는 탐구',
    tags: ['Game Theory', 'Mathematics', 'Simulation'],
    pdf: '/reports/nash-equilibrium-seat-simulation.pdf',
  },
  {
    slug: 'slent',
    title: 'Slent',
    date: '2024',
    description: '새롭게 설계한 언어 Slent와 이를 바이트코드로 컴파일하는 Slent Compiler, 그리고 이를 실행하는 Slent VM',
    tags: ['Slent', 'C', 'C++'],
    githubUrl: 'https://github.com/airhood/Slent',
  },
  {
    slug: 'cubic-engine',
    title: 'Cubic Engine',
    date: '2024 ~ 2025',
    description: 'OpenGL을 기반으로 한 C++ 3D 게임 엔진',
    tags: ['C++', 'OpenGL'],
    githubUrl: 'https://github.com/airhood/CubicEngine',
  },
  {
    slug: 'dimo',
    title: 'Dimo',
    date: '2025',
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
    icon: FaRobot,
    title: 'Physical AI',
    description: '로봇 제어를 위한 새로운 구조의 VLA 기반 End-to-End 모델 연구',
  },
  {
    icon: FaCode,
    title: 'Compiler Theory',
    description: '컴파일러 이론 학습 및 자체 프로그래밍 언어 Slent, 컴파일러 개발',
  },
  {
    icon: FaGamepad,
    title: 'Game Engine Dev',
    description: 'OpenGL 기반 C++ 3D 게임 엔진 CubicEngine 개발',
  },
  {
    icon: FaAtom,
    title: 'Quantum Computing',
    description: '양자컴퓨팅을 활용한 알고리즘, 양자 머신러닝 등 기술 학습 및 연구',
  },
];
