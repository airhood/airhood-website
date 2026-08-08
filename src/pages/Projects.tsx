import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaFileAlt } from 'react-icons/fa';
import ProjectIcon from '../components/common/ProjectIcon.tsx';
import { projects } from '../data/index.ts';

const ProjectCard: React.FC<{ project: (typeof projects)[number] }> = ({ project }) => {
  const year = project.date?.slice(0, 4);

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col h-full min-h-[340px] bg-surface border border-line rounded-card overflow-hidden hover:border-signal/40 transition-colors duration-200"
    >
      <div className="relative h-20 flex-shrink-0 bg-surface-2 overflow-hidden">
        {year && (
          <span className="absolute -bottom-2 -right-2 font-display text-6xl font-black text-line leading-none select-none">
            {year}
          </span>
        )}
        <ProjectIcon project={project} size={20} className="absolute top-4 left-5 text-signal/70" />
      </div>

      <div className="flex flex-col flex-1 p-6">
        {project.organization && (
          <span className="text-xs text-muted mb-2">{project.organization}</span>
        )}

        <h3 className="font-display font-extrabold text-lg text-text leading-snug mb-2 line-clamp-2 group-hover:text-signal transition-colors duration-200">
          {project.title}
        </h3>

        {project.description && (
          <p className="text-sm text-muted leading-relaxed line-clamp-3 flex-1">
            {project.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded font-signal text-[11px] text-muted bg-surface-2">
              {tag}
            </span>
          ))}
        </div>

        {(project.githubUrl || project.pdf) && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-line font-signal text-xs text-muted">
            {project.githubUrl && (
              <span className="flex items-center gap-1.5">
                <FaGithub size={13} />
                GitHub
              </span>
            )}
            {project.pdf && (
              <span className="flex items-center gap-1.5 text-signal">
                <FaFileAlt size={12} />
                Paper
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

const Projects: React.FC = () => {
  return (
    <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-32">
      <p className="font-signal text-sm text-signal mb-2">projects</p>
      <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight mb-12">Projects</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
