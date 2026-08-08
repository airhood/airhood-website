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
      <div className="flex items-start gap-6 max-w-2xl">
        <img
          src={profile_image}
          alt="Airhood"
          className="w-16 h-16 rounded-card border border-line flex-shrink-0"
        />
        <div>
          <p className="text-lg text-text leading-relaxed mb-3">
            Hello, I'm Airhood!
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-signal text-xs text-muted">
            {stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <span className="text-line">·</span>}
                <span>
                  <span className="text-signal font-semibold">{stat.value}</span> {stat.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutMe;
