import React, { Suspense, lazy } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectIcon from '../components/common/ProjectIcon.tsx';
import { projects } from '../data/index.ts';

const PdfViewer = lazy(() => import('../components/common/PdfViewer.tsx'));

const ProjectDetail: React.FC = () => {
  const { slug } = useParams();
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

  return (
    <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-32">
      <Link to="/projects" className="inline-flex items-center gap-1.5 mb-8 font-signal text-xs text-muted hover:text-text transition-colors">
        <HiArrowLeft size={12} /> PROJECTS
      </Link>

      <div className="relative h-24 rounded-card bg-surface-2 border border-line overflow-hidden mb-8">
        {year && (
          <span className="absolute -bottom-3 -right-2 font-display text-7xl font-black text-line leading-none select-none">
            {year}
          </span>
        )}
        <ProjectIcon project={project} size={24} className="absolute top-5 left-6 text-signal/70" />
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
        <h1 className="font-display text-3xl md:text-4xl font-black tracking-tight text-text">
          {project.title}
        </h1>
        {project.date && (
          <span className="font-signal text-sm text-signal flex-shrink-0">{project.date}</span>
        )}
      </div>
      {project.organization && <p className="text-muted mb-6">{project.organization}</p>}

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span key={tag} className="px-2.5 py-1 rounded font-signal text-xs text-muted bg-surface-2">
            {tag}
          </span>
        ))}
      </div>

      {project.description && (
        <p className="text-text leading-relaxed mb-6">{project.description}</p>
      )}

      {(project.githubUrl || project.liveUrl) && (
        <div className="flex items-center gap-5 mb-10">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-text transition-colors"
            >
              <FaGithub size={15} />
              <span>GitHub</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-signal transition-colors"
            >
              <FaExternalLinkAlt size={13} />
              <span>Live</span>
            </a>
          )}
        </div>
      )}

      {project.pdf && (
        <Suspense fallback={<p className="text-sm text-muted py-16">불러오는 중...</p>}>
          <PdfViewer file={project.pdf} />
        </Suspense>
      )}
    </div>
  );
};

export default ProjectDetail;
