import React from 'react';
import { TechStack } from '../../types';
import Section from '../common/Section.tsx';

interface Props {
  techStacks: TechStack[];
}

const TechStacks: React.FC<Props> = ({ techStacks }) => {
  return (
    <Section title="Tech Stacks">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {techStacks.map((stack, idx) => {
          const Icon = stack.icon;
          return (
            <div key={idx} className="flex items-center gap-3">
              <Icon className="text-2xl" />
              <span>{stack.name}</span>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default TechStacks;
