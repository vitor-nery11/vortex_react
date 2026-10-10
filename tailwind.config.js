/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vortex: {
          navy: {
            DEFAULT: '#182D50',
            50: '#F0F4FA',
            100: '#E1E9F5',
            200: '#C2D3EB',
            300: '#94B3DC',
            400: '#5F8CC9',
            500: '#3A6AB2',
            600: '#285093',
            700: '#1F3F75',
            800: '#182D50',
            900: '#11203A',
            950: '#0B1424',
          },
          orange: {
            DEFAULT: '#ED3E1A',
            light: '#FF6445',
            dark: '#CA3110',
            50: '#FFF2E8',
            100: '#FFE2D1',
            200: '#FFC4A8',
            300: '#FFA078',
            400: '#FF7443',
            500: '#ED3E1A',
            600: '#D63110',
            700: '#AD230B',
            800: '#8A1E0D',
            900: '#701D0F',
          },
          cyan: {
            DEFAULT: '#0EA5E9',
            light: '#38BDF8',
            dark: '#0284C7',
          }
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 25px -5px rgba(24, 45, 80, 0.07), 0 8px 10px -6px rgba(24, 45, 80, 0.04)',
        'card-hover': '0 20px 35px -5px rgba(24, 45, 80, 0.12), 0 10px 15px -5px rgba(24, 45, 80, 0.06)',
        'orange-glow': '0 10px 25px -3px rgba(237, 62, 26, 0.35)',
        'navy-glow': '0 12px 30px -5px rgba(24, 45, 80, 0.45)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.25s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.94', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
