import React from 'react';
import Section from '../common/Section.tsx';
import { Interest } from '../../types/index.ts';

interface InterestsProps {
  interests: Interest[];
}

const Interests: React.FC<InterestsProps> = ({ interests }) => {
  return (
    <Section id="interests" title="Interests">
      <div className="flex flex-wrap gap-3">
        {interests.map((interest, index) => (
          <div
            key={index}
            className="px-4 py-2 rounded-full bg-surface border border-line hover:border-signal/50 hover:text-signal transition-colors duration-200 cursor-default"
          >
            <span className="font-signal text-sm">
              {interest.name}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Interests;
