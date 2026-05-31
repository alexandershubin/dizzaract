import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          page: '#0A0E13',
          surface: '#11161D',
          sidebar: '#0A0E13',
          sidebarHover: '#1A1F27',
          popover: '#262626',
        },
        ink: {
          primary: '#FAFAFA',
          secondary: '#A3A3A3',
          muted: '#71717A',
          inverse: '#E2E8F0',
        },
        line: '#1F2630',
        brand: {
          DEFAULT: '#5462FD',
          hover: '#3F4EE0',
        },
        status: {
          activeBg: '#5462FD',
          activeText: '#FFFFFF',
          expiredBg: '#2A2F38',
          expiredText: '#FFFFFF',
          disabledBg: '#2A2F38',
          disabledText: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
