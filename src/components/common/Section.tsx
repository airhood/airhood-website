import React from 'react';

interface SectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="section">
      <h2 className="section-title">{title}</h2>
      <div className="mt-6">
        {children}
      </div>
    </section>
  );
};

export default Section;
