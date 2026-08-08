import React from 'react';
import { TechStack } from '../../types';
import Section from '../common/Section.tsx';

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
    <div
      title={stack.description}
      className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-card bg-surface border border-line hover:border-signal/40 transition-colors duration-200 cursor-default"
    >
      <Icon className="text-base text-muted flex-shrink-0" />
      <span className="text-sm font-semibold text-text whitespace-nowrap">
        {stack.name}
      </span>
    </div>
  );
};

const TechStacks: React.FC<Props> = ({ techStacks }) => {
  const categories = ['language', 'framework', 'tool'] as const;

  return (
    <Section id="tech" title="Tech Stacks">
      <div className="space-y-6">
        {categories.map((cat) => {
          const items = techStacks.filter((s) => s.category === cat);
          if (!items.length) return null;
          return (
            <div key={cat}>
              <p className="font-signal text-xs text-muted uppercase tracking-widest mb-3">
                {CATEGORY_LABELS[cat]}
              </p>
              <div className="flex flex-wrap gap-2.5">
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
