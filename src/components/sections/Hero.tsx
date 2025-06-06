import React from 'react';
import { SocialLink as SocialLinkType } from '../../types/index.ts';
import SocialLink from '../common/SocialLink.tsx';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import { SiTistory } from 'react-icons/si';

interface HeroProps {
  profileImage: string;
  socialLinks: SocialLinkType[];
}

const Hero: React.FC<HeroProps> = ({ profileImage, socialLinks }) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-16">
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
          Airhood
        </h1>
        
        <div className="flex flex-wrap gap-4 mt-6">
          {socialLinks.map((link, index) => (
            <SocialLink key={index} link={link} />
          ))}
        </div>
      </div>

      <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg">
        <img
          src={profileImage}
          alt="Airhood profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

    </section>
  );
};

export default Hero;
