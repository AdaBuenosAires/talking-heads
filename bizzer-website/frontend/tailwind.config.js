/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#ffffff',
          bgSecondary: '#f5f5f7',
          bgTertiary: '#e8e8ed',
          text: '#1d1d1f',
          textSecondary: '#6e6e73',
          textTertiary: '#86868b',
          border: '#d2d2d7',
          accent: '#1d1d1f',
          accentHover: '#424245',
        },
        dark: {
          bg: '#000000',
          bgSecondary: '#1d1d1f',
          bgTertiary: '#2d2d2d',
          text: '#f5f5f7',
          textSecondary: '#a1a1a6',
          textTertiary: '#86868b',
          border: '#424245',
          accent: '#f5f5f7',
          accentHover: '#d2d2d7',
        },
      },
      fontFamily: {
        display: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['56px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-2': ['48px', { lineHeight: '1.1', fontWeight: '600', letterSpacing: '-0.02em' }],
        'display-3': ['32px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.01em' }],
        'body': ['17px', { lineHeight: '1.5', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'apple': '12px',
        'apple-lg': '16px',
        'apple-xl': '20px',
      },
      boxShadow: {
        'apple': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'apple-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'apple-dark': '0 4px 16px rgba(0, 0, 0, 0.32)',
      },
      backdropBlur: {
        'apple': '20px',
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
