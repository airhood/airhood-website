import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { HiMenu, HiX } from 'react-icons/hi';

const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/projects' },
];

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    root.classList.toggle('dark');
    const nowDark = root.classList.contains('dark');
    setIsDark(nowDark);
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    setTimeout(() => root.classList.remove('theme-transitioning'), 500);
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMenuOpen(false);
    if (!href.startsWith('/#')) return; // 일반 라우트는 Link가 처리

    const hash = href.slice(1); // '#about'
    if (location.pathname === '/') {
      e.preventDefault();
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
    // 다른 페이지에서는 '/' + hash로 실제 이동 → Home에서 hash 처리
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled ? 'bg-ink/85 backdrop-blur-md border-line' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24 flex items-center justify-between h-16">
        <button
          onClick={() => navigate('/')}
          className="font-display font-extrabold text-lg tracking-tight text-text"
        >
          Airhood
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-signal text-xs uppercase tracking-widest text-muted hover:text-text transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-muted hover:text-text hover:bg-surface-2 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <MdDarkMode size={18} /> : <MdLightMode size={18} />}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-muted hover:text-text hover:bg-surface-2 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX size={18} /> : <HiMenu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-ink/95 backdrop-blur-md border-b border-line px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-left font-signal text-sm uppercase tracking-widest text-muted hover:text-text transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
