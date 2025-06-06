import React from 'react';

interface GradientDotProps {
  className?: string;
}

const GradientDot: React.FC<GradientDotProps> = ({ className = '' }) => {
  return (
    <span
      className={`
        text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        bg-clip-text text-transparent
        ${className}
      `}
      aria-hidden="true"
    >
      •
    </span>
  );
};

export default GradientDot;
