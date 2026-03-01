import React from 'react';
import Section from '../common/Section.tsx';
import { Interest } from '../../types/index.ts';

interface InterestsProps {
  interests: Interest[];
}

const gradients = [
  'from-blue-500/15 via-blue-500/5 to-transparent border-blue-500/30 text-blue-600 dark:text-blue-400',
  'from-violet-500/15 via-violet-500/5 to-transparent border-violet-500/30 text-violet-600 dark:text-violet-400',
  'from-pink-500/15 via-pink-500/5 to-transparent border-pink-500/30 text-pink-600 dark:text-pink-400',
  'from-indigo-500/15 via-indigo-500/5 to-transparent border-indigo-500/30 text-indigo-600 dark:text-indigo-400',
  'from-cyan-500/15 via-cyan-500/5 to-transparent border-cyan-500/30 text-cyan-600 dark:text-cyan-400',
];

const Interests: React.FC<InterestsProps> = ({ interests }) => {
  return (
    <Section id="interests" index="03 —" title="Interests">
      <div className="stagger flex flex-wrap gap-3">
        {interests.map((interest, index) => {
          const g = gradients[index % gradients.length];
          return (
            <div
              key={index}
              className={`px-5 py-2.5 rounded-full bg-gradient-to-r ${g} border hover:scale-105 transition-all duration-300 cursor-default`}
            >
              <span className="text-sm font-semibold">
                {interest.name}
              </span>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Interests;
