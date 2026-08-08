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
            className="group bg-surface border border-line rounded-card p-6 hover:border-signal/40 transition-colors duration-200"
          >
            <div className="text-3xl mb-4">{goal.emoji}</div>
            <h3 className="font-bold text-text mb-2 group-hover:text-signal transition-colors duration-200">
              {goal.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {goal.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Goals;
