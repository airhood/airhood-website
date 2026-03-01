import React, { useState } from 'react';
import { FaAtom } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import Section from '../common/Section.tsx';
import { Award } from '../../types/index.ts';

interface Props {
  awards: Award[];
}

const INITIAL_COUNT = 3;

const AwardItem: React.FC<{ award: Award }> = ({ award }) => (
  <div className="relative flex gap-6 pl-14">
    {/* Timeline dot */}
    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
      <FaAtom size={14} className="text-white" />
    </div>

    {/* Content */}
    <div className="flex-1 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 hover:border-blue-500/30 transition-colors">
      <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
        <h3 className="font-bold text-neutral-900 dark:text-white">
          {award.title}
        </h3>
        <span className="font-mono text-sm text-blue-500 dark:text-blue-400 flex-shrink-0">
          {award.date}
        </span>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
        {award.organization}
      </p>
      {award.description && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {award.description}
        </p>
      )}
    </div>
  </div>
);

const Awards: React.FC<Props> = ({ awards }) => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = awards.length > INITIAL_COUNT;

  return (
    <Section id="studies" index="05 —" title="Studies">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/60 via-violet-500/40 to-transparent" />

        {/* Initial items */}
        <div className="stagger flex flex-col gap-8">
          {awards.slice(0, INITIAL_COUNT).map((award, i) => (
            <AwardItem key={i} award={award} />
          ))}
        </div>

        {/* Expanded items */}
        {expanded && (
          <div className="flex flex-col gap-8 mt-8">
            {awards.slice(INITIAL_COUNT).map((award, i) => (
              <div
                key={i}
                style={{
                  animation: `popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s both`,
                }}
              >
                <AwardItem award={award} />
              </div>
            ))}
          </div>
        )}

        {/* Gradient fade when collapsed */}
        {!expanded && hasMore && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-[#0a0a0f] to-transparent pointer-events-none" />
        )}
      </div>

      {/* Toggle button */}
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-200"
          >
            <span>{expanded ? 'Show less' : 'Show more'}</span>
            <HiChevronDown
              size={15}
              className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      )}
    </Section>
  );
};

export default Awards;
