import React from 'react';
import { SocialLink as SocialLinkType } from '../../types/index.ts';

interface HeroProps {
  socialLinks: SocialLinkType[];
}

const Hero: React.FC<HeroProps> = ({ socialLinks }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24 w-full">
        <p className="font-signal text-sm text-signal mb-5 tracking-wide">
          Hello, World! 👋
        </p>

        <h1 className="font-display text-7xl sm:text-8xl md:text-9xl font-black text-text leading-[0.9] mb-7 tracking-tight">
          Airhood
        </h1>

        <p className="text-lg text-muted max-w-md mb-10 leading-relaxed">
          Developer passionate about{' '}
          <span className="text-text font-semibold">AI</span>,{' '}
          <span className="text-text font-semibold">Robotics</span>,{' '}
          and exploring the depths of software.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {socialLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
                className="w-10 h-10 rounded-card flex items-center justify-center bg-surface border border-line text-muted hover:text-signal hover:border-signal/50 transition-colors duration-200"
              >
                {Icon && <Icon className="text-base" />}
              </a>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2">
        <span className="font-signal text-[11px] text-muted tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
