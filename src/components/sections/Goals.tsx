import React from 'react';
import Section from '../common/Section.tsx';
import SpotlightCard from '../common/SpotlightCard.tsx';
import { Goal } from '../../types/index.ts';

interface Props {
  goals: Goal[];
}

const Goals: React.FC<Props> = ({ goals }) => {
  return (
    <Section id="goals" index="07 —" title="Goals & Research">
      <div className="stagger grid sm:grid-cols-2 gap-4">
        {goals.map((goal, i) => (
          <SpotlightCard
            key={i}
            className="group bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-blue-500/40 dark:hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="text-3xl mb-4">{goal.emoji}</div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {goal.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {goal.description}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  );
};

export default Goals;
