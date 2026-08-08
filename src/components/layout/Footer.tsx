import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-line py-10 mb-8">
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display font-extrabold text-lg text-text">Airhood</span>
        <p className="font-signal text-xs text-muted">
          © {new Date().getFullYear()} Airhood. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
