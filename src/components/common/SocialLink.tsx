import React from 'react';
import { SocialLink as SocialLinkType } from '../../types';

interface Props {
  link: SocialLinkType;
}

const SocialLink: React.FC<Props> = ({ link }) => {
  const Icon = link.icon;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-blue-500/50 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200 text-sm font-medium"
    >
      {Icon && <Icon className="text-base flex-shrink-0" />}
      {link.emoji && <span>{link.emoji}</span>}
      <span>{link.platform}</span>
    </a>
  );
};

export default SocialLink;
