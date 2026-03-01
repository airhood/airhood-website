import React, { useState } from 'react';
import { MdEmail, MdWork, MdContentCopy, MdCheck } from 'react-icons/md';
import Section from '../common/Section.tsx';

const contacts = [
  {
    icon: <MdEmail size={22} />,
    label: 'Personal',
    value: 'ahn.hyunjun2009@gmail.com',
  },
  {
    icon: <MdWork size={22} />,
    label: 'Business',
    value: 'airhood@airhood.dev',
  },
];

const Contact: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Section id="contact" index="08 —" title="Contact">
      <div className="stagger grid sm:grid-cols-2 gap-4">
        {contacts.map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 flex-shrink-0">
              {c.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-0.5">
                {c.label}
              </p>
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 truncate">
                {c.value}
              </p>
            </div>
            <button
              onClick={() => handleCopy(c.value, c.label)}
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-150 flex-shrink-0"
              aria-label={`Copy ${c.label} email`}
            >
              {copied === c.label ? (
                <MdCheck size={17} className="text-blue-500" />
              ) : (
                <MdContentCopy size={17} />
              )}
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Contact;
