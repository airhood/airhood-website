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
  { name: 'ML' },
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
    blogUrl: 'https://delibot-lab.vercel.app/blog',
    image: '/images/projects/delibot.png',
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
    slug: 'shade-ball-system',
    title: '표면적 제어형 군집 셰이드볼 시스템 구현 및 수질 변화 탐구',
    organization: '제3회 융합탐구 321체',
    date: '2026',
    type: 'research',
    description: '셰이드볼의 피복률을 능동적으로 조절해 저수지 환경 변화에 유연하게 대응하는 시스템을 구상하고, 증발 억제와 용존산소 유지 사이의 상충관계를 시뮬레이션으로 분석',
    tags: ['Water Management', 'Simulation', 'Control', '3D Printing'],
    image: '/images/projects/shade-ball-system.jpg',
    pdf: '/reports/shade-ball-system.pdf',
    poster: {
      image: '/images/projects/shade-ball-system-poster.jpg',
      pdf: '/reports/shade-ball-system-poster.pdf',
    },
    highlights: [
      { value: '27.17 → 11.88', label: '5일 날씨 시나리오의 누적 증발량 (mm, 무피복 → 24h 예측 제어)' },
      { value: '89.3% → 66.3%', label: '머더볼을 내려서 연속적으로 조절한 피복률' },
      { value: 'DO 6 mg/L 이상', label: '모든 비교군에서 유지된 용존산소' },
    ],
    sections: [
      {
        title: '탐구 동기',
        body: [
          '저수지나 수조와 같은 개방된 수면에서는 햇빛과 높은 기온 등의 영향으로 물의 증발이 지속적으로 발생합니다. 이러한 수분 손실을 줄이기 위해 수면 위에 셰이드볼(Shade Ball)을 띄웁니다. 셰이드볼은 수면 일부를 물리적으로 덮어 태양 복사에너지를 줄이고 물과 대기의 직접적인 접촉을 줄여 수분 증발을 억제하며, 수중으로 유입되는 빛의 양을 줄여 조류의 성장도 억제합니다.',
          '그러나 수면을 높은 비율로 덮는 것이 항상 긍정적인 효과만을 가져오는 것은 아닙니다. 수면은 대기 중 산소와 물 사이에서 기체 교환이 이루어지는 경계면이라, 셰이드볼이 수면을 넓게 덮으면 산소 교환이 제한되어 용존산소(Dissolved Oxygen, DO)가 감소할 가능성이 있습니다.',
          '그래서 수분 증발 억제와 수질 유지 사이의 상충관계를 고려해, 상황에 맞게 피복 면적을 조절할 필요가 있다고 판단했습니다.',
        ],
      },
      {
        title: '교과융합 주안점',
        body: [
          '물리: 셰이드볼의 부력·로프 장력 힘 평형을 분석하고, 현수선 방정식으로 그릇 형상 설계식을 도출해 시뮬레이션 결과를 이론값과 대조해 검증합니다.',
          '화학: 용존산소 변화를 재폭기·광합성·호흡의 반응식으로 구성하고 조류 생체량을 로지스틱 성장방정식으로 재구성해, 피복률과 수질 사이의 상충관계를 정량적으로 분석합니다.',
          '정보: 저수지 상태를 실시간 판단해 개방률을 결정하는 3단계 층 제어 시스템과 feedforward 제어를 구현해, 물리·화학 모델을 실제 제어 로직으로 전환합니다.',
          '공학: 셰이드볼·마더볼·수조 및 가이드 통로를 3D 모델링·제작하고 구동부를 외부 도르래 방식으로 설계해 셰이드볼 실험 환경을 구축합니다.',
        ],
      },
      {
        title: '이론적 배경',
        body: [
          '부력-장력 연동: 물에 잠긴 구의 부력은 잠긴 구면 캡의 부피에 비례하며, 로프 장력이 커질수록 셰이드볼의 침수 깊이가 변합니다.',
          '현수선과 그릇 형상: 완만한 처짐에서는 현수선이 포물선 형태로 근사되며, 이를 로프 길이 설계와 침강 깊이 곡면에 적용합니다.',
          '다체 접촉 구속조건: 수십 개의 볼이 밀집된 군집에서는 개별 힘 평형뿐 아니라 볼-볼 접촉과 로프 길이 구속을 함께 해석해야 합니다.',
        ],
      },
      {
        title: '구조물 설계 및 제작',
        body: [
          '셰이드볼, 고리형 셰이드볼, 마더볼, 수조 및 연결선 가이드 통로를 3D 모델링하여 출력했고, 구동부를 수조 외부로 옮겨 실로 셰이드볼을 당기는 방식으로 조작을 구현했습니다.',
          '모든 구조물을 조립한 뒤 실을 당기고 풀었을 때 셰이드볼이 실제로 하강·상승하는지 직접 확인했습니다.',
        ],
      },
      {
        title: '피복 시뮬레이션',
        body: [
          '마더볼의 부력을 제어해 셰이드볼 군집의 수면 개방 면적을 조절할 수 있는가를 확인했습니다. 마더볼을 하강시켜 볼을 잠기게 하는 방식으로 피복률을 89.3%에서 66.3%까지 연속적으로 조절할 수 있었고, 개방 시 오목한 곡선 분포를 가짐을 확인했습니다.',
          '강체 물리 엔진 기반 정밀 시뮬레이션에서는 인위적인 감쇠 없이도 그릇 형상 추종 오차가 평균 1.95mm에 그쳐 설계식이 물리적으로 타당함을 확인했습니다.',
        ],
      },
      {
        title: '피복률 제어기',
        body: [
          'Layer 1 - 예측 계획(MPC): 24시간 예보를 6시간마다 재계획합니다.',
          'Layer 2 - 피드백 트림(PI): 실측값과 예측값의 오차를 보정합니다.',
          'Layer 3 - 안전장치: DO가 위험수준에 도달하면 수면을 최대로 개방합니다.',
        ],
      },
      {
        title: '비교 시뮬레이션',
        body: [
          '모든 비교군에서 최대 수온 25.45℃ 이하, DO 6 mg/L 이상이 유지됐습니다. 24h 예측 제어는 무피복·고정 피복 대비 증발·조류 억제 성능과 DO 안전 여유를 확보했고, 규칙 기반 제어 대비 불필요한 구동을 줄였습니다.',
          '용존산소 위험 신호에 대응해 제어기가 실제로 피복률을 조정하는 폐루프가 의도한 대로 작동했고, 용존산소는 안전 범위 내에서 유지됐습니다.',
        ],
      },
      {
        title: '결론 및 기대효과',
        body: [
          '셰이드볼의 피복률을 능동적으로 조절해 저수지 환경 변화에 유연하게 대응할 수 있는 가능성을 확인했습니다.',
          '기대 효과: 증발 물 손실 감소, 수질 관리에 활용, 스마트 저수지 관리 시스템.',
        ],
      },
    ],
    gallery: [
      { src: '/images/shade-ball-system/tank.jpg', caption: '수조', aspect: 1.776, row: 0 },
      { src: '/images/shade-ball-system/balls.jpg', caption: '셰이드볼 연결 구조', aspect: 0.563, row: 0 },
    ],
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
    image: '/images/projects/quoridor-ai.png',
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
    pdf: ['/reports/ambulance-routing-optimization.pdf', '/reports/ambulance-routing-report.pdf'],
    slides: ['/reports/ambulance-routing-optimization.pdf'],
    image: '/images/projects/ambulance-routing-optimization.jpg',
  },
  {
    slug: 'el-nino-la-nina-prediction',
    title: '다변수 모델을 통한 엘니뇨 라니냐 예측',
    date: '2025',
    type: 'research',
    description: 'ONI, MEI 등 다변량 기후 지표를 활용해 LSTM·Attention 기반 시계열 모델로 엘니뇨·라니냐 발생을 예측하는 탐구',
    tags: ['Deep Learning', 'LSTM', 'Climate', 'Time Series'],
    image: '/images/projects/el-nino-la-nina-prediction.jpg',
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
    image: '/images/projects/water-leak-detection.png',
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
    slug: 'dimo',
    title: 'Dimo',
    date: '2025',
    description: '주식/선물/옵션/대출/예적금/펀드/ETF/부동산/도박/뉴스/거래예약/자동매매/전략백테스팅 등 다양한 기능을 가진 투자 시뮬레이션 디스코드 봇',
    tags: ['Javascript', 'DiscordJS'],
    githubUrl: 'https://github.com/airhood/Dimo',
    image: '/images/projects/dimo.png',
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
    slug: 'slent',
    title: 'Slent',
    date: '2024',
    description: '새롭게 설계한 언어 Slent와 이를 바이트코드로 컴파일하는 Slent Compiler, 그리고 이를 실행하는 Slent VM',
    tags: ['Slent', 'C', 'C++'],
    githubUrl: 'https://github.com/airhood/Slent',
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
    poster: { image: '/images/polar-climate-essay/poster.jpg', pdf: '/images/polar-climate-essay/poster.jpg' },
    essay: [
      "수많은 뉴스와 연구 자료를 통해 누구나 지구 온난화가 급속히 진행되고 있고, 극지의 기후변화는 심각하다는 사실을 알고 있을 것이다. 연구 보고서에 따르면 2011~2020년에 1850~1900년보다 지구 표면 온도가 1.1도 상승했다. 사람들은 기후변화를 다루는 영화를 보고 그저 재미를 느낄 뿐, 기후변화가 실제로 일어날 것이라고 생각하지 않거나, 자신이 사는 지역까지는 영향을 미치지 못한다고 생각하고, 남의 일처럼 여긴다. 또한, 사람들은 나 하나쯤은 괜찮다고 생각하고, 이 정도는 넘어가도 된다고 생각하며 자기합리화를 한다. 이처럼, 사람들은 극지의 기후변화를 심각하게 생각하고 있지 않다. 하지만, 극지의 기후변화는 한반도에 매우 큰 영향을 미친다.",
      "극지는 눈과 얼음으로 뒤덮여있다. 그런데 최근에 기후변화로 인해 그 눈과 얼음이 녹고 있다. 내린 지 얼마 되지 않은 눈은 태양 복사에너지의 80% 이상을 반사하게 된다. 하지만, 눈과 얼음이 녹게 되면 태양 복사에너지의 반사율이 10% 정도밖에 되지 않아서, 흡수하는 에너지의 양이 20%에서 90%로 약 4.5배 증가한다. 만약 태양 복사에너지를 반사하지 못하고 흡수하면 지구의 온도가 올라가고, 그로 인해 더 많은 눈과 얼음이 녹아서 더 많은 에너지를 흡수하고, 지구의 온도가 더 올라가는 빠져나올 수 없는 무한의 굴레에 빠지게 된다. 2020년 영국 남극조사소 연구팀에 따르면, 북극권 해빙은 2035 ~ 2086년 사이에 모두 녹아 사라질 것이라고 발표했고, 또한 2020년 10월에 관측한 결과, 북극 빙하의 면적은 730만㎢로, 2019년 대비 17%나 사라졌다고 발표했다. 이는 극지의 빙하가 얼마 지나지 않아 다 녹게 될 것이라고 암시해주고 있다.",
      "극지의 기후변화는 지구의 해수면을 상승시킨다. 극지의 빙하가 녹으면, 빙하가 녹아서 생긴 물이 바닷물과 섞어서 해수면을 상승시키는 것이다. 인공위성 영상 분석을 통해 나타난 극지역 빙하의 변화 추세를 보면 2010년까지 해수면이 0.5m에서 1m까지 상승하게 되고, 만약 빙하가 모두 녹게 된다면 바다의 수위가 약 66m 상승하게 된다. 즉, 극지역의 빙하가 전부 녹게 되면 서울시 대부분은 물에 잠겨 사라지게 된다는 것이다. 온실가스 배출량이 일정하게 유지된다고 가정했을 때, 2030년에는 국토의 5% 이상이 물에 잠기게 되고, 인천공항이나, 김포공항 등, 중요 시설들이 침수될 수도 있다. 또한 해수면이 상승하면 바닷물의 온도가 상승하면서 태풍이나 홍수 피해가 증가하게 될 것이다.",
      "사람들은 극지의 기후변화는 자신이 사는 지역과 관련이 없다고 생각하고 관심을 가지지 않는다. 하지만 극지의 온난화는 북극 지역뿐만 아니라, 중위도 지역에도 영향을 미친다. 한반도 1월 평균 기온은 계속해서 상승하고 있다. 2020년 1월 7일 중낮 기온이 제주에서는 23도까지 올랐다. 이는 97년 만에 1월 최고온도를 기록한 셈이다. 1월이 겨울인 것을 생각하면, 매우 높은 온도이다.",
      "사실 기후는 지구가 생겨나고 나서 현재까지 끊임없이 변화해 왔기 때문에 엄청 생소한 현상은 아니다. 하지만 문제는 산업혁명 이후로 인류가 화석연료를 사용하기 시작하면서 기후변화의 속도가 급격하게 증가하기 시작했다는 것이다. 더욱 걱정되는 이유는 인류가 화석연료를 사용하면서 기후에 이렇게 큰 간섭을 하기 전까지는 자연적으로 이렇게 빠르게 기후가 변화한 적이 없었다는 점이다. 기후변화가 너무 빠르게 진행되면 대기, 해양, 식물, 생물들 간의 변화속도가 달라서 해수면 상승과 같은 피해가 계속 이루어지게 되고, 많은 종의 생물들이 적응하지 못하고 멸종해버리게 된다. 실제로 기후변화로 인해 우리나라에 사는 붉은점모시나비, 물장군, 사향노루 등 현재 많은 종이 멸종 위기종에 처하게 되었다.",
      "지구의 온도가 몇도 올라봤자 별 영향이 없으리라 생각하기 쉽지만, 사실은 그렇지 않다. 환경부에 따르면, 지구가 1도 오르면, 가뭄이 지속되고, 물 부족 인구가 5천만 명으로 늘어나게 되며, 10%의 육상생물이 멸종 위기에 처한다. 또한 기후변화로 인해서 30만 명이 사망하게 된다. 여기에서 지구의 온도가 더 올라서 2도가 오르게 되면 사용 가능한 물이 20~30% 감소하게 되고, 해빙으로 해수면이 7m나 상승하게 된다. 거의 절반의 북극 생물이 멸종 위기에 처하게 되고, 4천만 명에서 6천만 명의 사람들이 말라리아에 노출되게 된다. 가뭄이 지속되고, 기후변화에 적응하지 못한 희귀 동식물들이 멸종하게 된다. 지구의 온도가 3도 오르면 아마존 열대우림이 파괴대고, 대지가 불에 타며, 식량 생산도 어려워지게 된다. 지구의 온도가 4도 오르면, 남극의 빙하는 붕괴하고, 지중해는 폭염과 가뭄을 겪게 되고, 러시아와 동유럽에는 눈이 더 이상 내리지 않게 된다. 지구의 온도가 5도 오르면, 재난이 잦아지면서, 거주가 가능한 지역으로 피난민들이 몰리게 되고, 그로 인한 갈등이 생기며, 핵무기가 동원된 전쟁이 발생하게 된다. 지구의 온도가 6도 오르면, 저온 고압 상태에서 물과 결합해서 형성된 고체 에너지원으로 불타는 얼음이라고도 불리는 메탄하이드레이트가 대량 분출되며, 모든 생물체의 멸종이 시작하게 된다. 이처럼, 작게 느껴졌던 지구의 온도 변화가, 생물체의 대멸종을 불러올 수도 있다. 현재 지구는 1.9도 상승했고 지금도 지구의 온도가 조금씩 올라가고 있지만, 사람들은 자기 일이 아닌 듯 별로 신경을 쓰지 않는다.",
      "우리는 이 기후변화를 어떻게 대처할 수 있을까? 이에는 여러 혁신적인 방법들이 있다. 먼저 파도의 에너지를 이용하는 방법이 있다. 우리가 지열 발전소를 세우고, 풍력 발전기를 설치하고, 태양 에너지 패널을 설치해서 전기 에너지를 얻는다면, 기후변화와 지구 온난화를 가속하는 화석연료의 사용 비율을 줄일 수 있을 것이다. 이는 파도의 수직, 수평 움직임을 측정해서 바다의 에너지를, 지구의 바람을 에너지를, 지구의 열에너지를, 태양 에너지를 이용해서 전기를 만드는 것이다. 지구에는 우리가 공짜로 얻을 수 있는 에너지가 널려 있다. 하지만 그저 우리가 관심을 가지 않고 사용하지 않았을 뿐이다. 이러한 거대한 계획 말고, 우리가 직접 실천할 수 있는 방법들도 많다. 전기세의 약 10%를 차지하는 냉장고에는 음식물을 가득 채우지 않아서 에너지를 아끼고, 가까운 거리는 대중교통을 이용하고, 자가용을 이용할 때는 저속으로 이동하고, 나무를 심고, 유기농 제품을 먹고, 잠들기 전 모든 전원을 내리고, 음식을 남기지 않아서 온실가스를 줄이는 등 많은 방법이 있다. 또한 집안 온도를 미지근하게 설정해서 에너지 사용량을 줄이고, 생산하는데 필요한 에너지가 적은 재활용품을 구매하고, 물건을 적게 구매하고, 물건을 재활용해서 에너지를 아끼는 방법들도 있다. 이 외에도 다양한 방법들이 있다. 하지만, 여기에서 중요한 것은, 다양한 방법들을 알고 있는 것이 아닌, 하나라도 실천하는 것이다. 한 사람의 실천이 아주 작아 보일 수 있지만, 이런 실천들이 많이 모이다 보면 큰 변화를 일으키게 될 것이다.",
      "사람들은 코앞에 닥쳐온 일이 아니라면 미래의 사람들이 해결해 줄 것이라 생각하고, 무시한다. 극지의 기후변화로 인해 한반도의 평균 기온이 상승해도 겨울철에 기온이 23도까지 올라가도, 코앞에 닥쳐온 일이 아니기 때문에 사람들은 신경을 쓰지 않는다. 여름이 왜 더워졌는지는 고민하지 않고, 그저 에어컨을 켤 수 있는지만 생각한다. 하지만, 우리는 이런 현상들을 무시해서는 안 된다. 아무리 우리나라와 멀리 떨어져 있는 곳이어도 극지에서의 기후변화는 더 이상 우리와 관련 없는 일이 아닌, 우리 미래의 삶과 매우 밀접한 연관이 있는 것이다. 기후변화와 지구 온난화는 우리가 관심을 가지고 노력을 하기 전까지는 해결되지 않는다. 우리가 남 일처럼 생각하고 무시하면, 나중에는 우리가 무시한 문제가 우리 인류가 감당할 수 없을 정도로 커져서 돌아오게 된다. 지금도 지구 온난화는 계속되고 있는데, 실천을 미룰 이유가 없다. 실천을 미루다가 지구 온난화가 매우 심각해져 우리가 해결할 수 없게 된 뒤에는 아무리 노력을 해도 변하지 않는다. 우리는 문제가 커지기 전에, 우리가 해결할 수 있을 때 실천하고 해결하려고 노력해야 할 것이다. 최재천 교수는 우리가 아무리 지금 당장 탄소 제로를 하게 된다고 해도, 이미 쏟아낸 온실가스로 인해 몇십 년은 기후변화가 지금 상태로 이어질 것이고, 지금은 우리가 겨우 시간을 조금 벌고 있는 것밖에 안 된다고 말한다. 우리는 겨우 벌은 시간을 이용해서 기후변화에 즉각적으로 대처해야 할 것이다. 나는 이제 우리가 지구를 위해 기후변화 문제를 해결해야 하는 것도 있지만, 이제는 우리와 우리의 후손들이 살아가기 위해 기후 변화 문제를 해결해야 할 때라고 생각한다.",
    ],
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
