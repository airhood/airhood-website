/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        line: 'var(--line)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        signal: 'var(--signal)',
        wire: 'var(--wire)',
      },
      fontFamily: {
        display: ['"Archivo Variable"', '"Pretendard Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans"', '"Pretendard Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '12px',
      },
      maxWidth: {
        content: '1600px',
      },
    },
  },
  plugins: [],
};
