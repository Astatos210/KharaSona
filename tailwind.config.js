/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          bright: '#F4C95D',
          muted: '#AA8C2C',
          dark: '#8C6D15',
          glow: 'rgba(212, 175, 55, 0.15)',
        },
        navy: {
          950: '#070C16',
          900: '#0B1220',
          850: '#0F182A',
          800: '#14213D',
          750: '#1A294A',
          700: '#23355A',
          600: '#334A77',
        },
        charcoal: {
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
        },
        accent: {
          green: '#22C55E',
          amber: '#F59E0B',
          red: '#EF4444',
          blue: '#38BDF8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
