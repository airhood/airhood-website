import React from 'react';
import Section from '../common/Section.tsx';
import { Goal } from '../../types/index.ts';

interface Props {
  goals: Goal[];
}

const Goals: React.FC<Props> = ({ goals }) => {
  return (
    <Section id="goals" title="Goals & Research">
      <div className="grid sm:grid-cols-2 gap-4">
        {goals.map((goal, i) => (
          <div
            key={i}
            className="group bg-surface rounded-card p-6 hover:bg-surface-2 transition-colors duration-200"
          >
            <goal.icon size={26} className="mb-4 text-signal" />
            <h3 className="font-display text-xl font-extrabold text-text mb-2 group-hover:text-signal transition-colors duration-200">
              {goal.title}
            </h3>
            <p className="font-ko text-base text-muted leading-relaxed">
              {goal.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Goals;
