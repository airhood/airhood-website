import React from 'react';
import { FaTrophy, FaFlask, FaCode } from 'react-icons/fa';
import { Project } from '../../types/index.ts';

interface Props {
  project: Pick<Project, 'organization' | 'type'>;
  size?: number;
  className?: string;
}

const ProjectIcon: React.FC<Props> = ({ project, size = 22, className = '' }) => {
  const Icon = !project.organization ? FaCode : project.type === 'research' ? FaFlask : FaTrophy;
  return <Icon size={size} className={className} />;
};

export default ProjectIcon;
