import React from 'react';
import Section from '../common/Section.tsx';
import { Interest } from '../../types/index.ts';

interface InterestsProps {
  interests: Interest[];
}

const Interests: React.FC<InterestsProps> = ({ interests }) => {
  return (
    <Section title="Interested in">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {interests.map((interest, index) => (
          <div 
            key={index} 
            className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 text-center hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {interest.name}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Interests;
