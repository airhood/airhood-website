import React from 'react';
import { TechStack } from '../../types/index';

interface TechCardProps {
  tech: TechStack;
}

const TechCard: React.FC<TechCardProps> = ({ tech }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg p-6 flex flex-col items-center justify-center gap-3 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all">
      {tech.icon && <div className="w-12 h-12 text-primary-500 dark:text-primary-400">{tech.icon}</div>}
      <h3 className="font-medium text-neutral-900 dark:text-white text-center">{tech.name}</h3>
    </div>
  );
};

export default TechCard;
