import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { FaGithub, FaExternalLinkAlt, FaFilePdf, FaPlay } from 'react-icons/fa';
import ProjectIcon from '../components/common/ProjectIcon.tsx';
import GithubCard from '../components/common/GithubCard.tsx';
import { projects } from '../data/index.ts';

const PdfViewer = lazy(() => import('../components/common/PdfViewer.tsx'));
const SlideViewer = lazy(() => import('../components/common/SlideViewer.tsx'));
const CodeViewer = lazy(() => import('../components/common/CodeViewer.tsx'));

/** 소리 없는 짧은 영상 — 화면에 보이면 반복 재생, 벗어나면 멈춤. 누르면 멈춤/재생.
 *  '동작 줄이기' 설정이면 자동 재생하지 않고 기본 컨트롤을 보여 준다. */
const LoopVideo: React.FC<{ src: string; poster: string }> = ({ src, poster }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [paused, setPaused] = useState(false);
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const v = ref.current;
    if (!v || reduceMotion) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.5 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduceMotion]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <div className="relative">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduceMotion}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(userPaused.current)}
        onClick={reduceMotion ? undefined : toggle}
        className={`w-full aspect-[4/3] object-cover rounded-card bg-surface ${reduceMotion ? '' : 'cursor-pointer'}`}
      />
      {paused && !reduceMotion && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="w-14 h-14 rounded-full bg-black/55 flex items-center justify-center text-white">
            <FaPlay size={18} className="ml-0.5" />
          </span>
        </div>
      )}
    </div>
  );
};

/** 사진을 누르면 크게 보여 주는 확대 보기 — 사진 속 글씨와 설계도의 치수를 읽을 수 있게 */
const Lightbox: React.FC<{
  items: { src: string; caption: string }[];
  index: number;
  onClose: () => void;
  onMove: (i: number) => void;
}> = ({ items, index, onClose, onMove }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onMove((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, items.length, onClose, onMove]);

  const item = items[index];
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6 cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
    >
      <img
        src={item.src}
        alt={item.caption}
        className="max-w-full max-h-[80vh] object-contain rounded-card bg-white"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="font-ko text-base text-white/80 mt-4" onClick={(e) => e.stopPropagation()}>
        {item.caption} <span className="text-white/50 tabular-nums ml-2">{index + 1} / {items.length}</span>
      </p>
    </div>
  );
};

const ProjectDetail: React.FC = () => {
  const { slug } = useParams();
  const [zoomed, setZoomed] = useState<number | null>(null);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-32">
        <p className="text-muted font-signal text-sm">// project not found: {slug}</p>
        <Link to="/projects" className="inline-flex items-center gap-1.5 mt-4 text-sm text-signal hover:underline">
          <HiArrowLeft size={14} /> Projects로 돌아가기
        </Link>
      </div>
    );
  }

  const year = project.date?.slice(0, 4);

  const githubOnly = !!project.githubUrl && !project.liveUrl && !project.pdf && !project.poster && !project.sections && !project.demo;

  return (
    <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-32">
      <Link to="/projects" className="inline-flex items-center gap-1.5 mb-8 font-signal text-xs text-muted hover:text-text transition-colors">
        <HiArrowLeft size={12} /> PROJECTS
      </Link>

      <div className="relative h-32 rounded-card bg-surface-2 overflow-hidden mb-12">
        {year && (
          <span className="absolute -bottom-3 right-4 font-display text-8xl font-black text-line leading-none select-none">
            {year}
          </span>
        )}
        <ProjectIcon project={project} size={24} className="absolute top-6 left-6 text-signal/70" />
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
        <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight text-text leading-tight">
          {project.title}
        </h1>
        {project.date && (
          <span className="font-signal text-sm text-signal flex-shrink-0 mt-2">{project.date}</span>
        )}
      </div>
      {project.organization && <p className="text-lg text-muted mb-8">{project.organization}</p>}

      {project.description && (
        <p className="font-ko text-lg md:text-xl text-text leading-relaxed mb-8">
          {project.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <span key={tag} className="px-3 py-1.5 rounded font-signal text-sm text-muted bg-surface-2">
            {tag}
          </span>
        ))}
      </div>

      {/* GitHub 링크가 전부인 프로젝트는 작은 버튼 대신 저장소 카드로 강조 */}
      {githubOnly && project.githubUrl && <GithubCard url={project.githubUrl} />}

      {!githubOnly && (project.githubUrl || project.liveUrl) && (
        <div className="flex flex-wrap items-center gap-3 mb-14">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-card bg-surface-2 text-base text-text hover:text-signal transition-colors"
            >
              <FaGithub size={16} />
              <span>GitHub</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-card bg-surface-2 text-base text-text hover:text-signal transition-colors"
            >
              <FaExternalLinkAlt size={14} />
              <span>Try out</span>
            </a>
          )}
        </div>
      )}

      {project.poster && !project.highlights && (
        <a
          href={project.poster.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-card overflow-hidden hover:opacity-90 transition-opacity mb-24"
        >
          <img src={project.poster.image} alt={`${project.title} poster`} className="w-full h-auto block" loading="lazy" />
        </a>
      )}

      {project.highlights && (
        <div className="grid md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] gap-8 items-start mb-24">
          {project.poster && (
            <a
              href={project.poster.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-card overflow-hidden hover:opacity-90 transition-opacity"
            >
              <img src={project.poster.image} alt={`${project.title} poster`} className="w-full h-auto block" />
            </a>
          )}

          {project.highlights && (
            <div className="flex flex-col gap-4">
              {project.highlights.map((h) => (
                <div key={h.label} className="bg-surface rounded-card p-6">
                  <p className="font-display text-3xl md:text-4xl font-black tracking-tight text-text mb-2">{h.value}</p>
                  <p className="text-base text-muted leading-relaxed">{h.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {project.sections && (
        <div className="flex flex-col gap-12 mb-16">
          {project.sections.map((sec) => (
            <section key={sec.title} className="grid md:grid-cols-[14rem_1fr] gap-4 md:gap-12">
              <h2 className="font-display text-xl font-extrabold text-text">{sec.title}</h2>
              <div className="flex flex-col gap-4">
                {sec.body.map((para, i) => (
                  <p key={i} className="font-ko text-lg text-muted leading-relaxed text-pretty">{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {project.videos && (
        <section className="grid md:grid-cols-[14rem_1fr] gap-4 md:gap-12 mb-12">
          <h2 className="font-display text-xl font-extrabold text-text">실험 영상</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.videos.map((v) => (
              <figure key={v.src}>
                <LoopVideo src={v.src} poster={v.poster} />
                <figcaption className="font-ko text-base text-muted mt-3">{v.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {project.gallery && (
        <section className="grid md:grid-cols-[14rem_1fr] gap-4 md:gap-12 mb-16">
          <h2 className="font-display text-xl font-extrabold text-text">사진</h2>
          {/* 같은 줄(row)의 사진은 가로 폭을 사진 비율대로 나눠 높이를 맞춘다 — 상자 여백이 생기지 않는다 */}
          <div className="flex flex-col gap-6">
            {Array.from(new Set(project.gallery.map((g) => g.row))).map((row) => {
              const items = project.gallery!.map((g, i) => ({ g, i })).filter(({ g }) => g.row === row);
              return (
                <div
                  key={row}
                  className="grid gap-4"
                  style={{ gridTemplateColumns: items.map(({ g }) => `minmax(0, ${g.aspect}fr)`).join(' ') }}
                >
                  {items.map(({ g, i }) => (
                    <figure key={g.src}>
                      <button
                        type="button"
                        onClick={() => setZoomed(i)}
                        aria-label={`${g.caption} 크게 보기`}
                        className="block w-full rounded-card overflow-hidden cursor-zoom-in hover:opacity-90 transition-opacity"
                      >
                        <img src={g.src} alt={g.caption} loading="lazy" className="w-full h-auto block" />
                      </button>
                      <figcaption className="font-ko text-base text-muted mt-3">{g.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {project.gallery && zoomed !== null && (
        <Lightbox items={project.gallery} index={zoomed} onClose={() => setZoomed(null)} onMove={setZoomed} />
      )}

      {project.demo && (
        <a
          href={project.demo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-surface hover:bg-surface-2 rounded-card overflow-hidden mb-8 transition-colors"
        >
          <img src={project.demo.image} alt={`${project.demo.title} 화면`} className="w-full h-auto block" loading="lazy" />
          <div className="flex items-start justify-between gap-6 p-6">
            <div>
              <h3 className="font-display text-xl font-extrabold text-text mb-2">{project.demo.title}</h3>
              <p className="font-ko text-muted leading-relaxed">{project.demo.description}</p>
            </div>
            <FaExternalLinkAlt size={14} className="text-muted mt-2 flex-shrink-0" />
          </div>
        </a>
      )}

      {project.sections && project.pdf && !Array.isArray(project.pdf) && (
        <a
          href={project.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-surface hover:bg-surface-2 rounded-card p-6 transition-colors"
        >
          <FaFilePdf size={22} className="text-muted flex-shrink-0" />
          <span className="flex-1">
            <span className="block font-display font-extrabold text-text">Full report</span>
          </span>
          <FaExternalLinkAlt size={13} className="text-muted" />
        </a>
      )}

      {project.code && (
        <Suspense fallback={<p className="text-sm text-muted py-16">불러오는 중...</p>}>
          <CodeViewer {...project.code} />
        </Suspense>
      )}

      {project.pdf && !project.sections && !project.poster && (
        <Suspense fallback={<p className="text-sm text-muted py-16">불러오는 중...</p>}>
          <div className="flex flex-col gap-8">
            {(Array.isArray(project.pdf) ? project.pdf : [project.pdf]).map((file) => (
              project.slides?.includes(file) ? <SlideViewer key={file} file={file} /> : <PdfViewer key={file} file={file} />
            ))}
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default ProjectDetail;
