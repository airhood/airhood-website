import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Section from '../common/Section.tsx';
import ProjectCard from '../common/ProjectCard.tsx';
import { Project } from '../../types/index.ts';

interface Props {
  projects: Project[];
}

// 홈에서는 미리보기만 — 대표작을 앞에 두고 총 9개까지. 전체는 /projects
const PREVIEW_COUNT = 9;

const Projects: React.FC<Props> = ({ projects }) => {
  const preview = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)].slice(0, PREVIEW_COUNT);

  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [updateArrows]);

  const slide = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + 32 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const arrow =
    'w-10 h-10 rounded-card flex items-center justify-center bg-surface text-text hover:bg-surface-2 transition-colors duration-200 disabled:opacity-30 disabled:pointer-events-none';

  return (
    <Section id="projects" title="Projects">
      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {preview.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            className="snap-start shrink-0 basis-[85%] sm:basis-[calc((100%-2rem)/2)] lg:basis-[calc((100%-4rem)/3)]"
          />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 font-signal text-sm text-muted hover:text-text transition-colors duration-200"
        >
          <span>View all projects</span>
          <HiArrowRight size={14} />
        </Link>

        <div className="flex gap-2">
          <button type="button" onClick={() => slide(-1)} disabled={!canPrev} aria-label="Previous projects" className={arrow}>
            <HiChevronLeft size={20} />
          </button>
          <button type="button" onClick={() => slide(1)} disabled={!canNext} aria-label="Next projects" className={arrow}>
            <HiChevronRight size={20} />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default Projects;
