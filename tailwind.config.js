/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        navy: {
          50: '#f2f5fb',
          100: '#e3e9f6',
          200: '#c3d0ea',
          300: '#95aad8',
          400: '#607dc0',
          500: '#3d5aa6',
          600: '#2c4486',
          700: '#25376c',
          800: '#1a2850',
          900: '#0f1b3d',
          950: '#070f26',
        },
        gold: {
          50: '#fbf8ef',
          100: '#f5edd5',
          200: '#ead9a8',
          300: '#dcbf72',
          400: '#cfa74c',
          500: '#c08f35',
          600: '#a3712a',
          700: '#835525',
          800: '#6d4525',
          900: '#5d3b23',
        },
        ink: '#0b1220',
        mist: '#f7f9fc',
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      // One type scale for the whole site (sized for Source Sans 3, which runs small).
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.25rem' }],
        sm: ['0.9375rem', { lineHeight: '1.4rem' }],
        base: ['1.0625rem', { lineHeight: '1.65rem' }],
        lg: ['1.1875rem', { lineHeight: '1.75rem' }],
        xl: ['1.375rem', { lineHeight: '1.85rem' }],
        '2xl': ['1.625rem', { lineHeight: '2.1rem' }],
        '3xl': ['2rem', { lineHeight: '2.45rem' }],
        '4xl': ['2.5rem', { lineHeight: '2.9rem' }],
        '5xl': ['3.125rem', { lineHeight: '3.4rem' }],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,27,61,.04), 0 8px 24px -12px rgba(15,27,61,.18)',
        lift: '0 24px 60px -28px rgba(15,27,61,.45)',
        glow: '0 0 0 1px rgba(207,167,76,.35), 0 20px 50px -24px rgba(207,167,76,.55)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(15,27,61,.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,27,61,.055) 1px, transparent 1px)',
        'sheen':
          'linear-gradient(110deg, transparent 25%, rgba(255,255,255,.55) 50%, transparent 75%)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1.5deg)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(3%,-4%,0) scale(1.08)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}
