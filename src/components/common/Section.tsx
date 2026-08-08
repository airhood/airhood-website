import React from 'react';

interface SectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="py-14 md:py-16 scroll-mt-16">
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight text-text mb-8">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
