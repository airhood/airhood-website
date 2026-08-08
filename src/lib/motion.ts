import type { Variants, Transition } from 'motion/react';

// 사이트 전역에서 재사용하는 절제된 모션 — blur + 살짝 위로 슬라이드
export const EASE: Transition['ease'] = [0.16, 1, 0.3, 1];

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

// 라우트 전환 — 과하지 않게 페이드 + 아주 살짝 위로
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE } },
};

// 뷰포트 진입 트리거 공통 옵션
export const viewportOnce = { once: true, margin: '0px 0px -80px 0px' } as const;
