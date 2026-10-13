import React from 'react';
import { Link } from 'react-router-dom';
import ProjectIcon from './ProjectIcon.tsx';
import { Project } from '../../types/index.ts';

const ProjectCard: React.FC<{ project: Project; className?: string }> = ({ project, className = '' }) => (
  <Link
    to={`/projects/${project.slug}`}
    className={`group flex flex-col ${className}`}
  >
    <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-surface-2 transition-colors duration-300">
      {project.image ? (
        <img
          src={project.image}
          alt=""
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      ) : (
        <div className="relative w-full h-full">
          <ProjectIcon project={project} size={22} className="absolute top-5 left-5 text-signal/70" />
          <span className="absolute -bottom-3 right-5 font-display text-8xl font-black text-line leading-none select-none">
            {project.date?.slice(0, 4)}
          </span>
        </div>
      )}
    </div>

    <div className="pt-5">
      <p className="text-sm text-muted mb-2">
        {[project.organization, project.date?.slice(0, 4)].filter(Boolean).join(' · ')}
      </p>
      <h3 className="font-display text-2xl font-extrabold text-text leading-snug mb-3 text-balance group-hover:text-signal transition-colors duration-200">
        {project.title}
      </h3>
      <p className="font-ko text-muted leading-relaxed text-pretty line-clamp-4">{project.description}</p>
    </div>
  </Link>
);

export default ProjectCard;
