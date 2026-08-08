import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PATH_LABELS: Record<string, string> = {
  '/': '~/home',
  '/projects': '~/projects',
};

function labelForPath(pathname: string): string {
  if (PATH_LABELS[pathname]) return PATH_LABELS[pathname];
  const base = pathname.split('/').slice(0, 2).join('/');
  return `${PATH_LABELS[base] ?? '~' + base}${pathname.slice(base.length)}`;
}

const BuildStrip: React.FC = () => {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((doc.scrollTop / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-8 border-t border-line bg-surface/90 backdrop-blur-sm">
      <div className="h-full max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24 flex items-center justify-between font-signal text-[11px] text-muted">
        <span>
          {labelForPath(pathname)}
          <span className="inline-block w-[7px] h-[11px] bg-signal ml-1 align-middle animate-[blink_1.1s_steps(1)_infinite]" />
        </span>
        <span className="flex items-center gap-2">
          <span className="w-16 h-[3px] bg-surface-2 rounded-full overflow-hidden hidden sm:block">
            <span
              className="block h-full bg-signal transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </span>
          <span className="tabular-nums">{progress.toString().padStart(2, '0')}%</span>
        </span>
      </div>
    </div>
  );
};

export default BuildStrip;
