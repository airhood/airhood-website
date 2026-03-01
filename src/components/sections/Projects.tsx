import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Section from '../common/Section.tsx';
import SpotlightCard from '../common/SpotlightCard.tsx';
import { Project } from '../../types/index.ts';

interface Props {
  projects: Project[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <SpotlightCard className="group flex flex-col bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-blue-500/40 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
      {/* Title */}
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
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
            className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-blue-500 transition-colors"
          >
            <FaExternalLinkAlt size={13} />
            <span>Live</span>
          </a>
        )}
      </div>
    </SpotlightCard>
  );
};

const Projects: React.FC<Props> = ({ projects }) => {
  return (
    <Section id="projects" index="04 —" title="Projects">
      <div className="stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
