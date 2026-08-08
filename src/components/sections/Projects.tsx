import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { FaGithub, FaFileAlt } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import Section from '../common/Section.tsx';
import ProjectIcon from '../common/ProjectIcon.tsx';
import { Project } from '../../types/index.ts';
import { staggerContainer, staggerItem, viewportOnce } from '../../lib/motion.ts';

interface Props {
  projects: Project[];
}

const PREVIEW_COUNT = 3;
const MotionLink = motion.create(Link);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const year = project.date?.slice(0, 4);

  return (
    <MotionLink
      to={`/projects/${project.slug}`}
      variants={staggerItem}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col h-full min-h-[300px] bg-surface border border-line rounded-card overflow-hidden hover:border-signal/40 transition-colors duration-200"
    >
      <div className="relative h-24 flex-shrink-0 bg-surface-2 overflow-hidden">
        {year && (
          <span className="absolute -bottom-2 right-4 font-display text-6xl font-black text-line leading-none select-none">
            {year}
          </span>
        )}
        <ProjectIcon project={project} size={18} className="absolute top-4 left-4 text-signal/70" />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-text mb-2 group-hover:text-signal transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-muted leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded font-signal text-[11px] text-muted bg-surface-2">
              {tag}
            </span>
          ))}
        </div>

        {(project.githubUrl || project.pdf) && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-line text-xs text-muted">
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
    </MotionLink>
  );
};

const Projects: React.FC<Props> = ({ projects }) => {
  const preview = projects.slice(0, PREVIEW_COUNT);
  const reduceMotion = useReducedMotion();

  return (
    <Section id="projects" title="Projects">
      <motion.div
        initial={reduceMotion ? undefined : 'hidden'}
        whileInView={reduceMotion ? undefined : 'visible'}
        viewport={viewportOnce}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {preview.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>

      <div className="mt-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 font-signal text-sm text-muted hover:text-text transition-colors duration-200"
        >
          <span>View all projects</span>
          <HiArrowRight size={14} />
        </Link>
      </div>
    </Section>
  );
};

export default Projects;
