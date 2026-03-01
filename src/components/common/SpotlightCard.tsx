import React, { useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const SpotlightCard: React.FC<Props> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--sx', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--sy', `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={ref}
      className={`isolate relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight overlay — z-index: -1 places it above card bg but below content */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="spotlight-overlay pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity: 0, borderRadius: 'inherit', zIndex: -1 }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
