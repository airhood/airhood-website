import React from 'react';
import Section from '../common/Section.tsx';
import GradientDot from '../common/GradientDot.tsx';

const AboutMe: React.FC = () => {
  return (
    <Section title="About Me">
      <ul className="space-y-3">
        <li className="flex items-start gap-2">
          <GradientDot />
          <span className="text-neutral-700 dark:text-neutral-300">프로그래밍을 시작한지 4년</span>
        </li>
        <li className="flex items-start gap-2">
          <GradientDot />
          <span className="text-neutral-700 dark:text-neutral-300">CBSH 37th</span>
        </li>
      </ul>
    </Section>
  );
};

export default AboutMe;
