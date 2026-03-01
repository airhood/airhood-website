import React from 'react';
import { useInView } from '../../hooks/useInView.ts';

interface SectionProps {
  id?: string;
  index: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, index, title, children }) => {
  const { ref, inView } = useInView();

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={`scroll-fade ${inView ? 'in-view' : ''} py-24`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <p className="slide-left font-mono text-sm text-blue-500 dark:text-blue-400 mb-2">
          {index}
        </p>
        <h2 className="slide-left-delay text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-12">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
