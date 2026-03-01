import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800/60 py-10 mt-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xl font-black text-gradient">Airhood</span>
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          © 2025 Airhood. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
