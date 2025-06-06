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
      className="flex items-center gap-2 hover:underline"
    >
      {Icon && <Icon className="text-xl" />}
      {link.emoji && <span className="text-xl">{link.emoji}</span>}
      <span>{link.platform}</span>
    </a>
  );
};

export default SocialLink;
