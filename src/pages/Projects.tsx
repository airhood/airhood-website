import React from 'react';
import ProjectCard from '../components/common/ProjectCard.tsx';
import { projects } from '../data/index.ts';

const Projects: React.FC = () => {
  return (
    <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-32">
      <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight mb-12">Projects</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
