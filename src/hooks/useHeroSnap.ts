import { useEffect } from 'react';

const HEADER_OFFSET = 64; // Section의 scroll-mt-16(=4rem)과 같은 값 — 헤더에 가리지 않게
const LOCK_MS = 900; // 부드러운 스크롤이 끝나기까지 입력을 막는 시간

/**
 * 첫 화면(Hero)과 다음 섹션(#about) 사이에서는 어중간한 위치에 멈추지 않게,
 * 스크롤하면 애니메이션으로 한 번에 다음 섹션 / 맨 위로 이동한다.
 * 휠과 키보드(↓ ↑ PageDown PageUp Space)에 적용. 동작 줄이기 설정이면 꺼진다.
 */
export function useHeroSnap() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animating = false;

    const aboutTop = () => {
      const about = document.getElementById('about');
      return about ? Math.round(about.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET) : 0;
    };

    const go = (top: number) => {
      animating = true;
      window.scrollTo({ top, behavior: 'smooth' });
      // 이동 중에는 추가 입력을 막되, 어떤 경우에도 타이머로 반드시 잠금을 푼다
      window.setTimeout(() => {
        animating = false;
      }, LOCK_MS);
    };

    // dir: 1 = 아래로, -1 = 위로. 처리했으면 true
    const handle = (dir: 1 | -1) => {
      const target = aboutTop();
      const y = window.scrollY;
      if (dir === 1 && y < target - 2) {
        go(target);
        return true;
      }
      if (dir === -1 && y > 0 && y <= target + 2) {
        go(0);
        return true;
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.deltaY === 0) return;
      if (animating) {
        e.preventDefault();
        return;
      }
      if (handle(e.deltaY > 0 ? 1 : -1)) e.preventDefault();
    };

    const onKey = (e: KeyboardEvent) => {
      const down = e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey);
      const up = e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey);
      if (!down && !up) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') return;
      if (animating) {
        e.preventDefault();
        return;
      }
      if (handle(down ? 1 : -1)) e.preventDefault();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, []);
}
