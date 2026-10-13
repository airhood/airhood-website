import React from 'react';
import Section from '../common/Section.tsx';
import profile_image from '../../assets/images/Airhood_Fixed.png';

const stats = [
  { value: '5년+', label: '프로그래밍 경력' },
  { value: 'CBSH', label: '37기' },
];

const AboutMe: React.FC = () => {
  return (
    <Section id="about" title="About Me">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={profile_image}
          alt="Airhood"
          className="w-24 h-24 rounded-2xl flex-shrink-0"
        />
        <p className="font-display text-2xl md:text-3xl font-extrabold text-text">
          Hello, I'm Airhood!
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface rounded-card p-6">
            <p className="font-display text-3xl md:text-4xl font-black tracking-tight text-text mb-2">{stat.value}</p>
            <p className="text-base text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default AboutMe;
