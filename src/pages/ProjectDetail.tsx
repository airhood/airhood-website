import React, { Suspense, lazy } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { FaGithub, FaExternalLinkAlt, FaFilePdf } from 'react-icons/fa';
import ProjectIcon from '../components/common/ProjectIcon.tsx';
import GithubCard from '../components/common/GithubCard.tsx';
import { projects } from '../data/index.ts';

const PdfViewer = lazy(() => import('../components/common/PdfViewer.tsx'));
const SlideViewer = lazy(() => import('../components/common/SlideViewer.tsx'));

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

      {project.pdf && !project.sections && !project.poster && (
        <Suspense fallback={<p className="text-sm text-muted py-16">불러오는 중...</p>}>
          <div className="flex flex-col gap-8">
            {(Array.isArray(project.pdf) ? project.pdf : [project.pdf]).map((file) => (
              project.viewer === 'slides' ? <SlideViewer key={file} file={file} /> : <PdfViewer key={file} file={file} />
            ))}
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default ProjectDetail;
