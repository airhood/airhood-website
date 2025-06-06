import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800 py-8 mt-12">
      <div className="container flex flex-col items-center justify-center">
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          ©Airhood 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;
