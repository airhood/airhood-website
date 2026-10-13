import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TechStack } from '../../types';
import Section from '../common/Section.tsx';
import { staggerContainer, staggerItem, viewportOnce } from '../../lib/motion.ts';

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
    <motion.div
      variants={staggerItem}
      className="bg-surface hover:bg-surface-2 rounded-card p-5 transition-colors duration-200"
    >
      <Icon className="text-2xl text-text mb-4" />
      <h3 className="font-display text-lg font-extrabold text-text mb-1">{stack.name}</h3>
      {stack.description && (
        <p className="font-ko text-base text-muted leading-relaxed">{stack.description}</p>
      )}
    </motion.div>
  );
};

const TechStacks: React.FC<Props> = ({ techStacks }) => {
  const categories = ['language', 'framework', 'tool'] as const;
  const reduceMotion = useReducedMotion();

  return (
    <Section id="tech" title="Tech Stacks">
      <div className="space-y-10">
        {categories.map((cat) => {
          const items = techStacks.filter((s) => s.category === cat);
          if (!items.length) return null;
          return (
            <div key={cat}>
              <p className="text-base text-muted mb-4">{CATEGORY_LABELS[cat]}</p>
              <motion.div
                initial={reduceMotion ? undefined : 'hidden'}
                whileInView={reduceMotion ? undefined : 'visible'}
                viewport={viewportOnce}
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {items.map((stack, idx) => (
                  <TechCard key={idx} stack={stack} />
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default TechStacks;
