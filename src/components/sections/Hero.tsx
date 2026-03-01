import React, { useEffect, useRef, useState } from 'react';
import { SocialLink as SocialLinkType } from '../../types/index.ts';

interface HeroProps {
  profileImage: string;
  socialLinks: SocialLinkType[];
}

const Hero: React.FC<HeroProps> = ({ profileImage, socialLinks }) => {
  const heroRef  = useRef<HTMLElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const target  = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId   = useRef<number>(0);

  // 다크모드 상태 감지 — blend mode와 색상을 동적으로 전환
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  // 커서 추적 (lerp로 부드럽게)
  useEffect(() => {
    const hero  = heroRef.current;
    const light = lightRef.current;
    if (!hero || !light) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const cx = hero.offsetWidth / 2;
    const cy = hero.offsetHeight / 2;
    target.current  = { x: cx, y: cy };
    current.current = { x: cx, y: cy };

    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.05);
      current.current.y = lerp(current.current.y, target.current.y, 0.05);
      const { x, y } = current.current;
      light.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
      rafId.current = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseLeave = () => {
      target.current = { x: hero.offsetWidth / 2, y: hero.offsetHeight / 2 };
    };

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // 다크: screen(밝게) + 연보라  /  라이트: multiply(색조 입히기) + 진한 보라
  const lightStyle: React.CSSProperties = isDark
    ? {
        background: 'rgba(160, 140, 255, 0.14)',
        mixBlendMode: 'screen',
      }
    : {
        background: 'rgba(109, 40, 217, 0.22)',
        mixBlendMode: 'multiply',
      };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── 커서 ambient light (Gaussian blur, 원 경계 없음) ── */}
      <div
        ref={lightRef}
        className="pointer-events-none absolute top-0 left-0 rounded-full"
        style={{
          width: '600px',
          height: '600px',
          filter: 'blur(130px)',
          willChange: 'transform',
          ...lightStyle,
        }}
      />

      {/* ── 하단 페이드아웃 — Hero → 다음 섹션 자연스럽게 연결 ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white dark:from-[#0a0a0f] to-transparent z-10" />

      {/* ── 배경 floating orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-a absolute top-1/4 -left-40 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/8 rounded-full blur-3xl" />
        <div className="orb-b absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-violet-500/10 dark:bg-violet-500/8 rounded-full blur-3xl" />
        <div className="orb-c absolute top-2/3 left-1/3 w-80 h-80 bg-fuchsia-500/8 dark:bg-fuchsia-500/6 rounded-full blur-3xl" />
      </div>

      {/* ── 콘텐츠 + 스크롤 인디케이터 ── */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">

        {/* 메인 콘텐츠 — 화면 중앙 정렬 */}
        <div className="flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full pt-24 pb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-14">

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="hero-fade-1 font-mono text-sm text-blue-500 dark:text-blue-400 mb-5 tracking-wider">
                  Hello, World! 👋
                </p>

                <h1 className="hero-fade-2 text-7xl md:text-8xl lg:text-9xl font-black text-gradient leading-none mb-6">
                  Airhood
                </h1>

                <p className="hero-fade-3 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-lg mb-10 leading-relaxed">
                  Developer passionate about{' '}
                  <span className="text-neutral-900 dark:text-neutral-100 font-semibold">AI</span>,{' '}
                  <span className="text-neutral-900 dark:text-neutral-100 font-semibold">Robotics</span>,{' '}
                  and exploring the depths of software.
                </p>

                {/* 소셜 버튼 — 아이콘 전용 그라디언트 호버 */}
                <div className="hero-fade-4 flex flex-wrap gap-2.5">
                  {socialLinks.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.platform}
                        className="group relative w-11 h-11 rounded-xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-white hover:border-transparent hover:scale-110 transition-all duration-200 overflow-hidden"
                      >
                        {/* 호버 시 그라디언트 배경 */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-violet-500 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        {Icon && <Icon className="relative z-10 text-lg" />}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Profile image */}
              <div className="hero-fade-5 flex-shrink-0 self-center lg:self-auto">
                <div className="relative w-52 h-52 md:w-64 md:h-64">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-600 via-violet-500 to-fuchsia-600 opacity-40 blur-lg" />
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 dark:border-white/5 bg-neutral-100 dark:bg-neutral-900">
                    <img src={profileImage} alt="Airhood" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 스크롤 인디케이터 — 항상 섹션 하단에 고정 */}
        <div className="hero-fade-4 flex flex-col items-center gap-2 pb-8">
          <span className="text-xs font-mono text-neutral-400 dark:text-neutral-600 tracking-widest">SCROLL</span>
          <div className="scroll-indicator w-px h-10 bg-gradient-to-b from-neutral-400 dark:from-neutral-600 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
