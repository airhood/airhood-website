import React from 'react';
import { TechStack } from '../../types';
import Section from '../common/Section.tsx';
import SpotlightCard from '../common/SpotlightCard.tsx';

interface Props {
  techStacks: TechStack[];
}

const CATEGORY_LABELS: Record<string, string> = {
  language: 'Languages',
  framework: 'Frameworks & Libraries',
  tool: 'Tools',
};

const TechCard: React.FC<{ stack: TechStack }> = ({ stack }) => {
  const Icon = stack.icon as React.ComponentType<{ className?: string }>;

  return (
    <SpotlightCard className="group bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-500/40 dark:hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 cursor-default overflow-hidden">
      {/* Default state */}
      <div className="flex items-center gap-3 px-4 py-3 transition-opacity duration-300 group-hover:opacity-0">
        <Icon className="text-xl text-neutral-600 dark:text-neutral-400 flex-shrink-0" />
        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 truncate">
          {stack.name}
        </span>
      </div>

      {/* Hover state */}
      <div className="absolute inset-0 flex items-center gap-2.5 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Icon className="text-base text-violet-500 flex-shrink-0" />
        {stack.description && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400 leading-snug line-clamp-2">
            {stack.description}
          </span>
        )}
      </div>
    </SpotlightCard>
  );
};

const TechStacks: React.FC<Props> = ({ techStacks }) => {
  const categories = ['language', 'framework', 'tool'] as const;

  return (
    <Section id="tech" index="02 —" title="Tech Stacks">
      <div className="space-y-6">
        {categories.map((cat) => {
          const items = techStacks.filter((s) => s.category === cat);
          if (!items.length) return null;
          return (
            <div key={cat}>
              <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
                {CATEGORY_LABELS[cat]}
              </p>
              <div className="stagger grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {items.map((stack, idx) => (
                  <TechCard key={idx} stack={stack} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default TechStacks;
