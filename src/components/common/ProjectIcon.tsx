import React from 'react';
import { FaTrophy, FaFlask, FaCode } from 'react-icons/fa';
import { Project } from '../../types/index.ts';

interface Props {
  project: Pick<Project, 'organization' | 'type'>;
  size?: number;
  className?: string;
}

const ProjectIcon: React.FC<Props> = ({ project, size = 22, className = '' }) => {
  // type이 명시되어 있으면 organization 유무와 무관하게 그것을 우선한다.
  const Icon =
    project.type === 'research' ? FaFlask
    : project.type === 'competition' ? FaTrophy
    : !project.organization ? FaCode
    : FaTrophy;
  return <Icon size={size} className={className} />;
};

export default ProjectIcon;
