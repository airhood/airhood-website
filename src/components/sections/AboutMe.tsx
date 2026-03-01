import React from 'react';
import Section from '../common/Section.tsx';

const stats = [
  { value: '5년+', label: '프로그래밍 경력' },
  { value: 'CBSH', label: '37기' },
];

const AboutMe: React.FC = () => {
  return (
    <Section id="about" index="01 —" title="About Me">
      <div className="stagger grid sm:grid-cols-2 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-blue-500/30 transition-colors"
          >
            <div className="text-3xl font-black text-gradient mb-1">{stat.value}</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Hello, I'm Airhood!
        </p>
      </div>
    </Section>
  );
};

export default AboutMe;
