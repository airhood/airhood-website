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
    <Section id="contact" title="Contact">
      <div className="grid sm:grid-cols-2 gap-4">
        {contacts.map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-4 bg-surface rounded-card p-6"
          >
            <div className="w-11 h-11 rounded-card flex items-center justify-center bg-surface-2 text-muted flex-shrink-0">
              {c.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base text-muted mb-1">
                {c.label}
              </p>
              <p className="text-lg font-semibold text-text truncate">
                {c.value}
              </p>
            </div>
            <button
              onClick={() => handleCopy(c.value, c.label)}
              className="p-2 rounded-lg text-muted hover:text-text hover:bg-surface-2 transition-all duration-150 flex-shrink-0"
              aria-label={`Copy ${c.label} email`}
            >
              {copied === c.label ? (
                <MdCheck size={20} className="text-signal" />
              ) : (
                <MdContentCopy size={20} />
              )}
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Contact;
