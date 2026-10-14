import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import { apps } from '../data/index.ts';

const Apps: React.FC = () => {
  return (
    <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-32">
      <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight mb-12">Apps</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <article key={app.slug} className="bg-surface rounded-card p-8 flex flex-col">
            <img src={app.icon} alt={`${app.name} icon`} className="w-24 h-24 rounded-[22px] mb-6" />
            <h2 className="font-display text-2xl font-extrabold text-text mb-3">{app.name}</h2>
            <p className="font-ko text-base text-muted leading-relaxed mb-5">{app.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {app.tags.map((tag) => (
                <span key={tag} className="font-signal text-xs px-2.5 py-1 rounded-md bg-surface-2 text-muted">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-3">
              {app.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-card bg-surface-2 text-base text-text hover:text-signal transition-colors"
                >
                  {link.label === 'GitHub' ? <FaGithub size={16} /> : link.label === 'Download' ? <FaDownload size={14} /> : <FaExternalLinkAlt size={14} />}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Apps;
