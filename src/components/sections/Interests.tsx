import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Section from '../common/Section.tsx';
import { Interest } from '../../types/index.ts';
import { staggerContainer, staggerItem, viewportOnce } from '../../lib/motion.ts';

interface InterestsProps {
  interests: Interest[];
}

const Interests: React.FC<InterestsProps> = ({ interests }) => {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="interests" title="Interests">
      <motion.div
        initial={reduceMotion ? undefined : 'hidden'}
        whileInView={reduceMotion ? undefined : 'visible'}
        viewport={viewportOnce}
        variants={staggerContainer}
        className="flex flex-wrap gap-3"
      >
        {interests.map((interest, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="px-4 py-2 rounded-full bg-surface border border-line hover:border-signal/50 hover:text-signal transition-colors duration-200 cursor-default"
          >
            <span className="font-signal text-sm">
              {interest.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default Interests;
