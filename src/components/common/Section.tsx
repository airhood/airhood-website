import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { revealUp, viewportOnce } from '../../lib/motion.ts';

interface SectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  const reduceMotion = useReducedMotion();

  return (
    <section id={id} className="py-14 md:py-16 scroll-mt-16">
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        <motion.h2
          initial={reduceMotion ? undefined : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={revealUp}
          className="font-display text-3xl md:text-4xl font-black tracking-tight text-text mb-8"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={reduceMotion ? undefined : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={revealUp}
          transition={{ delay: 0.08 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;
