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
        cine: {
          bg: '#070b13',
          card: '#0f172a',
          card2: '#131e33',
          border: 'rgba(255, 255, 255, 0.1)',
          orange: '#ff8a3d',
          gold: '#ffd166',
          cyan: '#48d6ff',
          red: '#ff4d5e',
          green: '#4ade80'
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scan 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(255, 138, 61, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(255, 138, 61, 0.8))' }
        }
      }
    },
  },
  plugins: [],
}
